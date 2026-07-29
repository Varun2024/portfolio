/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

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
    const [hovering, setHovering] = useState(false)
    const [pressed, setPressed] = useState(false)
    const [visible, setVisible] = useState(false)
    const [tag, setTag] = useState("")

    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 })
    const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 })

    useEffect(() => {
        if (!enabled) return
        document.body.classList.add("cursor-none")
        return () => document.body.classList.remove("cursor-none")
    }, [enabled])

    useEffect(() => {
        if (!enabled) return

        const onMove = (e) => {
            x.set(e.clientX)
            y.set(e.clientY)
            if (!visible) setVisible(true)
        }
        const onDown = () => setPressed(true)
        const onUp = () => setPressed(false)
        const onLeave = () => setVisible(false)
        const onEnter = () => setVisible(true)

        const onOver = (e) => {
            const el = e.target?.closest?.(INTERACTIVE_SELECTOR)
            if (el) {
                setHovering(true)
                setTag(el.getAttribute("data-cursor-tag") || "")
            } else {
                setHovering(false)
                setTag("")
            }
        }

        window.addEventListener("mousemove", onMove, { passive: true })
        window.addEventListener("mousedown", onDown)
        window.addEventListener("mouseup", onUp)
        window.addEventListener("mouseover", onOver)
        document.addEventListener("mouseleave", onLeave)
        document.addEventListener("mouseenter", onEnter)

        return () => {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mousedown", onDown)
            window.removeEventListener("mouseup", onUp)
            window.removeEventListener("mouseover", onOver)
            document.removeEventListener("mouseleave", onLeave)
            document.removeEventListener("mouseenter", onEnter)
        }
    }, [enabled, visible, x, y])

    if (!enabled) return null

    const ringScale = pressed ? 0.75 : hovering ? 1.9 : 1
    const dotScale = pressed ? 1.4 : hovering ? 0.4 : 1

    return (
        <>
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
                style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
            >
                <motion.div
                    animate={{ scale: ringScale }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="-translate-x-1/2 -translate-y-1/2 size-9 rounded-full border border-white/70"
                />
            </motion.div>

            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999]"
                style={{ x, y, opacity: visible ? 1 : 0 }}
            >
                <motion.div
                    animate={{ scale: dotScale }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="-translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[var(--color-aqua)] shadow-[0_0_12px_rgba(51,194,204,0.9)]"
                />
            </motion.div>

            {tag && (
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pointer-events-none fixed left-0 top-0 z-[9999] font-mono text-[10px] uppercase tracking-[0.22em] text-white/90"
                    style={{ x: ringX, y: ringY }}
                >
                    <span className="ml-6 -mt-0.5 inline-block rounded-full border border-white/20 bg-black/60 px-2 py-0.5 backdrop-blur">
                        {tag}
                    </span>
                </motion.div>
            )}
        </>
    )
}

export default Cursor
