# LoJ Gorilla Lab

A browser-based testing lab for **Lands of Jail** Gorilla formations.

## Beta v0.40
- Select Gorilla type
- Enter account/server and march capacity
- Build Shield/Bomber/Shooter ratios
- Automatic troop-count calculation
- Record heroes and robots
- Log up to five damage hits
- Automatic best, average, and total damage
- Save experiment history in browser local storage
- Track the highest recorded setup for each Gorilla\n- Show Gorilla-specific reference ratios from prior Stiletto testing when no account result exists\n- Reference ratios are explicitly treated as starting points, not universal recommendations

This project is designed to stay account-specific: the goal is to help each player discover what performs best on their own account rather than assume one universal formation.

Created for community testing by **Stiletto**.

- Experiment Mode suggests the next nearby untested ratio
- Suggestions prioritize the selected Gorilla
- Uses the player's best average as the baseline when available
- Falls back to a reference ratio only when the player has no saved result
- One-click Apply Ratio button

- Filter experiment history by all Gorillas or the selected Gorilla
- Show hit spread (highest minus lowest) to spot inconsistent tests
- Export all saved experiments to JSON
- Import and merge Gorilla Lab JSON backups

- Saves player, server, and march capacity as a persistent local profile
- Adds a Gorilla leaderboard with best average and best single hit per Gorilla
- Keeps Gorilla records separate so one event does not distort another

- Adds test-quality analytics for the live five-hit set
- Flags high or moderate hit variance
- Shows hit spread as both damage and percentage of average
- Compares the current test average against the selected Gorilla's personal best
- Rewards complete, consistent five-hit tests with a stronger quality state

- Adds New 5-Hit Set to clear hit results while keeping the active setup
- Adds Load Personal Best for the selected Gorilla
- Adds CSV export for spreadsheet analysis
- Keeps JSON backup/export support for full-fidelity data migration

- Adds Top Tested Ratios for the selected Gorilla
- Groups repeated runs of the same ratio together
- Ranks ratios by mean test average, then best single hit
- Shows how many saved tests support each ranked ratio

- Robots are enabled only for Cyber Gorilla and Gorilla Warlord
- Robot inputs are hidden for Space, Wise, Primal, and Armed Gorilla
- Non-robot Gorilla tests always save an empty robot list to prevent contaminated data
- Loading a personal best respects the selected Gorilla's robot eligibility

- Adds experiment change classification: ratio, hero, robot, war skill, mixed, or baseline
- Adds change-detail notes for controlled testing
- Shows the changed variable in experiment history
- Includes change metadata in CSV exports

- Adds controlled comparison between the latest two tests for the selected Gorilla
- Calculates absolute and percentage change in average damage
- Automatically detects ratio, hero, robot, and march-capacity changes
- Makes accidental multi-variable tests easier to identify

- Grades comparisons as control, clean controlled, mixed, or confounded
- Warns when multiple setup variables change at once

- Adds evidence strength to ranked ratios based on repeated saved tests
- Encourages repeat testing before treating a ratio as established

- Experiment Mode can skip unsuitable suggested ratios
- Skipped ratios stay out of the current Gorilla sweep
- Reset Sweep restores skipped suggestions without deleting test history

- Adds account-wide testing coverage summary
- Shows how many of the six Gorillas have saved experiments
- Tracks total experiments and complete five-hit sets

- Adds a testing-priority recommendation based on evidence gaps
- Prioritizes the Gorilla with the fewest complete five-hit sets
- Helps spread testing across all six Gorilla events instead of over-testing one event

- Adds repeatability analysis for repeated tests of the same ratio
- Shows the range between saved test averages and its percentage of the mean

- Adds testing milestones at 5, 10, 25, 50, and 100 saved experiments
- Milestones provide a quick view of how mature an account's Gorilla dataset is

- Adds #1 vs #2 ratio gap analysis
- Flags close races where more repeat testing is especially useful

- Adds one-click Load #1 Ratio for the selected Gorilla
- Loads the current leading ratio into the formation controls and clears old hit values for a fresh test

- Adds hero-impact callout to controlled comparisons
- Surfaces average-damage movement when a hero lineup change is detected

- Adds dedicated war-skill impact analysis
- Shows absolute and percentage average-damage change for tagged war-skill experiments

- Adds robot-impact analysis exclusively for Cyber Gorilla and Gorilla Warlord
- Robot comparison stays hidden for Space, Wise, Primal, and Armed Gorilla

- Adds experiment-type breakdown across the account dataset
- Counts ratio, hero, robot, war-skill, mixed, and baseline experiments separately

- Adds a dataset-health indicator based on five-hit completeness and clean experiment tagging
- Helps identify when the Lab needs better-quality data before drawing stronger account-specific conclusions

- Adds data-quality warnings for partial, mixed-variable, and legacy/untagged tests

- Adds per-Gorilla progress bars based on complete five-hit sets
- Makes evidence gaps across the six Gorilla events visible at a glance

- Adds stability analysis for the currently leading ratio
- Labels repeated leader results as stable, moderate variation, or high variation

- Adds Experiment Mode sweep progress
- Shows how many nearby candidate ratios have already been tested or skipped

- Adds Experiment Guard to warn when the current hero lineup differs from the latest saved setup
- Helps prevent ratio tests from being interpreted as clean comparisons when another major variable changed

### Beta v0.31 — Five-hit completion badge
- Adds a live complete/partial badge beside test quality.

### Beta v0.32 — Best-hit delta
- Shows current best-hit difference from the selected Gorilla personal record.

### Beta v0.33 — Average delta
- Shows current average difference from the selected Gorilla personal record.

### Beta v0.34 — Ratio test counter
- Shows how many times the active ratio has already been saved.

### Beta v0.35 — Duplicate-test awareness
- Warns when the same Gorilla, ratio, heroes, and robots have prior tests.

### Beta v0.36 — Robot guard expansion
- Experiment Guard also checks robot drift for Cyber and Warlord.

### Beta v0.37 — Capacity guard
- Experiment Guard detects march-capacity drift from the latest saved test.

### Beta v0.38 — Clean-test summary
- Adds a count of clean single-variable experiments to dataset coverage.

### Beta v0.39 — Five-hit completion rate
- Adds account-wide percentage of experiments with all five hits.

### Beta v0.40 — Gorilla completion rate
- Adds selected-Gorilla five-hit completion percentage.
