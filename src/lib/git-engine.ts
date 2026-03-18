export interface GitCommit {
  hash: string;
  message: string;
  snapshot: Record<string, string>;
  parentHashes: string[];
  branch: string;
  timestamp: number;
}

export interface GitStatus {
  branch: string;
  untracked: string[];
  modified: string[];
  staged: string[];
  deleted: string[];
  conflicts: string[];
}

export interface CommandResult {
  success: boolean;
  output: string;
  type: 'info' | 'error' | 'success' | 'warning' | 'blocked';
}

export type PreScriptStep = string | { write: string; content: string };

export class GitEngine {
  private workingDir = new Map<string, string>();
  private index = new Map<string, string>();
  commits: GitCommit[] = [];
  private branches = new Map<string, string>();
  private _head = 'main';
  private initialized = false;
  private _conflictFiles = new Set<string>();
  private allowedCommands: string[];
  private stashStack: Array<{ working: Map<string, string>; index: Map<string, string> }> = [];

  private static blockedPatterns = [
    /reset\s+--hard/, /rebase/, /cherry-pick/,
    /push/, /pull/, /clone/, /remote/, /fetch/,
  ];

  constructor(allowed: string[] = []) {
    this.allowedCommands = allowed;
  }

  private genHash(): string {
    return Math.random().toString(16).slice(2, 9);
  }

  private getSnapshot(branch?: string): Record<string, string> {
    const b = branch || this._head;
    const hash = this.branches.get(b);
    if (!hash) return {};
    const commit = this.commits.find(c => c.hash === hash);
    return commit ? { ...commit.snapshot } : {};
  }

  getWorkingDir() { return new Map(this.workingDir); }
  getIndex() { return new Map(this.index); }
  getCommits() { return [...this.commits]; }
  getBranches(): Record<string, string> { return Object.fromEntries(this.branches); }
  getHead() { return this._head; }

  writeFile(path: string, content: string) { this.workingDir.set(path, content); }
  readFile(path: string): string | undefined { return this.workingDir.get(path); }
  listFiles(): string[] { return [...this.workingDir.keys()].sort(); }

  getStatus(): GitStatus {
    const headSnap = this.getSnapshot();
    const untracked: string[] = [];
    const modified: string[] = [];
    const staged: string[] = [];
    const deleted: string[] = [];

    for (const [path, content] of this.index) {
      if (!(path in headSnap) || headSnap[path] !== content) {
        staged.push(path);
      }
    }
    for (const path of Object.keys(headSnap)) {
      if (!this.index.has(path)) staged.push(path);
    }
    for (const [path, content] of this.workingDir) {
      if (this.isIgnored(path)) continue;
      if (!this.index.has(path)) {
        untracked.push(path);
        modified.push(path);
      }
    }
    for (const path of this.index.keys()) {
      if (!this.workingDir.has(path)) deleted.push(path);
    }

    return {
      branch: this._head,
      untracked, modified,
      staged: [...new Set(staged)],
      deleted,
      conflicts: [...this._conflictFiles],
    };
  }

  private initCmd(): CommandResult {
    if (this.initialized) return { success: true, output: 'Reinitialized existing Git repository.', type: 'warning' };
    this.initialized = true;
    return { success: true, output: 'Initialized empty Git repository.', type: 'success' };
  }

  private statusCmd(): CommandResult {
    const s = this.getStatus();
    let out = `On branch ${s.branch}\n`;
    if (s.conflicts.length) {
      out += '\nUnmerged paths:\n  (fix conflicts and run "git add")\n';
      s.conflicts.forEach(f => { out += `\tboth modified:   ${f}\n`; });
    }
    if (s.staged.length) {
      out += '\nChanges to be committed:\n';
      const snap = this.getSnapshot();
      s.staged.forEach(f => { out += `\t${f in snap ? 'modified' : 'new file'}:   ${f}\n`; });
    }
    if (s.modified.length) {
      out += '\nChanges not staged for commit:\n';
      s.modified.forEach(f => { out += `\tmodified:   ${f}\n`; });
    }
    if (s.untracked.length) {
      out += '\nUntracked files:\n';
      s.untracked.forEach(f => { out += `\t${f}\n`; });
    }
    if (!s.staged.length && !s.modified.length && !s.untracked.length && !s.conflicts.length && !s.deleted.length) {
      out += '\nnothing to commit, working tree clean';
    }
    return { success: true, output: out, type: 'info' };
  }

  private getIgnorePatterns(): string[] {
    const gitignore = this.workingDir.get('.gitignore');
    if (!gitignore) return [];
    return gitignore.split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
  }

