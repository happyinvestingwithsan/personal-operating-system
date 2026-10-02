# DEVELOPMENT WORKFLOW

## 1. Repository Purpose
The **Personal Operating System** repository is the authoritative, single source of truth for the local-first progress control system designed for Sathya (Oct 2026 – Mar 2027). It governs the operating rhythm across health, spiritual practice, family protection, trading discipline, HIFY distribution, content creation, and finite website completion.

No implementation exists validly until it is tested, documented, committed, and pushed to GitHub.

---

## 2. Branch Strategy

The repository strictly enforces a dual-branch trunk model with feature branches:

```
main (Production / Stable / Always Usable)
  │
  └──> dev (Integration & Verification)
         │
         ├──> feature/mvp-dashboard
         ├──> feature/weekly-checkin
         ├──> feature/drift-engine
         └──> feature/fortnightly-review
```

### `main`
- **Purpose:** Stable, verified, approved operating version.
- **Rules:**
  - Must always represent a working, bootable, clean application state.
  - No direct experimental commits.
  - No unfinished application code.
  - Merges into `main` occur only when complete milestones (e.g., MVP release) have passed full integration testing and user validation on `dev`.

### `dev`
- **Purpose:** Active development and integration branch.
- **Rules:**
  - Branched directly from `main`.
  - Integration target for all feature branches via reviewed pull requests or verified merges.
  - Represents the latest working build of active features.

### `feature/*` Branches
- **Purpose:** Isolated implementation of exactly one bounded feature at a time.
- **Naming Convention:**
  - `feature/mvp-dashboard`
  - `feature/weekly-checkin`
  - `feature/drift-engine`
  - `feature/fortnightly-review`
  - `feature/storage-engine`
  - `feature/website-checklist`
- **Rules:**
  - Originate from `dev`.
  - Single-responsibility: never combine unrelated features into one branch.
  - Do not create branches for trivial 1-line documentation typos unless useful.

---

## 3. Development Flow & Operational Loop

Every change follows this strict sequence:

```
1. Sync dev with origin/dev
2. Branch feature/<name> from dev
3. Implement bounded capability
4. Run validation & tests (startup, logic, persistence, regression)
5. Update documentation & CHANGELOG
6. Commit with structured conventional message
7. Push feature branch to GitHub
8. Merge to dev after review / verification
9. When MVP milestone is complete & stable: PR/Merge dev into main
```

**Rule:** Do not automatically merge unfinished feature work directly into `main`.

---

## 4. Commit Expectations

Commit messages must be informative, precise, and adhere to Conventional Commits:

- `feat:` New user-facing capability or system feature (e.g., `feat: add weekly operating check-in interface`)
- `fix:` Bug fix or logic correction (e.g., `fix: correct drift threshold calculation for website hours`)
- `docs:` Documentation updates, governance, or template adjustments (e.g., `docs: establish change control process`)
- `test:` Adding or refining automated tests (e.g., `test: add boundary tests for fortnightly review date math`)
- `refactor:` Code simplification without behavioral change (e.g., `refactor: simplify storage adapter from sqlite to atomic json`)

**Forbidden commit messages:**
`update`, `changes`, `final`, `new`, `misc`, `wip`, `fixed bug`, `stuff`.

---

## 5. Testing Requirements

No feature branch may be merged into `dev` without passing the minimum test verification:

1. **Clean Startup:** The application starts locally with zero runtime exceptions or missing dependencies.
2. **Zero Console Errors:** Browser developer console must remain free of unhandled errors, broken hooks, or failed network requests.
3. **Core Workflow Verification:** The primary action of the feature operates end-to-end (e.g., submitting a weekly check-in updates state).
4. **Data Persistence:** Reloading the browser or restarting the local server preserves all entered data without corruption.
5. **No Regression:** Pre-existing screens, navigation, and features remain fully functional.
6. **Automated Logic Tests:** All pure calculation and decision logic must have automated unit tests covering:
   - Date calculations & fortnight boundary splits.
   - Six-month goal progress computations.
   - Drift threshold triggers (e.g., website hours > plan, health workouts < target for 2 consecutive weeks).
   - Empty, initial, and missing data states.
   - Backup generation and export formatting integrity.

---

## 6. Documentation Requirements

Code and documentation evolve together:
- Any change to entities, storage formats, or calculation formulas must be reflected in `MVP_ARCHITECTURE.md` or relevant markdown specifications.
- Every release or notable milestone must update `CHANGELOG.md`.
- No architectural drift is permitted without passing `CHANGE_CONTROL.md`.

---

## 7. Definition of Done (DoD)

A feature is strictly defined as **DONE** only when all of the following criteria are satisfied:

- [ ] Implementation satisfies the bounded specification without scope creep.
- [ ] Conforms to the Anti-Rabbit-Hole principles (zero gamification, calm design, bounded inputs).
- [ ] Passes all testing requirements (startup, manual smoke test, unit tests).
- [ ] Preserves data integrity with verifiable persistence.
- [ ] Documentation updated to reflect changes.
- [ ] Clean git commit with conventional format.
- [ ] Pushed to GitHub and integrated into `dev`.
- [ ] Reported clearly with exact commit SHA and verification summary.
