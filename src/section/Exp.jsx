import { experiences } from "../constants"
import SectionHeading from "../components/SectionHeading"

const monthsSincePresent = (dateStr) => {
    // "Apr 2026 - Present" → months since Apr 2026. Returns null if not a Present role.
    const [start, end] = dateStr.split(/\s*-\s*/)
    if (!end || !/present/i.test(end)) return null
    const startDate = new Date(`${start} 1`)
    if (Number.isNaN(startDate.getTime())) return null
    const now = new Date()
    const m = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
    return Math.max(1, m)
}

const formatDate = (dateStr, isCurrent) => {
    if (!isCurrent) return dateStr
    return dateStr.replace(/\s*-\s*Present/i, " → Present")
}

const ExperienceCard = ({ exp, className, accentClass = "grid-default-color", highlights = 3, isCurrent = false }) => {
    const tenureMo = isCurrent ? monthsSincePresent(exp.date) : null
    return (
    <div className={`${accentClass} ${className} relative flex flex-col justify-between overflow-hidden`}>
        {isCurrent && (
            <>
                <span className="absolute right-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-aqua)]">
                    <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-aqua)] opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-aqua)]" />
                    </span>
                    Currently here
                </span>
                {/* Personal identity anchor in the empty middle — the notionists
                    portrait doubles as "here's the human behind the role". */}
                <img
                    src="/assets/avatar-varun.svg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.22] [filter:invert(88%)_sepia(19%)_saturate(556%)_hue-rotate(151deg)_brightness(105%)_contrast(93%)]"
                    style={{ objectFit: "cover", objectPosition: "70% 30%", transform: "scale(2.2)", transformOrigin: "70% 30%" }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-black/20"
                />
            </>
        )}
        <div className="relative z-10 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
                <span>{formatDate(exp.date, isCurrent)}</span>
                {tenureMo != null && <span className="text-[var(--color-aqua)]/70">· {tenureMo} mo</span>}
            </div>
            <p className="text-xl md:text-2xl font-medium leading-tight">{exp.title}</p>
            <p className="text-sm text-[var(--color-sand)]">{exp.job}</p>
        </div>
        <ul className="z-10 mt-4 flex flex-col gap-1.5 text-sm text-neutral-300/90">
            {exp.contents.slice(0, highlights).map((line, i) => (
                <li key={i} className="flex gap-2 leading-snug">
                    <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-[var(--color-aqua)]" />
                    <span>{line}</span>
                </li>
            ))}
        </ul>
    </div>
    )
}

const Exp = () => {
    const [current, chainframe, freelance, ml, grain] = experiences

    return (
        <section id="experience" className="c-space section-spacing">
            <SectionHeading>Mission Log</SectionHeading>
            <p className="mt-3 max-w-xl text-sm text-neutral-400 md:text-base">
                Deployments across product, research, and freelance space — most recent orbit first.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem]">
                <ExperienceCard
                    exp={current}
                    accentClass="grid-deep-purple"
                    className="md:col-span-3 md:row-span-2 md:h-full"
                    highlights={5}
                    isCurrent
                />
                <ExperienceCard
                    exp={chainframe}
                    accentClass="grid-default-color"
                    className="md:col-span-3 md:h-full"
                />
                <ExperienceCard
                    exp={freelance}
                    accentClass="grid-default-color"
                    className="md:col-span-3 md:h-full"
                />
                <ExperienceCard
                    exp={ml}
                    accentClass="grid-black-color"
                    className="md:col-span-3 md:h-full"
                />
                <ExperienceCard
                    exp={grain}
                    accentClass="grid-default-color"
                    className="md:col-span-3 md:h-full"
                />
            </div>
        </section>
    )
}

export default Exp
