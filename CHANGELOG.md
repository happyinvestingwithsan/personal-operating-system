# CHANGELOG

All notable changes to the **Personal Operating System** project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.2.0] - October 2026

### Added
- **Storage Engine (`server/storage.js`):**
  - Atomic JSON file persistence (`data/pos_state.json`) using transactional write-to-temp-then-rename (`.tmp` + sync + atomic rename).
  - Automated timestamped snapshots (`data/backups/pos_backup_<date>_<ms>_<tag>.json`) with automatic pruning.
  - Fail-safe corruption recovery: detects corrupt JSON, moves corrupt file to archive with `.corrupt_<timestamp>`, and safely restores from the latest valid backup snapshot without silent data loss.
  - Concurrency mutex guaranteeing serialized, safe sequential writes.
  - Manual backup snapshot creation and point-in-time restore capability.
- **Data Model & Seed Data (`server/seedData.js`):**
  - 6-month cycle baseline (Oct 1, 2026 – Mar 31, 2027, 26 weeks).
  - Current cycle anchor: Cycle Week 1 (`2026-W40`, Oct 1 – Oct 4, 2026).
  - 7 goals across the 4-tier life hierarchy (Health, Spiritual, Family, Corporate Job, Trading, HIFY Growth, HIFY Community).
  - Finite Website checklist across Core, Conversion, Experience, and Polish (Polish explicitly marked as non-blocking for maintenance freeze).
  - **Zero fabricated actuals:** Week 1 actuals initialized empty/zero ready for genuine user entry.
- **Schema Validation (`server/schema.js`):**
  - Rigid runtime structural and type validation before any write to disk.
- **REST API Server (`server/index.js`):**
  - Endpoints: `GET /api/health`, `GET /api/state`, `POST /api/state`, `POST /api/week`, `POST /api/website-task`, `POST /api/review`, `POST /api/backup`, `GET /api/backups`, `GET /api/export/json`, `GET /api/export/fortnightly-prompt/:id`.
- **Frontend Scaffolding:**
  - React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons.
  - Calm executive dark theme color palette.
  - Phase 1 status verification view connecting to `/api/health`.
- **Automated Test Suite (`tests/storage.test.js`, `tests/api.test.js`):**
  - 13 automated unit and integration tests covering missing state auto-seeding, atomic writes, schema validation, backup listing/pruning, concurrency safety, corruption recovery, interrupted write simulation, manual rollback, and REST endpoints.

### Changed
- Refined `MVP_ARCHITECTURE.md` to reflect HIFY metric hierarchy (Cohort Enrolments as primary outcome, Masterclass viewers as primary bottleneck, 3,000 viewer target, 1,000 member aspirational vision) and priority cannibalization drift focus.

---

## [0.1.0] - October 2026

### Added
- Project initialized with GitHub repository source of truth.
- Dual-branch strategy established (`main` stable, `dev` integration, feature branches).
- Core operating governance established:
  - `DEVELOPMENT_WORKFLOW.md`: Rules for branches, commits, PRs, tests, and Definition of Done.
  - `CHANGE_CONTROL.md`: Strict 5-question decision gate (Problem, Evidence, Benefit, Cost, Decision).
  - `ANTI_RABBIT_HOLE.md`: Non-goals, time-budget caps, and time protection core principle.
  - `CHATGPT_AGY_LOOP.md`: Roles across User, ChatGPT, AGY, and GitHub.
- Six-month operating model established (`OPERATING_MODEL.md`).
- Weekly operating and fortnightly review templates committed (`WEEKLY_OPERATING_TEMPLATE.md`, `FORTNIGHTLY_REVIEW_TEMPLATE.md`).
- MVP scope defined across four priority tiers (`MVP_SCOPE.md`).
- MVP technical architecture specified and reviewed (`MVP_ARCHITECTURE.md`).
