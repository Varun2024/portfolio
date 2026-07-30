import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export const Timeline = ({ data }) => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const updateMobileState = () => setIsMobile(mediaQuery.matches);

        updateMobileState();
        mediaQuery.addEventListener("change", updateMobileState);

        return () => {
            mediaQuery.removeEventListener("change", updateMobileState);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 25%", "end 75%"],
    });

    const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const smoothProgressHeight = useSpring(progressHeight, {
        stiffness: 140,
        damping: 28,
        mass: 0.2,
    });

    const toggleExpanded = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <section className="c-space section-spacing" id="experience" ref={sectionRef}>
            <h2 className="text-heading">My Work Experience</h2>

            <div className="relative mt-8 pl-7 sm:mt-10 sm:pl-8">
                <div className="absolute bottom-0 left-[0.5px] top-0 w-px bg-white/15" aria-hidden="true" />

                <motion.div
                    style={{ height: smoothProgressHeight }}
                    className="absolute left-[0.5px] top-0 w-px bg-gradient-to-b from-[var(--color-aqua)] via-[var(--color-aqua)]/40 to-transparent"
                    aria-hidden="true"
                />

                {data.map((item, index) => {
                    const isExpanded = !!expandedItems[index];
                    const visibleContents = isMobile && !isExpanded ? item.contents.slice(0, 2) : item.contents;

                    return (
                    <article key={`${item.title}-${item.date}-${index}`} className="relative mb-6 sm:mb-10">
                        <span
                            className="absolute left-[0.5px] top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[var(--color-aqua)]/70 bg-[var(--color-midnight)] shadow-[0_0_0_5px_rgba(51,194,204,0.14)]"
                            aria-hidden="true"
                        >
                            <span className="absolute inset-1 rounded-full bg-[var(--color-aqua)]" />
                        </span>

                        <div className="rounded-xl border border-white/10 bg-[var(--color-midnight)]/70 p-3.5 sm:p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-aqua)]">
                                {item.date}
                            </p>
                            <h3 className="mt-1.5 text-base font-semibold text-white sm:mt-2 sm:text-xl">{item.title}</h3>
                            <p className="text-sm text-neutral-400">{item.job}</p>

                            <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-neutral-300 sm:mt-3 sm:space-y-2 sm:text-base">
                                {visibleContents.map((content, contentIndex) => (
                                    <li key={`${item.title}-${contentIndex}`}>{content}</li>
                                ))}
                            </ul>

                            {isMobile && item.contents.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => toggleExpanded(index)}
                                    className="mt-2.5 text-xs font-semibold tracking-wide text-[var(--color-aqua)]"
                                >
                                    {isExpanded ? "Show less" : `Show ${item.contents.length - 2} more`}
                                </button>
                            )}
                        </div>
                    </article>
                )})}
            </div>
        </section>
    );
};
