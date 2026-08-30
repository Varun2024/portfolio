import richDetailAndMcp from './rich-detail-page-and-mcp.md?raw'
import refactorPass from './refactor-pass-when-and-when-not.md?raw'
import communityReports from './community-reports-seeding-curve.md?raw'
import lifecycleChart from './zero-js-svg-lifecycle-chart.md?raw'
import notesUseServer from './personal-notes-use-server-gotcha.md?raw'
import savedFilters from './saved-filters-url-as-state.md?raw'
import compactIds from './compact-identifiers-and-details.md?raw'
import whatsNew from './whats-new-changelog-and-rss.md?raw'
import readme from './readme-as-product-page.md?raw'
import perProgramRss from './per-program-rss-free-what-they-gate.md?raw'
import contentHash from './content-hash-short-circuit.md?raw'
import batchScraping from './batch-scraping-2900-pages.md?raw'
import scraperDebt from './accepting-scraper-maintenance-debt.md?raw'
import dataFreeUpgrades from './data-free-upgrades-look-what-you-have.md?raw'
import roadmapAfter from './roadmap-after-competitor-analysis.md?raw'

// Newest first. Each entry is a build log with a real angle worth writing,
// derived from bountyindex.in's progress.md.
export const posts = [
    {
        slug: 'rich-detail-page-and-mcp',
        title: 'The richer detail page you already had the data for',
        excerpt: 'Ingest was done months ago. The UI just wasn\'t asking hard enough questions yet. Also: what MCP for your product actually looks like.',
        date: '2026-08-31',
        project: 'BountyIndex',
        readMinutes: 4,
        content: richDetailAndMcp,
    },
    {
        slug: 'refactor-pass-when-and-when-not',
        title: 'When to refactor, and when to leave the copy-paste alone',
        excerpt: 'Six features in two days, then a four-commit cleanup. The harder discipline was recognising which abstractions not to extract.',
        date: '2026-08-10',
        project: 'BountyIndex',
        readMinutes: 4,
        content: refactorPass,
    },
    {
        slug: 'community-reports-seeding-curve',
        title: 'Shipping a community feature before the community exists',
        excerpt: 'Peer-sourced response-time tracking on day one, with zero reports. The empty state is the funnel.',
        date: '2026-08-10',
        project: 'BountyIndex',
        readMinutes: 3,
        content: communityReports,
    },
    {
        slug: 'zero-js-svg-lifecycle-chart',
        title: '180 lines of SVG, no chart library, no client JS',
        excerpt: 'A per-program lifecycle chart that server-renders and uses native <title> tooltips. What Recharts would have added, and why I didn\'t need it.',
        date: '2026-08-10',
        project: 'BountyIndex',
        readMinutes: 4,
        content: lifecycleChart,
    },
    {
        slug: 'personal-notes-use-server-gotcha',
        title: 'The "use server" gotcha that only bites on production build',
        excerpt: 'Server actions files can only export async functions. Constants and types break the compiler. Plus: why no localStorage fallback on account-tied features.',
        date: '2026-08-10',
        project: 'BountyIndex',
        readMinutes: 3,
        content: notesUseServer,
    },
    {
        slug: 'saved-filters-url-as-state',
        title: 'URL as state, then named presets on top',
        excerpt: 'When your querystring is your state store, "save this filter" is just "name this URL." Plus: window.prompt is the correct MVP.',
        date: '2026-08-10',
        project: 'BountyIndex',
        readMinutes: 3,
        content: savedFilters,
    },
    {
        slug: 'compact-identifiers-and-details',
        title: 'Truncating URLs and addresses without hiding what matters',
        excerpt: 'Long URLs and hex addresses need shortening, but the tail is where the meaning lives. Plus: how much native <details> can do.',
        date: '2026-08-09',
        project: 'BountyIndex',
        readMinutes: 3,
        content: compactIds,
    },
    {
        slug: 'whats-new-changelog-and-rss',
        title: 'A daily changelog from sparse snapshots, in one query',
        excerpt: 'Snapshots only get written on hash change — so every snapshot IS a change. That constraint made the changelog trivial. Plus: why RSS beats email.',
        date: '2026-08-09',
        project: 'BountyIndex',
        readMinutes: 4,
        content: whatsNew,
    },
    {
        slug: 'readme-as-product-page',
        title: 'Your README is your first product page',
        excerpt: 'Every visitor to a public repo is a potential user. If the README reads like a wiki, the visit ends there.',
        date: '2026-08-09',
        project: 'BountyIndex',
        readMinutes: 3,
        content: readme,
    },
    {
        slug: 'per-program-rss-free-what-they-gate',
        title: 'Free what your competitor gates',
        excerpt: 'When you\'re the small player, your competitor\'s pricing page is your feature list. Plus: a small Next.js catch-all routing trap.',
        date: '2026-08-09',
        project: 'BountyIndex',
        readMinutes: 3,
        content: perProgramRss,
    },
    {
        slug: 'content-hash-short-circuit',
        title: 'Fitting a 400s scrape inside Vercel Hobby\'s 300s cap',
        excerpt: 'A content-hash short-circuit skips both stages of an ingest job when nothing actually changed. The pattern generalises to any incremental sync.',
        date: '2026-08-09',
        project: 'BountyIndex',
        readMinutes: 4,
        content: contentHash,
    },
    {
        slug: 'batch-scraping-2900-pages',
        title: 'Scraping 2,900 pages politely',
        excerpt: 'Concurrency caps, delete-and-reinsert for state cleanliness, and never letting a foreign taxonomy leak into your schema.',
        date: '2026-08-08',
        project: 'BountyIndex',
        readMinutes: 4,
        content: batchScraping,
    },
    {
        slug: 'accepting-scraper-maintenance-debt',
        title: 'When to accept permanent scraper maintenance debt',
        excerpt: 'The tradeoff calculus for a solo builder: accept maintenance debt for coverage that changes your positioning. Reject it for coverage that just widens a list.',
        date: '2026-08-08',
        project: 'BountyIndex',
        readMinutes: 3,
        content: scraperDebt,
    },
    {
        slug: 'data-free-upgrades-look-what-you-have',
        title: 'Two upgrades that made program pages feel alive',
        excerpt: 'Real favicons and a 7-day activity chip — both using data that was already in the database. Walk your own schema every quarter.',
        date: '2026-08-08',
        project: 'BountyIndex',
        readMinutes: 3,
        content: dataFreeUpgrades,
    },
    {
        slug: 'roadmap-after-competitor-analysis',
        title: 'Rewriting your roadmap after studying a direct competitor',
        excerpt: 'Compete, cede, or outflank — the three positions to take on every feature your competitor ships. Plus: why "Never" is the most useful column on a roadmap.',
        date: '2026-08-08',
        project: 'BountyIndex',
        readMinutes: 3,
        content: roadmapAfter,
    },
]

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)
