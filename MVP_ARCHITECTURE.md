# MVP ARCHITECTURE: PERSONAL OPERATING SYSTEM
**Local-First Progress Control System**  
**Version:** 1.1 (Governance & Architecture Review Update)

---

## 1. Architecture Philosophy & Design Constraints

1. **100% Local-First & Self-Contained:** Zero cloud dependencies, zero external database servers, zero remote telemetry, zero authentication overhead. Runs fully offline on the user's local machine.
2. **Instant Startup & Low Resource Footprint:** Launches in seconds, consumes minimal RAM, and requires no daemon processes running in the background when not in use.
3. **Data Durability & Human-Readable Portability:** Core data lives in a local, human-readable file structure (`data/pos_state.json`) backed by atomic writes and timestamped snapshots (`data/backups/`). One-click Markdown/JSON exports paste directly into ChatGPT for strategic reviews.
4. **Maintenance Minimization:** The code itself must be clean, modular, and simple so it never becomes a software project requiring maintenance.

---

## 2. Technology Stack & Architectural Sanity Check

### Environment Inspection Findings
- **Operating System:** Windows 10/11
- **Node.js:** `v24.14.1` (Installed & verified)
- **npm:** `11.11.0` (Installed & verified)
- **Python:** `3.13.5` (Installed & verified)
- **Network/Cloud:** Localhost only.

### Architectural Sanity Check & Key Decisions

#### A. Is SQLite really necessary for MVP?
**Decision: NO. Adopt Atomic JSON File Storage as the primary MVP engine.**
- *Rationale:* Over a 6-month operating cycle (26 weeks, 13 fortnights, ~100 commitments, ~15 website tasks, 7 goals), the entire dataset is under 150 KB. SQLite with native bindings (`better-sqlite3`) requires native C++ compilation via `node-gyp` on Windows, which introduces fragile build tool dependencies on Node v24. Pure JS SQLite (`sql.js`) is an in-memory WASM buffer that requires manual disk flushes anyway.
- *Solution:* An Atomic JSON storage engine (`data/pos_state.json`) with transactional file writing (`write to temp file -> rename/replace`) guarantees zero data corruption, zero native compilation issues, 100% human inspectability in any text editor, effortless Git-friendly backups, and immediate durability. SQLite remains an optional future adapter if query volume ever demands it.

