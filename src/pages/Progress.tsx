import { useState } from 'react';
import { Trophy, Target, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { scenarios } from '@/lib/scenarios';
import { getAllCompletions, clearProgress, CompletionRecord } from '@/lib/progress';

const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

export default function Progress() {
  const [completions, setCompletions] = useState<Record<string, CompletionRecord>>(getAllCompletions);
  const completedCount = Object.keys(completions).length;

  const handleClear = () => {
    clearProgress();
    setCompletions({});
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground font-mono">Progress</h1>
          {completedCount > 0 && (
            <button
              onClick={handleClear}
              className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 font-mono flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Reset All
            </button>
          )}
        </div>

        <p className="text-muted-foreground mb-4">
          Track your learning journey. Complete widgets to earn badges!
        </p>

        {/* Summary bar */}
        <div className="mb-8 p-4 rounded-xl bg-card border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-terminal/10 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-terminal" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground font-mono">
              {completedCount} / {scenarios.length} completed
            </p>
            <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-terminal transition-all duration-500"
                style={{ width: `${(completedCount / scenarios.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map(s => {
            const record = completions[s.id];
            const done = !!record;
            return (
              <div
                key={s.id}
                className={`p-5 rounded-xl border transition-colors ${
                  done
                    ? 'bg-terminal/5 border-terminal/30'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    done ? 'bg-terminal/20' : 'bg-muted'
                  }`}>
                    {done ? (
                      <CheckCircle2 className="w-5 h-5 text-terminal" />
                    ) : (
                      <Trophy className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono">{s.difficulty}</p>
                  </div>
                </div>
                {done ? (
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1 text-terminal">
                      <Clock className="w-3 h-3" /> Best: {formatTime(record.bestTime)}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(record.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="w-3 h-3" /> Not yet completed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}
