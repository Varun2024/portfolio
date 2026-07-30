import { useState } from "react"
import emailjs from "@emailjs/browser"
import { AnimatePresence } from "motion/react"
import Alert from "../components/Alert"
import { Particles } from "../components/Particle"
import SendSuccess from "../components/SendSuccess"


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
        <section id="contact" className='relative flex flex-col items-center justify-center gap-5 c-space mt-20 md:mt-30 min-h-[60vh]'>

            <Particles
                className="absolute inset-0 -z-100"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />
            {/* testimonials */}
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="relative mx-auto w-full max-w-lg">
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--color-lavender)]/30 via-white/5 to-[var(--color-aqua)]/20 opacity-60 blur-[1px]" />
                <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-[var(--color-storm)] to-[var(--color-indigo)] shadow-[0_20px_60px_-30px_rgba(122,87,219,0.4)] min-h-[520px]">
                <AnimatePresence>
                    {justSent && <SendSuccess onDone={() => setJustSent(false)} />}
                </AnimatePresence>
                <div className="flex flex-col items-start w-full gap-3 mb-8">
                    <h2 className='text-heading'>Establish Comms</h2>
                    <p className='font-normal text-neutral-300/90 text-sm md:text-base'>
                        New builds, existing platforms, or ambitious launches — dial in and we&rsquo;ll plot a course together.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className="mb-5">
                        <label htmlFor="name" className='field-label '>
                            Callsign
                        </label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            className='field-input field-input-focus'
                            placeholder='Commander Salmon'
                            autoComplete='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className='field-label '>
                            Frequency
                        </label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            className='field-input field-input-focus'
                            placeholder='salmonbhoi@gmail.com'
                            autoComplete='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className='field-label '>
                            Transmission
                        </label>
                        <textarea
                            type="text"
                            id='message'
                            name='message'
                            rows={4}
                            className='field-input field-input-focus'
                            placeholder='Send your transmission...'
                            autoComplete='message'
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-[var(--color-lavender)] to-[var(--color-royal)] hover-animation">
                        {!isLoading ? "Transmit" : "Transmitting..."}
                    </button>
                </form>
                </div>
            </div>
        </section>
    )
}

export default Contact