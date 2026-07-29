import { useEffect, useRef, useState } from "react"

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'

const useIsPointerDevice = () => {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const fine = window.matchMedia("(pointer: fine)")
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setOk(fine.matches && !reduced.matches)
        update()
        fine.addEventListener?.("change", update)
        reduced.addEventListener?.("change", update)
        return () => {
            fine.removeEventListener?.("change", update)
            reduced.removeEventListener?.("change", update)
        }
    }, [])
    return ok
}

const Cursor = () => {
    const enabled = useIsPointerDevice()
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const tagRef = useRef(null)
    const stateRef = useRef({
        tx: -100, ty: -100,        // target (mouse)
        rx: -100, ry: -100,        // ring (lagged)
        hovering: false,
        pressed: false,
        visible: false,
        tag: "",
    })

    useEffect(() => {
        if (!enabled) return
        document.body.classList.add("cursor-none")
        return () => document.body.classList.remove("cursor-none")
    }, [enabled])

    useEffect(() => {
        if (!enabled) return
        const s = stateRef.current
        let raf = 0

        const onMove = (e) => {
            s.tx = e.clientX
            s.ty = e.clientY
            if (!s.visible) {
                s.visible = true
                if (dotRef.current) dotRef.current.style.opacity = "1"
                if (ringRef.current) ringRef.current.style.opacity = "1"
            }
        }
        const onDown = () => { s.pressed = true }
        const onUp = () => { s.pressed = false }
        const onLeave = () => {
            s.visible = false
            if (dotRef.current) dotRef.current.style.opacity = "0"
            if (ringRef.current) ringRef.current.style.opacity = "0"
            if (tagRef.current) tagRef.current.style.opacity = "0"
        }
        const onOver = (e) => {
            const el = e.target?.closest?.(INTERACTIVE_SELECTOR)
            const nextHover = !!el
            const nextTag = el?.getAttribute("data-cursor-tag") || ""
            if (nextHover === s.hovering && nextTag === s.tag) return
            s.hovering = nextHover
            s.tag = nextTag
            if (tagRef.current) {
                tagRef.current.textContent = nextTag
                tagRef.current.style.opacity = nextTag ? "1" : "0"
            }
        }

        const tick = () => {
            // ease ring toward mouse
            s.rx += (s.tx - s.rx) * 0.22
            s.ry += (s.ty - s.ry) * 0.22

            const ringScale = s.pressed ? 0.75 : s.hovering ? 1.9 : 1
            const dotScale = s.pressed ? 1.4 : s.hovering ? 0.4 : 1

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${s.tx}px, ${s.ty}px, 0) translate(-50%, -50%) scale(${dotScale})`
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%) scale(${ringScale})`
            }
            if (tagRef.current && s.tag) {
                tagRef.current.style.transform = `translate3d(${s.rx + 22}px, ${s.ry - 2}px, 0)`
            }

            raf = requestAnimationFrame(tick)
        }

        window.addEventListener("mousemove", onMove, { passive: true })
        window.addEventListener("mousedown", onDown, { passive: true })
        window.addEventListener("mouseup", onUp, { passive: true })
        window.addEventListener("mouseover", onOver, { passive: true })
        document.documentElement.addEventListener("mouseleave", onLeave, { passive: true })
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mousedown", onDown)
            window.removeEventListener("mouseup", onUp)
            window.removeEventListener("mouseover", onOver)
            document.documentElement.removeEventListener("mouseleave", onLeave)
        }
    }, [enabled])

    if (!enabled) return null

    return (
        <>
            <div
                ref={ringRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999] size-9 rounded-full border border-white/40"
                style={{ opacity: 0, transition: "opacity 200ms, border-color 200ms", willChange: "transform" }}
            />
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 rounded-full bg-[var(--color-aqua)]"
                style={{
                    opacity: 0,
                    boxShadow: "0 0 10px rgba(51,194,204,0.7)",
                    transition: "opacity 200ms",
                    willChange: "transform",
                }}
            />
            <div
                ref={tagRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/15 bg-black/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/90 backdrop-blur"
                style={{ opacity: 0, transition: "opacity 150ms", willChange: "transform" }}
            />
        </>
    )
}

export default Cursor
