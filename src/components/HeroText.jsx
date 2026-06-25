/* eslint-disable no-unused-vars */
import { FlipWords } from "./FlipWords"
import { motion } from "motion/react"

const HeroText = () => {
    const variance = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="z-10 mt-28 md:mt-40 text-left c-space w-full">
            <div className="flex flex-col items-start gap-5 md:gap-7 max-w-xl md:max-w-2xl">
                <motion.h1
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight"
                >
                    Hi, I&rsquo;m <span className="text-white">Varun</span>.<br />
                    I build{" "}
                    <span className="inline-block align-bottom">
                        <FlipWords
                            words={["robust", "elegant", "scalable"]}
                            className="font-semibold bg-gradient-to-r from-[var(--color-lavender)] to-[var(--color-aqua)] bg-clip-text text-transparent"
                        />
                    </span>{" "}
                    products.
                </motion.h1>

                <motion.p
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.75, duration: 0.6 }}
                    className="max-w-md text-sm sm:text-base text-neutral-300/90 leading-relaxed"
                >
                    Software engineer crafting performant web apps and AI-driven
                    features end-to-end. Currently building full-stack &amp; AI
                    systems at Flux Fortify.
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
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(122,87,219,0.5)] transition hover:scale-[1.02]"
                    >
                        See selected work
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-neutral-100 transition hover:border-white/35 hover:bg-white/5"
                    >
                        Get in touch
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroText
