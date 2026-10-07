import { Globe } from '../components/Globe'
import CopyEmailButton from '../components/CopyEmailButton'
import { FrameWorks } from '../components/FrameWorks'
import SectionHeading from '../components/SectionHeading'

// ghchart.rshah.org gives us one color param (contribution cells) but bakes
// empty cells as light gray #ebedf0 — which looks off on the dark surface.
// CORS blocks server-side fetch/recolor, so we lean on CSS:
//   1. Feed the endpoint a WARM tone that survives inversion into aqua.
//   2. invert(1) flips the light-gray empty cells to dark, and the warm
//      contribution cells to their aqua-side complement.
// Net: empty → near-black (blends into panel), filled → site aqua.
const CommitGraph = ({ user }) => (
    <img
        src={`https://ghchart.rshah.org/822c03/${user}`}
        alt={`GitHub contribution graph for ${user}, last 12 months`}
        loading="lazy"
        className="w-full [filter:invert(1)_hue-rotate(0deg)_saturate(1.05)_brightness(1)_drop-shadow(0_0_10px_rgba(125,211,252,0.2))]"
    />
)

const PanelTag = ({ children }) => (
    <div className="mb-3 text-[11px] text-white/85">
        {children}
    </div>
)

const About = () => {
    return (
        <section id="about" className='c-space mt-16 md:mt-24'>
            <SectionHeading right="2+ yr shipping">About</SectionHeading>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
                <span>React · Next · Node · Python</span>
                <span className="text-white/20">·</span>
                <span>Raipur, IN <span className="text-white/35">(UTC+5:30)</span></span>
                <span className="text-white/20">·</span>
                <span className="inline-flex items-center gap-2 text-[var(--color-mint)]">
                    <span className="size-1.5 rounded-full bg-[var(--color-mint)]" />
                    Open to remote
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-8">

                {/* grid 1 — PILOT ID */}
                <div className="flex flex-col grid-default-color grid-1 overflow-hidden">
                    <PanelTag>profile</PanelTag>
                    <div className="relative z-10 flex items-start gap-4 sm:gap-5 md:flex-col md:items-start md:h-full">
                        <div className="relative shrink-0 size-20 sm:size-24 md:size-32 rounded-full border border-white/15 bg-[var(--color-indigo)] overflow-hidden">
                            <img
                                src="/assets/avatar-varun.svg"
                                alt="Varun Shukla"
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover scale-[1.15] translate-y-[6%]"
                            />
                        </div>
                        <div className="min-w-0 md:mt-auto">
                            <p className='headtext'>Hi, I'm Varun Shukla</p>
                            <p className='subtext md:hidden'>Full-stack engineer. React, Next, ML.</p>
                            <p className='subtext hidden md:block'>Full-stack engineer fluent in React, Next.js, and machine learning. I ship fast, user-friendly product surfaces backed by smart, data-driven systems.</p>
                        </div>
                    </div>
                </div>

                {/* grid 2 — OPINIONS */}
                <div className="grid-default-color grid-2 flex flex-col">
                    <PanelTag>opinions</PanelTag>
                    <div className="flex-1 flex flex-col justify-center md:justify-start">
                        <p className="font-display text-[1.75rem] md:text-[1.75rem] leading-[1.15] text-white tracking-tight">
                            Ship it rough,<br className="md:hidden" /> then make it good.
                        </p>
                        <p className="mt-3 text-[13px] text-white/85 md:hidden">
                            Three engineering opinions I actually hold.
                        </p>
                        <div className="hidden md:flex mt-5 flex-col gap-3 text-[13.5px] leading-relaxed text-white/85">
                            <p>
                                A specific error message beats a <code className="font-mono text-[12px] text-white/85">try/catch</code> that swallows the problem.
                            </p>
                            <p>
                                Delete more code than you add. Dead branches are where bugs sleep.
                            </p>
                        </div>
                    </div>
                </div>

                {/* grid 3 — COORDINATES */}
                <div className="grid-black-color grid-3">
                    <PanelTag>location</PanelTag>
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Based in Raipur</p>
                        <p className='subtext'>Working remote worldwide.</p>
                        <div className="mt-3 font-mono text-[11px] text-white/50">
                            <div>21.25° N  ·  81.63° E</div>
                            <div>UTC +05:30</div>
                        </div>
                    </div>
                    <figure className='absolute left-[30%] top-[10%]'>
                        <Globe />
                    </figure>
                </div>

                {/* grid 4 — CHANNEL */}
                <div className="grid-special-color grid-4">
                    <PanelTag>contact</PanelTag>
                    <div className="flex flex-col items-center justify-center gap-4 size-full">
                        <p className="text-center headtext">
                            Ready to launch something?
                        </p>
                        <CopyEmailButton />
                    </div>
                </div>

                {/* grid 5 — LOADOUT */}
                <div className="grid-default-color grid-5">
                    <PanelTag>stack</PanelTag>
                    <div className="z-10 w-full md:w-[55%]">
                        <div className="mt-3 space-y-1.5 font-mono text-[11px] leading-relaxed">
                            <div><span className="text-white/85">frontend</span>  <span className="text-white/30">·</span> <span className="text-white/90">React · Next · TS · Tailwind · Motion</span></div>
                            <div><span className="text-white/85">backend</span>   <span className="text-white/30">·</span> <span className="text-white/90">Node · Python · Postgres · Prisma</span></div>
                            <div><span className="text-white/85">ai</span>        <span className="text-white/30">·</span> <span className="text-white/90">OpenAI · AI SDK · LangChain · PyTorch</span></div>
                            <div><span className="text-white/85">cloud</span>     <span className="text-white/30">·</span> <span className="text-white/90">Firebase · Vercel · Stripe</span></div>
                        </div>
                    </div>
                    <div className="hidden md:block absolute inset-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125 ">
                        <FrameWorks />
                    </div>
                </div>

            </div>

            {/* Commit graph — real proof-of-work strip below the bento */}
            <div className="grid-default-color relative mt-4 md:col-span-6 overflow-hidden">
                <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                        <PanelTag>activity</PanelTag>
                        <a
                            href="https://github.com/Varun2024"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[12px] text-white/85 hover:text-white"
                        >
                            @Varun2024 ↗
                        </a>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-white/85">
                        {'>'} last 12 months of public commits
                    </p>
                    <div className="relative mt-4 rounded-sm border border-white/10 bg-black/30 p-3">
                        <CommitGraph user="Varun2024" />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-white/85">
                        <span>less</span>
                        <div className="flex items-center gap-1">
                            {[0.12, 0.28, 0.5, 0.75, 1].map((a) => (
                                <span
                                    key={a}
                                    className="inline-block size-2.5 rounded-[2px]"
                                    style={{ backgroundColor: `rgba(125, 211, 252, ${a})` }}
                                />
                            ))}
                        </div>
                        <span>more</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
