const SPREADSHEET_ID = '18MO9BOkJgw98lScOO7MmcA2KUXDcflKw31Quxb7cLwA';
const RECORDS_SHEET = 'Bonus Records';
const SETTINGS_SHEET = 'Settings';
const LOG_SHEET = 'Reminder Log';
const REMINDER_FUNCTION = 'sendPunchListReminders';
const TIMEZONE = 'America/Denver';

function doGet() {
  return jsonOutput({ ok: true, service: 'Arive Homes 30-Day Punch Reminder Sync' });
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    validateSyncKey_(payload.syncKey);

    if (payload.action !== 'syncRecords' || !Array.isArray(payload.records)) {
      throw new Error('Invalid sync request.');
    }

    const count = upsertRecords_(payload.records);
    return jsonOutput({ ok: true, synced: count, receivedAt: new Date().toISOString() });
  } catch (error) {
    console.error(error);
    return jsonOutput({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function setupReminderSystem() {
  ensureSheetHeaders_();
  installDailyReminderTrigger_();
  SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SETTINGS_SHEET).getRange('B3').setValue(7);
  return 'Reminder system ready. Daily trigger installed for about 7:00 AM Mountain Time.';
}

function sendTestReminderEmail() {
  const recipients = getSetting_('Reminder recipients') || 'brendan@arivehomes.com,robbie@arivehomes.com';
  MailApp.sendEmail({
    to: recipients,
    subject: 'TEST - Arive Homes 30-Day Punch List Reminder',
    htmlBody: '<div style="font-family:Arial,sans-serif"><h2>Arive Homes</h2><p>This is a test of the 30-day punch-list reminder system.</p><p>If you received this email, the reminder sender is working.</p></div>',
    name: 'Arive Homes Bonus Tracker'
  });
  return 'Test reminder sent to ' + recipients;
}

function sendPunchListReminders() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(RECORDS_SHEET);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 'No bonus records to check.';

  const recipients = getSetting_('Reminder recipients') || 'brendan@arivehomes.com,robbie@arivehomes.com';
  const warningDays = Number(getSetting_('Upcoming warning days') || 7);
  const sendOverdue = String(getSetting_('Send overdue reminders')).toLowerCase() !== 'false';
  const sendUpcoming = String(getSetting_('Send upcoming reminders')).toLowerCase() !== 'false';
  const rows = sheet.getRange(2, 1, lastRow - 1, 23).getValues();
  const today = startOfDay_(new Date());
  const dueItems = [];

  rows.forEach((row, index) => {
    const recordId = String(row[0] || '').trim();
    if (!recordId) return;

    const superintendent = String(row[1] || 'Unassigned');
    const community = String(row[2] || '');
    const lot = String(row[3] || '');
    const address = String(row[4] || '');
    const closingDate = parseSheetDate_(row[6]);
    const complete = toBoolean_(row[8]);
    if (!closingDate || complete) return;

    const dueDate = addDays_(closingDate, 30);
    const daysUntil = dateDiffDays_(today, dueDate);
    const overdue = daysUntil < 0;
    const upcoming = daysUntil >= 0 && daysUntil <= warningDays;
    if ((overdue && !sendOverdue) || (upcoming && !sendUpcoming) || (!overdue && !upcoming)) return;

    dueItems.push({
      rowNumber: index + 2,
      recordId,
      superintendent,
      community,
      lot,
      address,
      closingDate,
      dueDate,
      daysUntil,
      type: overdue ? 'Overdue' : daysUntil === 0 ? 'Due today' : 'Upcoming'
    });
  });

  if (!dueItems.length) return 'No reminders due today.';

  dueItems.sort((a, b) => a.daysUntil - b.daysUntil);
  const subject = `Arive Homes - ${dueItems.length} 30-Day Punch List${dueItems.length === 1 ? '' : 's'} Need Attention`;
  const html = buildReminderEmail_(dueItems);
  MailApp.sendEmail({
    to: recipients,
    subject,
    htmlBody: html,
    name: 'Arive Homes Bonus Tracker'
  });

  const sentAt = new Date();
  dueItems.forEach(item => {
    sheet.getRange(item.rowNumber, 22).setValue(sentAt); // V: Last Reminder Sent
    logReminder_(sentAt, item, recipients, 'Sent');
  });
  return `Reminder email sent for ${dueItems.length} home(s).`;
}

function upsertRecords_(records) {
  ensureSheetHeaders_();
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(RECORDS_SHEET);
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const existingIds = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues().flat() : [];
  const rowById = new Map();
  existingIds.forEach((id, idx) => { if (id) rowById.set(String(id), idx + 2); });

  let synced = 0;
  records.forEach(record => {
    if (!record || !record.id) return;
    const id = String(record.id);
    let rowNumber = rowById.get(id);
    let priorReminder = '';
    if (rowNumber) priorReminder = sheet.getRange(rowNumber, 22).getValue();
    if (!rowNumber) {
      rowNumber = Math.max(sheet.getLastRow() + 1, 2);
      rowById.set(id, rowNumber);
    }

    const closingDate = cleanIsoDate_(record.closingDate);
    const dueDate = closingDate ? addDaysIso_(closingDate, 30) : '';
    const punchComplete = Boolean(record.punchComplete);
    const reminderStatus = calculateReminderStatus_(closingDate, punchComplete);
    const values = [[
      id,
      cleanText_(record.superintendent),
      cleanText_(record.community),
      cleanText_(record.lotNumber),
      cleanText_(record.address),
      cleanIsoDate_(record.buildStartDate),
      closingDate,
      dueDate,
      punchComplete,
      cleanIsoDate_(record.punchCompletedDate),
      Boolean(record.finalGradeComplete),
      Boolean(record.safetyComplete),
      Boolean(record.checklistComplete),
      numberOrBlank_(record.approvedDelayDays),
      numberOrBlank_(record.adjustedBuildDays),
      Boolean(record.buildTimeMet),
      numberOrZero_(record.bonusEarned),
      cleanText_(record.paymentStatus || 'Draft'),
      cleanIsoDate_(record.paidDate),
      cleanText_(record.notes),
      reminderStatus,
      priorReminder,
      cleanText_(record.updatedAt || new Date().toISOString())
    ]];

    sheet.getRange(rowNumber, 1, 1, 23).setValues(values);
    synced++;
  });

  SpreadsheetApp.flush();
  return synced;
}

function buildReminderEmail_(items) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
  const rows = items.map(item => {
    const timing = item.daysUntil < 0
      ? `<strong style="color:#a23a2a">${Math.abs(item.daysUntil)} day${Math.abs(item.daysUntil) === 1 ? '' : 's'} overdue</strong>`
      : item.daysUntil === 0
        ? '<strong style="color:#a23a2a">Due today</strong>'
        : `<strong>${item.daysUntil} day${item.daysUntil === 1 ? '' : 's'} remaining</strong>`;
    const home = [item.community, item.lot ? `Lot ${item.lot}` : '', item.address].filter(Boolean).join(' - ');
    return `<tr>
      <td style="padding:10px;border-bottom:1px solid #e8e4dc">${escapeHtml_(item.superintendent)}</td>
      <td style="padding:10px;border-bottom:1px solid #e8e4dc">${escapeHtml_(home || 'Home not labeled')}</td>
      <td style="padding:10px;border-bottom:1px solid #e8e4dc">${formatDate_(item.closingDate)}</td>
      <td style="padding:10px;border-bottom:1px solid #e8e4dc">${formatDate_(item.dueDate)}</td>
      <td style="padding:10px;border-bottom:1px solid #e8e4dc">${timing}</td>
    </tr>`;
  }).join('');

  return `<div style="font-family:Arial,sans-serif;color:#27251f;max-width:900px;margin:auto">
    <div style="background:#25211b;color:white;padding:22px 26px;border-radius:10px 10px 0 0">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.75">Arive Homes</div>
      <h2 style="margin:6px 0 0">30-Day Punch List Watch</h2>
    </div>
    <div style="padding:22px 26px;border:1px solid #ded8ce;border-top:0;border-radius:0 0 10px 10px">
      <p>${items.length} incomplete punch list${items.length === 1 ? ' needs' : 's need'} attention.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <thead><tr style="background:#f5f2ec;text-align:left">
          <th style="padding:10px">Superintendent</th><th style="padding:10px">Home</th><th style="padding:10px">Closing</th><th style="padding:10px">30-Day Due</th><th style="padding:10px">Status</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:20px"><a href="${sheetUrl}" style="display:inline-block;background:#25211b;color:#fff;text-decoration:none;padding:10px 16px;border-radius:6px">Open Reminder Sheet</a></p>
      <p style="font-size:12px;color:#777">A home stops appearing after the 30-day punch list is marked complete in the Arive bonus tracker and synced.</p>
    </div>
  </div>`;
}

