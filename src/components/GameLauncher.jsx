import { Suspense, lazy, useEffect, useState } from "react"

const AsteroidDodger = lazy(() => import("./MiniGame"))

const HINT_DISMISSED_KEY = "varun.portfolio.starcatcher.hint"

const GameLauncher = () => {
    const [open, setOpen] = useState(false)
    const [showHint, setShowHint] = useState(false)

    useEffect(() => {
        try {
            if (localStorage.getItem(HINT_DISMISSED_KEY)) return
        } catch { /* ignore */ }
        const showTimer = setTimeout(() => setShowHint(true), 6000)
        const hideTimer = setTimeout(() => setShowHint(false), 6000 + 8000)
        return () => {
            clearTimeout(showTimer)
            clearTimeout(hideTimer)
        }
    }, [])

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
                    className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-[var(--color-royal)]/90 to-[var(--color-lavender)]/90 px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(122,87,219,0.6)] transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Launch pilot mode"
                    data-cursor-tag="Launch"
                >
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] opacity-60 blur-md transition group-hover:opacity-90" />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.5l2.6 6.2 6.7.5-5.1 4.4 1.6 6.6L12 16.8l-5.8 3.4 1.6-6.6L2.7 9.2l6.7-.5L12 2.5z" />
                    </svg>
                    <span>Launch</span>
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
