import { useCallback, useEffect, useRef, useState } from "react"

const GAME_DURATION = 30
const SPAWN_INTERVAL_MS = 700
const STAR_LIFETIME_MS = 1600
const HIGH_SCORE_KEY = "varun.portfolio.starcatcher.high"

const palette = ["#7a57db", "#33c2cc", "#ea4884", "#d6995c", "#57db96"]

const StarCatcher = ({ onClose }) => {
    const fieldRef = useRef(null)
    const [phase, setPhase] = useState("idle") // idle | playing | done
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
    const [stars, setStars] = useState([])
    const [highScore, setHighScore] = useState(0)

    useEffect(() => {
        try {
            const stored = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10)
            if (!Number.isNaN(stored)) setHighScore(stored)
        } catch {
            // localStorage unavailable; non-fatal
        }
    }, [])

    const startGame = useCallback(() => {
        setScore(0)
        setTimeLeft(GAME_DURATION)
        setStars([])
        setPhase("playing")
    }, [])

    useEffect(() => {
        if (phase !== "playing") return
        const tick = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(tick)
                    return 0
                }
                return t - 1
            })
        }, 1000)
        return () => clearInterval(tick)
    }, [phase])

    useEffect(() => {
        if (phase !== "playing") return
        if (timeLeft <= 0) {
            setPhase("done")
            setHighScore((prev) => {
                const next = Math.max(prev, score)
                try { localStorage.setItem(HIGH_SCORE_KEY, String(next)) } catch { /* ignore */ }
                return next
            })
        }
    }, [timeLeft, phase, score])

    useEffect(() => {
        if (phase !== "playing") return
        const id = setInterval(() => {
            setStars((prev) => {
                const now = Date.now()
                const trimmed = prev.filter((s) => now - s.born < STAR_LIFETIME_MS)
                const newStar = {
                    id: `${now}-${Math.random()}`,
                    x: 8 + Math.random() * 84,
                    y: 12 + Math.random() * 76,
                    size: 28 + Math.random() * 24,
                    color: palette[Math.floor(Math.random() * palette.length)],
                    born: now,
                }
                return [...trimmed, newStar].slice(-10)
            })
        }, SPAWN_INTERVAL_MS)
        return () => clearInterval(id)
    }, [phase])

    const handleHit = (id, e) => {
        e.stopPropagation()
        setStars((prev) => prev.filter((s) => s.id !== id))
        setScore((s) => s + 1)
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Catch the Star mini game"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[var(--color-midnight)] p-5 sm:p-6 shadow-[0_30px_120px_-20px_rgba(122,87,219,0.45)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold">Catch the Star</h3>
                        <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                            Click as many stars as you can in {GAME_DURATION} seconds. Best: {highScore}
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
                    <span className="text-neutral-300">Score <span className="font-semibold text-white">{score}</span></span>
                    <span className="text-neutral-300">Time <span className="font-semibold text-white">{timeLeft}s</span></span>
                </div>

                <div
                    ref={fieldRef}
                    className="relative mt-3 h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0c0d24] via-[#0a1130] to-[#15043a]"
                >
                    {phase === "idle" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                            <p className="text-neutral-200">Ready when you are.</p>
                            <button
                                onClick={startGame}
                                className="rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-6 py-2 text-sm font-medium hover-animation"
                            >
                                Start
                            </button>
                        </div>
                    )}

                    {phase === "playing" && stars.map((s) => (
                        <button
                            key={s.id}
                            onClick={(e) => handleHit(s.id, e)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform active:scale-90"
                            style={{
                                left: `${s.x}%`,
                                top: `${s.y}%`,
                                width: s.size,
                                height: s.size,
                                background: `radial-gradient(circle at 30% 30%, ${s.color}, transparent 70%)`,
                                boxShadow: `0 0 24px ${s.color}`,
                            }}
                            aria-label="Star"
                        />
                    ))}

                    {phase === "done" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                            <p className="text-2xl font-semibold">Score: {score}</p>
                            <p className="text-sm text-neutral-400">Best: {highScore}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={startGame}
                                    className="rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-5 py-2 text-sm font-medium hover-animation"
                                >
                                    Play again
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

export default StarCatcher
