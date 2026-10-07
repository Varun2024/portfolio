import { motion } from "motion/react"
import { posts } from "../content/logs"

const rows = [
    { k: "Currently", v: "Bounty Index — 1,160+ programs, daily refresh" },
    { k: "Writing", v: posts[0].title },
    { k: "Stack", v: "next · ts · neon · python" },
]

const HeroVisual = () => {
    return (
        <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none hidden md:block relative z-[3] w-full"
            aria-hidden="true"
        >
            <div className="relative border-l border-white/10 pl-6 py-2">
                <dl className="space-y-5">
                    {rows.map((r, i) => (
                        <motion.div
                            key={r.k}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <dt className="text-[12px] text-white/40">{r.k}</dt>
                            <dd className="mt-1 font-display text-[17px] leading-snug text-white/90 tracking-tight">
                                {r.v}
                            </dd>
                        </motion.div>
                    ))}
                </dl>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.45, duration: 0.6 }}
                    className="mt-7 font-display italic text-[13px] text-white/50"
                >
                    — Raipur, India
                </motion.p>
            </div>
        </motion.aside>
    )
}

export default HeroVisual
