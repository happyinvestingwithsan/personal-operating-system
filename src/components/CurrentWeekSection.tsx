import { CheckSquare, Ban, CheckCircle2 } from 'lucide-react';
import { WeekRecord } from '../types.ts';

interface CurrentWeekSectionProps {
  activeWeek: WeekRecord;
}

export function CurrentWeekSection({ activeWeek }: CurrentWeekSectionProps) {
  const commitments = activeWeek.commitments || [];
  const notDoing = activeWeek.not_doing || [];

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
          Current Focus
        </span>
        <span className="text-xs text-slate-400">
          Cycle Week {activeWeek.cycle_week_number} • Bounded Commitments & Protection Barrier
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 3–5 Weekly Key Commitments */}
        <div className="p-4 bg-surface border border-border rounded-xl shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-100">Key Commitments (Max 3–5)</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {commitments.filter((c) => c.is_completed).length} / {commitments.length} Completed
            </span>
          </div>

          <div className="space-y-2">
            {commitments.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded bg-surface-elevated border border-border/60 text-xs flex items-start space-x-2.5"
              >
                {item.is_completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <span className="w-4 h-4 rounded border border-slate-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={item.is_completed ? 'line-through text-slate-500 font-medium' : 'text-slate-200 font-medium'}>
                      {item.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-slate-400">
                      {item.arena}
                    </span>
                  </div>
                  {item.target_outcome && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Target: {item.target_outcome}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 italic mt-3">
            Deliberately bounded. The goal is not to maximize task volume, but to execute what was committed.
          </p>
        </div>

        {/* The Explicit "NOT DOING" Barrier */}
        <div className="p-4 bg-surface border border-rose-500/30 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/50">
              <div className="flex items-center space-x-2">
                <Ban className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-semibold text-rose-300">The &ldquo;NOT DOING&rdquo; Barrier</h3>
              </div>
              <span className="text-xs text-rose-400 font-mono">Explicitly Forbidden</span>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Distractions, rabbit holes, and speculative work intentionally banned for this week:
            </p>

            <div className="space-y-2">
              {notDoing.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2 rounded bg-rose-500/5 border border-rose-500/20 text-xs text-slate-200"
                >
                  <Ban className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 italic mt-3">
            Protecting attention by explicitly declaring what will NOT be touched this week.
          </p>
        </div>
      </div>
    </section>
  );
}
