import { useState } from "react"
import emailjs from "@emailjs/browser"
import { AnimatePresence } from "motion/react"
import Alert from "../components/Alert"
import SendSuccess from "../components/SendSuccess"

const ConsoleField = ({ id, label, value, onChange, placeholder, autoComplete, type = "text", textarea = false }) => {
    const inputCls = "block w-full bg-transparent font-mono text-[13px] text-white placeholder:text-white/25 focus:outline-none border-b border-white/10 focus:border-[var(--color-aqua)]/60 transition-colors py-2"
    return (
        <label htmlFor={id} className="block">
            <span className="mb-1 block font-mono text-[11px] text-white/60">{'>'} {label}:</span>
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
        setIsLoading(true)
        try {
            await emailjs.send(
                "service_s82efv6",
                "template_dxtsiva",
                {
                    from_name: formData.name,
                    to_name: "Varun",
                    from_email: formData.email,
                    reply_to: formData.email,
                    to_email: "varunshukla747@gmail.com",
                    message: formData.message,
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
        <section id="contact" className='relative flex flex-col items-center gap-5 c-space mt-8 md:mt-12'>
            {/* testimonials */}
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="relative mx-auto w-full max-w-xl">
                <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-[var(--color-aqua)]/20 via-white/5 to-[var(--color-aqua)]/5 opacity-60 blur-[1px]" />
                <div className="relative rounded-xl border border-white/10 bg-[#04070f]/95 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] min-h-[520px]">
                    {/* terminal title bar */}
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                        <span className="size-2.5 rounded-full bg-white/15" />
                        <span className="size-2.5 rounded-full bg-white/15" />
                        <span className="size-2.5 rounded-full bg-white/15" />
                        <span className="ml-2 font-mono text-[11px] text-white/60">comms.exe — /dev/varun</span>
                    </div>

                    <AnimatePresence>
                        {justSent && <SendSuccess onDone={() => setJustSent(false)} />}
                    </AnimatePresence>

                    <div className="px-5 py-6 sm:px-7 sm:py-8">
                        <h2 className="sr-only">Establish Comms</h2>
                        <div className="mb-6 font-mono text-[13px] leading-relaxed text-[var(--color-aqua)]">
                            <div>{'>'} init comms.exe</div>
                            <div>{'>'} channel status: <span className="text-[var(--color-mint)]">open</span></div>
                            <div>{'>'} awaiting transmission_</div>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full space-y-4 font-mono'>
                            <ConsoleField
                                id="name"
                                label="callsign"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="commander salmon"
                                autoComplete="name"
                                type="text"
                            />
                            <ConsoleField
                                id="email"
                                label="frequency"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="salmonbhoi@gmail.com"
                                autoComplete="email"
                                type="email"
                            />
                            <ConsoleField
                                id="message"
                                label="transmission"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="send your transmission..."
                                autoComplete="off"
                                textarea
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                data-cursor-tag="Transmit"
                                className="mt-2 w-full rounded-md border border-[var(--color-aqua)]/40 bg-[var(--color-aqua)]/10 px-4 py-3 text-center font-mono text-sm text-[var(--color-aqua)] transition hover:bg-[var(--color-aqua)]/20 hover:border-[var(--color-aqua)]/70 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "[ transmitting... ]" : "[ transmit ]"}
                            </button>
                            <p className="mt-3 text-center font-mono text-[11px] text-white/60">
                                {'>'} avg. response time: <span className="text-[var(--color-mint)]">~24h</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact