/* ============================================
   JORY BOY FAN PAGE — ENTRY POINT
   main.jsx
   ============================================ */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ParallaxProvider } from 'react-scroll-parallax'

// Estilos globales — siempre primero
import './styles/global.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </StrictMode>
)