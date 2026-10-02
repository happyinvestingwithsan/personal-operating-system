import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { StorageEngine } from '../server/storage.js';
import { validateState } from '../server/schema.js';
import { getSeedState } from '../server/seedData.js';

// Helper to create an isolated test directory
async function createTempDir() {
  const tmpBase = os.tmpdir();
  const dirName = `pos_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const dirPath = path.join(tmpBase, dirName);
  await fs.mkdir(dirPath, { recursive: true });
  return dirPath;
}

test('Storage Engine Test Suite', async (t) => {
  let tempDir;

  t.beforeEach(async () => {
    tempDir = await createTempDir();
  });

  t.afterEach(async () => {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup error
    }
  });

  await t.test('1. Missing state file auto-initializes with seed data and initial backup', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    const state = await storage.readState();
    assert.equal(state.version, '1.1.0');
    assert.equal(state.cycle.id, '2026-H2');
    assert.equal(state.goals.length, 7);
    assert.equal(state.website_tasks.length, 9);
    assert.equal(state.weeks.length, 1);
    assert.equal(state.weeks[0].id, '2026-W40');

    // Confirm physical files created
    const fileExists = await fs.stat(storage.stateFile).then(() => true).catch(() => false);
    assert.ok(fileExists, 'pos_state.json should physically exist');

    const backups = await storage.listBackups();
    assert.ok(backups.length >= 1, 'Initial backup should exist');
  });

  await t.test('2. Normal read and write persists updates atomically', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    const state = await storage.readState();
    state.weeks[0].theme = 'Updated Theme for Testing';
    state.weeks[0].actuals.health_workouts_completed = 4;

    const result = await storage.writeState(state);
    assert.ok(result.success);

    const reloaded = await storage.readState();
    assert.equal(reloaded.weeks[0].theme, 'Updated Theme for Testing');
    assert.equal(reloaded.weeks[0].actuals.health_workouts_completed, 4);
  });

  await t.test('3. Schema validation rejects invalid state structures', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    // Invalid: missing cycle
    await assert.rejects(
      async () => {
        await storage.writeState({ version: '1.0' });
      },
      /Cannot write invalid state/
    );

    // Invalid: non-array goals
    const badState = getSeedState();
    badState.goals = "invalid";
    await assert.rejects(
      async () => {
        await storage.writeState(badState);
      },
      /Cannot write invalid state/
    );
  });

  await t.test('4. Backup creation and snapshot listing', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    const initialBackups = await storage.listBackups();
    const initialCount = initialBackups.length;

    await storage.createBackup('test_tag');
    const updatedBackups = await storage.listBackups();
    assert.equal(updatedBackups.length, initialCount + 1);
    assert.ok(updatedBackups[0].includes('test_tag'));
  });

  await t.test('5. Concurrent-safe sequential writes do not corrupt data', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    // Fire 10 simultaneous updates
    const updates = Array.from({ length: 10 }, (_, i) => async () => {
      const current = await storage.readState();
      current.weeks[0].actuals.website_hours_logged = i + 1;
      return storage.writeState(current);
    });

    await Promise.all(updates.map((fn) => fn()));

    const finalState = await storage.readState();
    assert.ok(finalState.weeks[0].actuals.website_hours_logged > 0);

    // Verify file integrity
    const content = await fs.readFile(storage.stateFile, 'utf-8');
    assert.doesNotThrow(() => JSON.parse(content));
  });

  await t.test('6. Corrupted JSON recovery restores from latest valid backup without data loss', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    // Save a known good state and create a backup
    const goodState = await storage.readState();
    goodState.weeks[0].theme = 'Known Good State Before Corruption';
    await storage.writeState(goodState);

    // Deliberately corrupt the main state file
    await fs.writeFile(storage.stateFile, '{ "corrupted": [unparseable garbage !@#$%^&*', 'utf-8');

    // Read should catch corruption, archive the corrupt file, and restore from valid backup
    const recoveredState = await storage.readState();
    assert.equal(recoveredState.weeks[0].theme, 'Known Good State Before Corruption');

    // Confirm that the corrupted file was preserved with .corrupt_ timestamp
    const allFiles = await fs.readdir(tempDir);
    const corruptArchive = allFiles.find((f) => f.includes('corrupt_'));
    assert.ok(corruptArchive, 'Corrupted file must be preserved for forensic safety');
  });

  await t.test('7. Interrupted write simulation leaves main state intact', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    const originalState = await storage.readState();

    // Create an orphaned .tmp file to simulate crash right before rename
    const orphanTmp = `${storage.stateFile}.12345.abcde.tmp`;
    await fs.writeFile(orphanTmp, '{"incomplete": true}', 'utf-8');

    // Main file must still read cleanly and accurately
    const current = await storage.readState();
    assert.equal(current.cycle.id, originalState.cycle.id);
    assert.equal(current.weeks[0].id, originalState.weeks[0].id);

    // Clean up
    await fs.unlink(orphanTmp).catch(() => {});
  });

  await t.test('8. Manual backup restoration', async () => {
    const storage = new StorageEngine({ dataDir: tempDir });
    await storage.initialize();

    const stateV1 = await storage.readState();
    stateV1.weeks[0].theme = 'Theme Version 1';
    await storage.writeState(stateV1);
    const backupPath = await storage.createBackup('v1_checkpoint');
    const backupFilename = path.basename(backupPath);

    const stateV2 = await storage.readState();
    stateV2.weeks[0].theme = 'Theme Version 2';
    await storage.writeState(stateV2);

    const stateAfterV2 = await storage.readState();
    assert.equal(stateAfterV2.weeks[0].theme, 'Theme Version 2');

    // Restore V1
    await storage.restoreBackup(backupFilename);
    const stateAfterRestore = await storage.readState();
    assert.equal(stateAfterRestore.weeks[0].theme, 'Theme Version 1');
  });
});
