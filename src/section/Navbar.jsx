/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const RESUME_LINK = "https://drive.google.com/file/d/1rHC_X1fZdNJ0AeQ6GkN-_pTfVSX-fVma/view?usp=sharing"

const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
]

const useActiveSection = () => {
    const [active, setActive] = useState("home")
    useEffect(() => {
        if (typeof window === "undefined") return
        const ids = links.map((l) => l.href.slice(1))
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

const NavLinks = ({ active, onSelect }) => (
    <ul className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0.5">
        {links.map((l) => {
            const id = l.href.slice(1)
            const isActive = active === id
            return (
                <li key={l.href} className="w-full sm:w-auto">
                    <a
                        href={l.href}
                        onClick={onSelect}
                        className={`relative block sm:inline-block px-3 py-1.5 text-sm rounded-full transition-colors ${
                            isActive ? "text-white" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="nav-pill"
                                className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/15"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                        )}
                        {l.label}
                    </a>
                </li>
            )
        })}
    </ul>
)

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const active = useActiveSection()

    return (
        <div className="fixed inset-x-0 top-3 sm:top-5 z-40 flex justify-center px-3">
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl"
            >
                <div className="relative">
                    <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-[var(--color-lavender)]/30 via-white/5 to-[var(--color-aqua)]/30 opacity-60 blur-[2px]" />
                    <div className="relative flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[var(--color-primary)]/70 px-3 sm:pl-5 sm:pr-3 py-2 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
                        <a
                            href="#home"
                            className="flex items-center gap-2 text-sm font-semibold text-white"
                        >
                            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[var(--color-royal)] to-[var(--color-lavender)] text-xs font-bold text-white shadow-[0_4px_20px_-4px_rgba(122,87,219,0.6)]">
                                V
                            </span>
                            <span className="hidden sm:inline tracking-wide">Varun</span>
                        </a>

                        <nav className="hidden md:flex">
                            <NavLinks active={active} />
                        </nav>

                        <div className="flex items-center gap-2">
                            <a
                                href={RESUME_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-4 py-1.5 text-sm font-medium text-white shadow-[0_6px_24px_-8px_rgba(122,87,219,0.6)] transition hover:scale-[1.03]"
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
                                    <NavLinks active={active} onSelect={() => setIsOpen(false)} />
                                    <a
                                        href={RESUME_LINK}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-4 py-2 text-sm font-medium text-white"
                                    >
                                        Resume
                                    </a>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}

export default Navbar
