import { useState } from "react"
import emailjs from "@emailjs/browser"
import { AnimatePresence } from "motion/react"
import Alert from "../components/Alert"
import SendSuccess from "../components/SendSuccess"

const ConsoleField = ({ id, label, value, onChange, placeholder, autoComplete, type = "text", textarea = false, maxLength }) => {
    const inputCls = "block w-full bg-transparent text-[15px] text-white placeholder:text-white/55 focus:outline-none border-b border-white/15 focus:border-white/70 transition-colors py-2"
    return (
        <label htmlFor={id} className="block">
            <span className="mb-1 block text-[12px] text-white/85">{label}</span>
            {textarea ? (
                <textarea
                    id={id}
                    name={id}
                    rows={4}
                    className={inputCls + " resize-none"}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    required
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    className={inputCls}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    required
                />
            )}
        </label>
    )
}


const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState("Success")
    const [alertMessage, setAlertMessage] = useState("")
    const [justSent, setJustSent] = useState(false)
    const handleChange = (e) => {
        // the name of the input field and its value being set all together
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const showAlertMessage = (type, message) => {
        setAlertType(type)
        setAlertMessage(message)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = formData.name.trim()
        const email = formData.email.trim()
        const message = formData.message.trim()
        if (!name || !email || !message) {
            showAlertMessage("danger", "All fields are required.")
            return
        }
        setIsLoading(true)
        try {
            await emailjs.send(
                "service_s82efv6",
                "template_dxtsiva",
                {
                    from_name: name,
                    to_name: "Varun",
                    from_email: email,
                    reply_to: email,
                    to_email: "varunshukla747@gmail.com",
                    message,
                },
                { publicKey: "4_L5n38NNzezqZfrA" }
            )
            setFormData({ name: "", email: "", message: "" })
            setJustSent(true)
        } catch (error) {
            const detail = error?.text || error?.message || "Unknown error"
            console.error("EmailJS send failed:", error)
            showAlertMessage("danger", `Transmission failed: ${detail}`)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section id="contact" className='relative flex flex-col items-center gap-5 c-space section-spacing'>
            {/* testimonials */}
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="relative mx-auto w-full max-w-xl">
                <div className="relative rounded-sm border border-white/10 bg-[#04070f] min-h-[520px]">
                    <AnimatePresence>
                        {justSent && <SendSuccess onDone={() => setJustSent(false)} />}
                    </AnimatePresence>

                    <div className="px-5 py-6 sm:px-7 sm:py-8">
                        <div className="mb-6">
                            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Get in touch</h2>
                            <p className="mt-2 text-sm text-white/85">
                                Open to interesting problems. Typical reply within 24h.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full space-y-4'>
                            <ConsoleField
                                id="name"
                                label="Name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                autoComplete="name"
                                type="text"
                                maxLength={100}
                            />
                            <ConsoleField
                                id="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                                type="email"
                                maxLength={200}
                            />
                            <ConsoleField
                                id="message"
                                label="Message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="What are you building?"
                                autoComplete="off"
                                textarea
                                maxLength={2000}
                            />

                            <button
                                type="submit"
                                disabled={isLoading}

                                className="mt-4 w-full rounded-md bg-white px-4 py-3 text-center text-sm font-semibold text-[var(--color-midnight)] transition hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Sending…" : "Send message"}
                            </button>
                            <p className="mt-4 text-center text-[12px] text-white/85">
                                Or email directly:{" "}
                                <a
                                    href="mailto:varunshukla747@gmail.com"
                                    className="text-white/80 underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition"
                                >
                                    varunshukla747@gmail.com
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact