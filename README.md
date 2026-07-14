# qsmxt.github.io — The QSMxT Ecosystem hub

This repository serves two things at `https://qsmxt.github.io/`:

1. **`index.html`** — a small landing page introducing the QSM family of tools and
   linking to each one.
2. **`qsm-nav.js`** — the shared "ecosystem bar" that every QSM site loads at runtime,
   so the cross-project navigation can be updated in one place.

## The ecosystem

| Tool | Role | Home |
|------|------|------|
| [QSM.rs](https://astewartau.github.io/QSM.rs/) | engine — the Rust reconstruction library | `astewartau/QSM.rs` |
| [QSMxT](https://qsmxt.github.io/QSMxT/) | pipeline — BIDS-native CLI + TUI | `QSMxT/QSMxT` |
| [QSMbly](https://qsmbly.neurodesk.org/) | browser — the pipeline in WebAssembly | `astewartau/qsmbly` |
| [QSM-CI](https://qsmxt.github.io/QSM-CI/) | benchmark — open reconstruction leaderboard | `QSMxT/QSM-CI` |

## The ecosystem bar

`qsm-nav.js` injects a slim, always-dark strip at the top of each site, above that
site's own header. It is dependency-free and stack-agnostic (the four sites use
Astro/Starlight, vanilla HTML, Alpine/Tailwind, and rustdoc respectively). Each site
includes it with the same loader snippet, setting `data-current` to its own id:

```html
<script>
  (function () {
    var s = document.createElement("script");
    var local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    s.src = local ? "/qsm-nav.js" : "https://qsmxt.github.io/qsm-nav.js";
    s.dataset.current = "xt";           // rs | xt | bly | ci | hub
    // s.dataset.target = "#slot";       // optional mount point; default: top of <body>
    document.head.appendChild(s);
  })();
</script>
```

- `data-current` — highlights the current project (`rs`, `xt`, `bly`, `ci`, `hub`).
- `data-target` — optional CSS selector for where to mount; defaults to the top of `<body>`.
- On `localhost` / `127.0.0.1` the script and all project links resolve to sibling paths
  (`/QSM.rs/`, `/QSMxT/`, `/qsmbly/`, `/QSM-CI/`) so the whole ecosystem can be previewed
  from one local static server.

If the script fails to load, the site simply renders without the bar — it is purely additive.

## Notes

- **Colours.** Each tool has an accent that signals its role: QSM.rs orange (engine),
  QSMxT purple (pipeline), QSMbly blue (browser), QSM-CI green (benchmark). The bar and
  hub use all four; each individual site leans on its own accent.
- **Org ownership.** QSMxT and QSM-CI live in the `QSMxT` org; QSMbly and QSM.rs are
  under `astewartau`. If QSM.rs is transferred into the `QSMxT` org, update its `url` in
  `qsm-nav.js` to `https://qsmxt.github.io/QSM.rs/` (Pages URLs do not auto-redirect after
  a transfer).