function calculateReminderStatus_(closingIso, complete) {
  if (complete) return 'Complete';
  if (!closingIso) return 'Needs close date';
  const today = startOfDay_(new Date());
  const due = parseSheetDate_(addDaysIso_(closingIso, 30));
  const days = dateDiffDays_(today, due);
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due today';
  if (days <= 7) return 'Due within 7 days';
  return 'Open';
}

function validateSyncKey_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty('SYNC_KEY');
  if (!expected || expected.length < 12) throw new Error('SYNC_KEY is not configured in Apps Script Project Settings.');
  if (String(provided || '') !== expected) throw new Error('Unauthorized sync request.');
}

function installDailyReminderTrigger_() {
  ScriptApp.getProjectTriggers()
    .filter(trigger => trigger.getHandlerFunction() === REMINDER_FUNCTION)
    .forEach(trigger => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger(REMINDER_FUNCTION)
    .timeBased()
    .atHour(7)
    .everyDays(1)
    .inTimezone(TIMEZONE)
    .create();
}

function ensureSheetHeaders_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const headers = ['Record ID','Superintendent','Community','Lot','Address','Build Start Date','Closing Date','30-Day Punch Due','30-Day Punch Complete','Punch Completion Date','Final Grade Photos Complete','Safety / SWPPP Complete','Superintendent Checklist Complete','Approved Delay Days','Adjusted Build Days','Build Time Met','Bonus Earned','Payment Status','Paid Date','Notes','Reminder Status','Last Reminder Sent','Last Updated'];
  const sheet = ss.getSheetByName(RECORDS_SHEET);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
}

