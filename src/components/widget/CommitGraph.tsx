import { GitCommit } from '@/lib/git-engine';

interface CommitGraphProps {
  commits: GitCommit[];
  branches: Record<string, string>;
  head: string;
}

export function CommitGraph({ commits, branches, head }: CommitGraphProps) {
  const sorted = [...commits].sort((a, b) => b.timestamp - a.timestamp);

  const branchLabels = new Map<string, string[]>();
  for (const [branch, hash] of Object.entries(branches)) {
    if (!branchLabels.has(hash)) branchLabels.set(hash, []);
    branchLabels.get(hash)!.push(branch);
  }

  return (
    <div className="h-full bg-card rounded-lg border border-border overflow-hidden flex flex-col">
      <div className="px-3 py-2 border-b border-border shrink-0">
        <span className="text-xs text-muted-foreground font-mono">Commit Graph</span>
      </div>
      <div className="overflow-y-auto p-3 space-y-0 scrollbar-thin flex-1 min-h-0">
        {sorted.length === 0 ? (
          <p className="text-muted-foreground text-xs italic">No commits yet</p>
        ) : (
          sorted.map((commit, i) => {
            const labels = branchLabels.get(commit.hash) || [];
            const isHead = labels.includes(head);
            return (
              <div key={commit.hash} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${
                      isHead
                        ? 'bg-terminal border-terminal shadow-[0_0_6px_hsl(var(--terminal)/0.5)]'
                        : 'bg-primary/60 border-primary/40'
                    }`}
                  />
                  {i < sorted.length - 1 && <div className="w-0.5 h-6 bg-border" />}
                </div>
                <div className="pb-3 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <code className="text-[10px] text-terminal">{commit.hash}</code>
                    {labels.map(l => (
                      <span
                        key={l}
                        className={`text-[10px] px-1 py-0.5 rounded font-mono leading-none ${
                          l === head
                            ? 'bg-terminal/20 text-terminal border border-terminal/30'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {l === head ? `HEAD → ${l}` : l}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-foreground/80 mt-0.5 font-mono truncate">
                    {commit.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
