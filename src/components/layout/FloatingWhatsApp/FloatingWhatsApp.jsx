/* ============================================
   JORY BOY FAN PAGE — BOTÓN FLOTANTE WHATSAPP
   FloatingWhatsApp.jsx

   Vive en App.jsx (fuera de <Routes>), así que
   aparece en TODAS las páginas sin duplicar código.
   ============================================ */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import styles from './FloatingWhatsApp.module.css'

/* Reemplaza por el link real de tu canal de difusión de WhatsApp */
const CANAL_WHATSAPP_URL = 'https://chat.whatsapp.com/Ej0WHjm0mYtIYeiyTZtPU8'

function FloatingWhatsApp() {
  const [hover, setHover] = useState(false)

  return (
    <motion.a
      href={CANAL_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.boton}
      aria-label="Únete al canal de fans en WhatsApp"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: 'backOut' }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Anillo de pulso — "canal activo" */}
      <span className={styles.pulso} />
      <span className={styles.pulso} style={{ animationDelay: '0.9s' }} />

      {/* Punto de estado "activo" */}
      <span className={styles.puntoActivo} />

      {/* Ícono */}
      <FaWhatsapp className={styles.icono} />

      {/* Tooltip — aparece al hover, mismo lenguaje visual que el resto del sitio */}
      <AnimatePresence>
        {hover && (
          <motion.span
            className={styles.tooltip}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            Únete al canal de fans
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}

export default FloatingWhatsApp