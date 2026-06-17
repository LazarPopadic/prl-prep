# PRL Prep

A private-ish (unlisted, `noindex`) lead tracker for Lazar's cold-email outreach to
École Polytechnique / IP Paris / Paris-Saclay research groups, for an informal
Sept–Dec 2026 Semester-5 research experience.

- **Live:** https://lazarpopadic.github.io/prl-prep/
- Plain HTML/CSS/JS, no build tools. Push to `main` → GitHub Pages auto-deploys.

## How it works
- `js/data.js` — all content: the six active leads (from `PRL_researcher_response_context.docx`)
  plus the wider verified contact roster. Edit this file to add/change leads.
- `js/app.js` — renders expandable cards, filters/sorting, and saves your edits
  (status, priority, next action, notes, last-updated) in the browser (localStorage).
- `css/style.css` — dark theme shared with the Masters Dashboard, violet accent.
- Use **Export / Import** (top bar) to back up or move your edits between browsers.

## Notes
- Honesty rule: nothing is invented — unknown fields render as “unknown”.
- "from contact map" cards are pre-loaded from the verified outreach list; their status is a
  starting value (confirm whether each was actually emailed).
- It's **public but unlisted** (robots `Disallow` + `noindex`). It contains researchers' names and
  reply summaries — keep the link private. To make it truly private later, reuse the Masters
  Dashboard's encrypt-at-rest model.
- When you change `index.html`/`css`/`js`, bump the `?v=` query on the asset links so browsers fetch fresh files.
