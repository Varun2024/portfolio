/* eslint-disable no-unused-vars */
import React from 'react'

const Project = ({title, description,suDescription,href,image, tags}) => {
    return (
        <>
        <div className=' flex-wrap items-start justify-between py-10 space-y-14 sm:flex sm:space-y-0'>
            <div className="">
                <p className="text-2xl">{title}</p>
                <div className="flex gap-5 mt-2 text-[var(--color-sand)] ">
                    {tags.map((tag)=>(
                        <span key={tag.id}>{tag.name}</span>
                    ))}
                </div>
            </div>
            <button className='flex items-center gap-1 cursor-pointer hover-animation'>
                Read More
                <img src="assets/arrow-right.svg" />
            </button>
        </div>
        <div className='bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full'/>
        </>
    )
}

export default Project