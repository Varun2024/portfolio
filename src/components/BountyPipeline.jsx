import { useEffect, useRef, useState } from "react"

// Visual reinforcement of the Bounty Index prose: the real data path, stage by
// stage. aria-hidden because the paragraph above already states it in full — this
// is a diagram for the eye, not a second copy for screen readers.
const STAGES = [
    { title: "Sources", sub: "HackerOne · Bugcrowd · Intigriti · YesWeHack · Federacy" },
    { title: "Nightly cron", sub: "Vercel · normalizes bounty-targets-data" },
    { title: "Neon Postgres", sub: "1,160+ programs · one table" },
    { title: "Keyboard-first UI", sub: "2k weekly hunters" },
]

const Stage = ({ title, sub }) => (
    <div className="flex flex-1 min-w-0 flex-col justify-center rounded-sm border border-white/10 bg-[var(--color-midnight)] px-3 py-2.5">
        <div className="text-[12.5px] font-medium leading-tight text-white">{title}</div>
        <div className="mt-0.5 text-[11px] leading-snug text-white/60">{sub}</div>
    </div>
)

const Beam = ({ delay }) => (
    <>
        {/* Desktop: horizontal connector between stages. */}
        <div className="hidden shrink-0 items-center md:flex md:w-10 lg:w-14">
            <span className="relative block h-px w-full overflow-hidden bg-white/15">
                <span
                    className="pipe-dot-x absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--color-aqua)]"
                    style={{ animationDelay: `${delay}ms` }}
                />
            </span>
        </div>
        {/* Mobile: vertical connector when stages stack. */}
        <div className="flex justify-center py-1 md:hidden">
            <span className="relative block h-5 w-px overflow-hidden bg-white/15">
                <span
                    className="pipe-dot-y absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[var(--color-aqua)]"
                    style={{ animationDelay: `${delay}ms` }}
                />
            </span>
        </div>
    </>
)

const BountyPipeline = () => {
    const ref = useRef(null)
    const [shown, setShown] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        if (reduce || typeof IntersectionObserver === "undefined") {
            setShown(true)
            return
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setShown(true)
                        io.disconnect()
                        return
                    }
                }
            },
            { threshold: 0.3 },
        )
        io.observe(node)
        return () => io.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="mt-5 flex flex-col md:flex-row md:items-stretch"
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(10px)",
                transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
        >
            {STAGES.map((s, i) => (
                <div key={s.title} className="contents">
                    <Stage title={s.title} sub={s.sub} />
                    {i < STAGES.length - 1 && <Beam delay={i * 600} />}
                </div>
            ))}
        </div>
    )
}

export default BountyPipeline
