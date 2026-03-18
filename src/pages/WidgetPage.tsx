import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WidgetShell } from '@/components/widget/WidgetShell';
import { ArrowLeft, Play, BookOpen, Terminal as TerminalIcon } from 'lucide-react';
import { scenarios } from '@/lib/scenarios';

export default function WidgetPage() {
  const { widgetId } = useParams();
  const scenario = scenarios.find(s => s.id === widgetId);
  const [started, setStarted] = useState(false);

  if (!widgetId || !scenario) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-muted-foreground font-mono">
        Widget not found.
        <Link to="/play" className="text-terminal ml-2 hover:underline">← Back</Link>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-lg w-full bg-card border border-border rounded-xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                scenario.difficulty === 'beginner' ? 'bg-green-500/10 text-green-500' :
                scenario.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {scenario.difficulty}
              </span>
              {scenario.timebox && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  ~{Math.floor(scenario.timebox / 60)} min
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold font-mono text-foreground">{scenario.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{scenario.subtitle}</p>
          </div>

          {/* Concept Summary */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-terminal mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed">{scenario.conceptSummary}</p>
            </div>
          </div>

          {/* Goal */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-start gap-2">
              <span className="text-sm shrink-0">🎯</span>
              <p className="text-sm text-foreground font-mono leading-relaxed">{scenario.goalDescription}</p>
            </div>
          </div>

          {/* Commands Available */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <TerminalIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Available Commands</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {scenario.allowedCommands.map(cmd => (
                <span key={cmd} className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  git {cmd}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-5 flex items-center justify-between">
            <Link to="/play" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <button
              onClick={() => setStarted(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-terminal text-terminal-foreground font-mono text-sm font-bold hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4" /> Start Activity
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="px-4 py-2 border-b border-border flex items-center gap-3 shrink-0">
        <Link to="/play" className="text-muted-foreground hover:text-terminal transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-sm font-mono text-foreground">{scenario.title}</span>
        <span className="text-xs text-muted-foreground font-mono">— Playground</span>
      </div>
      <div className="flex-1 p-2 min-h-0">
        <WidgetShell scenarioId={widgetId} showTrainerControls mode="play" />
      </div>
    </div>
  );
}
