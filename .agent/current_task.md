# AGY TASK CONTRACT

- **Task ID:** TASK-0001
- **Project:** Personal Operating System (`personal-os`)
- **Branch:** `feature/task-0001`
- **Status:** DONE
- **Context Level:** STANDARD
- **Context Version:** 1
- **Generated At:** 2026-10-02T05:44:09.971756+00:00

---

## Objective
Add retry backoff for transient Windows EPERM / EBUSY errors during atomic file rename in storage engine to ensure test suite passes reliably.

## Requirements
- 1. Wrap atomic rename in server/storage.js with retry logic for EPERM/EBUSY
- 2. Ensure all 13 tests in npm test pass cleanly

## Constraints & Forbidden Scope Expansion
- Do not alter data schema
- Do not add external dependencies
- **STRICT:** Do NOT modify files outside the immediate scope of this task.
- **STRICT:** Do NOT merge directly into `main`.
- **STRICT:** All project tests must pass before completing this task.

## Relevant Project Context
# Personal Operating System

## 1. Project Purpose & Identity
- **Project ID:** personal-os
- **Repository:** happyinvestingwithsan/personal-operating-system
- **Trunk Branch:** main
- **Integration Branch:** feature/storage-and-server

## 2. High-Level Architecture
- Core language and framework configuration.
- Local execution and verification commands:
  - `npm test`

## 3. Important Constraints & Non-Goals
- Human approval required before merging into main.
- Strict scope control: zero unauthorized changes.

## 4. Development Conventions
- Feature branches named `feature/task-XXXX`.
- Standard commit messages: `feat(TASK-XXXX): <description>` or `fix(TASK-XXXX): <description>`.
- Automated tests must pass prior to merge approval.


## Relevant Decisions
# Durable Architecture & Design Decisions: Personal Operating System

Record durable decisions that future implementation work requires.

---

### DEC-0001: Integration with AI Build Orchestrator
- **Date:** 2026-10-02
- **Context:** Need repeatable, cost-free, automated coordination between ChatGPT, human, AGY, and Git.
- **Decision:** Use local-first AI Build Orchestrator with Git as durable source of truth.
- **Reason:** Enforces ₹0 cost, zero token dependencies for orchestration, and strict human review gating.
- **Impact:** Feature work is executed on dedicated branches with standardized AGY handoffs and ChatGPT review packages.


## Relevant Current State
# Current State: Personal Operating System

## Current Objective
Active baseline operations and feature delivery.

## Implementation State
- Registered in AI Build Orchestrator.
- Default branch: `main`
- Integration branch: `feature/storage-and-server`

## Active Task
None

## Recently Completed Work
- **TASK-0001**: Fix Windows atomic file rename retry in StorageEngine (Commit `5c5db3dc`, Tests `PASS`)
- **TASK-0001**: Fix Windows atomic file rename retry in StorageEngine (Commit `5c5db3dc`, Tests `PASS`)
- Project registered with AI Build Orchestrator.

## Open Issues & Bottlenecks
None recorded.

## Verification Test Commands
- `npm test`

## AGY Completion Checklist
- [ ] Inspect task requirements, relevant context, and affected codebase files.
- [ ] Implement requested changes cleanly within task boundaries.
- [ ] Run verification tests locally and confirm passing.
- [ ] Commit changes with message: `feat(TASK-0001): <description>`.
- [ ] Update completion summary below.

---

## AGY Completion Summary
<!-- AGY fills this section upon completing work -->
- **Commit SHA:** 
- **Files Modified:** 
- **Test Result:** 
- **Notes / Observations:** 
