import { GitStatus } from '@/lib/git-engine';
import { ArrowRight } from 'lucide-react';

interface PipelineProps {
  status: GitStatus;
  workingFiles: string[];
  committedFiles: string[];
}

function PipelineColumn({ title, files, variant }: {
  title: string;
  files: string[];
  variant: 'working' | 'staging' | 'repo';
}) {
  const styles = {
    working: { border: 'border-amber/30', bg: 'bg-amber/5', dot: 'bg-amber' },
    staging: { border: 'border-terminal/30', bg: 'bg-terminal/5', dot: 'bg-terminal' },
    repo: { border: 'border-primary/30', bg: 'bg-primary/5', dot: 'bg-primary' },
  };
  const s = styles[variant];

  return (
    <div className={`rounded-lg border p-2 ${s.border} ${s.bg} min-h-[48px]`}>
      <h4 className="text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">{title}</h4>
      <div className="space-y-0.5">
        {files.length === 0 ? (
          <p className="text-[10px] text-muted-foreground/60 italic">
            {variant === 'repo' ? (variant === 'repo' ? 'No commits' : '') : 'Clean'}
          </p>
        ) : (
          files.map(f => (
            <div key={f} className="flex items-center gap-1 text-[11px] font-mono text-foreground/80">
              <div className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
              <span className="truncate">{f}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function Pipeline({ status, workingFiles, committedFiles }: PipelineProps) {
  const workingChanges = [...status.modified, ...status.untracked, ...status.deleted];
  const stagedChanges = status.staged;

  return (
    <div className="bg-card rounded-lg border border-border p-2">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-1.5 items-start">
        <PipelineColumn title="Working Directory" files={workingChanges.length ? workingChanges : workingFiles} variant="working" />
        <ArrowRight className="text-muted-foreground/40 mt-6 w-4 h-4 shrink-0" />
        <PipelineColumn title="Staging Area" files={stagedChanges} variant="staging" />
        <ArrowRight className="text-muted-foreground/40 mt-6 w-4 h-4 shrink-0" />
        <PipelineColumn title="Repository" files={committedFiles} variant="repo" />
      </div>
    </div>
  );
}
