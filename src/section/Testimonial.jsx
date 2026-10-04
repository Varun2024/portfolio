import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion as Motion } from "motion/react"
import { onValue, push, query, ref, limitToLast } from "firebase/database"
import Alert from "../components/Alert"
import { database } from "../lib/firebase"
import { buildDefaultAvatar, resolveAvatar } from "../lib/avatar"

const fallbackTestimonials = [
  {
    id: "fallback-vishnu",
    name: "Vishnu S.",
    role: "Owner, Sasha",
    quote:
      "Ecom made easy work of what used to be a tedious process. The support is top-notch.",
    avatar: "/assets/sasha.webp",
    createdAt: 1,
  },
  {
    id: "fallback-thomson",
    name: "Thomson",
    role: "Event Organiser, TEDxBITD",
    quote:
      "Real-time updates during peak traffic saved us hours. The admin UX is minimal but powerful.",
    avatar: "/assets/tedx.webp",
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
]

const COUNT_WORDS = ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"]

const asWord = (n) => COUNT_WORDS[n] ? `${COUNT_WORDS[n][0].toUpperCase()}${COUNT_WORDS[n].slice(1)}` : `${n}`

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
      showAlertMessage("success", `Thanks — your note is in. Share link: ${shareLink}`)
    } catch {
      showAlertMessage("danger", "Could not send — try again shortly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const shareOne = async (t) => {
    const link = `${window.location.origin}${window.location.pathname}?testimonial=${t.id}#testimonials`
    if (navigator.share) {
      try {
        await navigator.share({ title: `Feedback from ${t.name}`, text: t.quote, url: link })
        return
      } catch { /* fall through */ }
    }
    try {
      await navigator.clipboard.writeText(link)
      showAlertMessage("success", "Link copied.")
    } catch {
      showAlertMessage("danger", "Could not copy link on this device.")
    }
  }

  const openForm = () => {
    setFeedbackOpen(true)
    setTimeout(() => firstFieldRef.current?.focus(), 300)
  }

  return (
    <section id="testimonials" className="c-space section-spacing">
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none tracking-tight">
            What people say
          </h2>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 pb-1">
            {asWord(testimonials.length)} so far
          </div>
        </div>

        <div className="mt-8 columns-1 md:columns-2 gap-6 sm:gap-7 [column-fill:_balance]">
          {testimonials.map((t) => (
            <QuoteCard key={t.id} t={t} onShare={() => shareOne(t)} />
          ))}
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
                <p className="text-sm text-white/55">
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
                  <p className="mt-1 text-[11px] text-white/40">
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

const QuoteCard = ({ t, onShare }) => (
  <figure className="relative mb-6 sm:mb-7 break-inside-avoid rounded-xl border border-white/10 bg-[var(--color-midnight)]/60 px-6 py-7 sm:px-7 sm:py-8">
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-4 top-0 font-display text-[6rem] leading-none text-white/[0.07] select-none"
    >
      &ldquo;
    </span>
    <blockquote className="relative text-[15px] leading-relaxed text-white/85 sm:text-base sm:leading-[1.7]">
      {t.quote}
    </blockquote>
    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
      <img
        src={t.avatar || buildDefaultAvatar(t.name)}
        alt=""
        aria-hidden="true"
        onError={(event) => {
          const fallback = buildDefaultAvatar(t.name)
          if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback
        }}
        className="size-9 shrink-0 rounded-full object-cover ring-1 ring-white/15 bg-[var(--color-storm)]"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate">{t.name}</div>
        <div className="text-[11px] text-white/50 truncate">{t.role}</div>
      </div>
      <button
        type="button"
        onClick={onShare}
        aria-label={`Share ${t.name}'s quote`}
        className="shrink-0 rounded-md p-1.5 text-white/35 hover:text-white hover:bg-white/5 transition"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </figcaption>
  </figure>
)
