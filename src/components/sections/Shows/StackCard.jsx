/* ============================================
   JORY BOY FAN PAGE — TARJETA DE LA PILA
   components/sections/Shows/StackCard.jsx

   Controla el video "a mano" con play()/pause()
   vía ref — el atributo autoPlay de React solo
   funciona al insertar el elemento por primera vez,
   no cada vez que vuelve a ser el del frente.
   ============================================ */

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Shows.module.css'

function StackCard({ medio, posicion, esFrente, animarSalida, lado, alt, onClick, zIndex, onAnimationComplete }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (medio.tipo !== 'video' || !videoRef.current) return
    if (esFrente) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [esFrente, medio.tipo])

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
      onAnimationComplete={animarSalida ? onAnimationComplete : undefined}
      onClick={onClick}
    >
      {medio.tipo === 'video' ? (
        <video
          ref={videoRef}
          src={medio.src}
          className={styles.stackMedia}
          muted
          loop
          playsInline
        />
      ) : (
        <img src={medio.src} alt={alt} className={styles.stackMedia} />
      )}
    </motion.div>
  )
}

export default StackCard