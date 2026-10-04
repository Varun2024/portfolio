/* eslint-disable no-unused-vars */
import HeroText from "../components/HeroText"
import ParallexBackground from "../components/ParallexBackground"
import HeroVisual from "../components/HeroVisual"

const Hero = () => {
    return (
        <section
            id="home"
            className="relative mx-[calc(50%-50vw)] w-screen min-h-screen overflow-hidden flex items-center"
        >
            <ParallexBackground />
            <div className="relative z-10 w-full max-w-7xl mx-auto c-space grid grid-cols-1 md:grid-cols-[1fr_24rem] lg:grid-cols-[1fr_26rem] gap-10 lg:gap-16 items-center pt-28 md:pt-0">
                <HeroText />
                <HeroVisual />
            </div>
        </section>
    )
}

export default Hero
