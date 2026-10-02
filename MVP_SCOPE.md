# MVP SCOPE: PERSONAL OPERATING SYSTEM
**Boundary Definition & Feature Classification**  
**Cycle:** October 2026 → March 31, 2027

---

## 1. Scope Principles

Every capability in this system must be categorized into one of four tiers:
1. **MUST HAVE (P0):** The absolute minimum required to answer *"Am I spending my limited time and energy in accordance with the life I said I wanted?"* and halt priority drift.
2. **SHOULD HAVE (P1):** High-leverage quality-of-life additions that improve weekly review speed without introducing complexity.
3. **LATER (P2):** Ideas that are theoretically interesting but must be deferred until the user has operated the system for at least 4–6 weeks.
4. **DO NOT BUILD:** Explicitly forbidden features designed to prevent this tool from becoming a productivity rabbit hole.

---

## 2. Scope Matrix

### Tier 1: MUST HAVE (P0) — Minimal Launch Scope

| Area | Feature / Capability | Description |
| :--- | :--- | :--- |
| **Scoreboard** | **Six-Month Outcomes View** | Displays the 7 core goals with target vs current, status badge, deadline (Mar 31, 2027), and "Why it matters". |
| **Weekly Planning** | **Weekly Commitments (Max 5)** | Declares 3–5 key weekly commitments linked to the 7 arenas. |
| **Anti-Drift** | **The "NOT DOING" Declaration** | A first-class weekly input field listing things intentionally forbidden this week. |
| **Weekly Actuals** | **Lightweight Weekly Check-In** | Captures workouts, Kriya days, protected family half-day, trading review status, Masterclass viewers, website hours. |
| **Sensors** | **Basic Drift Detection Engine** | Automatically highlights: (1) Website work overrun, (2) Health/Kriya neglected $\ge$ 2 weeks, (3) Trading review skipped, (4) High content effort with 0 Masterclass viewers. |
| **Review** | **Fortnightly 9-Question Review** | Digital interface for the bi-weekly 9-question review workflow. |
| **Integration** | **ChatGPT Review Prompt Export** | One-click copy of recent fortnightly data formatted into a ready-to-paste ChatGPT strategic prompt. |
| **Website Control** | **Website Completion Tracker** | Finite list of remaining Core & Conversion tasks with a prominent progress bar toward **FROZEN** status. |
| **Safety** | **Local SQLite + JSON Backup** | Automatic backup on data changes and 1-click JSON export. |

---

### Tier 2: SHOULD HAVE (P1) — Near-Term Enhancements

| Area | Feature / Capability | Description |
| :--- | :--- | :--- |
| **Visualization** | **Historical Drift Heatmap/Trend** | Simple 6-week view showing trend of Health vs Website vs Family allocation. |
| **Transition** | **Job Transition Progress Gauge** | Visual bar comparing current capital toward ₹5 Cr and HIFY monthly revenue toward ₹2 Lakh. |
| **Content** | **Content-to-Masterclass Funnel View** | Visual depiction: Videos/Reels $\rightarrow$ Masterclass Viewers $\rightarrow$ Cohort conversions. |
| **Decisions** | **Trading Decision Journal** | Simple log of weekend trading decisions (bought, sold, held, rebalanced) to prevent ad-hoc mid-week trading. |

---

### Tier 3: LATER (P2) — Deferred to Post-MVP Evaluation

| Feature | Reason for Deferral |
| :--- | :--- |
| **Stock Universe Screener / Pipeline** | The 114-stock universe reduction ($\text{Universe} \rightarrow \text{Filter} \rightarrow \text{Watchlist} \rightarrow \text{Trigger}$) is an advanced trading workflow. MVP only tracks *whether trading review happened*. |
| **Automated Health Wearable Sync** | Syncing with Apple Health, Oura, or Garmin adds significant API complexity and fragile auth. Manual entry takes 10 seconds. |
| **Automated YouTube / Instagram Analytics Sync** | Scraping or OAuth for YouTube Studio / Instagram Graph API introduces API token maintenance. Vanity views are explicitly secondary. |
| **Full Content Production Pipeline / Kanban** | Moving content through stages (Idea, Script, Filming, Editing) can easily become a separate project management sinkhole. |

---

### Tier 4: DO NOT BUILD (Explicit Guardrails & Non-Goals)

| Forbidden Feature | Why It Is Strictly Excluded |
| :--- | :--- |
| **Habit Streaks & Gamification** | Streaks encourage guilt, gamify the wrong incentives, and break down after illness or travel. |
| **Productivity Score / Points** | Calculating an arbitrary "score" encourages gaming metrics rather than living intentionally. |
| **Minute-by-Minute Time Tracking** | Continuous timers create intense cognitive friction and turn the user into a micromanaging clerk. |
| **Live Trading Terminal / Market Feeds** | Real-time prices encourage hyper-frequent checking, directly violating the trading time principle. |
| **Automated Trading Execution** | Violates safety, compliance, and core design principles. |
| **Cloud Authentication & Multi-Tenancy** | This is a personal, private operating system. Auth layers, login screens, and cloud setups are pure waste. |
| **Push Notifications / Nagging Alarms** | The user should interact with the system intentionally during defined reflection windows, not react to pings. |
| **Endless Feature Backlog** | An infinite backlog feeds the illusion that future software features will solve life discipline problems. |
