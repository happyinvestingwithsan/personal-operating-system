import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-6 bg-surface border border-rose-500/30 rounded-xl text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-rose-500/10 rounded-full text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-rose-300">Operating Data Unavailable</h2>
          <p className="text-xs text-slate-400">
            Could not retrieve operating state from the local Node server. Ensure the server is running on port 3001.
          </p>
          <p className="text-xs font-mono text-slate-500 mt-2">{error}</p>
        </div>
        <div className="pt-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-surface-elevated hover:bg-border text-slate-200 text-xs font-medium rounded-lg border border-border transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    </div>
  );
}
