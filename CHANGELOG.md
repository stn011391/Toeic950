# Changelog

## v1.4.0 — True Diversity Family Deck — 2026-08-20

### Fixed
- Corrected the main v1.3.0 flaw: many numerically different questions were actually the same structural template with changed nouns/names.
- Legacy template variants are now mapped to their true structural family.
- Part 2 and Part 5 no longer allow the same structural family twice in one practice round.
- Cross-round selection now works like a deck: recently used families stay unavailable until most eligible families have been exhausted.

### Added
- Added 800 more questions focused on true low/mid-level structural diversity.
- Added 60 new Part 5 structures for 720–800, 20 new Part 2 response structures, 20 Part 3 conversation families and 20 Part 4 talk families.
- Added exact-fingerprint cleanup before bank finalization.
- Reworked `tests/repeat-smoke.js` to play five consecutive rounds and fail on structural-family repetition, rather than checking only Question IDs.

### Validation target
- Default Part 5 720–800 now has 90+ distinct structural families.
- Five consecutive 10-question Part 5 rounds must produce 50 different families before CI can pass.

## v1.3.0 — Massive Question Bank — 2026-08-20

### Added
- Added **5,760** new practice questions, bringing Parts 2–7 to **6,292 total questions**.
- New per-Part totals: Part 2 **700**, Part 3 **996**, Part 4 **996**, Part 5 **1,184**, Part 6 **1,008**, Part 7 **1,408**.
- Added **175+ structural families** across listening, grammar, text completion and reading comprehension.
- Expanded contexts across engineering, quality, procurement, logistics, IT, finance, legal, HR, marketing, customer service, operations, facilities and research.
- Added `app-repeat-control.js` with exact-question and structural-family cooldown history stored locally in the browser.

## v1.2.0 — Guest Backup — 2026-08-18
- Added Guest Mode / Backup, JSON export/import, preview, rollback, validation and local-only processing.

## v1.1.1 — Public Access — 2026-08-18
- Public/login-free access and generic public greeting.

## v1.1.0 — 950 Training Engine — 2026-08-17
- 532-question training engine, adaptive difficulty, diagnostic, exam mode, keyboard controls and split Part 7 layout.

## v1.0.0 — Extreme No-Scroll Edition — 2026-08-17
- Initial TOEIC 950 Mission Control release.