function getSetting_(name) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SETTINGS_SHEET);
  const values = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 2).getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === name) return values[i][1];
  }
  return '';
}

function logReminder_(sentAt, item, recipients, result) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(LOG_SHEET);
  sheet.appendRow([
    sentAt,
    item.recordId,
    item.superintendent,
    [item.community, item.lot ? `Lot ${item.lot}` : ''].filter(Boolean).join(' - '),
    formatDate_(item.dueDate),
    item.type,
    recipients,
    result
  ]);
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function cleanText_(value) { return value == null ? '' : String(value).slice(0, 5000); }
function numberOrBlank_(value) { return value === '' || value == null || isNaN(Number(value)) ? '' : Number(value); }
function numberOrZero_(value) { return value === '' || value == null || isNaN(Number(value)) ? 0 : Number(value); }
function toBoolean_(value) { return value === true || String(value).toLowerCase() === 'true'; }
function cleanIsoDate_(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')) ? String(value) : ''; }
function parseSheetDate_(value) {
  if (value instanceof Date && !isNaN(value)) return startOfDay_(value);
  const text = String(value || '').trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}
function addDaysIso_(iso, days) { const d = parseSheetDate_(iso); return d ? Utilities.formatDate(addDays_(d, days), TIMEZONE, 'yyyy-MM-dd') : ''; }
function addDays_(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return startOfDay_(d); }
function startOfDay_(date) { const d = new Date(date); d.setHours(0,0,0,0); return d; }
function dateDiffDays_(start, end) { return Math.round((startOfDay_(end) - startOfDay_(start)) / 86400000); }
function formatDate_(date) { return Utilities.formatDate(date, TIMEZONE, 'MMM d, yyyy'); }
function escapeHtml_(text) { return String(text || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
