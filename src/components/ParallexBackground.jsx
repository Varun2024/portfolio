/* eslint-disable no-unused-vars */

import {motion, useScroll, useSpring, useTransform } from "motion/react"


const ParallexBackground = () => {
    const { scrollYProgress } = useScroll()
    const x = useSpring(scrollYProgress,{damping:50})
    // usetranform can transform on set of value into other of a property;mostly used for x nd y values
    const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"])
    const planetY = useTransform(x, [0, 0.5], ["0%", "-20%"])
    const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"])
    const mountainY = useTransform(x, [0, 0.5], ["0%", "0%"])

    return (
        <section className='absolute inset-0 bg-black/40'>
            <div className="relative h-screen overflow-y-hidden">
                <motion.div className="absolute inset-0 w-full h-screen -z-40"
                    style={{
                        backgroundImage: "url(/assets/mountain-3.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover", 
                        y:mountain3Y,
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-30"
                    style={{
                        backgroundImage: "url(/assets/planets.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        x:planetY,
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-20"
                    style={{
                        backgroundImage: "url(/assets/mountain-2.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y:mountain2Y
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-10"
                    style={{
                        backgroundImage: "url(/assets/mountain-1.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y:mountainY
                    }} />
            </div>
        </section>
    )
}

export default ParallexBackground