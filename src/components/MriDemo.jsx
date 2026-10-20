import { useRef, useState } from "react"

// Honest technique demo for the ML internship: a real Canny edge map (precomputed
// with OpenCV) over a public-domain-licensed brain MRI. Not presented as Varun's
// own scan or model output — it demonstrates the boundary-extraction step.
const MriDemo = () => {
    const [pos, setPos] = useState(55)
    const ref = useRef(null)
    const dragging = useRef(false)

    const setFromClientX = (clientX) => {
        const el = ref.current
        if (!el || !Number.isFinite(clientX)) return
        const r = el.getBoundingClientRect()
        if (!r.width) return
        const p = ((clientX - r.left) / r.width) * 100
        setPos(Math.max(0, Math.min(100, p)))
    }
    const onPointerDown = (e) => {
        dragging.current = true
        try {
            e.currentTarget.setPointerCapture?.(e.pointerId)
        } catch {
            /* synthetic or already-released pointer: capture is best-effort */
        }
        setFromClientX(e.clientX)
    }
    const onPointerMove = (e) => {
        if (dragging.current) setFromClientX(e.clientX)
    }
    const stopDrag = () => {
        dragging.current = false
    }
    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault()
            setPos((p) => Math.max(0, p - 4))
        } else if (e.key === "ArrowRight") {
            e.preventDefault()
            setPos((p) => Math.min(100, p + 4))
        }
    }

    return (
        <figure className="mt-6 max-w-sm">
            <div
                ref={ref}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={stopDrag}
                onPointerLeave={stopDrag}
                className="relative aspect-square w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-sm border border-white/10 bg-[#06070d]"
            >
                <img
                    src="/assets/mri-raw.png"
                    alt="Axial T1 brain MRI"
                    width="600"
                    height="600"
                    loading="lazy"
                    draggable="false"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                >
                    <img
                        src="/assets/mri-edges.png"
                        alt="Canny edge detection of the same MRI"
                        width="600"
                        height="600"
                        loading="lazy"
                        draggable="false"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                <span className="pointer-events-none absolute left-2 top-2 rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] text-[var(--color-aqua)]">
                    Canny edges
                </span>
                <span className="pointer-events-none absolute right-2 top-2 rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] text-white/80">
                    MRI
                </span>

                <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
                    <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-[var(--color-aqua)]/80" />
                    <button
                        type="button"
                        role="slider"
                        aria-label="Reveal Canny edge detection over the MRI"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(pos)}
                        onKeyDown={onKeyDown}
                        className="pointer-events-auto absolute top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-[var(--color-aqua)]/70 bg-[#06070d]"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-aqua)" strokeWidth="2" aria-hidden="true">
                            <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <figcaption className="mt-2 text-[11px] leading-snug text-white/60">
                Real Canny edge detection (technique demo). Drag to compare. MRI:{" "}
                <a
                    href="https://commons.wikimedia.org/wiki/File:MRI_Brain_T1_Axial_(4).jpg"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-white/25 underline-offset-2 hover:decoration-white/60"
                >
                    511KeV, CC BY-SA 4.0
                </a>
                .
            </figcaption>
        </figure>
    )
}

export default MriDemo
