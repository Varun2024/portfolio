/* eslint-disable no-unused-vars */
import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"
import HeroVisual from "../components/HeroVisual"

const Hero = () => {
    return (
        <section
            id="home"
            className="relative mx-[calc(50%-50vw)] w-screen flex items-start justify-center md:justify-start min-h-screen overflow-hidden"
        >
            <ParallexBackground />
            <div className="relative w-full max-w-7xl mx-auto c-space">
                <HeroText />
                <HeroVisual />
            </div>
        </section>
    )
}

export default Hero