#### B. Is Express actually necessary?
**Decision: Keep a minimal Node local server (`server.js`).**
- *Rationale:* A browser-only app relying purely on `localStorage` risks accidental data loss if browser caches/cookies are cleared, and cannot write automatic physical backup files to disk without prompting for downloads. A minimal Node server (~60 lines of standard code using Express or native `node:http`) cleanly isolates physical file I/O on `D:\AI Projects\personal-operating-system\data\`, providing stable REST endpoints (`/api/state`, `/api/week`, `/api/review`, `/api/export`). It runs with zero friction via `npm run dev`.

#### C. Does the three-view MVP remain sufficient?
**Decision: YES. The three-view architecture is strictly maintained.**
1. **Core Dashboard:** Executive flight deck showing 6-month outcomes, leading indicators, foundation sensors, drift alerts, and website freeze progress.
2. **Weekly Check-In / Actuals:** Focused input screen for weekly actuals, 3–5 commitments, and the "NOT DOING" declaration.
3. **Fortnightly Review / ChatGPT Export:** 9-question audit interface with automated drift summary and one-click formatted ChatGPT strategic prompt generator.
*(Website tasks are embedded directly into the Dashboard as a bounded checklist component, eliminating unnecessary navigation.)*

#### D. Are seven normalized entities really required?
**Decision: NO. Simplify the data model into 4 cohesive core records.**
- `DriftObservation` is a pure computed view derived from rules, NOT a persisted database entity.
- `Commitment` and `Actual` belong naturally inside the weekly operating record.
- **The 4 Core Records:**
  1. `GoalRecord` (6-Month Goals & Targets)
  2. `WeekRecord` (Weekly Theme, Commitments, Actuals, Not-Doing)
  3. `FortnightlyReview` (9-Question Bi-weekly Audit & Reflection)
  4. `WebsiteTask` (Finite Checklist Items: Core, Conversion, Experience, Polish)

---

## 3. Priority Hierarchy & Metric Definitions

### The Four-Tier Operating Hierarchy
The system does NOT treat life arenas as equal-priority cards. It enforces a strict four-tier hierarchy:

1. **TIER 1 — FOUNDATION (Protected First): Health + Spiritual**
   - Sleep / recovery, daily Kriya practice, physical strength, weight trend, energy & vitality.
2. **TIER 2 — PROTECTION: Family Container**
   - Protected weekly family time, planned family outings, 24 vacation/travel days across 6 months, calm presence.
3. **TIER 3 — FINANCIAL ENGINE: Corporate Job + Trading**
   - **Corporate Job:** Financial security until transition conditions are met (₹5 Cr capital / ₹3.6L/mo recurring). The job is a funding mechanism, not long-term identity. No additional job effort is encouraged.
   - **Trading:** Capital growth targeting ~25% annualized return on current capital (~₹70L). Tracks Indian equity execution, US equity development, and F&O execution/review. No trading terminal or complex strategy tools.
4. **TIER 4 — IMPACT ENGINE: HIFY + Community**
   - Primary long-term life impact engine: Content → Masterclass → Cohort → Pathfinder → Retention.
   - Tracks member experience, retention, and community impact without letting logistics overwhelm the user.
5. **FINITE CONTAINER (Enabling Project): Website / Nexus**
   - Purpose is operational efficiency, Pathfinder logistics, member experience, and conversion.
   - Finite checklist: **Core + Conversion** (primary freeze criteria), **Experience** (bounded), and **Polish** (must NEVER block freeze).
   - End state: **FROZEN / MAINTENANCE MODE**.

---

### Core Question of the System
The dashboard must fundamentally answer:
> **"Am I spending my limited time and energy in accordance with the life I said I wanted?"**
*(NOT "How productive was I?", NOT "How many things did I complete?", and NOT "How many hours did I work?")*

---

### Metric Classification: Outcome vs Bottleneck vs Effort
To prevent the illusion of progress, the system enforces a strict distinction:

```
┌────────────────────────────────────────────────────────┐
│  1. OUTCOME (What Ultimately Matters)                  │
│     • Cohort Enrolments (Primary HIFY Business Outcome)│
│     • Capital Transition Progress toward ₹5 Cr Target  │
│     • Physical Strength & Weight Trend toward 70–74 kg │
└───────────────────────────▲────────────────────────────┘
                            │ Driven by
┌───────────────────────────┴────────────────────────────┐
│  2. GROWTH BOTTLENECK & CONVERSION (Leading Indicators)│
│     • Qualified Masterclass Viewers (Primary Bottleneck│
│       Target: 3,000 cumulative qualified viewers)      │
│     • Masterclass → Cohort Conversion Rate             │
│     • Cohort → Pathfinder Activation & Retention       │
└───────────────────────────▲────────────────────────────┘
                            │ Generated by
┌───────────────────────────┴────────────────────────────┐
│  3. EFFORT (What the User Directly Controls)           │
│     • Deep-Dive YouTube Videos & Reels Created         │
│     • Workouts & Daily Kriya Sessions Completed        │
│     • Weekend Trading Reviews Conducted                │
│     • Protected Family Half-Days Honored               │
└────────────────────────────────────────────────────────┘
```

**Rule:** Never present effort as equivalent to outcome. A week with high content creation (effort) but zero Masterclass viewers (leading bottleneck) must show that divergence clearly.

### HIFY Metric Hierarchy & Targets
- **Primary Business Outcome:** COHORT ENROLMENTS
- **Primary Growth Bottleneck:** QUALIFIED MASTERCLASS VIEWERS (Target: 3,000 cumulative qualified viewers across the 6-month cycle)
- **Conversion Metric:** MASTERCLASS → COHORT CONVERSION RATE
- **Downstream Health:** COHORT → PATHFINDER ACTIVATION / RETENTION
- **Long-Term Scale:** 1,000 active members is an *aspirational long-term vision*, NOT a mandatory 6-month target. Targets allow distinction between committed vs aspirational.
- **Secondary Distribution Indicators Only:** YouTube views, channel subscribers, Instagram followers. *(These are secondary distribution channels and must never define success).*

### Health Metric Caution
- **Context:** The user previously transitioned from ~74 kg to ~60 kg and aims to rebuild physical strength and weight toward approximately 70–74 kg.
- **Guardrail:** The software must **never declare "70 kg = healthy"** or make medical diagnoses, predictions, or evaluations.
- **Captured Personal Inputs:**
  - Body weight (kg)
  - Exercise / strength workout consistency (days completed)
  - Daily Kriya practice consistency (days completed)
  - Sleep notes / qualitative rest
  - Energy & vitality level (qualitative rating)
  - Optional personal notes

---

## 4. Conceptual Data Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM STATE CONTAINER                        │
│                           (`data/pos_state.json`)                       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
┌──────────────┐              ┌──────────────┐              ┌──────────────┐
│ GoalRecord[] │              │ WeekRecord[] │              │ WebsiteTask[]│
└──────────────┘              └──────┬───────┘              └──────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                 ▼
         ┌────────────────────┐            ┌────────────────────┐
         │ Commitments[]      │            │ Actuals            │
         │ (Planned 3–5 items)│            │ (Recorded metrics) │
         └────────────────────┘            └────────────────────┘
                                     │
                                     ▼ (Every 2 Weeks)
                              ┌──────────────────────┐
                              │ FortnightlyReview[]  │
                              │ (9-Question Audit &  │
                              │ ChatGPT Export)      │
                              └──────────────────────┘
```

