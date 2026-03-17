import { GitEngine, PreScriptStep } from './git-engine';

export interface SuccessCheck {
  type: 'commitCount' | 'fileContent' | 'branchExists' | 'currentBranch' | 'clean';
  min?: number;
  path?: string;
  contains?: string;
  name?: string;
  value?: boolean;
}

export interface Hint {
  text: string;
  delay?: number;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timebox?: number;
  seedFiles: Record<string, string>;
  preScript: PreScriptStep[];
  allowedCommands: string[];
  successChecks: SuccessCheck[];
  hints: Hint[];
  debrief: string;
  goalDescription: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'factory-line',
    title: 'Factory Line',
    subtitle: 'Working → Staging → Repository',
    description: 'Learn the 3 places in Git by moving a file through the pipeline.',
    difficulty: 'beginner',
    timebox: 300,
    seedFiles: { 'README.md': '# My Project\nWelcome to the project!\n', 'app.txt': 'version=1\n' },
    preScript: ['git init', 'git add .', 'git commit -m "chore: initial commit"'],
    allowedCommands: ['status', 'diff', 'add', 'commit', 'log'],
    goalDescription: 'Edit app.txt to version=2, then add and commit with a descriptive message.',
    successChecks: [
      { type: 'fileContent', path: 'app.txt', contains: 'version=2' },
      { type: 'commitCount', min: 2 },
    ],
    hints: [
      { text: 'Click on app.txt and change version=1 to version=2, then click Save', delay: 10 },
      { text: 'Run "git status" to see your changes', delay: 30 },
      { text: 'Run "git add ." to stage your changes', delay: 60 },
      { text: 'Run: git commit -m "feat: update to version 2"', delay: 90 },
    ],
    debrief: '🎉 You moved a change through all 3 places!\n\n1. Working Directory — where you edit files\n2. Staging Area — where you prepare changes\n3. Repository — where commits are stored permanently\n\nThis edit → add → commit flow is the fundamental Git workflow.',
  },
  {
    id: 'commit-message-arcade',
    title: 'Commit Message Arcade',
    subtitle: 'Write clear, descriptive commit messages',
    description: 'Practice writing good commit messages. Vague messages are rejected!',
    difficulty: 'beginner',
    timebox: 240,
    seedFiles: { 'notes.txt': 'Meeting Notes\n- Review Q3 roadmap\n- Assign tasks\n' },
    preScript: ['git init', 'git add .', 'git commit -m "docs: initial meeting notes"'],
    allowedCommands: ['status', 'diff', 'add', 'commit'],
    goalDescription: 'Add a new action item to notes.txt and commit with a clear, specific message.',
    successChecks: [
      { type: 'commitCount', min: 2 },
      { type: 'fileContent', path: 'notes.txt', contains: '- ' },
    ],
    hints: [
      { text: 'Click notes.txt and add a new line like "- Schedule follow-up meeting"', delay: 10 },
      { text: 'Stage with "git add ." then commit', delay: 30 },
      { text: 'Use a specific message like: git commit -m "docs: add follow-up action item"', delay: 60 },
    ],
    debrief: '📝 Good commit messages:\n• Start with a type (feat, fix, docs, chore)\n• Use imperative mood ("add" not "added")\n• Be specific — "fix login button color" not "fix stuff"\n• Keep subject under 50 characters',
  },
  {
    id: 'branch-maze',
    title: 'Branch Maze',
    subtitle: 'Create branches and merge them',
    description: 'Navigate the branch maze by creating a feature branch, making changes, and merging.',
    difficulty: 'intermediate',
    timebox: 360,
    seedFiles: { 'story.txt': 'Once upon a time, there was a developer.\n' },
    preScript: ['git init', 'git add .', 'git commit -m "feat: start story"'],
    allowedCommands: ['status', 'branch', 'switch', 'add', 'commit', 'merge', 'log'],
    goalDescription: 'Create branch "feature/ending", add an ending to story.txt, commit, switch to main, and merge.',
    successChecks: [
      { type: 'branchExists', name: 'feature/ending' },
      { type: 'commitCount', min: 3 },
      { type: 'currentBranch', name: 'main' },
    ],
    hints: [
      { text: 'Create and switch to a new branch: git switch -c feature/ending', delay: 10 },
      { text: 'Edit story.txt to add an ending, then save', delay: 30 },
      { text: 'Stage and commit: git add . && git commit -m "feat: add story ending"', delay: 50 },
      { text: 'Switch back: git switch main, then: git merge feature/ending', delay: 80 },
    ],
    debrief: '🌿 Branches let you work on features in isolation!\n\n1. git switch -c <name> — create and switch\n2. Make commits on the branch\n3. git switch main — go back\n4. git merge <branch> — bring changes in\n\nBranches are cheap in Git — use them freely!',
  },
  {
    id: 'merge-conflict',
    title: 'Merge Conflict Escape Room',
    subtitle: "Don't panic — resolve the conflict",
    description: 'Two branches edited the same line. Learn to resolve the conflict calmly.',
    difficulty: 'intermediate',
    timebox: 300,
    seedFiles: { 'greeting.txt': 'Hello\n' },
    preScript: [
      'git init', 'git add .', 'git commit -m "initial greeting"',
      'git switch -c feature/friendly',
      { write: 'greeting.txt', content: 'Hello World! 🌍\n' },
      'git add .', 'git commit -m "feat: make greeting friendly"',
      'git switch main',
      { write: 'greeting.txt', content: 'Hello Universe! 🌌\n' },
      'git add .', 'git commit -m "feat: make greeting cosmic"',
    ],
    allowedCommands: ['status', 'merge', 'add', 'commit', 'diff'],
    goalDescription: 'Merge feature/friendly into main, resolve the conflict, and commit.',
    successChecks: [
      { type: 'commitCount', min: 4 },
      { type: 'currentBranch', name: 'main' },
    ],
    hints: [
      { text: 'Run: git merge feature/friendly — you\'ll see a conflict!', delay: 5 },
      { text: 'Click greeting.txt — you\'ll see conflict markers (<<<, ===, >>>)', delay: 20 },
      { text: 'Edit the file to keep the greeting you want (remove the markers)', delay: 40 },
      { text: 'Save, then: git add greeting.txt && git commit -m "fix: resolve greeting conflict"', delay: 60 },
    ],
    debrief: '🔧 Conflict resolution steps:\n\n1. git merge <branch> — Git marks conflicts\n2. Open conflicted files — look for <<<<<<< markers\n3. Edit to keep what you want, remove markers\n4. git add <file> — mark as resolved\n5. git commit — finalize the merge\n\nConflicts are normal! They just mean two people changed the same thing.',
  },
  {
    id: 'undo-wizard',
    title: 'Undo Wizard',
    subtitle: 'Safely undo mistakes in Git',
    description: 'Learn to discard changes and unstage files without losing work.',
    difficulty: 'beginner',
    timebox: 240,
    seedFiles: { 'config.txt': 'debug=false\nport=3000\n' },
    preScript: ['git init', 'git add .', 'git commit -m "chore: initial config"'],
    allowedCommands: ['status', 'diff', 'add', 'restore', 'commit'],
    goalDescription: 'Practice: 1) Edit config.txt, 2) Stage it, 3) Unstage it with restore --staged, 4) Discard changes with restore.',
    successChecks: [{ type: 'clean', value: true }],
    hints: [
      { text: 'First, edit config.txt (change debug to true)', delay: 5 },
      { text: 'Stage it: git add config.txt', delay: 20 },
      { text: 'Unstage it: git restore --staged config.txt', delay: 35 },
      { text: 'Discard changes: git restore config.txt', delay: 50 },
    ],
    debrief: '✨ Safe undo commands:\n\n• git restore <file> — discard working directory changes\n• git restore --staged <file> — unstage (keep the changes in working dir)\n\n⚠️ Avoid git reset --hard — it\'s destructive!\nThese restore commands are the safe way to undo in Git.',
  },
];

export function checkSuccess(engine: GitEngine, checks: SuccessCheck[]): boolean {
  for (const check of checks) {
    switch (check.type) {
      case 'commitCount':
        if (engine.getCommits().length < (check.min || 0)) return false;
        break;
      case 'fileContent': {
        const content = engine.readFile(check.path!);
        if (!content || !content.includes(check.contains!)) return false;
        break;
      }
      case 'branchExists':
        if (!(check.name! in engine.getBranches())) return false;
        break;
      case 'currentBranch':
        if (engine.getHead() !== check.name) return false;
        break;
      case 'clean': {
        const status = engine.getStatus();
        const isClean = status.modified.length === 0 && status.untracked.length === 0 && status.staged.length === 0;
        if (isClean !== check.value) return false;
        break;
      }
    }
  }
  return true;
}
