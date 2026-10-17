# TEM Axon & Myelin Segmentation Challenge Website
**Paris Brain Institute (Institut du Cerveau - ICM) • SIPAIM 2026**

A clean, responsive, high-performance academic challenge website built for direct deployment on **GitHub Pages** using vanilla HTML5, CSS3, and modern ES6 JavaScript.

---

## 🏛️ Architecture & Easy Content Management

The entire site is architected for effortless updates without touching complex HTML:

### 1. Central Configuration: `js/config.js`
All external URLs, deadlines, and state toggles are centralized in [`js/config.js`](file:///g:/Other%20computers/My%20Computer/ICM.Quant/tem-challenge/js/config.js):
- `REGISTRATION_DEADLINE`: `"2026-11-09T23:59:59"` (Automatically locks the registration form after this date/time)
- `GOOGLE_SCRIPT_URL`: Webhook URL for the Google Sheets registration endpoint
- `TRAIN_DATA_ONEDRIVE_URL`: Link to the ICM OneDrive training dataset
- `TEST_DATA_ONEDRIVE_URL`: Link to the test dataset
- `IS_TEST_DATA_RELEASED`: Boolean (`false` displays disabled "Coming Soon" button; `true` activates test data download)
- `SUBMISSION_ONEDRIVE_URL`: Link to the ICM OneDrive File Request portal
- `WINNERS_ANNOUNCED`: Boolean (`false` displays the "Winners will be announced at SIPAIM 2026" banner; `true` reveals the podium and full leaderboard)

### 2. Standalone Markdown Content (`content/` directory)
Content is written in standard Markdown and dynamically fetched & rendered on page load with **marked.js** and **KaTeX** for mathematical formulas ($g$-ratio, $\text{HD}_{95}$, $\text{Dice}$, etc.):
- [`content/challenge.md`](file:///g:/Other%20computers/My%20Computer/ICM.Quant/tem-challenge/content/challenge.md): Overview, biological motivation, and critical challenge dates.
- [`content/data.md`](file:///g:/Other%20computers/My%20Computer/ICM.Quant/tem-challenge/content/data.md): 2-Class TEM dataset description, acquisition specs ($80 - 120\,\text{kV}$, $3.8 - 5.5\,\text{nm/px}$), and label encoding (Class 0: Background, Class 1: Axon, Class 2: Myelin).
- [`content/submission.md`](file:///g:/Other%20computers/My%20Computer/ICM.Quant/tem-challenge/content/submission.md): Quantitative evaluation metrics, validation protocol, and required deliverables.
- [`content/winners.md`](file:///g:/Other%20computers/My%20Computer/ICM.Quant/tem-challenge/content/winners.md): Official leaderboard and winner announcements.

---

## 🎨 Paris Brain Institute (ICM) Visual Identity

Designed to strictly follow the light-mode palette of [https://institutducerveau.org/](https://institutducerveau.org/):
- **Primary Navy**: `#001A3D` (headers, sticky navigation, footer)
- **Secondary Deep Blue**: `#0F2547` (section headers, table headers, badges)
- **ICM Coral-Red Accent**: `#E63946` (primary CTAs: "Register", "Download Dataset", "Upload to ICM OneDrive")
- **Clinical Blue Accent**: `#0077B6` (hyperlinks, callout borders, metric highlights)
- **Backgrounds**: Crisp white `#FFFFFF` for content cards alternating with Soft Ice Gray `#F4F6F9` for section contrast.
- **Logos**: Dedicated responsive slots for:
  - `images/icm-logo.png`: Institut du Cerveau - Paris Brain Institute
  - `images/lab-logo.png`: ICM.Quant Microstructure & TEM Lab
  - `images/sipaim-logo.png`: SIPAIM 2026 International Symposium

---

## 📋 4-Section Layout

1. **Challenge & Registration (`#challenge`)**:
   - Renders `content/challenge.md` alongside an interactive **Registration Card**.
   - Fields: Full Name, Institution/Affiliation, Contact Email, and a smooth-reveal checkbox for Team Name & Members.
   - Built-in countdown timer and auto-close logic locking the form after Nov 9, 2026.
2. **Dataset (`#data`)**:
   - Renders `content/data.md` and displays a prominent **Data Download Card** with direct ICM OneDrive training data access and toggled test dataset release.
3. **Metrics & Submission (`#submission`)**:
   - Renders `content/submission.md` with KaTeX rendered equations for Dice, $\text{HD}_{95}$, and $g$-ratio error $\Delta g$.
   - Interactive **Pre-Submission Checklist** with live progress tracking across all 3 deliverables (Predictions, Method PDF, Replicable Code).
   - "Upload to ICM OneDrive" CTA button.
4. **Winners (`#winners`)**:
   - Renders `content/winners.md` with a toggleable banner or podium/leaderboard UI driven by `CONFIG.WINNERS_ANNOUNCED`.

---

## 🚀 Deployment to GitHub Pages

1. Commit and push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial challenge website release"
   git remote add origin https://github.com/your-org/tem-challenge.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Branch**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
3. Your challenge website is live immediately at `https://your-org.github.io/tem-challenge/`!

---

## 📊 Google Sheets Registration Webhook Setup

To record registration submissions automatically into a private Google Sheet:
1. Create a Google Sheet named **"TEM_Challenge_Registrations"**.
2. Click **Extensions > Apps Script** and paste:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     if (sheet.getLastRow() === 0) {
       sheet.appendRow(["Timestamp", "Full Name", "Institution", "Email", "Is Team?", "Team Details"]);
     }
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([new Date(), data.fullName, data.institution, data.email, data.isTeam ? "Yes" : "No", data.teamDetails || ""]);
     return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. Click **Deploy > New deployment** > Select **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment Web App URL and paste it into [`js/config.js`](file:///g:/Other%20computers/My%20Computer/ICM.Quant/tem-challenge/js/config.js) under `GOOGLE_SCRIPT_URL`.
