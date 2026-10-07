import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../section/Navbar'
import Footer from '../section/Footer'
import Starfield from '../components/Starfield'
import { posts } from '../content/logs/index.js'

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const Logs = () => {
    useEffect(() => {
        document.title = 'Build Logs · Varun'

        // Blog + itemListElement so AI engines see every post from one hop
        const scriptId = 'blog-list-ldjson'
        let script = document.getElementById(scriptId)
        if (!script) {
            script = document.createElement('script')
            script.type = 'application/ld+json'
            script.id = scriptId
            document.head.appendChild(script)
        }
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': 'https://varuncodes.tech/logs#blog',
            url: 'https://varuncodes.tech/logs',
            name: 'Build logs by Varun Shukla',
            description: 'Engineering decisions, tradeoffs, and debugging stories from shipping real products.',
            author: { '@id': 'https://varuncodes.tech/#person' },
            publisher: { '@id': 'https://varuncodes.tech/#organization' },
            blogPost: posts.map((p) => ({
                '@type': 'BlogPosting',
                '@id': `https://varuncodes.tech/logs/${p.slug}#post`,
                url: `https://varuncodes.tech/logs/${p.slug}`,
                headline: p.title,
                description: p.excerpt,
                datePublished: p.date,
                author: { '@id': 'https://varuncodes.tech/#person' },
            })),
        })

        return () => script?.remove()
    }, [])

    return (
        <div className="container mx-auto max-w-7xl">
            <Starfield />
            <Navbar />
            <main className="c-space pt-32 pb-24 min-h-screen">
                <div className="mx-auto max-w-3xl">
                    <header className="border-b border-white/10 pb-6">
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-none tracking-tight">
                            Build logs
                        </h1>
                        <p className="mt-5 text-[15px] sm:text-base text-white/85 max-w-xl leading-relaxed">
                            Notes from shipping real things. Decisions, tradeoffs, and the occasional
                            gotcha. One entry per feature or notable call.
                        </p>
                        <div className="mt-5 text-[12px] text-white/60">
                            {posts.length} entries
                        </div>
                    </header>

                    <ul className="mt-6 divide-y divide-white/[0.06]">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    to={`/logs/${post.slug}`}
                                    className="group flex items-start gap-5 sm:gap-6 py-6 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-lg transition-colors duration-200 hover:bg-white/[0.02]"
                                >
                                    <time
                                        dateTime={post.date}
                                        className="shrink-0 w-20 sm:w-24 pt-1 font-mono text-[11px] text-white/85"
                                    >
                                        {formatDate(post.date)}
                                    </time>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-base sm:text-lg font-medium text-white leading-snug">
                                            {post.title}
                                        </h2>
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
            </main>
            <Footer />
        </div>
    )
}

export default Logs
