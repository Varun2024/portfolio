import { useState } from "react"
import {
    // eslint-disable-next-line no-unused-vars
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "motion/react"
import { buildDefaultAvatar } from "../lib/avatar"

const spring = { stiffness: 100, damping: 5 }

export const AnimatedTooltip = ({ items }) => {
    const [hovered, setHovered] = useState(null)
    const x = useMotionValue(0)
    const rotate = useSpring(useTransform(x, [-100, 100], [-30, 30]), spring)
    const translateX = useSpring(useTransform(x, [-100, 100], [-30, 30]), spring)

    return (
        <div className="flex items-center">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="group relative -mr-3"
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <AnimatePresence mode="popLayout">
                        {hovered === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 12, scale: 0.6 }}
                                animate={{
                                    opacity: 1, y: 0, scale: 1,
                                    transition: { type: "spring", stiffness: 260, damping: 10 },
                                }}
                                exit={{ opacity: 0, y: 12, scale: 0.6 }}
                                style={{ translateX, rotate, whiteSpace: "nowrap" }}
                                className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center rounded-sm border border-white/15 bg-[var(--color-midnight)] px-3 py-1.5"
                            >
                                <div className="text-[13px] font-medium text-white">{item.name}</div>
                                <div className="text-[11px] text-white/85">{item.role}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <img
                        src={buildDefaultAvatar(item.name)}
                        alt={item.name}
                        onMouseMove={(e) => {
                            const half = e.currentTarget.offsetWidth / 2
                            x.set(e.nativeEvent.offsetX - half)
                        }}
                        className="relative size-10 sm:size-12 rounded-full border-2 border-[var(--color-midnight)] object-cover ring-1 ring-white/10 bg-[var(--color-storm)] transition duration-200 group-hover:z-30 group-hover:scale-105"
                    />
                </div>
            ))}
        </div>
    )
}

export default AnimatedTooltip
