# Arive Homes Superintendent Bonus Tracker

A GitHub Pages-ready web app for tracking superintendent bonuses by home or lot. It stores records in the browser, supports approved delay exceptions, verifies final-grade photos stored in Dropbox, tracks the 30-day punch list, safety / SWPPP inspections, and End of Build Checklist completion, and exports reports, CSV files, and JSON backups.

## Eligible superintendents

- Greg Worthington
- Jackson Chambers
- Burke Nielson
- Deryck Copley

## Bonus eligibility

The program uses a **$350 fixed base bonus** for every home. The amount is locked in the app and is not editable in individual reviews or Program Settings.

A home must meet all five requirements to receive the full base bonus:

1. **Build time:** Adjusted build time is **150 calendar days or less for single-family homes** or **205 calendar days or less for townhomes**.
2. **Final grade photos:** The required photos are uploaded to Dropbox and marked verified in the review.
3. **30-day punch list:** All 30-day punch list items are marked complete.
4. **Safety / SWPPP inspections:** Required inspections are completed and documented.
5. **End of Build Checklist:** Every required closeout item is completed, including city sidewalk approval/sign-off or a documented management-approved exception.

The app calculates:

> Adjusted build time = Gross build time - approved outside-control delay days

Overlapping approved delay dates count only once. A delay reduces build time only when it is marked outside the superintendent's control and approved.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder so `index.html` is at the repository root.
3. Open **Settings > Pages**.
4. Select **GitHub Actions** as the source.
5. Open the **Actions** tab and wait for the deployment to finish.

The included `.github/workflows/deploy-pages.yml` workflow publishes the site automatically.

## Updating an existing installation

Upload and replace these files and folders:

- `index.html`
- `styles.css`
- `app.js`
- `sw.js`
- `manifest.webmanifest`
- `assets/`
- `.github/`
- `docs/`

Then refresh the live site with **Ctrl + Shift + R**. Version 4 expands the program to five required items: adjusted build time, final-grade photo verification, 30-day punch completion, safety / SWPPP inspections, and End of Build Checklist completion. Existing home records remain available; the two new requirements begin incomplete until verified. The checklist file itself can be linked or embedded in a later update.

## Data and sharing

Records are saved in the current browser; final-grade photos remain in Dropbox. Use **Export backup** regularly. For sharing, download an individual HTML report, export an editable JSON record, print to PDF, or create a GitHub issue.

Do not commit employee bonus records, addresses, or jobsite documentation to a public repository unless Arive Homes has approved that use.


## Version 5 update

The tracker calculates the 30-day punch-list due date automatically as 30 calendar days after the Closing Date. Build time remains measured separately from Dig Date to Certificate of Occupancy. The dashboard shows overdue and due-soon counts, includes a punch-status filter, and displays each home’s punch deadline in the main table.


## Version 6 update

The individual-home review now includes the full End of Build Checklist. Every checklist item must be complete for the checklist criterion to pass. The final-grade-photo item is synchronized with the existing Dropbox verification field. City sidewalk approval/sign-off is included as a closeout item, with room in the checklist notes for a management-approved documented exception.


## Version 7 update

The base bonus is now hard-locked at **$350** for all records and Program Settings. Existing/imported records are normalized to the same $350 base amount. Build-time eligibility is **150 calendar days for single-family homes** and **205 calendar days for townhomes**, based on the Home Type selected in the review.

## Version 8 - selectable build-time goal

The Build-time goal in each review is now an editable dropdown. Choose **150 days - Single Family** or **205 days - Townhome**. The Home Type and Build-time goal controls stay synchronized, so changing either one updates the other. The base bonus remains hard-locked at **$350**.


## Version 9 - build-time goal control fix

The build-time goal control now uses a single deterministic source of truth. Selecting **205 days - Townhome** immediately sets the record to Townhome, retains 205 as the saved goal, and shows an on-screen confirmation. Selecting **150 days - Single Family** does the reverse. The base bonus remains hard-locked at **$350**. Versioned assets and a network-first service worker prevent an older JavaScript file from being reused after GitHub Pages updates.

## Monthly owner summary

Version 10 adds a dedicated `monthly-summary.html` owner-report page. It reads the same locally saved tracker data, lets you choose any CO month, and summarizes homes at CO, bonus eligibility, on-time build rate, adjusted build days, approved delay days, paid/recommended bonuses, superintendent performance, requirement completion, and home-level detail. Use **Print / Save PDF** or **Download Report** to send a static monthly snapshot to ownership.



## Version 11 form simplification

The schedule form no longer includes Original Target Close or Revised Target Close. It now uses a single **Closing Date** for the 30-day punch deadline, while **Certificate of Occupancy Date** remains the end point for build-time measurement.

## Version 12 checklist simplification

The Bonus Tracker no longer duplicates the item-by-item End of Build Checklist. The detailed checklist is managed separately. The bonus record now stores only whether the End of Build Checklist was completed and the date it was completed.


## Version 14 dashboard build-time split

The main tracker dashboard now shows **separate average adjusted build times** for **Single Family** homes (150-day goal) and **Townhomes** (205-day goal). The averages only include records with a Certificate of Occupancy date and a calculable adjusted build time.

## 30-Day Punch List Email Reminders (Version 13)

Version 13 can sync bonus records to the private **Arive Homes Superintendent Bonus Tracker Data** Google Sheet and use Google Apps Script to send a daily email summary to Brendan and Robbie for incomplete punch lists due within 7 days or overdue.

The website does **not** require Google Contacts access. The Web App URL and private sync key are entered in Program Settings and remain in the tracker's local browser storage. Do not commit the sync key to GitHub.

See `google-apps-script/SETUP.md` for the one-time setup and `google-apps-script/Code.gs` for the Apps Script code.
