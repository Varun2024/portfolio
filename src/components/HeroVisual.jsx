import { useEffect, useState } from "react"
import { motion } from "motion/react"

const LINES = [
    { k: "status", v: "online", c: "mint" },
    { k: "shipping", v: "AI-native product", c: "white" },
    { k: "latest", v: "bountyindex.in", c: "white" },
    { k: "indexed", v: "1,160+ programs", c: "sand" },
    { k: "weekly_hunters", v: "2,000+", c: "sand" },
    { k: "stack", v: "next · ts · neon · python", c: "neutral" },
]

const Dot = ({ className = "" }) => (
    <span className={`inline-block size-1.5 rounded-full ${className}`} />
)

const HeroVisual = () => {
    const [tick, setTick] = useState(0)
    useEffect(() => {
        const id = setInterval(() => setTick((t) => (t + 1) % 1000), 1200)
        return () => clearInterval(id)
    }, [])

    const uptime = String(1200 + tick).padStart(4, "0")

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none hidden md:block relative z-[3] w-full"
            aria-hidden="true"
        >
            <div className="relative rounded-xl border border-white/10 bg-[var(--color-midnight)]/90 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                {/* chrome */}
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                        <Dot className="bg-white/15" />
                        <Dot className="bg-white/15" />
                        <Dot className="bg-white/15" />
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                            /dev/varun
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-mint)]">
                        <Dot className="bg-[var(--color-mint)]" />
                        LIVE
                    </div>
                </div>

                {/* body */}
                <div className="px-4 py-4 font-mono text-[12px] leading-relaxed">
                    <div className="text-white/70">
                        <span className="text-white/40">›</span> ./varun --init
                    </div>
                    <div className="mt-1 text-white/35">
                        booting · {uptime}ms
                    </div>

                    <div className="mt-3 space-y-1">
                        {LINES.map((l, i) => (
                            <motion.div
                                key={l.k}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + i * 0.12, duration: 0.4 }}
                                className="flex items-baseline gap-2"
                            >
                                <span className="text-white/40">{l.k}</span>
                                <span className="flex-1 border-b border-dashed border-white/5 translate-y-[-3px]" />
                                <span className={valueCls(l.c)}>{l.v}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                        <span className="text-white/40">›</span>
                        <span className="text-white/60">awaiting signal</span>
                        <span className="inline-block w-2 h-3.5 bg-white/70 animate-[blink_1.1s_steps(2,start)_infinite]" />
                    </div>
                </div>

                {/* footer meta */}
                <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                    <span>utf-8 · lf</span>
                    <span>v4.7 · opus</span>
                    <span>↵ ready</span>
                </div>
            </div>
        </motion.div>
    )
}

const valueCls = (c) => {
    switch (c) {
        case "mint": return "text-[var(--color-mint)]"
        case "sand": return "text-[var(--color-sand)]"
        case "white": return "text-white/90"
        default: return "text-white/55"
    }
}

export default HeroVisual
