# Personal Operating System

A calm, local-first progress control system and executive dashboard designed to protect time, prevent priority drift, and sustain balance across health, family, trading discipline, HIFY distribution, and career transition (October 2026 – March 2027).

> **"The system must never become a major consumer of the time it is designed to protect."**

---

## Operating Governance & Architecture

This repository is governed by strict anti-rabbit-hole principles and a closed-loop review model:

- **[Operating Model](OPERATING_MODEL.md):** The six-month life strategy, arena definitions, time allocations, and feedback loops.
- **[Development Workflow](DEVELOPMENT_WORKFLOW.md):** Branching strategy (`main`, `dev`, feature branches), commit guidelines, testing requirements, and Definition of Done.
- **[Change Control](CHANGE_CONTROL.md):** The mandatory 5-question decision gate (Problem, Evidence, Benefit, Cost, Decision) before any feature or architectural change is admitted.
- **[Anti-Rabbit-Hole Principles](ANTI_RABBIT_HOLE.md):** Non-negotiable guardrails, explicit non-goals, and the strict user interaction budget (Daily $\le$ 5m, Weekly $\le$ 20m, Fortnightly $\approx$ 30m).
- **[ChatGPT ↔ AGY Loop](CHATGPT_AGY_LOOP.md):** Operating roles across User (Decision-Maker), ChatGPT (Strategic Layer), AGY (Implementation Layer), and GitHub (Source of Truth).
- **[MVP Architecture](MVP_ARCHITECTURE.md):** Local-first architecture evaluation, simplified 4-record data model, non-judgmental drift engine, and screen specifications.
- **[MVP Scope Matrix](MVP_SCOPE.md):** Priority tiers (Must Have, Should Have, Later, Do Not Build).
- **[Weekly Operating Template](WEEKLY_OPERATING_TEMPLATE.md):** Weekly planning, commitments, and actuals checklist.
- **[Fortnightly Review Template](FORTNIGHTLY_REVIEW_TEMPLATE.md):** Bi-weekly 9-question audit and ChatGPT prompt export template.
- **[Changelog](CHANGELOG.md):** Project version history and milestone tracking.

## Running Locally (Phase 1)

In Phase 1, the local Node API server and the Vite development server run as separate processes:

1. **Start the local storage & API server** (Port 3001):
   ```bash
   npm run server
   # or: npm start
   ```
2. **Start the Vite frontend development server** (Port 5173, proxies `/api` requests to `localhost:3001`):
   ```bash
   npm run dev
   ```
3. **Run automated test suite** (Node 24 native test runner):
   ```bash
   npm test
   ```
4. **Compile production build**:
   ```bash
   npm run build
   ```

---

## Development Status

- **Cycle:** October 1, 2026 – March 31, 2027 (26 weeks)
- **Current Version:** `0.2.0` (Phase 1: Persistence & Storage Engine Verified)
- **Status:** Phase 1 storage engine and REST API verified with 16 automated tests; Phase 2 UI intentionally deferred pending review.