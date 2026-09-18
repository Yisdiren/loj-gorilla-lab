# LoJ Gorilla Lab

A browser-based testing lab for **Lands of Jail** Gorilla formations.

## Beta v0.4
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
