/**
 * ==============================================================================
 * TEM Axon & Myelin Challenge - Central Configuration
 * ==============================================================================
 * Edit this file to update external URLs, submission portals, deadlines,
 * and state toggles without touching the underlying HTML or application logic.
 */

const CONFIG = {
  // Registration deadline in ISO format (YYYY-MM-DDTHH:mm:ss)
  // The registration form automatically locks after this timestamp.
  REGISTRATION_DEADLINE: "2026-11-09T23:59:59",

  // Final submission deadline in ISO format
  SUBMISSION_DEADLINE: "2026-11-24T23:59:59",

  // Google Apps Script Webhook URL for handling registration form submissions.
  // Replace with your deployed Google Apps Script Web App URL.
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxxDuxJ0ffF0wThrpYaQAjLRDaJrxqto-ZIJ4sfEHsSMIkiB_44uD28ud_rR3UlDhGtmg/exec",

  // ICM OneDrive link for downloading the Training & Validation dataset (~4-5 GB)
  TRAIN_DATA_ONEDRIVE_URL: "https://instituteicm-my.sharepoint.com/:f:/g/personal/gabriel_jimenez_icm-institute_org/IgD_696iwdhsTYidCjpwylniARnmAkqJ_7V10nvfBr-3eY8?e=UbK64W",

  // ICM OneDrive link for the unannotated Test dataset
  TEST_DATA_ONEDRIVE_URL: "https://instituteicm-my.sharepoint.com/:f:/g/personal/gabriel_jimenez_icm-institute_org/IgDOQhKxfdboR7QfWVIVyiEgARd__KEsqC-2sMzSlT9B-ps?e=ysu3gw",

  // Toggle for Test Dataset release:
  // - false: Button displays "Test Data (Coming Soon)" and is disabled.
  // - true:  Button displays "Download Test Set" and directs participants to TEST_DATA_ONEDRIVE_URL.
  IS_TEST_DATA_RELEASED: false,

  // ICM OneDrive File Request / Submission portal link for uploading final .zip submissions
  SUBMISSION_ONEDRIVE_URL: "https://instituteicm-my.sharepoint.com/:f:/g/personal/gabriel_jimenez_icm-institute_org/IgBUn2VJHEQDSo-G4YSUENw8AR3PdmdlUzfAfE5fDlGiHxw",

  // Toggle for Winner & Leaderboard announcement:
  // - false: Displays the "Winners will be announced at SIPAIM 2026" banner.
  // - true:  Displays the podium, official winners, and full leaderboard table.
  WINNERS_ANNOUNCED: false,

  // Contact and Challenge Metadata
  CHALLENGE_TITLE: "TEM Axon & Myelin Segmentation Challenge",
  CHALLENGE_SUBTITLE: "Paris Brain Institute (ICM) • SIPAIM 2026",
  CONTACT_EMAIL: "gabriel.jimenez@icm-institute.org"
};

// Make available globally
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
