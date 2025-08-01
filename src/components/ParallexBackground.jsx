/* eslint-disable no-unused-vars */

import { animate } from "motion"
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react"
import { useEffect } from "react"


const ParallexBackground = () => {
    const { scrollYProgress } = useScroll()
    const x = useSpring(scrollYProgress, { damping: 50 })
    // usetranform can transform on set of value into other of a property;mostly used for x nd y values
    const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"])
    const planetY = useTransform(x, [0, 0.5], ["0%", "-20%"])
    const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"])
    const mountainY = useTransform(x, [0, 0.5], ["0%", "0%"])

    // for the changing background color
    const COLORS_TOP = ["#13FFAA80", "#1E67C680", "#CE84CF80", "#DD335C80"];
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(300% 130% at 0% 100%, #020617 50%, ${color})`;

    return (
        <motion.section className='absolute inset-0 '
            style={{ backgroundImage ,zIndex:"1"}} 
        >
            <div className="relative h-screen overflow-y-hidden bg-black/30">
                <motion.div className="absolute inset-0 w-full h-screen -z-40"
                    style={{
                        backgroundImage: "url(/assets/mountain-3.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain3Y,
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-30"
                    style={{
                        backgroundImage: "url(/assets/planets.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        x: planetY,
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-20"
                    style={{
                        backgroundImage: "url(/assets/mountain-2.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain2Y
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-10"
                    style={{
                        backgroundImage: "url(/assets/mountain-1.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountainY
                    }} />
            </div>
        </motion.section>
    )
}

export default ParallexBackground