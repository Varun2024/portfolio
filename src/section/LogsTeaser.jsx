import { Link } from 'react-router-dom'
import { posts } from '../content/logs/index.js'

const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const LogsTeaser = () => {
    const latest = posts[0]
    if (!latest) return null

    return (
        <section aria-labelledby="logs-teaser-heading" className="my-16 sm:my-24 px-4 sm:px-6">
            <Link
                to={`/logs/${latest.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-[var(--color-aqua)]/25 bg-gradient-to-br from-[var(--color-aqua)]/[0.06] via-transparent to-transparent p-6 sm:p-8 transition hover:border-[var(--color-aqua)]/60 hover:from-[var(--color-aqua)]/[0.1]"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[var(--color-aqua)]/10 blur-3xl opacity-70 transition group-hover:opacity-100"
                />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-aqua)]/80">
                            <span className="inline-flex items-center gap-2">
                                <span className="relative inline-flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-aqua)] opacity-70" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-aqua)]" />
                                </span>
                                {`// latest_log`}
                            </span>
                            <span aria-hidden="true" className="text-neutral-600">·</span>
                            <time dateTime={latest.date} className="text-neutral-500">{formatDate(latest.date)}</time>
                            <span aria-hidden="true" className="text-neutral-600">·</span>
                            <span className="text-neutral-500">{latest.project}</span>
                        </div>
                        <h2
                            id="logs-teaser-heading"
                            className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-snug group-hover:text-[var(--color-aqua)] transition-colors"
                        >
                            {latest.title}
                        </h2>
                        <p className="mt-2 text-neutral-400 leading-relaxed sm:text-[15px] line-clamp-2">
                            {latest.excerpt}
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                            {posts.length} logs
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-4 py-2 font-mono text-sm text-[var(--color-aqua)] transition group-hover:border-[var(--color-aqua)]/70 group-hover:bg-[var(--color-aqua)]/20">
                            Read log
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                        </span>
                    </div>
                </div>
            </Link>
        </section>
    )
}

export default LogsTeaser
