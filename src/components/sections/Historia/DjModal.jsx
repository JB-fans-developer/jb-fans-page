/* ============================================
   JORY BOY FAN PAGE — DJ MIGUEL MIX: MODAL
   components/sections/Historia/DjModal.jsx
   ============================================ */

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './DjModal.module.css'

const pad = (n) => String(n).padStart(2, '0')

function DjModal({ foto, indice, total, leyenda, onClose }) {
  /* Cerrar con ESC + bloquear el scroll del body mientras está abierto */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className={styles.marco}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <button type="button" className={styles.cerrar} onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        {foto.src ? (
          <img src={foto.src} alt={foto.alt} className={styles.imagen} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderNum}>{pad(indice + 1)}</span>
            <span classNames={styles.placeholderTexto}>Foto próximamente</span>
          </div>
        )}

        <div className={styles.pie}>
          <span className={styles.pieTexto}>{leyenda}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DjModal