# EcoViewer Website

The source code for the EcoViewer website — built with plain HTML, CSS, and JavaScript, and hosted on GitHub Pages.

🌐 **Live site:** [ecoviewer.org](https://ecoviewer.org)

This repository contains the marketing and documentation website for the project — the About, Team, Resources, and Tutorials pages, along with the embedded EcoViewer app.

## Architecture & Routing

* **Clean URLs:** The project uses the `folder/index.html` convention to allow for clean URLs (e.g. `/about` rather than `/about.html`).
* **Relative Linking:** All internal links are relative so the site works regardless of where it's hosted.
* **Assets:** Global styles are managed in `style.css`, and shared interactivity (nav scroll, mobile menu, and fade-in animations) is handled in `main.js`.

## Reporting a bug or suggestion

If you find a bug, encounter a broken link, or have a suggestion for improvement, please [open an issue](https://github.com/ecoviewer/ecoviewer-website/issues) in this repository.

For problems related to the EcoViewer app itself or the GBIF data pipeline, please check the other repositories in the [EcoViewer organisation](https://github.com/ecoviewer).

## Licence

This project is open source and published under the [MIT licence](LICENSE).
