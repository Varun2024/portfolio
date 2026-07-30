import { experiences } from "../constants"
import SectionHeading from "../components/SectionHeading"

const ExperienceCard = ({ exp, className, accentClass = "grid-default-color", highlights = 3 }) => (
    <div className={`${accentClass} ${className} flex flex-col justify-between`}>
        <div className="z-10 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
                <span>{exp.date}</span>
            </div>
            <p className="text-xl md:text-2xl font-medium leading-tight">{exp.title}</p>
            <p className="text-sm text-[var(--color-sand)]">{exp.job}</p>
        </div>
        <ul className="z-10 mt-4 flex flex-col gap-1.5 text-sm text-neutral-300/90">
            {exp.contents.slice(0, highlights).map((line, i) => (
                <li key={i} className="flex gap-2 leading-snug">
                    <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-[var(--color-lavender)]" />
                    <span>{line}</span>
                </li>
            ))}
        </ul>
    </div>
)

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
