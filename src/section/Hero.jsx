/* eslint-disable no-unused-vars */
import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"
import Loader from "../components/Loader"

const HeroCanvas = lazy(() => import("../components/HeroCanvas"))

const usePrefersReducedMotion = () => {
    const [prefers, setPrefers] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setPrefers(mq.matches)
        update()
        mq.addEventListener?.("change", update)
        return () => mq.removeEventListener?.("change", update)
    }, [])
    return prefers
}

const useLowPowerMode = () => {
    const [low, setLow] = useState(false)
    useEffect(() => {
        if (typeof navigator === "undefined") return
        const conn = navigator.connection
        const saveData = conn?.saveData === true
        const slowEffective = conn?.effectiveType && /2g|slow-2g/.test(conn.effectiveType)
        const lowCores = (navigator.hardwareConcurrency ?? 8) <= 2
        setLow(Boolean(saveData || slowEffective || lowCores))
    }, [])
    return low
}

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const reducedMotion = usePrefersReducedMotion()
    const lowPower = useLowPowerMode()
    const figureRef = useRef(null)
    const [inView, setInView] = useState(false)
    const [shouldMount, setShouldMount] = useState(false)

    useEffect(() => {
        const node = figureRef.current
        if (!node || typeof IntersectionObserver === "undefined") {
            setInView(true)
            setShouldMount(true)
            return
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
                if (entry.isIntersecting) setShouldMount(true)
            },
            { rootMargin: "150px", threshold: 0.05 }
        )
        io.observe(node)
        return () => io.disconnect()
    }, [])

    const showCanvas = shouldMount && !reducedMotion && !isMobile && !lowPower

    return (
        <section
            id="home"
            className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space"
        >
            <HeroText />
            <ParallexBackground />
            <figure
                ref={figureRef}
                className="absolute inset-0 pointer-events-none"
                style={{ width: "100vw", height: "100vh", zIndex: 2 }}
            >
                {showCanvas && (
                    <Suspense fallback={null}>
                        <HeroCanvas isMobile={isMobile} inView={inView} />
                    </Suspense>
                )}
            </figure>
        </section>
    )
}

export default Hero
