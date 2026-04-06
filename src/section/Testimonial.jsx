import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { onValue, push, query, ref, limitToLast } from "firebase/database";
import Alert from "../components/Alert";
import { database } from "../lib/firebase";

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
        .map(([id, item]) => ({
          id,
          name: item?.name || "Anonymous",
          role: item?.role || "Guest",
          quote: item?.quote || "",
          avatar: item?.avatar || "/assets/logos/user.svg",
          createdAt: Number(item?.createdAt) || 0,
        }))
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
      showAlertMessage("success", `Published. Share link: ${shareLink}`);
    } catch {
      showAlertMessage(
        "danger",
        "Unable to submit feedback right now. Please try again shortly."
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
      showAlertMessage("success", "Share link copied to clipboard.");
    } catch {
      showAlertMessage("danger", "Unable to copy the share link on this device.");
    }
  };

  const shareFeedbackForm = async () => {
    const formLink = `${window.location.origin}${window.location.pathname}#testimonials`;

    try {
      await navigator.clipboard.writeText(formLink);
      showAlertMessage("success", "Feedback form link copied. Share it anywhere.");
    } catch {
      showAlertMessage("danger", "Could not copy form link on this device.");
    }
  };

  return (
    <section id="testimonials" className="c-space section-spacing">
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border-2 border-gray-800/80 bg-[var(--color-primary)] p-4 shadow-sm sm:p-6 lg:col-span-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h3 className="text-lg font-semibold leading-snug text-gray-100 sm:text-2xl md:text-3xl">
              What people say about me
            </h3>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                aria-label="Previous testimonial"
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
                aria-label="Next testimonial"
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
                    src={activeTestimonial.avatar || "/assets/logos/user.svg"}
                    alt={activeTestimonial.name}
                    onError={(event) => {
                      event.currentTarget.src = "/assets/logos/user.svg";
                    }}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-800 sm:h-14 sm:w-14"
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
                      Share Feedback
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
                aria-label={`Show testimonial ${currentIndex + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === index ? "w-8 bg-gray-100" : "w-4 bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-gradient-to-b from-[var(--color-indigo)] to-[var(--color-primary)] p-4 sm:p-6 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-aqua)]">
            Feedback CTA
          </p>
          <h4 className="mt-2 text-2xl font-semibold text-white">Leave your testimonial</h4>
          <p className="mt-2 text-sm text-neutral-300">
            Share your experience in a few lines. It goes live in the testimonial feed.
          </p>
          <button
            type="button"
            onClick={shareFeedbackForm}
            className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-[var(--color-aqua)]/60 px-3 py-2 text-sm font-semibold text-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/10"
          >
            Share Feedback Form Link
          </button>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div>
              <label htmlFor="feedback-name" className="field-label">
                Name
              </label>
              <input
                id="feedback-name"
                name="name"
                type="text"
                className="field-input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="feedback-role" className="field-label">
                Role
              </label>
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
              <label htmlFor="feedback-quote" className="field-label">
                Feedback
              </label>
              <textarea
                id="feedback-quote"
                name="quote"
                rows={4}
                className="field-input"
                placeholder="Write your testimonial..."
                value={formData.quote}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="feedback-avatar" className="field-label">
                Avatar URL (optional)
              </label>
              <input
                id="feedback-avatar"
                name="avatar"
                type="url"
                className="field-input"
                placeholder="https://..."
                value={formData.avatar}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-radial from-[var(--color-lavender)] to-[var(--color-royal)] px-1 py-3 text-lg text-center cursor-pointer hover-animation disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Publishing..." : "Publish Feedback"}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
