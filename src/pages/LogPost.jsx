import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import Navbar from '../section/Navbar'
import Footer from '../section/Footer'
import Starfield from '../components/Starfield'
import { getPostBySlug, posts } from '../content/logs/index.js'

const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

marked.setOptions({ gfm: true, breaks: false })

const LogPost = () => {
    const { slug } = useParams()
    const post = getPostBySlug(slug)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (post) document.title = `${post.title} — Varun`
    }, [post])

    const html = useMemo(() => (post ? marked.parse(post.content) : ''), [post])

    if (!post) return <Navigate to="/logs" replace />

    const idx = posts.findIndex((p) => p.slug === slug)
    const prev = idx < posts.length - 1 ? posts[idx + 1] : null
    const next = idx > 0 ? posts[idx - 1] : null

    return (
        <div className="container mx-auto max-w-7xl">
            <Starfield />
            <Navbar />
            <main className="px-4 sm:px-6 pt-32 pb-24 min-h-screen">
                <article className="mx-auto max-w-2xl">
                    <Link
                        to="/logs"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-[var(--color-aqua)] transition-colors"
                    >
                        <span aria-hidden="true">←</span> all logs
                    </Link>

                    <header className="mt-8">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span aria-hidden="true">·</span>
                            <span className="text-[var(--color-aqua)]/80">{post.project}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.readMinutes} min read</span>
                        </div>
                        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.1]">
                            {post.title}
                        </h1>
                    </header>

                    <div
                        className="log-prose mt-10"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                    <nav className="mt-16 flex flex-col sm:flex-row gap-4 justify-between border-t border-white/10 pt-8">
                        {prev ? (
                            <Link
                                to={`/logs/${prev.slug}`}
                                className="group flex-1 rounded-lg border border-white/10 p-4 hover:border-[var(--color-aqua)]/40 transition"
                            >
                                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Older</div>
                                <div className="mt-1 text-sm text-white group-hover:text-[var(--color-aqua)] transition-colors">
                                    {prev.title}
                                </div>
                            </Link>
                        ) : <div className="flex-1" />}
                        {next ? (
                            <Link
                                to={`/logs/${next.slug}`}
                                className="group flex-1 rounded-lg border border-white/10 p-4 hover:border-[var(--color-aqua)]/40 transition sm:text-right"
                            >
                                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Newer</div>
                                <div className="mt-1 text-sm text-white group-hover:text-[var(--color-aqua)] transition-colors">
                                    {next.title}
                                </div>
                            </Link>
                        ) : <div className="flex-1" />}
                    </nav>
                </article>
            </main>
            <Footer />
        </div>
    )
}

export default LogPost
