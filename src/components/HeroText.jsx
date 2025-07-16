/* eslint-disable no-unused-vars */
import { FlipWords } from "./FlipWords"
import { motion } from "motion/react"
const HeroText = () => {
    const variance = {
        hidden:{opacity: 0, x: -50},
        visible:{opacity: 1, x: 0}
    }
    return (
        <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
            {/* Desktop view */}
            <div className="flex-col hidden md:flex c-space"> 
                <motion.h1
                    className="text-4xl font-medium"
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    Hi I'm Varun
                </motion.h1>
                <div className="flex flex-col items-start">
                    <motion.p 
                    className="text-5xl font-medium text-neutral-300"
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    
                    transition={{ delay: 1.2 }}
                    >
                        A Developer <br />Dedicated to Crafting
                    </motion.p>
                    {/* <div className="">get flip word from aceternity</div> */}
                    <motion.div
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.5 }}>
                        <FlipWords words={["Secure", "Modern", "Scalable"]} className="font-black text-white text-8xl" />
                    </motion.div>
                    <motion.p 
                    className="text-4xl font-medium text-neutral-300"
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.8 }}
                    >
                        Web Solutions
                    </motion.p>
                </div>
            </div>
            {/* Mobile view */}
            <div className="flex flex-col space-y-6 md:hidden">
                <motion.p className="text-4xl font-medium "
                variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}>Hi,I'm Varun</motion.p>
                <div className="">
                    <motion.p className="text-5xl font-black text-neutral-300"
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.2 }}>Building</motion.p>
                    <motion.div
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.5 }}>
                        <FlipWords words={["Secure", "Modern", "Scalable"]} className="font-black text-white text-7xl" />
                    </motion.div>
                    <motion.p className="text-4xl font-black text-neutral-300"
                    variants={variance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.8 }}>Web application</motion.p>
                </div>
            </div>
        </div>
    )
}

export default HeroText