import { motion } from "motion/react"

const PARTICLES = Array.from({ length: 14 })

const SendSuccess = ({ onDone }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[var(--color-storm)] to-[var(--color-indigo)] overflow-hidden"
        >
            <div className="pointer-events-none absolute inset-0">
                {PARTICLES.map((_, i) => {
                    const angle = (i / PARTICLES.length) * Math.PI * 2
                    const distance = 110 + Math.random() * 70
                    const dx = Math.cos(angle) * distance
                    const dy = Math.sin(angle) * distance
                    const colors = ["#7a57db", "#33c2cc", "#ea4884", "#d6995c", "#57db96"]
                    const color = colors[i % colors.length]
                    return (
                        <motion.span
                            key={i}
                            className="absolute left-1/2 top-1/2 size-1.5 rounded-full"
                            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            animate={{ x: dx, y: dy, opacity: [0, 1, 0], scale: [0.4, 1.2, 0.6] }}
                            transition={{ duration: 1.1, delay: 0.25 + (i % 5) * 0.03, ease: "easeOut" }}
                        />
                    )
                })}
            </div>

            <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
                className="relative grid place-items-center"
            >
                <motion.span
                    className="absolute inset-0 -m-3 rounded-full bg-[var(--color-mint)]/30 blur-xl"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0.7 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />
                <span className="relative grid size-20 place-items-center rounded-full bg-gradient-to-br from-[var(--color-mint)] to-[var(--color-aqua)] shadow-[0_10px_40px_-10px_rgba(87,219,150,0.5)]">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                            d="M5 12.5L10 17.5L19 7.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
                        />
                    </svg>
                </span>
            </motion.div>

            <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.45 }}
                className="mt-6 text-xl font-semibold text-white"
            >
                Message sent
            </motion.p>
            <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.45 }}
                className="mt-1 text-sm text-neutral-300"
            >
                I&rsquo;ll get back within 24 hours.
            </motion.p>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.3 }}
                onClick={onDone}
                className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-neutral-200 hover:border-white/35 hover:bg-white/5 transition"
            >
                Send another
            </motion.button>
        </motion.div>
    )
}

export default SendSuccess
