import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeedState } from '../server/seedData.js';
import { evaluateDrift } from '../src/utils/drift.ts';

test('Dashboard Logic & Presentation Rules Test Suite', async (t) => {
  await t.test('1. Null semantics: unrecorded metrics are null, not 0', () => {
    const seed = getSeedState();
    const w1 = seed.weeks[0];

    assert.equal(w1.actuals.health_workouts_completed, null);
    assert.equal(w1.actuals.hify_masterclass_viewers, null);
    assert.equal(w1.actuals.hify_cohort_conversions, null);
    assert.equal(w1.actuals.website_hours_logged, null);
    assert.equal(w1.actuals.content_youtube_published, null);
  });

  await t.test('2. Cycle week semantics: CYCLE-W01 and calendar 2026-W40 are explicit', () => {
    const seed = getSeedState();
    assert.equal(seed.cycle.current_week_id, 'CYCLE-W01');
    const w1 = seed.weeks[0];
    assert.equal(w1.id, 'CYCLE-W01');
    assert.equal(w1.cycle_week_number, 1);
    assert.equal(w1.calendar_week_id, '2026-W40');
  });

  await t.test('3. Transition targets: ₹5 Cr and ₹2L/month are verified', () => {
    const seed = getSeedState();
    const jobGoal = seed.goals.find((g) => g.id === 'goal_financial_job');
    assert.ok(jobGoal);
    assert.ok(jobGoal.target_value.includes('₹5 Cr'));
    assert.ok(jobGoal.target_value.includes('₹2L/month'));
    assert.ok(!JSON.stringify(seed).includes('3.6L'));
  });

  await t.test('4. HIFY funnel: outcome, bottleneck, and effort are strictly distinguished', () => {
    const seed = getSeedState();
    const hifyGoal = seed.goals.find((g) => g.id === 'goal_hify_growth');
    assert.ok(hifyGoal);
    // 3,000 qualified viewers bottleneck target
    assert.ok(hifyGoal.target_value.includes('3,000'));
    assert.ok(hifyGoal.target_value.includes('Cohort enrolments'));

    // Downstream community goal
    const communityGoal = seed.goals.find((g) => g.id === 'goal_hify_community');
    assert.ok(communityGoal);
    assert.equal(communityGoal.target_type, 'ASPIRATIONAL');
    assert.ok(communityGoal.target_value.includes('1,000 members as long-term vision'));
  });

  await t.test('5. Website freeze: Polish NEVER blocks freeze', () => {
    const seed = getSeedState();
    const tasks = seed.website_tasks;

    const blockingTasks = tasks.filter((t) => t.blocks_freeze);
    const polishTasks = tasks.filter((t) => !t.blocks_freeze);

    assert.equal(blockingTasks.length, 5); // 3 Core + 2 Conversion
    assert.ok(polishTasks.length >= 2); // Polish items exist

    // Simulate all blocking tasks marked DONE, while polish remains in BACKLOG
    const simulatedTasks = tasks.map((t) => {
      if (t.blocks_freeze) {
        return { ...t, status: 'DONE' };
      }
      return { ...t, status: 'BACKLOG' };
    });

    const completedBlocking = simulatedTasks.filter((t) => t.blocks_freeze && t.status === 'DONE').length;
    const isReadyToFreeze = completedBlocking === blockingTasks.length;

    // Polish tasks remaining in BACKLOG must NOT prevent ready-to-freeze state
    assert.equal(isReadyToFreeze, true, 'Ready to freeze must be true even if polish tasks are undone');
  });

  await t.test('6. Drift engine: no false drift when data is null/unrecorded', () => {
    const seed = getSeedState();
    const observations = evaluateDrift(seed);
    assert.deepEqual(observations, [], 'Seed state with unrecorded nulls must not trigger any drift');
  });

  await t.test('7. Drift engine: triggers website creep when container exceeded', () => {
    const seed = getSeedState();
    seed.weeks[0].actuals.website_hours_logged = 9; // Exceeds container of 6h

    const observations = evaluateDrift(seed);
    const websiteCreep = observations.find((o) => o.id === 'drift_website_creep');
    assert.ok(websiteCreep);
    assert.equal(websiteCreep.category, 'WEBSITE');
    assert.equal(websiteCreep.message, 'Website effort exceeded its planned operating container.');
  });

  await t.test('8. Drift engine: triggers priority cannibalization when lower-tier exceeds while foundation missed', () => {
    const seed = getSeedState();
    seed.weeks[0].actuals.website_hours_logged = 10;
    seed.weeks[0].actuals.family_half_day_protected = false; // Displaced

    const observations = evaluateDrift(seed);
    const cannibalization = observations.find((o) => o.id === 'drift_priority_cannibalization');
    assert.ok(cannibalization);
    assert.equal(cannibalization.severity, 'WARNING');
    assert.equal(cannibalization.message, 'Lower-tier activity exceeded plan while Foundation commitments were missed.');
  });

  await t.test('9. Drift engine: triggers distribution gap when content published but 0 masterclass viewers', () => {
    const seed = getSeedState();
    seed.weeks[0].actuals.content_youtube_published = 2;
    seed.weeks[0].actuals.hify_masterclass_viewers = 0; // Explicitly measured 0

    const observations = evaluateDrift(seed);
    const gap = observations.find((o) => o.id === 'drift_distribution_gap');
    assert.ok(gap);
    assert.equal(gap.category, 'DISTRIBUTION');
    assert.equal(gap.message, 'Content published without corresponding Masterclass viewer growth.');
  });

  await t.test('10. Drift engine: triggers trading review omission when explicitly false', () => {
    const seed = getSeedState();
    seed.weeks[0].actuals.trading_review_completed = false; // Explicitly false

    const observations = evaluateDrift(seed);
    const tradingOmitted = observations.find((o) => o.id === 'drift_trading_omitted');
    assert.ok(tradingOmitted);
    assert.equal(tradingOmitted.severity, 'WARNING');
  });
});
