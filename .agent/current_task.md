# AGY TASK CONTRACT

- **Task ID:** TASK-0001
- **Project:** Personal Operating System (`personal-os`)
- **Branch:** `feature/task-0001`
- **Status:** READY
- **Generated At:** 2026-10-02T05:19:47.478893+00:00

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

## Verification Test Commands
- `npm test`

## AGY Completion Checklist
- [ ] Inspect task requirements and relevant codebase files.
- [ ] Implement requested changes cleanly.
- [ ] Run verification tests locally and confirm passing.
- [ ] Commit changes with message: `feat(TASK-0001): <description>`.
- [ ] Update completion summary below.

---

## AGY Completion Summary
<!-- AGY fills this section upon completing work -->
- **Commit SHA:** Pending commit
- **Files Modified:** `server/storage.js`
- **Test Result:** PASS (13/13 tests passed via npm test)
- **Notes / Observations:** Successfully added _renameWithRetry to handle transient Windows EPERM/EBUSY file locks during rapid sequential atomic writes. All tests pass cleanly.
