
import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'

const Project = ({ title, description, subDescription, href, sourceHref, image, tags, role, setPr }) => {
    const [isHidden, setIsHidden] = useState(false)
    return (
        <>
            <div
                className='group flex flex-col sm:flex-row flex-wrap items-start justify-between py-8 sm:py-10 space-y-4 sm:space-y-0 gap-4 transition-colors duration-300 hover:bg-white/[0.015] -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-lg'
                onMouseEnter={() => setPr(image)}
                onMouseLeave={() => setPr(null)}
            >
                <div className="flex flex-col gap-3 sm:contents">
                    {image && (
                        <img
                            src={image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="sm:hidden h-32 w-full rounded-md border border-white/10 object-cover"
                        />
                    )}
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xl sm:text-2xl leading-snug transition-transform duration-300 group-hover:translate-x-1">
                            {title}
                        </p>
                        {role && (
                            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-300">
                                {role}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-sm sm:text-base text-[var(--color-sand)]">
                        {tags.map((tag, i) => (
                            <span key={tag.id} className="inline-flex items-center">
                                {i > 0 && <span className="mr-2 opacity-40">·</span>}
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                    {sourceHref && (
                        <a
                            href={sourceHref}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={(e) => e.stopPropagation()}
                            data-cursor-tag="Source"
                            className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400 hover:text-[var(--color-aqua)] transition-colors"
                        >
                            [ src ]
                        </a>
                    )}
                    <button
                        onClick={() => setIsHidden(true)}
                        data-cursor-tag="Scan"
                        className='flex items-center gap-1.5 cursor-pointer hover-animation text-sm sm:text-base transition-transform duration-300 group-hover:-translate-x-1'
                    >
                        Scan craft
                        <img src="assets/arrow-right.svg" alt="" aria-hidden="true" className='size-4 sm:size-5 transition-transform duration-300 group-hover:translate-x-1' />
                    </button>
                </div>
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
                    sourceHref={sourceHref}
                    closeModal={() => setIsHidden(false)}
                />
            }
        </>
    )
}

export default Project