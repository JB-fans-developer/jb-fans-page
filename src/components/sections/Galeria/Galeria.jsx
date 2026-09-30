/* ============================================
   JORY BOY FAN PAGE — GALERÍA EDITORIAL
   Galeria.jsx
   ============================================ */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GALERIA } from '../../../constants/index'
import GaleriaModal from './GaleriaModal'
import styles from './Galeria.module.css'

/* Mapea el campo "variant" del dato a la clase CSS del span */
const VARIANT_CLASS = {
  small: 'spanSmall',
  tall:  'spanTall',
  wide:  'spanWide',
  big:   'spanBig',
}

function Galeria() {
  const [indiceActivo, setIndiceActivo] = useState(null)

  const abrir  = (i) => setIndiceActivo(i)
  const cerrar = () => setIndiceActivo(null)
  const anterior = () => setIndiceActivo((i) => (i - 1 + GALERIA.length) % GALERIA.length)
  const siguiente = () => setIndiceActivo((i) => (i + 1) % GALERIA.length)

  return (
    <section className={styles.galeria} id="galeria">

      {/* ══════════════════════════════════════
          ENCABEZADO — HERO ELEGANTE
      ══════════════════════════════════════ */}
      <div className={styles.header}>
        <motion.h1
          className={styles.titulo}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          LA <span className={styles.tituloGold}>GALERÍA</span> DEL FANÁTICO
        </motion.h1>

        <motion.p
          className={styles.subtitulo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Cada imagen es un instante de su historia musical, contado desde adentro.
        </motion.p>
      </div>

      {/* ══════════════════════════════════════
          GRID EDITORIAL MASONRY
      ══════════════════════════════════════ */}
      <div className={styles.grid}>
        {GALERIA.map((foto, i) => (
          <motion.div
            key={foto.id}
            className={`${styles.item} ${styles[VARIANT_CLASS[foto.variant]]}`}
            onClick={() => abrir(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src={foto.src}
              alt={foto.alt}
              className={styles.itemImg}
              loading="lazy"
            />
            <div className={styles.itemOverlay}>
              <span className={styles.itemIcon}>⤢ Ver foto</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          MODAL — VISOR FULLSCREEN
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {indiceActivo !== null && (
          <GaleriaModal
            imagen={GALERIA[indiceActivo]}
            onClose={cerrar}
            onPrev={anterior}
            onNext={siguiente}
          />
        )}
      </AnimatePresence>

    </section>
  )
}

export default Galeria