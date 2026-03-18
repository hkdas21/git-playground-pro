import SiteLayout from '@/components/layout/SiteLayout';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CheatEntry {
  command: string;
  description: string;
}

interface CheatCategory {
  title: string;
  emoji: string;
  entries: CheatEntry[];
}

const categories: CheatCategory[] = [
  {
    title: 'Getting Started',
    emoji: '🚀',
    entries: [
      { command: 'git init', description: 'Initialize a new Git repository' },
      { command: 'git status', description: 'Show the working tree status' },
      { command: 'git log', description: 'Show commit history' },
      { command: 'git log --oneline', description: 'Compact commit history (one line each)' },
    ],
  },
  {
    title: 'Staging & Committing',
    emoji: '📦',
    entries: [
      { command: 'git add <file>', description: 'Stage a specific file' },
      { command: 'git add .', description: 'Stage all changed files' },
      { command: 'git commit -m "msg"', description: 'Commit staged changes with a message' },
      { command: 'git diff', description: 'Show unstaged changes' },
      { command: 'git diff --staged', description: 'Show staged changes (about to commit)' },
    ],
  },
  {
    title: 'Branching',
    emoji: '🌿',
    entries: [
      { command: 'git branch', description: 'List all branches' },
      { command: 'git branch <name>', description: 'Create a new branch' },
      { command: 'git switch <branch>', description: 'Switch to an existing branch' },
      { command: 'git switch -c <branch>', description: 'Create and switch to a new branch' },
      { command: 'git merge <branch>', description: 'Merge a branch into the current one' },
    ],
  },
  {
    title: 'Undoing Changes',
    emoji: '↩️',
    entries: [
      { command: 'git restore <file>', description: 'Discard working directory changes' },
      { command: 'git restore --staged <file>', description: 'Unstage a file (keep changes)' },
      { command: 'git stash', description: 'Save uncommitted changes temporarily' },
      { command: 'git stash pop', description: 'Re-apply the most recent stash' },
    ],
  },
  {
    title: 'Inspecting',
    emoji: '🔍',
    entries: [
      { command: 'git log --oneline', description: 'One-line commit summaries' },
      { command: 'git diff', description: 'Compare working directory to index' },
      { command: 'git diff --staged', description: 'Compare index to last commit' },
      { command: 'git branch', description: 'See which branch you are on' },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-terminal"
      title="Copy command"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

export default function CheatSheet() {
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 print:py-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-mono mb-2">Git Cheat Sheet</h1>
            <p className="text-muted-foreground">Quick reference for the most common Git commands.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors print:hidden"
          >
            🖨️ Print
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:grid-cols-2 print:gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border p-4 print:break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-foreground font-mono mb-3 flex items-center gap-2">
                <span>{cat.emoji}</span> {cat.title}
              </h2>
              <div className="space-y-2">
                {cat.entries.map(entry => (
                  <div key={entry.command} className="group flex items-start gap-2">
                    <code className="text-xs font-mono text-terminal bg-terminal/10 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">
                      {entry.command}
                    </code>
                    <span className="text-xs text-muted-foreground flex-1">{entry.description}</span>
                    <CopyButton text={entry.command} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
