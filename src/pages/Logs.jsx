import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../section/Navbar'
import Footer from '../section/Footer'
import Starfield from '../components/Starfield'
import SectionHeading from '../components/SectionHeading'
import { posts } from '../content/logs/index.js'

const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const Logs = () => {
    useEffect(() => {
        document.title = 'Build Logs — Varun'
    }, [])

    return (
        <div className="container mx-auto max-w-7xl">
            <Starfield />
            <Navbar />
            <main className="px-4 sm:px-6 pt-32 pb-24 min-h-screen">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-aqua)]/70">
                        {`// mission_logs`}
                    </div>
                    <SectionHeading size="hero">Build logs</SectionHeading>
                    <p className="mt-6 text-neutral-400 max-w-xl leading-relaxed">
                        Notes from shipping real things. Decisions, tradeoffs, and the occasional
                        gotcha — one entry per feature or notable call.
                    </p>

                    <ul className="mt-14 space-y-6">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    to={`/logs/${post.slug}`}
                                    className="group block rounded-lg border border-white/10 bg-white/[0.02] p-6 transition hover:border-[var(--color-aqua)]/40 hover:bg-white/[0.04]"
                                >
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                                        <span aria-hidden="true">·</span>
                                        <span className="text-[var(--color-aqua)]/80">{post.project}</span>
                                        <span aria-hidden="true">·</span>
                                        <span>{post.readMinutes} min read</span>
                                    </div>
                                    <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white group-hover:text-[var(--color-aqua)] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 text-neutral-400 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-aqua)]/80 group-hover:text-[var(--color-aqua)]">
                                        Read log
                                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Logs
