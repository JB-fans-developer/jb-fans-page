/* ============================================
   JORY BOY FAN PAGE — GALERÍA MODAL (VISOR)
   GaleriaModal.jsx
   ============================================ */

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './GaleriaModal.module.css'

function GaleriaModal({ imagen, onClose, onPrev, onNext }) {

  /* Cerrar con ESC + navegar con flechas del teclado */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

    /* Descarga real del archivo — un <a download> normal no funciona
     con imágenes de otro dominio (Cloudinary), el navegador solo
     las abre. Con fetch + blob sí se fuerza la descarga real. */
  async function handleDescargar(e, imagen) {
    e.stopPropagation()
    try {
      const respuesta = await fetch(imagen.src)
      const blob = await respuesta.blob()
      const urlTemporal = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = urlTemporal
      link.download = `jory-boy-galeria-${imagen.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(urlTemporal)
    } catch (error) {
      console.error('No se pudo descargar la imagen:', error)
      // Respaldo: si algo falla (ej. red caída), al menos abre la imagen
      window.open(imagen.src, '_blank')
    }
  }

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* BOTÓN CERRAR */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar visor">✕</button>

      {/* NAVEGACIÓN — Anterior */}
      <button
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Foto anterior"
      >
        ‹
      </button>

      {/* VISOR */}
      <motion.div
        className={styles.viewer}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <div
          className={styles.imageWrap}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.img
            key={imagen.id}
            src={imagen.src}
            alt={imagen.alt}
            className={styles.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        </div>

        {/* ACCIONES */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={(e) => handleDescargar(e, imagen)}
          >
            <span>⬇</span> Descargar
          </button>
        </div>
      </motion.div>

      {/* NAVEGACIÓN — Siguiente */}
      <button
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Foto siguiente"
      >
        ›
      </button>
    </motion.div>
  )
}

export default GaleriaModal