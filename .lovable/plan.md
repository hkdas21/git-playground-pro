

## Analysis of Current State

The app is a solid interactive Git learning platform with:
- **7 scenarios** covering: add/commit, commit messages, status, diff, branching, merge conflicts, undo
- **10 lesson pages** with trainer notes
- **Git engine** supporting: init, status, add, commit, log, diff, branch, switch, merge, restore
- **Trainer tools**: freeze, hints, timer, debrief
- **Progress tracking** via localStorage

### What's Missing

**Gap 1 — No advanced scenarios.** All scenarios are beginner/intermediate. Nothing covers `git log` exploration, multi-branch workflows, or `.gitignore`.

**Gap 2 — No quiz/assessment mode.** Everything is hands-on terminal work. There's no way to test conceptual understanding (e.g., "what does `git add .` do?").

**Gap 3 — No `.gitignore` lesson.** A critical real-world concept entirely absent.

**Gap 4 — No stash support.** `git stash` is a common beginner need, not in the engine.

**Gap 5 — No leaderboard or social element.** Progress is local-only. The Challenge Day lesson mentions a leaderboard but none exists.

**Gap 6 — Play page doesn't show completion status.** Unlike the Progress page, the Play page cards don't indicate which scenarios you've already completed.

**Gap 7 — No "cheat sheet" or reference page.** Students have no quick-reference for commands they've learned.

---

## Proposed Improvements

### 1. Add 3 New Scenarios

**a) `.gitignore` Guardian (beginner)**
- Seed files include `app.js`, `node_modules/lib.js`, `.env` with secrets
- Goal: Create a `.gitignore` file that excludes `node_modules/` and `.env`, then commit only safe files
- Requires adding `gitignore` support to the engine (skip files matching patterns during `git add .`)

**b) Stash & Switch (intermediate)**
- Working on a feature branch with uncommitted changes, need to switch to main for a hotfix
- Goal: `git stash`, switch to main, make a fix, switch back, `git stash pop`
- Requires adding `stash` and `stash pop` commands to the engine

**c) Log Detective (intermediate)**
- Pre-scripted repo with 5+ commits across 2 branches
- Goal: Use `git log --oneline`, find a specific commit by message, and create a branch from the current state
- Tests log-reading and branch creation skills

### 2. Add a Quiz Mode Page

A new `/quiz` route with multiple-choice questions organized by topic:
- Questions like "Which area does `git add` move files to?" with 4 options
- 15-20 questions across beginner/intermediate levels
- Score tracking saved to localStorage alongside widget progress
- Questions pulled from a static data file (similar to `learn-content.ts`)

### 3. Add Git Cheat Sheet Page

A new `/cheatsheet` route with a printable, organized reference:
- Commands grouped by category (basics, branching, undoing, inspecting)
- Each command shows syntax + one-line description
- Responsive grid layout, printer-friendly styles

### 4. Show Completion Badges on Play Page

Update `Play.tsx` to read from `getAllCompletions()` and show a green checkmark + best time on completed scenario cards.

### 5. Add `.gitignore` Support to Git Engine

Extend `GitEngine`:
- New `gitignorePatterns: string[]` field parsed from `.gitignore` file content
- `addCmd` with `.` argument skips files matching ignore patterns
- `statusCmd` excludes ignored files from "untracked"

### 6. Add `stash` Commands to Git Engine

Extend `GitEngine`:
- `stash` command: saves working directory diff to a stack, restores index state
- `stash pop`: re-applies the top stash entry
- Simple stack-based implementation (array of snapshots)

---

## Implementation Order

1. **Show completion badges on Play page** — small, high-impact UI improvement
2. **Git Cheat Sheet page** — static content, no engine changes needed
3. **Quiz Mode page** — new page + data file, no engine changes
4. **`.gitignore` support + scenario** — engine enhancement + new scenario
5. **`stash` support + scenario** — engine enhancement + new scenario
6. **Log Detective scenario** — uses existing engine, just a new scenario with richer pre-script

This is approximately 6 implementation steps. Each is self-contained and can be shipped incrementally.

