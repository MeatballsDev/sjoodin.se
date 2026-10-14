# sjoodin.se

Personal CV site for Robin Sjödin, Technical Consultant in Stockholm working with Microsoft 365, Intune and Entra ID.

Live at https://meatballsdev.github.io/sjoodin.se/

## What's here

Plain HTML, CSS and JavaScript. No framework, no build step.

- `index.html` - the page, with English text
- `lang-sv.js` - Swedish translations, keyed by the `data-i18n` attributes in the page
- `styles.css` - layout, light and dark theme, and the print styles used for the PDFs
- `script.js` - theme toggle, language switch and nav highlighting
- `fonts/` - self-hosted Familjen Grotesk, Geist and Geist Mono
- `Robin-Sjodin-CV-en.pdf`, `Robin-Sjodin-CV-sv.pdf` - downloadable CVs

## Run locally

Open `index.html` in a browser.

## Update the CVs

After editing the page, rebuild the PDFs (needs Chromium or Chrome):

```sh
./make-pdf.sh
```

## Deploy

GitHub Pages serves the `main` branch. Pushing to `main` publishes the site.
