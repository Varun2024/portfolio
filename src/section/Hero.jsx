/* eslint-disable no-unused-vars */
import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"
import HeroVisual from "../components/HeroVisual"

const Hero = () => {
    return (
        <section
            id="home"
            className="relative flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space"
        >
            <HeroText />
            <ParallexBackground />
            <HeroVisual />
        </section>
    )
}

export default Hero
