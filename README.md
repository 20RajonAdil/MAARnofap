# MAAR NO FAP

A private, science-based personal recovery and habit-tracking system focused on behavioral psychology, self-control, and long-term habit change.

Built as a single self-contained HTML file — no backend, no accounts, no servers. Everything runs and stays in your browser.

## Live demo

If hosted via GitHub Pages, your link will look like:

```
https://20rajonadil.github.io/MAARnofap/
```

Replace the placeholder above with your actual GitHub Pages URL once it's enabled (**Settings → Pages** in your repo).

## Features

- **Onboarding assessment** — a behavioral-science-inspired questionnaire that generates a personalized recovery profile and dependency index
- **Daily Command Center** — streak, longest streak, recovery score, rank, and one-tap daily logging
- **Relapse reflection** — a calm, non-judgmental flow that captures trigger, emotional state, time, location, and context after a slip
- **Recovery Radar** — daily mood / stress / energy / urge / sleep sliders that predict relapse risk and surface preventive suggestions
- **Progress charts** — daily, weekly, and trajectory visualizations rendered with no external chart library
- **Trigger Intelligence** — automatic pattern detection across logged relapses (activates after 3+ entries)
- **Personal journal** — private daily reflections
- **Recovery Coach** — insights generated from your own logged data, not generic quotes
- **Milestone timeline** and a **downloadable recovery report**

## Getting started

1. Download `maar-no-fap.html` from this repo.
2. Open it directly in any modern browser — double-click the file, or drag it into a browser tab.
3. (Optional) Enable GitHub Pages on this repo to get a shareable link.

No installation, build step, or server required.

## Data & privacy

All data is stored locally in your browser via `localStorage`. There is no backend and nothing is ever sent over the network.

This also means:
- Data does **not** sync across devices or browsers — each browser/device has its own independent copy.
- Clearing your browser's site data will permanently erase your history (use the in-app **Download Report** feature as a manual backup).
- Anyone else who opens this link gets their own blank, independent copy — they can't see your data, and you can't see theirs.

## Disclaimer

This tool uses self-reported data and basic heuristics to estimate patterns and risk. It is **not** a clinical or diagnostic instrument. If patterns feel unmanageable on your own, consider speaking with a therapist or counselor experienced in compulsive behavior.

## Tech

Plain HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies.

## License

All rights reserved. See [LICENSE.md](LICENSE.md) — no use, copying, modification, or distribution is permitted without explicit written permission from the copyright holder. The source being visible in this repository does not grant any rights to it.
