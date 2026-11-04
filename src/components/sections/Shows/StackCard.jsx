/* ============================================
   JORY BOY FAN PAGE — TARJETA DE LA PILA
   components/sections/Shows/StackCard.jsx

   El video del frente se reproduce con sonido y trae un
   botón para silenciarlo. El play/pause se controla a mano
   con ref (el atributo autoPlay solo funciona al montar).
   ============================================ */

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6'
import styles from './Shows.module.css'

function StackCard({
  medio,
  posicion,
  esFrente,
  animarSalida,
  lado,
  alt,
  zIndex,
  activo,             // true cuando la sección está a la vista
  silenciado,         // estado compartido por todos los videos
  onCambiarSilencio,  // el usuario toca el botón
  onSonidoBloqueado,  // el navegador no dejó reproducir con sonido
}) {
  const videoRef = useRef(null)
  const silenciadoRef = useRef(silenciado)
  const esVideo = medio.tipo === 'video'

  /* Mantiene el video sincronizado con el estado "silenciado" */
  useEffect(() => {
    silenciadoRef.current = silenciado
    if (videoRef.current) videoRef.current.muted = silenciado
  }, [silenciado])

  /* Al llegar al frente, el video arranca desde el inicio */
  useEffect(() => {
    if (esVideo && esFrente && videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [esVideo, esFrente])

  /* Reproduce solo si es el del frente Y la sección está a la vista;
     si no, lo pausa (así el audio no sigue sonando mientras lees otra parte) */
  useEffect(() => {
    const video = videoRef.current
    if (!esVideo || !video) return

    if (!(esFrente && activo)) {
      video.pause()
      return
    }

    video.muted = silenciadoRef.current
    const intento = video.play()

    if (intento !== undefined) {
      intento.catch((error) => {
        /* Cualquier otro error (ej. se pausó mientras cargaba) se ignora */
        if (error?.name !== 'NotAllowedError') return

        /* El navegador bloquea el audio automático hasta que el usuario
           interactúa con la página: arrancamos sin sonido y avisamos. */
        video.muted = true
        onSonidoBloqueado?.()
        video.play().catch(() => {})
      })
    }
  }, [esVideo, esFrente, activo, onSonidoBloqueado])

  /* Se hace dentro del clic para que el navegador permita el sonido */
  const alternarSilencio = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    const nuevo = !silenciado

    if (video) {
      video.muted = nuevo
      if (!nuevo) video.play().catch(() => {})
    }
    onCambiarSilencio(nuevo)
  }

  return (
    <motion.div
      className={styles.stackCard}
      style={{ zIndex }}
      initial={false}
      animate={
        animarSalida
          ? { x: lado * 380, rotate: lado * 18, opacity: 0, scale: 1 }
          : {
              x: 0,
              rotate: 0,
              scale: 1 - posicion * 0.05,
              y: posicion * 14,
              opacity: posicion === 2 ? 0.5 : 1,
            }
      }
      transition={{ duration: 0.5, ease: animarSalida ? 'easeIn' : 'easeOut' }}
    >
      {esVideo ? (
        <video
          ref={videoRef}
          src={medio.src}
          className={styles.stackMedia}
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img src={medio.src} alt={alt} className={styles.stackMedia} />
      )}

      {/* Botón de sonido: solo en el video que está al frente */}
      {esVideo && esFrente && (
        <button
          type="button"
          className={styles.stackSonido}
          onClick={alternarSilencio}
          aria-label={silenciado ? 'Activar sonido' : 'Silenciar video'}
        >
          {silenciado ? <FaVolumeXmark /> : <FaVolumeHigh />}
          {silenciado && <span>Activar sonido</span>}
        </button>
      )}
    </motion.div>
  )
}

export default StackCard