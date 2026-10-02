import { Briefcase, BarChart2 } from 'lucide-react';
import { WeekActuals } from '../types.ts';

interface FinancialTierProps {
  actuals: WeekActuals;
}

export function FinancialTier({ actuals }: FinancialTierProps) {
  const formatBoolean = (val: boolean | null) => {
    if (val === null) return <span className="text-slate-500 italic">Not recorded</span>;
    return val ? (
      <span className="text-emerald-400 font-medium">Completed</span>
    ) : (
      <span className="text-amber-400 font-medium">Omitted</span>
    );
  };

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
          Tier 3 — Financial Engine
        </span>
        <span className="text-xs text-slate-400">Corporate Job + Trading Discipline</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Corporate Job */}
        <div className="p-4 bg-surface border border-border rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/50">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-slate-100">Corporate Job Security</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Funding Mechanism</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-surface-elevated rounded border border-border/40 flex justify-between items-center">
                <span className="text-slate-400">Monthly Compensation</span>
                <span className="font-mono text-slate-100">Active Salary (~₹1.8L/mo)</span>
              </div>
              <div className="p-2.5 bg-surface-elevated rounded border border-border/40 flex justify-between items-center">
                <span className="text-slate-400">Independence Threshold</span>
                <span className="font-mono text-slate-200">₹5 Cr OR ₹2L/mo HIFY</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic mt-3">
            The job is a funding mechanism, not long-term identity. No additional corporate effort is encouraged.
          </p>
        </div>

        {/* Trading Discipline */}
        <div className="p-4 bg-surface border border-border rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/50">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-100">Trading Capital Growth</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Target: ~25% Annualized</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-surface-elevated rounded border border-border/40 flex justify-between items-center">
                <span className="text-slate-400">Capital Base</span>
                <span className="font-mono text-slate-100">~₹70 Lakhs</span>
              </div>
              <div className="p-2.5 bg-surface-elevated rounded border border-border/40 flex justify-between items-center">
                <span className="text-slate-400">Weekend Deliberate Review</span>
                <span>{formatBoolean(actuals.trading_review_completed)}</span>
              </div>
              <div className="p-2.5 bg-surface-elevated rounded border border-border/40 flex justify-between items-center">
                <span className="text-slate-400">Strategy Complexity Control</span>
                <span className="text-slate-300 font-mono">0 ad-hoc intraday trades</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic mt-3">
            No live terminal or ticker stream. Operates strictly in the weekend review container.
          </p>
        </div>
      </div>
    </section>
  );
}
