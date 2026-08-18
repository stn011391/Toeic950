# TOEIC 950 Mission Control

Current release: **v1.2.0 — Guest Backup**

A public, login-free browser TOEIC training system designed to move from a 720 baseline toward a 950 target through timed practice, diagnostic data, weak-part tracking, error review and adaptive difficulty.

## Public guest mode

- **Public website — no login required.**
- No account registration, ChatGPT/OpenAI login, OAuth or password is required.
- Study progress is stored locally in each visitor's browser with `localStorage`.
- Public site: `https://stn011391.github.io/Toeic950/`

## v1.2.0 Guest Backup

- Added a dedicated **Guest Mode / Backup** page.
- Export the complete local learning record as a portable JSON backup.
- Import a previous JSON backup on another browser or device.
- Import preview shows answered-question count, training days, errors and known vocabulary before overwrite.
- Current local progress is saved as a one-step rollback snapshot before import.
- Backup files are processed locally in the browser and are not uploaded to a server.
- Import rejects unknown formats, future schema versions and files larger than 5 MB.
- Imported strings are sanitized before being used by the app.
- Supports both the v1.2 backup envelope and recognizable legacy raw progress objects.

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
- Daily missions are based on actual answered questions / reviewed errors / vocabulary activity.

## Files

- `index.html` — application shell, training sections and guest/backup UI
- `styles.css` — responsive / focus-mode / split-reading UI
- `data-core.js`, `data-listening.js`, `data-part5.js`, `data-part6.js`, `data-part7.js` — modular original question bank
- `data.js` — question-bank finalizer / count
- `app-core.js`, `app-diagnostic.js`, `app-practice.js`, `app-learning.js` — training engine modules
- `app-backup.js` — guest-mode export/import/rollback engine
- `app.js` — keyboard controls and application bootstrap
- `tests/` — zero-dependency Node smoke tests, including backup validation
- `PUBLIC_ACCESS.md` — public/login-free deployment notes
- `VERSION` — current semantic version
- `CHANGELOG.md` — release history

## Versioning

Semantic versioning is used:

- `v1.x.0`: meaningful new training capabilities
- `v1.x.x`: fixes and small refinements
- `v2.0.0`: major architecture / learning-system redesign

Release snapshot branches are kept for published versions. Active development continues on `main`.

## Notes

All practice questions in this repository are original training material and are **not official ETS TOEIC questions**. Browser speech synthesis is used for listening drills, so voice quality depends on the operating system and browser.