  private isIgnored(path: string): boolean {
    const patterns = this.getIgnorePatterns();
    for (const pattern of patterns) {
      const clean = pattern.replace(/\/$/, '');
      if (path === clean || path.startsWith(clean + '/') || path === pattern) return true;
    }
    return false;
  }

  private addCmd(args: string[]): CommandResult {
    if (!args.length || args[0] === '.') {
      let count = 0;
      for (const [path, content] of this.workingDir) {
        if (this.isIgnored(path)) continue;
        if (!this.index.has(path) || this.index.get(path) !== content) {
          this.index.set(path, content);
          this._conflictFiles.delete(path);
          count++;
        }
      }
      return { success: true, output: count ? `Added ${count} file(s) to staging area.` : 'Nothing to add.', type: count ? 'success' : 'info' };
    }
    const path = args[0];
    if (this.isIgnored(path)) return { success: false, output: `The following paths are ignored by one of your .gitignore files:\n${path}`, type: 'error' };
    const content = this.workingDir.get(path);
    if (content === undefined) return { success: false, output: `fatal: pathspec '${path}' did not match any files`, type: 'error' };
    this.index.set(path, content);
    this._conflictFiles.delete(path);
    return { success: true, output: `Added '${path}' to staging area.`, type: 'success' };
  }

