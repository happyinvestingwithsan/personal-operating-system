import { Shield } from 'lucide-react';
import { OperatingState, WeekRecord } from '../types.ts';

interface HeaderProps {
  state: OperatingState;
  activeWeek: WeekRecord;
}

export function Header({ state, activeWeek }: HeaderProps) {
  return (
    <header className="border-b border-border/80 pb-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Personal Operating System</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Life Alignment Flight Deck
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {state.cycle.name} • {state.cycle.start_date} to {state.cycle.end_date}
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs font-medium text-blue-400">
            Cycle Week {activeWeek.cycle_week_number}
            <span className="text-slate-400 ml-1.5 font-mono">({activeWeek.calendar_week_id})</span>
          </div>
          <div className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-xs text-slate-300 font-mono">
            {activeWeek.start_date} → {activeWeek.end_date}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-surface-elevated/60 border border-border/60 rounded-lg">
        <p className="text-xs text-slate-300 italic text-center md:text-left">
          &ldquo;Am I spending my limited time and energy in accordance with the life I said I wanted?&rdquo;
        </p>
      </div>
    </header>
  );
}
