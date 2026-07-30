// Small decorative scanning radar. Pure vibe, no state.
// Grid + rotating sweep + fixed blips positioned deterministically per index.

const RADIUS = 44

const blipPositions = (count) => {
    // deterministic pseudo-random polar coords per index, so re-renders keep positions stable
    const positions = []
    for (let i = 0; i < count; i++) {
        const seed = (i + 1) * 12.9898
        const angle = ((seed * 43758.5453) % 1) * Math.PI * 2
        const r = 12 + (((seed * 78.233) % 1) * (RADIUS - 20))
        positions.push({ x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r })
    }
    return positions
}

const Radar = ({ blipCount = 6, className = "" }) => {
    const blips = blipPositions(blipCount)
    return (
        <div className={`relative ${className}`} aria-hidden="true">
            <svg viewBox="0 0 100 100" className="size-full">
                <defs>
                    <linearGradient id="radar-sweep" x1="50%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="var(--color-aqua)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--color-aqua)" stopOpacity="0.55" />
                    </linearGradient>
                </defs>

                {/* rings */}
                <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--color-aqua)" strokeOpacity="0.2" strokeWidth="0.4" />
                <circle cx="50" cy="50" r={RADIUS * 0.66} fill="none" stroke="var(--color-aqua)" strokeOpacity="0.15" strokeWidth="0.4" />
                <circle cx="50" cy="50" r={RADIUS * 0.33} fill="none" stroke="var(--color-aqua)" strokeOpacity="0.12" strokeWidth="0.4" />
                {/* crosshair */}
                <line x1="6" y1="50" x2="94" y2="50" stroke="var(--color-aqua)" strokeOpacity="0.12" strokeWidth="0.3" />
                <line x1="50" y1="6" x2="50" y2="94" stroke="var(--color-aqua)" strokeOpacity="0.12" strokeWidth="0.3" />

                {/* sweep wedge */}
                <g className="radar-sweep-anim" style={{ transformOrigin: "50px 50px" }}>
                    <path
                        d={`M 50 50 L ${50 + RADIUS} 50 A ${RADIUS} ${RADIUS} 0 0 0 ${50 + RADIUS * Math.cos(-Math.PI / 4)} ${50 + RADIUS * Math.sin(-Math.PI / 4)} Z`}
                        fill="url(#radar-sweep)"
                    />
                </g>

                {/* blips */}
                {blips.map((b, i) => (
                    <circle
                        key={i}
                        cx={b.x}
                        cy={b.y}
                        r="1.1"
                        fill="var(--color-aqua)"
                        opacity="0.9"
                        className="radar-blip-anim"
                        style={{ animationDelay: `${(i * 350) % 3000}ms` }}
                    />
                ))}

                {/* center dot */}
                <circle cx="50" cy="50" r="1" fill="var(--color-aqua)" />
            </svg>
        </div>
    )
}

export default Radar
