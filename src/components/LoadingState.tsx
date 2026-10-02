import { Shield } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-6 bg-surface border border-border rounded-xl text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-500/10 rounded-full animate-pulse text-blue-400">
            <Shield className="w-8 h-8" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-slate-100">Accessing Operating System</h2>
          <p className="text-xs text-slate-400">Reading local state container from data/pos_state.json...</p>
        </div>
      </div>
    </div>
  );
}
