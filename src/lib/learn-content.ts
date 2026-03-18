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
      'Imagine a factory with 3 rooms. Your Working Directory is the workshop, the Staging Area is the quality-check conveyor belt, and the Repository is the warehouse.',
      'Steps:\n1. Open index.html in the file editor\n2. Change "Hello World" to "Hello Git" and click Save\n3. Run git status — notice the file is modified (red)\n4. Run git add index.html to move it to staging (green)\n5. Run git status again — the file is now staged\n6. Run git commit -m "feat: update heading" to store the snapshot\n7. Run git status one more time — everything is clean',
      '💡 Pro tip: Run "git status" after every step. It\'s your GPS — it always tells you where things are.',
    ],
    trainerNotes: 'Key exercise: After each command, ask students "Where is the file now?" and point at the pipeline. The visual reinforcement is critical.\n\nCommon misconception: Students think "save" and "commit" are the same. Emphasize: Save = edit working directory. Add = move to staging. Commit = store in repository.\n\nExtension: Ask students to edit style.css too, but only commit index.html. This shows selective staging.',
  },
  {
    id: 'first-commit',
    title: 'Your First Commit',
    subtitle: 'Snapshots and storytelling with messages',
    widgetId: 'commit-message-arcade',
    content: [
      'A commit is a snapshot of your entire project at one moment — like a save point in a video game. Your commit message tells your future self and teammates what changed.',
      'Steps:\n1. Open todo.md in the file editor\n2. Mark a task as done by changing "[ ]" to "[x]"\n3. Add a new task line at the bottom\n4. Click Save to write your changes\n5. Run git add todo.md\n6. Run git commit -m "feat: complete task and add new item"\n7. Run git log to see your commit in the history',
      '💡 Follow the convention: start with a type (feat:, fix:, docs:), use imperative mood ("add" not "added"), and keep it under 50 characters.',
    ],
    trainerNotes: 'Activity: Have students write commit messages, then read them aloud without seeing the code. Can the class guess what changed? If not, the message needs improvement.\n\nConventional commits format: type(scope): subject\n• feat: — new feature\n• fix: — bug fix\n• docs: — documentation\n• chore: — maintenance\n• style: — formatting\n\nBad examples to discuss: "update", "WIP", "asdf", "fix bug", "changes"',
  },
  {
    id: 'reading-status',
    title: 'Reading git status',
    subtitle: 'Your GPS inside Git',
    widgetId: 'status-explorer',
    content: [
      '"git status" tells you everything: which branch you\'re on, which files changed, which are staged, and which are untracked.',
      'Steps:\n1. Run git status — everything starts clean\n2. Open gallery.html and add a new image tag, then Save\n3. Open styles.css and change a color value, then Save\n4. Run git status — both files should appear as modified (red)\n5. Run git add gallery.html (stage only one file)\n6. Run git status — gallery.html is green (staged), styles.css is still red\n7. Commit only gallery.html with git commit -m "feat: add new image"',
      '💡 Key insight: "git add gallery.html" stages just that file. "git add ." stages everything. Being selective gives you precise control over your commits.',
    ],
    trainerNotes: 'This lesson uses a DIFFERENT widget from Lesson 1 — students work with a multi-file project to see mixed states.\n\nExercise: After students stage one file, ask them to predict what git status will show before running it. This builds intuition.\n\nKey teaching moment: The difference between "git add ." (stage all) and "git add <file>" (stage one). Selective staging is a superpower — it lets you make atomic commits.',
  },
  {
    id: 'diffs',
    title: 'Understanding Diffs',
    subtitle: 'See exactly what changed, line by line',
    widgetId: 'diff-detective',
    content: [
      '"git diff" shows you exactly what changed in your files. Lines starting with - were removed, lines starting with + were added.',
      'Steps:\n1. Open config.json and change the port number from 3000 to 8080\n2. Click Save\n3. Run git diff — see the - (old) and + (new) lines\n4. Run git add config.json\n5. Run git diff --staged — now you see staged changes\n6. Run git commit -m "fix: update server port"\n7. Open server.js, make a small change, and repeat the cycle',
      '💡 In real-world development, you\'ll review diffs hundreds of times — in pull requests, code reviews, and debugging. Start building the habit now.',
    ],
    trainerNotes: 'This uses a dedicated "Diff Detective" widget with config.json and server.js — completely different from Lesson 1.\n\nExercise: Change two things in config.json, stage and commit them separately. Students learn to make atomic, focused commits.\n\nDiscussion: "Why not just commit everything at once?" → Atomic commits make it easier to find bugs (git bisect), review changes, and revert specific features.',
  },
  {
    id: 'branches',
    title: 'Branches',
    subtitle: 'Parallel timelines for your code',
    widgetId: 'branch-maze',
    content: [
      'Branches are parallel timelines. The main branch is your published version — you create feature branches to experiment safely without affecting main.',
      'Steps:\n1. Run git log to see the current commit on main\n2. Run git switch -c feature/toppings to create a new branch\n3. Open recipe.md and add a "Toppings" section at the bottom\n4. Click Save\n5. Run git add recipe.md\n6. Run git commit -m "feat: add toppings section"\n7. Run git switch main — notice the toppings disappear from recipe.md!\n8. Run git switch feature/toppings — the toppings are back!',
      '💡 Branches in Git are incredibly lightweight — they\'re just a pointer to a commit. Create them freely for every feature, bug fix, or experiment.',
    ],
    trainerNotes: 'Critical teaching moment: After students switch back to main, ask them to open recipe.md. "Where did the toppings go?!" This demonstrates that branches are isolated timelines.\n\nDraw a tree diagram on the whiteboard showing the branch point and merge.\n\nNaming convention: feature/x, fix/x, docs/x. Branches should have descriptive names.',
  },
  {
    id: 'merging',
    title: 'Merging',
    subtitle: 'Bringing branches back together',
    widgetId: 'branch-maze',
    content: [
      'Merging combines work from different branches back into one. This lesson focuses on the merge step — bringing a completed feature branch home to main.',
      'Steps:\n1. You start on main — run git log to see the current history\n2. Run git switch -c feature/sauce to create a new branch\n3. Open recipe.md and add a "Sauce" section (e.g. "Maple syrup drizzle")\n4. Save, then run git add recipe.md\n5. Run git commit -m "feat: add sauce instructions"\n6. Run git switch main — confirm the sauce section is gone\n7. Run git merge feature/sauce — watch the commit graph update!\n8. Open recipe.md — the sauce section is now on main',
      '💡 The feature branch workflow is used by every professional team: main stays stable while features are developed in isolation, then merged back when ready.',
    ],
    trainerNotes: 'Key difference from Lesson 5: Students already understand branching. This lesson focuses on the MERGE step and reading the commit graph.\n\nDiscuss: Fast-forward merge vs. merge commit. When there\'s no divergence, Git just moves the pointer forward (fast-forward). When both branches have unique commits, Git creates a merge commit.\n\nTeam workflow: branch → commit → push → pull request → code review → merge. This lesson covers the local Git part of that flow.',
  },
  {
    id: 'conflicts',
    title: "Conflicts (Don't Panic!)",
    subtitle: 'When two people change the same line',
    widgetId: 'merge-conflict',
    content: [
      'A merge conflict happens when two branches change the same line. Git asks you to choose which version to keep. Conflicts are NOT errors — they\'re just questions.',
      'Steps:\n1. You start on the main branch with a restaurant menu.txt\n2. Run git merge feature/chef-alice to merge Alice\'s changes\n3. Git will report a CONFLICT — don\'t panic!\n4. Open menu.txt — find the <<<<<<< HEAD and >>>>>>> markers\n5. Edit the file: choose one version or combine both dishes\n6. Delete ALL conflict markers (<<<, ===, >>>)\n7. Run git add menu.txt\n8. Run git commit -m "fix: resolve menu conflict"',
      '💡 Conflicts are a normal part of teamwork. Stay calm, read both versions, pick the best one (or combine them), remove the markers, and commit.',
    ],
    trainerNotes: 'MOST IMPORTANT LESSON to normalize: Conflicts are NOT scary. They\'re questions, not errors.\n\nThe restaurant menu metaphor makes this relatable. Students should:\n1. Run git merge feature/chef-alice\n2. Open menu.txt and find the markers\n3. Edit to keep whichever dishes they prefer\n4. Remove ALL markers (<<<, ===, >>>)\n5. git add menu.txt → git commit\n\nCommon mistakes: forgetting to remove markers, not staging after resolving, panicking and running git merge --abort. Let them struggle a bit before hinting.',
  },
  {
    id: 'undo-safely',
    title: 'Undo Safely',
    subtitle: 'Fix mistakes without fear',
    widgetId: 'undo-wizard',
    content: [
      'Everyone makes mistakes — Git gives you safe ways to undo them without destroying your commit history.',
      'Steps:\n1. Open settings.yaml and delete one of the settings lines\n2. Click Save — you\'ve made a "mistake" in the working directory\n3. Run git status — settings.yaml shows as modified\n4. Run git restore settings.yaml — the file is restored to its committed state!\n5. Now edit settings.yaml again and run git add settings.yaml\n6. Run git restore --staged settings.yaml — the file is unstaged but your edit stays\n7. Run git restore settings.yaml again to fully discard the change',
      '⚠️ Commands we block in beginner mode: "git reset --hard" (can lose uncommitted work) and "git rebase" (rewrites history). The "restore" commands are always safe.',
    ],
    trainerNotes: 'Draw the undo paths:\n\n  Committed ←restore--staged← Staged ←restore← Working\n\nStudents should internalize:\n• restore = undo working changes\n• restore --staged = undo staging\n\nReal-world scenario: "I staged the wrong file" → git restore --staged file\n"I messed up this file and want to start over" → git restore file\n\nDISCUSS: Why is reset --hard dangerous? It discards ALL uncommitted changes with no undo. Restore is surgical — one file at a time.',
  },
  {
    id: 'mini-workflow',
    title: 'Mini Workflow',
    subtitle: 'Branch → Commit → Merge — the full cycle',
    widgetId: 'branch-maze',
    content: [
      'Time to put it all together! The feature branch workflow is the most common pattern in professional Git usage.',
      'Steps:\n1. Run git switch -c feature/garnish to create a new branch\n2. Open recipe.md and add a garnish section\n3. Click Save\n4. Run git add recipe.md\n5. Run git commit -m "feat: add garnish ideas"\n6. Run git switch main\n7. Run git merge feature/garnish\n8. Verify recipe.md on main now has the garnish section',
      '🏆 Challenge: Complete the full workflow in under 2 minutes! Under 1 minute is expert level.',
    ],
    trainerNotes: 'This is the capstone exercise. Students should be able to do the full workflow without hints by now.\n\nTiming challenge: Under 2 minutes is a good benchmark. Under 1 minute is expert level.\n\nDiscussion: "When should you create a branch?" → Any time you\'re about to change something. Branches are free! Even for tiny changes, the habit of branching prevents accidents on main.\n\nExtension: What happens after merge? In real workflows: delete the feature branch (git branch -d feature/name).',
  },
  {
    id: 'challenge-day',
    title: 'Challenge Day',
    subtitle: 'Test everything you\'ve learned',
    widgetId: 'factory-line',
    content: [
      'Congratulations on completing all the lessons! 🎉 Now prove your skills.',
      'Steps:\n1. Go to the Play page and try each widget without using hints\n2. Track your best times on the Progress page\n3. Complete all 7 scenarios\n4. Write commit messages so clear that a teammate could understand your session from git log --oneline alone',
      'Skills checklist:\n✅ Edit → add → commit (the fundamental flow)\n✅ Read git status and git diff fluently\n✅ Create and merge branches\n✅ Resolve merge conflicts calmly\n✅ Undo mistakes safely with restore',
    ],
    trainerNotes: 'Challenge Day structure:\n\n1. Individual round: Each student works through all widgets, timed\n2. Pair round: Students pair up — one gives instructions, the other types. Swap roles.\n3. Debrief: Show git log from a few students. Discuss whose commit messages tell the best story.\n\nLeaderboard categories:\n⚡ Speed — fastest completion\n📝 Best Messages — clearest commit history\n🧘 Calm Resolver — most composed conflict resolution\n🎯 Precision — fewest wasted commands\n\nReminder: This is a celebration of learning, not a competition. Everyone who got here has leveled up!',
  },
];
