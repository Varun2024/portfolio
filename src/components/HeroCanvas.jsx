import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
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
                <Environment preset="night" background={false} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
            </Suspense>
        </Canvas>
    )
}

export default HeroCanvas
