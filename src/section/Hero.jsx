import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"

const Hero = () => {
    return (
        <section
            id="home"
            className="relative mx-[calc(50%-50vw)] w-screen min-h-screen overflow-hidden flex items-center"
        >
            <ParallexBackground />

            {/* One cinematic aqua scanner pass across the scene on load. */}
            <span
                aria-hidden="true"
                className="hero-scan pointer-events-none absolute inset-x-0 z-[2] h-px bg-[var(--color-aqua)]"
                style={{ boxShadow: "0 0 18px rgba(94,234,212,0.5)" }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto c-space">
                <HeroText />
            </div>
        </section>
    )
}

export default Hero
