(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5511952489846";

  function waLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function wireWhatsappLinks() {
    var nodes = document.querySelectorAll("[data-wa-msg]");
    nodes.forEach(function (el) {
      var msg = el.getAttribute("data-wa-msg");
      el.setAttribute("href", waLink(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.getElementById("mobile-nav-toggle");
    var close = document.getElementById("mobile-nav-close");
    var nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    function open() {
      nav.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
    }
    function hide() {
      nav.setAttribute("data-open", "false");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", hide);
    nav.addEventListener("click", function (e) {
      if (e.target === nav) hide();
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", hide);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  function initServiceSelector() {
    var tabs = document.querySelectorAll(".service-tab");
    var panels = document.querySelectorAll(".service-panel");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-target");
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        panels.forEach(function (p) {
          p.classList.toggle("active", p.id === target);
        });
      });
    });
  }

  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (other) {
          other.classList.remove("open");
          var otherPanel = other.querySelector(".faq-a");
          if (otherPanel) otherPanel.style.maxHeight = null;
          var otherBtn = other.querySelector(".faq-q");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length <= 1) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var headerH = document.getElementById("site-header").offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireWhatsappLinks();
    initHeaderScroll();
    initMobileNav();
    initReveal();
    initServiceSelector();
    initFaq();
    initYear();
    initSmoothAnchors();
  });
})();
