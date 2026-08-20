# TOEIC 950 Mission Control

Current release: **v1.5.0 — Similarity Shield**

A public, login-free TOEIC training system with timed practice, diagnostic data, adaptive difficulty, error review, portable guest backup and human-perceived anti-repeat selection.

## v1.5.0 Similarity Shield

v1.4.0 showed that a different family ID does not necessarily mean a genuinely different question. Two questions can have different verbs/nouns but still feel identical to a learner. v1.5.0 therefore stops relying on family IDs alone.

- Adds a **grammar-structure skeleton** for Parts 2 and 5. Content words such as department names, documents, suppliers, dates and quantities are masked before similarity is calculated.
- Prevents high-similarity structures in the same round and strongly avoids them across recent rounds.
- Tracks recent **answer-option signatures** so the same distractor/answer set is not repeatedly recycled.
- Balances each round by **skill / error cause**, normally allowing no more than two questions from the same cause category in a strict draw.
- Adds **scenario/context rotation** so engineering, quality, sales, operations and other business contexts do not dominate one round.
- Doubles the v1.4 true-diversity context variants from four to eight for the main low/mid-level generated pack.
- Adds another ~800 generated variants before duplicate cleanup, pushing the total bank beyond **7,700** items.
- Keeps exact-question, conversation/document, structural-skeleton, option-set and context history in browser local storage.
- Replaces the old family-only CI test with two five-round checks:
  - `tests/repeat-smoke.js` checks exact and near-duplicate structures.
  - `tests/human-repeat-audit.js` literally plays five rounds for every Part and prints the actual selected questions to CI logs while checking structure, skill, options and context repetition.
- Fixes the v1.4 test-runtime problem where a Node smoke test could reach browser-only `document.write()` logic.

## Public guest mode

- Public website — no login required.
- No account registration, ChatGPT/OpenAI login, OAuth or password is required.
- Study progress is stored in each visitor's browser with `localStorage`.
- Public site: `https://stn011391.github.io/Toeic950/`

## Guest Backup

- Export local learning progress as JSON.
- Import on another browser/device.
- Import preview and one-step rollback are included.
- Backup files are processed locally and are not uploaded to a server.

## Training Engine highlights

- Training mode: immediate answer/explanation.
- Exam mode: answers shown after the round.
- Shuffled choices with correct-answer remapping.
- Keyboard controls: A–D / 1–4, Enter, Space.
- Part 2 audio-only choices before answering.
- Part 7 split reading layout.
- Diagnostic 2.0 and automatic daily mission tracking.

## Main files

- `data-diversity-v2.js` — true-diversity low/mid-level structure pack
- `data-diversity-contexts.js` — extra scenario variants for context rotation
- `data-diversity-cleanup.js` — removes accidental exact fingerprints
- `app-repeat-control.js` — Similarity Shield selection engine
- `tests/repeat-smoke.js` — five-round structural-similarity test
- `tests/human-repeat-audit.js` — five-round human-perceived repetition audit
- `app-backup.js` — guest export/import/rollback
- `VERSION` / `CHANGELOG.md` — release tracking

All practice questions are original training material and are **not official ETS TOEIC questions**.
