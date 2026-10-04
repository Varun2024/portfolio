import { Suspense, lazy, useEffect, useState } from "react"

const TerminalTyper = lazy(() => import("./MiniGame"))

const HINT_DISMISSED_KEY = "varun.portfolio.terminaltyper.hint"

const GameLauncher = () => {
    const [open, setOpen] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const [revealed, setRevealed] = useState(false)

    // Only surface the launcher once the visitor has earned attention
    // (past experience section). Reduces first-scroll cognitive load.
    useEffect(() => {
        const check = () => {
            const anchor = document.getElementById("work")
            if (!anchor) return
            if (anchor.getBoundingClientRect().top < window.innerHeight) {
                setRevealed(true)
                window.removeEventListener("scroll", check)
            }
        }
        check()
        window.addEventListener("scroll", check, { passive: true })
        return () => window.removeEventListener("scroll", check)
    }, [])

    useEffect(() => {
        if (!revealed) return
        try {
            if (localStorage.getItem(HINT_DISMISSED_KEY)) return
        } catch { /* ignore */ }
        const showTimer = setTimeout(() => setShowHint(true), 3000)
        const hideTimer = setTimeout(() => setShowHint(false), 3000 + 8000)
        return () => {
            clearTimeout(showTimer)
            clearTimeout(hideTimer)
        }
    }, [revealed])

    useEffect(() => {
        if (!open) return
        const handler = (e) => {
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [open])

    const dismissHint = () => {
        setShowHint(false)
        try { localStorage.setItem(HINT_DISMISSED_KEY, "1") } catch { /* ignore */ }
    }

    const handleOpen = () => {
        dismissHint()
        setOpen(true)
    }

    if (!revealed) return null

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
                {showHint && (
                    <div className="relative max-w-[14rem] rounded-xl border border-white/10 bg-[var(--color-midnight)]/95 px-3 py-2 text-xs text-neutral-200 shadow-lg backdrop-blur">
                        <button
                            onClick={dismissHint}
                            className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-white/10 text-[10px] text-neutral-200 hover:bg-white/20"
                            aria-label="Dismiss hint"
                        >
                            ×
                        </button>
                        Need a break? Try the typing speedrun.
                    </div>
                )}
                <button
                    onClick={handleOpen}
                    className="group relative flex items-center gap-2 rounded-full border border-white/15 bg-[var(--color-midnight)]/90 px-4 py-2 text-sm text-white/85 backdrop-blur transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Open typing speedrun"
                    data-cursor-tag="Game"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="4 17 10 11 4 5" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="19" x2="20" y2="19" strokeLinecap="round" />
                    </svg>
                    <span>typing speedrun</span>
                </button>
            </div>

            {open && (
                <Suspense fallback={null}>
                    <TerminalTyper onClose={() => setOpen(false)} />
                </Suspense>
            )}
        </>
    )
}

export default GameLauncher
