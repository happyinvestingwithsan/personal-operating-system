import { Target, Users, PlaySquare } from 'lucide-react';
import { WeekActuals } from '../types.ts';

interface ImpactTierProps {
  actuals: WeekActuals;
}

export function ImpactTier({ actuals }: ImpactTierProps) {
  const formatMetric = (val: number | null, unit: string = '') => {
    if (val === null) return <span className="text-slate-500 italic">Not recorded</span>;
    return <span className="font-mono text-slate-100">{val}{unit}</span>;
  };

  // Safe conversion rate calculation
  const conversionRate =
    actuals.hify_masterclass_viewers && actuals.hify_cohort_conversions !== null
      ? ((actuals.hify_cohort_conversions / actuals.hify_masterclass_viewers) * 100).toFixed(1) + '%'
      : null;

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          Tier 4 — Impact Engine
        </span>
        <span className="text-xs text-slate-400">HIFY Distribution & Community Growth Funnel</span>
      </div>

      <div className="p-5 bg-surface border border-border rounded-xl shadow-sm space-y-4">
        {/* Outcome vs Bottleneck vs Conversion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Primary Business Outcome */}
          <div className="p-3.5 bg-surface-elevated rounded-lg border border-amber-500/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Primary Business Outcome
              </span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-slate-100 mt-1">
              {formatMetric(actuals.hify_cohort_conversions, ' Enrolments')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Cohort Enrolments • Attention converted into committed participants.
            </p>
          </div>

          {/* Primary Growth Bottleneck */}
          <div className="p-3.5 bg-surface-elevated rounded-lg border border-blue-500/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Primary Growth Bottleneck
              </span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-slate-100 mt-1">
              {formatMetric(actuals.hify_masterclass_viewers, ' Viewers')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Qualified Masterclass Traffic • 6-Month Target: 3,000 cumulative viewers.
            </p>
          </div>

          {/* Conversion Metric */}
          <div className="p-3.5 bg-surface-elevated rounded-lg border border-border/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Conversion Efficiency
              </span>
              <span className="text-[10px] text-slate-500">Masterclass → Cohort</span>
            </div>
            <div className="text-xl font-bold text-slate-100 mt-1">
              {conversionRate ? (
                <span className="font-mono text-emerald-400">{conversionRate}</span>
              ) : (
                <span className="text-slate-500 text-sm italic">Not recorded</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Effectiveness of session in converting viewers to members.
            </p>
          </div>
        </div>

        {/* Downstream Health & Subordinate Effort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-border/40 text-xs">
          {/* Downstream Health */}
          <div className="p-3 bg-surface-elevated/50 rounded-lg border border-border/40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-medium">Downstream Community Scale</span>
              <span className="text-[10px] text-slate-400">Aspirational: 1,000 members</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Active Pathfinder Members:</span>
              <span>{formatMetric(actuals.hify_active_members)}</span>
            </div>
          </div>

          {/* Effort: Subordinate to Outcomes */}
          <div className="p-3 bg-surface-elevated/50 rounded-lg border border-border/40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <PlaySquare className="w-3.5 h-3.5 text-slate-400" />
                Distribution Effort (Subordinate)
              </span>
              <span className="text-[10px] text-slate-500">Controlled Inputs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Content Published This Week:</span>
              <span className="font-mono text-slate-200">
                {actuals.content_youtube_published !== null || actuals.content_reels_published !== null ? (
                  <>
                    {actuals.content_youtube_published ?? 0} YT • {actuals.content_reels_published ?? 0} Reels
                  </>
                ) : (
                  <span className="text-slate-500 italic">Not recorded</span>
                )}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic text-center md:text-left">
          Effort creates distribution, but only cohort enrolments represent true business progress. Vanity social metrics are kept subordinate.
        </p>
      </div>
    </section>
  );
}
