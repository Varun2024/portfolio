import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import Navbar from '../section/Navbar'
import Footer from '../section/Footer'
import Starfield from '../components/Starfield'
import { getPostBySlug, posts } from '../content/logs/index.js'

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

marked.setOptions({ gfm: true, breaks: false })

const LogPost = () => {
    const { slug } = useParams()
    const post = getPostBySlug(slug)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!post) return
        document.title = `${post.title} · Varun`

        // Per-post meta description for search snippets
        const metaDescId = 'meta-description-dyn'
        let metaDesc = document.getElementById(metaDescId)
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.name = 'description'
            metaDesc.id = metaDescId
            document.head.appendChild(metaDesc)
        }
        metaDesc.content = post.excerpt || post.title

        // BlogPosting JSON-LD so AI engines can cite the article
        const scriptId = 'blogposting-ldjson'
        let script = document.getElementById(scriptId)
        if (!script) {
            script = document.createElement('script')
            script.type = 'application/ld+json'
            script.id = scriptId
            document.head.appendChild(script)
        }
        const url = `https://varuncodes.tech/logs/${post.slug}`
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${url}#post`,
            headline: post.title,
            description: post.excerpt,
            url,
            datePublished: post.date,
            dateModified: post.date,
            author: { '@id': 'https://varuncodes.tech/#person' },
            publisher: { '@id': 'https://varuncodes.tech/#organization' },
            mainEntityOfPage: url,
            inLanguage: 'en',
            keywords: post.project ? [post.project] : undefined,
            isPartOf: { '@id': 'https://varuncodes.tech/logs#blog' },
        })

        return () => {
            script?.remove()
            metaDesc?.remove()
        }
    }, [post])

    const html = useMemo(() => {
        if (!post) return ''
        // Strip leading '# Title' since the page header already renders it.
        const stripped = post.content.replace(/^#\s+.*\n+/, '')
        return marked.parse(stripped)
    }, [post])

    if (!post) return <Navigate to="/logs" replace />

    const idx = posts.findIndex((p) => p.slug === slug)
    const prev = idx < posts.length - 1 ? posts[idx + 1] : null
    const next = idx > 0 ? posts[idx - 1] : null

    return (
        <div className="container mx-auto max-w-7xl">
            <Starfield />
            <Navbar />
            <main className="c-space pt-32 pb-24 min-h-screen">
                <article className="mx-auto max-w-2xl">
                    <Link
                        to="/logs"
                        className="inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors"
                    >
                        <span aria-hidden="true">←</span> All logs
                    </Link>

                    <header className="mt-8 border-b border-white/10 pb-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white/45">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span aria-hidden="true" className="text-white/20">·</span>
                            <span>{post.project}</span>
                            <span aria-hidden="true" className="text-white/20">·</span>
                            <span>{post.readMinutes} min read</span>
                        </div>
                        <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>
                    </header>

                    <div
                        className="log-prose mt-10"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                    <nav className="mt-16 border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3 justify-between">
                        {prev ? (
                            <Link
                                to={`/logs/${prev.slug}`}
                                className="group flex-1 py-3 sm:py-4 -mx-3 px-3 rounded-md hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="text-[11px] text-white/40">← Older</div>
                                <div className="mt-1 text-sm text-white/85 group-hover:text-white transition-colors line-clamp-1">
                                    {prev.title}
                                </div>
                            </Link>
                        ) : <div className="flex-1" />}
                        {next ? (
                            <Link
                                to={`/logs/${next.slug}`}
                                className="group flex-1 py-3 sm:py-4 -mx-3 px-3 rounded-md hover:bg-white/[0.02] transition-colors sm:text-right"
                            >
                                <div className="text-[11px] text-white/40">Newer →</div>
                                <div className="mt-1 text-sm text-white/85 group-hover:text-white transition-colors line-clamp-1">
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
