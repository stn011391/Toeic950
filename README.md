# TOEIC 950 Mission Control

Current release: **v1.3.0 — Massive Question Bank**

A public, login-free browser TOEIC training system designed to move from a 720 baseline toward a 950 target through timed practice, diagnostic data, weak-part tracking, error review, adaptive difficulty and anti-repeat question selection.

## v1.3.0 Massive Question Bank

- Expanded the Parts 2–7 bank from **532 to 6,292 questions**.
- Current per-Part totals:
  - Part 2: **700**
  - Part 3: **996**
  - Part 4: **996**
  - Part 5: **1,184**
  - Part 6: **1,008**
  - Part 7: **1,408**
- Added **5,760** new questions across **175+ structural families**, rather than only changing names in a few templates.
- Added a large set of business, engineering, quality, procurement, logistics, IT, finance, legal, customer-service and operations contexts.
- Added an **anti-repeat cooldown engine** that remembers recently exposed exact question IDs and structural families in the browser.
- Practice selection prioritizes questions that are both unseen recently and from structural families not used recently; recent questions are fallback only when the eligible pool becomes too small.
- Part 7 expansion includes more single-, double- and triple-document reading sets and cross-document reasoning.
- Difficulty layers remain **720 / 800 / 900 / 950**.
- CI validates exact question count, unique IDs, exact question fingerprints, structural-family diversity and repeated-draw behavior.

## Public guest mode

- **Public website — no login required.**
- No account registration, ChatGPT/OpenAI login, OAuth or password is required.
- Study progress is stored locally in each visitor's browser with `localStorage`.
- Public site: `https://stn011391.github.io/Toeic950/`

## Guest Backup

- Dedicated **Guest Mode / Backup** page.
- Export the complete local learning record as a portable JSON backup.
- Import a previous JSON backup on another browser or device.
- Import preview shows answered-question count, training days, errors and known vocabulary before overwrite.
- Current local progress is saved as a one-step rollback snapshot before import.
- Backup files are processed locally in the browser and are not uploaded to a server.
- Import rejects unknown formats, future schema versions and files larger than 5 MB.
- v1.3.0 keeps backup schema compatibility with v1.2.0.

## Training Engine highlights

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
- `data-core.js`, `data-listening.js`, `data-part5.js`, `data-part6.js`, `data-part7.js` — original core bank
- `data-expansion-core.js` — shared v1.3 business/engineering scenario library
- `data-expansion-listening.js` — large Parts 2–4 expansion
- `data-expansion-part5.js` — 60-family Part 5 expansion
- `data-expansion-reading.js` — large Parts 6–7 expansion
- `data.js` — question-bank finalizer / total count
- `app-core.js`, `app-diagnostic.js`, `app-practice.js`, `app-learning.js` — training engine modules
- `app-repeat-control.js` — recent-question and structural-family cooldown engine
- `app-backup.js` — guest-mode export/import/rollback engine
- `app.js` — keyboard controls and application bootstrap
- `tests/` — Node smoke tests for data, UI, backup and anti-repeat behavior
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
