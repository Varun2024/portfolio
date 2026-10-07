/* eslint-disable react-hooks/exhaustive-deps */
import { motion, useScroll, useSpring, useTransform } from "motion/react"

const ParallexBackground = () => {
    const { scrollYProgress } = useScroll()
    const x = useSpring(scrollYProgress, { damping: 50 })
    const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"])
    const planetY = useTransform(x, [0, 0.5], ["0%", "-20%"])
    const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"])
    const mountainY = useTransform(x, [0, 0.5], ["0%", "0%"])

    return (
        <section className="absolute inset-0" style={{ background: "#020617", zIndex: 1 }}>
            <div className="relative h-screen overflow-y-hidden bg-black/55">
                <motion.div className="absolute inset-0 w-full h-screen -z-40"
                    style={{
                        backgroundImage: "url(/assets/mountain-3.webp)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain3Y,
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-30"
                    style={{
                        backgroundImage: "url(/assets/planets.webp)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        x: planetY,
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-20"
                    style={{
                        backgroundImage: "url(/assets/mountain-2.webp)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain2Y
                    }} />
                <motion.div className="absolute inset-0 w-full h-screen -z-10"
                    style={{
                        backgroundImage: "url(/assets/mountain-1.webp)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountainY
                    }} />
                {/* Structural readability scrim — only gradient on the page */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.3) 60%, transparent)" }}
                />
            </div>
        </section>
    )
}

export default ParallexBackground