### Entity Specifications

#### 1. `GoalRecord` (Six-Month Outcome)
- `id`: string (e.g., `goal_hify_growth`, `goal_health_strength`)
- `arena`: enum (`HEALTH`, `SPIRITUAL`, `FAMILY`, `TRADING`, `HIFY_GROWTH`, `CONTENT`, `JOB_TRANSITION`)
- `title`: string
- `why_it_matters`: text (Emotional & strategic anchor)
- `metric_type`: enum (`OUTCOME`, `LEADING_INDICATOR`, `EFFORT`)
- `target_value`: string
- `current_value`: string
- `direction`: enum (`INCREASE`, `DECREASE`, `MAINTAIN`, `COMPLETE`)
- `status`: enum (`ON_TRACK`, `AT_RISK`, `OFF_TRACK`, `ACHIEVED`)
- `deadline`: string (`2027-03-31`)
- `notes`: text

#### 2. `WeekRecord` (Weekly Plan & Actuals)
- `id`: string (e.g., `2026-W41`)
- `start_date`: string (`YYYY-MM-DD`)
- `end_date`: string (`YYYY-MM-DD`)
- `theme`: string (e.g., "Foundation & Website Entitlement Completion")
- `not_doing`: string[] (Explicit list of forbidden distractions this week)
- `commitments`: Array of:
  - `id`: string
  - `arena`: enum (`HEALTH`, `SPIRITUAL`, `FAMILY`, `TRADING`, `HIFY`, `CONTENT`, `WEBSITE`)
  - `title`: string (e.g., "Publish 1 English deep-dive on YouTube")
  - `target_outcome`: string (e.g., "Include Masterclass CTA link")
  - `is_completed`: boolean
  - `notes`: text
- `actuals`:
  - `health_workouts_completed`: number
  - `health_kriya_days`: number
  - `health_weight_kg`: number | null
  - `health_sleep_notes`: string
  - `health_energy_level`: string
  - `family_half_day_protected`: boolean
  - `family_vacation_days_logged`: number
  - `trading_review_completed`: boolean
  - `trading_decisions_summary`: string
  - `hify_masterclass_viewers`: number (PRIMARY)
  - `hify_cohort_conversions`: number
  - `hify_active_members`: number
  - `content_youtube_published`: number
  - `content_reels_published`: number
  - `website_hours_logged`: number
- `status`: enum (`PLANNING`, `ACTIVE`, `COMPLETED`, `REVIEWED`)

#### 3. `WebsiteTask` (Finite Checklist Container)
- `id`: string
- `title`: string
- `category`: enum (`CORE`, `CONVERSION`, `EXPERIENCE`, `POLISH`)
- `status`: enum (`BACKLOG`, `IN_PROGRESS`, `DONE`, `REJECTED`)
- `why_it_matters`: string (Must explain: reduces effort, improves member experience, or boosts conversion)
- `completed_at`: string | null

