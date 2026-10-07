import { mySocials } from '../constants'

const BUILD_DATE = new Date(__BUILD_DATE__ || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
})

const Footer = () => {
    return (
        <footer className="c-space pt-24 md:pt-32 pb-8 mt-10">
            <div className="mx-auto w-full max-w-6xl">
                <div className="border-t border-white/10 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[12px] text-white/60">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>© {new Date().getFullYear()} Varun Shukla</span>
                        <span className="text-white/15">·</span>
                        <span>React · Vite · Tailwind · Firebase</span>
                        <span className="text-white/15">·</span>
                        <span>Last shipped {BUILD_DATE}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {mySocials.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.name}
                                className="opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <img src={social.icon} className="w-4 h-4" alt="" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
