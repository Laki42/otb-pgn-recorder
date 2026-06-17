# OTB Chess Scoresheet

A mobile-friendly, no-backend web app for recording over-the-board chess games.

## Features

- Tap-to-move chessboard (tap source square, then destination square).
- Legal move validation with `chess.js`.
- Automatic SAN move recording.
- Promotion choice support (`q/r/b/n`) when a pawn promotes.
- Undo, New Game (with confirmation), Copy PGN, Export `.pgn`.
- Local storage persistence (reload-safe).
- Board orientation toggle (white/black at bottom).
- No engine analysis, no evaluations, no move suggestions.

## Tech

- Plain HTML/CSS/JavaScript.
- `chess.js` loaded as an ES module from jsDelivr.
- Chess pieces are rendered with Unicode symbols, so no local image assets are required.
- Static files only (GitHub Pages compatible).

## GitHub Pages deployment

1. Push this repository to GitHub.
2. In GitHub, open **Settings -> Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: your default branch (e.g. `main`) and `/ (root)`
4. Save.
5. Wait for deployment and open the provided Pages URL.

## Local run

You can open `index.html` directly, or run a static server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
