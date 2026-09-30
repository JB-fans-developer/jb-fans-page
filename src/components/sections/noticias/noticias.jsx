/* ============================================
   JORY BOY FAN PAGE — NOTICIAS
   Noticias.jsx
   ============================================ */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa6'
import { SiInstagram } from 'react-icons/si'
import { ULTIMO_SENCILLO, ULTIMO_VIDEO, FAN_DEL_MES, UN_DIA_COMO_HOY } from '../../../constants/index'
import styles from './Noticias.module.css'

/* ── Widget "Escúchalo ahora" — embed de Spotify ── */
function EscuchaAhora() {
  return (
    <motion.div
      className={styles.embedCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className={styles.embedLabel}>Escucha lo nuevo!</span>
      <p className={styles.embedTitulo}>{ULTIMO_SENCILLO.titulo}</p>

      <iframe
        className={styles.embedIframe}
        src={`https://open.spotify.com/embed/track/${ULTIMO_SENCILLO.id}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Reproductor de Spotify — ${ULTIMO_SENCILLO.titulo}`}
      />
    </motion.div>
  )
}

/* ── Widget "Míralo ahora" — facade de YouTube ──
   La miniatura real se pide a img.youtube.com (pública, sin API key).
   El iframe pesado de YouTube solo se monta cuando el usuario hace clic. */
function MiraAhora() {
  const [reproduciendo, setReproduciendo] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${ULTIMO_VIDEO.id}/hqdefault.jpg`

  return (
    <motion.div
      className={styles.embedCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
    >
      <span className={styles.embedLabel}>Míra el último video!</span>
      <p className={styles.embedTitulo}>{ULTIMO_VIDEO.titulo}</p>

      <div className={styles.videoFacade}>
        {reproduciendo ? (
          <iframe
            className={styles.videoIframe}
            src={`https://www.youtube.com/embed/${ULTIMO_VIDEO.id}?autoplay=1`}
            title={`Video de YouTube — ${ULTIMO_VIDEO.titulo}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.videoBoton}
            onClick={() => setReproduciendo(true)}
            aria-label={`Reproducir video: ${ULTIMO_VIDEO.titulo}`}
          >
            <img
              src={thumbnailUrl}
              alt={ULTIMO_VIDEO.titulo}
              className={styles.videoThumb}
              loading="lazy"
            />
            <span className={styles.playOverlay}>
              <span className={styles.playIcono}>
                <FaPlay />
              </span>
            </span>
            <span className={styles.nuevoTag}>Nuevo</span>
            {ULTIMO_VIDEO.duracion && (
              <span className={styles.duracionBadge}>{ULTIMO_VIDEO.duracion}</span>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}

/* ── "Fan del mes" — marco con halo dorado + label flotante ── */
function FanDelMes() {
  const { nombre, edad, ciudad, pais, imagen, texto, instagram } = FAN_DEL_MES

  return (
    <div className={styles.fanSection}>
      <h3 className={styles.fanTitulo}>Fan del Mes</h3>

      <motion.div
        className={styles.fanCard}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.fanImagenWrap}>
          <div className={styles.fanHalo} />

          {imagen ? (
            <img
              src={imagen}
              alt={nombre}
              className={styles.fanImagen}
            />
          ) : (
            <div className={styles.fanImagenPlaceholder}>
              <span className={styles.fanInicial}>
                {nombre.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Label flotante — se superpone sobre el borde DERECHO de la foto */}
        <div className={styles.fanInfo}>
          <div className={styles.fanNombreFila}>
            <h3 className={styles.fanNombre}>{nombre}</h3>

            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fanInstagram}
                aria-label={`Instagram de ${nombre}`}
              >
                <SiInstagram />
                <span className={styles.fanInstagramTexto}>Ver perfil</span>
              </a>
            )}
          </div>

          <div className={styles.fanMeta}>
            <span>{edad} años</span>
            <span className={styles.fanMetaDot}>•</span>
            <span>
              {ciudad}, {pais}
            </span>
          </div>

          <p className={styles.fanTexto}>{texto}</p>
        </div>
      </motion.div>
    </div>
  )
}


/* ── "Un Día Como Hoy" — solo aparece si hay coincidencia
   con la fecha actual. Si no hay ninguna, retorna null:
   no deja tarjeta vacía ni espacio en blanco. ── */
function UnDiaComoHoy() {
  const hoy = new Date()
  const mesHoy = hoy.getMonth() + 1
  const diaHoy = hoy.getDate()

  const coincidencias = UN_DIA_COMO_HOY.filter(
    (item) => item.mes === mesHoy && item.dia === diaHoy
  )

  if (coincidencias.length === 0) return null

  // Si hay más de un hito guardado para el mismo día (distintos años),
  // se elige uno al azar cada vez que carga la página.
  const evento = coincidencias[Math.floor(Math.random() * coincidencias.length)]

  return (
    <motion.div
      className={styles.diaCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className={styles.diaLabel}>Un Día Como Hoy</span>
      <div className={styles.diaContenido}>
        <span className={styles.diaAnio}>{evento.anio}</span>
        <p className={styles.diaTexto}>{evento.texto}</p>
      </div>
    </motion.div>
  )
}
function Noticias() {
  return (
    <section className={styles.noticias} id="noticias">

      {/* ══════════════════════════════════
          ENCABEZADO
      ══════════════════════════════════ */}
      <div className={styles.header}>

        <motion.h2
          className={styles.titulo}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className={styles.tituloBlanco}>NOTICIAS</span>
          <span className={styles.tituloGold}>Destacadas</span>
        </motion.h2>

      </div>
      <UnDiaComoHoy />
      {/* ══════════════════════════════════
          CONTENIDO — 2 columnas (audio + video)
      ══════════════════════════════════ */}
      <div className={styles.contenido}>
        <EscuchaAhora />
        <MiraAhora />
        <FanDelMes />
      </div>

    </section>
  )
}

export default Noticias