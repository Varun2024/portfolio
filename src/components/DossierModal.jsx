import { useEffect, useRef, useState } from "react"

const LINES = [
    { text: "$ cat /var/dossier.json", cls: "text-white/60" },
    { text: "", pause: 80 },
    { text: "{", cls: "text-[var(--color-aqua)]" },
    { text: '  "callsign":  "Varun Shukla",', cls: "text-white" },
    { text: '  "role":      "Full-stack & AI Engineer",', cls: "text-white" },
    { text: '  "current":   "Flux Fortify",', cls: "text-white" },
    { text: '  "sector":    "IN-3 · Raipur",', cls: "text-white" },
    { text: '  "stack":     ["React", "Next.js", "Node", "Python", "TypeScript"],', cls: "text-white" },
    { text: '  "channel":   "varunshukla747@gmail.com"', cls: "text-white" },
    { text: "}", cls: "text-[var(--color-aqua)]" },
    { text: "", pause: 120 },
    { text: "$ ls -1 missions/", cls: "text-white/60" },
    { text: "flux-fortify/", cls: "text-[var(--color-mint)]" },
    { text: "chainframe/", cls: "text-white/70" },
    { text: "freelance/", cls: "text-white/70" },
    { text: "iit-bhilai-ml/", cls: "text-white/70" },
    { text: "grainscope/", cls: "text-white/70" },
    { text: "", pause: 120 },
    { text: "$ ./open-full-dossier.pdf", cls: "text-white/60" },
    { text: "> ready. click below to download.", cls: "text-[var(--color-sand)]" },
]

const CHAR_MS = 6
const LINE_GAP_MS = 30

const DossierModal = ({ open, onClose, downloadHref }) => {
    const [lines, setLines] = useState([""])
    const [done, setDone] = useState(false)
    const doneRef = useRef(false)

    useEffect(() => {
        if (!open) {
            setLines([""])
            setDone(false)
            doneRef.current = false
            return
        }
        let cancelled = false
        let timers = []

        const type = async () => {
            for (let i = 0; i < LINES.length; i++) {
                const target = LINES[i].text
                if (LINES[i].pause) {
                    await new Promise((r) => { const t = setTimeout(r, LINES[i].pause); timers.push(t) })
                }
                for (let c = 1; c <= target.length; c++) {
                    if (cancelled) return
                    await new Promise((r) => { const t = setTimeout(r, CHAR_MS); timers.push(t) })
                    setLines((prev) => {
                        const next = [...prev]
                        next[i] = target.slice(0, c)
                        return next
                    })
                }
                if (i < LINES.length - 1) {
                    setLines((prev) => [...prev, ""])
                    await new Promise((r) => { const t = setTimeout(r, LINE_GAP_MS); timers.push(t) })
                }
            }
            if (!cancelled) {
                doneRef.current = true
                setDone(true)
            }
        }
        type()

        return () => {
            cancelled = true
            timers.forEach(clearTimeout)
        }
    }, [open])

    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === "Escape") onClose()
            if (e.key === "Enter" || e.key === " ") {
                // instant-complete: skip typing
                setLines(LINES.map((l) => l.text))
                setDone(true)
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, onClose])

    if (!open) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Dossier"
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl rounded-xl border border-white/10 bg-[#04070f]/98 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
            >
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="ml-2 font-mono text-[11px] text-white/40">dossier.exe — /var/varun</span>
                    <button
                        onClick={onClose}
                        aria-label="Close dossier"
                        data-cursor-tag="Close"
                        className="ml-auto text-white/40 hover:text-white transition"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
                    <div className="font-mono text-[13px] leading-relaxed">
                        {lines.map((line, i) => (
                            <div key={i} className={`whitespace-pre ${LINES[i]?.cls || "text-white"}`}>
                                {line || " "}
                                {i === lines.length - 1 && !done && (
                                    <span className="ml-0.5 inline-block h-4 w-2 -mb-0.5 bg-[var(--color-aqua)] align-middle animate-pulse" />
                                )}
                            </div>
                        ))}
                    </div>

                    {done && (
                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href={downloadHref}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor-tag="Download"
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-4 py-2.5 font-mono text-sm text-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/20 hover:border-[var(--color-aqua)]/70 transition"
                            >
                                [ download full pdf ]
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <span className="font-mono text-[10px] text-white/30">esc to close · enter to skip typing</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DossierModal
