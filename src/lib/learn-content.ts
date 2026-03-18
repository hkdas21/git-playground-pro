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
      'Imagine a factory with 3 rooms. Your Working Directory is the workshop — where you physically edit files. The Staging Area is the quality-check conveyor belt — where you prepare and review changes before shipping. The Repository is the warehouse — where finished snapshots are stored permanently.',
      'This mental model is the #1 most important concept in Git. Every single Git command moves data between these three places. Once you understand this flow, everything else clicks.',
      'In the playground below, you have a tiny website with index.html and style.css. Your mission: change the heading from "Hello World" to "Hello Git". Watch the pipeline visualization above the terminal — it shows exactly where your files are as you edit, stage, and commit.',
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
      'A commit is a snapshot of your entire project at one moment in time — like a save point in a video game. You can always travel back to any commit later.',
      'But commits aren\'t just snapshots — they\'re also communication. Your commit message tells your future self and your teammates what changed and why. "fix stuff" tells no one anything. "fix: prevent login button from submitting twice" tells a clear story.',
      'In this playground, you have a project TODO list. Your mission: check off a completed task and add a new one, then write a commit message that clearly describes what you did.',
      '💡 Follow the convention: start with a type (feat:, fix:, docs:, chore:), use imperative mood ("add" not "added"), and keep it under 50 characters.',
    ],
    trainerNotes: 'Activity: Have students write commit messages, then read them aloud without seeing the code. Can the class guess what changed? If not, the message needs improvement.\n\nConventional commits format: type(scope): subject\n• feat: — new feature\n• fix: — bug fix\n• docs: — documentation\n• chore: — maintenance\n• style: — formatting\n\nBad examples to discuss: "update", "WIP", "asdf", "fix bug", "changes"',
  },
  {
    id: 'reading-status',
    title: 'Reading git status',
    subtitle: 'Your GPS inside Git',
    widgetId: 'status-explorer',
    content: [
      '"git status" is the single most useful Git command. It tells you everything: which branch you\'re on, which files changed, which are staged, and which are untracked. Run it obsessively — before and after every operation.',
      'Files appear in different categories:\n🔴 Modified (red) — changed but not staged\n🟢 Staged (green) — ready to be committed\n⚪ Untracked — new files Git doesn\'t know about yet',
      'In this playground, you have a photo gallery project with 3 files. Your mission: create a situation where you have files in different states at the same time — edit two files, but only stage one. Then read the git status output to understand what\'s happening.',
      '💡 Key insight: "git add gallery.html" stages just that file. "git add ." stages everything. Being selective about what you stage gives you precise control over your commits.',
    ],
    trainerNotes: 'This lesson uses a DIFFERENT widget from Lesson 1 — students work with a multi-file project to see mixed states.\n\nExercise: After students stage one file, ask them to predict what git status will show before running it. This builds intuition.\n\nKey teaching moment: The difference between "git add ." (stage all) and "git add <file>" (stage one). Selective staging is a superpower — it lets you make atomic commits.',
  },
  {
    id: 'diffs',
    title: 'Understanding Diffs',
    subtitle: 'See exactly what changed, line by line',
    widgetId: 'diff-detective',
    content: [
      '"git diff" is like a detective\'s magnifying glass — it shows you exactly what changed in your files, line by line. Lines starting with - (red) were removed. Lines starting with + (green) were added. Lines with no prefix are unchanged context.',
      'There are two flavors: "git diff" shows unstaged changes (what you\'ve edited but haven\'t staged yet). "git diff --staged" shows what\'s about to go into your next commit.',
      'In this playground, you have a server configuration file. Your mission: make two separate sets of changes, committing each one individually. Use "git diff" before each commit to review exactly what you\'re about to save — this is the habit that prevents bugs.',
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
      'Branches are parallel timelines. Imagine you\'re writing a recipe — the main branch is the published version. You create a "feature/toppings" branch to experiment with a toppings section. Your experiment doesn\'t affect the published recipe until you explicitly merge it back.',
      'When you switch branches, your files actually change! The working directory updates to match that branch\'s latest commit. This is why Git feels like time travel.',
      'In this playground, you have a pancake recipe. Your mission: create a "feature/toppings" branch, add a toppings section, commit it, switch back to main (notice the toppings disappear!), then merge the branch to bring them back.',
      '💡 Branches in Git are incredibly lightweight — they\'re just a pointer to a commit. Create them freely, for every feature, bug fix, or experiment.',
    ],
    trainerNotes: 'Critical teaching moment: After students switch back to main, ask them to open recipe.md. "Where did the toppings go?!" This demonstrates that branches are isolated timelines.\n\nDraw a tree diagram on the whiteboard showing the branch point and merge.\n\nNaming convention: feature/x, fix/x, docs/x. Branches should have descriptive names.',
  },
  {
    id: 'merging',
    title: 'Merging',
    subtitle: 'Bringing branches back together',
    widgetId: 'branch-maze',
    content: [
      'Merging is how you combine work from different branches. When you run "git merge feature/toppings" while on main, Git takes all the commits from the feature branch and integrates them into main.',
      'If the changes don\'t overlap (different files or different parts of the same file), Git merges automatically — this is called a "fast-forward" or "recursive" merge. If changes DO overlap on the same lines, you get a merge conflict (don\'t worry, we\'ll cover that next!).',
      'Use the Branch Maze playground to practice the complete feature branch workflow: branch → edit → commit → switch back → merge. Watch the commit graph on the right — you\'ll see the branches diverge and come back together.',
      '💡 The feature branch workflow is used by virtually every professional team: main stays stable while features are developed in isolation on branches.',
    ],
    trainerNotes: 'This is the same widget as Lesson 5 (branches), giving students a chance to practice the same workflow with more confidence.\n\nDiscuss: Fast-forward merge vs. merge commit. When there\'s no divergence, Git just moves the pointer forward (fast-forward). When both branches have unique commits, Git creates a merge commit.\n\nTeam workflow: branch → commit → push → pull request → code review → merge. This lesson covers the local Git part of that flow.',
  },
  {
    id: 'conflicts',
    title: "Conflicts (Don't Panic!)",
    subtitle: 'When two people change the same line',
    widgetId: 'merge-conflict',
    content: [
      'A merge conflict happens when two branches change the same line in a file. Git can\'t read your mind to decide which version is correct, so it asks you to choose. Conflicts are NOT errors — they\'re just questions.',
      'Git marks conflicts with special markers in your file:\n<<<<<<< HEAD (your current branch\'s version)\n======= (divider)\n>>>>>>> branch-name (the incoming branch\'s version)\n\nYour job: edit the file to create the final version you want, remove all the markers, then stage and commit.',
      'In this playground, two chefs (Alice and Bob) both updated the restaurant menu on different branches. Alice changed the main course to salmon; Bob changed it to beef wellington. When you merge, Git doesn\'t know which dish to serve! You decide.',
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
      'Everyone makes mistakes — Git gives you safe ways to undo them. The key word is "safe": these commands won\'t destroy your commit history or lose other people\'s work.',
      'Two commands to remember:\n"git restore <file>" — discards changes in your working directory (reverts to the staged or committed version)\n"git restore --staged <file>" — unstages a file (but keeps your changes in the working directory)',
      'In this playground, you have app settings and secrets files. Practice the full undo cycle: edit a file → stage it → unstage it → discard the change entirely. End with a clean working tree.',
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
      'Time to put it all together! The feature branch workflow is the most common pattern in professional Git usage. Every feature, bug fix, and experiment gets its own branch.',
      'The complete cycle:\n1. git switch -c feature/name — create your branch\n2. Make changes and commit (possibly multiple commits)\n3. git switch main — go back to main\n4. git merge feature/name — integrate your work',
      'This keeps main stable at all times. If your experiment fails, just delete the branch — main is untouched. If it succeeds, merge it in.',
      '🏆 Challenge: Complete the full workflow in under 2 minutes! Create a branch, add content, commit with a good message, switch back, and merge.',
    ],
    trainerNotes: 'This is the capstone exercise. Students should be able to do the full workflow without hints by now.\n\nTiming challenge: Under 2 minutes is a good benchmark. Under 1 minute is expert level.\n\nDiscussion: "When should you create a branch?" → Any time you\'re about to change something. Branches are free! Even for tiny changes, the habit of branching prevents accidents on main.\n\nExtension: What happens after merge? In real workflows: delete the feature branch (git branch -d feature/name).',
  },
  {
    id: 'challenge-day',
    title: 'Challenge Day',
    subtitle: 'Test everything you\'ve learned',
    widgetId: 'factory-line',
    content: [
      'Congratulations on completing all the lessons! 🎉 Now it\'s time to prove your skills.',
      'Go to the Play page and try each widget without using hints. Track your best times on the Progress page. Can you complete all 7 scenarios?',
      'Key skills to demonstrate:\n✅ Edit → add → commit (the fundamental flow)\n✅ Read git status and git diff fluently\n✅ Create and merge branches\n✅ Resolve merge conflicts calmly\n✅ Undo mistakes safely with restore',
      '🏆 Bonus challenge: Try to write commit messages so clear that a teammate could understand your entire session just by reading "git log --oneline".',
    ],
    trainerNotes: 'Challenge Day structure:\n\n1. Individual round: Each student works through all widgets, timed\n2. Pair round: Students pair up — one gives instructions, the other types. Swap roles.\n3. Debrief: Show git log from a few students. Discuss whose commit messages tell the best story.\n\nLeaderboard categories:\n⚡ Speed — fastest completion\n📝 Best Messages — clearest commit history\n🧘 Calm Resolver — most composed conflict resolution\n🎯 Precision — fewest wasted commands\n\nReminder: This is a celebration of learning, not a competition. Everyone who got here has leveled up!',
  },
];