  private commitCmd(_args: string[], fullInput: string): CommandResult {
    const msgMatch = fullInput.match(/-m\s+["'](.+?)["']/);
    if (!msgMatch) return { success: false, output: 'Usage: git commit -m "your message"', type: 'error' };
    const message = msgMatch[1];
    if (this._conflictFiles.size > 0) {
      return { success: false, output: 'error: you have unmerged files.\nFix conflicts then run "git add" and "git commit".', type: 'error' };
    }
    const headSnap = this.getSnapshot();
    let hasChanges = false;
    for (const [path, content] of this.index) {
      if (!(path in headSnap) || headSnap[path] !== content) { hasChanges = true; break; }
    }
    if (!hasChanges) {
      for (const path of Object.keys(headSnap)) {
        if (!this.index.has(path)) { hasChanges = true; break; }
      }
    }
    if (!hasChanges) return { success: false, output: 'nothing to commit, working tree clean', type: 'info' };

    const hash = this.genHash();
    const snapshot: Record<string, string> = {};
    for (const [p, c] of this.index) snapshot[p] = c;
    const parentHash = this.branches.get(this._head) || null;
    this.commits.push({
      hash, message, snapshot,
      parentHashes: parentHash ? [parentHash] : [],
      branch: this._head,
      timestamp: Date.now(),
    });
    this.branches.set(this._head, hash);
    return { success: true, output: `[${this._head} ${hash}] ${message}\n ${Object.keys(snapshot).length} file(s)`, type: 'success' };
  }

  private logCmd(args: string[]): CommandResult {
    const oneline = args.includes('--oneline');
    const branchHash = this.branches.get(this._head);
    if (!branchHash) return { success: false, output: 'fatal: your current branch does not have any commits yet', type: 'error' };
    const visited = new Set<string>();
    const result: GitCommit[] = [];
    const queue = [branchHash];
    while (queue.length) {
      const h = queue.shift()!;
      if (visited.has(h)) continue;
      visited.add(h);
      const c = this.commits.find(x => x.hash === h);
      if (c) { result.push(c); c.parentHashes.forEach(p => queue.push(p)); }
    }
    result.sort((a, b) => b.timestamp - a.timestamp);
    if (oneline) return { success: true, output: result.map(c => `${c.hash} ${c.message}`).join('\n'), type: 'info' };
    return { success: true, output: result.map(c => `commit ${c.hash}\n    ${c.message}\n`).join('\n'), type: 'info' };
  }

  private diffCmd(args: string[]): CommandResult {
    const isStaged = args.includes('--staged') || args.includes('--cached');
    let output = '';
    if (isStaged) {
      const headSnap = this.getSnapshot();
      for (const [path, content] of this.index) {
        const old = headSnap[path] || '';
        if (old !== content) output += this.formatDiff(path, old, content);
      }
    } else {
      for (const [path, content] of this.workingDir) {
        const indexed = this.index.get(path);
        if (indexed !== undefined && indexed !== content) output += this.formatDiff(path, indexed, content);
      }
    }
    return { success: true, output: output || 'No differences found.', type: 'info' };
  }

  private formatDiff(path: string, oldC: string, newC: string): string {
    const oldL = oldC.split('\n');
    const newL = newC.split('\n');
    let out = `diff --git a/${path} b/${path}\n--- a/${path}\n+++ b/${path}\n`;
    const max = Math.max(oldL.length, newL.length);
    for (let i = 0; i < max; i++) {
      if (oldL[i] === newL[i]) { if (oldL[i] !== undefined) out += ` ${oldL[i]}\n`; }
      else {
        if (oldL[i] !== undefined) out += `-${oldL[i]}\n`;
        if (newL[i] !== undefined) out += `+${newL[i]}\n`;
      }
    }
    return out;
  }

  private branchCmd(args: string[]): CommandResult {
    if (!args.length) {
      const branches = [...this.branches.keys()].sort();
      return { success: true, output: branches.map(b => `${b === this._head ? '* ' : '  '}${b}`).join('\n') || 'No branches yet.', type: 'info' };
    }
    const name = args[0];
    if (this.branches.has(name)) return { success: false, output: `fatal: A branch named '${name}' already exists.`, type: 'error' };
    const currentHash = this.branches.get(this._head);
    if (!currentHash) return { success: false, output: 'fatal: Not a valid object name: no commits yet.', type: 'error' };
    this.branches.set(name, currentHash);
    return { success: true, output: `Created branch '${name}'.`, type: 'success' };
  }

  private switchCmd(args: string[]): CommandResult {
    const createNew = args[0] === '-c';
    const branchName = createNew ? args[1] : args[0];
    if (!branchName) return { success: false, output: 'Usage: git switch <branch> or git switch -c <new-branch>', type: 'error' };

    if (createNew) {
      const currentHash = this.branches.get(this._head);
      if (!currentHash) return { success: false, output: 'fatal: No commits yet.', type: 'error' };
      if (this.branches.has(branchName)) return { success: false, output: `fatal: A branch named '${branchName}' already exists.`, type: 'error' };
      this.branches.set(branchName, currentHash);
    } else if (!this.branches.has(branchName)) {
      return { success: false, output: `fatal: invalid reference: ${branchName}`, type: 'error' };
    }

    const targetSnap = this.getSnapshot(branchName);
    this.workingDir.clear();
    this.index.clear();
    for (const [p, c] of Object.entries(targetSnap)) {
      this.workingDir.set(p, c);
      this.index.set(p, c);
    }
    this._head = branchName;
    return { success: true, output: `Switched to ${createNew ? 'a new ' : ''}branch '${branchName}'`, type: 'success' };
  }

  private mergeCmd(args: string[]): CommandResult {
    const targetBranch = args[0];
    if (!targetBranch) return { success: false, output: 'Usage: git merge <branch>', type: 'error' };
    if (!this.branches.has(targetBranch)) return { success: false, output: `merge: ${targetBranch} - not something we can merge`, type: 'error' };
    if (targetBranch === this._head) return { success: false, output: 'Already on that branch.', type: 'error' };

    const currentSnap = this.getSnapshot();
    const targetSnap = this.getSnapshot(targetBranch);
    const merged: Record<string, string> = { ...currentSnap };
    const conflicts: string[] = [];

    for (const [path, content] of Object.entries(targetSnap)) {
      if (!(path in currentSnap)) {
        merged[path] = content;
      } else if (currentSnap[path] !== content) {
        merged[path] = `<<<<<<< HEAD\n${currentSnap[path]}=======\n${content}>>>>>>> ${targetBranch}\n`;
        conflicts.push(path);
      }
    }

    this.workingDir.clear();
    this.index.clear();
    for (const [p, c] of Object.entries(merged)) {
      this.workingDir.set(p, c);
      if (!conflicts.includes(p)) this.index.set(p, c);
    }

    if (conflicts.length > 0) {
      this._conflictFiles = new Set(conflicts);
      return { success: true, output: `Auto-merging failed!\nCONFLICT (content): Merge conflict in ${conflicts.join(', ')}\nFix conflicts and then commit the result.`, type: 'warning' };
    }

    const hash = this.genHash();
    const parentHash = this.branches.get(this._head)!;
    const targetHash = this.branches.get(targetBranch)!;
    for (const [p, c] of Object.entries(merged)) this.index.set(p, c);
    this.commits.push({
      hash,
      message: `Merge branch '${targetBranch}' into ${this._head}`,
      snapshot: merged,
      parentHashes: [parentHash, targetHash],
      branch: this._head,
      timestamp: Date.now(),
    });
    this.branches.set(this._head, hash);
    return { success: true, output: `Merge made by the 'ort' strategy.\nMerged '${targetBranch}' into ${this._head}.`, type: 'success' };
  }

  private restoreCmd(args: string[]): CommandResult {
    if (args[0] === '--staged') {
      const path = args[1];
      if (!path) return { success: false, output: 'Usage: git restore --staged <file>', type: 'error' };
      const headSnap = this.getSnapshot();
      if (path in headSnap) this.index.set(path, headSnap[path]);
      else this.index.delete(path);
      return { success: true, output: `Unstaged changes for '${path}'.`, type: 'success' };
    }
    const path = args[0];
    if (!path) return { success: false, output: 'Usage: git restore <file>', type: 'error' };
    const indexContent = this.index.get(path);
    if (indexContent !== undefined) {
      this.workingDir.set(path, indexContent);
      return { success: true, output: `Restored '${path}'.`, type: 'success' };
    }
    return { success: false, output: `error: pathspec '${path}' did not match any file(s)`, type: 'error' };
  }

  private stashCmd(args: string[]): CommandResult {
    if (!args.length || args[0] === 'push') {
      // Save current working state
      const headSnap = this.getSnapshot();
      const hasChanges = [...this.workingDir].some(([p, c]) => {
        const committed = headSnap[p];
        return committed !== c;
      }) || [...this.index].some(([p, c]) => !(p in headSnap) || headSnap[p] !== c);

      if (!hasChanges) return { success: false, output: 'No local changes to save', type: 'info' };

      this.stashStack.push({
        working: new Map(this.workingDir),
        index: new Map(this.index),
      });

      // Restore to HEAD state
      this.workingDir.clear();
      this.index.clear();
      for (const [p, c] of Object.entries(headSnap)) {
        this.workingDir.set(p, c);
        this.index.set(p, c);
      }
      return { success: true, output: `Saved working directory and index state WIP on ${this._head}\nHEAD is now at ${this.branches.get(this._head) || '(none)'}`, type: 'success' };
    }

    if (args[0] === 'pop') {
      if (this.stashStack.length === 0) return { success: false, output: 'No stash entries found.', type: 'error' };
      const stash = this.stashStack.pop()!;
      this.workingDir = stash.working;
      this.index = stash.index;
      return { success: true, output: `Dropped refs/stash@{0}\nRestored working directory and index.`, type: 'success' };
    }

    if (args[0] === 'list') {
      if (this.stashStack.length === 0) return { success: true, output: 'No stash entries.', type: 'info' };
      return { success: true, output: this.stashStack.map((_, i) => `stash@{${i}}: WIP`).join('\n'), type: 'info' };
    }

    return { success: false, output: 'Usage: git stash [push|pop|list]', type: 'error' };
  }

  executeCommand(input: string): CommandResult {
    const trimmed = input.trim();
    if (!trimmed) return { success: true, output: '', type: 'info' };
    if (!trimmed.startsWith('git ') && trimmed !== 'git') {
      return { success: false, output: `Command not found: ${trimmed.split(' ')[0]}. Try a git command.`, type: 'error' };
    }
    for (const pattern of GitEngine.blockedPatterns) {
      if (pattern.test(trimmed)) {
        return { success: false, output: `⚠️ This command is blocked in beginner mode.\n\nIt can cause data loss. Instead, try:\n• git restore <file> — discard working changes\n• git restore --staged <file> — unstage a file`, type: 'blocked' };
      }
    }
    const withoutGit = trimmed.substring(4).trim();
    if (!withoutGit) return { success: false, output: 'Usage: git <command>', type: 'error' };
    const parts = withoutGit.split(/\s+/);
    const sub = parts[0];
    const subArgs = parts.slice(1);

    if (this.allowedCommands.length > 0 && !this.allowedCommands.includes(sub)) {
      return { success: false, output: `"git ${sub}" is not available in this exercise.\n\nAllowed: ${this.allowedCommands.map(c => 'git ' + c).join(', ')}`, type: 'blocked' };
    }

    switch (sub) {
      case 'init': return this.initCmd();
      case 'status': return this.statusCmd();
      case 'add': return this.addCmd(subArgs);
      case 'commit': return this.commitCmd(subArgs, trimmed);
      case 'log': return this.logCmd(subArgs);
      case 'diff': return this.diffCmd(subArgs);
      case 'branch': return this.branchCmd(subArgs);
      case 'switch': return this.switchCmd(subArgs);
      case 'merge': return this.mergeCmd(subArgs);
      case 'restore': return this.restoreCmd(subArgs);
      case 'stash': return this.stashCmd(subArgs);
      default: return { success: false, output: `git: '${sub}' is not a git command.`, type: 'error' };
    }
  }

  runPreScript(steps: PreScriptStep[]): void {
    const saved = this.allowedCommands;
    this.allowedCommands = []; // bypass restrictions during setup
    for (const step of steps) {
      if (typeof step === 'string') this.executeCommand(step);
      else this.writeFile(step.write, step.content);
    }
    this.allowedCommands = saved;
  }

  reset(): void {
    this.workingDir.clear();
    this.index.clear();
    this.commits = [];
    this.branches.clear();
    this._head = 'main';
    this.initialized = false;
    this._conflictFiles.clear();
  }
}
