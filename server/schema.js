/**
 * State Schema Validator
 * Validates the structure and data types of the Personal Operating System state container.
 */

export function validateState(state) {
  const errors = [];

  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return { valid: false, errors: ['State must be a valid JSON object.'] };
  }

  // Version check
  if (!state.version || typeof state.version !== 'string') {
    errors.push('State must specify a string "version".');
  }

  // Cycle check
  if (!state.cycle || typeof state.cycle !== 'object') {
    errors.push('State must include a valid "cycle" object.');
  } else {
    if (!state.cycle.id || typeof state.cycle.id !== 'string') {
      errors.push('Cycle must have an "id".');
    }
    if (!state.cycle.start_date || typeof state.cycle.start_date !== 'string') {
      errors.push('Cycle must specify a "start_date" (YYYY-MM-DD).');
    }
    if (!state.cycle.end_date || typeof state.cycle.end_date !== 'string') {
      errors.push('Cycle must specify an "end_date" (YYYY-MM-DD).');
    }
  }

  // Goals check
  if (!Array.isArray(state.goals)) {
    errors.push('State must include a "goals" array.');
  } else {
    state.goals.forEach((goal, idx) => {
      if (!goal.id || typeof goal.id !== 'string') {
        errors.push(`Goal at index ${idx} is missing an "id".`);
      }
      if (!goal.title || typeof goal.title !== 'string') {
        errors.push(`Goal at index ${idx} is missing a "title".`);
      }
      if (typeof goal.tier !== 'number') {
        errors.push(`Goal at index ${idx} must specify a numeric "tier".`);
      }
    });
  }

  // Website tasks check
  if (!Array.isArray(state.website_tasks)) {
    errors.push('State must include a "website_tasks" array.');
  } else {
    state.website_tasks.forEach((task, idx) => {
      if (!task.id || typeof task.id !== 'string') {
        errors.push(`Website task at index ${idx} is missing an "id".`);
      }
      if (!task.category || !['CORE', 'CONVERSION', 'EXPERIENCE', 'POLISH'].includes(task.category)) {
        errors.push(`Website task at index ${idx} has invalid category: ${task.category}`);
      }
    });
  }

  // Weeks check
  if (!Array.isArray(state.weeks)) {
    errors.push('State must include a "weeks" array.');
  } else {
    state.weeks.forEach((week, idx) => {
      if (!week.id || typeof week.id !== 'string') {
        errors.push(`Week at index ${idx} is missing an "id".`);
      }
      if (!Array.isArray(week.commitments)) {
        errors.push(`Week "${week.id}" must contain a "commitments" array.`);
      }
      if (!week.actuals || typeof week.actuals !== 'object') {
        errors.push(`Week "${week.id}" must contain an "actuals" object.`);
      }
    });
  }

  // Fortnightly reviews check
  if (!Array.isArray(state.fortnightly_reviews)) {
    errors.push('State must include a "fortnightly_reviews" array.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
