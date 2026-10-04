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
        <SectionHeading>Projects</SectionHeading>
        <div className="mt-1 shrink-0 flex items-center gap-2">
          <span className="hidden sm:block text-xs uppercase tracking-[0.18em] text-white/50">{myProjects.length} shipped</span>
          <Radar blipCount={myProjects.length} className="size-16 sm:size-20" />
        </div>
      </div>
      {/* featured case study */}
      <BountyIndexCaseStudy />
      {/* for the line */}
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-8 sm:mt-12 h-[1px] w-full " />
      {myProjects.filter(p => p.id !== 11).map((project) => (
        <Project key={project.id} {...project} setPr={setPr} />
      ))}
      {/*hover preview */}
      <div className="hidden lg:flex">
        {pr &&
        <motion.img className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={pr}
          alt=""
          aria-hidden="true"
          style={{ x: springX, y: springY }}
        />}
      </div>
    </section>
  )
}

const BountyIndexCaseStudy = () => (
  <article className="mt-10 sm:mt-14 rounded-xl border border-[var(--color-aqua)]/25 bg-gradient-to-br from-[var(--color-midnight)] via-[var(--color-primary)]/60 to-[var(--color-midnight)] p-5 sm:p-8 shadow-[0_30px_80px_-40px_rgba(125,211,252,0.25)]">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-aqua)]">
        <span className="inline-block size-1.5 rounded-full bg-[var(--color-aqua)] shadow-[0_0_8px_var(--color-aqua)]" />
        featured case study
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://bountyindex.in"
          target="_blank"
          rel="noreferrer noopener"
          data-cursor-tag="Live"
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-aqua)]/60 bg-[var(--color-aqua)]/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-aqua)] hover:border-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/25 transition"
        >
          Live
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href="https://github.com/Varun2024/Bounty-index"
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400 hover:text-[var(--color-aqua)] transition"
        >
          [ src ]
        </a>
      </div>
    </div>

    <h3 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
      Bounty Index
      <span className="block mt-1 text-sm sm:text-base font-normal text-neutral-400">
        Every public bug bounty program across five platforms — one live table.
      </span>
    </h3>

    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {[
        { v: "2,000+", l: "weekly hunters" },
        { v: "1,160+", l: "programs indexed" },
        { v: "5", l: "platforms unified" },
        { v: "daily", l: "automated ingest" },
      ].map((s) => (
        <div key={s.l} className="rounded-md border border-white/10 bg-white/[0.02] p-3 sm:p-4">
          <div className="font-mono text-xl sm:text-2xl text-[var(--color-aqua)]">{s.v}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-neutral-500">{s.l}</div>
        </div>
      ))}
    </div>

    <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-aqua)]/80">01 · problem</div>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
          Bug bounty hunters bookmark 5+ platforms, each with its own UI and filters. Finding the highest-paying programs for a given asset type means stitching five dashboards together by hand.
        </p>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-aqua)]/80">02 · approach</div>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
          Authenticated Vercel cron pulls from <code className="font-mono text-[var(--color-aqua)]/90">arkadiyt/bounty-targets-data</code> daily, normalizes into Neon Postgres via Drizzle. Keyboard-first UI (<code className="font-mono text-[var(--color-aqua)]/90">/</code>, <code className="font-mono text-[var(--color-aqua)]/90">j</code>/<code className="font-mono text-[var(--color-aqua)]/90">k</code>, <code className="font-mono text-[var(--color-aqua)]/90">↵</code>) with URL-driven filters. Scope lookup resolves a domain to every program it appears in.
        </p>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-aqua)]/80">03 · outcome</div>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
          Live product with 2,000+ weekly hunters. Reached the top of the funnel for scope research — hunters now share the index link in their write-ups instead of listing five platform URLs.
        </p>
      </div>
    </div>

    <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-white/5 pt-4 font-mono text-[11px] text-neutral-500">
      <span>Next.js 16</span><span className="opacity-40">·</span>
      <span>TypeScript</span><span className="opacity-40">·</span>
      <span>Drizzle + Neon</span><span className="opacity-40">·</span>
      <span>Tailwind 4</span><span className="opacity-40">·</span>
      <span>Vercel Cron</span>
    </div>
  </article>
)

export default Projects