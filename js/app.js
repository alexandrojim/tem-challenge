/**
 * ==============================================================================
 * TEM Axon & Myelin Challenge - Master Application Script
 * Paris Brain Institute (Institut du Cerveau - ICM)
 * ==============================================================================
 */

(function () {
  "use strict";

  // Cache DOM Elements
  const DOM = {
    // Navigation & Header
    siteHeader: document.getElementById("site-header"),
    navLinks: document.querySelectorAll(".nav-link"),
    mobileToggle: document.getElementById("mobile-nav-toggle"),
    mainNav: document.getElementById("main-nav"),
    backToTopBtn: document.getElementById("back-to-top"),
    headerCountdown: document.getElementById("header-countdown-timer"),

    // Markdown Containers
    challengeContent: document.getElementById("challenge-content"),
    dataContent: document.getElementById("data-content"),
    submissionContent: document.getElementById("submission-content"),
    winnersContent: document.getElementById("winners-content"),
    acknowledgmentsContent: document.getElementById("acknowledgments-content"),

    // Section 1: Registration Form
    regForm: document.getElementById("registration-form"),
    regClosedNotice: document.getElementById("reg-closed-notice"),
    regIsTeamCheckbox: document.getElementById("reg-is-team"),
    teamDetailsSlider: document.getElementById("team-details-slider"),
    teamDetailsInput: document.getElementById("reg-team-details"),
    btnSubmitReg: document.getElementById("btn-submit-registration"),
    regStatusLoading: document.getElementById("reg-status-loading"),
    regStatusSuccess: document.getElementById("reg-status-success"),
    regStatusError: document.getElementById("reg-status-error"),
    regErrorMessage: document.getElementById("reg-error-message"),

    // Section 2: Dataset Buttons
    btnTrainDownload: document.getElementById("btn-train-download"),
    btnTestDownload: document.getElementById("btn-test-download"),
    testDownloadLabel: document.getElementById("test-download-label"),

    // Section 3: Submission & Checklist
    checklistCheckboxes: document.querySelectorAll(".checklist-checkbox"),
    checklistCounterText: document.getElementById("checklist-counter-text"),
    checklistProgressFill: document.getElementById("checklist-progress-fill"),
    btnUploadSubmission: document.getElementById("btn-upload-submission"),

    // Section 4: Winners
    winnersBannerPending: document.getElementById("winners-banner-pending"),
    winnersPodiumContainer: document.getElementById("winners-podium-container")
  };

  /**
   * 1. Initialize Configuration & Dynamic UI Toggles
   */
  function initConfig() {
    const config = window.CONFIG || {};

    // Dataset Links (Section 2)
    if (DOM.btnTrainDownload && config.TRAIN_DATA_ONEDRIVE_URL) {
      DOM.btnTrainDownload.href = config.TRAIN_DATA_ONEDRIVE_URL;
    }

    if (DOM.btnTestDownload) {
      if (config.IS_TEST_DATA_RELEASED) {
        DOM.btnTestDownload.href = config.TEST_DATA_ONEDRIVE_URL || "#";
        DOM.btnTestDownload.classList.remove("disabled");
        if (DOM.testDownloadLabel) {
          DOM.testDownloadLabel.textContent = "Download Test Dataset (ICM OneDrive)";
        }
      } else {
        DOM.btnTestDownload.removeAttribute("href");
        DOM.btnTestDownload.classList.add("disabled");
        if (DOM.testDownloadLabel) {
          DOM.testDownloadLabel.textContent = "Test Dataset (Coming Soon - Nov 10, 2026)";
        }
      }
    }

    // Submission Link (Section 3)
    if (DOM.btnUploadSubmission && config.SUBMISSION_ONEDRIVE_URL) {
      DOM.btnUploadSubmission.href = config.SUBMISSION_ONEDRIVE_URL;
    }

    // Winners State (Section 4)
    if (DOM.winnersBannerPending && DOM.winnersPodiumContainer) {
      if (config.WINNERS_ANNOUNCED) {
        DOM.winnersBannerPending.style.display = "none";
        DOM.winnersPodiumContainer.style.display = "grid";
      } else {
        DOM.winnersBannerPending.style.display = "block";
        DOM.winnersPodiumContainer.style.display = "none";
      }
    }

    // Initialize Registration Deadline Auto-Close & Real-time Countdown
    initDeadlines(config);

    // Immediately render math on document body after configuration injection
    renderMath(document.body);
  }

  /**
   * 2. Registration Deadline & Real-time Countdown Timer
   */
  function initDeadlines(config) {
    if (!config.REGISTRATION_DEADLINE) return;

    const deadlineDate = new Date(config.REGISTRATION_DEADLINE);

    function updateDeadlineUI() {
      const now = new Date();
      const diffMs = deadlineDate - now;

      // Check if registration has closed
      if (diffMs <= 0) {
        if (DOM.headerCountdown) {
          DOM.headerCountdown.textContent = "Registration Closed";
          DOM.headerCountdown.style.color = "var(--icm-coral)";
        }

        // Lock Registration Form
        if (DOM.regForm) {
          const inputs = DOM.regForm.querySelectorAll("input, button");
          inputs.forEach((input) => {
            input.disabled = true;
          });
        }

        if (DOM.regClosedNotice) {
          DOM.regClosedNotice.classList.add("visible");
        }

        if (DOM.btnSubmitReg) {
          DOM.btnSubmitReg.disabled = true;
          DOM.btnSubmitReg.innerHTML = `<span>Registration Closed</span>`;
        }

        return; // stop timer loop
      }

      // Calculate days, hours, minutes, seconds remaining
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      const formattedStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (DOM.headerCountdown) {
        DOM.headerCountdown.textContent = formattedStr;
      }
    }

    updateDeadlineUI();
    // Update every second
    setInterval(updateDeadlineUI, 1000);
  }

  /**
   * Helper function to render math expressions using KaTeX Auto-Render
   */
  function renderMath(element = document.body) {
    if (window.renderMathInElement) {
      renderMathInElement(element, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }
  }

  // Expose renderMath globally
  if (typeof window !== "undefined") {
    window.renderMath = renderMath;
  }

  /**
   * 3. Markdown Parser with Math Protection
   * Protects math blocks ($$...$$ and $...$) from having their underscores (_)
   * stripped into <em> tags by marked.js before calling renderMath(container).
   */
  function renderMarkdownWithKaTeX(markdownText) {
    if (!markdownText) return "";

    // Step 1: Protect code blocks and inline code so math regex doesn't match inside code
    const codeBlocks = [];
    let processed = markdownText.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
      const token = `KATEXCODEPROTECT${codeBlocks.length}TOKEN`;
      codeBlocks.push(match);
      return token;
    });

    // Step 2: Protect Block Math $$...$$ from marked.js underscore conversion
    const mathBlocks = [];
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
      const token = `KATEXBLOCKMATHPROTECT${mathBlocks.length}TOKEN`;
      mathBlocks.push(match);
      return token;
    });

    // Step 3: Protect Inline Math $...$ from marked.js underscore conversion
    const mathInlines = [];
    processed = processed.replace(/(?<!\\)\$((?:\\\$|[^$\n])+?)\$/g, (match) => {
      const token = `KATEXINLINEMATHPROTECT${mathInlines.length}TOKEN`;
      mathInlines.push(match);
      return token;
    });

    // Step 4: Restore code blocks before marked parsing so code syntax is preserved
    processed = processed.replace(/KATEXCODEPROTECT(\d+)TOKEN/g, (_, i) => codeBlocks[Number(i)]);

    // Step 5: Run marked.parse on the sanitized markdown
    let html = "";
    if (typeof marked !== "undefined" && marked.parse) {
      marked.setOptions({
        gfm: true,
        breaks: false
      });
      html = marked.parse(processed);
    } else {
      // Basic fallback
      html = processed
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/\n\n/gim, "<p></p>");
    }

    // Step 6: Restore display math blocks wrapped in the display container
    mathBlocks.forEach((math, i) => {
      const token = `KATEXBLOCKMATHPROTECT${i}TOKEN`;
      const pRegex = new RegExp(`<p>\\s*${token}\\s*<\\/p>`, "g");
      if (pRegex.test(html)) {
        html = html.replace(new RegExp(`<p>\\s*${token}\\s*<\\/p>`, "g"), () => `<div class="katex-display-container">${math}</div>`);
      } else {
        html = html.replace(new RegExp(token, "g"), () => `<div class="katex-display-container">${math}</div>`);
      }
    });

    // Step 7: Restore inline math blocks
    mathInlines.forEach((math, i) => {
      const token = `KATEXINLINEMATHPROTECT${i}TOKEN`;
      html = html.replace(new RegExp(token, "g"), () => math);
    });

    return html;
  }

  /**
   * 4. Fetch and Render Markdown Files
   */
  async function loadMarkdownFile(url, targetElement, fallbackContent = "") {
    if (!targetElement) return;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status} fetching ${url}`);
      }
      const markdownText = await response.text();
      targetElement.innerHTML = renderMarkdownWithKaTeX(markdownText);
      renderMath(targetElement);
    } catch (error) {
      console.warn(`Could not fetch ${url} directly (e.g. file:// protocol restriction). Using fallback.`, error);
      if (fallbackContent) {
        targetElement.innerHTML = renderMarkdownWithKaTeX(fallbackContent);
        renderMath(targetElement);
      } else {
        targetElement.innerHTML = `
          <div style="padding: 24px; border: 1px dashed var(--icm-border); border-radius: 8px; background: #FFF;">
            <p><strong>Note:</strong> Content from <code>${url}</code> could not be fetched via network request (this commonly happens when opening via local <code>file:///</code> without an HTTP server).</p>
            <p>Deploy to <strong>GitHub Pages</strong> or run a local HTTP server (e.g. <code>npx serve</code> or Python <code>http.server</code>) for automatic dynamic fetching.</p>
          </div>
        `;
      }
    }
  }

  function loadAllContent() {
    loadMarkdownFile("content/challenge.md", DOM.challengeContent);
    loadMarkdownFile("content/data.md", DOM.dataContent);
    loadMarkdownFile("content/submission.md", DOM.submissionContent);
    loadMarkdownFile("content/winners.md", DOM.winnersContent);
    loadMarkdownFile("content/acknowledgments.md", DOM.acknowledgmentsContent);
  }

  /**
   * 5. Interactive Registration Form Handling
   */
  function initRegistrationForm() {
    if (!DOM.regForm) return;

    function hideBanner(el) {
      if (!el) return;
      el.hidden = true;
      el.setAttribute("hidden", "");
      el.style.setProperty("display", "none", "important");
    }

    function showBanner(el) {
      if (!el) return;
      el.hidden = false;
      el.removeAttribute("hidden");
      el.style.setProperty("display", "flex", "important");
    }

    // Ensure all banners are strictly hidden by default on page load
    hideBanner(DOM.regStatusLoading);
    hideBanner(DOM.regStatusSuccess);
    hideBanner(DOM.regStatusError);

    // Team Checkbox smooth reveal
    if (DOM.regIsTeamCheckbox && DOM.teamDetailsSlider) {
      DOM.regIsTeamCheckbox.addEventListener("change", function () {
        if (this.checked) {
          DOM.teamDetailsSlider.classList.add("revealed");
          if (DOM.teamDetailsInput) {
            setTimeout(() => DOM.teamDetailsInput.focus(), 150);
          }
        } else {
          DOM.teamDetailsSlider.classList.remove("revealed");
        }
      });
    }

    // Form Submission
    DOM.regForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const config = window.CONFIG || {};

      // Check auto-close
      if (config.REGISTRATION_DEADLINE && new Date() > new Date(config.REGISTRATION_DEADLINE)) {
        alert("Registration is currently closed as the deadline has passed.");
        return;
      }

      const fullName = (document.getElementById("reg-fullname")?.value || "").trim();
      const institution = (document.getElementById("reg-institution")?.value || "").trim();
      const email = (document.getElementById("reg-email")?.value || "").trim();
      const isTeam = DOM.regIsTeamCheckbox ? DOM.regIsTeamCheckbox.checked : false;
      const teamDetails = (DOM.teamDetailsInput?.value || "").trim();

      // Basic Validation
      if (!fullName || !institution || !email) {
        showRegError("Please fill out all required fields marked with an asterisk (*).");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showRegError("Please provide a valid contact email address.");
        return;
      }

      const payload = JSON.stringify({
        name: fullName,
        fullName: fullName,
        institution: institution,
        email: email,
        isTeam: isTeam,
        teamDetails: teamDetails,
        timestamp: new Date().toISOString()
      });

      // User clicked "Complete Registration": hide success/error and show only loading banner
      hideBanner(DOM.regStatusSuccess);
      hideBanner(DOM.regStatusError);
      showBanner(DOM.regStatusLoading);
      DOM.btnSubmitReg.disabled = true;

      try {
        const webhookUrl = config.GOOGLE_SCRIPT_URL;

        if (!webhookUrl || webhookUrl.includes("SAMPLE_DEPLOYMENT_ID")) {
          // Simulated demo success for unconfigured developer state
          await new Promise((resolve) => setTimeout(resolve, 800));
          console.info("Simulated Registration (Mock Mode - set GOOGLE_SCRIPT_URL in js/config.js for live Google Sheets integration):", payload);
          showRegSuccess();
          return;
        }

        try {
          // Send CORS-safe Simple Request with redirect: follow
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8"
            },
            body: payload,
            redirect: "follow"
          });

          // If readable response is returned, check status
          if (response.ok || response.type === "opaque") {
            showRegSuccess();
          } else {
            throw new Error(`Non-OK response with HTTP status ${response.status}`);
          }
        } catch (corsOrRedirectErr) {
          console.warn("Direct fetch redirect restricted by browser CORS, attempting no-cors mode fallback:", corsOrRedirectErr);
          // Fallback for strict browsers blocking Google Apps Script 302 CORS redirect:
          try {
            await fetch(webhookUrl, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "text/plain;charset=utf-8"
              },
              body: payload
            });
            showRegSuccess();
          } catch (networkErr) {
            console.error("no-cors registration fallback failed:", networkErr);
            showRegError("Could not connect to the registration webhook. Please check your internet connection or email " + (config.CONTACT_EMAIL || "gabriel.jimenez@icm-institute.org") + ".");
          }
        }
      } catch (err) {
        console.error("Registration submission error:", err);
        showRegError("Could not connect to the registration webhook. Please check your internet connection or email " + (config.CONTACT_EMAIL || "gabriel.jimenez@icm-institute.org") + ".");
      } finally {
        hideBanner(DOM.regStatusLoading);
        DOM.btnSubmitReg.disabled = false;
      }
    });

    function showRegSuccess() {
      hideBanner(DOM.regStatusLoading);
      hideBanner(DOM.regStatusError);
      showBanner(DOM.regStatusSuccess);
      DOM.regForm.reset();
      if (DOM.teamDetailsSlider) {
        DOM.teamDetailsSlider.classList.remove("revealed");
      }
    }

    function showRegError(msg) {
      hideBanner(DOM.regStatusLoading);
      hideBanner(DOM.regStatusSuccess);
      if (DOM.regErrorMessage) {
        DOM.regErrorMessage.textContent = msg;
      }
      showBanner(DOM.regStatusError);
    }
  }

  /**
   * 6. Interactive Pre-Submission Checklist
   */
  function initSubmissionChecklist() {
    if (!DOM.checklistCheckboxes || DOM.checklistCheckboxes.length === 0) return;

    function updateProgress() {
      let checkedCount = 0;
      const total = DOM.checklistCheckboxes.length;

      DOM.checklistCheckboxes.forEach((cb) => {
        const itemContainer = cb.closest(".checklist-item");
        if (cb.checked) {
          checkedCount++;
          if (itemContainer) itemContainer.classList.add("checked");
        } else {
          if (itemContainer) itemContainer.classList.remove("checked");
        }
      });

      const percentage = Math.round((checkedCount / total) * 100);

      if (DOM.checklistProgressFill) {
        DOM.checklistProgressFill.style.width = `${percentage}%`;
        if (checkedCount === total) {
          DOM.checklistProgressFill.classList.add("complete");
        } else {
          DOM.checklistProgressFill.classList.remove("complete");
        }
      }

      if (DOM.checklistCounterText) {
        if (checkedCount === total) {
          DOM.checklistCounterText.textContent = "3 of 3 Verified (Ready!)";
        } else {
          DOM.checklistCounterText.textContent = `${checkedCount} of ${total} Verified`;
        }
      }
    }

    DOM.checklistCheckboxes.forEach((cb) => {
      cb.addEventListener("change", updateProgress);
    });

    updateProgress();
  }

  /**
   * 7. Smooth Navigation, ScrollSpy & Mobile Drawer
   */
  function initNavigation() {
    // Mobile navigation toggle
    if (DOM.mobileToggle && DOM.mainNav) {
      DOM.mobileToggle.addEventListener("click", () => {
        DOM.mainNav.classList.toggle("mobile-open");
      });
    }

    // ScrollSpy: highlight active nav link based on viewport position
    const sections = document.querySelectorAll("section[id]");

    function onScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Back to top button visibility
      if (DOM.backToTopBtn) {
        if (scrollY > 400) {
          DOM.backToTopBtn.classList.add("visible");
        } else {
          DOM.backToTopBtn.classList.remove("visible");
        }
      }

      // Active section calculation
      let currentSectionId = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });

      if (currentSectionId) {
        DOM.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Back to top click
    if (DOM.backToTopBtn) {
      DOM.backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Close mobile nav when clicking a link
    DOM.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (DOM.mainNav && DOM.mainNav.classList.contains("mobile-open")) {
          DOM.mainNav.classList.remove("mobile-open");
        }
      });
    });
  }

  /**
   * App Launch
   */
  document.addEventListener("DOMContentLoaded", () => {
    initConfig();
    renderMath(document.body);
    loadAllContent();
    initRegistrationForm();
    initSubmissionChecklist();
    initNavigation();
  });
})();
