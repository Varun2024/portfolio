import { useEffect, useState } from "react"

// Fixed top-left mono HUD. Ticks the SYS percentage down slowly across the
// session so the site feels like a live simulation. Session-scoped so a
// refresh keeps the last value; a new tab resets. Desktop only — nav pill
// already carries the identity on mobile.

const STORAGE_KEY = "varun.portfolio.sys"
const START = 98
const FLOOR = 42
const TICK_MS = 14000
const TICK_STEP = 1

const readInitial = () => {
    if (typeof window === "undefined") return START
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY)
        if (!raw) return START
        const n = parseInt(raw, 10)
        if (Number.isFinite(n) && n >= FLOOR && n <= START) return n
    } catch { /* ignore */ }
    return START
}

const SystemsHUD = () => {
    const [sys, setSys] = useState(readInitial)

    useEffect(() => {
        try { sessionStorage.setItem(STORAGE_KEY, String(sys)) } catch { /* ignore */ }
    }, [sys])

    useEffect(() => {
        if (sys <= FLOOR) return
        const id = setInterval(() => {
            setSys((prev) => Math.max(FLOOR, prev - TICK_STEP))
        }, TICK_MS)
        return () => clearInterval(id)
    }, [sys])

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed left-5 top-5 z-40 hidden select-none font-mono text-[10px] leading-tight text-white/50 xl:block"
        >
            <div className="flex items-center gap-1.5">
                <span className={`inline-block size-1.5 rounded-full ${sys > 60 ? "bg-[var(--color-mint)]" : sys > 48 ? "bg-[var(--color-sand)]" : "bg-[var(--color-coral)]"} animate-pulse`} />
                <span>SYS {sys}%</span>
            </div>
            <div className="mt-1 text-white/30">IN-3 · 23.24°N</div>
        </div>
    )
}

export default SystemsHUD
