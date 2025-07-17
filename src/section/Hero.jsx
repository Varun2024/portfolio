/* eslint-disable no-unused-vars */
import { OrbitControls } from "@react-three/drei"
import AnimateModel from "../components/ModelWrapper"
import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"
import { Canvas, useFrame } from "@react-three/fiber"
import { useState } from "react"
import Astronaut from "../components/Astronaut"


const Hero = () => {
//     const [scale, setScale] = useState(0.01)
//     useFrame(() => {
//     setScale((prev) => {
//       if (prev < 1) return prev + 0.01 // or 0.005 for smoother
//       return 1 // max scale
//     })
//   })
    return (
        <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
            <HeroText />
            <ParallexBackground />
            <figure className="absolute inset-0 z-50 "
                style={{ width: "100vw", height: "100vh" }}>
                <Canvas camera={{ position: [0, 0, 0] }}>
                    <Astronaut scale={.04} position={[7.115, -3, -9.454]} />  
                    {/* <AnimateModel/> */}
                    {/* <OrbitControls/>     */}
                    {/* needed light to show model otherwise it would be just a black outline there */}
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 10]} intensity={2} />
                    {/* to make the canvas dragable */}
                    
                </Canvas>
            </figure>
        </section>
    )
}

export default Hero