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
            className="pointer-events-none fixed bottom-5 left-5 z-40 sm:bottom-7 sm:left-7"
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                ref={wrapRef}
                className="relative grid size-12 place-items-center rounded-full border border-white/10 bg-[var(--color-midnight)]/70 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] sm:size-14"
                style={{ willChange: "transform" }}
            >
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--color-royal)]/25 blur-lg animate-pulse" />
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
    >
        {/* body */}
        <path
            d="M13 18 C 13 12 27 12 27 18 L 27 30 C 27 33 24 33 20 33 C 16 33 13 33 13 30 Z"
            fill="#e74c3c"
        />
        {/* leg */}
        <path
            d="M22 33 L 28 33 L 28 36 L 22 36 Z"
            fill="#c93727"
        />
        {/* backpack */}
        <path
            d="M27 20 L 30 20 L 30 26 L 27 26 Z"
            fill="#c93727"
        />
        {/* helmet visor */}
        <ellipse
            cx="21"
            cy="18"
            rx="6"
            ry="4.5"
            fill="#0f3d54"
        />
        <ellipse
            cx="22"
            cy="17"
            rx="2.2"
            ry="1.5"
            fill="#4bb6cf"
            opacity="0.9"
        />
        {/* antenna */}
        <rect x="16" y="9" width="2" height="4" fill="#f4f4f4" />
        <rect x="14.5" y="8" width="5" height="2" fill="#e0e0e0" />
    </svg>
)

export default AstronautCompanion
