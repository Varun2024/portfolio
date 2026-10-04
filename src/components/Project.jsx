import { useState } from 'react'
import ProjectDetails from './ProjectDetails'

const Project = ({ title, description, subDescription, href, sourceHref, image, tags, role }) => {
    const [isHidden, setIsHidden] = useState(false)
    const stop = (e) => e.stopPropagation()

    return (
        <>
            <div className='group relative py-6 sm:py-7 transition-colors duration-200 hover:bg-white/[0.02] -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-lg'>
                {href && (
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open ${title} (live)`}
                        className="absolute inset-0 z-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
                    />
                )}
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pointer-events-none">
                    {image && (
                        <img
                            src={image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="h-32 w-full sm:h-16 sm:w-24 rounded-md border border-white/10 object-cover shrink-0"
                        />
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-lg sm:text-xl font-medium leading-snug text-white inline-flex items-center gap-1.5">
                                {title}
                                {href && (
                                    <svg
                                        width="12" height="12" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2"
                                        className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                                        aria-hidden="true"
                                    >
                                        <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </h3>
                            {role && (
                                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-neutral-300">
                                    {role}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5 text-[13px] text-white/55">
                            {tags.map((tag, i) => (
                                <span key={tag.id} className="inline-flex items-center">
                                    {i > 0 && <span className="mr-2 opacity-40">·</span>}
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-end sm:self-center pointer-events-auto">
                        {sourceHref && (
                            <a
                                href={sourceHref}
                                target="_blank"
                                rel="noreferrer noopener"
                                onClick={stop}
                                className="text-[12px] text-neutral-400 hover:text-white transition-colors"
                            >
                                Source
                            </a>
                        )}
                        <button
                            type="button"
                            onClick={(e) => { stop(e); setIsHidden(true) }}
                            className='text-[12px] text-neutral-400 hover:text-white transition-colors'
                        >
                            Details
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-px w-full bg-white/[0.06]' />
            {isHidden &&
                <ProjectDetails
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
