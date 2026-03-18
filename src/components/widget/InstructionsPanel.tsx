import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import type { Scenario } from '@/lib/scenarios';

interface InstructionsPanelProps {
  scenario: Scenario;
}

export function InstructionsPanel({ scenario }: InstructionsPanelProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shrink-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-2 py-1.5 border-b border-border flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider flex items-center gap-1">
          <BookOpen className="w-3 h-3" /> Instructions
        </span>
        {expanded ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="p-2 space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin">
          {/* Concept summary */}
          <p className="text-[11px] text-foreground/70 leading-relaxed">{scenario.conceptSummary}</p>

          {/* Steps */}
          <div className="space-y-1.5">
            {scenario.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[10px] font-mono text-terminal font-bold mt-px shrink-0 w-4 text-right">{i + 1}.</span>
                <span className="text-[11px] text-foreground/80 leading-relaxed font-mono">{step}</span>
              </div>
            ))}
          </div>

          {/* Commands reference */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Terminal className="w-2.5 h-2.5 text-muted-foreground" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Commands</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {scenario.allowedCommands.map(cmd => (
                <span key={cmd} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {cmd}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
