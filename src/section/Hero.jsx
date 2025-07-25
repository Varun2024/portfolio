/* eslint-disable no-unused-vars */
import { Float, OrbitControls } from "@react-three/drei"

import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useState } from "react"
import Astronaut from "../components/Astronaut"
import { useMediaQuery } from "react-responsive"
import Loader from "../components/Loader"


const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return (
        <section id="home" className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
            <HeroText />
            <ParallexBackground />
            <figure className="absolute inset-0 z-10 "
                style={{ width: "100vw", height: "100vh" }}>
                <Canvas >
                    <Suspense fallback={<Loader />}>
                    <Astronaut isMobile={isMobile} scale={isMobile && .03} position={isMobile && [.115, -5, -9.454]} />
                    {/* needed light to show model otherwise it would be just a black outline there */}
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 10]} intensity={2} />
                    {/* <OrbitControls /> */}
                    {/* to make the canvas dragable */}
                    </Suspense>
                </Canvas>
            </figure>
        </section>
    )
}

export default Hero