**The Freeze Rule:** Polish tasks must NEVER delay entering `FROZEN` status. Once Core, Conversion, and essential Experience items are done, the website enters **MAINTENANCE MODE / FROZEN**.

#### 4. `FortnightlyReview` (Bi-Weekly Audit & Export)
- `id`: string (e.g., `FR-2026-01`)
- `period_start`: string
- `period_end`: string
- `q1_what_happened`: text
- `q2_what_was_supposed_to_happen`: text
- `q3_where_diverged`: text
- `q4_causes`: text
- `q5_attribution_category`: enum (`POOR_PLANNING`, `OVERCOMMITMENT`, `UNEXPECTED_WORK`, `PERFECTIONISM`, `TECHNICAL_ISSUE`, `HEALTH`, `FAMILY`, `JOB`, `DELIBERATE_CHOICE`)
- `q6_what_to_stop`: text
- `q7_what_to_continue`: text
- `q8_what_to_change`: text
- `q9_what_to_not_add`: text (Anti-expansion barrier)
- `chatgpt_prompt_export`: text (Auto-generated markdown prompt for ChatGPT)

---

## 5. Drift Detection Engine (Rule-Based & Non-Judgmental)

Drift detection is computed dynamically on read without polluting the database with transient alerts.

### Drift Principles: The Priority Cannibalization Focus
The biggest failure mode in this operating system is NOT complete inactivity. It is:
> **MISALLOCATION OF ATTENTION & PRIORITY CANNIBALIZATION**
*(e.g., website absorbing health time, trading research expanding indefinitely, technical or polish tasks feeling "productive" while foundational health and family deteriorate).*

1. **Rule-Based & Deterministic:** No machine learning, no black box, no artificial "productivity score."
2. **Transparent:** The threshold formula is displayed directly to the user.
3. **Non-Judgmental:** States neutral facts rather than emotional criticism.
   - *Valid:* "Website effort (11h) exceeded planned allocation (5h)."
   - *Invalid:* "You are spending too much time on the website."
   - *Valid:* "Health workouts were below target for 2 consecutive weeks."
   - *Invalid:* "You failed your health goal."
4. **Primary Focus on Priority Cannibalization:** Drift alerts detect when lower-tier work displaces higher-tier commitments.

### Standard Drift Rules
| Drift Indicator | Trigger Condition | Severity | System Message |
| :--- | :--- | :--- | :--- |
| **Priority Cannibalization** | Lower-tier effort exceeds container while Tier 1/2 missed | Warning | "Lower-tier activity exceeded plan while Foundation commitments were missed." |
| **Website Creep** | `website_hours_logged > planned_allocation * 1.5` | Observation | "Website effort exceeded its planned operating container." |
| **Health Divergence** | `health_workouts < target` for 2 consecutive weeks | Observation | "Workout consistency below target for two consecutive weeks." |
| **Family Drift** | `family_half_day_protected === false` | Observation | "Protected weekend family half-day was not honored." |
| **Trading Complexity Creep**| Trading research logged outside declared weekend container | Observation | "Trading research expanded beyond declared weekend operating container." |
| **Distribution Drift** | `content_effort > threshold` AND `masterclass_growth === 0` | Observation | "Content effort increased without corresponding masterclass viewer growth." |
| **Conversion Drift** | Masterclass traffic grew but cohort conversion deteriorated | Observation | "Masterclass traffic increased but cohort conversion declined." |
| **Trading Review Omission** | `trading_review_completed === false` | Warning | "Weekend trading review was not recorded." |

---

## 6. The Three Core Views (Screen Layouts)

