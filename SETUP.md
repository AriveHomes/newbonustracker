# Arive Homes 30-Day Punch List Reminder Setup

This is a one-time setup. The bonus tracker remains on GitHub Pages, while Google Apps Script receives a small sync payload and writes it to the private Google Sheet. The Google Sheet then sends the reminder emails.

## Already configured

- Google Sheet: **Arive Homes Superintendent Bonus Tracker Data**
- Sheet ID: `18MO9BOkJgw98lScOO7MmcA2KUXDcflKw31Quxb7cLwA`
- Reminder recipients: `brendan@arivehomes.com, robbie@arivehomes.com`
- Reminder window: incomplete punch lists due within 7 days, due today, or overdue
- Daily trigger target: about 7:00 AM Mountain Time

## 1. Open the Google Sheet

Open the Arive Homes Superintendent Bonus Tracker Data spreadsheet in Google Drive.

## 2. Create the Apps Script

In the Google Sheet choose **Extensions -> Apps Script**.

Delete the starter code, then copy the entire contents of `Code.gs` from this folder into the Apps Script editor and save.

## 3. Add a private sync key

In Apps Script, open **Project Settings** (gear icon).

Under **Script Properties**, add:

- Property: `SYNC_KEY`
- Value: a private random key at least 12 characters long

Do not put this value in GitHub. You will paste the same key into the bonus tracker's Program Settings after deployment.

## 4. Install the reminder trigger

In the Apps Script editor, select the function `setupReminderSystem` and click **Run**.

Google will ask you to authorize access to the spreadsheet and sending email. Review the permissions and approve only if they match the expected spreadsheet/email functions.

This installs a daily reminder trigger for about 7:00 AM Mountain Time.

Optional: select `sendTestReminderEmail` and click **Run** to verify Brendan and Robbie receive a test email.

## 5. Deploy the Web App

Choose **Deploy -> New deployment**.

- Type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone** (the private sync key is still required for writes)

Deploy and copy the URL ending in `/exec`.

## 6. Connect Version 14 of the bonus tracker

Open the bonus tracker and go to **Program Settings -> 30-Day Punch List Email Reminders**.

Paste:

1. The deployed Apps Script Web App URL
2. The same `SYNC_KEY`

Click **Save settings**, then click **Sync all records now**.

Open the Google Sheet and confirm the Bonus Records tab receives the tracker records.

## What syncs

The website sends only operational bonus/reminder fields, including record ID, superintendent, community/lot/address, closing date, 30-day punch completion, key requirement statuses, build-time results, bonus amount, and last-updated timestamp. It does not need Google Contacts access.

## Reminder behavior

Every morning, the script checks incomplete 30-day punch lists. Brendan and Robbie receive one summary email when at least one home is:

- Due within 7 days
- Due today
- Overdue

Once the punch list is marked complete in the bonus tracker and synced, that home stops appearing in reminder emails.
