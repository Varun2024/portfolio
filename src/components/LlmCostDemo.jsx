import { useState } from "react"

// Explorable for the current role's "LLM calls earn their cost against a cheap
// fallback, or they get ripped out" line. Teaches the routing decision with a
// slider. Rates and volume are ILLUSTRATIVE and labelled as such — this is a
// mental model, not a claim about Flux Fortify's actual spend.
const CALLS = 100_000 // per month
const LLM_RATE = 0.01 // $ per frontier LLM call
const FB_RATE = 0.0001 // $ per cheap fallback call

const money = (n) => `$${Math.round(n).toLocaleString()}`

const Bar = ({ label, amount, ratio, tone }) => (
    <div>
        <div className="flex items-baseline justify-between text-[12px]">
            <span className="text-white/70">{label}</span>
            <span className="tabular-nums text-white">{money(amount)}</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
                className="h-full rounded-full"
                style={{
                    transform: `scaleX(${ratio})`,
                    transformOrigin: "left",
                    background: tone,
                    transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
                }}
            />
        </div>
    </div>
)

const LlmCostDemo = () => {
    const [share, setShare] = useState(60) // % of requests the cheap fallback can answer

    const allLlm = CALLS * LLM_RATE
    const hybrid = CALLS * ((share / 100) * FB_RATE + (1 - share / 100) * LLM_RATE)
    const saved = allLlm - hybrid
    const pct = Math.round((saved / allLlm) * 100)
    const verdict =
        share >= 66
            ? "The LLM only runs where the cheap path can't."
            : share >= 33
              ? "Half the traffic never needs a model."
              : "Mostly LLM — every call had better earn it."

    return (
        <figure className="mt-6 max-w-md">
            <div className="rounded-sm border border-white/10 bg-[#06070d] p-4">
                <div className="flex items-baseline justify-between">
                    <span className="text-[13px] font-medium text-white">Does the call earn its cost?</span>
                    <span className="text-[11px] text-white/50">100k calls / mo</span>
                </div>

                <label htmlFor="fb-share" className="mt-4 block text-[12px] text-white/70">
                    Cheap fallback handles{" "}
                    <span className="tabular-nums text-[var(--color-aqua)]">{share}%</span> of requests
                </label>
                <input
                    id="fb-share"
                    type="range"
                    min={0}
                    max={100}
                    value={share}
                    onChange={(e) => setShare(Number(e.target.value))}
                    className="mt-2 w-full cursor-ew-resize accent-[var(--color-aqua)]"
                    aria-label="Share of requests the cheap fallback handles"
                />

                <div className="mt-4 space-y-3">
                    <Bar label="All LLM" amount={allLlm} ratio={1} tone="var(--color-sand)" />
                    <Bar label="With fallback" amount={hybrid} ratio={hybrid / allLlm} tone="var(--color-aqua)" />
                </div>

                <p className="mt-4 text-[13px] leading-snug text-white">
                    Saves <span className="tabular-nums font-medium text-[var(--color-aqua)]">{money(saved)}</span> a month
                    <span className="text-white/60"> ({pct}%)</span>. {verdict}
                </p>
            </div>
            <figcaption className="mt-2 text-[11px] leading-snug text-white/60">
                Illustrative rates ($0.01 per LLM call, $0.0001 per fallback), not Flux Fortify's bill. The point: a call
                has to beat the cheap path or it gets ripped out.
            </figcaption>
        </figure>
    )
}

export default LlmCostDemo
