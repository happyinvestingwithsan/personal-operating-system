import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
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
    const state = await storage.readState();
    const index = state.weeks.findIndex((w) => w.id === weekData.id);
    if (index >= 0) {
      state.weeks[index] = { ...state.weeks[index], ...weekData };
    } else {
      state.weeks.push(weekData);
    }
    await storage.writeState(state);
    res.json({ success: true, week: state.weeks[index >= 0 ? index : state.weeks.length - 1] });
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

  await t.test('GET /api/health returns operational status', async () => {
    const res = await fetch(`http://localhost:${port}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'operational');
    assert.equal(body.current_week_id, '2026-W40');
    assert.ok(body.storage.backups_count >= 1);
  });

  await t.test('GET /api/state returns full seeded state', async () => {
    const res = await fetch(`http://localhost:${port}/api/state`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.goals.length, 7);
    assert.equal(body.website_tasks.length, 9);
    assert.equal(body.weeks.length, 1);
  });

  await t.test('POST /api/week updates week actuals', async () => {
    const updatePayload = {
      id: '2026-W40',
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
});
