import { useEffect, useState } from "react"
import { motion } from "motion/react"

const LINES = [
    { k: "status", v: "online", c: "mint" },
    { k: "shipping", v: "AI-native product", c: "aqua" },
    { k: "latest", v: "bountyindex.in", c: "aqua" },
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
            className="pointer-events-none hidden md:block absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-[3] w-[22rem] lg:w-[26rem]"
            aria-hidden="true"
        >
            {/* ambient glow */}
            <div className="absolute -inset-10 -z-10 rounded-[2.5rem] bg-[var(--color-aqua)]/10 blur-3xl opacity-70" />

            {/* scanning line */}
            <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-xl pointer-events-none">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-aqua)]/60 to-transparent animate-[scanner_4s_linear_infinite]" />
            </div>

            {/* panel */}
            <div className="relative rounded-xl border border-[var(--color-aqua)]/25 bg-[var(--color-midnight)]/85 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(125,211,252,0.3)]">
                {/* chrome */}
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                        <Dot className="bg-white/20" />
                        <Dot className="bg-white/20" />
                        <Dot className="bg-white/20" />
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                            /dev/varun
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-mint)]">
                        <Dot className="bg-[var(--color-mint)] shadow-[0_0_6px_var(--color-mint)]" />
                        LIVE
                    </div>
                </div>

                {/* body */}
                <div className="px-4 py-4 font-mono text-[12px] leading-relaxed">
                    <div className="text-[var(--color-aqua)]/80">
                        <span className="text-[var(--color-mint)]">›</span> ./varun --init
                    </div>
                    <div className="mt-1 text-neutral-500">
                        booting fleet · {uptime}ms
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
                                <span className="text-neutral-500">{l.k}</span>
                                <span className="flex-1 border-b border-dashed border-white/5 translate-y-[-3px]" />
                                <span className={valueCls(l.c)}>{l.v}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[var(--color-aqua)]">
                        <span className="text-[var(--color-mint)]">›</span>
                        <span className="text-white/70">awaiting signal</span>
                        <span className="inline-block w-2 h-3.5 bg-[var(--color-aqua)] animate-[blink_1.1s_steps(2,start)_infinite]" />
                    </div>
                </div>

                {/* footer meta */}
                <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                    <span>utf-8 · lf</span>
                    <span>v4.7 · opus</span>
                    <span className="text-[var(--color-aqua)]/80">↵ ready</span>
                </div>
            </div>

            {/* floating glyph badges */}
            <div className="absolute -top-4 -right-4 rounded-full border border-[var(--color-aqua)]/40 bg-[var(--color-midnight)]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-aqua)] shadow-[0_0_18px_-4px_var(--color-aqua)]">
                full-stack · ai-native
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-1.5 rounded-full border border-[var(--color-mint)]/40 bg-[var(--color-midnight)]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-mint)]">
                <Dot className="bg-[var(--color-mint)] animate-pulse" />
                shipping
            </div>
        </motion.div>
    )
}

const valueCls = (c) => {
    switch (c) {
        case "mint": return "text-[var(--color-mint)]"
        case "aqua": return "text-[var(--color-aqua)]"
        case "sand": return "text-[var(--color-sand)]"
        default: return "text-neutral-300"
    }
}

export default HeroVisual
