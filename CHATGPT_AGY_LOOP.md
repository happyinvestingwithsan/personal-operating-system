# THE CHATGPT ↔ AGY ↔ USER ↔ GITHUB LOOP

## Overview
To prevent emotional over-engineering, scope creep, and ungrounded coding, the Personal Operating System is built and operated through a closed, multi-tiered governance loop:

```
                  ┌──────────────────────────────┐
                  │             USER             │
                  │   (Human Decision-Maker)     │
                  └──────────────┬───────────────┘
                                 │
                 Decisions / Approvals / Context
                                 │
                                 ▼
┌─────────────────────────┐             ┌─────────────────────────┐
│        CHATGPT          │             │           AGY           │
│    (Strategic Layer)    │             │  (Implementation Layer) │
│                         │             │                         │
│ • Challenge assumptions │             │ • Inspect repo state    │
│ • Identify drift        │             │ • Implement cleanly     │
│ • Recommend simplicity  │             │ • Test & verify         │
│ • Review architecture   │             │ • Document changes      │
└────────────┬────────────┘             └────────────┬────────────┘
             │                                       │
             │ Strategic Advice & Review             │ Commit & Push
             │                                       │
             └─────────────────► ◄───────────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │            GITHUB            │
                  │      (Source of Truth)       │
                  │                              │
                  │   main  ◄───  dev  ◄── feat  │
                  └──────────────────────────────┘
```

---

## 1. Operating Roles & Responsibilities

### ChatGPT — Strategic Thinking & Review Layer
ChatGPT serves as the objective, external strategist and review partner. It operates above the code to protect the user's intent.

**Responsibilities:**
- Review operating progress and fortnightly export data.
- Challenge assumptions, rationalizations, and subtle scope expansions.
- Detect behavioral and operational drift early.
- Aggressively recommend simplification and scope pruning.
- Review proposed architectural and design changes against `CHANGE_CONTROL.md`.
- Evaluate whether proposed software improvements are genuinely worthwhile before implementation.

### AGY — Implementation Layer
AGY (Antigravity) is the disciplined pair programming and technical execution agent. It does not invent strategy; it executes approved architectural decisions with engineering rigor.

**Responsibilities:**
- Inspect current repository state, existing branches, and documentation before taking action.
- Implement strictly approved features within bounded feature branches.
- Verify stability via manual smoke testing and automated logic unit tests.
- Maintain documentation integrity (`MVP_ARCHITECTURE.md`, `CHANGELOG.md`).
- Craft structured, conventional Git commits.
- Push changes to the GitHub remote repository.
- Stop and report the exact implementation state, file changes, and commit SHAs to the user.

### User — Human Decision-Maker
The user is the final authority and lived center of the operating system.

**Responsibilities:**
- Provide honest, real-world inputs during weekly check-ins and fortnightly audits.
- Set six-month priorities and choose weekly commitments.
- Approve or reject architectural and strategic changes.
- Conduct fortnightly reviews with ChatGPT.
- Make the ultimate call on what matters in life, work, health, and family.

### GitHub — The Source of Truth
GitHub is the authoritative, durable anchor for the entire project.

**Principles:**
- No meaningful implementation may exist solely on the local machine.
- Every change follows: **LOCAL → COMMIT → PUSH → GITHUB**.
- Progress is audited and reviewed through GitHub commits, branches, and diffs.
- `main` remains pristine; `dev` integrates features; feature branches isolate work.

---

## 2. Operating Cadence in Practice

1. **Strategic Deliberation (User + ChatGPT):**
   - Fortnightly review exported from system into ChatGPT.
   - ChatGPT analyzes actuals vs commitments, flags drift, and challenges additions.
   - User decides on any necessary software change or rule adjustment.
2. **Implementation Instruction (User → AGY):**
   - User tasks AGY with a single, bounded implementation step.
   - Task must cite the problem and adhere to `ANTI_RABBIT_HOLE.md`.
3. **Execution & Verification (AGY):**
   - AGY branches from `dev`, writes code, adds tests, runs verification, updates docs.
   - AGY commits and pushes to GitHub, then stops and reports.
4. **Audit & Closure (User + GitHub):**
   - User reviews diffs on GitHub, confirms working state, merges into `dev` (and eventually `main`).
