import { useEffect, useRef, useState } from "react"

// Small floating astronaut badge that trails cursor with a soft parallax.
// Mounts once past the hero (hero has its own big 3D astronaut).
// Bottom-left so it doesn't collide with the game Launch button (bottom-right).

const AstronautCompanion = () => {
    const [visible, setVisible] = useState(false)
    const [reduced, setReduced] = useState(false)
    const wrapRef = useRef(null)
    const stateRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 })

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setReduced(mq.matches)
        update()
        mq.addEventListener?.("change", update)
        return () => mq.removeEventListener?.("change", update)
    }, [])

    useEffect(() => {
        const hero = document.getElementById("home")
        if (!hero || typeof IntersectionObserver === "undefined") {
            setVisible(true)
            return
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) setVisible(!e.isIntersecting)
            },
            { threshold: 0.1 },
        )
        io.observe(hero)
        return () => io.disconnect()
    }, [])

    useEffect(() => {
        if (!visible || reduced) return
        const s = stateRef.current
        let raf = 0

        const onMove = (e) => {
            const cx = window.innerWidth / 2
            const cy = window.innerHeight / 2
            // parallax target: small offset toward cursor, capped
            s.tx = Math.max(-14, Math.min(14, (e.clientX - cx) * 0.02))
            s.ty = Math.max(-10, Math.min(10, (e.clientY - cy) * 0.02))
        }
        const tick = () => {
            s.x += (s.tx - s.x) * 0.08
            s.y += (s.ty - s.y) * 0.08
            if (wrapRef.current) {
                wrapRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`
            }
            raf = requestAnimationFrame(tick)
        }
        window.addEventListener("mousemove", onMove, { passive: true })
        raf = requestAnimationFrame(tick)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("mousemove", onMove)
        }
    }, [visible, reduced])

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none hidden md:block fixed bottom-5 left-5 z-40 sm:bottom-7 sm:left-7"
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                ref={wrapRef}
                className="relative grid size-12 place-items-center rounded-full border border-white/10 bg-[var(--color-midnight)] sm:size-14"
                style={{ willChange: "transform" }}
            >
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--color-aqua)]/15 blur-lg" />
                <AstronautGlyph />
            </div>
        </div>
    )
}

const AstronautGlyph = () => (
    <svg
        viewBox="0 0 40 40"
        className="size-8 sm:size-9"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--color-aqua)" }}
    >
        <circle cx="20" cy="20" r="13" opacity="0.35" />
        <circle cx="20" cy="20" r="8" opacity="0.6" />
        <circle cx="20" cy="20" r="2.2" fill="currentColor" stroke="none" />
        <path d="M20 20 L 31 13" opacity="0.9">
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="3.2s"
                repeatCount="indefinite"
            />
        </path>
        <path d="M7 20 L 10 20 M30 20 L 33 20 M20 7 L 20 10 M20 30 L 20 33" opacity="0.7" />
    </svg>
)

export default AstronautCompanion
