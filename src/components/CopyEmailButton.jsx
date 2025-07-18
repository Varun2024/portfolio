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
            className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-[#030412] w-[12rem] cursor-pointer overflow-hidden"
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
                        <img src="assets/copy-done.svg" className="w-5" alt="copy icon" />
                        Email copied!
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
                        <img src="assets/copy.svg" className="w-5" />
                        Copy Email Address
                    </motion.p>)}
            </AnimatePresence>
        </motion.button>
    )
}

export default CopyEmailButton