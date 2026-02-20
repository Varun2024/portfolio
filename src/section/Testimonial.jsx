/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dark, minimal testimonial component using Tailwind + Framer Motion
// Default export a single React component. Accepts props to override data / behavior.

export default function Testimonials({
  testimonials = [],
  autoRotate = true,
  rotateInterval = 6000,
}) {
  const defaultTestimonials = [
    {
      name: "Vishnu S.",
      role: "Owner, Sasha",
      quote:
        "Ecom made easy work of what used to be a tedious process. The support is top-notch.",
      avatar: "/assets/sasha.png",
    },
    {
      name: "Thomson",
      role: "Event Organiser,TedxBITD",
      quote:
        "Real-time updates during peak traffic saved us hours. The admin UX is minimal but powerful.",
      avatar: "/assets/tedx.png",
    },
    {
      name: "Anshul",
      role: "Grainkart intern, SDE at Iot company",
      quote:
        "Integration was painless. Clean code, sensible defaults, and thoughtful animations.",
      
    },
  ];

  const items = testimonials.length ? testimonials : defaultTestimonials;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, rotateInterval);
    return () => clearInterval(id);
  }, [autoRotate, rotateInterval, items.length]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.995,
    }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.45 } },
    exit: (dir) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.995,
      transition: { duration: 0.35 },
    }),
  };

  const handlePrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const handleNext = () => setIndex((i) => (i + 1) % items.length);

  return (
    <section id="testimonials" className="w-full max-w-sm sm:max-w-2xl mx-auto my-12 sm:my-20 px-2 sm:px-0">
      <div className="bg-[var(--color-primary)] border-2 border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <h3 className="text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold leading-snug">What people say about me</h3>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className="p-2.5 rounded-md hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next testimonial"
              onClick={handleNext}
              className="p-2.5 rounded-md hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 relative min-h-[170px] sm:min-h-[120px]">
          <AnimatePresence custom={1} initial={false} mode="wait">
            <motion.blockquote
              key={index}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={items[index].avatar ? items[index].avatar : "/assets/logos/user.svg"}
                  alt={items[index].name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-1 ring-gray-800 object-cover"
                />

                <div>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">“{items[index].quote}”</p>
                  <div className="mt-2.5 sm:mt-3 text-sm text-gray-400">
                    <div className="font-medium text-gray-100">{items[index].name}</div>
                    <div className="text-xs">{items[index].role}</div>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-8 bg-gray-100" : "w-4 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
