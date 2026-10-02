export type Arena =
  | 'HEALTH'
  | 'SPIRITUAL'
  | 'FAMILY'
  | 'JOB_TRANSITION'
  | 'TRADING'
  | 'HIFY_GROWTH'
  | 'COMMUNITY'
  | 'WEBSITE';

export interface Cycle {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  total_weeks: number;
  current_week_id: string;
  description?: string;
}

export interface GoalRecord {
  id: string;
  tier: number;
  tier_name: string;
  arena: Arena;
  title: string;
  why_it_matters: string;
  target_type: 'DIRECTIONAL' | 'COMMITTED' | 'ASPIRATIONAL';
  target_value: string;
  baseline_value: string;
  current_value: string;
  status: 'ON_TRACK' | 'AT_RISK' | 'OFF_TRACK' | 'ACHIEVED';
  notes?: string;
}

export interface Commitment {
  id: string;
  arena: Arena;
  title: string;
  target_outcome: string;
  is_completed: boolean;
  notes?: string;
}

export interface WeekActuals {
  health_workouts_completed: number | null;
  health_kriya_days: number | null;
  health_weight_kg: number | null;
  health_sleep_notes: string | null;
  health_energy_level: string | null;
  family_half_day_protected: boolean | null;
  family_vacation_days_logged: number | null;
  trading_review_completed: boolean | null;
  trading_decisions_summary: string | null;
  hify_masterclass_viewers: number | null;
  hify_cohort_conversions: number | null;
  hify_active_members: number | null;
  content_youtube_published: number | null;
  content_reels_published: number | null;
  website_hours_logged: number | null;
}

export interface WeekRecord {
  id: string;
  cycle_week_number: number;
  calendar_week_id: string;
  start_date: string;
  end_date: string;
  theme: string;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'REVIEWED';
  not_doing: string[];
  commitments: Commitment[];
  actuals: WeekActuals;
}

export type WebsiteTaskCategory = 'CORE' | 'CONVERSION' | 'EXPERIENCE' | 'POLISH';

export interface WebsiteTask {
  id: string;
  title: string;
  category: WebsiteTaskCategory;
  status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE' | 'REJECTED';
  why_it_matters: string;
  blocks_freeze: boolean;
  completed_at: string | null;
}

export interface FortnightlyReview {
  id: string;
  period_start: string;
  period_end: string;
  q1_what_happened?: string;
  q2_what_was_supposed_to_happen?: string;
  q3_where_diverged?: string;
  q4_causes?: string;
  q5_attribution_category?: string;
  q6_what_to_stop?: string;
  q7_what_to_continue?: string;
  q8_what_to_change?: string;
  q9_what_to_not_add?: string;
  chatgpt_prompt_export?: string;
}

export interface OperatingState {
  version: string;
  cycle: Cycle;
  goals: GoalRecord[];
  website_tasks: WebsiteTask[];
  weeks: WeekRecord[];
  fortnightly_reviews: FortnightlyReview[];
}

export interface DriftObservation {
  id: string;
  severity: 'OBSERVATION' | 'WARNING';
  category: 'FOUNDATION' | 'WEBSITE' | 'DISTRIBUTION' | 'TRADING' | 'PRIORITY_CANNIBALIZATION';
  message: string;
}
