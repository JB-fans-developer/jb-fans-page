/* ============================================
   JORY BOY FAN PAGE — DJ MIGUEL MIX
   components/sections/Historia/DjMiguelMix.jsx
   ============================================ */

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaExpand,
  FaInstagram,
  FaArrowUpRightFromSquare
} from 'react-icons/fa6'
import { DJ_MIGUEL_MIX } from '../../../constants/index'
import DjModal from './DjModal'
import styles from './DjMiguelMix.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

function DjMiguelMix() {
  const { nombre, descripcion, imagenPrincipal, fotos } = DJ_MIGUEL_MIX
  const fragmentos = fotos.slice(0, 4)
  const total = fragmentos.length

  const [activa, setActiva] = useState(null) // índice de la foto abierta, o null
  const cerrar = useCallback(() => setActiva(null), [])

  return (
    <section className={styles.dj} id="dj-miguel-mix">
      <div className={styles.contenido}>

        {/* ── TEXTO ── */}
        <motion.div
          className={styles.texto}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className={styles.titulo}>
            <span className={styles.tituloBlanco}>DJ</span>
            <span className={styles.tituloGold}>MIGUEL MIX</span>
          </h2>
          <div className={styles.divider} />
          <p className={styles.descripcion}>{descripcion}</p>
          <a
            href="https://www.instagram.com/miguelmixx?xtok=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramBtn}
            aria-label="Visitar perfil de Instagram"
          >
            <FaInstagram aria-hidden="true" />
            <span>VER PERFIL EN INSTAGRAM</span>
            <FaArrowUpRightFromSquare aria-hidden="true" />
          </a>
        </motion.div>

        {/* ── FOTO PARTIDA EN 4 FRAGMENTOS ── */}
        <div className={styles.mosaico}>
          {fragmentos.map((foto, i) => (
            <motion.button
              key={foto.id}
              type="button"
              className={styles.fragmento}
              style={{ '--col': i % 2, '--row': Math.floor(i / 2) }}
              onClick={() => setActiva(i)}
              aria-label={`Ver foto ${i + 1} de ${total}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
              }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {imagenPrincipal ? (
                <img
                  src={imagenPrincipal}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  className={styles.fragmentoImg}
                />
              ) : (
                <span className={styles.fragmentoPlaceholder}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <span className={styles.fragmentoOverlay} aria-hidden="true" />
              <span className={styles.fragmentoIcono} aria-hidden="true">
                <FaExpand />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {activa !== null && fragmentos[activa] && (
          <DjModal
            foto={fragmentos[activa]}
            indice={activa}
            total={total}
            leyenda={`Jory Boy × ${nombre}`}
            onClose={cerrar}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default DjMiguelMix