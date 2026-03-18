

## Problem

When a learner clicks a Play scenario, they land directly in the terminal widget with only a one-line goal message (`🎯 ...`). There is no explanation of:
- What Git concept the activity teaches
- What the starting state of the repo looks like
- Step-by-step instructions on what to do
- Which commands are available to them

## Solution: Add an Instructions Panel to Each Scenario

### 1. Extend the Scenario data model

Add a new `instructions` field to each scenario in `src/lib/scenarios.ts`:

```ts
instructions: string[];  // ordered steps the learner should follow
conceptSummary: string;  // 2-3 sentence explanation of the Git concept being practiced
```

For example, Factory Line would get:
- **conceptSummary**: "Git tracks your code in 3 places: Working Directory (where you edit), Staging Area (where you prepare), and Repository (where snapshots are saved). This activity walks you through that flow."
- **instructions**: ["Open index.html and change the heading text", "Run git status to see what changed", "Run git add . to stage your change", "Run git commit -m '...' to save it"]

### 2. Add an Instructions sidebar/panel to WidgetShell

In `src/components/widget/WidgetShell.tsx`, add a collapsible "Instructions" panel that displays:
- The concept summary at the top
- Numbered steps from the `instructions` array
- The list of allowed commands as a quick reference
- A "Got it, let's go!" button to collapse the panel (or it stays visible as a sidebar)

The panel will be **open by default** on first load and collapsible via a toggle button in the header. State stored in component state (not localStorage — it should show every time you start fresh).

### 3. Add an intro overlay on WidgetPage

Before the learner interacts with the terminal, show a brief intro card on `WidgetPage.tsx` with:
- Scenario title and difficulty badge
- Concept summary
- Goal description
- "Start" button that dismisses the overlay

This gives learners context before they see the full terminal UI.

### 4. Update all 10 scenarios with content

Add `conceptSummary` and `instructions` arrays to all 10 existing scenarios covering: Factory Line, Commit Message Arcade, Status Explorer, Diff Detective, Branch Maze, Merge Conflict Escape Room, Undo Wizard, Gitignore Guardian, Stash & Switch, Log Detective.

### Implementation order

1. Update `Scenario` interface with new fields
2. Add content to all 10 scenarios
3. Build the intro overlay on `WidgetPage`
4. Add the collapsible instructions sidebar in `WidgetShell`

