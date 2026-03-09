/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'motion/react'

const RESUME_LINK = "https://drive.google.com/file/d/1rHC_X1fZdNJ0AeQ6GkN-_pTfVSX-fVma/view?usp=sharing";

function Navigation() {
    return (
        <ul className='nav-ul gap-2 sm:gap-3'>
            <li className='nav-li'>
                <a href="#home" className='rounded-full border border-transparent px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/5'>Home</a>
            </li>
            <li className='nav-li'>
                <a href="#about" className='rounded-full border border-transparent px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/5'>About</a>
            </li>
            <li className='nav-li'>
                <a href="#work" className='rounded-full border border-transparent px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/5'>Work</a>
            </li>
            <li className='nav-li'>
                <a href="#testimonials" className='rounded-full border border-transparent px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/5'>Testimonials</a>
            </li>
            <li className='nav-li'>
                <a href="#contact" className='rounded-full border border-transparent px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/5'>Contact</a>
            </li>
            <li className='nav-li'>
                <a
                    href={RESUME_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className='rounded-full border border-[var(--color-lavender)] bg-[var(--color-lavender)]/15 px-4 py-1.5 text-sm font-semibold text-white hover:bg-[var(--color-lavender)]/30'
                >
                    Resume
                </a>
            </li>
        </ul>

    )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='fixed inset-x-0 z-20 w-full border-b border-white/10 backdrop-blur-xl bg-[var(--color-primary)]/50'>
            <div className="mx-auto c-space max-w-7xl">
            <div className="flex items-center justify-between py-2.5 sm:py-2">
                    <a href="/" className='text-xl font-bold transition-colors text-neutral-400 hover:text-white '>
                        Varun
                    </a>
                    <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'>
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} className="w-6 h-6" alt="toggle" />
                    </button>
                    <nav className='hidden sm:flex '>
                        <Navigation />
                    </nav>
                </div>
            </div>
            {isOpen && 
            <motion.div className="block overflow-hidden text-center sm:hidden border-t border-white/10" 
            initial={{opacity:0,x:-10}} 
            animate={{opacity:1,x:0}}
            style={{maxHeight:"100vh"}}
            transition={{duration:0.35}}
            >
                <nav className='py-4'>
                    <Navigation />
                </nav>
            </motion.div>}
        </div>
    )
}

export default Navbar