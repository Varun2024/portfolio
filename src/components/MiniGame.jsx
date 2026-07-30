import { useCallback, useEffect, useRef, useState } from "react"

const HIGH_SCORE_KEY = "varun.portfolio.asteroiddodger.high"

const GAME_WIDTH = 600
const GAME_HEIGHT = 360
const SHIP_HALF_W = 14
const SHIP_HALF_H = 18
const SHIP_Y = GAME_HEIGHT - 40
const SHIP_SPEED = 6
const STAR_COUNT = 60
const PALETTE = ["#7a57db", "#33c2cc", "#ea4884", "#d6995c", "#57db96"]

const makeStar = () => ({
    x: Math.random() * GAME_WIDTH,
    y: Math.random() * GAME_HEIGHT,
    r: Math.random() * 1.4 + 0.2,
    s: Math.random() * 0.6 + 0.15,
})

const makeAsteroid = (difficulty) => {
    const size = 12 + Math.random() * 18
    return {
        x: Math.random() * (GAME_WIDTH - size * 2) + size,
        y: -size,
        r: size,
        vy: 1.6 + Math.random() * 1.4 + difficulty * 0.45,
        vx: (Math.random() - 0.5) * 1.2,
        spin: (Math.random() - 0.5) * 0.06,
        angle: 0,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }
}

