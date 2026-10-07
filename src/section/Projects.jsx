import { useState } from "react"
import Project from "../components/Project"
import ProjectDetails from "../components/ProjectDetails"
import { myProjects } from "../constants"
import SectionHeading from "../components/SectionHeading"

const Projects = () => {
  const featured = myProjects.find(p => p.id === 11)
  const rest = myProjects.filter(p => p.id !== 11)
  return (
    <section id="work" className="relative c-space section-spacing px-1 sm:px-0">
      <SectionHeading right={`${myProjects.length} shipped`}>Projects</SectionHeading>
      {featured && <FeaturedRow project={featured} />}
      <div className="h-px w-full bg-white/[0.06]" />
      {rest.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </section>
  )
}

const FeaturedRow = ({ project }) => {
  const [open, setOpen] = useState(false)
  const stop = (e) => e.stopPropagation()
  return (
    <>
      <div className='group relative py-8 sm:py-10 transition-colors duration-200 hover:bg-white/[0.02] -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-lg before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-[2px] before:bg-white before:transition-all before:duration-300 hover:before:h-16'>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Open ${project.title} (live)`}
          className="absolute inset-0 z-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5 sm:gap-7 pointer-events-none">
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-32 w-full sm:h-28 sm:w-40 rounded-md border border-white/10 object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-xl sm:text-2xl font-medium leading-snug text-white inline-flex items-center gap-1.5">
                {project.title}
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </h3>
              <span className="inline-flex items-center rounded-sm border border-white/20 bg-white/5 px-2 py-0.5 text-[11px] text-white/85">
                Live · 2k weekly users
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-white/85 line-clamp-3 sm:line-clamp-none">
              2,000 hunters a week use this to find bug bounty programs. A nightly Vercel cron pulls{" "}
              <code className="font-mono text-[13px] text-white/85">arkadiyt/bounty-targets-data</code>, normalizes 1,160+ programs from HackerOne, Bugcrowd, Intigriti, YesWeHack and Federacy into one Neon Postgres table, and the UI is keyboard-first because hunters live in Vim.
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3 text-[13px] text-white/85">
              {project.tags.map((tag, i) => (
                <span key={tag.id} className="inline-flex items-center">
                  {i > 0 && <span className="mr-2 opacity-40">·</span>}
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 self-end sm:self-start sm:mt-1 pointer-events-auto" onClick={stop}>
            {project.sourceHref && (
              <a
                href={project.sourceHref}
                target="_blank"
                rel="noreferrer noopener"
                onClick={stop}
                className="text-[12px] text-neutral-200 hover:text-white transition-colors"
              >
                Source
              </a>
            )}
            <button
              type="button"
              onClick={(e) => { stop(e); setOpen(true) }}
              className='text-[12px] text-neutral-200 hover:text-white transition-colors'
            >
              Details
            </button>
          </div>
        </div>
      </div>
      {open && (
        <ProjectDetails
          title={project.title}
          description={project.description}
          subDescription={project.subDescription}
          image={project.image}
          tags={project.tags}
          href={project.href}
          sourceHref={project.sourceHref}
          closeModal={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default Projects
