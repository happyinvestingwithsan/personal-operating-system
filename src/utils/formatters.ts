/**
 * Presentation formatters for POS metrics.
 * Strictly respects null semantics:
 *   null = not recorded yet ("Not recorded")
 *   0 = explicitly measured zero ("0")
 */

export interface VacationDisplay {
  text: string;
  isRecorded: boolean;
}

export function formatVacationDisplay(val: number | null): VacationDisplay {
  if (val === null) {
    return { text: 'Not recorded', isRecorded: false };
  }
  return { text: `${val} / 24 Days`, isRecorded: true };
}

export interface ContentEffortDisplay {
  isRecorded: boolean;
  ytText: string;
  reelsText: string;
  displayText: string;
}

export function formatContentEffort(yt: number | null, reels: number | null): ContentEffortDisplay {
  if (yt === null && reels === null) {
    return {
      isRecorded: false,
      ytText: 'Not recorded',
      reelsText: 'Not recorded',
      displayText: 'Not recorded'
    };
  }

  const ytText = yt !== null ? `${yt} YT` : 'Not recorded';
  const reelsText = reels !== null ? `${reels} Reels` : 'Not recorded';

  return {
    isRecorded: true,
    ytText,
    reelsText,
    displayText: `${ytText} • ${reelsText}`
  };
}

export interface MetricDisplay {
  text: string;
  isRecorded: boolean;
}

export function formatGenericMetric(val: number | null, unit: string = ''): MetricDisplay {
  if (val === null) {
    return { text: 'Not recorded', isRecorded: false };
  }
  return { text: `${val}${unit}`, isRecorded: true };
}