const AsteroidDodger = ({ onClose }) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const stateRef = useRef({
        ship: { x: GAME_WIDTH / 2 },
        keys: { left: false, right: false },
        pointerX: null,
        asteroids: [],
        stars: Array.from({ length: STAR_COUNT }, makeStar),
        spawnTimer: 0,
        elapsed: 0,
        lives: 3,
        score: 0,
        running: false,
    })
    const rafRef = useRef(0)

    const [phase, setPhase] = useState("idle") // idle | playing | done
    const [hudScore, setHudScore] = useState(0)
    const [hudLives, setHudLives] = useState(3)
    const [finalScore, setFinalScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    useEffect(() => {
        try {
            const stored = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10)
            if (!Number.isNaN(stored)) setHighScore(stored)
        } catch { /* ignore */ }
    }, [])

    const reset = useCallback(() => {
        const s = stateRef.current
        s.ship.x = GAME_WIDTH / 2
        s.asteroids = []
        s.spawnTimer = 0
        s.elapsed = 0
        s.lives = 3
        s.score = 0
        s.running = true
        setHudScore(0)
        setHudLives(3)
    }, [])

    const endGame = useCallback(() => {
        const s = stateRef.current
        s.running = false
        const final = Math.floor(s.score)
        setFinalScore(final)
        setPhase("done")
        setHighScore((prev) => {
            const next = Math.max(prev, final)
            try { localStorage.setItem(HIGH_SCORE_KEY, String(next)) } catch { /* ignore */ }
            return next
        })
    }, [])

    const draw = useCallback((ctx) => {
        const s = stateRef.current
        // background
        const grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT)
        grad.addColorStop(0, "#0c0d24")
        grad.addColorStop(0.6, "#0a1130")
        grad.addColorStop(1, "#15043a")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

        // stars
        for (const star of s.stars) {
            star.y += star.s
            if (star.y > GAME_HEIGHT) {
                star.y = 0
                star.x = Math.random() * GAME_WIDTH
            }
            ctx.globalAlpha = 0.4 + star.r * 0.4
            ctx.fillStyle = "#ffffff"
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.globalAlpha = 1

        // asteroids
        for (const a of s.asteroids) {
            ctx.save()
            ctx.translate(a.x, a.y)
            ctx.rotate(a.angle)
            const ag = ctx.createRadialGradient(-a.r * 0.3, -a.r * 0.3, a.r * 0.2, 0, 0, a.r)
            ag.addColorStop(0, a.color)
            ag.addColorStop(1, "rgba(0,0,0,0.4)")
            ctx.fillStyle = ag
            ctx.shadowColor = a.color
            ctx.shadowBlur = 12
            ctx.beginPath()
            ctx.arc(0, 0, a.r, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
        }
        ctx.shadowBlur = 0

        // ship
        const sx = s.ship.x
        ctx.save()
        ctx.translate(sx, SHIP_Y)
        // thruster
        ctx.fillStyle = "rgba(122,87,219,0.6)"
        ctx.beginPath()
        ctx.moveTo(-6, SHIP_HALF_H)
        ctx.lineTo(0, SHIP_HALF_H + 8 + Math.random() * 4)
        ctx.lineTo(6, SHIP_HALF_H)
        ctx.fill()
        // body
        const sg = ctx.createLinearGradient(0, -SHIP_HALF_H, 0, SHIP_HALF_H)
        sg.addColorStop(0, "#7a57db")
        sg.addColorStop(1, "#33c2cc")
        ctx.fillStyle = sg
        ctx.shadowColor = "#7a57db"
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.moveTo(0, -SHIP_HALF_H)
        ctx.lineTo(SHIP_HALF_W, SHIP_HALF_H)
        ctx.lineTo(-SHIP_HALF_W, SHIP_HALF_H)
        ctx.closePath()
        ctx.fill()
        // cockpit
        ctx.shadowBlur = 0
        ctx.fillStyle = "rgba(255,255,255,0.6)"
        ctx.beginPath()
        ctx.arc(0, 0, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }, [])

    const tick = useCallback(() => {
        const s = stateRef.current
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")

        if (s.running) {
            s.elapsed += 1
            s.score += 0.18

            // movement
            if (s.pointerX !== null) {
                const dx = s.pointerX - s.ship.x
                s.ship.x += Math.max(-SHIP_SPEED * 1.3, Math.min(SHIP_SPEED * 1.3, dx * 0.25))
            } else {
                if (s.keys.left) s.ship.x -= SHIP_SPEED
                if (s.keys.right) s.ship.x += SHIP_SPEED
            }
            s.ship.x = Math.max(SHIP_HALF_W, Math.min(GAME_WIDTH - SHIP_HALF_W, s.ship.x))

            // spawn
            const difficulty = Math.min(6, s.elapsed / 600)
            s.spawnTimer -= 1
            if (s.spawnTimer <= 0) {
                s.asteroids.push(makeAsteroid(difficulty))
                s.spawnTimer = Math.max(8, 28 - difficulty * 3)
            }

            // update asteroids + collision
            const collisions = []
            for (let i = s.asteroids.length - 1; i >= 0; i--) {
                const a = s.asteroids[i]
                a.y += a.vy
                a.x += a.vx
                a.angle += a.spin
                if (a.x < a.r || a.x > GAME_WIDTH - a.r) a.vx *= -1
                if (a.y - a.r > GAME_HEIGHT) {
                    s.asteroids.splice(i, 1)
                    continue
                }
                // collision with ship (circle vs aabb-ish triangle box)
                const dx = a.x - s.ship.x
                const dy = a.y - SHIP_Y
                const dist = Math.hypot(dx, dy)
                if (dist < a.r + SHIP_HALF_W) {
                    collisions.push(i)
                }
            }
            if (collisions.length) {
                for (const idx of collisions) s.asteroids.splice(idx, 1)
                s.lives -= 1
                setHudLives(s.lives)
                if (s.lives <= 0) {
                    endGame()
                }
            }

            setHudScore(Math.floor(s.score))
        }

        draw(ctx)
        rafRef.current = requestAnimationFrame(tick)
    }, [draw, endGame])

    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [tick])

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") stateRef.current.keys.left = true
            if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") stateRef.current.keys.right = true
            if (e.key === " " && phase !== "playing") {
                e.preventDefault()
                handleStart()
            }
        }
        const onKeyUp = (e) => {
            if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") stateRef.current.keys.left = false
            if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") stateRef.current.keys.right = false
        }
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase])

    const handlePointer = (e) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const ratio = GAME_WIDTH / rect.width
        stateRef.current.pointerX = (e.clientX - rect.left) * ratio
    }

    const handlePointerLeave = () => {
        stateRef.current.pointerX = null
    }

    const handleStart = () => {
        reset()
        setPhase("playing")
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Asteroid Dodger mini game"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[var(--color-midnight)] p-5 sm:p-6 shadow-[0_30px_120px_-20px_rgba(122,87,219,0.45)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold">Asteroid Dodger</h3>
                        <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                            Move with mouse or A/D · arrow keys · Best: {highScore}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300 hover:text-white hover:border-white/30 transition"
                        aria-label="Close mini game"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-neutral-300">
                        Score <span className="font-semibold text-white">{hudScore}</span>
                    </span>
                    <span className="text-neutral-300 flex items-center gap-1">
                        Lives
                        <span className="ml-1 flex gap-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`size-2.5 rounded-full transition-colors ${
                                        i < hudLives ? "bg-[var(--color-coral)] shadow-[0_0_8px_#ea4884]" : "bg-white/15"
                                    }`}
                                />
                            ))}
                        </span>
                    </span>
                </div>

                <div
                    ref={containerRef}
                    className="relative mt-3 overflow-hidden rounded-xl border border-white/10"
                    style={{ aspectRatio: `${GAME_WIDTH} / ${GAME_HEIGHT}` }}
                >
                    <canvas
                        ref={canvasRef}
                        width={GAME_WIDTH}
                        height={GAME_HEIGHT}
                        onPointerMove={handlePointer}
                        onPointerLeave={handlePointerLeave}
                        className="block w-full h-full cursor-none touch-none"
                    />

                    {phase === "idle" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center bg-black/50">
                            <p className="text-lg font-medium">Survive the asteroid field.</p>
                            <p className="text-xs text-neutral-400 max-w-xs">
                                Mouse moves the ship · or use A/D / ← → · Space to start
                            </p>
                            <button
                                onClick={handleStart}
                                className="rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-6 py-2 font-mono text-sm text-[var(--color-aqua)] hover:border-[var(--color-aqua)]/70 hover:bg-[var(--color-aqua)]/20 transition"
                            >
                                [ launch ]
                            </button>
                        </div>
                    )}

                    {phase === "done" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center bg-black/65">
                            <p className="text-2xl font-semibold">You scored {finalScore}</p>
                            <p className="text-sm text-neutral-400">Best: {highScore}</p>
                            <div className="flex gap-2 mt-1">
                                <button
                                    onClick={handleStart}
                                    className="rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-5 py-2 font-mono text-sm text-[var(--color-aqua)] hover:border-[var(--color-aqua)]/70 hover:bg-[var(--color-aqua)]/20 transition"
                                >
                                    [ try again ]
                                </button>
                                <button
                                    onClick={onClose}
                                    className="rounded-full border border-white/15 px-5 py-2 text-sm text-neutral-200 hover:border-white/40 transition"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AsteroidDodger
