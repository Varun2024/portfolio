import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Logs from './pages/Logs.jsx'
import LogPost from './pages/LogPost.jsx'

// Defer firebase (and its analytics side-effect) off the critical path.
// ~100kb chunk stays out of the initial bundle; testimonials will pull it
// when its lazy section mounts.
const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000))
idle(() => { import('./lib/firebase.js') })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/logs/:slug" element={<LogPost />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
