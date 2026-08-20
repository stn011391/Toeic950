# TOEIC 950 Mission Control

Current release: **v1.4.0 — True Diversity Family Deck**

A public, login-free TOEIC training system with timed practice, diagnostic data, adaptive difficulty, error review, portable guest backup and structural-family-aware question selection.

## v1.4.0 True Diversity

The v1.3.0 bank was numerically large, but too many questions were variants of the same template. v1.4.0 fixes the selection model itself.

- Adds **800 additional questions** focused on genuinely different low/mid-level structures.
- Adds **60 new Part 5 structures** for the 720–800 path.
- Adds **20 new Part 2 response structures**, **20 Part 3 conversation families**, and **20 Part 4 talk families**.
- Legacy template variants are now mapped back to their real structural family instead of being counted as independent families.
- Replaces the short cooldown with a **Family Deck**:
  - Part 2 / Part 5: one structural family maximum per round.
  - Parts 3 / 4 / 6 / 7: one conversation/document family at a time, preserving normal multi-question sets.
  - Previously used families stay out of the deck until most eligible families have been exhausted.
  - Exact question and document variants also keep their own recency history.
- The default Part 5 720–800 path now has **90+ distinct structural families**, so five consecutive 10-question rounds can use 50 different families.
- CI now tests five consecutive rounds by **family**, not merely by Question ID.
- Exact duplicate fingerprints are removed before the question bank is finalized.

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

- `data-diversity-v2.js` — true-diversity low/mid-level family pack
- `data-diversity-cleanup.js` — removes accidental exact fingerprints
- `app-repeat-control.js` — Family Deck selection engine
- `tests/repeat-smoke.js` — five-round structural-family test
- `app-backup.js` — guest export/import/rollback
- `VERSION` / `CHANGELOG.md` — release tracking

All practice questions are original training material and are **not official ETS TOEIC questions**.
