import { Heart, Moon } from 'lucide-react';
import { GoalRecord, WeekActuals } from '../types.ts';

interface FoundationTierProps {
  goals: GoalRecord[];
  actuals: WeekActuals;
}

export function FoundationTier({ goals, actuals }: FoundationTierProps) {
  const healthGoal = goals.find((g) => g.id === 'goal_health_strength');
  const spiritualGoal = goals.find((g) => g.id === 'goal_spiritual_kriya');

  const formatMetric = (val: number | null, unit: string = '') => {
    if (val === null) return <span className="text-slate-500 italic">Not recorded</span>;
    return <span className="font-mono text-slate-100">{val}{unit}</span>;
  };

  const formatTextMetric = (val: string | null) => {
    if (!val || val.trim() === '') return <span className="text-slate-500 italic">Not recorded</span>;
    return <span className="text-slate-200">{val}</span>;
  };

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
          Tier 1 — Foundation
        </span>
        <span className="text-xs text-slate-400">Protected First • Health + Spiritual</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Health & Strength */}
        <div className="p-4 bg-surface border border-border rounded-xl shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-semibold text-slate-100">Health & Physical Vitality</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Directional: ~70–74 kg</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="p-2.5 bg-surface-elevated rounded border border-border/40">
              <span className="text-slate-400 block mb-1">Strength Workouts</span>
              <div className="text-sm">{formatMetric(actuals.health_workouts_completed, ' sessions')}</div>
              <span className="text-[10px] text-slate-500">Target: 3–4 / week</span>
            </div>

            <div className="p-2.5 bg-surface-elevated rounded border border-border/40">
              <span className="text-slate-400 block mb-1">Body Weight</span>
              <div className="text-sm">
                {actuals.health_weight_kg !== null ? (
                  <span className="font-mono text-slate-100">{actuals.health_weight_kg} kg</span>
                ) : (
                  <span className="text-slate-500 italic">{healthGoal?.current_value || 'Not yet recorded'}</span>
                )}
              </div>
              <span className="text-[10px] text-slate-500">Baseline: ~60 kg</span>
            </div>

            <div className="p-2.5 bg-surface-elevated rounded border border-border/40">
              <span className="text-slate-400 block mb-1">Sleep & Rest</span>
              <div className="text-xs">{formatTextMetric(actuals.health_sleep_notes)}</div>
            </div>

            <div className="p-2.5 bg-surface-elevated rounded border border-border/40">
              <span className="text-slate-400 block mb-1">Energy / Recovery</span>
              <div className="text-xs">{formatTextMetric(actuals.health_energy_level)}</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Neutral personal inputs. Software makes no medical diagnoses or declaring arbitrary weight targets as healthy.
          </p>
        </div>

        {/* Spiritual Practice */}
        <div className="p-4 bg-surface border border-border rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/50">
              <div className="flex items-center space-x-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-slate-100">Spiritual Foundation</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Daily Morning Routine</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-elevated rounded border border-border/40 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block mb-0.5">Daily Kriya Practice</span>
                  <span className="text-[11px] text-slate-500">{spiritualGoal?.target_value}</span>
                </div>
                <div className="text-sm">
                  {formatMetric(actuals.health_kriya_days, ' / 7 days')}
                </div>
              </div>

              <div className="p-2.5 bg-surface-elevated/60 rounded border border-border/40 text-[11px] text-slate-300">
                <span className="text-indigo-400 font-medium block mb-0.5">Protection Anchor:</span>
                Morning inner alignment is protected before any technical work, emails, or marketing begins.
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic mt-3">
            Baseline: Establishing daily consistency. Inner calm precedes all outward execution.
          </p>
        </div>
      </div>
    </section>
  );
}
