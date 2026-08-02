/**
 * LakazAgri Phase 1 — marketing site interactions
 */
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = document.getElementById("nav-toggle");
  const form = document.getElementById("pilot-form");
  const statusEl = document.getElementById("form-status");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header shadow */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Pilot form → mailto fallback (works without backend) */
  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = (form.elements.namedItem("name") || {}).value || "";
      const email = (form.elements.namedItem("email") || {}).value || "";
      const country = (form.elements.namedItem("country") || {}).value || "";
      const role = (form.elements.namedItem("role") || {}).value || "";
      const message = (form.elements.namedItem("message") || {}).value || "";

      statusEl.classList.remove("success", "error");

      if (!name.trim() || !email.trim() || !country.trim() || !role || !message.trim()) {
        statusEl.textContent = "Please complete all fields.";
        statusEl.classList.add("error");
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) {
        statusEl.textContent = "Please enter a valid email address.";
        statusEl.classList.add("error");
        return;
      }

      const roleLabel = form.querySelector('select[name="role"] option:checked')?.textContent || role;
      const subject = encodeURIComponent(
        "LakazAgri pilot — " + country.trim() + " — " + name.trim()
      );
      const body = encodeURIComponent(
        [
          "Name: " + name.trim(),
          "Email: " + email.trim(),
          "Country / market: " + country.trim(),
          "Role: " + roleLabel,
          "",
          "Message:",
          message.trim(),
          "",
          "— Sent from lakazagri.mkweli.tech (Sub-Saharan Africa pilot form)",
        ].join("\n")
      );

      statusEl.textContent = "Opening your email app…";
      statusEl.classList.add("success");

      window.location.href = "mailto:support@mkweli.tech?subject=" + subject + "&body=" + body;

      window.setTimeout(function () {
        statusEl.textContent =
          "If your email app did not open, write to support@mkweli.tech directly.";
      }, 1800);
    });
  }

  function initDownloadCounter() {
    if (!document.getElementById("dl-counter-style")) {
      var st = document.createElement("style");
      st.id = "dl-counter-style";
      st.textContent = ".dl-counter{margin:0.55rem 0 0;font-size:0.72rem;letter-spacing:0.03em;font-weight:500;color:rgba(255,255,255,0.62);}";
      document.head.appendChild(st);
    }

    function isApkHref(h) {
      return /\.apk($|[?#])/i.test(h || "");
    }
    // Only APK file links count (not release pages / source)
    let downloadLink = null;
    document.querySelectorAll("a[href]").forEach(function (a) {
      const href = a.getAttribute("href") || "";
      if (isApkHref(href)) {
        a.setAttribute("data-dl-link", "");
        if (!downloadLink) downloadLink = a;
      } else {
        a.removeAttribute("data-dl-link");
      }
    });
    if (!downloadLink) {
      downloadLink = document.querySelector('#download a[href*=".apk"]');
      if (downloadLink && isApkHref(downloadLink.getAttribute("href") || "")) {
        downloadLink.setAttribute("data-dl-link", "");
      } else {
        downloadLink = null;
      }
    }
    let counterEl = document.querySelector("[data-dl-counter]");
    if (!counterEl && downloadLink) {
      counterEl = document.createElement("p");
      counterEl.className = "dl-counter";
      counterEl.setAttribute("data-dl-counter", "");
      counterEl.setAttribute("data-dl-product", "lakazagri");
      counterEl.setAttribute("data-dl-seed", "875");
      counterEl.setAttribute("aria-live", "polite");
      const box = downloadLink.closest(".download-actions, .download-copy") || downloadLink.parentElement;
      box.appendChild(counterEl);
    }
    if (!counterEl || !downloadLink) return;

    const product = counterEl.getAttribute("data-dl-product") || "lakazagri";
    const seed = Number(counterEl.getAttribute("data-dl-seed")) || 875;
    const apiBaseByProduct = {
      lakazagri: "https://api.counterapi.dev/v1/mkweli-tech/apk-lakazagri",
    };
    const apiBase = apiBaseByProduct[product] || apiBaseByProduct.lakazagri;
    let lastUpdateAt = 0;

    function formatDownloads(total) {
      return total.toLocaleString("en-US") + " downloads";
    }

    function getCountValue(payload) {
      if (payload && typeof payload.count === "number") return payload.count;
      if (payload && payload.data && typeof payload.data.count === "number") return payload.data.count;
      return null;
    }

    function renderCount(rawCount) {
      if (typeof rawCount !== "number") return;
      counterEl.textContent = formatDownloads(seed + rawCount);
    }

    function requestCount(path, options) {
      return fetch(apiBase + path, options)
        .then(function (res) {
          if (!res.ok) throw new Error("Counter request failed");
          return res.json();
        })
        .then(getCountValue);
    }

    renderCount(0);

    requestCount("/")
      .then(renderCount)
      .catch(function () {});

    function onApkClick() {
      const now = Date.now();
      if (now - lastUpdateAt < 2000) return;
      lastUpdateAt = now;

      requestCount("/up", { method: "POST" })
        .catch(function () {
          return requestCount("/up");
        })
        .then(renderCount)
        .catch(function () {});
    }
    document.querySelectorAll("a[data-dl-link]").forEach(function (a) {
      if (isApkHref(a.getAttribute("href") || "")) {
        a.addEventListener("click", onApkClick);
      }
    });
  }

  initDownloadCounter();
})();
