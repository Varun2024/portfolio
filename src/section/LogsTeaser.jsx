import { Link } from 'react-router-dom'
import { posts } from '../content/logs/index.js'

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const LogsTeaser = () => {
    const latest = posts.slice(0, 3)
    if (!latest.length) return null

    return (
        <section id="logs" aria-labelledby="logs-teaser-heading" className="c-space section-spacing">
            <div className="mx-auto w-full max-w-6xl">
                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                    <h2
                        id="logs-teaser-heading"
                        className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none tracking-tight"
                    >
                        From the logs
                    </h2>
                    <Link
                        to="/logs"
                        className="group inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white transition pb-1"
                    >
                        All {posts.length}
                        <svg
                            width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                <ul className="mt-6 divide-y divide-white/[0.06]">
                    {latest.map((post) => (
                        <li key={post.slug}>
                            <Link
                                to={`/logs/${post.slug}`}
                                className="group flex items-start gap-5 sm:gap-6 py-5 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-lg transition-colors duration-200 hover:bg-white/[0.02]"
                            >
                                <time
                                    dateTime={post.date}
                                    className="shrink-0 w-20 sm:w-24 pt-1 font-mono text-[11px] text-white/85"
                                >
                                    {formatDate(post.date)}
                                </time>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base sm:text-lg font-medium text-white leading-snug group-hover:text-white transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-1 text-[14px] text-white/85 leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3 text-[11px] text-white/60">
                                        <span>{post.project}</span>
                                        <span aria-hidden="true" className="text-white/20">·</span>
                                        <span>{post.readMinutes} min read</span>
                                    </div>
                                </div>
                                <svg
                                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                    className="shrink-0 mt-2 text-white/25 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
                                    aria-hidden="true"
                                >
                                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default LogsTeaser
