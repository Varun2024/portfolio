/* eslint-disable no-unused-vars */
import { motion, AnimatePresence, easeInOut } from "motion/react"

const Alert = ({ type, text }) => {
    const alertVarients = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.8 }
    }
    return (
        <AnimatePresence>

            <motion.div
                className='fixed z-50 flex items-center justify-center bottom-5 right-5'
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={alertVarients}
                transition={{ duration: 0.3, ease: easeInOut }}
            >
                <div className={`p-2 ${type === "danger" ? "bg-[var(--color-coral)]/90" : "bg-[var(--color-midnight)] border border-[var(--color-aqua)]/40"} items-center text-white leading-none flex rounded-md p-5 font-mono text-sm`}
                >
                    <p className={`flex rounded-md ${type === "danger" ? "bg-white/20" : "bg-[var(--color-aqua)]/20 text-[var(--color-aqua)]"} px-2 py-1 text-xs font-semibold mr-3`}>
                        {type === "danger" ? "FAIL" : "OK"}
                    </p>
                    <p className='mr-2 text-left'>
                        {text}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Alert