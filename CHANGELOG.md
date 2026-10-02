# CHANGELOG

All notable changes to the **Personal Operating System** project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.2.1] - October 2026

### Fixed & Refined (Phase 1 Review Corrections)
- **Health Goal Seed:** Removed fabricated `60.5 kg` current value; set to `"Not yet recorded"` with baseline `~60 kg`.
- **Financial Transition Threshold:** Corrected recurring HIFY revenue threshold from `₹3.6L/month` to `₹2L/month` across all documentation and seed data (Condition: Capital reaches ₹5 Cr OR HIFY reaches ₹2L/month).
- **Cycle Week Semantics:** Replaced ISO calendar week `2026-W40` with explicit POS cycle semantics: `id: "CYCLE-W01"`, `cycle_week_number: 1`, and `calendar_week_id: "2026-W40"`.
- **Atomic Read-Modify-Write Serialization:** Implemented `mutateState(mutatorFn)` in `StorageEngine` and updated API endpoints (`/api/state`, `/api/week`, `/api/website-task`, `/api/review`) to serialize full read-modify-write operations, preventing race conditions under concurrent requests.
- **Unrecorded Actuals Semantics:** Changed unrecorded metrics in weekly actuals from `0` to `null` to enforce the distinction: `null = not recorded yet`, `0 = explicitly measured zero`.
- **Startup Documentation:** Clarified Phase 1 startup instructions in `README.md` (`npm run server` for backend, `npm run dev` for frontend).
- **Automated Tests:** Added regression tests covering cycle week semantics, health seed integrity, ₹2L threshold, null vs zero actuals, and concurrent API mutation safety (16 tests passing).

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
  - Current cycle anchor: Cycle Week 1 (`CYCLE-W01`, Oct 1 – Oct 4, 2026).
  - 7 goals across the 4-tier life hierarchy (Health, Spiritual, Family, Corporate Job, Trading, HIFY Growth, HIFY Community).
  - Finite Website checklist across Core, Conversion, Experience, and Polish (Polish explicitly marked as non-blocking for maintenance freeze).
  - **Zero fabricated actuals:** Week 1 actuals initialized with `null` ready for genuine user entry.
- **Schema Validation (`server/schema.js`):**
  - Rigid runtime structural and type validation before any write to disk.
- **REST API Server (`server/index.js`):**
  - Endpoints: `GET /api/health`, `GET /api/state`, `POST /api/state`, `POST /api/week`, `POST /api/website-task`, `POST /api/review`, `POST /api/backup`, `GET /api/backups`, `GET /api/export/json`, `GET /api/export/fortnightly-prompt/:id`.
- **Frontend Scaffolding:**
  - React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons.
  - Calm executive dark theme color palette.
  - Phase 1 status verification view connecting to `/api/health`.
- **Automated Test Suite (`tests/storage.test.js`, `tests/api.test.js`):**
  - Automated unit and integration tests.

---

## [0.1.0] - October 2026

### Added
- Project initialized with GitHub repository source of truth.
- Dual-branch strategy established (`main` stable, `dev` integration, feature branches).
- Core operating governance established (`DEVELOPMENT_WORKFLOW.md`, `CHANGE_CONTROL.md`, `ANTI_RABBIT_HOLE.md`, `CHATGPT_AGY_LOOP.md`).
- Six-month operating model established (`OPERATING_MODEL.md`).
- Weekly operating and fortnightly review templates committed.
- MVP scope defined across four priority tiers (`MVP_SCOPE.md`).
- MVP technical architecture specified and reviewed (`MVP_ARCHITECTURE.md`).
