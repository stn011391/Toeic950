# Changelog

## v1.3.0 — Massive Question Bank — 2026-08-20

### Added
- Added **5,760** new practice questions, bringing Parts 2–7 to **6,292 total questions**.
- New per-Part totals: Part 2 **700**, Part 3 **996**, Part 4 **996**, Part 5 **1,184**, Part 6 **1,008**, Part 7 **1,408**.
- Added **175+ structural families** across listening, grammar, text completion and reading comprehension.
- Expanded contexts across engineering, quality, procurement, logistics, IT, finance, legal, HR, marketing, customer service, operations, facilities and research.
- Added `app-repeat-control.js` with exact-question and structural-family cooldown history stored locally in the browser.
- Added `tests/repeat-smoke.js` to simulate repeated practice rounds and reject immediate exact-question repeats.
- Data CI now validates exact total count, per-Part counts, unique IDs, exact question fingerprints and structural-family diversity.

### Changed
- Practice selection now prioritizes questions not seen recently and structural families not used recently.
- Recently used exact questions are used only as fallback when the eligible difficulty pool is too small.
- Part 7 has substantially more single-, double- and triple-document scenarios and cross-document reasoning.
- Backup schema remains compatible with v1.2.0; imported progress is upgraded to app version v1.3.0.

## v1.2.0 — Guest Backup — 2026-08-18

### Added
- Dedicated Guest Mode / Backup page for the public login-free website.
- One-click JSON export of local study progress.
- JSON import with preview before replacing local progress.
- Automatic rollback snapshot of the pre-import state.
- Import validation for supported format/schema and a 5 MB size limit.
- Input sanitization for imported strings and unsafe object keys.
- Backup summary for answered questions, training days, errors and known vocabulary.
- `tests/backup-smoke.js` and CI coverage for the backup module.

### Changed
- Public guest mode now clearly explains that study data is local to the current browser.
- Home page includes a direct shortcut to backup controls.
- App version advanced to v1.2.0.

## v1.1.1 — Public Access — 2026-08-18

### Changed
- Confirmed the repository is public and the website is intended for unrestricted public access.
- Explicitly documented that no login, registration, ChatGPT/OpenAI authentication, OAuth or password is required.
- Removed the private `Steven` greeting from the public website and replaced it with a generic greeting.
- Added `PUBLIC_ACCESS.md` with deployment/access notes.
- Study data continues to stay in each visitor's own browser via `localStorage`.

## v1.1.0 — 950 Training Engine — 2026-08-17

### Added
- Expanded Parts 2–7 to **532 original questions**.
- Four difficulty layers: 720 / 800 / 900 / 950.
- High-difficulty Part 5 grammar and collocation pool.
- Double- and triple-document Part 7 sets.
- Training mode and exam mode.
- Per-session answer-choice randomization with correct-answer remapping.
- Keyboard answering: A–D / 1–4, Enter for next, Space for Listening.
- Part 2 audio-only response choices before answering.
- One-play Listening behavior in exam and diagnostic modes.
- Part 7 split reading layout.
- 36-question Diagnostic 2.0 with no forced weak-part result.
- Automatic daily mission progress based on real study activity.
- Per-Part accuracy and pace tracking.
- GitHub Actions smoke tests before Pages deployment.

### Changed
- Focus mode remains optimized for minimal page scrolling.
- Error log now records selected answer, correct answer, cause and difficulty.
- Streak is based on actual activity instead of merely opening the site.
- Adaptive practice difficulty follows the learner’s current score and performance data.

## v1.0.0 — Extreme No-Scroll Edition — 2026-08-17
- Initial TOEIC 950 Mission Control release.
- Compact desktop answer layout and focus mode.
- Parts 2–7 practice, diagnostic, vocabulary, error log and progress tracking.
