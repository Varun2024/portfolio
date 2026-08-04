import { Globe } from '../components/Globe'
import CopyEmailButton from '../components/CopyEmailButton'
import { FrameWorks } from '../components/FrameWorks'
import SectionHeading from '../components/SectionHeading'

// Small terminal-style panel header with a filename tag.
const PanelTag = ({ children }) => (
    <div className="mb-3 flex items-center gap-2 font-mono text-[10px] text-white/60">
        <span className="inline-block size-1.5 rounded-full bg-[var(--color-aqua)]/60" />
        {children}
    </div>
)

const About = () => {
    return (
        <section id="about" className='c-space mt-16 md:mt-24'>
            <SectionHeading>Origin Log</SectionHeading>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                <span><span className="text-[var(--color-aqua)]">›</span> 2+ yr shipping</span>
                <span className="text-white/25">·</span>
                <span><span className="text-[var(--color-aqua)]">›</span> React · Next · Node · Python</span>
                <span className="text-white/25">·</span>
                <span><span className="text-[var(--color-aqua)]">›</span> Raipur, IN <span className="text-white/40">(UTC+5:30)</span></span>
                <span className="text-white/25">·</span>
                <span className="inline-flex items-center gap-1.5"><span className="relative flex size-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint)] opacity-70" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-mint)]" /></span><span className="text-[var(--color-mint)]">open to remote</span></span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-8">

                {/* grid 1 — PILOT ID */}
                <div className="flex flex-col grid-default-color grid-1">
                    <PanelTag>~/pilot.dat</PanelTag>
                    <img
                        src="assets/971.jpg"
                        alt=""
                        aria-hidden="true"
                        className='absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5rem] opacity-80'
                    />
                    <div className="z-10 mt-auto">
                        <p className='headtext'>Hi, I'm Varun Shukla</p>
                        <p className='subtext'>Full-stack pilot fluent in React, Next.js, and machine learning — shipping fast, user-friendly product surfaces with smart, data-driven systems onboard.</p>
                    </div>
                    <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[var(--color-midnight)]"></div>
                </div>

                {/* grid 2 — PRINCIPLES */}
                <div className="grid-default-color grid-2 flex flex-col">
                    <PanelTag>~/manifesto.md</PanelTag>
                    <div className="font-mono text-[13px] leading-relaxed">
                        <div className="text-white/60">$ cat manifesto.md</div>
                        <div className="mt-3 text-white/90"># crafted, not just coded</div>
                        <div className="mt-3 space-y-1 text-white/70">
                            <div><span className="text-[var(--color-aqua)]">-</span> SRP    · one job per module</div>
                            <div><span className="text-[var(--color-aqua)]">-</span> SOLID  · design integrity</div>
                            <div><span className="text-[var(--color-aqua)]">-</span> DRY    · repeat only intentionally</div>
                            <div><span className="text-[var(--color-aqua)]">-</span> KISS   · simple beats clever</div>
                            <div><span className="text-[var(--color-aqua)]">-</span> YAGNI  · ship what earns its spot</div>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-white/60">
                            <span>$</span>
                            <span className="inline-block h-3.5 w-1.5 -mb-0.5 bg-[var(--color-aqua)] animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* grid 3 — COORDINATES */}
                <div className="grid-black-color grid-3">
                    <PanelTag>~/coords</PanelTag>
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Coordinates</p>
                        <p className='subtext'>Broadcasting from Sector IN-3 · Raipur. Open to remote worldwide.</p>
                        <div className="mt-3 font-mono text-[11px] text-white/60">
                            <div>LAT  21.2514° N</div>
                            <div>LONG 81.6296° E</div>
                            <div>UTC  +05:30</div>
                        </div>
                    </div>
                    <figure className='absolute left-[30%] top-[10%]'>
                        <Globe />
                    </figure>
                </div>

                {/* grid 4 — CHANNEL */}
                <div className="grid-special-color grid-4">
                    <PanelTag>~/comms</PanelTag>
                    <div className="flex flex-col items-center justify-center gap-4 size-full">
                        <p className="text-center headtext">
                            Ready to launch something?
                        </p>
                        <CopyEmailButton />
                    </div>
                </div>

                {/* grid 5 — LOADOUT */}
                <div className="grid-default-color grid-5">
                    <PanelTag>~/loadout</PanelTag>
                    <div className="z-10 w-[55%]">
                        <p className="headtext">Loadout</p>
                        <div className="mt-3 space-y-1.5 font-mono text-[11px] leading-relaxed">
                            <div><span className="text-[var(--color-aqua)]">frontend</span>  <span className="text-white/50">›</span> <span className="text-white/85">React · Next · TS · Tailwind · Motion</span></div>
                            <div><span className="text-[var(--color-aqua)]">3d/webgl</span>  <span className="text-white/50">›</span> <span className="text-white/85">Three.js · R3F · Drei</span></div>
                            <div><span className="text-[var(--color-aqua)]">backend</span>   <span className="text-white/50">›</span> <span className="text-white/85">Node · Python · Postgres · Drizzle · Neon</span></div>
                            <div><span className="text-[var(--color-aqua)]">ai/ml</span>     <span className="text-white/50">›</span> <span className="text-white/85">LLM APIs · YOLO · OpenCV · PyTorch</span></div>
                            <div><span className="text-[var(--color-aqua)]">cloud</span>     <span className="text-white/50">›</span> <span className="text-white/85">Firebase · Vercel · Serverless</span></div>
                        </div>
                    </div>
                    <div className="absolute inset-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125 ">
                        <FrameWorks />
                    </div>
                </div>

            </div>

            {/* Commit graph — real proof-of-work strip below the bento */}
            <div className="grid-default-color mt-4 md:col-span-6 overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                    <PanelTag>~/commits.log</PanelTag>
                    <a
                        href="https://github.com/Varun2024"
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-aqua)]/80 hover:text-[var(--color-aqua)]"
                    >
                        @Varun2024 ↗
                    </a>
                </div>
                <p className="mt-1 font-mono text-[11px] text-white/60">
                    {'>'} last 12 months of public commits
                </p>
                <img
                    src="https://ghchart.rshah.org/22c55e/Varun2024"
                    alt="Varun's GitHub contribution graph — last 12 months"
                    loading="lazy"
                    className="mt-4 w-full opacity-95"
                />
            </div>
        </section>
    )
}

export default About
