

import { motion } from 'framer-motion'
import { FaLock } from 'react-icons/fa6'
import styles from './Comunidad.module.css'
import joryComunidad from '../../../assets/images/comunidad/jory-comunidad.png'
import { useEffect, useState } from 'react'

const contenedor = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}

const subir = {
    oculto: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function Comunidad() {
    const [imagenLista, setImagenLista] = useState(false)

    useEffect(() => {
        const imagen = new Image()
        imagen.src = joryComunidad

        if (imagen.complete && imagen.naturalWidth > 0) {
            setImagenLista(true)
        } else {
            imagen.onload = () => setImagenLista(true)
        }

        return () => {
            imagen.onload = null
        }
    }, [])
    return (
        <section className={styles.comunidad} id="comunidad">
            {/* Fondo decorativo */}
            <span className={styles.marcaAgua} aria-hidden="true">JORY BOY</span>
            <div className={styles.luz} aria-hidden="true" />
            {/* FIGURA DE JORY */}
            <motion.div
                className={styles.joryFigura}
                aria-hidden="true"
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            >
                <img
                    src={joryComunidad}
                    alt=""
                    className={styles.joryImagen}
                    onLoad={() => setImagenLista(true)}
                />
                
            </motion.div>
            <motion.div
                className={styles.contenido}
                variants={contenedor}
                initial="oculto"
                animate="visible"
            >


                {/* CANDADO */}
                <motion.div className={styles.candado} variants={subir}>
                    <span className={styles.candadoAnillo} aria-hidden="true" />
                    <span className={styles.candadoHalo} aria-hidden="true" />
                    <FaLock className={styles.candadoIcono} aria-hidden="true" />
                </motion.div>

                {/* TÍTULO */}
                <motion.h2 className={styles.titulo} variants={subir}>
                    <span className={styles.tituloBlanco}>Muy pronto</span>
                    <span className={styles.tituloGold}>Sitio en desarrollo</span>
                </motion.h2>

                <motion.div className={styles.separador} variants={subir} aria-hidden="true">
                    <span className={styles.separadorRombo} />
                </motion.div>

                <motion.p className={styles.subtitulo} variants={subir}>
                    Una Comunidad. Muchas Historias
                </motion.p>

            </motion.div>
        </section>

    )
}

export default Comunidad