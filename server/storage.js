import fs from 'node:fs/promises';
import path from 'node:path';
import { getSeedState } from './seedData.js';
import { validateState } from './schema.js';

export class StorageEngine {
  constructor(options = {}) {
    this.dataDir = options.dataDir || path.resolve(process.cwd(), 'data');
    this.stateFile = options.stateFile || path.join(this.dataDir, 'pos_state.json');
    this.backupDir = options.backupDir || path.join(this.dataDir, 'backups');
    this.maxBackups = options.maxBackups || 30;

    // Concurrency queue to serialize writes
    this._writeQueue = Promise.resolve();
  }

  /**
   * Initializes directories and ensures state file exists and is valid.
   */
  async initialize() {
    await fs.mkdir(this.dataDir, { recursive: true });
    await fs.mkdir(this.backupDir, { recursive: true });

    try {
      await fs.access(this.stateFile);
      // File exists, verify its integrity
      await this.readState();
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Missing state file -> initialize with seed data
        const seed = getSeedState();
        await this._writeStateDirect(seed, false);
        await this.createBackup('initial_seed');
      } else if (err.name === 'SyntaxError' || err.message?.includes('corrupted')) {
        // Corrupted file -> trigger recovery
        await this._recoverFromCorruption();
      } else {
        throw err;
      }
    }
  }

  /**
   * Reads and parses current state. If corrupted, triggers recovery.
   */
  async readState() {
    try {
      const content = await fs.readFile(this.stateFile, 'utf-8');
      const state = JSON.parse(content);

      const validation = validateState(state);
      if (!validation.valid) {
        throw new Error(`State validation failed: ${validation.errors.join('; ')}`);
      }

      return state;
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw err;
      }
      // If JSON is invalid or corrupted, recover
      return await this._recoverFromCorruption();
    }
  }

  /**
   * Thread-safe, atomic write of state with backup creation.
   */
  async writeState(newState) {
    const validation = validateState(newState);
    if (!validation.valid) {
      throw new Error(`Cannot write invalid state: ${validation.errors.join(', ')}`);
    }

    // Enqueue write to guarantee serialized atomic execution
    return new Promise((resolve, reject) => {
      this._writeQueue = this._writeQueue
        .then(async () => {
          const result = await this._writeStateDirect(newState, true);
          resolve(result);
        })
        .catch(reject);
    });
  }

  /**
   * Internal direct atomic write implementation.
   */
  async _writeStateDirect(state, createBackupSnapshot = true) {
    const jsonString = JSON.stringify(state, null, 2);
    const tempFile = `${this.stateFile}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;

    // 1. Write to temporary file
    const fileHandle = await fs.open(tempFile, 'w');
    try {
      await fileHandle.writeFile(jsonString, 'utf-8');
      // 2. Flush/sync to physical storage
      await fileHandle.sync();
    } finally {
      await fileHandle.close();
    }

    // 3. Rename into place atomically with Windows retry handling
    await this._renameWithRetry(tempFile, this.stateFile);

    // 4. Create timestamped backup if requested
    let backupPath = null;
    if (createBackupSnapshot) {
      backupPath = await this.createBackup('auto');
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      backupPath
    };
  }

  /**
   * Cross-platform file rename with backoff retry to withstand transient Windows EPERM/EBUSY locks.
   */
  async _renameWithRetry(src, dest, maxRetries = 10, delayMs = 25) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await fs.rename(src, dest);
        return;
      } catch (err) {
        if ((err.code === 'EPERM' || err.code === 'EBUSY') && attempt < maxRetries) {
          await new Promise((res) => setTimeout(res, delayMs * attempt));
          continue;
        }
        throw err;
      }
    }
  }

  /**
   * Creates a timestamped backup snapshot in backups directory.
   */
  async createBackup(tag = 'manual') {
    await fs.mkdir(this.backupDir, { recursive: true });
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:T]/g, '').replace(/\..+/, '');
    const msPart = String(now.getMilliseconds()).padStart(3, '0');
    const backupFileName = `pos_backup_${datePart}_${msPart}_${tag}.json`;
    const backupPath = path.join(this.backupDir, backupFileName);

    const content = await fs.readFile(this.stateFile, 'utf-8');
    await fs.writeFile(backupPath, content, 'utf-8');

    // Prune older backups
    await this._pruneBackups();

    return backupPath;
  }

  /**
   * Lists available backup files ordered newest first (by modification time).
   */
  async listBackups() {
    try {
      const files = await fs.readdir(this.backupDir);
      const backupFiles = files.filter((f) => f.startsWith('pos_backup_') && f.endsWith('.json'));

      const fileStats = await Promise.all(
        backupFiles.map(async (filename) => {
          const filePath = path.join(this.backupDir, filename);
          const stat = await fs.stat(filePath);
          return { filename, mtimeMs: stat.mtimeMs };
        })
      );

      // Sort newest first by mtimeMs
      fileStats.sort((a, b) => b.mtimeMs - a.mtimeMs);
      return fileStats.map((item) => item.filename);
    } catch {
      return [];
    }
  }

  /**
   * Restores state from a chosen backup file.
   */
  async restoreBackup(backupFilename) {
    const backupPath = path.join(this.backupDir, backupFilename);
    const content = await fs.readFile(backupPath, 'utf-8');
    const state = JSON.parse(content);

    const validation = validateState(state);
    if (!validation.valid) {
      throw new Error(`Cannot restore invalid backup: ${validation.errors.join(', ')}`);
    }

    await this.writeState(state);
    return state;
  }

  /**
   * Recovers safely from file corruption by scanning backups or seeding afresh.
   * NEVER silently destroys existing data.
   */
  async _recoverFromCorruption() {
    console.warn('[STORAGE] Main state file corruption detected. Starting recovery protocol...');

    // 1. Preserve corrupted file
    const corruptArchived = `${this.stateFile}.corrupt_${Date.now()}`;
    try {
      await fs.rename(this.stateFile, corruptArchived);
      console.warn(`[STORAGE] Corrupted file preserved at: ${corruptArchived}`);
    } catch {
      // If rename fails, continue attempting backup recovery
    }

    // 2. Scan backups for latest valid backup
    const backups = await this.listBackups();
    for (const backup of backups) {
      try {
        const backupContent = await fs.readFile(path.join(this.backupDir, backup), 'utf-8');
        const state = JSON.parse(backupContent);
        const validation = validateState(state);
        if (validation.valid) {
          console.warn(`[STORAGE] Successfully restored state from valid backup: ${backup}`);
          await this._writeStateDirect(state, false);
          return state;
        }
      } catch {
        // Continue trying next backup
      }
    }

    // 3. If no backups valid, fallback to seed
    console.warn('[STORAGE] No valid backup found. Re-initializing with clean seed state.');
    const seed = getSeedState();
    await this._writeStateDirect(seed, false);
    await this.createBackup('post_corruption_recovery');
    return seed;
  }

  /**
   * Prunes backup files beyond maxBackups limit.
   */
  async _pruneBackups() {
    try {
      const backups = await this.listBackups();
      if (backups.length > this.maxBackups) {
        const toDelete = backups.slice(this.maxBackups);
        for (const file of toDelete) {
          await fs.unlink(path.join(this.backupDir, file)).catch(() => {});
        }
      }
    } catch {
      // Ignore prune errors
    }
  }
}

// Default singleton instance for standard app usage
export const defaultStorage = new StorageEngine();
