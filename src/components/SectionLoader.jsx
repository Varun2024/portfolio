const SectionLoader = ({ label = "Loading sections" }) => {
  return (
    <div className="c-space py-10 sm:py-14">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[var(--color-midnight)] to-[var(--color-primary)] p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <div className="relative h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-[var(--color-aqua)] animate-ping opacity-75" />
            <span className="absolute inset-0 rounded-full bg-[var(--color-aqua)]" />
          </div>
          <p className="text-sm sm:text-base text-neutral-300">{label}</p>
        </div>

        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--color-aqua)]/70" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-20 rounded-xl bg-white/5 animate-pulse sm:col-span-2" />
        </div>
      </div>
    </div>
  )
}

export default SectionLoader
