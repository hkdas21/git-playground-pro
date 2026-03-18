

## Problem

Learn lessons and Play activities are nearly identical — same scenarios, same seed files, same exercises. The Learn page for "Git is 3 Places" embeds the `factory-line` scenario widget, and the Play page for "Factory Line" uses the exact same scenario. A learner doing both is just repeating the same task twice.

## Differentiation Strategy

**Learn = Guided Tutorial** — Read theory first, then practice with hand-holding. The widget is embedded below explanatory content. Steps are always visible. No pressure.

**Play = Challenge Mode** — Test yourself. Different tasks, a timer, a command efficiency score, and star ratings. Instructions are hidden behind a "Need a hint?" button. You prove you've learned the concept.

## Concrete Changes

### 1. Create alternate "challenge" variants for Play scenarios

Instead of having Play reuse the same seed files and goals as Learn, give each Play scenario a **different task** that tests the same concept:

| Concept | Learn task | Play challenge (new) |
|---|---|---|
| 3 Places | Change heading in index.html | Add a new `about.html` file, stage only it (not style.css changes), commit |
| Commit Messages | Edit todo.md, commit | Fix 3 deliberate problems across 2 files, make 2 separate well-named commits |
| Status | Stage one file selectively | Start with 4 modified files, stage and commit them in 2 logical groups |
| Diffs | Change port in config.json | Find and fix a bug by reading the diff output, then commit the fix |
| Branches | Create branch, add toppings | Create 2 feature branches, commit different changes to each |
| Merging | Create and merge one branch | Merge 2 branches sequentially into main |
| Conflicts | Resolve menu conflict | Resolve a 3-way conflict combining both contributions creatively |
| Undo | Restore a mistaken edit | Stage wrong files, unstage them, then restore one while keeping another |
| Gitignore | Ignore node_modules and .env | Start with 6 files, 3 should be ignored — figure out which ones |
| Stash | Basic stash and pop | Stash, switch branches, hotfix, switch back, pop, resolve |

### 2. Add Challenge Mode UI to Play (WidgetPage)

- **Prominent countdown timer** (from timebox) displayed in the header bar
- **Command counter** — track how many commands the user runs
- **Star rating** on completion:
  - 3 stars: completed under timebox with minimal commands
  - 2 stars: completed under timebox
  - 1 star: completed (over time)
- **Instructions hidden** — replace the always-visible InstructionsPanel with a "Need a hint?" button that reveals one hint at a time (using existing hints array)

### 3. Simplify Learn widget experience

- **Remove the InstructionsPanel** from WidgetShell when used in Learn context (the lesson page already has its own steps above the widget)
- **Remove timer** from Learn widgets — no time pressure
- Pass a `mode` prop to WidgetShell: `"learn"` vs `"play"`

### 4. Update WidgetShell with mode awareness

Add a `mode?: 'learn' | 'play'` prop:
- `learn` mode: No timer display, no command counter, no star rating, instructions panel hidden (lesson content serves that role)
- `play` mode: Timer visible, command counter active, star rating on completion, hints behind button

### 5. Update scenarios data structure

Add a `challengeVariant` field (or create separate challenge scenario entries) with different `seedFiles`, `goalDescription`, and `successChecks` for Play mode, while keeping the original as the Learn version.

## Implementation Order

1. Add `mode` prop to `WidgetShell` and `LearnPage` passes `mode="learn"`, `WidgetPage` passes `mode="play"`
2. Create challenge variants for all 10 scenarios (different seed files, goals, checks)
3. Build star rating and command counter into WidgetShell play mode
4. Replace InstructionsPanel in play mode with progressive hint reveals
5. Add countdown timer to play mode header
6. Update completion storage to save star rating alongside time

## Scope

This touches: `scenarios.ts` (challenge variants), `WidgetShell.tsx` (mode prop, timer, stars, command counter), `WidgetPage.tsx` (play mode UI), `LearnPage.tsx` (learn mode), `InstructionsPanel.tsx` (hint mode), and `progress.ts` (star storage).

