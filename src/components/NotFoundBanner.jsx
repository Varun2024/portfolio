import { useEffect, useState } from "react"

const NotFoundBanner = () => {
    const [wrongPath, setWrongPath] = useState(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        const path = window.location.pathname
        if (path === "/" || path === "") return
        setWrongPath(path)
        // clean the URL so refresh/share doesn't perpetuate the 404
        window.history.replaceState(null, "", "/")
    }, [])

    if (!wrongPath) return null

    return (
        <div
            role="status"
            className="fixed inset-x-0 top-20 z-[9999] mx-auto w-full max-w-lg px-4"
        >
            <div className="rounded-sm border border-[var(--color-coral)]/40 bg-[#04070f] px-4 py-3 font-mono text-[12px] text-white/80">
                <div className="text-[var(--color-coral)]">{'>'} signal lost @ <span className="text-white">{wrongPath}</span></div>
                <div className="text-white/85">{'>'} rerouting to base station...</div>
                <button
                    onClick={() => setWrongPath(null)}
                    className="mt-1 text-[11px] text-[var(--color-aqua)] hover:text-white"
                >
                    [ dismiss ]
                </button>
            </div>
        </div>
    )
}

export default NotFoundBanner
