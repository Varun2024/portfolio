
import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'

const Project = ({ title, description, subDescription, href, image, tags, setPr }) => {
    const [isHidden, setIsHidden] = useState(false)
    return (
        <>
            <div className='flex flex-col sm:flex-row flex-wrap items-start justify-between py-8 sm:py-10 space-y-6 sm:space-y-0 gap-4'
            onMouseEnter={()=>setPr(image)}
            onMouseLeave={()=>setPr(null)}>
                <div className="">
                    <p className="text-xl sm:text-2xl leading-snug">{title}</p>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-sm sm:text-base text-[var(--color-sand)] ">
                        {tags.map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                </div> 
                <button onClick={() => setIsHidden(true)} className='flex items-center gap-1.5 cursor-pointer hover-animation text-sm sm:text-base'>
                    Read More
                    <img src="assets/arrow-right.svg" className='size-4 sm:size-5' />
                </button>
            </div>
            <div className='bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full' />
            {isHidden &&
                < ProjectDetails
                    title={title}
                    description={description}
                    subDescription={subDescription}
                    image={image}
                    tags={tags}
                    href={href}
                    closeModal={() => setIsHidden(false)}
                />
            }
        </>
    )
}

export default Project