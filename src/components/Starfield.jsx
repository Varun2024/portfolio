import { useEffect, useRef, useState } from "react"

// Global fixed starfield: three parallax layers + rare shooting stars.
// Bails on reduced-motion, pauses when tab hidden.

const LAYERS = [
    { count: 60, size: [0.4, 0.9], speed: 0.06, alpha: [0.35, 0.7], twinkle: 0.35 },
    { count: 45, size: [0.7, 1.4], speed: 0.14, alpha: [0.45, 0.9], twinkle: 0.25 },
    { count: 22, size: [1.1, 2.0], speed: 0.28, alpha: [0.6, 1.0], twinkle: 0.15 },
]

const SHOOTING_STAR_MS_AVG = 22000  // one roughly every 22s

const rand = (min, max) => min + Math.random() * (max - min)

const useReducedMotion = () => {
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setReduced(mq.matches)
        update()
        mq.addEventListener?.("change", update)
        return () => mq.removeEventListener?.("change", update)
    }, [])
    return reduced
}

const Starfield = () => {
    const reduced = useReducedMotion()
    const canvasRef = useRef(null)

    useEffect(() => {
        if (reduced) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d", { alpha: true })
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        let width = 0
        let height = 0
        let scrollY = window.scrollY || 0
        let raf = 0
        let paused = document.hidden
        let lastShootingAt = performance.now() + 6000  // don't fire immediately
        let shootingStar = null

        const stars = LAYERS.map((layer) => {
            const arr = new Array(layer.count)
            for (let i = 0; i < layer.count; i++) {
                arr[i] = {
                    x: Math.random(),                  // 0..1 of width
                    y: Math.random() * 2,              // 0..2 of height (extra so we always fill on scroll wrap)
                    r: rand(layer.size[0], layer.size[1]),
                    a: rand(layer.alpha[0], layer.alpha[1]),
                    // twinkle phase for a subset
                    tw: Math.random() < layer.twinkle ? Math.random() * Math.PI * 2 : null,
                }
            }
            return arr
        })

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const onScroll = () => { scrollY = window.scrollY || 0 }
        const onVisibility = () => { paused = document.hidden }

        const spawnShootingStar = (now) => {
            const fromLeft = Math.random() < 0.5
            shootingStar = {
                start: now,
                life: 900 + Math.random() * 400,
                x: fromLeft ? -20 : width + 20,
                y: rand(0, height * 0.5),
                vx: fromLeft ? rand(0.8, 1.2) : -rand(0.8, 1.2),
                vy: rand(0.25, 0.55),
                len: rand(60, 110),
            }
            lastShootingAt = now
        }

        const draw = (now) => {
            if (!paused) {
                ctx.clearRect(0, 0, width, height)

                for (let l = 0; l < LAYERS.length; l++) {
                    const layer = LAYERS[l]
                    const layerStars = stars[l]
                    const offset = (scrollY * layer.speed) % height
                    ctx.fillStyle = "#ffffff"
                    for (let i = 0; i < layerStars.length; i++) {
                        const s = layerStars[i]
                        const px = s.x * width
                        let py = (s.y * height - offset)
                        // wrap into [0, height)
                        py = ((py % height) + height) % height
                        let alpha = s.a
                        if (s.tw !== null) {
                            alpha *= 0.55 + 0.45 * Math.sin(now * 0.0018 + s.tw)
                        }
                        ctx.globalAlpha = alpha
                        ctx.beginPath()
                        ctx.arc(px, py, s.r, 0, Math.PI * 2)
                        ctx.fill()
                    }
                }
                ctx.globalAlpha = 1

                // shooting star
                if (!shootingStar && now - lastShootingAt > SHOOTING_STAR_MS_AVG * (0.6 + Math.random() * 0.8)) {
                    spawnShootingStar(now)
                }
                if (shootingStar) {
                    const t = (now - shootingStar.start) / shootingStar.life
                    if (t >= 1) {
                        shootingStar = null
                    } else {
                        const eased = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1
                        const traveled = t * shootingStar.life * 0.7
                        const cx = shootingStar.x + shootingStar.vx * traveled
                        const cy = shootingStar.y + shootingStar.vy * traveled
                        const tailX = cx - shootingStar.vx * shootingStar.len
                        const tailY = cy - shootingStar.vy * shootingStar.len
                        const grad = ctx.createLinearGradient(cx, cy, tailX, tailY)
                        grad.addColorStop(0, `rgba(255,255,255,${0.9 * eased})`)
                        grad.addColorStop(1, "rgba(255,255,255,0)")
                        ctx.strokeStyle = grad
                        ctx.lineWidth = 1.4
                        ctx.beginPath()
                        ctx.moveTo(cx, cy)
                        ctx.lineTo(tailX, tailY)
                        ctx.stroke()
                    }
                }
            }
            raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener("resize", resize)
        window.addEventListener("scroll", onScroll, { passive: true })
        document.addEventListener("visibilitychange", onVisibility)
        raf = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
            window.removeEventListener("scroll", onScroll)
            document.removeEventListener("visibilitychange", onVisibility)
        }
    }, [reduced])

    if (reduced) return null

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0"
            style={{ zIndex: 0 }}
        />
    )
}

export default Starfield
