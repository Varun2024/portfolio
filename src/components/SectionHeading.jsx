import { useEffect, useRef, useState } from "react"

const SectionHeading = ({ children, right = null, className = "" }) => {
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
        <div
            ref={ref}
            className={`relative flex items-end justify-between gap-6 border-b border-white/10 pb-4 ${className}`}
        >
            {/* instrument motif: a single aqua scanner pass along the divider on reveal */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-12 bg-[var(--color-aqua)]"
                style={{ opacity: 0, animation: revealed ? "heading-scan 900ms ease-out 200ms" : "none" }}
            />
            <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none tracking-tight"
                style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(8px)",
                    filter: revealed ? "blur(0)" : "blur(6px)",
                    transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms",
                }}
            >
                {children}
            </h2>
            {right && (
                <div className="pb-1 text-[12px] text-white/85">
                    {right}
                </div>
            )}
        </div>
    )
}

export default SectionHeading
