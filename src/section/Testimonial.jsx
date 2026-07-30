import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { onValue, push, query, ref, limitToLast } from "firebase/database";
import Alert from "../components/Alert";
import { database } from "../lib/firebase";
import { buildDefaultAvatar, resolveAvatar } from "../lib/avatar";

const fallbackTestimonials = [
  {
    id: "fallback-vishnu",
    name: "Vishnu S.",
    role: "Owner, Sasha",
    quote:
      "Ecom made easy work of what used to be a tedious process. The support is top-notch.",
    avatar: "/assets/sasha.png",
    createdAt: 1,
  },
  {
    id: "fallback-thomson",
    name: "Thomson",
    role: "Event Organiser, TEDxBITD",
    quote:
      "Real-time updates during peak traffic saved us hours. The admin UX is minimal but powerful.",
    avatar: "/assets/tedx.png",
    createdAt: 2,
  },
  {
    id: "fallback-anshul",
    name: "Anshul",
    role: "SDE Intern",
    quote:
      "Integration was painless. Clean code, sensible defaults, and thoughtful animations.",
    avatar: "/assets/logos/user.svg",
    createdAt: 3,
  },
];

export default function Testimonials({ autoRotate = true, rotateInterval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    avatar: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [remoteTestimonials, setRemoteTestimonials] = useState([]);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const firstFieldRef = useRef(null);

  const testimonials = useMemo(() => {
    if (!remoteTestimonials.length) {
      return fallbackTestimonials;
    }
    return remoteTestimonials;
  }, [remoteTestimonials]);

  useEffect(() => {
    const testimonialsRef = query(ref(database, "testimonials"), limitToLast(12));

    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const value = snapshot.val();

      if (!value) {
        setRemoteTestimonials([]);
        return;
      }

      const parsed = Object.entries(value)
        .map(([id, item]) => {
          const name = item?.name || "Anonymous"
          const seed = name || id
          return {
            id,
            name,
            role: item?.role || "Guest",
            quote: item?.quote || "",
            avatar: resolveAvatar(item?.avatar, seed),
            createdAt: Number(item?.createdAt) || 0,
          }
        })
        .filter((item) => item.quote)
        .sort((a, b) => b.createdAt - a.createdAt);

      setRemoteTestimonials(parsed);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (index >= testimonials.length) {
      setIndex(0);
    }
  }, [index, testimonials.length]);

  useEffect(() => {
    if (!testimonials.length) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("testimonial");
    if (!selectedId) {
      return;
    }

    const selectedIndex = testimonials.findIndex((item) => item.id === selectedId);
    if (selectedIndex >= 0) {
      setIndex(selectedIndex);
    }
  }, [testimonials]);

  useEffect(() => {
    if (!autoRotate || testimonials.length <= 1) {
      return;
    }

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, rotateInterval);

    return () => clearInterval(id);
  }, [autoRotate, rotateInterval, testimonials.length]);

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4500);
  };

  const handlePrev = () => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % testimonials.length);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const newFeedbackRef = await push(ref(database, "testimonials"), {
        name: formData.name.trim(),
        role: formData.role.trim(),
        quote: formData.quote.trim(),
        avatar: formData.avatar.trim(),
        createdAt: Date.now(),
      });

      const shareLink = `${window.location.origin}${window.location.pathname}?testimonial=${newFeedbackRef.key}#testimonials`;

      setFormData({ name: "", role: "", quote: "", avatar: "" });
      showAlertMessage("success", `Signal received. Rebroadcast link: ${shareLink}`);
    } catch {
      showAlertMessage(
        "danger",
        "Comms interference — try transmitting again shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: {
      x: 40,
      opacity: 0,
      scale: 0.995,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45 },
    },
    exit: {
      x: -40,
      opacity: 0,
      scale: 0.995,
      transition: { duration: 0.35 },
    },
  };

  const activeTestimonial = testimonials[index] || fallbackTestimonials[0];

  const buildShareLink = (testimonialId) => {
    const currentPath = `${window.location.origin}${window.location.pathname}`;
    return `${currentPath}?testimonial=${testimonialId}#testimonials`;
  };

  const shareFeedback = async () => {
    const shareLink = buildShareLink(activeTestimonial.id);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Feedback from ${activeTestimonial.name}`,
          text: activeTestimonial.quote,
          url: shareLink,
        });
        return;
      } catch {
        // User canceled share modal or share failed; fallback to clipboard.
      }
    }

    try {
      await navigator.clipboard.writeText(shareLink);
      showAlertMessage("success", "Channel link copied. Rebroadcast anywhere.");
    } catch {
      showAlertMessage("danger", "Unable to copy the channel link on this device.");
    }
  };

  const shareFeedbackForm = async () => {
    const formLink = `${window.location.origin}${window.location.pathname}#testimonials`;

    try {
      await navigator.clipboard.writeText(formLink);
      showAlertMessage("success", "Channel link copied. Share it anywhere.");
    } catch {
      showAlertMessage("danger", "Could not copy channel link on this device.");
    }
  };

  return (
    <section id="testimonials" className="c-space section-spacing">
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[var(--color-storm)] to-[var(--color-indigo)] p-5 sm:p-7 lg:col-span-3 shadow-[0_20px_60px_-30px_rgba(122,87,219,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-xl font-semibold leading-snug text-gray-100 sm:text-2xl md:text-3xl">
                Incoming transmissions
              </h3>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                aria-label="Previous transmission"
                onClick={handlePrev}
                className="rounded-md p-2.5 hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                aria-label="Next transmission"
                onClick={handleNext}
                className="rounded-md p-2.5 hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-5">
            <AnimatePresence initial={false} mode="wait">
              <Motion.blockquote
                key={`${activeTestimonial.name}-${activeTestimonial.createdAt}`}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="flex items-start gap-2.5 sm:gap-4">
                  <img
                    src={activeTestimonial.avatar || buildDefaultAvatar(activeTestimonial.name)}
                    alt={activeTestimonial.name}
                    onError={(event) => {
                      const fallback = buildDefaultAvatar(activeTestimonial.name)
                      if (event.currentTarget.src !== fallback) {
                        event.currentTarget.src = fallback
                      }
                    }}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-800 sm:h-14 sm:w-14 bg-[var(--color-indigo)]"
                  />

                  <div>
                    <p className="text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-relaxed">
                      "{activeTestimonial.quote}"
                    </p>
                    <div className="mt-2 text-sm text-gray-400 sm:mt-3">
                      <div className="text-base font-medium text-gray-100 sm:text-base">{activeTestimonial.name}</div>
                      <div className="text-xs">{activeTestimonial.role}</div>
                    </div>
                    <button
                      type="button"
                      onClick={shareFeedback}
                      className="mt-2.5 inline-flex items-center rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-white hover:bg-white/10"
                    >
                      Rebroadcast
                    </button>
                  </div>
                </div>
              </Motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 sm:mt-6">
            {testimonials.map((item, currentIndex) => (
              <button
                key={`${item.name}-${item.createdAt}-${currentIndex}`}
                onClick={() => setIndex(currentIndex)}
                aria-label={`Show transmission ${currentIndex + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === index ? "w-8 bg-gray-100" : "w-4 bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a1158] via-[#1a0a3d] to-[#0f0729] p-6 sm:p-7 lg:col-span-2 shadow-[0_20px_60px_-30px_rgba(122,87,219,0.4)]">
          <div className="pointer-events-none absolute -top-10 -right-6 text-[10rem] leading-none font-serif text-white/[0.04] select-none">
            &ldquo;
          </div>
          <div className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-[var(--color-lavender)]/15 blur-3xl" />

          <AnimatePresence mode="wait" initial={false}>
            {!feedbackOpen ? (
              <Motion.div
                key="cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative flex h-full flex-col"
              >
                <h4 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  Crewed with me? Send a transmission.
                </h4>
                <p className="mt-3 text-sm text-neutral-300/90 leading-relaxed">
                  Two minutes is all it takes. Your signal joins the rotating
                  feed above — you get a shareable link back.
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 3).map((t) => (
                      <img
                        key={t.id}
                        src={t.avatar || buildDefaultAvatar(t.name || t.id)}
                        alt=""
                        onError={(e) => {
                          const fallback = buildDefaultAvatar(t.name || t.id)
                          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                        }}
                        className="size-7 rounded-full border-2 border-[#1a0a3d] object-cover bg-[var(--color-indigo)]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">
                    {testimonials.length} {testimonials.length === 1 ? "signal" : "signals"} received so far
                  </span>
                </div>

                <div className="mt-auto pt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackOpen(true)
                      setTimeout(() => firstFieldRef.current?.focus(), 300)
                    }}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(122,87,219,0.5)] transition hover:scale-[1.02]"
                  >
                    Open a channel
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={shareFeedbackForm}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium text-neutral-300 hover:border-white/35 hover:bg-white/5 transition"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copy channel link
                  </button>
                </div>
              </Motion.div>
            ) : (
              <Motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative space-y-3"
              >
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setFeedbackOpen(false)}
                    className="text-xs text-neutral-400 hover:text-white transition"
                  >
                    ← back
                  </button>
                </div>

                <div>
                  <label htmlFor="feedback-name" className="field-label">Callsign</label>
                  <input
                    id="feedback-name"
                    ref={firstFieldRef}
                    name="name"
                    type="text"
                    className="field-input"
                    placeholder="Your callsign"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="feedback-role" className="field-label">Role in the fleet</label>
                  <input
                    id="feedback-role"
                    name="role"
                    type="text"
                    className="field-input"
                    placeholder="Founder, Developer, Recruiter..."
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="feedback-quote" className="field-label">Signal</label>
                  <textarea
                    id="feedback-quote"
                    name="quote"
                    rows={4}
                    className="field-input"
                    placeholder="Broadcast your message..."
                    value={formData.quote}
                    onChange={handleChange}
                    required
                  />
                </div>
                <details className="text-xs text-neutral-400">
                  <summary className="cursor-pointer hover:text-neutral-200 transition select-none">
                    Add avatar URL (optional)
                  </summary>
                  <input
                    id="feedback-avatar"
                    name="avatar"
                    type="url"
                    className="field-input mt-2"
                    placeholder="https://..."
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </details>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-gradient-to-r from-[var(--color-royal)] to-[var(--color-lavender)] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(122,87,219,0.5)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Transmitting..." : "Transmit"}
                </button>
              </Motion.form>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
}
