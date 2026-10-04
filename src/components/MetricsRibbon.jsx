const metrics = [
    { n: "15+", label: "shipped products" },
    { n: "2,000+", label: "weekly users on side projects" },
    { n: "1,160+", label: "programs live-indexed daily" },
    { n: "< 24h", label: "typical reply time" },
]

const MetricsRibbon = () => (
    <section
        aria-label="At a glance"
        className="c-space mt-16 md:mt-20"
    >
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-white/10 py-8 sm:py-10 md:grid-cols-4">
            {metrics.map((m) => (
                <div key={m.label} className="flex flex-col items-start gap-1.5">
                    <span className="font-display text-4xl leading-none text-white md:text-5xl">
                        {m.n}
                    </span>
                    <span className="text-[12px] text-white/55">
                        {m.label}
                    </span>
                </div>
            ))}
        </div>
    </section>
)

export default MetricsRibbon
