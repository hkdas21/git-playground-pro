export interface LearnPageData {
  id: string;
  title: string;
  subtitle: string;
  widgetId: string;
  content: string[];
  trainerNotes: string;
}

export const learnPages: LearnPageData[] = [
  {
    id: 'git-three-places',
    title: 'Git is 3 Places',
    subtitle: 'Working Directory → Staging Area → Repository',
    widgetId: 'factory-line',
    content: [
      'Think of Git as a factory with 3 rooms. Your Working Directory is your workshop — where you actually edit files. The Staging Area is the conveyor belt — where you prepare changes for shipment. The Repository is the warehouse — where finished snapshots are permanently stored.',
      'This "3 places" model is the single most important concept in Git. Every Git command moves data between these three areas. Understanding this flow unlocks everything else.',
      'In the playground below, try editing app.txt (change version=1 to version=2), then use "git add" to move it to staging, and "git commit" to store it. Watch the pipeline update as you go!',
    ],
    trainerNotes: 'Key takeaway: Git has 3 places, not 2. The staging area lets you choose exactly what goes into each commit. After each command, ask students: "Where is the file now?" Point at the pipeline visualization to reinforce the mental model.',
  },
  {
    id: 'first-commit',
    title: 'Your First Commit',
    subtitle: 'And writing good commit messages',
    widgetId: 'commit-message-arcade',
    content: [
      'A commit is a snapshot of your entire project at a point in time. Think of it as a save point — you can always come back to any commit.',
      'Good commit messages are crucial. They tell your future self (and teammates) what changed and why. Avoid vague messages like "fix stuff" or "update" — be specific!',
      'Try the Commit Message Arcade below. Add a line to notes.txt and commit with a clear, descriptive message.',
    ],
    trainerNotes: 'Discuss conventions: imperative mood ("Add feature" not "Added"), short subject (<50 chars), type prefixes (feat:, fix:, docs:, chore:). Show examples of good vs bad messages. Have students critique each other\'s messages.',
  },
  {
    id: 'reading-status',
    title: 'Reading git status',
    subtitle: 'Understanding what Git is telling you',
    widgetId: 'factory-line',
    content: [
      '"git status" is your best friend. It tells you exactly what\'s happening: which files changed, which are staged, and which branch you\'re on.',
      'Status shows files in categories: Untracked (new files Git doesn\'t know about), Modified (changed but not staged), and Staged (ready to commit).',
      'Practice reading status below. Make changes and run "git status" after each step to see how the output changes.',
    ],
    trainerNotes: 'Run git status obsessively! Students should run it before and after every command. Color-code the output categories on a whiteboard: red = not staged, green = staged. This builds the habit of checking before committing.',
  },
  {
    id: 'diffs',
    title: 'Understanding Diffs',
    subtitle: 'See exactly what changed, line by line',
    widgetId: 'factory-line',
    content: [
      '"git diff" shows you exactly what changed in your files, line by line. Lines starting with + are additions, lines with - are removals.',
      'Plain "git diff" shows unstaged changes (working dir vs index). "git diff --staged" shows what you\'re about to commit (index vs last commit).',
      'Try editing a file below and running "git diff" to see the changes before staging them.',
    ],
    trainerNotes: 'Diffs are the foundation of code review. Show how + and - lines correspond to actual changes. Demonstrate the difference between "git diff" and "git diff --staged". This is a great time to explain why staging exists — you can review before committing.',
  },
  {
    id: 'branches',
    title: 'Branches',
    subtitle: 'Parallel timelines for your code',
    widgetId: 'branch-maze',
    content: [
      'Branches let you work on different things in parallel without affecting each other. Think of them as parallel timelines — each branch has its own version of the project.',
      '"git switch -c feature/name" creates a new branch and switches to it. Commits you make only exist on that branch until you merge.',
      'Try the Branch Maze below: create a feature branch, make a change, and watch the commit graph show your parallel timeline!',
    ],
    trainerNotes: 'Draw a tree diagram on the whiteboard. Show how branches diverge from a common point. Emphasize that branches are just pointers to commits — they\'re lightweight! Demonstrate "git branch" to list all branches.',
  },
  {
    id: 'merging',
    title: 'Merging',
    subtitle: 'Bringing branches back together',
    widgetId: 'branch-maze',
    content: [
      'Merging combines the work from one branch into another. When you run "git merge feature/x" on main, Git brings all the feature commits into main.',
      'If the changes don\'t overlap, Git merges automatically. If they do overlap, you get a merge conflict (more on that next!).',
      'Complete the Branch Maze: create a branch, commit changes, switch back to main, and merge your branch in.',
    ],
    trainerNotes: 'Show the commit graph before and after merge. Explain fast-forward vs merge commit. This is a good time to introduce the feature branch workflow: branch → commit → switch back → merge → delete branch.',
  },
  {
    id: 'conflicts',
    title: "Conflicts (Don't Panic!)",
    subtitle: 'When two branches change the same line',
    widgetId: 'merge-conflict',
    content: [
      'A merge conflict happens when two branches change the same line in a file. Git can\'t decide which version to keep, so it asks you.',
      'Conflict markers look like: <<<<<<< HEAD (your version), ======= (separator), >>>>>>> branch (their version). You edit the file to keep what you want and remove the markers.',
      'Try the Escape Room below: merge a branch that conflicts, resolve it calmly, and commit the resolution.',
    ],
    trainerNotes: 'CRITICAL: Normalize conflicts! They\'re not errors — they\'re questions. Walk through the markers slowly. Have students practice identifying "their" vs "our" changes. Emphasize: resolve → add → commit. Never panic!',
  },
  {
    id: 'undo-safely',
    title: 'Undo Safely',
    subtitle: 'Restore, unstage, and fix mistakes without fear',
    widgetId: 'undo-wizard',
    content: [
      'Everyone makes mistakes. Git gives you safe undo tools: "git restore <file>" discards working directory changes, and "git restore --staged <file>" unstages files.',
      'These are safe because they don\'t rewrite history. Avoid "git reset --hard" as a beginner — it\'s destructive and hard to undo.',
      'Practice the undo flow below: edit → stage → unstage → discard. End with a clean working tree.',
    ],
    trainerNotes: 'Draw the undo paths on the whiteboard: restore (index→working), restore --staged (HEAD→index). Emphasize SAFE vs DANGEROUS undo commands. In beginner mode, we block dangerous commands for a reason!',
  },
  {
    id: 'mini-workflow',
    title: 'Mini Workflow',
    subtitle: 'Branch → Commit → Merge — the full cycle',
    widgetId: 'branch-maze',
    content: [
      'Now let\'s put it all together! The feature branch workflow is the most common Git pattern: create a branch, make commits, merge back to main.',
      'This workflow keeps main stable while you experiment on branches. It\'s used by teams of all sizes, from solo developers to large organizations.',
      'Complete the full cycle in the playground below. Watch the commit graph build up as you work!',
    ],
    trainerNotes: 'This is the capstone lesson. Students should be able to do the full workflow without hints. Time them! Good benchmark: under 2 minutes for branch → edit → add → commit → switch → merge. Discuss: when would you create a branch in real projects?',
  },
  {
    id: 'challenge-day',
    title: 'Challenge Day',
    subtitle: 'Test everything you\'ve learned',
    widgetId: 'factory-line',
    content: [
      'Congratulations on making it this far! 🎉 It\'s time to test your knowledge.',
      'Go through the playground gallery and try each widget without using hints. Can you complete them all?',
      'Remember: git status is your best friend, commit messages matter, and conflicts are just questions — not errors!',
    ],
    trainerNotes: 'Challenge mode! Set a timer for each widget. Create a leaderboard on the whiteboard. Award badges for: fastest completion, best commit message, calmest conflict resolution. Make it fun! Consider pairing students for collaborative challenges.',
  },
];
