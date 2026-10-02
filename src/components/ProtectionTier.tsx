import { Users, Calendar } from 'lucide-react';
import { WeekActuals } from '../types.ts';

interface ProtectionTierProps {
  actuals: WeekActuals;
}

export function ProtectionTier({ actuals }: ProtectionTierProps) {
  const formatBoolean = (val: boolean | null) => {
    if (val === null) return <span className="text-slate-500 italic">Not recorded</span>;
    return val ? (
      <span className="text-emerald-400 font-medium">Honored</span>
    ) : (
      <span className="text-amber-400 font-medium">Displaced</span>
    );
  };

  const formatDays = (val: number | null) => {
    if (val === null) return <span className="text-slate-500 italic">0 logged</span>;
    return <span className="font-mono text-slate-100">{val} days</span>;
  };

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
          Tier 2 — Protection
        </span>
        <span className="text-xs text-slate-400">Family Container • Presence Protected</span>
      </div>

      <div className="p-4 bg-surface border border-border rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-surface-elevated rounded-lg border border-border/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Protected Weekend Half-Day Block
              </span>
              <span className="text-xs font-medium">
                {formatBoolean(actuals.family_half_day_protected)}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Zero coding or HIFY encroachment during this weekly container.
            </p>
          </div>

          <div className="p-3 bg-surface-elevated rounded-lg border border-border/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                Dedicated Travel & Vacation Pacing
              </span>
              <span className="text-xs font-mono text-slate-200">
                {formatDays(actuals.family_vacation_days_logged)} / 24 Days
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pacing: ~1 major dedicated family experience every 2 months across the 6-month cycle.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3 italic text-center md:text-left">
          Sacred boundary. Family presence is the emotional center; never sacrificed for website polish.
        </p>
      </div>
    </section>
  );
}
