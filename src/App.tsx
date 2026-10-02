import { useEffect, useState, useCallback } from 'react';
import { OperatingState, WeekRecord } from './types.ts';
import { evaluateDrift } from './utils/drift.ts';
import { Header } from './components/Header.tsx';
import { TopSensor } from './components/TopSensor.tsx';
import { FoundationTier } from './components/FoundationTier.tsx';
import { ProtectionTier } from './components/ProtectionTier.tsx';
import { FinancialTier } from './components/FinancialTier.tsx';
import { ImpactTier } from './components/ImpactTier.tsx';
import { WebsiteContainer } from './components/WebsiteContainer.tsx';
import { CurrentWeekSection } from './components/CurrentWeekSection.tsx';
import { LoadingState } from './components/LoadingState.tsx';
import { ErrorState } from './components/ErrorState.tsx';

export default function App() {
  const [state, setState] = useState<OperatingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/state');
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const data: OperatingState = await res.json();
      setState(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown network failure');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !state) {
    return <ErrorState error={error || 'State not available'} onRetry={fetchState} />;
  }

  // Active operating week
  const activeWeek: WeekRecord =
    state.weeks.find((w) => w.id === state.cycle.current_week_id) ||
    state.weeks[state.weeks.length - 1];

  // Deterministic rule-based drift detection
  const driftObservations = evaluateDrift(state);

  return (
    <div className="min-h-screen bg-background text-slate-100 antialiased selection:bg-blue-500/20">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flight Deck Header */}
        <Header state={state} activeWeek={activeWeek} />

        {/* Top Sensor: Gateway & Attention Drift */}
        <TopSensor state={state} driftObservations={driftObservations} />

        {/* Tier 1: Foundation (Health + Spiritual) */}
        <FoundationTier goals={state.goals} actuals={activeWeek.actuals} />

        {/* Tier 2: Protection (Family Container) */}
        <ProtectionTier actuals={activeWeek.actuals} />

        {/* Tier 3: Financial Engine (Corporate Job + Trading) */}
        <FinancialTier actuals={activeWeek.actuals} />

        {/* Tier 4: Impact Engine (HIFY Funnel) */}
        <ImpactTier actuals={activeWeek.actuals} />

        {/* Finite Enabler: Website Container */}
        <WebsiteContainer tasks={state.website_tasks} />

        {/* Current Week: Commitments & NOT DOING Barrier */}
        <CurrentWeekSection activeWeek={activeWeek} />

        {/* Executive Footer */}
        <footer className="pt-8 pb-12 border-t border-border/40 text-center text-xs text-slate-500 space-y-1">
          <p>Personal Operating System • Life Alignment Flight Deck • October 2026 – March 2027</p>
          <p className="italic text-slate-600">
            Build less. Protect more. Measure only what helps the human make better decisions.
          </p>
        </footer>
      </main>
    </div>
  );
}
