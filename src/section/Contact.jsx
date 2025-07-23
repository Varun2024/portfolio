import {  useState } from "react"
import emailjs from "@emailjs/browser"
import Alert from "../components/Alert"
import { Particles } from "../components/Particle"

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
            console.log("Form: ", formData)
            await emailjs.send(
                "service_s82efv6",
                "template_dxtsiva",
                {
                    from_name: formData.name,
                    to_name: "Varun",
                    from_email: formData.email,
                    to_email: "varunshukla747@gmail.com",
                    message: formData.message
                },
                "4_L5n38NNzezqZfrA"
            )
            setIsLoading(false)
            setFormData({ name: "", email: "", message: "" })
            showAlertMessage("success", "Your message has been sent")
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setIsLoading(false)
            showAlertMessage("danger", "Something went wrong")

        }

        // service_s82efv6
        // template_n1sb669
    }
    return (
        <section className='relative flex items-center c-space section-spacing'>
            <Particles
            className="absolute inset-0 -z-50"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
            />
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-[var(--color-primary)]">
                <div className="flex flex-col items-start w-full gap-5 mb-10">
                    <h2 className='text-heading'>Let's Connect</h2>
                    <p className='font-normal text-neutral-400'>
                        From building fresh websites to enhancing existing platforms or launching innovative projects — I’ve got you covered.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className="mb-5">
                        <label htmlFor="name" className='field-label '>
                            Full name
                        </label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            className='field-input field-input-focus'
                            placeholder='Salmon bhoi'
                            autoComplete='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className='field-label '>
                            Email
                        </label>
                        <input
                            type="text"
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
                            Message
                        </label>
                        <textarea
                            type="text"
                            id='message'
                            name='message'
                            rows={4}
                            className='field-input field-input-focus'
                            placeholder='How can I Help you...'
                            autoComplete='message'
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-[var(--color-lavender)] to-[var(--color-royal)] hover-animation">
                        {!isLoading ? "Send" : "Sending..."}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact