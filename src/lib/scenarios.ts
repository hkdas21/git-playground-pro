import { GitEngine, PreScriptStep } from './git-engine';

export interface SuccessCheck {
  type: 'commitCount' | 'fileContent' | 'branchExists' | 'currentBranch' | 'clean' | 'stagedCount' | 'fileExists';
  min?: number;
  max?: number;
  path?: string;
  contains?: string;
  notContains?: string;
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
  conceptSummary: string;
  instructions: string[];
}

export const scenarios: Scenario[] = [
  // ── Widget 1: Factory Line ──────────────────────────────────────
  {
    id: 'factory-line',
    title: 'Factory Line',
    subtitle: 'Working → Staging → Repository',
    description: 'Learn the 3 places in Git by building a tiny web page and shipping it through the pipeline.',
    difficulty: 'beginner',
    timebox: 300,
    seedFiles: {
      'index.html': '<!DOCTYPE html>\n<html>\n<head><title>My Site</title></head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>\n',
      'style.css': 'body {\n  font-family: sans-serif;\n  color: #333;\n}\n',
    },
    preScript: ['git init', 'git add .', 'git commit -m "chore: scaffold website"'],
    allowedCommands: ['status', 'diff', 'add', 'commit', 'log'],
    goalDescription: 'Change the <h1> in index.html to say "Hello Git" instead of "Hello World", then stage and commit your change.',
    conceptSummary: 'Git tracks your code in 3 places: Working Directory (where you edit), Staging Area (where you prepare changes), and Repository (where snapshots are saved). This activity walks you through that entire flow — edit, stage, commit.',
    instructions: [
      'Click on index.html in the file list to open it in the editor',
      'Change the heading from "Hello World" to "Hello Git" and click Save',
      'Run "git status" to see that index.html is now modified',
      'Run "git diff" to see exactly what changed (old vs new)',
      'Run "git add ." to move your change to the staging area',
      'Run "git commit -m \\"feat: update heading\\"" to save the snapshot',
    ],
    successChecks: [
      { type: 'fileContent', path: 'index.html', contains: 'Hello Git' },
      { type: 'commitCount', min: 2 },
    ],
    hints: [
      { text: 'Click index.html in the file list to open it in the editor', delay: 10 },
      { text: 'Change "Hello World" to "Hello Git" and click Save', delay: 25 },
      { text: 'Run "git status" — you\'ll see index.html is modified (red = unstaged)', delay: 40 },
      { text: 'Run "git diff" to see exactly what line changed (- old, + new)', delay: 55 },
      { text: 'Run "git add ." to move the change to the staging area', delay: 70 },
      { text: 'Run: git commit -m "feat: update heading to Hello Git"', delay: 85 },
    ],
    debrief: '🎉 You shipped a change through all 3 places!\n\n📂 Working Directory — your workshop where you edit files\n📦 Staging Area — the conveyor belt where you prepare changes\n🏛️ Repository — the warehouse where snapshots are stored forever\n\nThe flow is always: edit → git add → git commit.\nWatch the pipeline above — it shows exactly where your files are at each step.',
  },

  // ── Widget 2: Commit Message Arcade ─────────────────────────────
  {
    id: 'commit-message-arcade',
    title: 'Commit Message Arcade',
    subtitle: 'Write clear, meaningful commit messages',
    description: 'Practice writing commit messages that tell a story. Vague messages get rejected!',
    difficulty: 'beginner',
    timebox: 240,
    seedFiles: {
      'todo.md': '# Project TODO\n\n- [x] Set up project structure\n- [ ] Add user login page\n- [ ] Write unit tests\n',
    },
    preScript: ['git init', 'git add .', 'git commit -m "docs: create project TODO list"'],
    allowedCommands: ['status', 'diff', 'add', 'commit', 'log'],
    goalDescription: 'Check off "Add user login page" (change [ ] to [x]) and add a new TODO item. Commit with a clear, specific message describing what you changed.',
    conceptSummary: 'Good commit messages tell the story of your project. They use a type prefix (feat:, fix:, docs:), imperative mood, and describe specifically what changed. Vague messages like "update file" make your project history useless.',
    instructions: [
      'Click todo.md to open it in the editor',
      'Change "- [ ] Add user login page" to "- [x] Add user login page"',
      'Add a new TODO item (e.g. "- [ ] Deploy to production")',
      'Click Save, then run "git diff" to review your changes',
      'Stage with "git add ." and commit with a clear, specific message',
      'Use a type prefix like: git commit -m "docs: mark login done, add deploy task"',
    ],
    successChecks: [
      { type: 'commitCount', min: 2 },
      { type: 'fileContent', path: 'todo.md', contains: '[x] Add user login page' },
    ],
    hints: [
      { text: 'Click todo.md and change "- [ ] Add user login page" to "- [x] Add user login page"', delay: 10 },
      { text: 'Add a new line like "- [ ] Deploy to production" and click Save', delay: 25 },
      { text: 'Run "git diff" to review your changes before staging', delay: 40 },
      { text: 'Stage with "git add ." then commit with a specific message', delay: 55 },
      { text: 'Good: git commit -m "docs: mark login page done, add deploy task"\nBad: git commit -m "update file"', delay: 70 },
    ],
    debrief: '📝 Commit message best practices:\n\n✅ Use a type prefix: feat:, fix:, docs:, chore:, style:\n✅ Use imperative mood: "add feature" not "added feature"\n✅ Be specific: "fix login button alignment" not "fix stuff"\n✅ Keep the subject under 50 characters\n\nYour commit messages are your project\'s diary — make them useful!',
  },

  // ── Widget 3: Status Explorer (NEW — dedicated for "Reading git status") ──
  {
    id: 'status-explorer',
    title: 'Status Explorer',
    subtitle: 'Decode what Git is telling you',
    description: 'Multiple files in different states — use git status to understand each one.',
    difficulty: 'beginner',
    timebox: 300,
    seedFiles: {
      'README.md': '# Photo Gallery App\n\nA simple photo gallery built with HTML & CSS.\n',
      'gallery.html': '<div class="gallery">\n  <img src="photo1.jpg" alt="Sunset" />\n  <img src="photo2.jpg" alt="Mountain" />\n</div>\n',
      'styles.css': '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n',
    },
    preScript: ['git init', 'git add .', 'git commit -m "feat: initial photo gallery"'],
    allowedCommands: ['status', 'diff', 'add', 'commit', 'log', 'restore'],
    goalDescription: 'Create a messy situation: 1) Edit gallery.html to add a third photo, 2) Edit styles.css to change the gap, 3) Stage ONLY gallery.html (not styles.css), 4) Run git status and read the output — you should see staged, unstaged, and committed files all at once. Then commit just gallery.html.',
    conceptSummary: 'The "git status" command is your dashboard — it shows which files are staged (green), modified but unstaged (red), and untracked (new). Learning to read status output is essential for selective staging and understanding where your files are in the Git pipeline.',
    instructions: [
      'Click gallery.html and add a third photo: <img src="photo3.jpg" alt="Lake" />',
      'Click styles.css and change gap: 10px to gap: 20px. Save both files.',
      'Stage ONLY gallery.html: run "git add gallery.html" (not "git add .")',
      'Run "git status" — gallery.html should be green, styles.css should be red',
      'Commit just the staged file: git commit -m "feat: add lake photo"',
    ],
    successChecks: [
      { type: 'commitCount', min: 2 },
      { type: 'fileContent', path: 'gallery.html', contains: 'photo3' },
    ],
    hints: [
      { text: 'Click gallery.html — add a line: <img src="photo3.jpg" alt="Lake" />, then Save', delay: 10 },
      { text: 'Click styles.css — change gap: 10px to gap: 20px, then Save', delay: 25 },
      { text: 'Stage only one file: git add gallery.html (not "git add ."!)', delay: 40 },
      { text: 'Run "git status" — gallery.html should be green (staged), styles.css should be red (modified)', delay: 55 },
      { text: 'Commit just the staged file: git commit -m "feat: add lake photo to gallery"', delay: 70 },
    ],
    debrief: '🔍 Reading git status like a pro:\n\n🟢 Green files = staged (ready to commit)\n🔴 Red files = modified but NOT staged\n⚪ Untracked = brand new files Git doesn\'t know about\n\nKey insight: You can stage files selectively!\n"git add gallery.html" stages only that file.\n"git add ." stages everything.\n\nAlways run git status before committing to make sure you\'re committing exactly what you intend.',
  },

  // ── Widget 4: Diff Detective (NEW — dedicated for "Understanding Diffs") ──
  {
    id: 'diff-detective',
    title: 'Diff Detective',
    subtitle: 'Find the bug using git diff',
    description: 'A config file has a bug. Use git diff to spot changes and fix them.',
    difficulty: 'beginner',
    timebox: 300,
    seedFiles: {
      'config.json': '{\n  "appName": "TaskMaster",\n  "version": "1.0.0",\n  "port": 3000,\n  "database": "postgresql://localhost:5432/tasks",\n  "debug": false,\n  "maxUsers": 100\n}\n',
      'server.js': '// Server entry point\nconst config = require("./config.json");\n\nconsole.log(`Starting ${config.appName} v${config.version}`);\nconsole.log(`Listening on port ${config.port}`);\n',
    },
    preScript: ['git init', 'git add .', 'git commit -m "chore: initial server config"'],
    allowedCommands: ['status', 'diff', 'add', 'commit', 'log', 'restore'],
    goalDescription: 'Your task: 1) In config.json, change the version to "1.1.0" and set debug to true. 2) Run "git diff" to review your changes line-by-line. 3) Stage and commit. Then 4) Update the port to 8080, run "git diff" again to see the new change, stage and commit separately.',
    successChecks: [
      { type: 'commitCount', min: 3 },
      { type: 'fileContent', path: 'config.json', contains: '"1.1.0"' },
      { type: 'fileContent', path: 'config.json', contains: '8080' },
    ],
    hints: [
      { text: 'Open config.json and change "1.0.0" to "1.1.0" and false to true. Save.', delay: 10 },
      { text: 'Run "git diff" — you\'ll see lines with - (old) and + (new)', delay: 25 },
      { text: 'Stage and commit: git add . && git commit -m "feat: bump version, enable debug"', delay: 40 },
      { text: 'Now change port 3000 to 8080 in config.json and Save', delay: 55 },
      { text: 'Run "git diff" again — only the port change shows this time!', delay: 65 },
      { text: 'git add . && git commit -m "chore: change port to 8080"', delay: 75 },
    ],
    debrief: '🔎 Understanding diffs:\n\n- Lines starting with "-" (red) = removed\n+ Lines starting with "+" (green) = added\n  Lines with no prefix = unchanged context\n\n"git diff" shows unstaged changes (working dir vs staging area)\n"git diff --staged" shows what you\'re about to commit\n\nDiffs are the foundation of code review — you\'ll read hundreds of them in your career!',
  },

  // ── Widget 5: Branch Maze ───────────────────────────────────────
  {
    id: 'branch-maze',
    title: 'Branch Maze',
    subtitle: 'Create parallel timelines',
    description: 'Build a feature on a separate branch, then bring it back to main.',
    difficulty: 'intermediate',
    timebox: 360,
    seedFiles: {
      'recipe.md': '# Pancake Recipe\n\n## Ingredients\n- 2 cups flour\n- 2 eggs\n- 1 cup milk\n\n## Steps\n1. Mix dry ingredients\n2. Add wet ingredients\n3. Cook on griddle\n',
    },
    preScript: ['git init', 'git add .', 'git commit -m "docs: basic pancake recipe"'],
    allowedCommands: ['status', 'branch', 'switch', 'add', 'commit', 'merge', 'log', 'diff'],
    goalDescription: 'Create a branch called "feature/toppings", add a Toppings section to recipe.md, commit it, switch back to main, and merge the branch in.',
    successChecks: [
      { type: 'branchExists', name: 'feature/toppings' },
      { type: 'commitCount', min: 3 },
      { type: 'currentBranch', name: 'main' },
      { type: 'fileContent', path: 'recipe.md', contains: 'Toppings' },
    ],
    hints: [
      { text: 'Create and switch to the branch: git switch -c feature/toppings', delay: 10 },
      { text: 'Run "git branch" to see both branches (* = current)', delay: 20 },
      { text: 'Edit recipe.md — add "## Toppings\\n- Maple syrup\\n- Blueberries" at the bottom. Save.', delay: 35 },
      { text: 'Stage and commit: git add . && git commit -m "feat: add toppings section"', delay: 50 },
      { text: 'Switch back: git switch main (notice the toppings disappear from recipe.md!)', delay: 65 },
      { text: 'Bring the feature in: git merge feature/toppings', delay: 80 },
    ],
    debrief: '🌿 Branch workflow:\n\n1. git switch -c feature/name — create & switch to a new branch\n2. Make your changes and commit them\n3. git switch main — go back to main\n4. git merge feature/name — bring changes into main\n\n💡 Key insight: When you switch branches, your files change!\nThe branch has the toppings, main doesn\'t — until you merge.\n\nBranches are lightweight in Git (just a pointer to a commit). Use them freely!',
  },

  // ── Widget 6: Merge Conflict Escape Room ────────────────────────
  {
    id: 'merge-conflict',
    title: 'Merge Conflict Escape Room',
    subtitle: "Two chefs, one recipe — resolve the conflict",
    description: 'Two branches changed the same recipe line. Learn to resolve the conflict calmly and confidently.',
    difficulty: 'intermediate',
    timebox: 300,
    seedFiles: {
      'menu.txt': '# Today\'s Menu\n\nAppetizer: Bruschetta\nMain Course: Grilled Chicken\nDessert: Tiramisu\nDrink: Water\n',
    },
    preScript: [
      'git init', 'git add .', 'git commit -m "docs: create restaurant menu"',
      'git switch -c feature/chef-alice',
      { write: 'menu.txt', content: '# Today\'s Menu\n\nAppetizer: Bruschetta\nMain Course: Pan-Seared Salmon\nDessert: Tiramisu\nDrink: Sparkling Water\n' },
      'git add .', 'git commit -m "feat: Alice updates main course to salmon"',
      'git switch main',
      { write: 'menu.txt', content: '# Today\'s Menu\n\nAppetizer: Bruschetta\nMain Course: Beef Wellington\nDessert: Chocolate Lava Cake\nDrink: Red Wine\n' },
      'git add .', 'git commit -m "feat: Bob updates menu with beef and wine"',
    ],
    allowedCommands: ['status', 'merge', 'add', 'commit', 'diff', 'log'],
    goalDescription: 'Merge feature/chef-alice into main. You\'ll hit a conflict because both chefs changed the menu! Open menu.txt, pick the dishes you want (remove the <<<, ===, >>> markers), then stage and commit.',
    successChecks: [
      { type: 'commitCount', min: 4 },
      { type: 'currentBranch', name: 'main' },
      { type: 'fileContent', path: 'menu.txt', notContains: '<<<<<<<' },
    ],
    hints: [
      { text: 'Start the merge: git merge feature/chef-alice', delay: 5 },
      { text: 'Run "git status" — you\'ll see menu.txt listed under "Unmerged paths"', delay: 20 },
      { text: 'Click menu.txt — look for <<<<<<< HEAD (your version) and >>>>>>> (their version)', delay: 35 },
      { text: 'Edit the file: pick the dishes you like from both chefs. Remove ALL conflict markers (<<<, ===, >>>)', delay: 50 },
      { text: 'Save the file, then: git add menu.txt', delay: 65 },
      { text: 'Finish the merge: git commit -m "fix: resolve menu conflict, combine best dishes"', delay: 80 },
    ],
    debrief: '🔧 Conflict resolution — step by step:\n\n1. git merge <branch> → Git marks conflicts with markers\n2. Open the conflicted file and find:\n   <<<<<<< HEAD    (your current branch\'s version)\n   =======         (divider)\n   >>>>>>> branch  (incoming branch\'s version)\n3. Edit the file: keep what you want, delete the markers\n4. git add <file> → tells Git "I resolved this"\n5. git commit → finalizes the merge\n\n🧘 Conflicts are NOT errors — they\'re just Git asking "which version do you want?" Stay calm!',
  },

  // ── Widget 7: Undo Wizard ───────────────────────────────────────
  {
    id: 'undo-wizard',
    title: 'Undo Wizard',
    subtitle: 'Safely undo mistakes without panic',
    description: 'Learn the safe undo commands: restore and restore --staged.',
    difficulty: 'beginner',
    timebox: 240,
    seedFiles: {
      'settings.yaml': 'app:\n  name: MyApp\n  theme: light\n  language: en\n  notifications: true\n',
      'secrets.env': 'API_KEY=abc123\nDB_PASSWORD=secure456\n',
    },
    preScript: ['git init', 'git add .', 'git commit -m "chore: initial settings"'],
    allowedCommands: ['status', 'diff', 'add', 'restore', 'commit'],
    goalDescription: 'Practice the undo cycle: 1) Edit settings.yaml (change theme to dark), 2) Stage it with git add, 3) Unstage it with git restore --staged settings.yaml, 4) Discard the change with git restore settings.yaml. End with a clean working tree.',
    successChecks: [{ type: 'clean', value: true }],
    hints: [
      { text: 'Open settings.yaml and change "theme: light" to "theme: dark". Save.', delay: 5 },
      { text: 'Run "git status" — settings.yaml shows as modified (red)', delay: 15 },
      { text: 'Stage it: git add settings.yaml — now it\'s staged (green)', delay: 25 },
      { text: 'Unstage it: git restore --staged settings.yaml — back to modified (red)', delay: 35 },
      { text: 'Discard the change entirely: git restore settings.yaml', delay: 45 },
      { text: 'Run "git status" — working tree should be clean!', delay: 55 },
    ],
    debrief: '✨ Safe undo commands:\n\n🔄 git restore <file>\n   → Discards changes in working directory (reverts to staged/committed version)\n\n📤 git restore --staged <file>\n   → Unstages a file (keeps the changes in your working directory)\n\n⚠️ AVOID in beginner mode:\n   git reset --hard — destructive, can lose work\n   git rebase — rewrites history\n\nRemember: restore is safe. You can always undo your undo!',
  },

  // ── Widget 8: Gitignore Guardian ───────────────────────────────
  {
    id: 'gitignore-guardian',
    title: 'Gitignore Guardian',
    subtitle: 'Protect secrets, ignore junk',
    description: 'Learn to use .gitignore to keep sensitive files and dependencies out of your repo.',
    difficulty: 'beginner' as const,
    timebox: 300,
    seedFiles: {
      'app.js': 'const express = require("express");\nconst app = express();\napp.listen(3000);\n',
      'node_modules/lib.js': '// third-party library code\nmodule.exports = {};\n',
      '.env': 'API_KEY=super_secret_key_12345\nDB_PASSWORD=hunter2\n',
    },
    preScript: ['git init'] as PreScriptStep[],
    allowedCommands: ['status', 'add', 'commit', 'diff', 'log'],
    goalDescription: 'Create a .gitignore file that excludes node_modules/ and .env, then stage and commit only the safe files (app.js and .gitignore).',
    successChecks: [
      { type: 'commitCount' as const, min: 1 },
      { type: 'fileExists' as const, path: '.gitignore' },
      { type: 'fileContent' as const, path: '.gitignore', contains: 'node_modules' },
      { type: 'fileContent' as const, path: '.gitignore', contains: '.env' },
    ],
    hints: [
      { text: 'First, run "git status" to see ALL files — including the dangerous ones', delay: 5 },
      { text: 'Click "+ New File" or use the file list — create a file called ".gitignore"', delay: 15 },
      { text: 'In .gitignore, type:\nnode_modules/\n.env\nThen click Save', delay: 30 },
      { text: 'Run "git status" again — node_modules/ and .env should be gone!', delay: 45 },
      { text: 'Now run "git add ." — only safe files get staged', delay: 55 },
      { text: 'Commit: git commit -m "chore: add gitignore, init project"', delay: 65 },
    ],
    debrief: '🛡️ .gitignore protects your repo!\n\nCommon patterns to ignore:\n• node_modules/ — dependencies (reinstall with npm install)\n• .env — secrets & API keys\n• dist/ or build/ — generated files\n• .DS_Store — macOS junk\n• *.log — log files\n\n⚠️ NEVER commit secrets! Once pushed to GitHub, they\'re in the history forever.\n\nPro tip: Use gitignore.io to generate templates for any language/framework.',
  },

  // ── Widget 9: Stash & Switch ───────────────────────────────────
  {
    id: 'stash-switch',
    title: 'Stash & Switch',
    subtitle: 'Save work-in-progress and context-switch',
    description: 'Learn to temporarily shelve changes with git stash so you can switch branches for a hotfix.',
    difficulty: 'intermediate' as const,
    timebox: 360,
    seedFiles: {
      'app.js': 'function greet(name) {\n  return "Hello, " + name;\n}\n\nmodule.exports = { greet };\n',
    },
    preScript: [
      'git init', 'git add .', 'git commit -m "feat: initial greeting function"',
    ] as PreScriptStep[],
    allowedCommands: ['status', 'add', 'commit', 'stash', 'switch', 'branch', 'diff', 'log'],
    goalDescription: '1) Edit app.js to add a farewell function (don\'t commit yet). 2) Stash your changes. 3) Create and switch to "hotfix/typo", fix the greeting, commit. 4) Switch back to main. 5) Pop your stash to get your work back.',
    successChecks: [
      { type: 'branchExists' as const, name: 'hotfix/typo' },
      { type: 'commitCount' as const, min: 2 },
      { type: 'currentBranch' as const, name: 'main' },
      { type: 'fileContent' as const, path: 'app.js', contains: 'farewell' },
    ],
    hints: [
      { text: 'Edit app.js — add:\nfunction farewell(name) {\n  return "Goodbye, " + name;\n}\nSave but do NOT commit.', delay: 5 },
      { text: 'Run "git stash" — your changes are saved and the file reverts to the last commit', delay: 20 },
      { text: 'git switch -c hotfix/typo — create and switch to the hotfix branch', delay: 35 },
      { text: 'Edit app.js — change "Hello" to "Hi". Stage and commit: git add . && git commit -m "fix: shorten greeting"', delay: 50 },
      { text: 'Switch back: git switch main', delay: 65 },
      { text: 'Bring your work back: git stash pop — the farewell function reappears!', delay: 80 },
    ],
    debrief: '📦 Git stash = your work-in-progress shelf!\n\n• git stash — save changes, clean working directory\n• git stash pop — re-apply the most recent stash\n• git stash list — see all stashed entries\n\nWhen to use stash:\n✅ Need to switch branches but have uncommitted work\n✅ Want to pull latest changes on a clean tree\n✅ Quick context switch for a hotfix\n\n💡 Stash is a stack (LIFO) — the most recent stash pops first.',
  },

  // ── Widget 10: Log Detective ───────────────────────────────────
  {
    id: 'log-detective',
    title: 'Log Detective',
    subtitle: 'Navigate history like a pro',
    description: 'Explore a repo\'s commit history using git log and create branches from the right place.',
    difficulty: 'intermediate' as const,
    timebox: 300,
    seedFiles: {
      'notes.md': '# Project Notes\n\n## v1.0\n- Initial release\n\n## v1.1\n- Added dark mode\n- Fixed login bug\n\n## v1.2\n- Performance improvements\n- Added search feature\n',
    },
    preScript: [
      'git init',
      { write: 'notes.md', content: '# Project Notes\n' },
      'git add .', 'git commit -m "docs: create project notes"',
      { write: 'notes.md', content: '# Project Notes\n\n## v1.0\n- Initial release\n' },
      'git add .', 'git commit -m "docs: add v1.0 release notes"',
      { write: 'notes.md', content: '# Project Notes\n\n## v1.0\n- Initial release\n\n## v1.1\n- Added dark mode\n- Fixed login bug\n' },
      'git add .', 'git commit -m "docs: add v1.1 release notes"',
      { write: 'readme.md', content: '# My Project\nA cool project.\n' },
      'git add .', 'git commit -m "docs: add README"',
      { write: 'notes.md', content: '# Project Notes\n\n## v1.0\n- Initial release\n\n## v1.1\n- Added dark mode\n- Fixed login bug\n\n## v1.2\n- Performance improvements\n- Added search feature\n' },
      'git add .', 'git commit -m "docs: add v1.2 release notes"',
    ] as PreScriptStep[],
    allowedCommands: ['log', 'branch', 'switch', 'status', 'add', 'commit', 'diff'],
    goalDescription: 'Use "git log --oneline" to explore the commit history. Then create a new branch called "feature/v1.3" from the current state and add a v1.3 section to notes.md with at least one bullet point. Commit your changes.',
    successChecks: [
      { type: 'branchExists' as const, name: 'feature/v1.3' },
      { type: 'fileContent' as const, path: 'notes.md', contains: 'v1.3' },
      { type: 'commitCount' as const, min: 6 },
    ],
    hints: [
      { text: 'Start with "git log --oneline" to see all commits in a compact format', delay: 5 },
      { text: 'Notice the history: notes → v1.0 → v1.1 → README → v1.2', delay: 20 },
      { text: 'Create your feature branch: git switch -c feature/v1.3', delay: 35 },
      { text: 'Edit notes.md — add:\n## v1.3\n- Added notifications\nSave the file.', delay: 50 },
      { text: 'Stage and commit: git add . && git commit -m "docs: add v1.3 release notes"', delay: 65 },
    ],
    debrief: '🔍 Git log is your time machine!\n\n• git log — full commit details\n• git log --oneline — compact view (hash + message)\n\nEach commit is a snapshot of your entire project at that point in time.\n\n💡 Good commit messages make log useful:\n  "docs: add v1.2 release notes" → you know exactly what changed\n  "update file" → useless in a log of 100 commits\n\nThe log + branches together let you navigate any project\'s history like a detective.',
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
        if (!content) return false;
        if (check.contains && !content.includes(check.contains)) return false;
        if (check.notContains && content.includes(check.notContains)) return false;
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
      case 'fileExists':
        if (!engine.readFile(check.path!)) return false;
        break;
    }
  }
  return true;
}
