# Arras UI Toolkit (Safe Starter)

A small, UI-only Tampermonkey starter project for experimenting with browser interface enhancements and local headless UI tests.

## Included
- `userscripts/arras-ui-panel.user.js` — adds a small toggleable panel to Arras.io. It does not read game state, send game inputs, automate gameplay, or alter network traffic.
- `multibox/manual-session-board.user.js` — a manual session checklist for keeping notes about separately opened windows. It does not open windows, synchronize controls, or send inputs between them.
- `tests/` — a local HTML fixture and Playwright smoke test for the UI panel.
- `package.json` — local test commands.

## Not included
No gameplay bots, automated aiming/movement/firing, proxy rotation, headless game clients, anti-cheat bypasses, or evasion techniques.

## Install the UI panel
1. Install Tampermonkey in your browser.
2. Open `userscripts/arras-ui-panel.user.js`.
3. Copy the file into a new Tampermonkey userscript.
4. Save it, then reload Arras.io.

## Run local headless UI tests
Requires Node.js 20+.

```bash
npm install
npx playwright install chromium
npm test
```

Tests run against a local fixture, not the live game.

## Repository layout
```text
.
├── userscripts/
│   └── arras-ui-panel.user.js
├── multibox/
│   └── manual-session-board.user.js
├── tests/
│   ├── fixture.html
│   └── ui.spec.js
├── package.json
└── README.md
```

Use browser scripts only where permitted by the game and its rules. Keep experiments local and respect other players.
