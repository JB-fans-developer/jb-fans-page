/* ============================================
   JORY BOY FAN PAGE — ALBUMS SECTION
   Albums.jsx
   ============================================ */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ALBUMS } from '../../../constants/index'
import AlbumModal from './AlbumModal'
import styles from './Albums.module.css'

/* Íconos SVG de plataformas inline para no necesitar librerías */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' }
  })
}

function Albums() {
  const [albumSeleccionado, setAlbumSeleccionado] = useState(null)

  return (
    <section className={styles.albums} id="musica">

      {/* ENCABEZADO DE SECCIÓN */}
      <div className={styles.header}>

        <motion.h2
          className={styles.titulo}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className={styles.tituloBlanco}>SUS</span>
          <span className={styles.tituloGold}>ÁLBUMES</span>
        </motion.h2>
        <motion.p
          className={styles.subtitulo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Explora la trayectoria musical de Jory!
        </motion.p>
      </div>

      {/* GRID DE ÁLBUMES */}
      <div className={styles.grid}>
        {ALBUMS.map((album, i) => (
          <motion.div
            key={album.id}
            className={styles.card}
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={() => setAlbumSeleccionado(album)}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            {/* Portada placeholder */}
            <div className={styles.cardCover}>
              <div className={styles.cardCoverPlaceholder}>
                <img src={album.cover} alt={album.titulo} className={styles.cardImg} />
              </div>
              <div className={styles.cardOverlay}>
                <span className={styles.cardVerBtn}>Ver álbum →</span>
              </div>
            </div>

            {/* Info del álbum */}
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitulo}>{album.titulo}</h3>
              <div className={styles.cardMeta}>
                <span className={styles.cardAño}>{album.año}</span>
                <span className={styles.cardDot}>·</span>
                <span className={styles.cardCanciones}>{album.canciones.length} canciones</span>
                <span className={styles.cardDot}>·</span>
                <span className={styles.cardDuracion}>{album.duracion}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {albumSeleccionado && (
          <AlbumModal
            album={albumSeleccionado}
            onClose={() => setAlbumSeleccionado(null)}
          />
        )}
      </AnimatePresence>

    </section>
  )
}

export default Albums