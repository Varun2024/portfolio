import { useEffect, useRef, useState } from "react"

const SEQUENCE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
]

const WARP_MS = 2200

const Konami = () => {
    const [active, setActive] = useState(false)
    const canvasRef = useRef(null)
    const bufferRef = useRef([])

    useEffect(() => {
        const onKey = (e) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
            const buffer = [...bufferRef.current, key].slice(-SEQUENCE.length)
            bufferRef.current = buffer
            if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k === SEQUENCE[i])) {
                bufferRef.current = []
                setActive(true)
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    useEffect(() => {
        if (!active) return
        const t = setTimeout(() => setActive(false), WARP_MS)
        return () => clearTimeout(t)
    }, [active])

    useEffect(() => {
        if (!active) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        let w = window.innerWidth
        let h = window.innerHeight
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const cx = w / 2
        const cy = h / 2
        const STAR_COUNT = 240
        const stars = new Array(STAR_COUNT).fill(0).map(() => ({
            angle: Math.random() * Math.PI * 2,
            r: Math.random() * 40,
            speed: 2 + Math.random() * 6,
        }))

        const start = performance.now()
        let raf = 0
        const draw = (now) => {
            const t = Math.min(1, (now - start) / WARP_MS)
            const boost = 1 + t * 8
            ctx.fillStyle = `rgba(3, 4, 18, ${0.28 - t * 0.05})`
            ctx.fillRect(0, 0, w, h)

            for (const s of stars) {
                const x1 = cx + Math.cos(s.angle) * s.r
                const y1 = cy + Math.sin(s.angle) * s.r
                s.r += s.speed * boost
                if (s.r > Math.max(w, h)) {
                    s.r = 0
                    s.angle = Math.random() * Math.PI * 2
                }
                const x2 = cx + Math.cos(s.angle) * s.r
                const y2 = cy + Math.sin(s.angle) * s.r
                const alpha = Math.min(1, s.r / 300)
                ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`
                ctx.lineWidth = 1.2
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()
            }
            if (t < 1) raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(raf)
    }, [active])

    if (!active) return null
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[9997]"
            style={{ animation: "konami-fade 2.2s ease-out forwards" }}
        >
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-x-0 top-[42%] flex flex-col items-center gap-2 font-mono text-white">
                <div className="text-[11px] tracking-widest text-white/60">// hidden pilot detected</div>
                <div className="text-lg sm:text-2xl text-[var(--color-aqua)]">warp drive engaged</div>
            </div>
        </div>
    )
}

export default Konami
