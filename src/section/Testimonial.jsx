import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion as Motion } from "motion/react"
import { onValue, push, query, ref, limitToLast } from "firebase/database"
import Alert from "../components/Alert"
import AnimatedTooltip from "../components/AnimatedTooltip"
import { database } from "../lib/firebase"
import { buildDefaultAvatar, resolveAvatar } from "../lib/avatar"
import { fallbackTestimonials } from "../constants"

const COUNT_WORDS = ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"]
const asWord = (n) => COUNT_WORDS[n] ? `${COUNT_WORDS[n][0].toUpperCase()}${COUNT_WORDS[n].slice(1)}` : `${n}`

// Marquee: horizontal infinite scroll using keyframes from index.css
// (--animate-marquee + --gap custom prop). Repeats children so the loop
// stays filled on wide viewports. pauseOnHover halts the whole track.
const Marquee = ({ children, reverse = false, repeat = 3, duration = 48, pauseOnHover = true, className = "" }) => (
  <div
    className={`group flex overflow-hidden [--gap:1.25rem] ${className}`}
    style={{ gap: "var(--gap)" }}
  >
    {Array.from({ length: repeat }).map((_, i) => (
      <div
        key={i}
        className={`flex shrink-0 justify-around ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          gap: "var(--gap)",
          animation: `marquee ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {children}
      </div>
    ))}
  </div>
)

export default function Testimonials() {
  const [formData, setFormData] = useState({ name: "", role: "", quote: "", avatar: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [remoteTestimonials, setRemoteTestimonials] = useState([])
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const firstFieldRef = useRef(null)

  const testimonials = useMemo(
    () => (remoteTestimonials.length ? remoteTestimonials : fallbackTestimonials),
    [remoteTestimonials],
  )

  useEffect(() => {
    const testimonialsRef = query(ref(database, "testimonials"), limitToLast(12))
    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const value = snapshot.val()
      if (!value) {
        setRemoteTestimonials([])
        return
      }
      const parsed = Object.entries(value)
        .map(([id, item]) => {
          const name = item?.name || "Anonymous"
          return {
            id,
            name,
            role: item?.role || "Guest",
            quote: item?.quote || "",
            avatar: resolveAvatar(item?.avatar, name || id),
            createdAt: Number(item?.createdAt) || 0,
          }
        })
        .filter((item) => item.quote)
        .sort((a, b) => b.createdAt - a.createdAt)
      setRemoteTestimonials(parsed)
    })
    return () => unsubscribe()
  }, [])

  const showAlertMessage = (type, message) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 4500)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const newFeedbackRef = await push(ref(database, "testimonials"), {
        name: formData.name.trim(),
        role: formData.role.trim(),
        quote: formData.quote.trim(),
        avatar: formData.avatar.trim(),
        createdAt: Date.now(),
      })
      const shareLink = `${window.location.origin}${window.location.pathname}?testimonial=${newFeedbackRef.key}#testimonials`
      setFormData({ name: "", role: "", quote: "", avatar: "" })
      setFeedbackOpen(false)
      showAlertMessage("success", `Thanks, your note is in. Share link: ${shareLink}`)
    } catch (error) {
      console.error("Testimonial submit failed:", error)
      showAlertMessage("danger", "Could not send. Try again shortly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openForm = () => {
    setFeedbackOpen(true)
    setTimeout(() => firstFieldRef.current?.focus(), 300)
  }

  // Split testimonials across two tracks so each row has unique content.
  // With few items, each half still gets at least one entry.
  const half = Math.ceil(testimonials.length / 2)
  const firstTrack = testimonials.slice(0, half)
  const secondTrack = testimonials.slice(half).length ? testimonials.slice(half) : testimonials

  return (
    <section id="testimonials" className="c-space section-spacing">
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none tracking-tight">
            What people say
          </h2>
          <div className="text-[12px] text-white/85 pb-1">
            {asWord(testimonials.length).toLowerCase()} so far
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <AnimatedTooltip items={testimonials.slice(0, 6)} />
          <span className="text-[12px] text-white/60">
            hover for names
          </span>
        </div>

        <div className="relative mt-8">
          <div className="flex flex-col gap-5 sm:gap-6">
            <Marquee duration={48}>
              {firstTrack.map((t) => (
                <QuoteCard key={`a-${t.id}`} t={t} />
              ))}
            </Marquee>
            <Marquee reverse duration={62}>
              {secondTrack.map((t) => (
                <QuoteCard key={`b-${t.id}`} t={t} />
              ))}
            </Marquee>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <AnimatePresence mode="wait" initial={false}>
            {!feedbackOpen ? (
              <Motion.div
                key="cta"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap items-center justify-between gap-4"
              >
                <p className="text-sm text-white/85">
                  Worked with me?{" "}
                  <span className="text-white/80">Add your line.</span>
                </p>
                <button
                  type="button"
                  onClick={openForm}
                  className="group inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 hover:border-white/50 hover:bg-white/10 transition"
                >
                  Share your take
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Motion.div>
            ) : (
              <Motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mx-auto max-w-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-white/85">Share your take</h3>
                  <button
                    type="button"
                    onClick={() => setFeedbackOpen(false)}
                    className="text-xs text-white/50 hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <label htmlFor="feedback-name" className="field-label">Name</label>
                  <input
                    id="feedback-name"
                    ref={firstFieldRef}
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
                  <label htmlFor="feedback-role" className="field-label">Role</label>
                  <input
                    id="feedback-role"
                    name="role"
                    type="text"
                    className="field-input"
                    placeholder="e.g. Senior Engineer, or Head of Marketing · ex-SDE"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                  <p className="mt-1 text-[11px] text-white/85">
                    If your current title doesn't show your tech background, add it here.
                  </p>
                </div>
                <div>
                  <label htmlFor="feedback-quote" className="field-label">
                    What was it like working together?
                  </label>
                  <textarea
                    id="feedback-quote"
                    name="quote"
                    rows={4}
                    className="field-input"
                    placeholder="Keep it specific. One honest paragraph beats five polite ones."
                    value={formData.quote}
                    onChange={handleChange}
                    required
                  />
                </div>
                <details className="text-xs text-white/50">
                  <summary className="cursor-pointer hover:text-white/80 transition select-none">
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
                  className="w-full rounded-md bg-white px-5 py-3 text-sm font-semibold text-[var(--color-midnight)] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Share"}
                </button>
              </Motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const QuoteCard = ({ t }) => (
  <figure className="relative w-[72vw] max-w-[18rem] sm:w-[22rem] sm:max-w-[22rem] shrink-0 rounded-sm border border-white/10 bg-[var(--color-midnight)] px-4 py-5 sm:px-5 sm:py-6 hover:border-white/25 transition-colors">
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-3 top-0 font-display text-[4.5rem] leading-none text-white/[0.08] select-none"
    >
      &ldquo;
    </span>
    <blockquote className="relative text-[13px] sm:text-[14px] leading-relaxed text-white/85 line-clamp-5">
      {t.quote}
    </blockquote>
    <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-3">
      <img
        src={t.avatar || buildDefaultAvatar(t.name)}
        alt=""
        aria-hidden="true"
        onError={(event) => {
          const fallback = buildDefaultAvatar(t.name)
          if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback
        }}
        className="size-8 shrink-0 rounded-full object-cover ring-1 ring-white/15 bg-[var(--color-storm)]"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate">{t.name}</div>
        <div className="text-[11px] text-white/50 truncate">{t.role}</div>
      </div>
    </figcaption>
  </figure>
)
