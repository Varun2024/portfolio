import { useEffect, useRef, useState } from "react"
import { experiences } from "../constants"
import SectionHeading from "../components/SectionHeading"

const PAGE_BG = "#030412" // body background — nodes sit on this so the rail line doesn't show through

const isOngoing = (dateStr) => /present/i.test(dateStr)

const formatDate = (dateStr) =>
    isOngoing(dateStr) ? dateStr.replace(/\s*-\s*present/i, " → Present") : dateStr

const monthsSincePresent = (dateStr) => {
    // Months elapsed since an ongoing role began. Returns null when the start
    // has no parseable month (e.g. "2025-Present"), so only dated roles show tenure.
    if (!isOngoing(dateStr)) return null
    const [start] = dateStr.split(/\s*-\s*/)
    const startDate = new Date(`${start.trim()} 1`)
    if (Number.isNaN(startDate.getTime())) return null
    const now = new Date()
    const m = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
    return Math.max(1, m)
}

const Node = ({ isCurrent }) => {
    if (isCurrent) {
        // The current role's node is the portrait itself: "here's the human behind
        // the role" as the you-are-here marker, not a watermark behind the text.
        return (
            <span
                className="relative z-10 block size-8 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-aqua)]"
                style={{ background: PAGE_BG }}
            >
                <img
                    src="/assets/avatar-varun.svg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "66% 26%", transform: "scale(1.2)" }}
                />
            </span>
        )
    }
    return (
        <span
            className="relative z-10 mt-1.5 flex size-3.5 shrink-0 items-center justify-center rounded-full ring-1 ring-white/25"
            style={{ background: PAGE_BG }}
        >
            <span className="size-1.5 rounded-full bg-white/40" />
        </span>
    )
}

const TimelineRow = ({ exp, isCurrent, isLast, shown, delay }) => {
    const tenureMo = monthsSincePresent(exp.date)
    const highlights = isCurrent ? exp.contents : exp.contents.slice(0, 3)

    return (
        <li
            className="relative grid grid-cols-[2rem_1fr] gap-x-4 md:grid-cols-[2.5rem_1fr] md:gap-x-6"
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 520ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 520ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
        >
            {/* Rail: the connecting spine plus this row's node, centered in the column. */}
            <div className="relative flex justify-center">
                <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white/10"
                    style={{
                        height: isLast ? "1.75rem" : "100%",
                        transformOrigin: "top",
                        transform: shown ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
                    }}
                />
                <Node isCurrent={isCurrent} />
            </div>

            {/* Content: meta line, role, company, highlights. */}
            <div className={isLast ? "pb-2" : "pb-10 md:pb-12"}>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] text-white/70">
                    <time>{formatDate(exp.date)}</time>
                    {tenureMo != null && (
                        <span className="text-[var(--color-aqua)]/80">· {tenureMo} mo</span>
                    )}
                    {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-2 py-0.5 text-[11px] text-[var(--color-aqua)]">
                            <span className="inline-flex size-1.5 rounded-full bg-[var(--color-aqua)]" />
                            Currently here
                        </span>
                    )}
                </div>

                <h3
                    className={`mt-1.5 font-medium leading-tight text-white ${
                        isCurrent ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                    }`}
                >
                    {exp.title.trim()}
                </h3>
                <p className="mt-0.5 text-sm text-[var(--color-sand)]">{exp.job}</p>

                <ul className="mt-3 flex flex-col gap-2 text-sm leading-snug text-neutral-200">
                    {highlights.map((line, i) => (
                        <li key={i} className={`flex gap-2.5 ${i >= 2 ? "hidden md:flex" : ""}`}>
                            <span className="mt-[0.45rem] inline-block h-px w-2.5 shrink-0 bg-[var(--color-aqua)]/70" />
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

const Exp = () => {
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
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
        )
        io.observe(node)
        return () => io.disconnect()
    }, [])

    return (
        <section id="experience" className="c-space section-spacing">
            <SectionHeading right={`${experiences.length} roles`}>Experience</SectionHeading>
            <p className="mt-5 max-w-xl text-sm text-white/85 md:text-base">
                Where I've worked across product, research, and freelance. Most recent first.
            </p>

            <ol ref={ref} className="mt-12 md:mt-14">
                {experiences.map((exp, i) => (
                    <TimelineRow
                        key={`${exp.job}-${i}`}
                        exp={exp}
                        isCurrent={i === 0}
                        isLast={i === experiences.length - 1}
                        shown={shown}
                        delay={i * 90}
                    />
                ))}
            </ol>
        </section>
    )
}

export default Exp