### View 1: Core Dashboard (Flight Deck)
```
┌────────────────────────────────────────────────────────────────────────┐
│  PERSONAL OPERATING SYSTEM   [Oct 2026 – Mar 2027]    Week 41 (Active) │
├────────────────────────────────────────────────────────────────────────┤
│  [1] DASHBOARD           [2] WEEKLY CHECK-IN        [3] FORTNIGHTLY    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  TOP SENSORS: TRANSITION & DRIFT                                       │
│  • Job Transition: ₹70L / ₹5.0 Cr Capital  │  HIFY: ₹0.8L / ₹3.6L/mo   │
│  • DRIFT SENSOR: Website work exceeded planned allocation by 3.5 hrs   │
│                                                                        │
│  FOUNDATION (Health, Spiritual, Family)                                │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │ HEALTH & ENERGY         │  │ FAMILY CONTAINER                    │  │
│  │ • Kriya: 5/7 days       │  │ • Protected Weekend Block: [HONORED]│  │
│  │ • Workouts: 3/4 sessions│  │ • Vacation Days: 4/24 logged        │  │
│  │ • Weight: 60.8 kg       │  │ • Rest & Presence: Calm             │  │
│  └─────────────────────────┘  └─────────────────────────────────────┘  │
│                                                                        │
│  WEALTH & DISTRIBUTION (Trading & HIFY)                                │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │ TRADING DISCIPLINE      │  │ HIFY CONVERSION & DISTRIBUTION      │  │
│  │ • Weekend Review: DONE  │  │ • Masterclass Viewers: 14 (Primary) │  │
│  │ • Decisions Made: 2     │  │ • Cohort Conversions: 4 (Outcome)   │  │
│  │ • Impulsive Orders: 0   │  │ • Effort: 1 Video, 4 Reels          │  │
│  └─────────────────────────┘  └─────────────────────────────────────┘  │
│                                                                        │
│  FINITE WEBSITE COMPLETION TRACKER                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Status: 8/12 Finite Items Done (66%)  •  Target: FROZEN          │  │
│  │ Remaining: [x] Auth fix  [ ] Entitlements  [ ] Webhook safety    │  │
│  │ (Polish items excluded from freeze criteria)                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  WEEKLY FOCUS & "NOT DOING" LIST                                       │
│  • Commitments (3/5 Done): [x] Meta YT  [x] Kriya 6x  [ ] Entitlements │
│  • NOT DOING: Website redesign, scanning exploratory trading universes │
└────────────────────────────────────────────────────────────────────────┘
```

### View 2: Weekly Check-In / Actuals
- **Time budget:** 15–20 minutes once a week.
- Simple, tabbed or stacked input sections for:
  - Commitments completed vs incomplete.
  - Health & Vitality actuals (workouts, kriya, weight, sleep/energy).
  - Family protected half-day confirmation.
  - Weekend trading review confirmation.
  - HIFY Masterclass viewers (Primary) & conversions.
  - Website hours logged.
  - Next week's 3–5 key commitments.
  - Next week's "NOT DOING" declarations.

### View 3: Fortnightly Review & ChatGPT Export
- **Time budget:** ~30 minutes once every two weeks.
- Form containing the 9 audit questions.
- Automatically generates the copy-ready ChatGPT Strategic Audit Prompt:
  ```markdown
  # FORTNIGHTLY STRATEGIC REVIEW PROMPT
  Period: 2026-W41 to 2026-W42
  
  ## Actuals vs Commitments
  [Compiled summary of planned commitments, actual metrics, and drift observations]
  
  ## User Reflection
  - What happened: ...
  - Where divergence occurred: ...
  - Primary attribution: PERFECTIONISM
  - What to stop: ...
  
  ## Strategic Request for ChatGPT
  1. Audit these results against the 6-month goals.
  2. Challenge any rationalizations or hidden scope creep.
  3. Recommend simplification for the next fortnight.
  ```

---

## 7. Storage, Backup & Export Architecture

```
[Browser Frontend: React + Vite + Tailwind]
       │
       │ HTTP / REST (localhost:3000)
       ▼
[Minimal Node Server: server.js]
       │
       ├──> Atomic Write: `data/pos_state.json` (via .tmp file rename)
       │
       ├──> Timestamped Snapshots: `data/backups/pos_backup_<YYYYMMDD_HHMMSS>.json`
       │
       └──> Export Endpoints:
              ├── GET /api/export/json (Full archive dump)
              └── GET /api/export/fortnightly-prompt/:id (Ready-to-paste Markdown)
```

---

## 8. Explicit Non-Goals Summary

1. No Habit Streaks or gamified dopamine mechanics.
2. No minute-by-minute time trackers or Pomodoro clocks.
3. No live market feeds, ticker streams, or automated trading order execution.
4. No cloud authentication, JWT tokens, or external multi-tenant infrastructure.
5. No push notifications or nagging background alarms.
6. No medical diagnoses or declaring arbitrary weight targets as healthy.
7. No infinite task backlogs.
