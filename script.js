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
          "— Sent from lakazagri.mu (Sub-Saharan Africa pilot form)",
        ].join("\n")
      );

      statusEl.textContent = "Opening your email app…";
      statusEl.classList.add("success");

      window.location.href = "mailto:gilbert@mkweli.tech?subject=" + subject + "&body=" + body;

      window.setTimeout(function () {
        statusEl.textContent =
          "If your email app did not open, write to gilbert@mkweli.tech directly.";
      }, 1800);
    });
  }
})();
