(() => {
  "use strict";

  const APP_ID = "arive-superintendent-bonus";
  const APP_VERSION = 13;
  const DB_NAME = "arive-superintendent-bonus-db";
  const DB_STORE = "app-state";
  const DB_KEY = "primary";
  const LOCAL_STORAGE_KEY = "arive-superintendent-bonus-state";
  const BASE_BONUS_AMOUNT = 350;
  const BUILD_TIME_LIMIT_DAYS = 150;
  const TOWNHOME_BUILD_TIME_LIMIT_DAYS = 205;
  const ELIGIBLE_SUPERINTENDENTS = [
    "Greg Worthington",
    "Jackson Chambers",
    "Burke Nielson",
    "Deryck Copley"
  ];
  const EMBEDDED_WHITE_LOGO = "data:image/png;base64,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";



  const DELAY_CATEGORIES = [
    "City / inspection",
    "Utility company",
    "Customer change",
    "Company-directed change",
    "Weather beyond allowance",
    "Design / engineering",
    "Material allocation",
    "Development / site",
    "Trade issue",
    "Other"
  ];


  const REQUIRED_PHOTO_CATEGORIES = [
    "Front grade",
    "Rear grade",
    "Left side grade",
    "Right side grade"
  ];

  const DEFAULT_SETTINGS = Object.freeze({
    programName: "Arive Homes Superintendent Bonus Program",
    defaultBaseBonus: BASE_BONUS_AMOUNT,
    dayCountMode: "calendar",
    githubRepo: "",
    googleWebAppUrl: "",
    googleSyncKey: "",
    buildTimeLimitDays: BUILD_TIME_LIMIT_DAYS,
    eligibleSuperintendents: [...ELIGIBLE_SUPERINTENDENTS],
    criteria: [
      {
        id: "build-time",
        name: "Build Time",
        weight: 20,
        guidance: "Adjusted build time must be 150 calendar days or less for single-family homes or 205 calendar days or less for townhomes after approved outside-control delay days are deducted.",
        autoType: "buildTime",
        required: true,
        autoSchedule: true
      },
      {
        id: "final-grade-photos",
        name: "Final Grade Photos",
        weight: 20,
        guidance: "Final-grade photos must be uploaded to Dropbox and verified in the review.",
        autoType: "verification",
        required: true,
        autoSchedule: false
      },
      {
        id: "punch-30",
        name: "30-Day Punch List",
        weight: 20,
        guidance: "All 30-day punch list items must be complete before the bonus is eligible for approval.",
        autoType: "manualPass",
        required: true,
        autoSchedule: false
      },
      {
        id: "safety-swppp",
        name: "Safety / SWPPP Inspections",
        weight: 20,
        guidance: "Required safety and SWPPP inspections must be completed and documented.",
        autoType: "manualPass",
        required: true,
        autoSchedule: false
      },
      {
        id: "superintendent-checklist",
        name: "End of Build Checklist",
        weight: 20,
        guidance: "The required End of Build Checklist must be completed and its completion date recorded before the bonus is eligible for approval.",
        autoType: "manualPass",
        required: true,
        autoSchedule: false
      }
    ],
    payoutTiers: [
      { id: "tier-incomplete", min: 0, max: 99.99, multiplier: 0, label: "Criteria incomplete" },
      { id: "tier-eligible", min: 100, max: 100, multiplier: 1, label: "Bonus eligible" }
    ],
    scheduleBands: [
      { id: "schedule-pass", maxDaysLate: 0, score: 100, label: "Applicable build-time limit met" },
      { id: "schedule-fail", maxDaysLate: null, score: 0, label: "Applicable build-time limit exceeded" }
    ]
  });

  let state = {
    version: APP_VERSION,
    settings: clone(DEFAULT_SETTINGS),
    records: []
  };

  let settingsDraft = clone(DEFAULT_SETTINGS);
  let currentRecordId = null;
  let databasePromise = null;
  let saveTimer = null;
  let toastTimer = null;
  let remoteSyncTimer = null;
  let logoDataUrlCache = null;
  const refs = {};

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheReferences();
    bindEvents();
    state = normalizeState(await loadState());
    settingsDraft = clone(state.settings);
    renderTracker();
    renderSettings();
    updateProgramLabels();
    registerServiceWorker();
  }

  function cacheReferences() {
    const ids = [
      "trackerView", "editorView", "settingsView", "brandHomeButton", "headerNewReviewButton",
      "saveIndicator", "newReviewButton", "emptyNewReviewButton", "backToTrackerButton",
      "duplicateReviewButton", "deleteReviewButton", "recordSearch", "statusFilter", "superFilter", "punchFilter",
      "recordsTableWrap", "recordsTableBody", "recordsEmptyState", "metricOpenReviews",
      "metricClosedHomes", "metricClosedHomesDetail", "metricAvgBuildSingleFamily", "metricAvgBuildTownhome", "metricBonusTotal",
      "metricPunchOverdue", "metricPunchDueSoon", "superintendentBonusSummary", "importAllButton", "exportAllButton", "exportCsvButton", "reviewForm", "editorTitle",
      "editorDescription", "dayCountBadge", "grossBuildDays", "grossBuildDaysHelp", "approvedDelayDays",
      "adjustedBuildDays", "buildVariance", "buildVarianceHelp", "buildTimeLimitDisplay", "buildTimeGoalConfirmation", "punch30DueDate", "punch30DueDateHelp", "addDelayButton", "delayTableBody",
      "delayEmptyState", "criteriaList", "summaryRecordName",
      "summaryStatus", "scoreRing", "summaryScore", "summaryBonus", "summaryMultiplier",
      "summaryBaseBonus", "summaryGrossBuild", "summaryDelayDays", "summaryAdjustedBuild",
      "summaryFinalGradeStatus", "readinessList", "saveReviewButton", "downloadReportButton",
      "printReviewButton", "exportRecordButton", "githubIssueButton", "settingsProgramName",
      "settingsDefaultBaseBonus", "settingsDayCountMode", "settingsGithubRepo", "settingsGoogleWebAppUrl", "settingsGoogleSyncKey", "googleSyncStatus", "syncGoogleNowButton", "openGoogleSheetButton", "weightTotalBadge",
      "settingsCriteriaBody", "settingsPayoutBody", "settingsScheduleBody", "addCriterionButton",
      "addPayoutTierButton", "addScheduleBandButton", "resetSettingsButton", "saveSettingsButton",
      "settingsExportAllButton", "settingsImportAllButton", "clearAllDataButton", "importAllInput",
      "importRecordInput", "superintendentList", "confirmDialog", "confirmDialogTitle",
      "confirmDialogMessage", "confirmDialogConfirm", "toast"
    ];

    ids.forEach((id) => {
      refs[id] = document.getElementById(id);
    });

    refs.navButtons = Array.from(document.querySelectorAll("[data-view]"));
  }

  function bindEvents() {
    refs.navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const view = button.dataset.view;
        if (view === "editor" && !getCurrentRecord()) {
          const mostRecent = [...state.records].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))[0];
          if (mostRecent) {
            currentRecordId = mostRecent.id;
          } else {
            createNewRecord(false);
          }
        }
        showView(view);
      });
    });

    refs.brandHomeButton.addEventListener("click", () => showView("tracker"));
    refs.headerNewReviewButton.addEventListener("click", () => createNewRecord(true));
    refs.newReviewButton.addEventListener("click", () => createNewRecord(true));
    refs.emptyNewReviewButton.addEventListener("click", () => createNewRecord(true));
    refs.backToTrackerButton.addEventListener("click", () => showView("tracker"));

    refs.recordSearch.addEventListener("input", renderTrackerTable);
    refs.statusFilter.addEventListener("change", renderTrackerTable);
    refs.superFilter.addEventListener("change", renderTrackerTable);
    refs.punchFilter.addEventListener("change", renderTrackerTable);

    refs.recordsTableBody.addEventListener("click", handleRecordTableClick);
    refs.recordsTableBody.addEventListener("keydown", (event) => {
      if (event.target.closest("button")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      const row = event.target.closest("[data-record-id]");
      if (!row) return;
      event.preventDefault();
      editRecord(row.dataset.recordId);
    });
    refs.duplicateReviewButton.addEventListener("click", duplicateCurrentRecord);
    refs.deleteReviewButton.addEventListener("click", deleteCurrentRecord);

    refs.reviewForm.addEventListener("submit", (event) => event.preventDefault());
    refs.reviewForm.addEventListener("input", handleReviewInput);
    refs.reviewForm.addEventListener("change", handleReviewInput);

    refs.addDelayButton.addEventListener("click", addDelay);
    refs.delayTableBody.addEventListener("input", handleDelayInput);
    refs.delayTableBody.addEventListener("change", handleDelayChange);
    refs.delayTableBody.addEventListener("click", handleDelayClick);

    refs.criteriaList.addEventListener("input", handleCriterionInput);
    refs.criteriaList.addEventListener("change", handleCriterionChange);


    refs.saveReviewButton.addEventListener("click", async () => {
      await saveNow();
      showToast("Review saved.", "success");
    });
    refs.downloadReportButton.addEventListener("click", downloadCurrentReport);
    refs.printReviewButton.addEventListener("click", printCurrentReport);
    refs.exportRecordButton.addEventListener("click", exportCurrentRecord);
    refs.githubIssueButton.addEventListener("click", createGithubIssue);

    refs.exportAllButton.addEventListener("click", exportAllData);
    refs.settingsExportAllButton.addEventListener("click", exportAllData);
    refs.importAllButton.addEventListener("click", () => refs.importAllInput.click());
    refs.settingsImportAllButton.addEventListener("click", () => refs.importAllInput.click());
    refs.importAllInput.addEventListener("change", handleImportFile);
    refs.exportCsvButton.addEventListener("click", exportCsv);

    refs.settingsProgramName.addEventListener("input", handleGeneralSettingInput);
    refs.settingsDefaultBaseBonus.addEventListener("input", handleGeneralSettingInput);
    refs.settingsDayCountMode.addEventListener("change", handleGeneralSettingInput);
    refs.settingsGithubRepo.addEventListener("input", handleGeneralSettingInput);
    refs.settingsGoogleWebAppUrl.addEventListener("input", handleGeneralSettingInput);
    refs.settingsGoogleSyncKey.addEventListener("input", handleGeneralSettingInput);
    refs.syncGoogleNowButton.addEventListener("click", async () => {
      handleGeneralSettingInput();
      state.settings.googleWebAppUrl = settingsDraft.googleWebAppUrl;
      state.settings.googleSyncKey = settingsDraft.googleSyncKey;
      await saveNow();
      await syncAllRecordsToGoogleSheet(true);
    });
    refs.openGoogleSheetButton.addEventListener("click", () => {
      window.open("https://docs.google.com/spreadsheets/d/18MO9BOkJgw98lScOO7MmcA2KUXDcflKw31Quxb7cLwA/edit", "_blank", "noopener,noreferrer");
    });

    refs.settingsCriteriaBody.addEventListener("input", handleSettingsTableInput);
    refs.settingsCriteriaBody.addEventListener("change", handleSettingsTableInput);
    refs.settingsCriteriaBody.addEventListener("click", handleSettingsTableClick);
    refs.settingsPayoutBody.addEventListener("input", handleSettingsTableInput);
    refs.settingsPayoutBody.addEventListener("change", handleSettingsTableInput);
    refs.settingsPayoutBody.addEventListener("click", handleSettingsTableClick);
    refs.settingsScheduleBody.addEventListener("input", handleSettingsTableInput);
    refs.settingsScheduleBody.addEventListener("change", handleSettingsTableInput);
    refs.settingsScheduleBody.addEventListener("click", handleSettingsTableClick);

    refs.addCriterionButton.addEventListener("click", addSettingCriterion);
    refs.addPayoutTierButton.addEventListener("click", addPayoutTier);
    refs.addScheduleBandButton.addEventListener("click", addScheduleBand);
    refs.saveSettingsButton.addEventListener("click", saveSettings);
    refs.resetSettingsButton.addEventListener("click", resetSettings);
    refs.clearAllDataButton.addEventListener("click", clearAllData);

    window.addEventListener("beforeunload", () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
        void persistState();
      }
      if (remoteSyncTimer) {
        clearTimeout(remoteSyncTimer);
        remoteSyncTimer = null;
      }
    });
  }

  function showView(viewName) {
    const viewMap = {
      tracker: refs.trackerView,
      editor: refs.editorView,
      settings: refs.settingsView
    };

    Object.entries(viewMap).forEach(([name, element]) => {
      const active = name === viewName;
      element.hidden = !active;
      element.classList.toggle("is-active", active);
    });

    refs.navButtons.forEach((button) => {
      const active = button.dataset.view === viewName;
      button.classList.toggle("is-active", active);
      if (active) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    if (viewName === "tracker") {
      renderTracker();
    } else if (viewName === "editor") {
      renderEditor();
    } else if (viewName === "settings") {
      settingsDraft = clone(state.settings);
      renderSettings();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function createNewRecord(openEditor = true) {
    const record = makeBlankRecord();
    state.records.unshift(record);
    currentRecordId = record.id;
    scheduleSave();
    if (openEditor) {
      showView("editor");
    }
  }

  function makeBlankRecord() {
    const criteriaScores = {};
    const autoScores = {};
    state.settings.criteria.forEach((criterion) => {
      criteriaScores[criterion.id] = { score: 0, note: "", touched: false };
      autoScores[criterion.id] = Boolean(criterion.autoSchedule);
    });

    return {
      id: uid("review"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      superintendent: "",
      status: "Draft",
      community: "",
      lotNumber: "",
      planName: "",
      homeType: "Single Family",
      address: "",
      jobNumber: "",
      reviewPeriod: "",
      baseBonus: state.settings.defaultBaseBonus,
      buildStartDate: "",
      startMilestone: "Excavation start",
      targetBuildDays: BUILD_TIME_LIMIT_DAYS,
      actualCloseDate: "",
      closingDate: "",
      delays: [],
      criteriaScores,
      autoScores,
      photos: [],
      finalGradePhotosComplete: false,
      finalGradePhotosVerifiedDate: "",
      finalGradePhotosNotes: "",
      punch30Complete: false,
      punch30CompletedDate: "",
      punch30Notes: "",
      safetySwpppComplete: false,
      safetySwpppCompletedDate: "",
      safetySwpppNotes: "",
      superintendentChecklistComplete: false,
      superintendentChecklistCompletedDate: "",
      reviewedBy: "",
      reviewDate: "",
      submittedDate: "",
      approvedBy: "",
      approvedDate: "",
      paidDate: "",
      reviewNotes: "",
      approvalNotes: "",
      manualApprovedBonus: ""
    };
  }

  function getCurrentRecord() {
    return state.records.find((record) => record.id === currentRecordId) || null;
  }

  function renderTracker() {
    renderMetrics();
    renderSuperintendentBonusSummary();
    renderSuperintendentFilter();
    renderSuperintendentDatalist();
    renderTrackerTable();
  }

  function renderMetrics() {
    const openStatuses = new Set(["Draft", "Submitted", "Approved"]);
    const openReviews = state.records.filter((record) => openStatuses.has(record.status)).length;
    const closedRecords = state.records.filter((record) => Boolean(record.actualCloseDate));
    const completedBuilds = closedRecords
      .map((record) => ({ record, calculation: getRecordCalculations(record) }))
      .filter(({ calculation }) => calculation.adjustedBuildDays !== null);
    const singleFamilyBuilds = completedBuilds
      .filter(({ calculation }) => calculation.buildTimeLimitDays === BUILD_TIME_LIMIT_DAYS)
      .map(({ calculation }) => calculation.adjustedBuildDays);
    const townhomeBuilds = completedBuilds
      .filter(({ calculation }) => calculation.buildTimeLimitDays === TOWNHOME_BUILD_TIME_LIMIT_DAYS)
      .map(({ calculation }) => calculation.adjustedBuildDays);
    const avgSingleFamilyBuild = singleFamilyBuilds.length
      ? singleFamilyBuilds.reduce((sum, days) => sum + days, 0) / singleFamilyBuilds.length
      : null;
    const avgTownhomeBuild = townhomeBuilds.length
      ? townhomeBuilds.reduce((sum, days) => sum + days, 0) / townhomeBuilds.length
      : null;
    const approvedTotal = state.records
      .filter((record) => record.status === "Approved" || record.status === "Paid")
      .reduce((sum, record) => sum + getRecordCalculations(record).finalBonus, 0);

    refs.metricOpenReviews.textContent = String(openReviews);
    refs.metricClosedHomes.textContent = String(closedRecords.length);
    refs.metricClosedHomesDetail.textContent = state.records.length
      ? `${closedRecords.length} of ${state.records.length} tracked records`
      : "All tracked records";
    refs.metricAvgBuildSingleFamily.textContent = avgSingleFamilyBuild === null ? "—" : `${round(avgSingleFamilyBuild, 1)} days`;
    refs.metricAvgBuildTownhome.textContent = avgTownhomeBuild === null ? "—" : `${round(avgTownhomeBuild, 1)} days`;
    refs.metricBonusTotal.textContent = formatCurrency(approvedTotal);

    const punchCalculations = state.records.map((record) => getRecordCalculations(record));
    const overduePunches = punchCalculations.filter((calculation) => calculation.punch30TrackingStatus === "overdue").length;
    const dueSoonPunches = punchCalculations.filter((calculation) => calculation.punch30TrackingStatus === "due-soon").length;
    refs.metricPunchOverdue.textContent = `${overduePunches} overdue`;
    refs.metricPunchDueSoon.textContent = dueSoonPunches
      ? `${dueSoonPunches} due within 7 days`
      : "No punch lists due within 7 days";
  }

  function renderSuperintendentBonusSummary() {
    const summaries = ELIGIBLE_SUPERINTENDENTS.map((name) => {
      const records = state.records.filter((record) => record.superintendent === name);
      const paidRecords = records.filter((record) => record.status === "Paid" || Boolean(record.paidDate));
      const pendingRecords = records.filter((record) => record.status === "Approved" && !record.paidDate);
      const paidTotal = paidRecords.reduce((sum, record) => sum + getRecordCalculations(record).finalBonus, 0);
      const pendingTotal = pendingRecords.reduce((sum, record) => sum + getRecordCalculations(record).finalBonus, 0);
      const adjustedBuilds = records
        .map((record) => getRecordCalculations(record).adjustedBuildDays)
        .filter((value) => value !== null);
      const averageBuild = adjustedBuilds.length
        ? adjustedBuilds.reduce((sum, value) => sum + value, 0) / adjustedBuilds.length
        : null;
      const eligibleHomes = records.filter((record) => getRecordCalculations(record).allCriteriaPass).length;
      return { name, records: records.length, paidRecords: paidRecords.length, paidTotal, pendingTotal, averageBuild, eligibleHomes };
    });

    summaries.sort((a, b) => b.paidTotal - a.paidTotal || a.name.localeCompare(b.name));
    const maxPaid = Math.max(1, ...summaries.map((item) => item.paidTotal));
    refs.superintendentBonusSummary.innerHTML = summaries.map((item, index) => {
      const initials = item.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2);
      const progress = Math.round((item.paidTotal / maxPaid) * 100);
      return `
        <article class="super-bonus-card">
          <div class="super-bonus-topline">
            <span class="super-avatar" aria-hidden="true">${escapeHtml(initials)}</span>
            <span class="super-rank">${index + 1}</span>
          </div>
          <h3>${escapeHtml(item.name)}</h3>
          <span class="super-paid-label">Total received</span>
          <strong class="super-paid-amount">${escapeHtml(formatCurrency(item.paidTotal))}</strong>
          <div class="super-progress" aria-label="Relative paid bonus total"><span style="width:${progress}%"></span></div>
          <dl class="super-bonus-stats">
            <div><dt>Homes paid</dt><dd>${item.paidRecords}</dd></div>
            <div><dt>Approved pending</dt><dd>${escapeHtml(formatCurrency(item.pendingTotal))}</dd></div>
            <div><dt>Eligible homes</dt><dd>${item.eligibleHomes}</dd></div>
            <div><dt>Avg. adjusted build</dt><dd>${item.averageBuild === null ? "—" : `${round(item.averageBuild, 1)} days`}</dd></div>
          </dl>
        </article>`;
    }).join("");
  }

  function renderSuperintendentFilter() {
    const current = refs.superFilter.value || "all";
    const supers = uniqueSorted([
      ...ELIGIBLE_SUPERINTENDENTS,
      ...state.records.map((record) => record.superintendent).filter(Boolean)
    ]);
    refs.superFilter.innerHTML = `<option value="all">All superintendents</option>${supers
      .map((name) => `<option value="${escapeAttribute(name)}">${escapeHtml(name)}</option>`)
      .join("")}`;
    refs.superFilter.value = supers.includes(current) ? current : "all";
  }

  function renderSuperintendentDatalist() {
    refs.superintendentList.innerHTML = ELIGIBLE_SUPERINTENDENTS
      .map((name) => `<option value="${escapeAttribute(name)}"></option>`)
      .join("");
  }

  function renderTrackerTable() {
    const query = refs.recordSearch.value.trim().toLowerCase();
    const status = refs.statusFilter.value;
    const superintendent = refs.superFilter.value;
    const punchFilter = refs.punchFilter.value;

    const filtered = [...state.records]
      .filter((record) => {
        if (status !== "all" && record.status !== status) return false;
        if (superintendent !== "all" && record.superintendent !== superintendent) return false;
        const calculation = getRecordCalculations(record);
        if (punchFilter !== "all" && calculation.punch30TrackingStatus !== punchFilter) return false;
        if (!query) return true;
        const haystack = [
          record.superintendent,
          record.community,
          record.lotNumber,
          record.address,
          record.planName,
          record.jobNumber,
          record.reviewPeriod
        ].join(" ").toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));

    refs.recordsTableBody.innerHTML = filtered.map((record) => recordRowHtml(record)).join("");

    const noRecords = state.records.length === 0;
    const noMatches = !noRecords && filtered.length === 0;
    refs.recordsTableWrap.hidden = filtered.length === 0;
    refs.recordsEmptyState.hidden = filtered.length !== 0;

    if (noMatches) {
      refs.recordsEmptyState.querySelector("h3").textContent = "No matching reviews";
      refs.recordsEmptyState.querySelector("p").textContent = "Try a different search or filter.";
      refs.emptyNewReviewButton.hidden = true;
    } else {
      refs.recordsEmptyState.querySelector("h3").textContent = "No bonus reviews yet";
      refs.recordsEmptyState.querySelector("p").textContent = "Create a review for a closed or active home and track the five bonus requirements.";
      refs.emptyNewReviewButton.hidden = false;
    }
  }

  function recordRowHtml(record) {
    const calculation = getRecordCalculations(record);
    const addressLine = [record.lotNumber, record.address].filter(Boolean).join(" • ") || "Lot / address not entered";
    const adjustedBuild = calculation.adjustedBuildDays === null
      ? "—"
      : `${calculation.adjustedBuildDays} days${record.actualCloseDate ? "" : " to date"}`;
    const score = `${calculation.criteriaPassed}/5`;
    const punchDue = calculation.punch30DueDate ? formatDate(calculation.punch30DueDate) : "—";
    const punchLabel = calculation.punch30TrackingLabel;

    return `
      <tr data-record-id="${escapeAttribute(record.id)}" tabindex="0" aria-label="Open review for ${escapeAttribute(record.superintendent || "unnamed superintendent")}">
        <td>
          <span class="record-primary">${escapeHtml(record.superintendent || "Unnamed superintendent")}</span>
          <span class="record-secondary">${escapeHtml(record.community || record.reviewPeriod || "No community")}</span>
        </td>
        <td>
          <span class="record-primary">${escapeHtml(addressLine)}</span>
          <span class="record-secondary">${escapeHtml(record.planName || record.jobNumber || "No plan or job number")}</span>
        </td>
        <td>${record.closingDate ? escapeHtml(formatDate(record.closingDate)) : "—"}</td>
        <td>
          <span class="punch-status-chip punch-${escapeAttribute(calculation.punch30TrackingStatus)}">${escapeHtml(punchLabel)}</span>
          <span class="record-secondary">${calculation.punch30DueDate ? `Due ${escapeHtml(punchDue)}` : "Enter closing date"}</span>
        </td>
        <td class="number-cell">${escapeHtml(adjustedBuild)}</td>
        <td class="number-cell"><strong>${escapeHtml(score)}</strong></td>
        <td class="number-cell"><strong>${escapeHtml(formatCurrency(calculation.finalBonus))}</strong></td>
        <td><span class="status-chip ${statusClass(record.status)}">${escapeHtml(record.status || "Draft")}</span></td>
        <td>
          <div class="record-actions">
            <button type="button" class="icon-button" data-record-action="edit" data-record-id="${escapeAttribute(record.id)}" title="Edit review" aria-label="Edit review">✎</button>
            <button type="button" class="icon-button" data-record-action="duplicate" data-record-id="${escapeAttribute(record.id)}" title="Duplicate review" aria-label="Duplicate review">⧉</button>
            <button type="button" class="icon-button danger" data-record-action="delete" data-record-id="${escapeAttribute(record.id)}" title="Delete review" aria-label="Delete review">×</button>
          </div>
        </td>
      </tr>`;
  }

  function handleRecordTableClick(event) {
    const actionButton = event.target.closest("[data-record-action]");
    if (actionButton) {
      event.stopPropagation();
      const recordId = actionButton.dataset.recordId;
      const action = actionButton.dataset.recordAction;
      if (action === "edit") editRecord(recordId);
      if (action === "duplicate") duplicateRecord(recordId);
      if (action === "delete") void deleteRecord(recordId);
      return;
    }

    const row = event.target.closest("[data-record-id]");
    if (row) editRecord(row.dataset.recordId);
  }

  function editRecord(recordId) {
    currentRecordId = recordId;
    showView("editor");
  }

  function duplicateRecord(recordId) {
    const source = state.records.find((record) => record.id === recordId);
    if (!source) return;
    const copy = clone(source);
    copy.id = uid("review");
    copy.createdAt = new Date().toISOString();
    copy.updatedAt = copy.createdAt;
    copy.status = "Draft";
    copy.reviewedBy = "";
    copy.reviewDate = "";
    copy.submittedDate = "";
    copy.approvedBy = "";
    copy.approvedDate = "";
    copy.paidDate = "";
    copy.manualApprovedBonus = "";
    copy.photos = [];
    copy.finalGradePhotosComplete = false;
    copy.finalGradePhotosVerifiedDate = "";
    copy.finalGradePhotosNotes = "";
    copy.punch30Complete = false;
    copy.punch30CompletedDate = "";
    copy.punch30Notes = "";
    copy.safetySwpppComplete = false;
    copy.safetySwpppCompletedDate = "";
    copy.safetySwpppNotes = "";
    copy.superintendentChecklistComplete = false;
    copy.superintendentChecklistCompletedDate = "";
    copy.lotNumber = "";
    copy.address = "";
    copy.jobNumber = "";
    state.records.unshift(copy);
    currentRecordId = copy.id;
    scheduleSave();
    showToast("Review duplicated. Completion checks were reset.", "success");
    showView("editor");
  }

  function duplicateCurrentRecord() {
    const record = getCurrentRecord();
    if (record) duplicateRecord(record.id);
  }

  async function deleteRecord(recordId) {
    const record = state.records.find((item) => item.id === recordId);
    if (!record) return;
    const label = record.lotNumber || record.address || record.superintendent || "this review";
    const confirmed = await confirmAction(
      "Delete bonus review?",
      `This permanently removes ${label} from this browser. Export a backup first if you may need it later.`,
      "Delete"
    );
    if (!confirmed) return;

    state.records = state.records.filter((item) => item.id !== recordId);
    if (currentRecordId === recordId) currentRecordId = null;
    await saveNow();
    renderTracker();
    showToast("Review deleted.", "success");
    showView("tracker");
  }

  function deleteCurrentRecord() {
    const record = getCurrentRecord();
    if (record) void deleteRecord(record.id);
  }

  function renderEditor() {
    let record = getCurrentRecord();
    if (!record) {
      createNewRecord(false);
      record = getCurrentRecord();
    }
    if (!record) return;

    normalizeRecordInPlace(record);
    refs.reviewForm.querySelectorAll("[data-field]").forEach((input) => {
      const field = input.dataset.field;
      const value = record[field] ?? "";
      if (input.type === "checkbox") {
        input.checked = Boolean(value);
      } else {
        input.value = value;
      }
    });

    updateEditorHeading(record);
    refs.dayCountBadge.textContent = state.settings.dayCountMode === "business" ? "Weekdays only" : "Calendar days";
    renderDelayTable();
    renderCriteria();
    renderEditorSummary();
  }

  function updateEditorHeading(record) {
    const identity = [record.superintendent, record.lotNumber].filter(Boolean).join(" • ");
    refs.editorTitle.textContent = identity || "New Superintendent Bonus Review";
    refs.editorDescription.textContent = record.address || "Enter the home details, verify the five bonus requirements, and document any delays outside the superintendent’s control.";
  }

  function applyBuildTimeGoal(record, requestedDays) {
    const days = Number(requestedDays) === TOWNHOME_BUILD_TIME_LIMIT_DAYS
      ? TOWNHOME_BUILD_TIME_LIMIT_DAYS
      : BUILD_TIME_LIMIT_DAYS;
    record.targetBuildDays = days;
    record.homeType = days === TOWNHOME_BUILD_TIME_LIMIT_DAYS ? "Townhome" : "Single Family";

    const goalInput = refs.reviewForm.querySelector('[data-field="targetBuildDays"]');
    if (goalInput) goalInput.value = String(days);
    const typeInput = refs.reviewForm.querySelector('[data-field="homeType"]');
    if (typeInput) typeInput.value = record.homeType;
    if (refs.buildTimeGoalConfirmation) {
      refs.buildTimeGoalConfirmation.textContent = `Current goal: ${days} days - ${record.homeType}`;
    }
  }

  function handleReviewInput(event) {
    if (event.type === "input" && event.target instanceof HTMLSelectElement) return;

    const input = event.target.closest("[data-field]");
    if (!input) return;
    const record = getCurrentRecord();
    if (!record) return;

    const field = input.dataset.field;
    let value = input.type === "checkbox" ? input.checked : input.value;
    if (["baseBonus", "targetBuildDays", "manualApprovedBonus"].includes(field)) {
      value = input.value === "" ? "" : Number(input.value);
    }
    record[field] = value;

    // One source of truth for the build-time goal. Either control can set it,
    // and both visible controls are updated immediately.
    if (field === "homeType") {
      applyBuildTimeGoal(record, value === "Townhome" ? TOWNHOME_BUILD_TIME_LIMIT_DAYS : BUILD_TIME_LIMIT_DAYS);
    } else if (field === "targetBuildDays") {
      applyBuildTimeGoal(record, Number(value));
    }


    const completionDateFields = {
      finalGradePhotosComplete: "finalGradePhotosVerifiedDate",
      punch30Complete: "punch30CompletedDate",
      safetySwpppComplete: "safetySwpppCompletedDate",
      superintendentChecklistComplete: "superintendentChecklistCompletedDate"
    };
    if (field in completionDateFields) {
      const dateField = completionDateFields[field];
      record[dateField] = value ? (record[dateField] || todayIso()) : "";
      const dateInput = refs.reviewForm.querySelector(`[data-field="${dateField}"]`);
      if (dateInput) dateInput.value = record[dateField];
    }

    touchRecord(record);

    if (["superintendent", "lotNumber", "address", "status"].includes(field)) {
      updateEditorHeading(record);
    }

    if (["homeType", "targetBuildDays", "buildStartDate", "actualCloseDate", "closingDate", "finalGradePhotosComplete", "finalGradePhotosVerifiedDate", "punch30Complete", "punch30CompletedDate", "safetySwpppComplete", "safetySwpppCompletedDate", "superintendentChecklistComplete", "superintendentChecklistCompletedDate"].includes(field)) {
      renderCriteria();
    }

    if (field === "status" && ["Approved", "Paid"].includes(value)) {
      const readiness = getReadiness(record);
      if (readiness.some((item) => !item.complete)) {
        showToast("This review still has incomplete approval-readiness items.");
      }
    }

    renderEditorSummary();
    scheduleSave();
  }

  function addDelay() {
    const record = getCurrentRecord();
    if (!record) return;
    record.delays.push({
      id: uid("delay"),
      category: "City / inspection",
      startDate: "",
      endDate: "",
      outsideControl: true,
      decision: "Pending",
      approvedBy: "",
      notes: ""
    });
    touchRecord(record);
    renderDelayTable();
    renderEditorSummary();
    scheduleSave();
  }

  function renderDelayTable() {
    const record = getCurrentRecord();
    if (!record) return;
    refs.delayTableBody.innerHTML = record.delays.map((delay) => delayRowHtml(delay)).join("");
    refs.delayEmptyState.hidden = record.delays.length > 0;
  }

  function delayRowHtml(delay) {
    const days = countDateRange(delay.startDate, delay.endDate, state.settings.dayCountMode);
    return `
      <tr data-delay-row="${escapeAttribute(delay.id)}">
        <td>
          <select class="delay-cause" data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="category">
            ${optionList(DELAY_CATEGORIES, delay.category)}
          </select>
        </td>
        <td><input class="delay-date" type="date" data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="startDate" value="${escapeAttribute(delay.startDate || "")}"></td>
        <td><input class="delay-date" type="date" data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="endDate" value="${escapeAttribute(delay.endDate || "")}"></td>
        <td class="checkbox-cell"><input type="checkbox" data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="outsideControl" ${delay.outsideControl ? "checked" : ""} aria-label="Outside superintendent control"></td>
        <td>
          <select class="delay-decision" data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="decision">
            ${optionList(["Pending", "Approved", "Denied"], delay.decision)}
          </select>
        </td>
        <td><input class="delay-approver" type="text" data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="approvedBy" value="${escapeAttribute(delay.approvedBy || "")}" placeholder="Name"></td>
        <td class="number-cell"><span class="delay-days-value">${days === null ? "—" : days}</span></td>
        <td><textarea data-delay-id="${escapeAttribute(delay.id)}" data-delay-field="notes" rows="2" placeholder="What happened and supporting documentation">${escapeHtml(delay.notes || "")}</textarea></td>
        <td><button type="button" class="icon-button danger" data-delay-action="delete" data-delay-id="${escapeAttribute(delay.id)}" aria-label="Delete delay">×</button></td>
      </tr>`;
  }

  function handleDelayInput(event) {
    const input = event.target.closest("[data-delay-id][data-delay-field]");
    if (!input) return;
    updateDelayFromInput(input);
    scheduleSave();
  }

  function handleDelayChange(event) {
    const input = event.target.closest("[data-delay-id][data-delay-field]");
    if (!input) return;
    updateDelayFromInput(input);
    renderDelayTable();
    renderCriteria();
    renderEditorSummary();
    scheduleSave();
  }

  function updateDelayFromInput(input) {
    const record = getCurrentRecord();
    if (!record) return;
    const delay = record.delays.find((item) => item.id === input.dataset.delayId);
    if (!delay) return;
    const field = input.dataset.delayField;
    delay[field] = input.type === "checkbox" ? input.checked : input.value;
    touchRecord(record);
  }

  function handleDelayClick(event) {
    const button = event.target.closest("[data-delay-action='delete']");
    if (!button) return;
    const record = getCurrentRecord();
    if (!record) return;
    record.delays = record.delays.filter((delay) => delay.id !== button.dataset.delayId);
    touchRecord(record);
    renderDelayTable();
    renderCriteria();
    renderEditorSummary();
    scheduleSave();
  }

  function renderCriteria() {
    const record = getCurrentRecord();
    if (!record) return;
    const calculation = getRecordCalculations(record);

    const buildStatus = calculation.buildTimeAvailable
      ? calculation.buildTimePass
        ? { label: "Complete", className: "is-pass", detail: `${calculation.adjustedBuildDays} adjusted days — within the ${calculation.buildTimeLimitDays}-day limit.` }
        : { label: "Not eligible", className: "is-fail", detail: `${calculation.adjustedBuildDays} adjusted days — ${calculation.adjustedBuildDays - calculation.buildTimeLimitDays} days over the limit.` }
      : { label: "Needs CO date", className: "is-pending", detail: `Enter the dig date and Certificate of Occupancy date. Approved exception days will be deducted automatically.` };

    const photoStatus = calculation.finalGradePhotosPass
      ? { label: "Complete", className: "is-pass", detail: record.finalGradePhotosVerifiedDate ? `Verified ${formatDate(record.finalGradePhotosVerifiedDate)}.` : "Verified as uploaded to Dropbox." }
      : { label: "Incomplete", className: "is-pending", detail: "Confirm the final-grade photos have been uploaded to Dropbox." };

    const punchStatus = calculation.punch30Pass
      ? { label: "Complete", className: "is-pass", detail: calculation.punch30TrackingDetail }
      : calculation.punch30TrackingStatus === "overdue"
        ? { label: "Overdue", className: "is-fail", detail: calculation.punch30TrackingDetail }
        : { label: calculation.punch30TrackingStatus === "due-soon" ? "Due soon" : "Open", className: "is-pending", detail: calculation.punch30TrackingDetail };

    const safetyStatus = calculation.safetySwpppPass
      ? { label: "Complete", className: "is-pass" }
      : { label: "Incomplete", className: "is-pending" };

    const checklistStatus = calculation.superintendentChecklistPass
      ? { label: "Complete", className: "is-pass", detail: record.superintendentChecklistCompletedDate ? `Completed ${formatDate(record.superintendentChecklistCompletedDate)}.` : "Marked complete." }
      : { label: "Incomplete", className: "is-pending", detail: "Confirm the required End of Build Checklist has been completed." };

    refs.criteriaList.innerHTML = `
      <article class="eligibility-criterion ${buildStatus.className}">
        <div class="eligibility-icon" aria-hidden="true">${calculation.buildTimePass ? "✓" : calculation.buildTimeAvailable ? "×" : "1"}</div>
        <div class="eligibility-content">
          <div class="eligibility-heading"><h3>Build Time</h3><span class="eligibility-status">${escapeHtml(buildStatus.label)}</span></div>
          <p>Adjusted build time must be <strong>${calculation.buildTimeLimitDays} days or less</strong>. Approved delays outside the superintendent’s control are deducted first.</p>
          <small>${escapeHtml(buildStatus.detail)}</small>
        </div>
      </article>

      <article class="eligibility-criterion ${photoStatus.className}">
        <div class="eligibility-icon" aria-hidden="true">${calculation.finalGradePhotosPass ? "✓" : "2"}</div>
        <div class="eligibility-content">
          <div class="eligibility-heading"><h3>Final Grade Photos</h3><span class="eligibility-status">${escapeHtml(photoStatus.label)}</span></div>
          <p>Final-grade photos must be uploaded to Dropbox and verified below.</p>
          <small>${escapeHtml(photoStatus.detail)}</small>
        </div>
      </article>

      <article class="eligibility-criterion ${punchStatus.className}">
        <div class="eligibility-icon" aria-hidden="true">${calculation.punch30Pass ? "✓" : "3"}</div>
        <div class="eligibility-content">
          <div class="eligibility-heading"><h3>30-Day Punch List</h3><span class="eligibility-status">${escapeHtml(punchStatus.label)}</span></div>
          <div class="punch-due-summary punch-${escapeAttribute(calculation.punch30TrackingStatus)}">
            <span>Automatically calculated from closing date</span>
            <strong>${calculation.punch30DueDate ? `Due ${escapeHtml(formatDate(calculation.punch30DueDate))}` : "Enter closing date"}</strong>
            <small>${escapeHtml(punchStatus.detail)}</small>
          </div>
          <label class="eligibility-check">
            <input type="checkbox" data-field="punch30Complete" ${record.punch30Complete ? "checked" : ""}>
            <span>All 30-day punch list items are complete</span>
          </label>
          <div class="eligibility-fields">
            <label class="field">
              <span class="field-label">Completion date</span>
              <input type="date" data-field="punch30CompletedDate" value="${escapeAttribute(record.punch30CompletedDate || "")}">
            </label>
            <label class="field eligibility-note-field">
              <span class="field-label">Notes</span>
              <input type="text" data-field="punch30Notes" value="${escapeAttribute(record.punch30Notes || "")}" placeholder="Optional punch-list note">
            </label>
          </div>
        </div>
      </article>

      <article class="eligibility-criterion ${safetyStatus.className}">
        <div class="eligibility-icon" aria-hidden="true">${calculation.safetySwpppPass ? "✓" : "4"}</div>
        <div class="eligibility-content">
          <div class="eligibility-heading"><h3>Safety / SWPPP Inspections</h3><span class="eligibility-status">${escapeHtml(safetyStatus.label)}</span></div>
          <label class="eligibility-check">
            <input type="checkbox" data-field="safetySwpppComplete" ${record.safetySwpppComplete ? "checked" : ""}>
            <span>Required safety and SWPPP inspections were completed</span>
          </label>
          <div class="eligibility-fields">
            <label class="field">
              <span class="field-label">Verified date</span>
              <input type="date" data-field="safetySwpppCompletedDate" value="${escapeAttribute(record.safetySwpppCompletedDate || "")}">
            </label>
            <label class="field eligibility-note-field">
              <span class="field-label">Notes / inspection reference</span>
              <input type="text" data-field="safetySwpppNotes" value="${escapeAttribute(record.safetySwpppNotes || "")}" placeholder="Optional inspection note or reference">
            </label>
          </div>
        </div>
      </article>

      <article class="eligibility-criterion ${checklistStatus.className}">
        <div class="eligibility-icon" aria-hidden="true">${calculation.superintendentChecklistPass ? "✓" : "5"}</div>
        <div class="eligibility-content">
          <div class="eligibility-heading"><h3>End of Build Checklist</h3><span class="eligibility-status">${escapeHtml(checklistStatus.label)}</span></div>
          <p>The detailed checklist is completed separately. For bonus tracking, confirm only whether it was completed and the completion date.</p>
          <label class="eligibility-check">
            <input type="checkbox" data-field="superintendentChecklistComplete" ${record.superintendentChecklistComplete ? "checked" : ""}>
            <span>Required End of Build Checklist was completed</span>
          </label>
          <div class="eligibility-fields">
            <label class="field">
              <span class="field-label">Completion date</span>
              <input type="date" data-field="superintendentChecklistCompletedDate" value="${escapeAttribute(record.superintendentChecklistCompletedDate || "")}">
            </label>
          </div>
          <small>${escapeHtml(checklistStatus.detail)}</small>
        </div>
      </article>`;
  }

  function handleCriterionInput(event) {
    const record = getCurrentRecord();
    if (!record) return;

    const scoreInput = event.target.closest("[data-criterion-score], [data-criterion-score-range]");
    if (scoreInput) {
      const criterionId = scoreInput.dataset.criterionScore || scoreInput.dataset.criterionScoreRange;
      const value = clamp(numberOr(scoreInput.value, 0), 0, 100);
      const criterionScore = ensureCriterionScore(record, criterionId);
      criterionScore.score = value;
      criterionScore.touched = true;
      refs.criteriaList.querySelectorAll(`[data-criterion-score="${cssEscape(criterionId)}"], [data-criterion-score-range="${cssEscape(criterionId)}"]`)
        .forEach((input) => {
          if (input !== scoreInput) input.value = String(value);
        });
      const criterion = state.settings.criteria.find((item) => item.id === criterionId);
      const weightedLabel = scoreInput.closest(".criterion-row")?.querySelector(".score-meta span:last-child");
      if (weightedLabel && criterion) {
        weightedLabel.textContent = `${round(value * numberOr(criterion.weight, 0) / 100, 1)} weighted points`;
      }
      touchRecord(record);
      renderEditorSummary();
      scheduleSave();
      return;
    }

    const noteInput = event.target.closest("[data-criterion-note]");
    if (noteInput) {
      ensureCriterionScore(record, noteInput.dataset.criterionNote).note = noteInput.value;
      touchRecord(record);
      scheduleSave();
    }
  }

  function handleCriterionChange(event) {
    const autoInput = event.target.closest("[data-criterion-auto]");
    if (!autoInput) return;
    const record = getCurrentRecord();
    if (!record) return;
    record.autoScores[autoInput.dataset.criterionAuto] = autoInput.checked;
    touchRecord(record);
    renderCriteria();
    renderEditorSummary();
    scheduleSave();
  }

  function ensureCriterionScore(record, criterionId) {
    if (!record.criteriaScores[criterionId]) {
      record.criteriaScores[criterionId] = { score: 0, note: "", touched: false };
    }
    return record.criteriaScores[criterionId];
  }

  function renderEditorSummary() {
    const record = getCurrentRecord();
    if (!record) return;
    const calculation = getRecordCalculations(record);
    const targetLabel = `${calculation.buildTimeLimitDays}-day bonus limit`;
    if (refs.buildTimeGoalConfirmation) {
      refs.buildTimeGoalConfirmation.textContent = `Current goal: ${calculation.buildTimeLimitDays} days - ${calculation.buildTimeLimitDays === TOWNHOME_BUILD_TIME_LIMIT_DAYS ? "Townhome" : "Single Family"}`;
    }

    refs.grossBuildDays.textContent = calculation.grossBuildDays === null ? "—" : String(calculation.grossBuildDays);
    refs.grossBuildDaysHelp.textContent = calculation.grossBuildDays === null
      ? "Enter the dig date and CO date"
      : record.actualCloseDate ? "Dig through Certificate of Occupancy" : "Start through today";
    refs.approvedDelayDays.textContent = String(calculation.approvedDelayDays);
    refs.adjustedBuildDays.textContent = calculation.adjustedBuildDays === null ? "—" : String(calculation.adjustedBuildDays);
    refs.buildVariance.textContent = calculation.varianceDays === null
      ? "—"
      : calculation.varianceDays === 0
        ? "On target"
        : calculation.varianceDays > 0
          ? `+${calculation.varianceDays}`
          : String(calculation.varianceDays);
    refs.buildVarianceHelp.textContent = calculation.varianceDays === null
      ? targetLabel
      : calculation.varianceDays <= 0 ? `${Math.abs(calculation.varianceDays)} day${Math.abs(calculation.varianceDays) === 1 ? "" : "s"} ahead / on target` : `${calculation.varianceDays} day${calculation.varianceDays === 1 ? "" : "s"} late after exceptions`;
    refs.punch30DueDate.value = calculation.punch30DueDate ? formatDate(calculation.punch30DueDate) : "";
    refs.punch30DueDateHelp.textContent = calculation.punch30TrackingDetail;

    const recordName = [record.superintendent, record.lotNumber].filter(Boolean).join(" • ") || "New review";
    refs.summaryRecordName.textContent = recordName;
    refs.summaryStatus.textContent = record.status || "Draft";
    refs.summaryStatus.className = `status-chip ${statusClass(record.status)}`;
    refs.summaryScore.textContent = `${calculation.criteriaPassed}/5`;
    refs.scoreRing.style.setProperty("--score", String(clamp(calculation.weightedScore, 0, 100)));
    refs.summaryBonus.textContent = formatCurrency(calculation.finalBonus);
    refs.summaryMultiplier.textContent = calculation.hasManualBonus
      ? `Manual override; calculated amount ${formatCurrency(calculation.recommendedBonus)}`
      : `${calculation.criteriaPassed}/5 requirements complete • ${calculation.payoutLabel}`;
    refs.summaryBaseBonus.textContent = formatCurrency(calculation.baseBonus);
    refs.summaryGrossBuild.textContent = calculation.grossBuildDays === null ? "—" : `${calculation.grossBuildDays} days${record.actualCloseDate ? "" : " to date"}`;
    refs.summaryDelayDays.textContent = `${calculation.approvedDelayDays} day${calculation.approvedDelayDays === 1 ? "" : "s"}`;
    refs.summaryAdjustedBuild.textContent = calculation.adjustedBuildDays === null ? "—" : `${calculation.adjustedBuildDays} days`;
    refs.summaryFinalGradeStatus.textContent = calculation.finalGradePhotosPass ? "Complete" : "Not complete";

    const readiness = getReadiness(record, calculation);
    refs.readinessList.innerHTML = readiness.map((item) => `
      <li class="readiness-item ${item.complete ? "is-complete" : ""}">
        <span class="readiness-icon">${item.complete ? "✓" : "!"}</span>
        <span>${escapeHtml(item.label)}</span>
      </li>`).join("");
  }

  function getReadiness(record, calculation = getRecordCalculations(record)) {
    const hasIdentity = Boolean(record.superintendent && record.lotNumber && record.address);
    const hasDates = Boolean(record.buildStartDate && record.actualCloseDate);
    const hasClosingDate = Boolean(record.closingDate);
    const pendingDelays = record.delays.filter((delay) => delay.decision === "Pending").length;
    const approvalComplete = !["Approved", "Paid"].includes(record.status) || Boolean(record.approvedBy && record.approvedDate);

    return [
      { complete: hasIdentity, label: hasIdentity ? "Superintendent, lot, and address entered" : "Enter superintendent, lot, and address" },
      { complete: hasDates, label: hasDates ? "Dig date and Certificate of Occupancy are entered" : "Enter the dig date and Certificate of Occupancy date" },
      { complete: hasClosingDate, label: hasClosingDate ? "Closing date is entered" : "Enter the closing date for the 30-day punch deadline" },
      { complete: pendingDelays === 0, label: pendingDelays === 0 ? "No pending delay decisions" : `${pendingDelays} delay exception${pendingDelays === 1 ? "" : "s"} still pending` },
      { complete: calculation.buildTimePass, label: calculation.buildTimePass ? `Adjusted build time is ${calculation.buildTimeLimitDays} days or less` : calculation.buildTimeAvailable ? `Adjusted build time exceeds ${calculation.buildTimeLimitDays} days` : "Build-time eligibility is not yet available" },
      { complete: calculation.finalGradePhotosPass, label: calculation.finalGradePhotosPass ? "Final-grade photos verified in Dropbox" : "Confirm final-grade photos are uploaded to Dropbox" },
      { complete: calculation.punch30Pass, label: calculation.punch30Pass ? "30-day punch list is complete" : calculation.punch30DueDate ? `30-day punch list ${calculation.punch30TrackingDetail.toLowerCase()}` : "Enter the closing date to calculate the 30-day punch deadline" },
      { complete: calculation.safetySwpppPass, label: calculation.safetySwpppPass ? "Safety / SWPPP inspections are complete" : "Complete the safety / SWPPP inspections" },
      { complete: calculation.superintendentChecklistPass, label: calculation.superintendentChecklistPass ? "End of build checklist is complete" : "Confirm the End of Build Checklist is complete" },
      { complete: approvalComplete, label: approvalComplete ? "Approval signoff is complete or not yet required" : "Add approver and approval date" }
    ];
  }

  function getBuildTimeLimitDays(record, settings = state.settings) {
    if (record?.homeType === "Townhome" || Number(record?.targetBuildDays) === TOWNHOME_BUILD_TIME_LIMIT_DAYS) {
      return TOWNHOME_BUILD_TIME_LIMIT_DAYS;
    }
    return BUILD_TIME_LIMIT_DAYS;
  }


  function getRecordCalculations(record, settings = state.settings) {
    normalizeRecordInPlace(record);
    const mode = settings.dayCountMode || "calendar";
    const endDate = record.actualCloseDate || todayIso();
    const grossBuildCount = record.buildStartDate
      ? countDateRange(record.buildStartDate, endDate, mode)
      : null;
    const grossBuildDays = grossBuildCount !== null && grossBuildCount > 0 ? grossBuildCount : null;
    const approvedDates = getApprovedDelayDateSet(record, endDate, mode);
    const approvedDelayDays = approvedDates.size;
    const adjustedBuildDays = grossBuildDays === null ? null : Math.max(0, grossBuildDays - approvedDelayDays);
    const buildTimeLimitDays = getBuildTimeLimitDays(record, settings);
    const buildTimeAvailable = Boolean(record.buildStartDate && record.actualCloseDate && adjustedBuildDays !== null);
    const buildTimePass = buildTimeAvailable && adjustedBuildDays <= buildTimeLimitDays;
    const targetBuildDays = buildTimeLimitDays;
    const varianceDays = adjustedBuildDays !== null ? adjustedBuildDays - buildTimeLimitDays : null;

    const finalGradePhotosPass = Boolean(record.finalGradePhotosComplete);
    const punch30Pass = Boolean(record.punch30Complete);
    const punch30DueDate = record.closingDate ? addCalendarDays(record.closingDate, 30) : "";
    const punch30DaysRemaining = punch30DueDate ? differenceInCalendarDays(todayIso(), punch30DueDate) : null;
    let punch30TrackingStatus = "not-available";
    let punch30TrackingLabel = "Needs close date";
    let punch30TrackingDetail = "Enter the closing date to calculate the 30-day deadline.";
    if (punch30Pass) {
      punch30TrackingStatus = "complete";
      punch30TrackingLabel = "Complete";
      punch30TrackingDetail = record.punch30CompletedDate
        ? `Completed ${formatDate(record.punch30CompletedDate)}.`
        : "Marked complete.";
    } else if (punch30DueDate && punch30DaysRemaining !== null) {
      if (punch30DaysRemaining < 0) {
        const overdueDays = Math.abs(punch30DaysRemaining);
        punch30TrackingStatus = "overdue";
        punch30TrackingLabel = `${overdueDays}d overdue`;
        punch30TrackingDetail = `Overdue by ${overdueDays} day${overdueDays === 1 ? "" : "s"}.`;
      } else if (punch30DaysRemaining <= 7) {
        punch30TrackingStatus = "due-soon";
        punch30TrackingLabel = punch30DaysRemaining === 0 ? "Due today" : `Due in ${punch30DaysRemaining}d`;
        punch30TrackingDetail = punch30DaysRemaining === 0
          ? "Due today."
          : `Due in ${punch30DaysRemaining} day${punch30DaysRemaining === 1 ? "" : "s"}.`;
      } else {
        punch30TrackingStatus = "open";
        punch30TrackingLabel = "Open";
        punch30TrackingDetail = `Due in ${punch30DaysRemaining} days.`;
      }
    }
    const safetySwpppPass = Boolean(record.safetySwpppComplete);
    const superintendentChecklistPass = Boolean(record.superintendentChecklistComplete);

    const resultById = {
      "build-time": { pass: buildTimePass, touched: buildTimeAvailable, evidence: buildTimeAvailable ? `${adjustedBuildDays} adjusted days` : "Needs dig date and Certificate of Occupancy" },
      "final-grade-photos": {
        pass: finalGradePhotosPass,
        touched: finalGradePhotosPass,
        evidence: finalGradePhotosPass
          ? `Uploaded to Dropbox${record.finalGradePhotosVerifiedDate ? `; verified ${formatDate(record.finalGradePhotosVerifiedDate)}` : ""}${record.finalGradePhotosNotes ? `; ${record.finalGradePhotosNotes}` : ""}`
          : "Not verified"
      },
      "punch-30": { pass: punch30Pass, touched: punch30Pass, evidence: punch30Pass ? `Completed${record.punch30CompletedDate ? ` ${formatDate(record.punch30CompletedDate)}` : ""}${record.punch30Notes ? `; ${record.punch30Notes}` : ""}` : "Not marked complete" },
      "safety-swppp": { pass: safetySwpppPass, touched: safetySwpppPass, evidence: safetySwpppPass ? `Completed${record.safetySwpppCompletedDate ? ` ${formatDate(record.safetySwpppCompletedDate)}` : ""}${record.safetySwpppNotes ? `; ${record.safetySwpppNotes}` : ""}` : "Not marked complete" },
      "superintendent-checklist": { pass: superintendentChecklistPass, touched: superintendentChecklistPass || Boolean(record.superintendentChecklistCompletedDate), evidence: superintendentChecklistPass ? `Completed${record.superintendentChecklistCompletedDate ? ` ${formatDate(record.superintendentChecklistCompletedDate)}` : ""}` : "Not marked complete" }
    };

    let weightedPoints = 0;
    let totalWeight = 0;
    const criteriaDetails = settings.criteria.map((criterion) => {
      const result = resultById[criterion.id] || { pass: false, touched: false, evidence: "Not complete" };
      const score = result.pass ? 100 : 0;
      const weight = Math.max(0, numberOr(criterion.weight, 0));
      weightedPoints += score * weight;
      totalWeight += weight;
      const notesByCriterion = {
        "punch-30": record.punch30Notes,
        "safety-swppp": record.safetySwpppNotes
      };
      const note = notesByCriterion[criterion.id] || result.evidence;
      return {
        id: criterion.id,
        name: criterion.name,
        weight,
        score,
        pass: result.pass,
        status: result.pass ? "Complete" : result.touched ? "Not eligible" : "Incomplete",
        note,
        auto: criterion.id === "build-time" || criterion.id === "final-grade-photos",
        weightedContribution: score * weight / 100,
        touched: result.touched
      };
    });

    const criteriaPassed = [buildTimePass, finalGradePhotosPass, punch30Pass, safetySwpppPass, superintendentChecklistPass].filter(Boolean).length;
    const allCriteriaPass = criteriaPassed === 5;
    const weightedScore = totalWeight > 0 ? weightedPoints / totalWeight : 0;
    const multiplier = allCriteriaPass ? 1 : 0;
    const payoutLabel = allCriteriaPass ? "Bonus eligible" : "Criteria incomplete";
    const baseBonus = BASE_BONUS_AMOUNT;
    const recommendedBonus = roundCurrency(baseBonus * multiplier);
    const manualBonus = record.manualApprovedBonus === "" || record.manualApprovedBonus === null || record.manualApprovedBonus === undefined
      ? null
      : Math.max(0, numberOr(record.manualApprovedBonus, 0));
    const finalBonus = manualBonus === null ? recommendedBonus : roundCurrency(manualBonus);

    return {
      mode,
      grossBuildDays,
      approvedDelayDays,
      adjustedBuildDays,
      targetBuildDays,
      buildTimeLimitDays,
      varianceDays,
      autoScheduleScore: buildTimeAvailable ? (buildTimePass ? 100 : 0) : null,
      scheduleBandLabel: buildTimePass ? `${buildTimeLimitDays} days or less` : buildTimeAvailable ? `Over ${buildTimeLimitDays} days` : "Needs dates",
      criteriaDetails,
      criteriaPassed,
      allCriteriaPass,
      buildTimeAvailable,
      buildTimePass,
      finalGradePhotosPass,
      punch30Pass,
      punch30DueDate,
      punch30DaysRemaining,
      punch30TrackingStatus,
      punch30TrackingLabel,
      punch30TrackingDetail,
      safetySwpppPass,
      superintendentChecklistPass,
      weightedScore: round(weightedScore, 2),
      payoutLabel,
      multiplier,
      baseBonus,
      recommendedBonus,
      finalBonus,
      hasManualBonus: manualBonus !== null
    };
  }

  function getApprovedDelayDateSet(record, endDate, mode) {
    const dates = new Set();
    const buildStart = record.buildStartDate || null;
    const buildEnd = endDate || null;

    record.delays
      .filter((delay) => delay.outsideControl && delay.decision === "Approved" && delay.startDate && delay.endDate)
      .forEach((delay) => {
        const start = buildStart && delay.startDate < buildStart ? buildStart : delay.startDate;
        const end = buildEnd && delay.endDate > buildEnd ? buildEnd : delay.endDate;
        enumerateDateKeys(start, end, mode).forEach((dateKey) => dates.add(dateKey));
      });

    return dates;
  }

  function getScheduleBand(varianceDays, bands) {
    const sorted = [...bands].sort((a, b) => {
      if (a.maxDaysLate === null || a.maxDaysLate === "") return 1;
      if (b.maxDaysLate === null || b.maxDaysLate === "") return -1;
      return numberOr(a.maxDaysLate, 0) - numberOr(b.maxDaysLate, 0);
    });
    return sorted.find((band) => band.maxDaysLate === null || band.maxDaysLate === "" || varianceDays <= numberOr(band.maxDaysLate, 0)) || null;
  }

  function getPayoutTier(score, tiers) {
    const sorted = [...tiers].sort((a, b) => numberOr(a.min, 0) - numberOr(b.min, 0));
    return sorted.find((tier) => {
      const min = numberOr(tier.min, 0);
      const max = tier.max === null || tier.max === "" ? Infinity : numberOr(tier.max, Infinity);
      return score >= min && score <= max + 0.0001;
    }) || null;
  }

  function handleGeneralSettingInput() {
    settingsDraft.programName = refs.settingsProgramName.value.trim() || DEFAULT_SETTINGS.programName;
    settingsDraft.defaultBaseBonus = BASE_BONUS_AMOUNT;
    settingsDraft.dayCountMode = "calendar";
    settingsDraft.githubRepo = refs.settingsGithubRepo.value.trim();
    settingsDraft.googleWebAppUrl = refs.settingsGoogleWebAppUrl.value.trim();
    settingsDraft.googleSyncKey = refs.settingsGoogleSyncKey.value.trim();
  }

  function renderSettings() {
    refs.settingsProgramName.value = settingsDraft.programName || DEFAULT_SETTINGS.programName;
    refs.settingsDefaultBaseBonus.value = String(BASE_BONUS_AMOUNT);
    refs.settingsDayCountMode.value = "calendar";
    refs.settingsGithubRepo.value = settingsDraft.githubRepo || "";
    refs.settingsGoogleWebAppUrl.value = settingsDraft.googleWebAppUrl || "";
    refs.settingsGoogleSyncKey.value = settingsDraft.googleSyncKey || "";
    updateGoogleSyncStatus();
    renderSettingsCriteria();
    renderSettingsPayouts();
    renderSettingsScheduleBands();
    updateWeightTotal();
  }

  function renderSettingsCriteria() {
    refs.settingsCriteriaBody.innerHTML = settingsDraft.criteria.map((criterion) => `
      <tr>
        <td><input class="criterion-name-input" type="text" data-settings-kind="criterion" data-settings-id="${escapeAttribute(criterion.id)}" data-settings-field="name" value="${escapeAttribute(criterion.name)}" aria-label="Criterion name"></td>
        <td class="number-cell"><input class="weight-input" type="number" min="0" max="100" step="1" data-settings-kind="criterion" data-settings-id="${escapeAttribute(criterion.id)}" data-settings-field="weight" value="${escapeAttribute(String(criterion.weight))}" aria-label="Criterion weight"></td>
        <td><textarea rows="2" data-settings-kind="criterion" data-settings-id="${escapeAttribute(criterion.id)}" data-settings-field="guidance" aria-label="Scoring guidance">${escapeHtml(criterion.guidance || "")}</textarea></td>
        <td><label class="auto-checkbox-wrap"><input type="checkbox" data-settings-kind="criterion" data-settings-id="${escapeAttribute(criterion.id)}" data-settings-field="autoSchedule" ${criterion.autoSchedule ? "checked" : ""} aria-label="Automatic schedule score"></label></td>
        <td><button type="button" class="icon-button danger" data-settings-action="delete" data-settings-kind="criterion" data-settings-id="${escapeAttribute(criterion.id)}" aria-label="Delete criterion">×</button></td>
      </tr>`).join("");
  }

  function renderSettingsPayouts() {
    const sorted = [...settingsDraft.payoutTiers].sort((a, b) => numberOr(a.min, 0) - numberOr(b.min, 0));
    refs.settingsPayoutBody.innerHTML = sorted.map((tier) => `
      <tr>
        <td><input type="number" min="0" max="100" step="0.01" data-settings-kind="payout" data-settings-id="${escapeAttribute(tier.id)}" data-settings-field="min" value="${escapeAttribute(String(tier.min))}" aria-label="Minimum score"></td>
        <td><input type="number" min="0" max="100" step="0.01" data-settings-kind="payout" data-settings-id="${escapeAttribute(tier.id)}" data-settings-field="max" value="${tier.max === null || tier.max === "" ? "" : escapeAttribute(String(tier.max))}" aria-label="Maximum score"></td>
        <td><input type="number" min="0" step="1" data-settings-kind="payout" data-settings-id="${escapeAttribute(tier.id)}" data-settings-field="multiplierPercent" value="${escapeAttribute(String(round(numberOr(tier.multiplier, 0) * 100, 2)))}" aria-label="Payout percent"></td>
        <td><input type="text" data-settings-kind="payout" data-settings-id="${escapeAttribute(tier.id)}" data-settings-field="label" value="${escapeAttribute(tier.label || "")}" aria-label="Tier label"></td>
        <td><button type="button" class="icon-button danger" data-settings-action="delete" data-settings-kind="payout" data-settings-id="${escapeAttribute(tier.id)}" aria-label="Delete payout tier">×</button></td>
      </tr>`).join("");
  }

  function renderSettingsScheduleBands() {
    const sorted = [...settingsDraft.scheduleBands].sort((a, b) => {
      if (a.maxDaysLate === null || a.maxDaysLate === "") return 1;
      if (b.maxDaysLate === null || b.maxDaysLate === "") return -1;
      return numberOr(a.maxDaysLate, 0) - numberOr(b.maxDaysLate, 0);
    });
    refs.settingsScheduleBody.innerHTML = sorted.map((band) => `
      <tr>
        <td><input type="number" step="1" data-settings-kind="schedule" data-settings-id="${escapeAttribute(band.id)}" data-settings-field="maxDaysLate" value="${band.maxDaysLate === null || band.maxDaysLate === "" ? "" : escapeAttribute(String(band.maxDaysLate))}" placeholder="Catch-all" aria-label="Maximum days late"></td>
        <td><input type="number" min="0" max="100" step="1" data-settings-kind="schedule" data-settings-id="${escapeAttribute(band.id)}" data-settings-field="score" value="${escapeAttribute(String(band.score))}" aria-label="Schedule score"></td>
        <td><input type="text" data-settings-kind="schedule" data-settings-id="${escapeAttribute(band.id)}" data-settings-field="label" value="${escapeAttribute(band.label || "")}" aria-label="Schedule band label"></td>
        <td><button type="button" class="icon-button danger" data-settings-action="delete" data-settings-kind="schedule" data-settings-id="${escapeAttribute(band.id)}" aria-label="Delete schedule band">×</button></td>
      </tr>`).join("");
  }

  function handleSettingsTableInput(event) {
    const input = event.target.closest("[data-settings-kind][data-settings-id][data-settings-field]");
    if (!input) return;
    const kind = input.dataset.settingsKind;
    const collection = kind === "criterion"
      ? settingsDraft.criteria
      : kind === "payout"
        ? settingsDraft.payoutTiers
        : settingsDraft.scheduleBands;
    const item = collection.find((entry) => entry.id === input.dataset.settingsId);
    if (!item) return;
    const field = input.dataset.settingsField;

    if (input.type === "checkbox") {
      item[field] = input.checked;
    } else if (field === "weight" || field === "min" || field === "score") {
      item[field] = numberOr(input.value, 0);
    } else if (field === "max" || field === "maxDaysLate") {
      item[field] = input.value === "" ? null : numberOr(input.value, 0);
    } else if (field === "multiplierPercent") {
      item.multiplier = Math.max(0, numberOr(input.value, 0) / 100);
    } else {
      item[field] = input.value;
    }

    if (kind === "criterion") updateWeightTotal();
  }

  function handleSettingsTableClick(event) {
    const button = event.target.closest("[data-settings-action='delete']");
    if (!button) return;
    const kind = button.dataset.settingsKind;
    const id = button.dataset.settingsId;
    if (kind === "criterion") {
      settingsDraft.criteria = settingsDraft.criteria.filter((item) => item.id !== id);
      renderSettingsCriteria();
      updateWeightTotal();
    } else if (kind === "payout") {
      settingsDraft.payoutTiers = settingsDraft.payoutTiers.filter((item) => item.id !== id);
      renderSettingsPayouts();
    } else {
      settingsDraft.scheduleBands = settingsDraft.scheduleBands.filter((item) => item.id !== id);
      renderSettingsScheduleBands();
    }
  }

  function addSettingCriterion() {
    settingsDraft.criteria.push({
      id: uid("criterion"),
      name: "New criterion",
      weight: 0,
      guidance: "Describe what a strong score looks like.",
      autoSchedule: false
    });
    renderSettingsCriteria();
    updateWeightTotal();
  }

  function addPayoutTier() {
    settingsDraft.payoutTiers.push({
      id: uid("tier"),
      min: 0,
      max: 100,
      multiplier: 1,
      label: "New tier"
    });
    renderSettingsPayouts();
  }

  function addScheduleBand() {
    settingsDraft.scheduleBands.push({
      id: uid("schedule"),
      maxDaysLate: null,
      score: 50,
      label: "New schedule band"
    });
    renderSettingsScheduleBands();
  }

  function updateWeightTotal() {
    const total = settingsDraft.criteria.reduce((sum, criterion) => sum + Math.max(0, numberOr(criterion.weight, 0)), 0);
    refs.weightTotalBadge.textContent = `${round(total, 2)}% total`;
    refs.weightTotalBadge.classList.toggle("is-invalid", Math.abs(total - 100) > 0.001);
  }

  async function saveSettings() {
    handleGeneralSettingInput();
    settingsDraft.criteria = clone(DEFAULT_SETTINGS.criteria);
    settingsDraft.payoutTiers = clone(DEFAULT_SETTINGS.payoutTiers);
    settingsDraft.scheduleBands = clone(DEFAULT_SETTINGS.scheduleBands);
    settingsDraft.defaultBaseBonus = BASE_BONUS_AMOUNT;
    settingsDraft.buildTimeLimitDays = BUILD_TIME_LIMIT_DAYS;
    settingsDraft.eligibleSuperintendents = [...ELIGIBLE_SUPERINTENDENTS];
    const validation = validateSettings(settingsDraft);
    if (!validation.valid) {
      showToast(validation.message, "error");
      return;
    }

    settingsDraft.criteria = settingsDraft.criteria.map((criterion) => ({
      ...criterion,
      name: criterion.name.trim() || "Unnamed criterion",
      weight: Math.max(0, numberOr(criterion.weight, 0)),
      guidance: criterion.guidance.trim()
    }));
    settingsDraft.payoutTiers = [...settingsDraft.payoutTiers].sort((a, b) => numberOr(a.min, 0) - numberOr(b.min, 0));
    settingsDraft.scheduleBands = [...settingsDraft.scheduleBands].sort((a, b) => {
      if (a.maxDaysLate === null) return 1;
      if (b.maxDaysLate === null) return -1;
      return numberOr(a.maxDaysLate, 0) - numberOr(b.maxDaysLate, 0);
    });

    state.settings = clone(settingsDraft);
    state.records.forEach((record) => normalizeRecordInPlace(record));
    await saveNow();
    updateProgramLabels();
    renderTracker();
    if (getCurrentRecord()) renderEditor();
    showToast("Program settings saved.", "success");
  }

  function validateSettings(settings) {
    if (!settings.criteria.length) return { valid: false, message: "Add at least one bonus criterion." };
    const total = settings.criteria.reduce((sum, criterion) => sum + Math.max(0, numberOr(criterion.weight, 0)), 0);
    if (Math.abs(total - 100) > 0.001) return { valid: false, message: `Criteria weights must total 100%. They currently total ${round(total, 2)}%.` };
    if (!settings.payoutTiers.length) return { valid: false, message: "Add at least one payout tier." };
    if (!settings.scheduleBands.length) return { valid: false, message: "Add at least one schedule scoring band." };
    if (settings.scheduleBands.filter((band) => band.maxDaysLate === null || band.maxDaysLate === "").length > 1) {
      return { valid: false, message: "Use only one blank maximum as the final schedule catch-all band." };
    }
    const invalidTier = settings.payoutTiers.find((tier) => {
      const max = tier.max === null || tier.max === "" ? Infinity : numberOr(tier.max, 100);
      return max < numberOr(tier.min, 0);
    });
    if (invalidTier) return { valid: false, message: "Each payout tier maximum must be at least its minimum." };
    const webAppUrl = String(settings.googleWebAppUrl || "").trim();
    if (webAppUrl && !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:\?.*)?$/.test(webAppUrl)) {
      return { valid: false, message: "Google reminder Web App URL should be the deployed Apps Script /exec URL." };
    }
    if (webAppUrl && String(settings.googleSyncKey || "").trim().length < 12) {
      return { valid: false, message: "Enter the Google sync key used by the Apps Script (at least 12 characters)." };
    }
    const repo = settings.githubRepo.trim();
    if (repo && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
      return { valid: false, message: "GitHub repository must use owner/repository format." };
    }
    return { valid: true, message: "" };
  }

  async function resetSettings() {
    const confirmed = await confirmAction(
      "Reset program settings?",
      "This restores the Arive Homes three-requirement bonus rules and general settings. Your bonus records will remain.",
      "Reset"
    );
    if (!confirmed) return;
    settingsDraft = clone(DEFAULT_SETTINGS);
    renderSettings();
    showToast("Program defaults restored in the form. Select Save settings to apply them.");
  }

  async function clearAllData() {
    const confirmed = await confirmAction(
      "Clear all bonus records?",
      "This permanently removes every tracked review and photo from this browser. Export a full backup first.",
      "Clear all"
    );
    if (!confirmed) return;
    state.records = [];
    currentRecordId = null;
    await saveNow();
    renderTracker();
    showToast("All bonus records cleared.", "success");
  }

  function updateProgramLabels() {
    document.title = `${state.settings.programName} | Arive Homes`;
  }

  function exportAllData() {
    const payload = {
      app: APP_ID,
      type: "backup",
      version: APP_VERSION,
      exportedAt: new Date().toISOString(),
      state
    };
    downloadJson(payload, `arive-superintendent-bonus-backup-${todayIso()}.json`);
    showToast("Full backup downloaded.", "success");
  }

  function exportCurrentRecord() {
    const record = getCurrentRecord();
    if (!record) return;
    const payload = {
      app: APP_ID,
      type: "record",
      version: APP_VERSION,
      exportedAt: new Date().toISOString(),
      settings: state.settings,
      record
    };
    downloadJson(payload, `${recordFileBase(record)}-editable.json`);
    showToast("Editable record downloaded.", "success");
  }

  async function handleImportFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      if (payload.app && payload.app !== APP_ID) throw new Error("This file is not an Arive bonus tracker export.");

      if (payload.type === "record" && payload.record) {
        const imported = normalizeRecord(payload.record);
        imported.id = uid("review");
        imported.createdAt = new Date().toISOString();
        imported.updatedAt = imported.createdAt;
        const confirmed = await confirmAction(
          "Import bonus record?",
          "This adds the exported review as a new record. Existing records will not be changed.",
          "Import"
        );
        if (!confirmed) return;
        state.records.unshift(imported);
        currentRecordId = imported.id;
        await saveNow();
        showToast("Bonus record imported.", "success");
        showView("editor");
        return;
      }

      const importedState = payload.state || payload;
      if (!importedState || !Array.isArray(importedState.records)) throw new Error("The backup does not contain bonus records.");
      const confirmed = await confirmAction(
        "Replace current data with this backup?",
        "This replaces all current records and program settings in this browser.",
        "Replace data"
      );
      if (!confirmed) return;
      state = normalizeState(importedState);
      settingsDraft = clone(state.settings);
      currentRecordId = null;
      await saveNow();
      renderTracker();
      renderSettings();
      updateProgramLabels();
      showToast("Backup imported.", "success");
      showView("tracker");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Could not import that file.", "error");
    }
  }

  function exportCsv() {
    const headers = [
      "Superintendent", "Status", "Community", "Lot", "Address", "Plan", "Job Number",
      "Dig Date", "Certificate of Occupancy", "Closing Date", "Gross Build Days", "Approved Delay Days",
      "Adjusted Build Days", "Build Time Limit", "Variance Days", "Requirements Complete",
      "Build Time Pass", "Final Grade Photos Verified", "Final Grade Verification Date", "Final Grade Notes",
      "30-Day Punch Due Date", "30-Day Punch Tracking Status", "30-Day Punch Complete", "30-Day Punch Completion Date", "30-Day Punch Notes",
      "Safety / SWPPP Complete", "Safety / SWPPP Verification Date", "Safety / SWPPP Notes",
      "End of Build Checklist Complete", "End of Build Checklist Completion Date",
      "Base Bonus", "Payout Percent", "Calculated Bonus", "Final Bonus",
      "Reviewed By", "Approved By", "Paid Date"
    ];
    const rows = state.records.map((record) => {
      const calculation = getRecordCalculations(record);
      return [
        record.superintendent, record.status, record.community, record.lotNumber, record.address,
        record.planName, record.jobNumber, record.buildStartDate, record.actualCloseDate,
        record.closingDate, calculation.grossBuildDays ?? "", calculation.approvedDelayDays,
        calculation.adjustedBuildDays ?? "", calculation.buildTimeLimitDays, calculation.varianceDays ?? "",
        `${calculation.criteriaPassed}/5`, calculation.buildTimePass ? "Yes" : "No",
        calculation.finalGradePhotosPass ? "Yes" : "No", record.finalGradePhotosVerifiedDate, record.finalGradePhotosNotes,
        calculation.punch30DueDate, calculation.punch30TrackingLabel,
        calculation.punch30Pass ? "Yes" : "No", record.punch30CompletedDate, record.punch30Notes,
        calculation.safetySwpppPass ? "Yes" : "No", record.safetySwpppCompletedDate, record.safetySwpppNotes,
        calculation.superintendentChecklistPass ? "Yes" : "No", record.superintendentChecklistCompletedDate,
        calculation.baseBonus, calculation.multiplier * 100,
        calculation.recommendedBonus, calculation.finalBonus, record.reviewedBy,
        record.approvedBy, record.paidDate
      ];
    });
    const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), `arive-superintendent-bonus-tracker-${todayIso()}.csv`);
    showToast("CSV exported.", "success");
  }

  async function downloadCurrentReport() {
    const record = getCurrentRecord();
    if (!record) return;
    try {
      const report = await buildReportHtml(record);
      downloadBlob(new Blob([report], { type: "text/html;charset=utf-8" }), `${recordFileBase(record)}-report.html`);
      showToast("Shareable report downloaded.", "success");
    } catch (error) {
      console.error(error);
      showToast("Could not create the report.", "error");
    }
  }

  async function printCurrentReport() {
    const record = getCurrentRecord();
    if (!record) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Your browser blocked the print window. Allow pop-ups and try again.", "error");
      return;
    }
    printWindow.document.write("<p style='font-family:sans-serif;padding:24px'>Preparing report…</p>");
    try {
      const report = await buildReportHtml(record, true);
      printWindow.document.open();
      printWindow.document.write(report);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 450);
    } catch (error) {
      console.error(error);
      printWindow.close();
      showToast("Could not prepare the print report.", "error");
    }
  }

  async function buildReportHtml(record, autoPrint = false) {
    const calculation = getRecordCalculations(record);
    const logo = await getLogoDataUrl();
    const criteriaRows = calculation.criteriaDetails.map((criterion) => `
      <tr>
        <td><strong>${escapeHtml(criterion.name)}</strong></td>
        <td><strong>${criterion.pass ? "Complete" : "Incomplete"}</strong></td>
        <td>${escapeHtml(criterion.note || "—")}</td>
      </tr>`).join("");
    const delayRows = record.delays.length ? record.delays.map((delay) => `
      <tr>
        <td>${escapeHtml(delay.category || "—")}</td>
        <td>${escapeHtml(formatDate(delay.startDate) || "—")}</td>
        <td>${escapeHtml(formatDate(delay.endDate) || "—")}</td>
        <td>${delay.outsideControl ? "Yes" : "No"}</td>
        <td>${escapeHtml(delay.decision || "Pending")}</td>
        <td>${escapeHtml(delay.approvedBy || "—")}</td>
        <td class="num">${countDateRange(delay.startDate, delay.endDate, state.settings.dayCountMode) ?? "—"}</td>
        <td>${escapeHtml(delay.notes || "—")}</td>
      </tr>`).join("") : `<tr><td colspan="8">No delay exceptions logged.</td></tr>`;
    const manualNote = calculation.hasManualBonus
      ? `<p class="notice"><strong>Manual bonus override:</strong> calculated recommendation was ${escapeHtml(formatCurrency(calculation.recommendedBonus))}; final approved amount shown is ${escapeHtml(formatCurrency(calculation.finalBonus))}.</p>`
      : "";

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(recordFileBase(record))} Bonus Report</title>
<style>
  :root{--green:#88c341;--green-dark:#5f9728;--ink:#24272a;--gray:#606163;--line:#d9ded8;--soft:#f4f6f2}
  *{box-sizing:border-box} body{margin:0;background:#eef1ed;color:var(--ink);font:14px/1.45 Arial,sans-serif}
  .page{max-width:1080px;margin:24px auto;background:#fff;box-shadow:0 12px 40px rgba(0,0,0,.1)}
  header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:24px 30px;background:var(--ink);color:#fff;border-bottom:4px solid var(--green)}
  header img{width:210px;height:auto}.header-copy{text-align:right}.header-copy h1{margin:0;font-size:22px}.header-copy p{margin:4px 0 0;color:#c8ceca}
  main{padding:28px 30px 36px}.kicker{color:var(--green-dark);font-weight:700;text-transform:uppercase;letter-spacing:.09em;font-size:11px}
  h2{margin:0;font-size:19px} h3{margin:0 0 10px;font-size:15px}.subtitle{margin:6px 0 0;color:#707572}
  .hero{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-bottom:22px}.status{display:inline-block;padding:5px 10px;border-radius:999px;background:#edf6e4;color:var(--green-dark);font-weight:700}
  .summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0 24px}.summary div{padding:14px;border:1px solid var(--line);border-radius:8px;background:var(--soft)}
  .summary span{display:block;color:#747975;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}.summary strong{display:block;margin-top:5px;font-size:22px}
  .summary .bonus{background:var(--ink);color:#fff;border-color:var(--ink)}.summary .bonus strong{color:var(--green)}.summary .bonus span{color:#cbd0cc}
  section{margin-top:24px;padding-top:20px;border-top:1px solid var(--line)}
  .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.info{padding:10px 0}.info span{display:block;color:#777c78;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:700}.info strong{display:block;margin-top:3px}
  table{width:100%;border-collapse:collapse;font-size:12px}th,td{padding:9px 8px;border:1px solid var(--line);text-align:left;vertical-align:top}th{background:var(--soft);color:#676c68;font-size:10px;text-transform:uppercase;letter-spacing:.05em}.num{text-align:right}
  .notice{padding:12px 14px;border-left:4px solid var(--green);background:#f5faef}.muted{color:#767b77}
  .photos{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.photos figure{margin:0;border:1px solid var(--line);border-radius:8px;overflow:hidden}.photos img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.photos figcaption{padding:8px 10px;font-size:11px}
  .notes{white-space:pre-wrap;padding:12px;border:1px solid var(--line);border-radius:8px;background:#fafbf9;min-height:50px}
  .signoff{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.signoff div{padding-top:26px;border-bottom:1px solid #888}.signoff small{display:block;padding:5px 0;color:#777}
  footer{display:flex;justify-content:space-between;gap:20px;padding:18px 30px;border-top:1px solid var(--line);color:#777;font-size:10px}
  @media(max-width:720px){.page{margin:0}.summary,.info-grid,.signoff{grid-template-columns:1fr 1fr}.photos{grid-template-columns:1fr}header{align-items:flex-start;flex-direction:column}.header-copy{text-align:left}}
  @media print{body{background:#fff}.page{max-width:none;margin:0;box-shadow:none}section,.photos figure{break-inside:avoid}header{-webkit-print-color-adjust:exact;print-color-adjust:exact}.summary .bonus{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body${autoPrint ? " data-auto-print='true'" : ""}>
<div class="page">
<header>
  <img src="${escapeAttribute(logo)}" alt="Arive Homes">
  <div class="header-copy"><h1>${escapeHtml(state.settings.programName)}</h1><p>Superintendent bonus review</p></div>
</header>
<main>
  <div class="hero">
    <div><span class="kicker">Individual home scorecard</span><h2>${escapeHtml(record.superintendent || "Unnamed superintendent")}</h2><p class="subtitle">${escapeHtml([record.lotNumber, record.address].filter(Boolean).join(" • ") || "Lot and address not entered")}</p></div>
    <span class="status">${escapeHtml(record.status || "Draft")}</span>
  </div>
  <div class="summary">
    <div><span>Requirements complete</span><strong>${calculation.criteriaPassed}/5</strong></div>
    <div><span>Adjusted build</span><strong>${calculation.adjustedBuildDays === null ? "—" : `${calculation.adjustedBuildDays} days`}</strong></div>
    <div><span>Approved delays</span><strong>${calculation.approvedDelayDays} days</strong></div>
    <div class="bonus"><span>Recommended / approved bonus</span><strong>${escapeHtml(formatCurrency(calculation.finalBonus))}</strong></div>
  </div>
  ${manualNote}

  <section><h3>Home and schedule</h3>
    <div class="info-grid">
      ${reportInfo("Community", record.community)}
      ${reportInfo("Lot", record.lotNumber)}
      ${reportInfo("Plan / model", record.planName)}
      ${reportInfo("Address", record.address)}
      ${reportInfo("Permit / job number", record.jobNumber)}
      ${reportInfo("Review period", record.reviewPeriod)}
      ${reportInfo("Build start", formatDate(record.buildStartDate))}
      ${reportInfo("Start milestone", record.startMilestone)}
      ${reportInfo("Certificate of Occupancy date", formatDate(record.actualCloseDate))}
      ${reportInfo("Closing date", formatDate(record.closingDate))}
      ${reportInfo("30-day punch due", formatDate(calculation.punch30DueDate))}
      ${reportInfo("30-day punch status", calculation.punch30TrackingDetail)}
      ${reportInfo("Gross build time", calculation.grossBuildDays === null ? "—" : `${calculation.grossBuildDays} days`)}
      ${reportInfo("Bonus build-time limit", `${calculation.buildTimeLimitDays} days`)}
      ${reportInfo("Approved delay days", `${calculation.approvedDelayDays} days`)}
      ${reportInfo("Adjusted build time", calculation.adjustedBuildDays === null ? "—" : `${calculation.adjustedBuildDays} days`)}
      ${reportInfo(`Variance to ${calculation.buildTimeLimitDays}-day limit`, calculation.varianceDays === null ? "—" : `${calculation.varianceDays > 0 ? "+" : ""}${calculation.varianceDays} days`)}
      ${reportInfo("Day-count method", state.settings.dayCountMode === "business" ? "Weekdays only" : "Calendar days")}
      ${reportInfo("Base bonus", formatCurrency(calculation.baseBonus))}
    </div>
  </section>

  <section><h3>Bonus criteria</h3>
    <table><thead><tr><th>Requirement</th><th>Status</th><th>Evidence / notes</th></tr></thead><tbody>${criteriaRows}</tbody></table>
  </section>

  <section><h3>Delay exception log</h3>
    <table><thead><tr><th>Cause</th><th>Start</th><th>End</th><th>Outside control</th><th>Decision</th><th>Approved by</th><th class="num">Days</th><th>Notes</th></tr></thead><tbody>${delayRows}</tbody></table>
    <p class="muted">Adjusted build time deducts only approved outside-control dates. Overlapping approved dates are counted once.</p>
  </section>

  <section><h3>Final grade photo verification</h3>
    <div class="info-grid">
      ${reportInfo("Uploaded to Dropbox", calculation.finalGradePhotosPass ? "Yes" : "No")}
      ${reportInfo("Verified date", formatDate(record.finalGradePhotosVerifiedDate))}
      ${reportInfo("Verification notes", record.finalGradePhotosNotes)}
    </div>
  </section>
  <section><h3>Safety / SWPPP and End of Build Checklist</h3>
    <div class="info-grid">
      ${reportInfo("Safety / SWPPP complete", calculation.safetySwpppPass ? "Yes" : "No")}
      ${reportInfo("Safety / SWPPP date", formatDate(record.safetySwpppCompletedDate))}
      ${reportInfo("Safety / SWPPP notes", record.safetySwpppNotes)}
      ${reportInfo("End of build checklist complete", calculation.superintendentChecklistPass ? "Yes" : "No")}
      ${reportInfo("Checklist completion date", formatDate(record.superintendentChecklistCompletedDate))}
    </div>
  </section>

  <section><h3>Review notes</h3><div class="notes">${escapeHtml(record.reviewNotes || "—")}</div></section>
  <section><h3>Approval notes</h3><div class="notes">${escapeHtml(record.approvalNotes || "—")}</div></section>

  <section><h3>Review and payment trail</h3>
    <div class="info-grid">
      ${reportInfo("Reviewed by", record.reviewedBy)}
      ${reportInfo("Review date", formatDate(record.reviewDate))}
      ${reportInfo("Submitted date", formatDate(record.submittedDate))}
      ${reportInfo("Approved by", record.approvedBy)}
      ${reportInfo("Approval date", formatDate(record.approvedDate))}
      ${reportInfo("Paid date", formatDate(record.paidDate))}
    </div>
    <div class="signoff"><div><small>Superintendent acknowledgment</small></div><div><small>Reviewer signature</small></div><div><small>Approver signature</small></div></div>
  </section>
</main>
<footer><span>Generated ${escapeHtml(new Date().toLocaleString())}</span><span>Arive Homes Superintendent Bonus Program</span></footer>
</div>
</body>
</html>`;
  }

  function reportInfo(label, value) {
    return `<div class="info"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || "—")}</strong></div>`;
  }

  async function getLogoDataUrl() {
    if (logoDataUrlCache) return logoDataUrlCache;
    const displayedLogo = document.querySelector(".brand-logo")?.src || "";
    if (displayedLogo.startsWith("data:")) {
      logoDataUrlCache = displayedLogo;
      return logoDataUrlCache;
    }
    try {
      const response = await fetch("assets/arive-logo.png");
      if (!response.ok) throw new Error("Could not load logo");
      const blob = await response.blob();
      logoDataUrlCache = await blobToDataUrl(blob);
    } catch (error) {
      console.debug("Using embedded report logo", error);
      logoDataUrlCache = EMBEDDED_WHITE_LOGO;
    }
    return logoDataUrlCache;
  }

  function createGithubIssue() {
    const record = getCurrentRecord();
    if (!record) return;
    const calculation = getRecordCalculations(record);
    const title = `[Bonus Review] ${record.superintendent || "Superintendent"} — ${record.lotNumber || record.address || "Home"}`;
    const body = buildGithubIssueMarkdown(record, calculation);
    const repo = state.settings.githubRepo.trim();

    if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
      const url = `https://github.com/${repo}/issues/new?labels=superintendent-bonus&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      showToast("GitHub issue draft opened. Final-grade photo verification is included in the review.");
    } else {
      void copyText(`${title}\n\n${body}`).then(() => {
        showToast("GitHub issue text copied. Add owner/repository in Program Settings to open issues directly.", "success");
      }).catch(() => showToast("Could not copy the issue text.", "error"));
    }
  }

  function buildGithubIssueMarkdown(record, calculation) {
    const criteria = calculation.criteriaDetails.map((criterion) => `| ${escapeMarkdown(criterion.name)} | ${criterion.pass ? "Complete" : "Incomplete"} | ${escapeMarkdown(criterion.note || "—")} |`).join("\n");
    const delays = record.delays.length
      ? record.delays.map((delay) => `| ${escapeMarkdown(delay.category || "—")} | ${delay.startDate || "—"} | ${delay.endDate || "—"} | ${delay.outsideControl ? "Yes" : "No"} | ${delay.decision || "Pending"} | ${escapeMarkdown(delay.approvedBy || "—")} | ${escapeMarkdown(delay.notes || "—")} |`).join("\n")
      : "| — | — | — | — | No delays logged | — | — |";

    return `## Home and superintendent
- **Superintendent:** ${escapeMarkdown(record.superintendent || "—")}
- **Community / lot:** ${escapeMarkdown([record.community, record.lotNumber].filter(Boolean).join(" / ") || "—")}
- **Address:** ${escapeMarkdown(record.address || "—")}
- **Plan / job:** ${escapeMarkdown([record.planName, record.jobNumber].filter(Boolean).join(" / ") || "—")}
- **Status:** ${escapeMarkdown(record.status || "Draft")}

## Build time
- **Build start:** ${record.buildStartDate || "—"} (${escapeMarkdown(record.startMilestone || "—")})
- **Certificate of Occupancy:** ${record.actualCloseDate || "—"}
- **Closing date:** ${record.closingDate || "—"}
- **Gross build time:** ${calculation.grossBuildDays ?? "—"} days
- **Approved outside-control delay days:** ${calculation.approvedDelayDays}
- **Adjusted build time:** ${calculation.adjustedBuildDays ?? "—"} days
- **Bonus build-time limit:** ${calculation.buildTimeLimitDays} days
- **Variance:** ${calculation.varianceDays === null ? "—" : `${calculation.varianceDays > 0 ? "+" : ""}${calculation.varianceDays} days`}

## Bonus recommendation
- **Requirements complete:** ${calculation.criteriaPassed}/5
- **Base bonus:** ${formatCurrency(calculation.baseBonus)}
- **Payout tier:** ${escapeMarkdown(calculation.payoutLabel)} (${round(calculation.multiplier * 100, 0)}%)
- **Calculated bonus:** ${formatCurrency(calculation.recommendedBonus)}
- **Final / approved bonus:** ${formatCurrency(calculation.finalBonus)}

| Requirement | Status | Evidence / notes |
|---|---|---|
${criteria}

## Delay exception log
| Cause | Start | End | Outside control | Decision | Approved by | Notes |
|---|---|---|---|---|---|---|
${delays}

## Final grade photos
- **Uploaded to Dropbox:** ${calculation.finalGradePhotosPass ? "Yes" : "No"}
- **Verified date:** ${record.finalGradePhotosVerifiedDate || "—"}
- **Notes / Dropbox reference:** ${escapeMarkdown(record.finalGradePhotosNotes || "—")}

## Safety / SWPPP inspections
- **Complete:** ${calculation.safetySwpppPass ? "Yes" : "No"}
- **Verified date:** ${record.safetySwpppCompletedDate || "—"}
- **Notes / inspection reference:** ${escapeMarkdown(record.safetySwpppNotes || "—")}

## End of Build Checklist
- **Complete:** ${calculation.superintendentChecklistPass ? "Yes" : "No"}
- **Completion date:** ${record.superintendentChecklistCompletedDate || "—"}

## Review trail
- **Reviewed by / date:** ${escapeMarkdown(record.reviewedBy || "—")} / ${record.reviewDate || "—"}
- **Approved by / date:** ${escapeMarkdown(record.approvedBy || "—")} / ${record.approvedDate || "—"}
- **Paid date:** ${record.paidDate || "—"}

### Review notes
${record.reviewNotes ? escapeMarkdown(record.reviewNotes) : "—"}

### Approval notes
${record.approvalNotes ? escapeMarkdown(record.approvalNotes) : "—"}`;
  }

  function scheduleSave() {
    refs.saveIndicator.textContent = "Saving...";
    refs.saveIndicator.classList.add("is-saving");
    refs.saveIndicator.classList.remove("is-error");
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      void persistState();
    }, 500);
  }

  async function saveNow() {
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = null;
    }
    await persistState();
  }

  async function persistState() {
    try {
      await storageSet(state);
      refs.saveIndicator.textContent = state.settings.googleWebAppUrl ? "Saved locally • sync queued" : "Saved locally";
      refs.saveIndicator.classList.remove("is-saving", "is-error");
      scheduleGoogleSheetSync();
    } catch (error) {
      console.error(error);
      refs.saveIndicator.textContent = "Save failed";
      refs.saveIndicator.classList.remove("is-saving");
      refs.saveIndicator.classList.add("is-error");
      showToast("The browser could not save this data. Export a backup and clear older records if needed.", "error");
    }
  }

  function updateGoogleSyncStatus(message = "") {
    if (!refs.googleSyncStatus) return;
    const configured = Boolean((settingsDraft.googleWebAppUrl || state.settings.googleWebAppUrl) && (settingsDraft.googleSyncKey || state.settings.googleSyncKey));
    refs.googleSyncStatus.textContent = message || (configured
      ? "Configured - saves will also sync 30-day punch-list data to the reminder sheet."
      : "Not connected yet - paste the Apps Script Web App URL and sync key below.");
    refs.googleSyncStatus.classList.toggle("is-connected", configured);
  }

  function scheduleGoogleSheetSync() {
    if (!state.settings.googleWebAppUrl || !state.settings.googleSyncKey) return;
    if (remoteSyncTimer) clearTimeout(remoteSyncTimer);
    remoteSyncTimer = setTimeout(() => {
      remoteSyncTimer = null;
      void syncAllRecordsToGoogleSheet(false);
    }, 1800);
  }

  function buildGoogleSyncRecord(record) {
    const calc = getRecordCalculations(record);
    return {
      id: record.id,
      superintendent: record.superintendent || "",
      community: record.community || "",
      lotNumber: record.lotNumber || "",
      address: record.address || "",
      buildStartDate: record.buildStartDate || "",
      closingDate: record.closingDate || "",
      punchDueDate: calc.punch30DueDate || "",
      punchComplete: Boolean(record.punch30Complete),
      punchCompletedDate: record.punch30CompletedDate || "",
      finalGradeComplete: Boolean(record.finalGradePhotosComplete),
      safetyComplete: Boolean(record.safetySwpppComplete),
      checklistComplete: Boolean(record.superintendentChecklistComplete),
      approvedDelayDays: calc.approvedDelayDays ?? 0,
      adjustedBuildDays: calc.adjustedBuildDays ?? "",
      buildTimeMet: Boolean(calc.buildTimePass),
      bonusEarned: Number(calc.finalBonus || 0),
      paymentStatus: record.status || "Draft",
      paidDate: record.paidDate || "",
      notes: record.punch30Notes || record.reviewNotes || "",
      reminderStatus: calc.punch30TrackingLabel || "",
      updatedAt: record.updatedAt || new Date().toISOString()
    };
  }

  async function syncAllRecordsToGoogleSheet(showFeedback = false) {
    const url = String(state.settings.googleWebAppUrl || "").trim();
    const key = String(state.settings.googleSyncKey || "").trim();
    if (!url || !key) {
      if (showFeedback) showToast("Google reminder sync is not configured yet.", "error");
      updateGoogleSyncStatus();
      return false;
    }
    try {
      const payload = {
        action: "syncRecords",
        syncKey: key,
        source: "Arive Superintendent Bonus Tracker v14",
        sentAt: new Date().toISOString(),
        records: state.records.map(buildGoogleSyncRecord)
      };
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-store",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      refs.saveIndicator.textContent = "Saved locally • sync sent";
      updateGoogleSyncStatus("Connected - latest records were sent to the reminder sheet.");
      if (showFeedback) showToast("Google Sheet sync sent. The reminder sheet should update within a few seconds.", "success");
      return true;
    } catch (error) {
      console.error("Google Sheet sync failed", error);
      refs.saveIndicator.textContent = "Saved locally • sync failed";
      updateGoogleSyncStatus("Connection needs attention - the last sync could not be sent.");
      if (showFeedback) showToast("Could not send the Google Sheet sync. Check the Web App URL and network connection.", "error");
      return false;
    }
  }

  async function loadState() {
    try {
      const stored = await storageGet();
      return stored || state;
    } catch (error) {
      console.error(error);
      return state;
    }
  }

  function openDatabase() {
    if (databasePromise) return databasePromise;
    if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB is not available"));

    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not open database"));
    });
    return databasePromise;
  }

  async function storageGet() {
    try {
      const db = await openDatabase();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readonly");
        const request = tx.objectStore(DB_STORE).get(DB_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      const fallback = localStorage.getItem(LOCAL_STORAGE_KEY);
      return fallback ? JSON.parse(fallback) : null;
    }
  }

  async function storageSet(value) {
    try {
      const db = await openDatabase();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readwrite");
        tx.objectStore(DB_STORE).put(value, DB_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error("Could not save database"));
        tx.onabort = () => reject(tx.error || new Error("Database save was aborted"));
      });
    } catch (error) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
  }

  function normalizeState(raw) {
    const normalized = {
      version: APP_VERSION,
      settings: normalizeSettings(raw?.settings || DEFAULT_SETTINGS),
      records: Array.isArray(raw?.records) ? raw.records.map(normalizeRecord) : []
    };
    return normalized;
  }

  function normalizeSettings(raw) {
    const settings = clone(DEFAULT_SETTINGS);
    settings.programName = typeof raw.programName === "string" ? raw.programName : settings.programName;
    settings.defaultBaseBonus = BASE_BONUS_AMOUNT;
    settings.dayCountMode = "calendar";
    settings.githubRepo = typeof raw.githubRepo === "string" ? raw.githubRepo : "";
    settings.googleWebAppUrl = typeof raw.googleWebAppUrl === "string" ? raw.googleWebAppUrl : "";
    settings.googleSyncKey = typeof raw.googleSyncKey === "string" ? raw.googleSyncKey : "";
    settings.buildTimeLimitDays = BUILD_TIME_LIMIT_DAYS;
    settings.eligibleSuperintendents = [...ELIGIBLE_SUPERINTENDENTS];

    if (Array.isArray(raw.criteria) && raw.criteria.length) {
      settings.criteria = raw.criteria.map((criterion) => ({
        id: String(criterion.id || uid("criterion")),
        name: String(criterion.name || "Unnamed criterion"),
        weight: Math.max(0, numberOr(criterion.weight, 0)),
        guidance: String(criterion.guidance || ""),
        autoSchedule: Boolean(criterion.autoSchedule),
        autoType: String(criterion.autoType || ""),
        required: criterion.required !== false
      }));
    }
    if (Array.isArray(raw.payoutTiers) && raw.payoutTiers.length) {
      settings.payoutTiers = raw.payoutTiers.map((tier) => ({
        id: String(tier.id || uid("tier")),
        min: numberOr(tier.min, 0),
        max: tier.max === null || tier.max === "" ? null : numberOr(tier.max, 100),
        multiplier: Math.max(0, numberOr(tier.multiplier, 0)),
        label: String(tier.label || "")
      }));
    }
    if (Array.isArray(raw.scheduleBands) && raw.scheduleBands.length) {
      settings.scheduleBands = raw.scheduleBands.map((band) => ({
        id: String(band.id || uid("schedule")),
        maxDaysLate: band.maxDaysLate === null || band.maxDaysLate === "" ? null : numberOr(band.maxDaysLate, 0),
        score: clamp(numberOr(band.score, 0), 0, 100),
        label: String(band.label || "")
      }));
    }
    settings.criteria = clone(DEFAULT_SETTINGS.criteria);
    settings.payoutTiers = clone(DEFAULT_SETTINGS.payoutTiers);
    settings.scheduleBands = clone(DEFAULT_SETTINGS.scheduleBands);
    settings.buildTimeLimitDays = BUILD_TIME_LIMIT_DAYS;
    settings.eligibleSuperintendents = [...ELIGIBLE_SUPERINTENDENTS];
    return settings;
  }

  function normalizeRecord(raw) {
    const blank = {
      ...makeBlankRecord(),
      id: String(raw?.id || uid("review")),
      createdAt: raw?.createdAt || new Date().toISOString(),
      updatedAt: raw?.updatedAt || new Date().toISOString()
    };
    const record = { ...blank, ...(raw || {}) };
    if (record.superintendent === "Burke Nielsen") record.superintendent = "Burke Nielson";
    record.delays = Array.isArray(raw?.delays) ? raw.delays.map((delay) => ({
      id: String(delay.id || uid("delay")),
      category: String(delay.category || "Other"),
      startDate: String(delay.startDate || ""),
      endDate: String(delay.endDate || ""),
      outsideControl: Boolean(delay.outsideControl),
      decision: ["Pending", "Approved", "Denied"].includes(delay.decision) ? delay.decision : "Pending",
      approvedBy: String(delay.approvedBy || ""),
      notes: String(delay.notes || "")
    })) : [];
    const legacyPhotos = Array.isArray(raw?.photos) ? raw.photos.filter((photo) => photo && photo.dataUrl) : [];
    const legacyCategories = new Set(legacyPhotos.map((photo) => String(photo.category || "")));
    const legacyPhotoSetComplete = REQUIRED_PHOTO_CATEGORIES.every((category) => legacyCategories.has(category));
    record.photos = [];
    record.finalGradePhotosComplete = typeof raw?.finalGradePhotosComplete === "boolean"
      ? raw.finalGradePhotosComplete
      : legacyPhotoSetComplete;
    record.finalGradePhotosVerifiedDate = String(raw?.finalGradePhotosVerifiedDate || "");
    record.finalGradePhotosNotes = String(raw?.finalGradePhotosNotes || (legacyPhotoSetComplete ? "Migrated from the prior in-app photo upload" : ""));
    record.criteriaScores = raw?.criteriaScores && typeof raw.criteriaScores === "object" ? clone(raw.criteriaScores) : {};
    record.autoScores = raw?.autoScores && typeof raw.autoScores === "object" ? clone(raw.autoScores) : {};
    record.punch30Complete = Boolean(raw?.punch30Complete);
    record.punch30CompletedDate = String(raw?.punch30CompletedDate || "");
    record.punch30Notes = String(raw?.punch30Notes || "");
    record.safetySwpppComplete = Boolean(raw?.safetySwpppComplete);
    record.safetySwpppCompletedDate = String(raw?.safetySwpppCompletedDate || "");
    record.safetySwpppNotes = String(raw?.safetySwpppNotes || "");
    record.superintendentChecklistComplete = Boolean(raw?.superintendentChecklistComplete);
    record.superintendentChecklistCompletedDate = String(raw?.superintendentChecklistCompletedDate || "");
    record.closingDate = String(raw?.closingDate || "");
    record.homeType = raw?.homeType === "Townhome" ? "Townhome" : "Single Family";
    normalizeRecordInPlace(record);
    return record;
  }

  function normalizeRecordInPlace(record) {
    if (!Array.isArray(record.delays)) record.delays = [];
    if (!Array.isArray(record.photos)) record.photos = [];
    if (!record.criteriaScores || typeof record.criteriaScores !== "object") record.criteriaScores = {};
    if (!record.autoScores || typeof record.autoScores !== "object") record.autoScores = {};
    state.settings.criteria.forEach((criterion) => {
      if (!record.criteriaScores[criterion.id]) record.criteriaScores[criterion.id] = { score: 0, note: "", touched: false };
      if (!(criterion.id in record.autoScores)) record.autoScores[criterion.id] = Boolean(criterion.autoSchedule);
    });
    if (typeof record.finalGradePhotosComplete !== "boolean") record.finalGradePhotosComplete = false;
    if (!record.finalGradePhotosVerifiedDate) record.finalGradePhotosVerifiedDate = "";
    if (!record.finalGradePhotosNotes) record.finalGradePhotosNotes = "";
    if (typeof record.punch30Complete !== "boolean") record.punch30Complete = false;
    if (!record.punch30CompletedDate) record.punch30CompletedDate = "";
    if (!record.punch30Notes) record.punch30Notes = "";
    if (typeof record.safetySwpppComplete !== "boolean") record.safetySwpppComplete = false;
    if (!record.safetySwpppCompletedDate) record.safetySwpppCompletedDate = "";
    if (!record.safetySwpppNotes) record.safetySwpppNotes = "";
    if (typeof record.superintendentChecklistComplete !== "boolean") record.superintendentChecklistComplete = false;
    if (!record.superintendentChecklistCompletedDate) record.superintendentChecklistCompletedDate = "";
    if (!record.closingDate) record.closingDate = "";
    if (!record.homeType) record.homeType = "Single Family";
    const usesTownhomeLimit = record.homeType === "Townhome" || Number(record.targetBuildDays) === TOWNHOME_BUILD_TIME_LIMIT_DAYS;
    record.homeType = usesTownhomeLimit ? "Townhome" : "Single Family";
    record.targetBuildDays = usesTownhomeLimit ? TOWNHOME_BUILD_TIME_LIMIT_DAYS : BUILD_TIME_LIMIT_DAYS;
    if (!record.status) record.status = "Draft";
    record.baseBonus = BASE_BONUS_AMOUNT;
  }

  function touchRecord(record) {
    record.updatedAt = new Date().toISOString();
  }

  function countDateRange(startValue, endValue, mode = "calendar") {
    if (!startValue || !endValue) return null;
    const start = parseIsoDate(startValue);
    const end = parseIsoDate(endValue);
    if (!start || !end || end < start) return 0;
    let count = 0;
    for (let cursor = start.getTime(); cursor <= end.getTime(); cursor += 86400000) {
      const date = new Date(cursor);
      if (mode !== "business" || (date.getUTCDay() !== 0 && date.getUTCDay() !== 6)) count += 1;
    }
    return count;
  }

  function enumerateDateKeys(startValue, endValue, mode = "calendar") {
    if (!startValue || !endValue) return [];
    const start = parseIsoDate(startValue);
    const end = parseIsoDate(endValue);
    if (!start || !end || end < start) return [];
    const keys = [];
    for (let cursor = start.getTime(); cursor <= end.getTime(); cursor += 86400000) {
      const date = new Date(cursor);
      if (mode === "business" && (date.getUTCDay() === 0 || date.getUTCDay() === 6)) continue;
      keys.push(date.toISOString().slice(0, 10));
    }
    return keys;
  }

  function parseIsoDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return null;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function addCalendarDays(value, days) {
    const date = parseIsoDate(value);
    if (!date) return "";
    date.setUTCDate(date.getUTCDate() + Number(days || 0));
    return date.toISOString().slice(0, 10);
  }

  function differenceInCalendarDays(fromValue, toValue) {
    const from = parseIsoDate(fromValue);
    const to = parseIsoDate(toValue);
    if (!from || !to) return null;
    return Math.round((to.getTime() - from.getTime()) / 86400000);
  }

  function todayIso() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function formatDate(value) {
    const date = parseIsoDate(value);
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(numberOr(value, 0));
  }

  function formatPercent(value, digits = 0) {
    return `${round(numberOr(value, 0), digits).toFixed(digits)}%`;
  }

  function round(value, digits = 0) {
    const factor = 10 ** digits;
    return Math.round((numberOr(value, 0) + Number.EPSILON) * factor) / factor;
  }

  function roundCurrency(value) {
    return Math.round(numberOr(value, 0) * 100) / 100;
  }

  function numberOr(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function positiveNumberOrNull(value) {
    if (value === "" || value === null || value === undefined) return null;
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.round(number) : null;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, numberOr(value, min)));
  }

  function uniqueSorted(values) {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }

  function statusClass(status) {
    return `status-${String(status || "Draft").toLowerCase().replace(/\s+/g, "-")}`;
  }

  function optionList(values, selected) {
    return values.map((value) => `<option value="${escapeAttribute(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
  }

  function recordFileBase(record) {
    const parts = [record.superintendent, record.lotNumber || record.address, "superintendent-bonus"]
      .filter(Boolean)
      .join("-");
    return safeFileName(parts || "arive-superintendent-bonus");
  }

  function safeFileName(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 90) || "arive-bonus-review";
  }

  function uid(prefix) {
    const id = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    return `${prefix}-${id}`;
  }

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function escapeMarkdown(value) {
    return String(value ?? "").replace(/([\\`*_{}\[\]()#+\-.!|>])/g, "\\$1");
  }

  function cssEscape(value) {
    if (globalThis.CSS?.escape) return CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function downloadJson(value, fileName) {
    downloadBlob(new Blob([JSON.stringify(value, null, 2)], { type: "application/json;charset=utf-8" }), fileName);
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error || new Error("Could not read blob"));
      reader.readAsDataURL(blob);
    });
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function showToast(message, type = "") {
    refs.toast.textContent = message;
    refs.toast.className = `toast is-visible${type ? ` is-${type}` : ""}`;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      refs.toast.className = "toast";
    }, 3600);
  }

  function confirmAction(title, message, confirmLabel = "Confirm") {
    if (!refs.confirmDialog?.showModal) {
      return Promise.resolve(window.confirm(`${title}\n\n${message}`));
    }
    refs.confirmDialogTitle.textContent = title;
    refs.confirmDialogMessage.textContent = message;
    refs.confirmDialogConfirm.textContent = confirmLabel;
    refs.confirmDialog.showModal();
    return new Promise((resolve) => {
      const onClose = () => {
        refs.confirmDialog.removeEventListener("close", onClose);
        resolve(refs.confirmDialog.returnValue === "confirm");
      };
      refs.confirmDialog.addEventListener("close", onClose);
    });
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("./sw.js").catch((error) => console.debug("Service worker unavailable", error));
    }
  }
})();
