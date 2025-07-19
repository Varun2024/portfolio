import Project from "../components/Project"
import { myProjects } from "../constants"


const Projects = () => {
  return (
    <section className="realtive c-space section-spacing">
        <h2 className="text-heading">My Selected Projects</h2>
        {/* for the line */}
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full "/>
        {myProjects.map((project)=> (
            <Project key={project.id} {...project}/> 
            ))}
    </section>
  )
}

export default Projects