/* eslint-disable no-unused-vars */
import { useState } from "react"
import Project from "../components/Project"
import { myProjects } from "../constants"
import SectionHeading from "../components/SectionHeading"
import Radar from "../components/Radar"
import { motion, useMotionValue, useSpring } from "motion/react"

const Projects = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 10, stiffness: 50 })
  const springY = useSpring(y, { damping: 10, stiffness: 50 })
  const handleMouse = (e) => {
    x.set(e.clientX + 20)
    y.set(e.clientY + 20)
  }
  const [pr, setPr] = useState(null)
  return (
    <section id="work" onMouseMove={handleMouse} className="realtive c-space section-spacing px-1 sm:px-0">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading>The Fleet</SectionHeading>
        <div className="mt-1 shrink-0 flex items-center gap-2">
          <span className="hidden sm:block font-mono text-[10px] text-white/40">scanning · {myProjects.length} craft</span>
          <Radar blipCount={myProjects.length} className="size-16 sm:size-20" />
        </div>
      </div>
      {/* for the line */}
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-8 sm:mt-12 h-[1px] w-full " />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPr={setPr} />
      ))}
      {/*hover preview */}
      <div className="hidden lg:flex">
        {pr &&
        <motion.img className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={pr}
          style={{ x: springX, y: springY }}
        />}
      </div>
    </section>
  )
}

export default Projects