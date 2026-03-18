import { useState, useRef, useCallback, useEffect } from 'react';
import { markCompleted } from '@/lib/progress';
import { GitEngine } from '@/lib/git-engine';
import { scenarios, checkSuccess } from '@/lib/scenarios';
import { Terminal, TerminalEntry } from './Terminal';
import { CommitGraph } from './CommitGraph';
import { Pipeline } from './Pipeline';
import { RotateCcw, Lightbulb, Pause, Play, Clock, Trophy, FilePlus } from 'lucide-react';

interface WidgetShellProps {
  scenarioId: string;
  showTrainerControls?: boolean;
}

export function WidgetShell({ scenarioId, showTrainerControls = false }: WidgetShellProps) {
  const engineRef = useRef<GitEngine | null>(null);
  const [tick, setTick] = useState(0);
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showDebrief, setShowDebrief] = useState(false);
  const [timer, setTimer] = useState(0);

  const scenario = scenarios.find(s => s.id === scenarioId);

  const initScenario = useCallback(() => {
    const s = scenarios.find(s => s.id === scenarioId);
    if (!s) return;
    const engine = new GitEngine(s.allowedCommands);
    for (const [path, content] of Object.entries(s.seedFiles)) {
      engine.writeFile(path, content);
    }
    engine.runPreScript(s.preScript);
    engineRef.current = engine;

    const fileList = engine.listFiles();
    setSelectedFile(fileList[0] || null);
    setFileContent(fileList[0] ? engine.readFile(fileList[0]) || '' : '');
    setHistory([{ type: 'system', content: `🎯 ${s.goalDescription}` }]);
    setGoalAchieved(false);
    setHintIndex(0);
    setShowDebrief(false);
    setTimer(0);
    setFrozen(false);
    setTick(t => t + 1);
  }, [scenarioId]);

  useEffect(() => { initScenario(); }, [initScenario]);

  useEffect(() => {
    if (goalAchieved || frozen) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [goalAchieved, frozen]);

  // Derive state from engine
  const engine = engineRef.current;
  const status = engine?.getStatus() || { branch: 'main', untracked: [], modified: [], staged: [], deleted: [], conflicts: [] };
  const commits = engine?.getCommits() || [];
  const files = engine?.listFiles() || [];
  const branches = engine?.getBranches() || {};
  const head = engine?.getHead() || 'main';
  const headHash = branches[head];
  const headCommit = commits.find(c => c.hash === headHash);
  const committedFiles = headCommit ? Object.keys(headCommit.snapshot) : [];

  // Suppress unused variable warning
  void tick;

  useEffect(() => {
    if (selectedFile && engine) {
      setFileContent(engine.readFile(selectedFile) || '');
    }
  }, [tick, selectedFile]);

  const handleCommand = useCallback((cmd: string) => {
    const eng = engineRef.current;
    if (!eng || frozen) return;
    setHistory(h => [...h, { type: 'command', content: cmd }]);
    const result = eng.executeCommand(cmd);
    setHistory(h => [...h, { type: result.type as TerminalEntry['type'], content: result.output }]);
    setTick(t => t + 1);

    const s = scenarios.find(s => s.id === scenarioId);
    if (s) {
      const success = checkSuccess(eng, s.successChecks);
      if (success && !goalAchieved) {
        setGoalAchieved(true);
        markCompleted(scenarioId, timer);
        setHistory(h => [...h, { type: 'success', content: '🎉 Goal achieved! Great job!' }]);
        setShowDebrief(true);
      }
    }
  }, [frozen, scenarioId, goalAchieved]);

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    setFileContent(engineRef.current?.readFile(path) || '');
  };

  const handleFileSave = () => {
    if (!selectedFile || !engineRef.current) return;
    engineRef.current.writeFile(selectedFile, fileContent);
    setTick(t => t + 1);
    setHistory(h => [...h, { type: 'system', content: `📝 Saved ${selectedFile}` }]);
  };

  const showHint = () => {
    if (!scenario || hintIndex >= scenario.hints.length) return;
    setHistory(h => [...h, { type: 'system', content: `💡 Hint: ${scenario.hints[hintIndex].text}` }]);
    setHintIndex(i => i + 1);
  };

  if (!scenario) {
    return <div className="p-4 text-destructive font-mono">Scenario not found: {scenarioId}</div>;
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-full bg-background rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-border flex items-center justify-between flex-wrap gap-2 shrink-0">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-foreground font-mono truncate">{scenario.title}</h3>
          <p className="text-[10px] text-muted-foreground truncate">{scenario.subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {goalAchieved && (
            <span className="flex items-center gap-1 text-xs text-terminal font-mono">
              <Trophy className="w-3.5 h-3.5" /> Done!
            </span>
          )}
          <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formatTime(timer)}
          </span>
          <button
            onClick={showHint}
            disabled={hintIndex >= scenario.hints.length}
            className="text-[10px] px-1.5 py-1 rounded bg-muted text-muted-foreground hover:bg-accent disabled:opacity-30 flex items-center gap-1 font-mono"
          >
            <Lightbulb className="w-3 h-3" /> Hint
          </button>
          {showTrainerControls && (
            <button
              onClick={() => setFrozen(!frozen)}
              className="text-[10px] px-1.5 py-1 rounded bg-muted text-muted-foreground hover:bg-accent flex items-center gap-1 font-mono"
            >
              {frozen ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {frozen ? 'Resume' : 'Freeze'}
            </button>
          )}
          <button
            onClick={initScenario}
            className="text-[10px] px-1.5 py-1 rounded bg-muted text-muted-foreground hover:bg-accent flex items-center gap-1 font-mono"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Pipeline */}
      <div className="px-2 py-1.5 shrink-0">
        <Pipeline status={status} workingFiles={files} committedFiles={committedFiles} />
      </div>

      {/* Main area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[180px_1fr_240px] gap-1.5 p-1.5 min-h-0">
        {/* File Explorer + Editor */}
        <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
          <div className="bg-card rounded-lg border border-border overflow-hidden shrink-0">
            <div className="px-2 py-1.5 border-b border-border flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Files</span>
              <button
                onClick={() => {
                  const name = prompt('File name (e.g. .gitignore):');
                  if (name && engineRef.current) {
                    engineRef.current.writeFile(name, '');
                    setSelectedFile(name);
                    setFileContent('');
                    setTick(t => t + 1);
                  }
                }}
                className="text-muted-foreground hover:text-terminal transition-colors"
                title="New file"
              >
                <FilePlus className="w-3 h-3" />
              </button>
            </div>
            <div className="p-1 space-y-0.5 max-h-[120px] overflow-y-auto">
              {files.map(f => (
                <button
                  key={f}
                  onClick={() => handleFileSelect(f)}
                  className={`w-full text-left text-[11px] font-mono px-2 py-1 rounded transition-colors truncate ${
                    selectedFile === f ? 'bg-terminal/10 text-terminal' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  📄 {f}
                </button>
              ))}
            </div>
          </div>
          {selectedFile && (
            <div className="flex-1 flex flex-col bg-card rounded-lg border border-border overflow-hidden min-h-0">
              <div className="px-2 py-1.5 border-b border-border flex items-center justify-between shrink-0">
                <span className="text-[10px] text-muted-foreground font-mono truncate">{selectedFile}</span>
                <button
                  onClick={handleFileSave}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-terminal/20 text-terminal hover:bg-terminal/30 font-mono shrink-0"
                >
                  Save
                </button>
              </div>
              <textarea
                value={fileContent}
                onChange={e => setFileContent(e.target.value)}
                className="flex-1 p-2 bg-transparent text-foreground font-mono text-xs resize-none outline-none min-h-[100px] scrollbar-thin"
                spellCheck={false}
              />
            </div>
          )}
        </div>

        {/* Terminal */}
        <div className="min-h-0">
          <Terminal
            history={history}
            onCommand={handleCommand}
            allowedCommands={scenario.allowedCommands}
            disabled={frozen}
          />
        </div>

        {/* Commit Graph */}
        <div className="min-h-0 hidden lg:block">
          <CommitGraph commits={commits} branches={branches} head={head} />
        </div>
      </div>

      {/* Debrief */}
      {showDebrief && (
        <div className="px-3 py-3 border-t border-terminal/20 bg-terminal/5 shrink-0">
          <h4 className="text-xs font-bold text-terminal mb-1 font-mono">🎓 Debrief</h4>
          <p className="text-xs text-foreground/80 whitespace-pre-line leading-relaxed">{scenario.debrief}</p>
        </div>
      )}
    </div>
  );
}
