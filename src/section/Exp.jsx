import { useRef, useState } from "react"
import { experiences } from "../constants"
import SectionHeading from "../components/SectionHeading"

const isOngoing = (dateStr) => /present/i.test(dateStr)

const formatDate = (dateStr) =>
    isOngoing(dateStr) ? dateStr.replace(/\s*-\s*present/i, " → Present") : dateStr

const monthsSincePresent = (dateStr) => {
    // Months elapsed since an ongoing role began; null when the start has no
    // parseable month, so only dated ongoing roles show a tenure.
    if (!isOngoing(dateStr)) return null
    const [start] = dateStr.split(/\s*-\s*/)
    const startDate = new Date(`${start.trim()} 1`)
    if (Number.isNaN(startDate.getTime())) return null
    const now = new Date()
    const m = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
    return Math.max(1, m)
}

// Company label for the index column: first segment of the job string.
const companyOf = (exp) => exp.job.split("·")[0].split("·")[0].trim()

const Detail = ({ exp, isCurrent }) => {
    const tenureMo = monthsSincePresent(exp.date)
    return (
        <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] text-white/70">
                <time>{formatDate(exp.date)}</time>
                {tenureMo != null && <span className="text-[var(--color-aqua)]/80">· {tenureMo} mo</span>}
                {isCurrent && (
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-2 py-0.5 text-[11px] text-[var(--color-aqua)]">
                        <span className="inline-flex size-1.5 rounded-full bg-[var(--color-aqua)]" />
                        Currently here
                    </span>
                )}
            </div>
            <h3 className="mt-2 text-2xl font-medium leading-tight text-white md:text-[1.75rem]">
                {exp.title.trim()}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-sand)]">{exp.job}</p>
            <ul className="mt-5 flex max-w-2xl flex-col gap-2.5 text-sm leading-relaxed text-neutral-200">
                {exp.contents.map((line, i) => (
                    <li key={i} className="flex gap-3">
                        <span className="mt-[0.5rem] inline-block h-px w-3 shrink-0 bg-[var(--color-aqua)]/70" />
                        <span>{line}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Exp = () => {
    const [selected, setSelected] = useState(0)
    const btnRefs = useRef([])

    const onKeyDown = (e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
        e.preventDefault()
        const dir = e.key === "ArrowDown" ? 1 : -1
        const next = (selected + dir + experiences.length) % experiences.length
        setSelected(next)
        btnRefs.current[next]?.focus()
    }

    const active = experiences[selected]

    return (
        <section id="experience" className="c-space section-spacing">
            <SectionHeading right={`${experiences.length} roles`}>Experience</SectionHeading>
            <p className="mt-5 max-w-xl text-sm text-white/85 md:text-base">
                Where I've worked across product, research, and freelance. Pick a role.
            </p>

            <div className="mt-10 grid gap-y-2 md:mt-12 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-x-12">
                {/* Index: selectable list of roles. Fills the left; drives the detail panel. */}
                <div
                    role="tablist"
                    aria-label="Roles"
                    aria-orientation="vertical"
                    onKeyDown={onKeyDown}
                    className="flex flex-col md:self-start md:sticky md:top-24"
                >
                    {experiences.map((exp, i) => {
                        const isSel = i === selected
                        const isCurrent = i === 0
                        return (
                            <div key={`${exp.job}-${i}`}>
                                <button
                                    ref={(el) => (btnRefs.current[i] = el)}
                                    role="tab"
                                    type="button"
                                    aria-selected={isSel}
                                    tabIndex={isSel ? 0 : -1}
                                    onClick={() => setSelected(i)}
                                    className={`group relative w-full cursor-pointer rounded-sm py-3.5 pl-4 pr-3 text-left transition-colors ${
                                        isSel ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-colors ${
                                            isSel ? "bg-[var(--color-aqua)]" : "bg-white/10 group-hover:bg-white/25"
                                        }`}
                                    />
                                    <span className="flex items-center justify-between gap-3">
                                        <span className={`text-[15px] font-medium leading-tight transition-colors ${isSel ? "text-white" : "text-white/70"}`}>
                                            {companyOf(exp)}
                                        </span>
                                        {isCurrent && (
                                            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-aqua)]">
                                                <span className="size-1.5 rounded-full bg-[var(--color-aqua)]" />
                                                Now
                                            </span>
                                        )}
                                    </span>
                                    <span className="mt-0.5 block text-[12px] text-white/50">{formatDate(exp.date)}</span>
                                </button>

                                {/* Mobile: the selected role expands inline (accordion). */}
                                <div className={`md:hidden ${isSel ? "block" : "hidden"} px-4 pb-6 pt-2`}>
                                    {isSel && <Detail exp={exp} isCurrent={isCurrent} />}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Detail: full role on the right, filling the canvas. Re-animates on change. */}
                <div className="hidden md:block">
                    <div key={selected} className="exp-reveal">
                        <Detail exp={active} isCurrent={selected === 0} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Exp
