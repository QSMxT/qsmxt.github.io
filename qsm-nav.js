/*!
 * qsm-nav.js — the shared "ecosystem bar" for the QSM family of sites.
 * Canonical home: https://qsmxt.github.io/qsm-nav.js (repo: QSMxT/qsmxt.github.io)
 *
 * Every site includes the same loader snippet:
 *
 *   <script>
 *     (function () {
 *       var s = document.createElement("script");
 *       var local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
 *       s.src = local ? "/qsm-nav.js" : "https://qsmxt.github.io/qsm-nav.js";
 *       s.dataset.current = "xt";            // rs | xt | bly | ci | hub
 *       // s.dataset.target = "#some-slot";  // optional mount point (default: top of <body>)
 *       document.head.appendChild(s);
 *     })();
 *   </script>
 *
 * The bar is a slim, always-dark strip that sits above each site's own header,
 * so each site keeps its own identity and navigation. It renders in-flow
 * (position: static) and degrades to nothing if the script fails to load.
 */
(function () {
  "use strict";
  if (window.__qsmEcoBar) return;
  window.__qsmEcoBar = true;

  var script = document.currentScript || {};
  var ds = script.dataset || {};
  var current = ds.current || "";
  var targetSel = ds.target || "";

  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

  // NOTE: if/when astewartau/QSM.rs is transferred to the QSMxT org, update its
  // `url` to https://qsmxt.github.io/QSM.rs/ (GitHub Pages URLs do not redirect
  // after a repo transfer). QSMbly keeps its neurodesk.org domain either way.
  var HUB = LOCAL ? "/" : "https://qsmxt.github.io/";
  var PROJECTS = [
    { id: "rs",  name: "QSM.rs", role: "engine",    color: "#f97316",
      url: LOCAL ? "/QSM.rs/"  : "https://astewartau.github.io/QSM.rs/" },
    { id: "xt",  name: "QSMxT",  role: "pipeline",   color: "#a855f7",
      url: LOCAL ? "/QSMxT/"   : "https://qsmxt.github.io/QSMxT/" },
    { id: "bly", name: "QSMbly", role: "browser",    color: "#3b82f6",
      url: LOCAL ? "/qsmbly/"  : "https://qsmbly.neurodesk.org/" },
    { id: "ci",  name: "QSM-CI", role: "benchmark",  color: "#10b981",
      url: LOCAL ? "/QSM-CI/"  : "https://qsmxt.github.io/QSM-CI/" },
  ];

  var CHI =
    '<svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">' +
    '<defs><linearGradient id="qsm-eco-g" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">' +
    '<stop stop-color="#f97316"/><stop offset=".38" stop-color="#c026d3"/>' +
    '<stop offset=".72" stop-color="#3b82f6"/><stop offset="1" stop-color="#10b981"/>' +
    "</linearGradient></defs>" +
    '<rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="url(#qsm-eco-g)"/>' +
    '<g stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none">' +
    '<path d="M10 9 C 13 13, 19 19, 22 23"/>' +
    '<path d="M22 9 C 19 13, 16 16, 13.5 19 C 12 21, 11 22, 9.5 24"/>' +
    "</g></svg>";

  var CSS =
    ".qsm-eco-bar{background:#0b0e14;border-bottom:1px solid rgba(255,255,255,.09);" +
    "font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
    "font-size:12px;line-height:1;color:#9aa4b2;-webkit-font-smoothing:antialiased}" +
    ".qsm-eco-inner{max-width:72rem;margin:0 auto;padding:0 1rem;height:34px;display:flex;" +
    "align-items:center;gap:.8rem;overflow-x:auto;scrollbar-width:none}" +
    ".qsm-eco-inner::-webkit-scrollbar{display:none}" +
    ".qsm-eco-brand{display:inline-flex;align-items:center;gap:.45rem;color:#e6eaf0;" +
    "text-decoration:none;font-weight:600;letter-spacing:.02em;flex:none}" +
    ".qsm-eco-brand svg{display:block;border-radius:4px}" +
    ".qsm-eco-brand:hover{color:#fff}" +
    ".qsm-eco-brand.is-current{color:#fff}" +
    ".qsm-eco-sep{width:1px;height:14px;background:rgba(255,255,255,.14);flex:none}" +
    ".qsm-eco-links{display:flex;align-items:center;gap:.25rem}" +
    ".qsm-eco-link{display:inline-flex;align-items:center;gap:.45rem;padding:.35rem .6rem;" +
    "border-radius:999px;color:#9aa4b2;text-decoration:none;white-space:nowrap;" +
    "transition:color .15s,background-color .15s}" +
    ".qsm-eco-link:hover{color:#e6eaf0;background:rgba(255,255,255,.06)}" +
    ".qsm-eco-link.is-current{color:#fff;background:rgba(255,255,255,.1)}" +
    ".qsm-eco-dot{width:7px;height:7px;border-radius:50%;background:var(--qsm-dot);flex:none}" +
    ".qsm-eco-link.is-current .qsm-eco-dot{box-shadow:0 0 6px var(--qsm-dot)}" +
    ".qsm-eco-role{color:#6b7683;font-size:11px}" +
    ".qsm-eco-link.is-current .qsm-eco-role{color:#aab4c0}" +
    "@media (max-width:640px){.qsm-eco-role{display:none}}";

  function render() {
    var links = PROJECTS.map(function (p) {
      var cur = p.id === current;
      return (
        '<a class="qsm-eco-link' + (cur ? " is-current" : "") + '"' +
        (cur ? ' aria-current="page"' : "") +
        ' style="--qsm-dot:' + p.color + '" href="' + p.url + '">' +
        '<span class="qsm-eco-dot"></span>' + p.name +
        '<span class="qsm-eco-role">' + p.role + "</span></a>"
      );
    }).join("");
    return (
      '<div class="qsm-eco-inner">' +
      '<a class="qsm-eco-brand' + (current === "hub" ? " is-current" : "") + '" href="' + HUB +
      '" title="The QSMxT Ecosystem">' + CHI + "<span>Ecosystem</span></a>" +
      '<span class="qsm-eco-sep" aria-hidden="true"></span>' +
      '<nav class="qsm-eco-links" aria-label="The QSMxT Ecosystem">' + links + "</nav>" +
      "</div>"
    );
  }

  function mount() {
    var target = targetSel ? document.querySelector(targetSel) : document.body;
    if (!target) return;
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    var bar = document.createElement("div");
    bar.className = "qsm-eco-bar";
    bar.innerHTML = render();
    target.insertBefore(bar, target.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
