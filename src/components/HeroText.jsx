import { FlipWords } from "./FlipWords"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import AnimatedTooltip from "./AnimatedTooltip"
import { fallbackTestimonials } from "../constants"

const HeroText = () => {
    const variance = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="relative z-10 text-left w-full">
            <div className="relative flex flex-col items-start gap-5 md:gap-7 max-w-xl md:max-w-none">
                <motion.h1
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4, duration: 0.7 }}
                    aria-label="Varun Shukla, full-stack and AI engineer in Raipur, India. I build AI-native products that ship, hold up, and earn."
                    className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
                >
                    <span className="sr-only">
                        Varun Shukla, full-stack and AI engineer in Raipur, India. I build AI-native products that ship, hold up, and earn.
                    </span>
                    <span aria-hidden="true">
                        I build <span className="italic font-display">AI-native</span><br />
                        product that{" "}
                        <span className="inline-flex min-w-[5.5ch] sm:min-w-[6ch] align-baseline">
                            <FlipWords
                                words={["ships", "holds up", "earns"]}
                                className="font-semibold text-white"
                            />
                        </span><br />
                        <span className="text-white/85 text-xl sm:text-2xl md:text-3xl font-normal tracking-normal">
                            Varun Shukla · full-stack engineer, Raipur IN.
                        </span>
                    </span>
                </motion.h1>

                <motion.p
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.75, duration: 0.6 }}
                    className="max-w-md text-base sm:text-lg text-white leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]"
                >
                    Currently at Flux Fortify. On the side, I run{" "}
                    <a
                        href="https://bountyindex.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/80 transition"
                    >
                        Bounty Index
                    </a>
                    <span className="hidden sm:inline">: 2,000+ weekly hunters, 1,160+ programs across 5 platforms</span>.
                </motion.p>

                <motion.div
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="flex items-center gap-2.5 sm:gap-3"
                >
                    <a
                        href="#work"
                        className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md bg-white px-4 sm:px-5 py-3 text-sm font-semibold text-[var(--color-midnight)] transition hover:bg-white/90 whitespace-nowrap"
                    >
                        See projects
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-4 sm:px-5 py-3 text-sm text-white transition hover:border-white/60 whitespace-nowrap"
                    >
                        Get in touch
                    </a>
                </motion.div>

                <motion.a
                    href="#testimonials"
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="group mt-1 flex items-center gap-4"
                    aria-label="Jump to testimonials"
                >
                    <AnimatedTooltip items={fallbackTestimonials.slice(0, 6)} />
                    <span className="text-[12px] text-white/50 group-hover:text-white/80 transition-colors">
                        Read what people say
                    </span>
                </motion.a>
            </div>
        </div>
    )
}

export default HeroText
