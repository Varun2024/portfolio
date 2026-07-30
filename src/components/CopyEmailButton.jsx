/* eslint-disable no-unused-vars */
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
const CopyEmailButton = () => {
    const [copied, setCopied] = useState(false)
    const email = "varunshukla747@gmail.com"

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000);
    }
    return (
        <motion.button
            onClick={copyToClipboard}
            whileHover={{ y: -5 }}
            whileTap={{scale: 1.05}}
            className="relative px-4 py-3 font-mono text-sm text-center rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 text-[var(--color-aqua)] w-[14rem] cursor-pointer overflow-hidden hover:border-[var(--color-aqua)]/70 hover:bg-[var(--color-aqua)]/20 transition"
        >
            {/* since usestate cant be tracked normal animation we will use this which tracks the state through a key */}
            <AnimatePresence mode="wait">
                {/* wait mode waits for the element to exit and thats what we exactly need */}
                {copied ? (
                    <motion.p
                        className="flex items-center justify-center gap-2"
                        key="copied"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    >
                        <img src="assets/copy-done.svg" className="w-4" alt="copy icon" />
                        [ locked ]
                    </motion.p>
                ) : (
                    <motion.p
                        className="flex items-center justify-center gap-2"
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <img src="assets/copy.svg" className="w-4" />
                        [ copy frequency ]
                    </motion.p>)}
            </AnimatePresence>
        </motion.button>
    )
}

export default CopyEmailButton