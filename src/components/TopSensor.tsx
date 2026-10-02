import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { DriftObservation, OperatingState } from '../types.ts';

interface TopSensorProps {
  state: OperatingState;
  driftObservations: DriftObservation[];
}

export function TopSensor({ state, driftObservations }: TopSensorProps) {
  const hasDrift = driftObservations.length > 0;
  const jobGoal = state.goals.find((g) => g.id === 'goal_financial_job');

  return (
    <section className="mb-8 p-5 bg-surface border border-border rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">
            Top Sensor • What Needs Attention?
          </h2>
        </div>
        <span className="text-xs text-slate-400">Deterministic Rule Engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Independence & Capital Transition Gateway */}
        <div className="p-4 bg-surface-elevated/80 border border-border/80 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              Career Transition Gateway
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Corporate Job Protected
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Corporate job continues until independence condition is satisfied:
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-background/50 rounded border border-border/40">
              <span className="text-slate-400">Condition A: Capital</span>
              <span className="font-mono text-slate-200">
                ₹70 Lakhs <span className="text-slate-500">→</span> ₹5.0 Crore
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-background/50 rounded border border-border/40">
              <span className="text-slate-400">Condition B: HIFY Recurring</span>
              <span className="font-mono text-slate-200">
                Baseline <span className="text-slate-500">→</span> ₹2.0 Lakh/month
              </span>
            </div>
          </div>

          {jobGoal && (
            <p className="text-[11px] text-slate-400 mt-2.5 italic">
              Job is a funding mechanism, not long-term identity. No additional job effort encouraged.
            </p>
          )}
        </div>

        {/* Priority & Drift Sensor */}
        <div className="p-4 bg-surface-elevated/80 border border-border/80 rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Attention & Priority Sensor
              </span>
              {hasDrift ? (
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                  {driftObservations.length} Divergence Detected
                </span>
              ) : (
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  Aligned
                </span>
              )}
            </div>

            {hasDrift ? (
              <div className="space-y-2.5 mt-3">
                {driftObservations.map((obs) => (
                  <div
                    key={obs.id}
                    className="flex items-start space-x-2.5 p-2.5 rounded bg-amber-500/5 border border-amber-500/20 text-xs"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-amber-300 block mb-0.5">
                        {obs.category.replace('_', ' ')}
                      </span>
                      <p className="text-slate-300">{obs.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5 p-3 rounded bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300 mt-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Foundation and priorities are within the current operating plan.</span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 italic">
            Reports factual divergence only. Software does not judge or assign arbitrary productivity scores.
          </p>
        </div>
      </div>
    </section>
  );
}
