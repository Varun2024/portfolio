# The richer detail page you already had the data for

The ingest was done months ago. Every bug bounty program on BountyIndex has scope history, snapshot diffs, and community response reports sitting in Postgres. What was missing wasn't data — it was the UI actually asking hard enough questions.

This week's pass added four sections to every program page, and every one of them queries data that was already there.

**AtAGlance** — a strip of four tiles: median first-response time from community reports, scope split (web / mobile / smart contract / other), the top asset-type mix, and how long ago the program last changed anything. Four numbers, one query each, no new tables.

**RecentChanges** — walks the existing snapshot array for the last five non-empty diffs. Since snapshots only get written on hash change, every snapshot in the window *is* a change. The query is a `slice(-5)` after a filter.

**SimilarPrograms** — a new `getSimilarPrograms` query that ranks other programs by count of shared in-scope identifiers. Fails open (returns nothing on error) so a bad match never blocks the page render. Turns out "programs that share scope with this one" is a much better recommendation than any tag-based system I would have built.

**CopyScope** — a client button that dumps newline-separated in-scope identifiers to the clipboard. Paste into Burp, Caido, or nuclei. Zero server work; the data is already on the page.

Skipped: per-severity reward tables (not in upstream data), full policy body (fragile to scrape, link out instead), hall of fame (nice-to-have, not moat).

## Then: MCP for the same queries

Locked the next feature in `PLAN_MCP_AND_DETAIL.md`: a stateless MCP server at `POST /api/mcp` via `@vercel/mcp-adapter`. No KV, no Redis, no paid add-ons. Public beta at `/mcp` from day one with per-IP rate limiting.

The v1 tool list is eight tools — and every single one wraps the same query function the detail page uses. `get_program`, `list_programs`, `search_scope`, `get_recent_changes`, etc. If the UI can answer it, the MCP server can answer it. No new query layer, no new business logic. Auth'd v1.1 adds a `user_mcp_tokens` table and a dashboard for issuing tokens.

The lesson from both halves of this week: before you build a new feature, look at what your ingest already knows. And when you build an MCP server, make it a thin wrapper on the queries your product already runs.
