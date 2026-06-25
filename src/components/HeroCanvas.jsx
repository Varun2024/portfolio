import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

import Astronaut from "./Astronaut"
import Loader from "./Loader"

const HeroCanvas = ({ isMobile, inView }) => {
    return (
        <Canvas
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            frameloop={inView ? "always" : "never"}
            gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 5] }}
        >
            <Suspense fallback={<Loader />}>
                <Astronaut
                    isMobile={isMobile}
                    scale={isMobile && 0.03}
                    position={isMobile && [0.115, -5, -9.454]}
                />
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} intensity={2} />
            </Suspense>
        </Canvas>
    )
}

export default HeroCanvas
