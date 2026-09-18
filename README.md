# LoJ Gorilla Lab

A browser-based testing lab for **Lands of Jail** Gorilla formations.

## Beta v0.14
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
