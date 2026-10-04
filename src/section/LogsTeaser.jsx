import { Link } from 'react-router-dom'
import { posts } from '../content/logs/index.js'

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const LogsTeaser = () => {
    const latest = posts[0]
    if (!latest) return null

    return (
        <section aria-labelledby="logs-teaser-heading" className="c-space mt-16 sm:mt-24">
            <div className="mx-auto max-w-6xl border-t border-white/10 pt-6">
                <Link
                    to={`/logs/${latest.slug}`}
                    className="group flex items-center gap-5 sm:gap-6 py-4 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-lg transition-colors duration-200 hover:bg-white/[0.02]"
                >
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 text-[12px] text-white/45">
                            <span>Latest log</span>
                            <span aria-hidden="true" className="text-white/20">·</span>
                            <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                            <span aria-hidden="true" className="text-white/20">·</span>
                            <span>{latest.project}</span>
                        </div>
                        <h2
                            id="logs-teaser-heading"
                            className="mt-1.5 text-lg sm:text-xl font-medium text-white leading-snug"
                        >
                            {latest.title}
                        </h2>
                        <p className="mt-1 text-[14px] text-white/60 leading-relaxed line-clamp-1">
                            {latest.excerpt}
                        </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-4 text-[12px] text-white/50">
                        <span className="hidden sm:inline">All {posts.length} logs</span>
                        <svg
                            width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default LogsTeaser
