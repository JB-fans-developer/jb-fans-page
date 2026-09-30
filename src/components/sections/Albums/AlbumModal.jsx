/* ============================================
   JORY BOY FAN PAGE — ALBUM MODAL
   AlbumModal.jsx
   ============================================ */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiSpotify, SiYoutube, SiApplemusic, SiDeezer, SiTidal } from 'react-icons/si'
import { FaAmazon } from 'react-icons/fa6'
import styles from './AlbumModal.module.css'



const PLATAFORMAS = [
  { nombre: 'Spotify', color: '#1DB954', key: 'spotify', icon: SiSpotify },
  { nombre: 'YouTube', color: '#FF0000', key: 'youtube', icon: SiYoutube },
  { nombre: 'Apple Music', color: '#FC3C44', key: 'apple', icon: SiApplemusic },
  { nombre: 'Deezer', color: '#A238FF', key: 'deezer', icon: SiDeezer },
  { nombre: 'Tidal', color: '#00FFFF', key: 'tidal', icon: SiTidal },
  { nombre: 'Amazon Music', color: '#00A8E1', key: 'amazon', icon: FaAmazon },
]

function AlbumModal({ album, onClose }) {
  const [cancionActiva, setCancionActiva] = useState(album.canciones[0])

  /* Cerrar con ESC */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  /* Reset canción activa al cambiar álbum */
  useEffect(() => {
    setCancionActiva(album.canciones[0])
  }, [album])

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* BOTÓN CERRAR */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>

        {/* ENCABEZADO DEL MODAL */}
        <div className={styles.modalHeader}>
          {/* Portada grande */}
          <div className={styles.coverGrande}>
            <div className={styles.coverPlaceholder}>
              <img src={album.cover} alt={album.titulo} className={styles.cardImg} />
            </div>
          </div>

          {/* Info del álbum */}
          <div className={styles.albumInfo}>
            <h2 className={styles.albumTitulo}>{album.titulo}</h2>
            <div className={styles.albumMeta}>
              <span>📅 {album.año}</span>
              <span>🎵 {album.canciones.length} canciones</span>
              <span>⏱ {album.duracion}</span>
            </div>

            {/* PLATAFORMAS DE STREAMING */}
            <div className={styles.streamingSection}>
              <p className={styles.streamingLabel}>Escuchar álbum</p>
              <div className={styles.streamingGrid}>
                {PLATAFORMAS.map((plat) => (
                  <a
                    key={plat.key}
                    href={album.streaming[plat.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.streamingBtn}
                    style={{ '--plat-color': plat.color }}
                  >
                    <plat.icon className={styles.streamingIcon} style={{ color: plat.color }} />
                    <span className={styles.streamingNombre}>{plat.nombre}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL — DOS COLUMNAS */}
        <div className={styles.modalContent}>

          {/* COLUMNA IZQUIERDA — Lista de canciones (con acordeón en móvil) */}
          <div className={styles.listaCol}>
            <h3 className={styles.colTitulo}>Canciones</h3>
            <ul className={styles.lista}>
              {album.canciones.map((cancion, i) => {
                const activa = cancionActiva?.id === cancion.id
                return (
                  <li key={cancion.id} className={styles.listaItemWrap}>
                    <div
                      className={`${styles.listaItem} ${activa ? styles.listaItemActivo : ''}`}
                      onClick={() => setCancionActiva(activa ? null : cancion)}
                    >
                      <span className={styles.listaNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.listaTitulo}>{cancion.titulo}</span>
                      {activa && <span className={styles.listaIndicador}>♪</span>}
                    </div>

                    {/* Acordeón — solo se ve en móvil (oculto en desktop vía CSS) */}
                    <AnimatePresence initial={false}>
                      {activa && (
                        <motion.div
                          className={styles.acordeon}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className={styles.acordeonContenido}>
                            <span className={styles.acordeonLabel}>¿Qué nos transmite esta composición?</span>
                            <div className={styles.cancionDivider} />
                            <p className={styles.acordeonTexto}>{cancion.descripcion}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* COLUMNA DERECHA — Info de canción seleccionada */}
          <div className={styles.infoCol}>
            <h3 className={styles.colTitulo}>¿Qué nos transmite esta composición?</h3>
            {cancionActiva ? (
              <motion.div
                key={cancionActiva.id}
                className={styles.cancionInfo}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className={styles.cancionTitulo}>{cancionActiva.titulo}</h4>
                <div className={styles.cancionDivider} />
                <p className={styles.cancionDescripcion}>{cancionActiva.descripcion}</p>
              </motion.div>
            ) : (
              <p className={styles.cancionPlaceholder}>
                Selecciona una canción para ver su descripción
              </p>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

export default AlbumModal