export const Timeline = ({ data }) => {
    return (
        <section className="c-space section-spacing" id="experience">
            <h2 className="text-heading">My Work Experience</h2>

            <div className="relative mt-10 pl-7 sm:pl-8">
                <div className="absolute bottom-0 left-0 top-0 w-px bg-white/15" aria-hidden="true" />
                {data.map((item, index) => (
                    <article key={`${item.title}-${item.date}-${index}`} className="relative mb-8 sm:mb-10">
                        <span
                            className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-aqua)] shadow-[0_0_0_4px_rgba(51,194,204,0.15)]"
                            aria-hidden="true"
                        />

                        <div className="rounded-xl border border-white/10 bg-[var(--color-midnight)]/70 p-4 sm:p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-aqua)]">
                                {item.date}
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
                            <p className="text-sm text-neutral-400">{item.job}</p>

                            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-300 sm:text-base">
                                {item.contents.map((content, contentIndex) => (
                                    <li key={`${item.title}-${contentIndex}`}>{content}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
