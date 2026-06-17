# Hana Furu

Hana Furu is a quiet daily flower oracle for small days. Open the app, choose a mood, and let one symbolic flower fall with a poetic message, short interpretation, small action, lucky item, and gentle warning.

## Repository

The intended GitHub repository for this standalone app is <https://github.com/Laki42/Hana-Furu>. The files in this `hana-furu/` directory can be copied or pushed as the root contents of that repository.

## How to open locally

Open `index.html` directly in any modern web browser. No server is required.

## What kind of app is this?

This is a simple static web app made with only:

- `index.html`
- `style.css`
- `script.js`

There is no React, Vue, TypeScript, Tailwind, build step, backend, login, database, or external API.

## Editing the flower oracle entries

The flower oracle entries live in the `flowerOracles` array near the top of `script.js`. Each entry has these fields:

- `flowerName`
- `omenType`
- `message`
- `meaning`
- `smallAction`
- `luckyItem`
- `warning`

Add, remove, or rewrite entries there to change the oracle.

## Saved history

Hana Furu stores today's flower and past flower results in the browser's `localStorage`. This means history stays on the same device and browser, but it is not synced anywhere. Use the **Clear history** button in the app to remove saved results.

## Future improvement ideas

- Add seasonal flower sets.
- Let the selected mood gently influence the flower pool.
- Add export/import for saved flower history.
- Add a print-friendly omikuji card style.
