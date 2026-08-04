const metrics = [
    { n: "15+", label: "shipped projects", color: "var(--color-aqua)" },
    { n: "6", label: "signals received", color: "var(--color-mint)" },
    { n: "2+", label: "yrs building", color: "var(--color-aqua)" },
    { n: "24h", label: "avg reply", color: "var(--color-sand)" },
]

const MetricsRibbon = () => (
    <section
        aria-label="At a glance"
        className="c-space mt-16 md:mt-20"
    >
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--color-midnight)]/70 px-6 py-6 sm:px-10 sm:py-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-aqua)]/40 to-transparent" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
                {metrics.map((m) => (
                    <div key={m.label} className="flex flex-col items-start gap-1">
                        <span className="font-display text-4xl leading-none md:text-5xl" style={{ color: m.color }}>
                            {m.n}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                            {m.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export default MetricsRibbon
