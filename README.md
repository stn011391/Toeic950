# TOEIC 950 Mission Control

Current release: **v1.1.1 — Public Access**

A browser-based TOEIC training system designed to move from a 720 baseline toward a 950 target through timed practice, diagnostic data, weak-part tracking, error review and adaptive difficulty.

## Public access

- **Public website — no login required.**
- No account registration is required.
- No ChatGPT/OpenAI login is required.
- No OAuth, password, or server-side authentication is used.
- Study progress is stored only in each visitor's own browser with `localStorage`.
- Public site: `https://stn011391.github.io/Toeic950/`

## v1.1.1 highlights

- Public/login-free access is now explicitly documented.
- Removed the private personalized greeting from the public website.
- Core training behavior and the 532-question bank remain unchanged from v1.1.0.

## v1.1.0 Training Engine highlights

- **532 original practice questions** across Parts 2–7.
- Difficulty layers: **720 / 800 / 900 / 950**.
- Part 5 includes advanced inversion, subjunctive structures, participle clauses and high-level connectors.
- Part 7 includes **single, double and triple-document** sets with inference and cross-document reasoning.
- **Training mode:** immediate answer, explanation and listening transcript.
- **Exam mode:** no immediate answer; answers and explanations appear after the round.
- Answer choices are shuffled every session while preserving the correct answer mapping.
- Keyboard controls: **A–D / 1–4**, **Enter**, **Space**.
- Part 2 hides response text before answering and plays the question plus A/B/C responses by audio.
- Listening in exam/diagnostic mode is limited to one play per audio set.
- Part 7 uses a left-document / right-question desktop layout.
- Diagnostic 2.0 uses 36 stratified questions and does not invent a weak part when scores are uniformly strong.
- Daily missions are based on **actual answered questions / reviewed errors / vocabulary activity**, not manual checkboxes.
- Browser progress is stored locally with `localStorage`.
- GitHub Actions validates JavaScript, question-bank integrity and UI contracts before Pages deployment.

## Files

- `index.html` — application shell and sections
- `styles.css` — responsive / focus-mode / split-reading UI
- `data-core.js`, `data-listening.js`, `data-part5.js`, `data-part6.js`, `data-part7.js` — modular original question bank
- `data.js` — question-bank finalizer / count
- `app-core.js`, `app-diagnostic.js`, `app-practice.js`, `app-learning.js` — training engine modules
- `app.js` — keyboard controls and application bootstrap
- `tests/` — zero-dependency Node smoke tests
- `PUBLIC_ACCESS.md` — public/login-free deployment notes
- `VERSION` — current semantic version
- `CHANGELOG.md` — release history

## Versioning

Semantic versioning is used:

- `v1.1.x`: fixes and small refinements to the 950 Training Engine
- `v1.x.0`: meaningful new training capabilities
- `v2.0.0`: major architecture / learning-system redesign

The `v1.0.0`, `v1.1.0` and `v1.1.1` branches are release snapshots. Active development continues on `main`.

## Notes

All practice questions in this repository are original training material and are **not official ETS TOEIC questions**. Browser speech synthesis is used for listening drills, so voice quality depends on the operating system and browser.
