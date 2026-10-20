import { useEffect, useRef, useState } from "react"

// Replaces the decorative orbiting-logo cloud in the About stack card with the
// real shipping loop Varun describes in his current role: spec -> build -> flag
// -> ship -> watch. Steps reveal in sequence as the card enters.
const STEPS = [
    { k: "Spec", sub: "shape it before code" },
    { k: "Build", sub: "backend to UI" },
    { k: "Flag", sub: "ship behind a flag" },
    { k: "Ship", sub: "promote on green" },
    { k: "Watch", sub: "the dashboard, then move" },
]

const BuildStrip = () => {
    const ref = useRef(null)
    const [shown, setShown] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        if (reduce || typeof IntersectionObserver === "undefined") {
            setShown(true)
            return
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setShown(true)
                        io.disconnect()
                        return
                    }
                }
            },
            { threshold: 0.4 },
        )
        io.observe(node)
        return () => io.disconnect()
    }, [])

    return (
        <ol ref={ref} aria-label="How I build" className="relative flex h-full flex-col justify-center gap-0 pl-1">
            {STEPS.map((s, i) => (
                <li key={s.k} className="relative grid grid-cols-[1.25rem_1fr] gap-x-3 pb-4 last:pb-0">
                    <div className="relative flex justify-center">
                        {i < STEPS.length - 1 && (
                            <span
                                aria-hidden="true"
                                className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-white/10"
                                style={{
                                    transformOrigin: "top",
                                    transform: shown ? "scaleY(1)" : "scaleY(0)",
                                    transition: `transform 400ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
                                }}
                            />
                        )}
                        <span
                            aria-hidden="true"
                            className="relative z-10 mt-1 size-2 rounded-full bg-[var(--color-aqua)]"
                            style={{
                                opacity: shown ? 1 : 0,
                                transform: shown ? "scale(1)" : "scale(0.4)",
                                transition: `opacity 300ms ease ${i * 110}ms, transform 300ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
                            }}
                        />
                    </div>
                    <div
                        style={{
                            opacity: shown ? 1 : 0,
                            transform: shown ? "translateX(0)" : "translateX(6px)",
                            transition: `opacity 320ms ease ${i * 110}ms, transform 320ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
                        }}
                    >
                        <div className="text-[13px] font-medium leading-tight text-white">{s.k}</div>
                        <div className="text-[11px] leading-snug text-white/55">{s.sub}</div>
                    </div>
                </li>
            ))}
        </ol>
    )
}

export default BuildStrip
