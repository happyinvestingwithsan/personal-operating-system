/**
 * Baseline Seed State for the Personal Operating System
 * Operating Cycle: October 1, 2026 – March 31, 2027 (26 Weeks)
 * 
 * Rules:
 * - Real goals, baselines, and target containers.
 * - ZERO fabricated actuals (no fake workouts, trading returns, or viewer metrics).
 * - Finite website checklist with Polish explicitly marked as non-blocking for freeze.
 */

export function getSeedState() {
  return {
    version: "1.1.0",
    cycle: {
      id: "2026-H2",
      name: "Six-Month Operating Cycle (Oct 2026 – Mar 2027)",
      start_date: "2026-10-01",
      end_date: "2027-03-31",
      total_weeks: 26,
      current_week_id: "2026-W40",
      description: "Local-first progress control cycle across 4 priority tiers and finite website completion."
    },
    goals: [
      {
        id: "goal_health_strength",
        tier: 1,
        tier_name: "TIER 1 — FOUNDATION",
        arena: "HEALTH",
        title: "Build Physical Strength & Weight toward 70–74kg",
        why_it_matters: "Physical strength and sustainable vitality form the foundation for all cognitive presence, emotional calm, and family energy.",
        target_type: "DIRECTIONAL",
        target_value: "Move toward ~70–74 kg with physical strength and high vitality",
        baseline_value: "~60 kg (rebuilding strength after multi-year drop from ~74 kg)",
        current_value: "60.5 kg",
        status: "ON_TRACK",
        notes: "Track workouts, kriya, sleep, and energy neutrally. System makes no medical diagnoses."
      },
      {
        id: "goal_spiritual_kriya",
        tier: 1,
        tier_name: "TIER 1 — FOUNDATION",
        arena: "SPIRITUAL",
        title: "Maintain Daily Kriya Practice",
        why_it_matters: "Daily inner alignment protects against emotional volatility, anxiety, and distraction.",
        target_type: "COMMITTED",
        target_value: "Daily Kriya practice (7 days/week)",
        baseline_value: "Establishing daily consistency",
        current_value: "Establishing consistency",
        status: "ON_TRACK",
        notes: "Foundation practice to be protected before any technical or creative work begins."
      },
      {
        id: "goal_family_protection",
        tier: 2,
        tier_name: "TIER 2 — PROTECTION",
        arena: "FAMILY",
        title: "Protect Weekly Family Time & 24 Planned Vacation Days",
        why_it_matters: "Family presence is the emotional core of life; career transition and business projects must not squeeze out loved ones.",
        target_type: "COMMITTED",
        target_value: "1 protected weekend half-day weekly + 24 vacation/travel days across cycle",
        baseline_value: "0 vacation days logged",
        current_value: "0 vacation days logged",
        status: "ON_TRACK",
        notes: "Protected container. Never sacrifice family blocks for technical or website polish."
      },
      {
        id: "goal_financial_job",
        tier: 3,
        tier_name: "TIER 3 — FINANCIAL ENGINE",
        arena: "JOB_TRANSITION",
        title: "Maintain Corporate Income toward Independence Threshold",
        why_it_matters: "Provides baseline financial security until transition conditions are met.",
        target_type: "COMMITTED",
        target_value: "Maintain salary; progress toward ₹5 Cr liquid capital & ₹3.6L/mo recurring HIFY revenue",
        baseline_value: "Corporate salary active; ₹70L liquid capital",
        current_value: "Corporate salary active; ₹70L liquid capital",
        status: "ON_TRACK",
        notes: "Job is a funding mechanism, not long-term identity. No additional job effort is encouraged."
      },
      {
        id: "goal_trading_capital",
        tier: 3,
        tier_name: "TIER 3 — FINANCIAL ENGINE",
        arena: "TRADING",
        title: "Target ~25% Annualized Return on Current Capital",
        why_it_matters: "Compounds wealth without increasing strategy complexity or screen addiction.",
        target_type: "COMMITTED",
        target_value: "~25% annualized return via disciplined Indian equity, US equity, and F&O execution",
        baseline_value: "Capital base: ~₹70 Lakhs",
        current_value: "Capital base: ~₹70 Lakhs",
        status: "ON_TRACK",
        notes: "Weekend review container only; no live intraday terminal or ad-hoc trades."
      },
      {
        id: "goal_hify_growth",
        tier: 4,
        tier_name: "TIER 4 — IMPACT ENGINE",
        arena: "HIFY_GROWTH",
        title: "Scale Qualified Masterclass Traffic & Cohort Enrolments",
        why_it_matters: "Primary long-term impact engine turning viewer attention into life-changing cohort participation.",
        target_type: "COMMITTED",
        target_value: "3,000 cumulative qualified Masterclass viewers; convert attention into Cohort enrolments",
        baseline_value: "Cycle start baseline",
        current_value: "Cycle start baseline",
        status: "ON_TRACK",
        notes: "Cohort enrolments is primary outcome; Masterclass traffic is the bottleneck; vanity views are secondary."
      },
      {
        id: "goal_hify_community",
        tier: 4,
        tier_name: "TIER 4 — IMPACT ENGINE",
        arena: "COMMUNITY",
        title: "Build Sustainable Pathfinder Community Experience",
        why_it_matters: "Nurtures active member impact without allowing administrative logistics to overwhelm the user.",
        target_type: "ASPIRATIONAL",
        target_value: "High Pathfinder activation & retention; 1,000 members as long-term vision",
        baseline_value: "Active cohort members",
        current_value: "Active cohort members",
        status: "ON_TRACK",
        notes: "1,000 members is an aspirational long-term target, not a required six-month quota."
      }
    ],
    website_tasks: [
      {
        id: "web_task_01",
        title: "Core User Authentication & Session Security",
        category: "CORE",
        status: "BACKLOG",
        why_it_matters: "Ensures reliable, secure access for members with zero login failure friction.",
        blocks_freeze: true,
        completed_at: null
      },
      {
        id: "web_task_02",
        title: "Member Entitlement & Access Control Verification",
        category: "CORE",
        status: "BACKLOG",
        why_it_matters: "Guarantees paid members automatically receive correct cohort permissions.",
        blocks_freeze: true,
        completed_at: null
      },
      {
        id: "web_task_03",
        title: "Webhook Reliability & Payment Failure Handling",
        category: "CORE",
        status: "BACKLOG",
        why_it_matters: "Prevents payment drop-offs and eliminates manual payment troubleshooting.",
        blocks_freeze: true,
        completed_at: null
      },
      {
        id: "web_task_04",
        title: "Public → Masterclass Registration Funnel Flow",
        category: "CONVERSION",
        status: "BACKLOG",
        why_it_matters: "Directly solves the primary growth bottleneck by capturing qualified viewers.",
        blocks_freeze: true,
        completed_at: null
      },
      {
        id: "web_task_05",
        title: "Masterclass Post-Session Cohort Application Page",
        category: "CONVERSION",
        status: "BACKLOG",
        why_it_matters: "Maximizes conversion of masterclass attention into committed cohort enrolments.",
        blocks_freeze: true,
        completed_at: null
      },
      {
        id: "web_task_06",
        title: "Pathfinder Member Resource Portal Navigation",
        category: "EXPERIENCE",
        status: "BACKLOG",
        why_it_matters: "Improves member experience and reduces ad-hoc support inquiries.",
        blocks_freeze: false,
        completed_at: null
      },
      {
        id: "web_task_07",
        title: "Community Onboarding Flow Simplification",
        category: "EXPERIENCE",
        status: "BACKLOG",
        why_it_matters: "Reduces user logistics burden when onboarding new cohort batches.",
        blocks_freeze: false,
        completed_at: null
      },
      {
        id: "web_task_08",
        title: "Typography & Dark Theme Contrast Polish",
        category: "POLISH",
        status: "BACKLOG",
        why_it_matters: "Visual aesthetics; non-essential.",
        blocks_freeze: false,
        completed_at: null
      },
      {
        id: "web_task_09",
        title: "Mobile Responsive Micro-Spacing Adjustments",
        category: "POLISH",
        status: "BACKLOG",
        why_it_matters: "Minor visual perfectionism; non-essential.",
        blocks_freeze: false,
        completed_at: null
      }
    ],
    weeks: [
      {
        id: "2026-W40",
        cycle_week_number: 1,
        start_date: "2026-10-01",
        end_date: "2026-10-04",
        theme: "Operating Rhythm Foundation & Baseline Setup",
        status: "ACTIVE",
        not_doing: [
          "Website redesign / ad-hoc visual polish",
          "Scanning speculative trading universes outside approved list",
          "Intraday / mid-week ad-hoc trades"
        ],
        commitments: [
          {
            id: "comm_w40_01",
            arena: "HEALTH",
            title: "Re-establish daily strength & Kriya foundation",
            target_outcome: "Complete 3 strength sessions and 4 Kriya mornings",
            is_completed: false,
            notes: ""
          },
          {
            id: "comm_w40_02",
            arena: "FAMILY",
            title: "Protect weekend family half-day block",
            target_outcome: "Zero work interruption during family block",
            is_completed: false,
            notes: ""
          },
          {
            id: "comm_w40_03",
            arena: "TRADING",
            title: "Conduct disciplined weekend portfolio review",
            target_outcome: "Execute planned allocation check without screen browsing",
            is_completed: false,
            notes: ""
          }
        ],
        // Zero fabricated actuals - strictly populated by user inputs
        actuals: {
          health_workouts_completed: 0,
          health_kriya_days: 0,
          health_weight_kg: null,
          health_sleep_notes: "",
          health_energy_level: "",
          family_half_day_protected: false,
          family_vacation_days_logged: 0,
          trading_review_completed: false,
          trading_decisions_summary: "",
          hify_masterclass_viewers: 0,
          hify_cohort_conversions: 0,
          hify_active_members: 0,
          content_youtube_published: 0,
          content_reels_published: 0,
          website_hours_logged: 0
        }
      }
    ],
    fortnightly_reviews: []
  };
}
