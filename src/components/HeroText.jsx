/* eslint-disable no-unused-vars */
import { FlipWords } from "./FlipWords"
import { motion } from "motion/react"

const HeroText = () => {
    const variance = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="relative z-10 mt-28 md:mt-40 text-left c-space w-full">
            <div className="relative flex flex-col items-start gap-5 md:gap-7 max-w-xl md:max-w-2xl">
                <motion.h1
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
                >
                    Hi, I&rsquo;m <span className="text-white">Varun</span> —<br />
                    a full-stack engineer<br />
                    who{" "}
                    <span className="inline-flex min-w-[5.5ch] sm:min-w-[6ch] align-baseline">
                        <FlipWords
                            words={["ships", "tests", "learns"]}
                            className="font-semibold text-[var(--color-aqua)]"
                        />
                    </span>
                </motion.h1>

                <motion.p
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.75, duration: 0.6 }}
                    className="max-w-md text-base sm:text-lg text-white leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]"
                >
                    Shipping AI-native product at Flux Fortify. Latest side ship:{" "}
                    <a
                        href="https://bountyindex.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-aqua)] underline decoration-[var(--color-aqua)]/40 underline-offset-4 hover:decoration-[var(--color-aqua)]"
                    >
                        Bounty Index
                    </a>{" "}
                    — 1,160+ programs across 5 platforms, live-indexed daily.
                </motion.p>

                <motion.div
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="flex flex-wrap items-center gap-3"
                >
                    <a
                        href="#work"
                        data-cursor-tag="Fleet"
                        className="group inline-flex items-center gap-2 rounded-md border border-[var(--color-aqua)]/80 bg-[var(--color-aqua)]/25 backdrop-blur-sm px-5 py-2.5 font-mono text-sm font-medium text-[var(--color-aqua)] shadow-[0_0_20px_-6px_rgba(125,211,252,0.5)] transition hover:border-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/35"
                    >
                        [ view the fleet ]
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        data-cursor-tag="Comms"
                        className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-black/30 backdrop-blur-sm px-5 py-2.5 font-mono text-sm text-white transition hover:border-white/70 hover:bg-black/50"
                    >
                        [ open channel ]
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroText
