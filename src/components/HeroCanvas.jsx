import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"

import Astronaut from "./Astronaut"
import Loader from "./Loader"

// Slow orbiting point-light that sweeps across the mascot's surface.
// White so the visor (baked black) stays black — aqua would leak reflections
// onto every "black" surface and defeat the point.
const SweepLight = () => {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.elapsedTime * 0.35
        ref.current.position.x = Math.sin(t) * 6
        ref.current.position.z = Math.cos(t) * 6 + 2
        ref.current.position.y = 3 + Math.sin(t * 0.7) * 1.5
    })
    return <pointLight ref={ref} intensity={2.4} color="#ffffff" distance={18} decay={1.4} />
}

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
                {/* HDR envmap does the heavy lifting for reflections + gradient shading.
                    "night" ships with drei — no external asset needed. */}
                <Environment preset="night" background={false} />
                <ambientLight intensity={0.25} />
                {/* Neutral rim so the visor stays black. The mascot's own baked
                    aqua carries the scanner-cyan identity. */}
                <directionalLight position={[6, 5, -3]} intensity={1.6} color="#ffffff" />
                <directionalLight position={[-5, 4, 6]} intensity={1.1} color="#ffffff" />
                {/* Warm sand fill from below-right for grounding */}
                <pointLight position={[3, -2, 2]} intensity={0.5} color="#f59e0b" />
                {/* Orbiting white sweep — animated highlight */}
                <SweepLight />
            </Suspense>
        </Canvas>
    )
}

export default HeroCanvas
