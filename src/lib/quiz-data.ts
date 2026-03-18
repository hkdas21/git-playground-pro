export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate';
  topic: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does "git init" do?',
    options: [
      'Downloads a repository from the internet',
      'Creates a new empty Git repository',
      'Commits all your files',
      'Connects to GitHub',
    ],
    correctIndex: 1,
    explanation: '"git init" creates a new .git directory in your project, initializing an empty repository.',
    difficulty: 'beginner',
    topic: 'Basics',
  },
  {
    id: 'q2',
    question: 'Which area does "git add" move files to?',
    options: [
      'The repository',
      'The working directory',
      'The staging area (index)',
      'The remote server',
    ],
    correctIndex: 2,
    explanation: '"git add" moves changes from the working directory to the staging area, preparing them for a commit.',
    difficulty: 'beginner',
    topic: 'Staging',
  },
  {
    id: 'q3',
    question: 'What is the correct order of the Git workflow?',
    options: [
      'commit → add → push',
      'add → commit → edit',
      'edit → add → commit',
      'commit → edit → add',
    ],
    correctIndex: 2,
    explanation: 'The basic Git workflow is: edit files → git add (stage) → git commit (save snapshot).',
    difficulty: 'beginner',
    topic: 'Basics',
  },
  {
    id: 'q4',
    question: 'What does a red file in "git status" mean?',
    options: [
      'The file has been deleted',
      'The file has an error',
      'The file is modified but NOT staged',
      'The file is staged and ready to commit',
    ],
    correctIndex: 2,
    explanation: 'Red files in git status are either modified (not staged) or untracked. Green files are staged.',
    difficulty: 'beginner',
    topic: 'Status',
  },
  {
    id: 'q5',
    question: 'What does "git diff" show?',
    options: [
      'The difference between your local repo and GitHub',
      'Unstaged changes (working directory vs staging area)',
      'All commits ever made',
      'The list of branches',
    ],
    correctIndex: 1,
    explanation: '"git diff" shows line-by-line changes between your working directory and the staging area.',
    difficulty: 'beginner',
    topic: 'Diff',
  },
  {
    id: 'q6',
    question: 'What does "git diff --staged" show?',
    options: [
      'Changes you haven\'t saved yet',
      'Changes between working directory and staging area',
      'Changes staged for the next commit (index vs last commit)',
      'Differences between two branches',
    ],
    correctIndex: 2,
    explanation: '"git diff --staged" shows what is about to be committed — the diff between the index and the last commit.',
    difficulty: 'intermediate',
    topic: 'Diff',
  },
  {
    id: 'q7',
    question: 'What is a branch in Git?',
    options: [
      'A copy of your entire project folder',
      'A lightweight movable pointer to a commit',
      'A backup saved on GitHub',
      'A type of merge conflict',
    ],
    correctIndex: 1,
    explanation: 'A branch is simply a pointer (reference) to a specific commit. Creating a branch is very fast and cheap.',
    difficulty: 'intermediate',
    topic: 'Branching',
  },
  {
    id: 'q8',
    question: 'How do you create AND switch to a new branch in one command?',
    options: [
      'git branch new-branch && git switch new-branch',
      'git switch -c new-branch',
      'git checkout new-branch',
      'git create new-branch',
    ],
    correctIndex: 1,
    explanation: '"git switch -c <name>" creates a new branch and switches to it in one step.',
    difficulty: 'intermediate',
    topic: 'Branching',
  },
  {
    id: 'q9',
    question: 'When does a merge conflict occur?',
    options: [
      'When you forget to run git add',
      'When two branches modify the same lines in a file',
      'When you have too many commits',
      'When a file is too large',
    ],
    correctIndex: 1,
    explanation: 'Conflicts happen when Git can\'t auto-merge because both branches changed the same part of a file.',
    difficulty: 'intermediate',
    topic: 'Merging',
  },
  {
    id: 'q10',
    question: 'What do the <<<<<<< HEAD markers in a file indicate?',
    options: [
      'A syntax error in your code',
      'The beginning of your current branch\'s version in a conflict',
      'A commit message template',
      'An encrypted section of the file',
    ],
    correctIndex: 1,
    explanation: '<<<<<<< HEAD marks the start of your branch\'s changes. ======= divides the two versions. >>>>>>> marks the end of the incoming branch\'s changes.',
    difficulty: 'intermediate',
    topic: 'Merging',
  },
  {
    id: 'q11',
    question: 'What does "git restore <file>" do?',
    options: [
      'Deletes the file permanently',
      'Unstages the file',
      'Discards working directory changes (reverts to staged/committed version)',
      'Restores a deleted branch',
    ],
    correctIndex: 2,
    explanation: '"git restore <file>" discards changes in your working directory, reverting the file to its staged or last committed state.',
    difficulty: 'beginner',
    topic: 'Undoing',
  },
  {
    id: 'q12',
    question: 'What does "git restore --staged <file>" do?',
    options: [
      'Deletes the file from the repository',
      'Moves the file from staging area back to modified (unstages it)',
      'Restores the file from the last commit',
      'Stages the file',
    ],
    correctIndex: 1,
    explanation: '"git restore --staged" unstages a file — the changes remain in your working directory, they\'re just no longer marked for the next commit.',
    difficulty: 'beginner',
    topic: 'Undoing',
  },
  {
    id: 'q13',
    question: 'What is the staging area used for?',
    options: [
      'Storing your project permanently',
      'Reviewing code with your team',
      'Preparing a specific set of changes for the next commit',
      'Connecting to a remote repository',
    ],
    correctIndex: 2,
    explanation: 'The staging area lets you selectively choose which changes go into your next commit, rather than committing everything at once.',
    difficulty: 'beginner',
    topic: 'Basics',
  },
  {
    id: 'q14',
    question: 'Which commit message follows best practices?',
    options: [
      '"updated stuff"',
      '"fix: resolve login button alignment on mobile"',
      '"asdfghjk"',
      '"changes"',
    ],
    correctIndex: 1,
    explanation: 'Good commit messages use a type prefix (fix:, feat:, docs:), imperative mood, and describe the specific change.',
    difficulty: 'beginner',
    topic: 'Commits',
  },
  {
    id: 'q15',
    question: 'What does "git stash" do?',
    options: [
      'Deletes all uncommitted changes',
      'Saves uncommitted changes to a temporary stack and cleans working directory',
      'Creates a new branch',
      'Pushes changes to the remote',
    ],
    correctIndex: 1,
    explanation: '"git stash" temporarily shelves your uncommitted changes so you can work on something else, then re-apply them later with "git stash pop".',
    difficulty: 'intermediate',
    topic: 'Stash',
  },
  {
    id: 'q16',
    question: 'What does .gitignore do?',
    options: [
      'Deletes files from your computer',
      'Hides files from other developers',
      'Tells Git which files/patterns to ignore (not track)',
      'Encrypts sensitive files',
    ],
    correctIndex: 2,
    explanation: '.gitignore is a special file listing patterns of files that Git should not track — like node_modules/, .env, build outputs, etc.',
    difficulty: 'beginner',
    topic: 'Gitignore',
  },
  {
    id: 'q17',
    question: 'After resolving a merge conflict, what do you do next?',
    options: [
      'Run git merge again',
      'Delete the branch',
      'Run git add <file> then git commit',
      'Run git restore <file>',
    ],
    correctIndex: 2,
    explanation: 'After manually editing the file to resolve conflicts, you stage it with "git add" and then finalize with "git commit".',
    difficulty: 'intermediate',
    topic: 'Merging',
  },
  {
    id: 'q18',
    question: 'What does "git log --oneline" display?',
    options: [
      'Only the most recent commit',
      'Each commit on one line: short hash + message',
      'The diff of every commit',
      'A list of branches',
    ],
    correctIndex: 1,
    explanation: '"git log --oneline" gives a compact view showing each commit\'s abbreviated hash and commit message on a single line.',
    difficulty: 'beginner',
    topic: 'Log',
  },
];

const QUIZ_STORAGE_KEY = 'git-trainer-quiz';

export interface QuizResult {
  score: number;
  total: number;
  completedAt: string;
  answers: Record<string, number>;
}

export function saveQuizResult(result: QuizResult) {
  const history = getQuizHistory();
  history.push(result);
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(history));
}

export function getQuizHistory(): QuizResult[] {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
