# Head-to-Head Wins Matrix (Sports Reference Internship Prompt)

This repo renders a head-to-head wins matrix from a JSON dataset, similar to the "head-to-head wins" tables seen on Sports Reference sites.

## What it does
- Loads `data.json`
- Uses JavaScript to build an HTML `<table>` that:
  - Has team abbreviations across the top and bottom
  - Has team abbreviations down the left side
  - Shows `--` on the diagonal
  - Shows row-team wins vs column-team in each cell

## Data format (`data.json`)
```json
{
  "teams": ["BRO", "BSN", "..."],
  "wins": {
    "BRO": { "BSN": 10, "CHC": 15 },
    "BSN": { "BRO": 12 }
  }
}
