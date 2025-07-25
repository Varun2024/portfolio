import { useRef } from 'react'
import Cards from '../components/Cards'
import { Globe } from '../components/Globe'
import CopyEmailButton from '../components/CopyEmailButton'
import { FrameWorks } from '../components/FrameWorks'
// twmerge is somthing new
const About = () => {
    const grid2Container = useRef()
    return (
        <section id="about" className='c-space section-spacing'>
            <h2 className="text-heading">About Me</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
                {/* grid 1 */}
                <div className="flex items-end grid-default-color grid-1">
                    <img
                        src="assets/coding-pov.png"
                        className='absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5rem]'
                    />
                    <div className="z-10">
                        <p className='headtext'>Hi, I'm Varun Shukla </p>
                        <p className='subtext'>Web developer skilled in React, Next.js, and machine learning—building fast, user-friendly web apps with smart, data-driven features that solve real business problems effectively.</p>
                    </div>
                    <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[#1f1e39]"></div>
                </div>
                {/* grid 2 */}
                <div className="grid-default-color grid-2">
                    <div ref={grid2Container} className="flex items-center justify-center w-full h-full">
                        <p className='flex items-end text-5xl text-gray-500'>
                            Crafted, not just coded
                            <Cards
                                style={{ rotate: "75deg", top: "30%", left: "20%" }}
                                text="GRASP"
                                containerRef={grid2Container} />
                            <Cards
                                style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                                text="Solid"
                                containerRef={grid2Container} />
                            <Cards
                                style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
                                text="Design Patterns"
                                containerRef={grid2Container} />
                            <Cards
                                style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                                text="Design Principles"
                                containerRef={grid2Container} />
                            <Cards
                                style={{ rotate: "20deg", top: "10%", left: "38%" }}
                                text="SRP"
                                containerRef={grid2Container} />
                            <Cards
                                style={{ rotate: "30deg", top: "70%", left: "70%" }}
                                image="assets/logos/vitejs.svg" />
                            <Cards
                                style={{ rotate: "30deg", top: "70%", left: "25%" }} image="assets/logos/git.svg"
                                containerRef={grid2Container} />
                            <Cards
                                style={{ rotate: "30deg", top: "5%", left: "10%" }} image="assets/logos/blazor-pink.png"
                                containerRef={grid2Container} />
                        </p>
                    </div>
                </div>
                {/* grid 3 */}
                <div className="grid-black-color grid-3">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Time zone</p>
                        <p className='subtext'>I'm based in India, and open to remote worldwide </p>
                    </div>
                    <figure className='absolute left-[30%] top-[10%]'>
                        <Globe />
                    </figure>
                </div>
                {/* grid 4 */}
                <div className="grid-special-color grid-4">
                    <div className="flex flex-col items-center justify-center gap-4 size-full">
                        <p className="text-center headtext">
                            Want to build together?
                        </p>
                        <CopyEmailButton />
                    </div>
                </div>
                {/* grid 5 */}
                <div className="grid-default-color grid-5">
                    <div className="z-10 w-[50%]">
                        <p className="headText">
                            Tech Stack
                        </p>
                        <p className="subtext">Blending code and intelligence—I craft seamless web experiences with React, elevate them with Next.js, and power them further using machine learning.</p>
                    </div>
                    <div className="absolute inset-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125 ">
                        <FrameWorks />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About