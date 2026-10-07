import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'
import Logs from './pages/Logs.jsx'
import LogPost from './pages/LogPost.jsx'

// SEO: force the Firebase default domain onto the canonical one so Google
// stops indexing both. Also inserts noindex for crawler-only runs that may
// not follow JS redirects.
const CANONICAL = 'https://varuncodes.tech'
const host = window.location.hostname
if (host.endsWith('.web.app') || host.endsWith('.firebaseapp.com')) {
  const meta = document.createElement('meta')
  meta.name = 'robots'
  meta.content = 'noindex, nofollow'
  document.head.appendChild(meta)
  window.location.replace(CANONICAL + window.location.pathname + window.location.search + window.location.hash)
}

// Defer firebase (and its analytics side-effect) off the critical path.
// ~100kb chunk stays out of the initial bundle; testimonials will pull it
// when its lazy section mounts.
const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000))
idle(() => { import('./lib/firebase.js') })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/logs/:slug" element={<LogPost />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
