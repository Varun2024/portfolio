import { Suspense, lazy, useEffect, useState } from "react"

const AsteroidDodger = lazy(() => import("./MiniGame"))

const HINT_DISMISSED_KEY = "varun.portfolio.starcatcher.hint"

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
                        Asteroid field ahead. Engage pilot mode?
                    </div>
                )}
                <button
                    onClick={handleOpen}
                    className="group relative flex items-center gap-2 rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-4 py-2.5 font-mono text-sm text-[var(--color-aqua)] transition hover:border-[var(--color-aqua)]/70 hover:bg-[var(--color-aqua)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)]/40"
                    aria-label="Launch pilot mode"
                    data-cursor-tag="Launch"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.5l2.6 6.2 6.7.5-5.1 4.4 1.6 6.6L12 16.8l-5.8 3.4 1.6-6.6L2.7 9.2l6.7-.5L12 2.5z" />
                    </svg>
                    <span>[ launch ]</span>
                </button>
            </div>

            {open && (
                <Suspense fallback={null}>
                    <AsteroidDodger onClose={() => setOpen(false)} />
                </Suspense>
            )}
        </>
    )
}

export default GameLauncher
