import { useEffect, useRef, useState } from "react"

// Section-title reveal: heading fades in from a subtle blur+y offset while
// a thin scanner line sweeps from left to right underneath. One-shot per
// section; skips animation entirely on prefers-reduced-motion.

const SectionHeading = ({ children, className = "" }) => {
    const ref = useRef(null)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setRevealed(true)
            return
        }
        if (typeof IntersectionObserver === "undefined") {
            setRevealed(true)
            return
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setRevealed(true)
                        io.disconnect()
                        return
                    }
                }
            },
            { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
        )
        io.observe(node)
        return () => io.disconnect()
    }, [])

    return (
        <div ref={ref} className={`inline-flex flex-col items-start ${className}`}>
            <h2
                className="text-heading"
                style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0) blur(0)" : "translateY(8px)",
                    filter: revealed ? "blur(0)" : "blur(6px)",
                    transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms",
                }}
            >
                {children}
            </h2>
            <span
                aria-hidden="true"
                className="mt-2 block h-px bg-gradient-to-r from-transparent via-[var(--color-aqua)]/70 to-transparent"
                style={{
                    width: revealed ? "100%" : "0%",
                    transition: "width 700ms cubic-bezier(0.16, 1, 0.3, 1) 120ms",
                }}
            />
        </div>
    )
}

export default SectionHeading
