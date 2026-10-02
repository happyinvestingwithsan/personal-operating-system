import type { OperatingState, DriftObservation, WeekRecord } from '../types.ts';

/**
 * Deterministic, rule-based drift detection for the dashboard sensor.
 * Strictly respects null semantics: unrecorded metrics (null) NEVER trigger false drift.
 */
export function evaluateDrift(state: OperatingState | null): DriftObservation[] {
  if (!state || !state.weeks || state.weeks.length === 0) {
    return [];
  }

  // Find active week or latest week
  const activeWeek: WeekRecord =
    state.weeks.find((w) => w.id === state.cycle.current_week_id) ||
    state.weeks[state.weeks.length - 1];

  if (!activeWeek || !activeWeek.actuals) {
    return [];
  }

  const actuals = activeWeek.actuals;
  const observations: DriftObservation[] = [];

  // Rule 1: Priority Cannibalization
  // Lower-tier effort logged (e.g. website hours or content) while foundation is explicitly missed
  const lowerTierActive =
    (actuals.website_hours_logged !== null && actuals.website_hours_logged > 6) ||
    (actuals.content_youtube_published !== null && actuals.content_youtube_published > 1);

  const foundationMissed =
    actuals.family_half_day_protected === false ||
    (actuals.health_workouts_completed !== null && actuals.health_workouts_completed === 0) ||
    (actuals.health_kriya_days !== null && actuals.health_kriya_days < 2);

  if (lowerTierActive && foundationMissed) {
    observations.push({
      id: 'drift_priority_cannibalization',
      severity: 'WARNING',
      category: 'PRIORITY_CANNIBALIZATION',
      message: 'Lower-tier activity exceeded plan while Foundation commitments were missed.'
    });
  }

  // Rule 2: Website Creep
  // Planned website container is capped (~5 hours maximum per week)
  if (actuals.website_hours_logged !== null && actuals.website_hours_logged > 6) {
    observations.push({
      id: 'drift_website_creep',
      severity: 'OBSERVATION',
      category: 'WEBSITE',
      message: 'Website effort exceeded its planned operating container.'
    });
  }

  // Rule 3: Distribution Gap (Effort without Bottleneck traction)
  if (
    actuals.content_youtube_published !== null &&
    actuals.content_youtube_published > 0 &&
    actuals.hify_masterclass_viewers !== null &&
    actuals.hify_masterclass_viewers === 0
  ) {
    observations.push({
      id: 'drift_distribution_gap',
      severity: 'OBSERVATION',
      category: 'DISTRIBUTION',
      message: 'Content published without corresponding Masterclass viewer growth.'
    });
  }

  // Rule 4: Trading Review Omission
  if (actuals.trading_review_completed === false) {
    observations.push({
      id: 'drift_trading_omitted',
      severity: 'WARNING',
      category: 'TRADING',
      message: 'Weekend trading review was not completed.'
    });
  }

  // Rule 5: Health Divergence
  if (actuals.health_workouts_completed !== null && actuals.health_workouts_completed < 2) {
    observations.push({
      id: 'drift_health_workouts',
      severity: 'OBSERVATION',
      category: 'FOUNDATION',
      message: 'Workout consistency below target for this week.'
    });
  }

  return observations;
}
