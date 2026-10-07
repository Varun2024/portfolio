import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const HIGH_SCORE_KEY = "varun.portfolio.terminaltyper.high"
const ROUND_SECONDS = 30

const SNIPPETS = [
    "git commit -m 'ship it'",
    "docker compose up -d",
    "npm run build && npm run deploy",
    "git rebase -i HEAD~3",
    "kubectl get pods -A",
    "ssh deploy@prod.varun.dev",
    "pnpm add -D vitest @testing-library/react",
    "curl -X POST api.bountyindex.in/scan",
    "psql -h neon.tech -U varun bounty",
    "git log --oneline --graph --all",
    "tsc --noEmit && eslint src",
    "python -m venv .venv && source .venv/bin/activate",
    "ffmpeg -i raw.mov -c:v libx264 clip.mp4",
    "rm -rf node_modules && pnpm i",
    "git switch -c feat/ai-native-hero",
    "grep -r 'TODO' src --include='*.ts'",
    "nvim ~/.config/nvim/init.lua",
    "aws s3 sync ./dist s3://varun-portfolio",
    "redis-cli KEYS 'bounty:*'",
    "mv ParallexBackground.jsx ParallaxBackground.jsx",
]

const pick = () => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]

const TerminalTyper = ({ onClose }) => {
    const inputRef = useRef(null)
    const [phase, setPhase] = useState("idle") // idle | playing | done
    const [target, setTarget] = useState(SNIPPETS[0])
    const [typed, setTyped] = useState("")
    const [score, setScore] = useState(0)
    const [cleared, setCleared] = useState(0)
    const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
    const [highScore, setHighScore] = useState(0)
    const [errors, setErrors] = useState(0)
    const startedAtRef = useRef(0)
    const charsTypedRef = useRef(0)

    useEffect(() => {
        try {
            const stored = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10)
            if (!Number.isNaN(stored)) setHighScore(stored)
        } catch { /* ignore */ }
    }, [])

    const endGame = useCallback(() => {
        setPhase("done")
        setHighScore((prev) => {
            const next = Math.max(prev, score)
            try { localStorage.setItem(HIGH_SCORE_KEY, String(next)) } catch { /* ignore */ }
            return next
        })
    }, [score])

    useEffect(() => {
        if (phase !== "playing") return
        if (timeLeft <= 0) {
            endGame()
            return
        }
        const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
        return () => clearTimeout(id)
    }, [phase, timeLeft, endGame])

    const startRound = () => {
        setTarget(pick())
        setTyped("")
        setScore(0)
        setCleared(0)
        setErrors(0)
        setTimeLeft(ROUND_SECONDS)
        startedAtRef.current = Date.now()
        charsTypedRef.current = 0
        setPhase("playing")
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const nextSnippet = useCallback(() => {
        let next
        do { next = pick() } while (next === target && SNIPPETS.length > 1)
        setTarget(next)
        setTyped("")
    }, [target])

    const onInput = (e) => {
        if (phase !== "playing") return
        const value = e.target.value
        // count only forward progress for error tracking
        if (value.length > typed.length) {
            charsTypedRef.current += value.length - typed.length
            const idx = value.length - 1
            if (value[idx] !== target[idx]) setErrors((n) => n + 1)
        }
        setTyped(value)
        if (value === target) {
            // award points + bonus for speed
            const base = target.length * 10
            const timeBonus = Math.max(0, 50 - (Date.now() - startedAtRef.current) / 50)
            setScore((s) => s + Math.round(base + timeBonus))
            setCleared((c) => c + 1)
            startedAtRef.current = Date.now()
            nextSnippet()
        }
    }

    const onKeyDown = (e) => {
        if (e.key === "Escape") onClose()
        if (e.key === "Enter" && phase !== "playing") {
            e.preventDefault()
            startRound()
        }
    }

    // score/cleared aren't read directly, but they signal round transitions
    // so the ref-based read of charsTypedRef picks up its new value.
    const accuracy = useMemo(() => {
        if (charsTypedRef.current === 0) return 100
        return Math.max(0, Math.round(((charsTypedRef.current - errors) / charsTypedRef.current) * 100))
    }, [errors, score, cleared]) // eslint-disable-line react-hooks/exhaustive-deps

    const renderedTarget = () => {
        const chars = target.split("")
        return chars.map((c, i) => {
            let cls = "text-white/55"
            if (i < typed.length) cls = typed[i] === c ? "text-white" : "text-[var(--color-coral)] underline"
            return (
                <span key={i} className={cls}>
                    {c === " " ? " " : c}
                </span>
            )
        })
    }

    const progress = (timeLeft / ROUND_SECONDS) * 100

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Terminal Typer mini game"
            onClick={onClose}
            onKeyDown={onKeyDown}
        >
            <div
                className="relative w-full max-w-2xl rounded-sm border border-white/10 bg-[var(--color-midnight)] p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold">Terminal Typer</h3>
                        <p className="mt-1 text-xs sm:text-sm text-neutral-200">
                            Type the command before time runs out. Best: {highScore}
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

                {phase === "playing" && (
                    <>
                        {/* progress bar */}
                        <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
                            <div
                                className="h-full bg-[var(--color-aqua)] transition-[width] duration-1000 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                            <Stat label="score" value={score} highlight />
                            <Stat label="cleared" value={cleared} />
                            <Stat label="time" value={`${timeLeft}s`} />
                        </div>

                        <div className="mt-6 rounded-xl border border-white/10 bg-black/40 px-5 py-6">
                            <div className="font-mono text-[11px] text-white/85">
                                $ type the command
                            </div>
                            <div className="mt-3 font-mono text-lg sm:text-xl leading-relaxed break-words">
                                {renderedTarget()}
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={typed}
                                onChange={onInput}
                                spellCheck="false"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                className="mt-4 block w-full bg-transparent font-mono text-[15px] text-white placeholder:text-white/55 focus:outline-none border-b border-white/15 focus:border-[var(--color-aqua)]/60 pb-1.5"
                                placeholder="start typing…"
                            />
                        </div>
                    </>
                )}

                {phase === "idle" && (
                    <div className="mt-8 flex flex-col items-center gap-5 text-center">
                        <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-6 w-full">
                            <div className="font-mono text-[11px] text-white/85">
                                sample
                            </div>
                            <div className="mt-2 font-mono text-base text-white/80">
                                {SNIPPETS[0]}
                            </div>
                        </div>
                        <p className="text-sm text-neutral-300 max-w-sm">
                            {ROUND_SECONDS} seconds. Clear as many commands as you can. Speed bonus on every clear.
                        </p>
                        <button
                            onClick={startRound}
                            className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[var(--color-midnight)] hover:bg-white/90 transition"
                        >
                            Start · Enter
                        </button>
                    </div>
                )}

                {phase === "done" && (
                    <div className="mt-8 flex flex-col items-center gap-4 text-center">
                        <p className="text-3xl sm:text-4xl font-display">{score}</p>
                        <div className="flex gap-x-6 gap-y-1 flex-wrap justify-center text-xs text-white/85">
                            <span>cleared · <span className="text-white/85">{cleared}</span></span>
                            <span>accuracy · <span className="text-white/85">{accuracy}%</span></span>
                            <span>best · <span className="text-white/85">{Math.max(highScore, score)}</span></span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={startRound}
                                className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-[var(--color-midnight)] hover:bg-white/90 transition"
                            >
                                Try again
                            </button>
                            <button
                                onClick={onClose}
                                className="rounded-md border border-white/15 px-5 py-2 text-sm text-neutral-200 hover:border-white/40 transition"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const Stat = ({ label, value, highlight }) => (
    <div className="rounded-md border border-white/5 bg-white/[0.02] px-3 py-2">
        <div className="text-[11px] text-white/85">{label}</div>
        <div className={`mt-0.5 font-display text-xl ${highlight ? "text-white" : "text-white/80"}`}>
            {value}
        </div>
    </div>
)

export default TerminalTyper
