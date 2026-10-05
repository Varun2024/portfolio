/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import DossierModal from '../components/DossierModal'

const RESUME_LINK = "https://drive.google.com/file/d/14fX7TGKZUr5l_bSzgPzfNryGpIvuoQUW/view?usp=sharing"

const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Logs", href: "/logs", route: true },
    { label: "Contact", href: "#contact" },
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

const NavLink = ({ link, isActive, onSelect, pathname, onHome }) => {
    const href = link.route ? link.href : (onHome ? link.href : `/${link.href}`)
    const cls = `text-sm transition-colors ${isActive ? "text-white" : "text-white/85 hover:text-white"}`
    if (link.route) {
        return <Link to={href} onClick={onSelect} className={cls}>{link.label}</Link>
    }
    return <a href={href} onClick={onSelect} className={cls}>{link.label}</a>
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dossierOpen, setResumeOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const active = useActiveSection()
    const { pathname } = useLocation()
    const onHome = pathname === "/"

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 8)
        handler()
        window.addEventListener("scroll", handler, { passive: true })
        return () => window.removeEventListener("scroll", handler)
    }, [])

    const openResume = (e) => {
        e.preventDefault()
        setResumeOpen(true)
        setIsOpen(false)
    }

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
                scrolled ? "bg-[#030412] border-b border-white/8" : "bg-transparent"
            }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 c-space py-4">
                <a href="#home" className="text-[15px] font-medium text-white tracking-tight">
                    Varun<span className="text-white/35">.</span>
                </a>

                <nav className="hidden md:flex items-center gap-7">
                    {links.map((l) => {
                        const isActive = l.route
                            ? pathname.startsWith(l.href)
                            : onHome && active === l.href.slice(1)
                        return <NavLink key={l.href} link={l} isActive={isActive} pathname={pathname} onHome={onHome} />
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <a
                        href={RESUME_LINK}
                        onClick={openResume}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                    >
                        Resume
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <button
                        onClick={() => setIsOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        className="md:hidden -mr-2 grid size-11 place-items-center text-white/80 hover:text-white"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                            {isOpen ? (
                                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                            ) : (
                                <>
                                    <path d="M4 8h16" strokeLinecap="round" />
                                    <path d="M4 16h16" strokeLinecap="round" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="md:hidden border-t border-white/5 bg-[#030412]"
                    >
                        <nav className="mx-auto max-w-6xl c-space py-5 flex flex-col gap-5">
                            {links.map((l) => {
                                const isActive = l.route
                                    ? pathname.startsWith(l.href)
                                    : onHome && active === l.href.slice(1)
                                return (
                                    <NavLink
                                        key={l.href}
                                        link={l}
                                        isActive={isActive}
                                        pathname={pathname}
                                        onHome={onHome}
                                        onSelect={() => setIsOpen(false)}
                                    />
                                )
                            })}
                            <a
                                href={RESUME_LINK}
                                onClick={openResume}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors pt-3 border-t border-white/5"
                            >
                                Resume
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <DossierModal open={dossierOpen} onClose={() => setResumeOpen(false)} downloadHref={RESUME_LINK} />
        </header>
    )
}

export default Navbar
