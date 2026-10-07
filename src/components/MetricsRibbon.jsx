const metrics = [
    { n: "15+", label: "shipped products" },
    { n: "2,000+", label: "weekly users on side projects" },
    { n: "1,160+", label: "programs live-indexed daily" },
    { n: "< 24h", label: "typical reply time" },
]

const MetricsRibbon = () => (
    <section
        aria-label="At a glance"
        className="c-space mt-24 md:mt-32"
    >
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-y border-white/10 py-8 sm:py-10 md:grid-cols-4 md:gap-x-6">
            {metrics.map((m) => (
                <div key={m.label} className="flex flex-col items-start gap-1">
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl leading-none text-white">
                        {m.n}
                    </span>
                    <span className="text-[11px] sm:text-[12px] leading-snug text-white/85">
                        {m.label}
                    </span>
                </div>
            ))}
        </div>
    </section>
)

export default MetricsRibbon
