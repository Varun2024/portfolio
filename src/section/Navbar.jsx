/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import DossierModal from '../components/DossierModal'

const RESUME_LINK = "https://drive.google.com/file/d/1rHC_X1fZdNJ0AeQ6GkN-_pTfVSX-fVma/view?usp=sharing"

const links = [
    { label: "Bridge", plain: "Home", href: "#home" },
    { label: "Origin", plain: "About", href: "#about" },
    { label: "Missions", plain: "Experience", href: "#experience" },
    { label: "Fleet", plain: "Projects", href: "#work" },
    { label: "Signals", plain: "Testimonials", href: "#testimonials" },
    { label: "Comms", plain: "Contact", href: "#contact" },
    { label: "Logs", plain: "Build Logs", href: "/logs", route: true },
]

const useActiveSection = () => {
    const [active, setActive] = useState("home")
    useEffect(() => {
        if (typeof window === "undefined") return
        const ids = links.filter((l) => !l.route).map((l) => l.href.slice(1))
        const handler = () => {
            const offset = window.scrollY + 140
            let current = ids[0]
            for (const id of ids) {
                const el = document.getElementById(id)
                if (el && el.offsetTop <= offset) current = id
            }
            setActive(current)
        }
        handler()
        window.addEventListener("scroll", handler, { passive: true })
        return () => window.removeEventListener("scroll", handler)
    }, [])
    return active
}

const NavLinks = ({ active, onSelect, pathname }) => {
    const onHome = pathname === "/"
    return (
        <ul className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0.5">
            {links.map((l) => {
                const isRoute = l.route
                const id = isRoute ? null : l.href.slice(1)
                const isActive = isRoute
                    ? pathname.startsWith(l.href)
                    : onHome && active === id
                const href = isRoute ? l.href : (onHome ? l.href : `/${l.href}`)
                const pillClass = `relative block sm:inline-block px-3 py-1.5 text-sm rounded-full transition-colors ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }`
                const showPing = isRoute && !isActive
                const inner = (
                    <>
                        {isActive && (
                            <motion.span
                                layoutId="nav-pill"
                                className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/15"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                        )}
                        {l.label}
                        {showPing && (
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-0.5 -top-0.5 inline-flex h-1.5 w-1.5"
                            >
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-aqua)] opacity-80" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-aqua)]" />
                            </span>
                        )}
                    </>
                )
                return (
                    <li key={l.href} className="group relative w-full sm:w-auto">
                        {isRoute ? (
                            <Link
                                to={href}
                                onClick={onSelect}
                                title={l.plain}
                                aria-label={`${l.label} · ${l.plain}`}
                                className={pillClass}
                            >
                                {inner}
                            </Link>
                        ) : (
                            <a
                                href={href}
                                onClick={onSelect}
                                title={l.plain}
                                aria-label={`${l.label} · ${l.plain}`}
                                className={pillClass}
                            >
                                {inner}
                            </a>
                        )}
                        <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[var(--color-midnight)]/95 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-aqua)] opacity-0 backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100 hidden sm:block">
                            {l.plain}
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dossierOpen, setResumeOpen] = useState(false)
    const active = useActiveSection()
    const { pathname } = useLocation()

    const openResume = (e) => {
        e.preventDefault()
        setResumeOpen(true)
        setIsOpen(false)
    }

    return (
        <div className="fixed inset-x-0 top-3 sm:top-5 z-40 flex justify-center px-3">
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl"
            >
                <div className="relative">
                    <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-transparent via-[var(--color-aqua)]/20 to-transparent opacity-60 blur-[2px]" />
                    <div className="relative flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[var(--color-primary)]/70 px-3 sm:pl-5 sm:pr-3 py-2 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
                        <a
                            href="#home"
                            className="flex items-center gap-2 text-sm font-semibold text-white"
                        >
                            <span className="grid size-7 place-items-center rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 font-mono text-xs font-bold text-[var(--color-aqua)]">
                                V
                            </span>
                            <span className="hidden sm:inline tracking-wide">Varun</span>
                        </a>

                        <nav className="hidden md:flex">
                            <NavLinks active={active} pathname={pathname} />
                        </nav>

                        <div className="flex items-center gap-2">
                            <a
                                href={RESUME_LINK}
                                onClick={openResume}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor-tag="Read"
                                className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-4 py-1.5 font-mono text-sm text-[var(--color-aqua)] transition hover:border-[var(--color-aqua)]/70 hover:bg-[var(--color-aqua)]/20"
                            >
                                Resume
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <button
                                onClick={() => setIsOpen((v) => !v)}
                                aria-label="Toggle menu"
                                className="md:hidden grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:text-white"
                            >
                                <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} className="w-4 h-4" alt="" />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                key="mobile"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="md:hidden absolute left-1/2 -translate-x-1/2 mt-2 w-[calc(100%-1rem)] max-w-md rounded-2xl border border-white/10 bg-[var(--color-primary)]/95 backdrop-blur-xl shadow-2xl"
                            >
                                <nav className="px-3 py-3">
                                    <NavLinks active={active} pathname={pathname} onSelect={() => setIsOpen(false)} />
                                    <a
                                        href={RESUME_LINK}
                                        onClick={openResume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-4 py-2 font-mono text-sm text-[var(--color-aqua)]"
                                    >
                                        Resume
                                    </a>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
            <DossierModal open={dossierOpen} onClose={() => setResumeOpen(false)} downloadHref={RESUME_LINK} />
        </div>
    )
}

export default Navbar
