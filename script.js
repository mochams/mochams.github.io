/* 
   PORTFOLIO — script.js
    */

(function () {
  "use strict";

  // Theme
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "portfolio-theme";

  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferred());

  themeToggle.addEventListener("click", function () {
    const current = html.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // Sync with system changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  // Nav scroll state
  const nav = document.getElementById("nav");

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll-triggered fade-in
  const fadeTargets = [
    { selector: ".hero-tag", delay: 0 },
    { selector: ".hero-name", delay: 0.08 },
    { selector: ".hero-meta", delay: 0.16 },
    { selector: ".hero-summary", delay: 0.24 },
    { selector: ".hero-domains", delay: 0.32 },
    { selector: ".hero-actions", delay: 0.4 },
    { selector: ".section-label", delay: 0 },
    { selector: ".section-heading", delay: 0.06 },
    { selector: ".about-text p", delay: 0, stagger: 0.08 },
    { selector: ".about-stat", delay: 0, stagger: 0.1 },
    { selector: ".exp-card", delay: 0, stagger: 0.07 },
    { selector: ".skill-group", delay: 0, stagger: 0.06 },
    { selector: ".contact-sub", delay: 0 },
    { selector: ".contact-item", delay: 0, stagger: 0.08 },
  ];

  fadeTargets.forEach(function (target) {
    document.querySelectorAll(target.selector).forEach(function (el, i) {
      el.classList.add("fade-in");
      const d = (target.delay || 0) + (target.stagger ? target.stagger * i : 0);
      if (d) el.style.transitionDelay = d + "s";
    });
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
  );

  document.querySelectorAll(".fade-in").forEach(function (el) {
    observer.observe(el);
  });

  // Smooth active nav link
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.style.color = "";
          });
          const id = entry.target.getAttribute("id");
          const active = document.querySelector(
            '.nav-links a[href="#' + id + '"]',
          );
          if (active) active.style.color = "var(--text)";
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" },
  );

  sections.forEach(function (s) {
    sectionObserver.observe(s);
  });
})();
