import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import express from 'express';
import cors from 'cors';
import { StorageEngine } from '../server/storage.js';

test('REST API Endpoints Integration Test', async (t) => {
  const tempDir = path.join(os.tmpdir(), `pos_api_test_${Date.now()}`);
  await fs.mkdir(tempDir, { recursive: true });

  const storage = new StorageEngine({ dataDir: tempDir });
  await storage.initialize();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', async (req, res) => {
    const state = await storage.readState();
    const backups = await storage.listBackups();
    res.json({
      status: 'operational',
      cycle: state.cycle.name,
      current_week_id: state.cycle.current_week_id,
      storage: { backups_count: backups.length }
    });
  });

  app.get('/api/state', async (req, res) => {
    const state = await storage.readState();
    res.json(state);
  });

  app.post('/api/week', async (req, res) => {
    const weekData = req.body;
    const { state } = await storage.mutateState((currentState) => {
      const index = currentState.weeks.findIndex((w) => w.id === weekData.id);
      if (index >= 0) {
        currentState.weeks[index] = { ...currentState.weeks[index], ...weekData };
      } else {
        currentState.weeks.push(weekData);
      }
      return currentState;
    });
    const updated = state.weeks.find((w) => w.id === weekData.id);
    res.json({ success: true, week: updated });
  });

  app.post('/api/website-task', async (req, res) => {
    const taskData = req.body;
    const { state } = await storage.mutateState((currentState) => {
      const index = currentState.website_tasks.findIndex((t) => t.id === taskData.id);
      if (index >= 0) {
        currentState.website_tasks[index] = { ...currentState.website_tasks[index], ...taskData };
      } else {
        currentState.website_tasks.push(taskData);
      }
      return currentState;
    });
    const updated = state.website_tasks.find((t) => t.id === taskData.id);
    res.json({ success: true, task: updated });
  });

  let server;
  let port;

  await new Promise((resolve) => {
    server = app.listen(0, () => {
      port = server.address().port;
      resolve();
    });
  });

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
  });

  await t.test('GET /api/health returns operational status and cycle week semantics', async () => {
    const res = await fetch(`http://localhost:${port}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'operational');
    assert.equal(body.current_week_id, 'CYCLE-W01');
    assert.ok(body.storage.backups_count >= 1);
  });

  await t.test('GET /api/state returns full seeded state with no fabricated actuals', async () => {
    const res = await fetch(`http://localhost:${port}/api/state`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.goals.length, 7);
    assert.equal(body.website_tasks.length, 9);
    assert.equal(body.weeks.length, 1);
    assert.equal(body.weeks[0].id, 'CYCLE-W01');
    assert.equal(body.weeks[0].cycle_week_number, 1);
    assert.equal(body.weeks[0].calendar_week_id, '2026-W40');

    // Confirm unrecorded actuals are null
    assert.equal(body.weeks[0].actuals.health_workouts_completed, null);
    assert.equal(body.weeks[0].actuals.hify_masterclass_viewers, null);
  });

  await t.test('POST /api/week updates week actuals', async () => {
    const updatePayload = {
      id: 'CYCLE-W01',
      actuals: {
        health_workouts_completed: 2,
        health_kriya_days: 3,
        health_weight_kg: 61.0,
        health_sleep_notes: 'Good rest',
        health_energy_level: 'High',
        family_half_day_protected: true,
        family_vacation_days_logged: 0,
        trading_review_completed: true,
        trading_decisions_summary: 'Reviewed positions, no ad-hoc trades',
        hify_masterclass_viewers: 25,
        hify_cohort_conversions: 2,
        hify_active_members: 14,
        content_youtube_published: 1,
        content_reels_published: 2,
        website_hours_logged: 3
      }
    };

    const res = await fetch(`http://localhost:${port}/api/week`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.week.actuals.health_workouts_completed, 2);
    assert.equal(body.week.actuals.hify_masterclass_viewers, 25);

    // Verify persistence
    const state = await storage.readState();
    assert.equal(state.weeks[0].actuals.hify_cohort_conversions, 2);
  });

  await t.test('Concurrent API mutations serialize read-modify-write without lost updates', async () => {
    // 5 concurrent requests updating 5 different website tasks
    const taskUpdates = [
      { id: 'web_task_01', status: 'IN_PROGRESS' },
      { id: 'web_task_02', status: 'DONE' },
      { id: 'web_task_03', status: 'DONE' },
      { id: 'web_task_04', status: 'IN_PROGRESS' },
      { id: 'web_task_05', status: 'BACKLOG' }
    ];

    const responses = await Promise.all(
      taskUpdates.map((task) =>
        fetch(`http://localhost:${port}/api/website-task`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        }).then((r) => r.json())
      )
    );

    // All should succeed
    responses.forEach((resp) => assert.ok(resp.success));

    // Verify state has ALL 5 updates preserved
    const finalState = await storage.readState();
    assert.equal(finalState.website_tasks.find((t) => t.id === 'web_task_01').status, 'IN_PROGRESS');
    assert.equal(finalState.website_tasks.find((t) => t.id === 'web_task_02').status, 'DONE');
    assert.equal(finalState.website_tasks.find((t) => t.id === 'web_task_03').status, 'DONE');
    assert.equal(finalState.website_tasks.find((t) => t.id === 'web_task_04').status, 'IN_PROGRESS');
    assert.equal(finalState.website_tasks.find((t) => t.id === 'web_task_05').status, 'BACKLOG');
  });
});
