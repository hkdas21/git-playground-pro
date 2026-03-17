import { useState, useRef, useEffect, KeyboardEvent } from 'react';

export interface TerminalEntry {
  type: 'command' | 'output' | 'info' | 'error' | 'success' | 'warning' | 'blocked' | 'system';
  content: string;
}

interface TerminalProps {
  history: TerminalEntry[];
  onCommand: (cmd: string) => void;
  allowedCommands: string[];
  disabled?: boolean;
}

function getEntryClass(type: string): string {
  switch (type) {
    case 'command': return 'text-foreground';
    case 'error': return 'text-destructive';
    case 'success': return 'text-terminal';
    case 'warning': return 'text-amber';
    case 'blocked': return 'text-amber';
    case 'system': return 'text-muted-foreground italic';
    default: return 'text-muted-foreground';
  }
}

export function Terminal({ history, onCommand, allowedCommands, disabled }: TerminalProps) {
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    setCmdHistory(prev => [input.trim(), ...prev]);
    setHistoryIdx(-1);
    onCommand(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  const quickCmds = allowedCommands.slice(0, 6).map(c => `git ${c}`);

  return (
    <div
      className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="px-3 py-2 border-b border-border flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-terminal/60" />
        </div>
        <span className="text-xs text-muted-foreground font-mono">Terminal</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-0.5 scrollbar-thin min-h-0">
        {history.map((entry, i) => (
          <div key={i} className={getEntryClass(entry.type)}>
            {entry.type === 'command' && <span className="text-terminal">$ </span>}
            <span className="whitespace-pre-wrap">{entry.content}</span>
          </div>
        ))}
      </div>

      <div className="px-3 py-1.5 border-t border-border flex flex-wrap gap-1 shrink-0">
        {quickCmds.map(cmd => (
          <button
            key={cmd}
            onClick={(e) => { e.stopPropagation(); setInput(cmd); inputRef.current?.focus(); }}
            className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>

      <div className="flex items-center px-3 py-2 border-t border-border shrink-0">
        <span className="text-terminal font-mono text-xs mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex-1 bg-transparent text-foreground font-mono text-xs outline-none placeholder:text-muted-foreground"
          placeholder={disabled ? 'Input frozen...' : 'Type a git command...'}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
