/* eslint-disable no-unused-vars */
import { motion } from "motion/react"


const ProjectDetails = ({title , description ,subDescription ,image , tags , href , closeModal}) => {
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-2 sm:p-4">
        <motion.div 
        className="relative sm:max-w-2xl max-w-[98%] max-h-[92vh] overflow-y-auto border shadow-sm rounded-2xl bg-gradient-to-l from-[var(--color-midnight) ] to-[var(--color-navy)]"
        initial={{opacity:0 ,scale:.5}}
        animate={{opacity:1 ,scale:1}}
        >
            <button onClick={closeModal} className="absolute p-2 rounded-sm top-3 right-3 sm:top-5 sm:right-5 bg-[var(--color-midnight)]">
                <img src="/assets/close.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <figure className="w-full overflow-hidden rounded-t-2xl border-b border-white/10 bg-black/20">
                <img
                    src={image}
                    alt={title}
                    className="h-52 w-full object-cover object-top sm:h-64 md:h-72"
                />
            </figure>
            <div className="p-4 sm:p-5">
                <h5 className="mb-2 text-xl sm:text-2xl font-bold text-white ">{title}</h5>
                <p className="mb-3 text-sm sm:text-base font-normal text-neutral-400">{description}</p>
                {subDescription.map((subDesc,index)=>(
                    <p key={index} className="mb-3 text-sm sm:text-base font-normal text-neutral-400">{subDesc}</p>

                ))}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <img key={tag.id} src={tag.path} alt={tag.name} className=" rounded-lg size-8 sm:size-10 hover-animation"/>
                        ))}
                    </div>
                    <a href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm sm:text-base font-medium hover-animation cursor-pointer"> 
                    View Project <img src="assets/arrow-up.svg" className="size-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ProjectDetails