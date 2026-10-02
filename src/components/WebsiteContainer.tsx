import { Globe, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { WebsiteTask } from '../types.ts';

interface WebsiteContainerProps {
  tasks: WebsiteTask[];
}

export function WebsiteContainer({ tasks }: WebsiteContainerProps) {
  const freezeBlockingTasks = tasks.filter((t) => t.blocks_freeze);
  const polishTasks = tasks.filter((t) => !t.blocks_freeze);

  const completedBlocking = freezeBlockingTasks.filter((t) => t.status === 'DONE').length;
  const totalBlocking = freezeBlockingTasks.length;
  const isReadyToFreeze = totalBlocking > 0 && completedBlocking === totalBlocking;

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
          Finite Enabler • Not a Permanent Life Arena
        </span>
        <span className="text-xs text-slate-400">Website & Nexus Infrastructure</span>
      </div>

      <div className="p-5 bg-surface border border-border rounded-xl shadow-sm space-y-4">
        {/* Header & Freeze Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 gap-2">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              Finite Completion Container → Maintenance Freeze
            </h3>
          </div>

          {isReadyToFreeze ? (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
              <Lock className="w-3.5 h-3.5" />
              <span>READY TO FREEZE (MAINTENANCE MODE)</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-surface-elevated border border-border text-xs text-slate-300">
              <span className="font-mono text-cyan-400 font-bold">{completedBlocking} / {totalBlocking}</span>
              <span>Freeze-Blocking Tasks Complete</span>
            </div>
          )}
        </div>

        {/* The Non-Negotiable Rule Banner */}
        <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex items-center justify-between text-xs">
          <span className="text-cyan-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Mandatory Freeze Rule:
          </span>
          <span className="text-slate-200 font-medium">
            POLISH NEVER BLOCKS FREEZE • Core & Conversion dictate completion
          </span>
        </div>

        {/* Task Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Freeze-Blocking Work: Core & Conversion */}
          <div className="p-3 bg-surface-elevated rounded-lg border border-border/60 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-border/40">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Freeze-Blocking Tasks (Core + Conversion)
              </span>
              <span className="text-[10px] text-amber-400 font-medium">Dictates Freeze</span>
            </div>

            <div className="space-y-1.5">
              {freezeBlockingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded bg-background/50 border border-border/40"
                >
                  <div className="flex items-center space-x-2">
                    {task.status === 'DONE' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-500 shrink-0" />
                    )}
                    <span className={task.status === 'DONE' ? 'line-through text-slate-500' : 'text-slate-200'}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-slate-400 shrink-0">
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Blocking Polish & Secondary Experience */}
          <div className="p-3 bg-surface-elevated rounded-lg border border-border/60 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-border/40">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Polish & Secondary (Non-Blocking)
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Never Delays Freeze</span>
            </div>

            <div className="space-y-1.5">
              {polishTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded bg-background/50 border border-border/40"
                >
                  <div className="flex items-center space-x-2">
                    {task.status === 'DONE' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className={task.status === 'DONE' ? 'line-through text-slate-500' : 'text-slate-300'}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-slate-500 shrink-0">
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic text-center md:text-left">
          When Core & Conversion complete, status shifts to FROZEN / Maintenance Mode. No new features permitted without passing CHANGE_CONTROL.md.
        </p>
      </div>
    </section>
  );
}
