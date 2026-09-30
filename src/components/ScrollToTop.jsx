/* ============================================
   JORY BOY FAN PAGE — SCROLL TO TOP
   components/ScrollToTop.jsx

   Sin esto, React Router no resetea el scroll al
   cambiar de ruta — el navegador simplemente se
   queda donde estabas. Este componente no renderiza
   nada visible, solo "escucha" cada cambio de ruta.
   ============================================ */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  /* Desactiva la restauración automática del navegador —
     algunos navegadores intentan "recordar" el scroll por su
     cuenta al navegar, compitiendo con nuestro propio control. */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Si la navegación trae un ancla (ej. "/#noticias"), baja
    // hasta esa sección en vez de ir al tope — así no rompemos
    // el link de "Noticias" del Navbar.
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop