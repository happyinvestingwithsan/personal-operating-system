import express from 'express';
import cors from 'cors';
import { defaultStorage } from './storage.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize storage on startup
await defaultStorage.initialize();

/**
 * Health & diagnostic check
 */
app.get('/api/health', async (req, res) => {
  try {
    const state = await defaultStorage.readState();
    const backups = await defaultStorage.listBackups();

    res.json({
      status: 'operational',
      engine: 'Atomic JSON Storage',
      cycle: state.cycle.name,
      current_week_id: state.cycle.current_week_id,
      storage: {
        state_file: defaultStorage.stateFile,
        backups_count: backups.length
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Retrieve current operating state
 */
app.get('/api/state', async (req, res) => {
  try {
    const state = await defaultStorage.readState();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update entire state (atomic write with schema validation)
 */
app.post('/api/state', async (req, res) => {
  try {
    const newState = req.body;
    const writeResult = await defaultStorage.writeState(newState);
    res.json({ success: true, ...writeResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Update or append a specific week record
 */
app.post('/api/week', async (req, res) => {
  try {
    const weekData = req.body;
    if (!weekData || !weekData.id) {
      return res.status(400).json({ error: 'Week record must contain an "id".' });
    }

    const state = await defaultStorage.readState();
    const index = state.weeks.findIndex((w) => w.id === weekData.id);

    if (index >= 0) {
      state.weeks[index] = { ...state.weeks[index], ...weekData };
    } else {
      state.weeks.push(weekData);
    }

    await defaultStorage.writeState(state);
    res.json({ success: true, week: index >= 0 ? state.weeks[index] : weekData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update or append a website task
 */
app.post('/api/website-task', async (req, res) => {
  try {
    const taskData = req.body;
    if (!taskData || !taskData.id) {
      return res.status(400).json({ error: 'Task must contain an "id".' });
    }

    const state = await defaultStorage.readState();
    const index = state.website_tasks.findIndex((t) => t.id === taskData.id);

    if (index >= 0) {
      state.website_tasks[index] = { ...state.website_tasks[index], ...taskData };
    } else {
      state.website_tasks.push(taskData);
    }

    await defaultStorage.writeState(state);
    res.json({ success: true, task: index >= 0 ? state.website_tasks[index] : taskData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Save or update a fortnightly review
 */
app.post('/api/review', async (req, res) => {
  try {
    const reviewData = req.body;
    if (!reviewData || !reviewData.id) {
      return res.status(400).json({ error: 'Review must contain an "id".' });
    }

    const state = await defaultStorage.readState();
    const index = state.fortnightly_reviews.findIndex((r) => r.id === reviewData.id);

    if (index >= 0) {
      state.fortnightly_reviews[index] = { ...state.fortnightly_reviews[index], ...reviewData };
    } else {
      state.fortnightly_reviews.push(reviewData);
    }

    await defaultStorage.writeState(state);
    res.json({ success: true, review: index >= 0 ? state.fortnightly_reviews[index] : reviewData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Create a manual backup snapshot
 */
app.post('/api/backup', async (req, res) => {
  try {
    const tag = req.body?.tag || 'manual';
    const backupPath = await defaultStorage.createBackup(tag);
    res.json({ success: true, backupPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * List all backup files
 */
app.get('/api/backups', async (req, res) => {
  try {
    const backups = await defaultStorage.listBackups();
    res.json(backups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Export complete state JSON
 */
app.get('/api/export/json', async (req, res) => {
  try {
    const state = await defaultStorage.readState();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=pos_export_${Date.now()}.json`);
    res.send(JSON.stringify(state, null, 2));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Export formatted ChatGPT fortnightly review prompt
 */
app.get('/api/export/fortnightly-prompt/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const state = await defaultStorage.readState();
    const review = state.fortnightly_reviews.find((r) => r.id === id);

    if (!review) {
      return res.status(404).json({ error: `Review "${id}" not found.` });
    }

    const promptText = review.chatgpt_prompt_export || `# FORTNIGHTLY STRATEGIC REVIEW PROMPT (${review.period_start} to ${review.period_end})

## Review Details
- Attribution: ${review.q5_attribution_category || 'N/A'}
- What happened: ${review.q1_what_happened || 'N/A'}
- What diverged: ${review.q3_where_diverged || 'N/A'}
- What to stop: ${review.q6_what_to_stop || 'N/A'}
- What to continue: ${review.q7_what_to_continue || 'N/A'}
- What to change: ${review.q8_what_to_change || 'N/A'}
- What NOT to add: ${review.q9_what_to_not_add || 'N/A'}

## Request for ChatGPT Strategic Layer
Please audit this fortnightly progress against the approved six-month goals:
1. Challenge any rationalizations or hidden scope creep.
2. Flag any priority cannibalization (e.g. lower-tier work displacing Tier 1/2 foundation).
3. Recommend simplification for the next fortnight.
`;

    res.setHeader('Content-Type', 'text/markdown');
    res.send(promptText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[POS SERVER] Server listening on http://localhost:${PORT}`);
  console.log(`[POS SERVER] Storage file: ${defaultStorage.stateFile}`);
});
