import { useEffect, useState } from 'react';
import { Database, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface ServerStatus {
  status: string;
  cycle: string;
  current_week_id: string;
  storage: {
    state_file: string;
    backups_count: number;
  };
}

export default function App() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface border border-border rounded-xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center space-x-3 border-b border-border pb-4">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-wide">Personal Operating System</h1>
            <p className="text-xs text-slate-400">Phase 1: Persistence & Storage Engine</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm py-2 px-3 bg-surface-elevated rounded-lg border border-border/50">
            <span className="text-slate-400">Server & Storage Status</span>
            {loading ? (
              <span className="text-xs text-slate-400 animate-pulse">Checking...</span>
            ) : error ? (
              <span className="flex items-center space-x-1 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Offline ({error})</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 text-xs text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Operational</span>
              </span>
            )}
          </div>

          {status && (
            <div className="space-y-2 text-xs text-slate-400 bg-surface-elevated p-3 rounded-lg border border-border/50">
              <div className="flex justify-between">
                <span>Cycle:</span>
                <span className="text-slate-200 font-mono">{status.cycle}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Week:</span>
                <span className="text-slate-200 font-mono">{status.current_week_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Backups Recorded:</span>
                <span className="text-slate-200 font-mono">{status.storage.backups_count}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start space-x-2.5 text-xs text-slate-400 bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            Phase 1 verification active. Application UI and Dashboard intentionally deferred until persistence layer verification is approved.
          </p>
        </div>
      </div>
    </div>
  );
}
