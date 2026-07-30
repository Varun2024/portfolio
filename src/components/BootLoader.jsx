import { useEffect, useRef, useState } from "react"

const STORAGE_KEY = "varun.portfolio.booted"

const LINES = [
    { text: "> boot sequence initiated..." },
    { text: "> life support: online" },
    { text: "> orbital nav: synced" },
    { text: "> comm array: listening" },
    { text: "> welcome, visitor." },
]

const CHAR_MS = 14
const LINE_GAP_MS = 60
const EXIT_HOLD_MS = 220
const FADE_MS = 260

const BootLoader = () => {
    const [mounted, setMounted] = useState(() => {
        if (typeof window === "undefined") return false
        try {
            return !sessionStorage.getItem(STORAGE_KEY)
        } catch { return true }
    })
    const [visibleLines, setVisibleLines] = useState([""])
    const [fadingOut, setFadingOut] = useState(false)
    const doneRef = useRef(false)

    useEffect(() => {
        if (!mounted) return
        try {
            document.body.classList.add("boot-lock")
        } catch { /* ignore */ }
        return () => {
            try { document.body.classList.remove("boot-lock") } catch { /* ignore */ }
        }
    }, [mounted])

    useEffect(() => {
        if (!mounted) return
        let cancelled = false
        let timers = []

        const finish = () => {
            if (doneRef.current) return
            doneRef.current = true
            try { sessionStorage.setItem(STORAGE_KEY, "1") } catch { /* ignore */ }
            timers.push(setTimeout(() => setFadingOut(true), EXIT_HOLD_MS))
            timers.push(setTimeout(() => setMounted(false), EXIT_HOLD_MS + FADE_MS))
        }

        const type = async () => {
            for (let i = 0; i < LINES.length; i++) {
                const target = LINES[i].text
                for (let c = 1; c <= target.length; c++) {
                    if (cancelled || doneRef.current) return
                    await new Promise((r) => {
                        const t = setTimeout(r, CHAR_MS)
                        timers.push(t)
                    })
                    setVisibleLines((prev) => {
                        const next = [...prev]
                        next[i] = target.slice(0, c)
                        return next
                    })
                }
                if (i < LINES.length - 1) {
                    setVisibleLines((prev) => [...prev, ""])
                    await new Promise((r) => {
                        const t = setTimeout(r, LINE_GAP_MS)
                        timers.push(t)
                    })
                }
            }
            if (!cancelled && !doneRef.current) finish()
        }

        type()

        const skip = () => finish()
        window.addEventListener("click", skip, { passive: true })
        window.addEventListener("keydown", skip)
        window.addEventListener("touchstart", skip, { passive: true })

        return () => {
            cancelled = true
            timers.forEach(clearTimeout)
            window.removeEventListener("click", skip)
            window.removeEventListener("keydown", skip)
            window.removeEventListener("touchstart", skip)
        }
    }, [mounted])

    if (!mounted) return null

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-[10000] grid place-items-center bg-[var(--color-primary)] font-mono text-sm sm:text-base text-[var(--color-aqua)]"
            style={{
                opacity: fadingOut ? 0 : 1,
                transition: `opacity ${FADE_MS}ms ease-out`,
            }}
        >
            <div className="w-full max-w-md px-6">
                <div className="space-y-1.5 leading-relaxed">
                    {visibleLines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                            {line}
                            {i === visibleLines.length - 1 && (
                                <span className="ml-0.5 inline-block h-4 w-2 -mb-0.5 bg-[var(--color-aqua)] align-middle animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-xs text-white/30">
                    tap or press any key to skip
                </div>
            </div>
        </div>
    )
}

export default BootLoader
