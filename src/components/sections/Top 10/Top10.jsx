/* ============================================
   JORY BOY FAN PAGE — TOP 10 CANCIONES
   Top10.jsx
   ============================================ */

import { motion } from 'framer-motion'
import { SiSpotify, SiYoutube } from 'react-icons/si'
import { TOP10_CANCIONES } from '../../../constants/index'
import styles from './Top10.module.css'

function CancionCard({ cancion, destacada, index }) {
    return (
        <motion.div
            className={`${styles.card} ${destacada ? styles.cardDestacada : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: 'easeOut' }}
        >
            <div className={styles.cardMain}>

                <div className={styles.cover}>
                    {cancion.cover ? (
                        <img src={cancion.cover} alt={cancion.titulo} className={styles.coverImg} />
                    ) : (
                        <div className={styles.coverPlaceholder}>
                            <span className={styles.coverNota}>♪</span>
                        </div>
                    )}
                </div>

                <div className={styles.rankBand}>

                    <span className={styles.rankNumber}>#{cancion.posicion}</span>
                </div>

                <div className={styles.info}>
                    <h3 className={styles.tituloCancion}>{cancion.titulo}</h3>
                    <span className={styles.fecha}>{cancion.fecha}</span>
                    <p className={styles.descripcion}>{cancion.descripcion}</p>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.streaming}>
                    <a
                        href={cancion.streaming.spotify.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.streamItem}
                    >
                        <SiSpotify className={styles.streamIcon} style={{ color: '#1DB954' }} />
                        <span className={styles.streamNombre}>Spotify</span>
                        <span className={styles.streamStat}>
                            {cancion.streaming.spotify.valor}
                        </span>
                    </a>

                    <a
                        href={cancion.streaming.youtube.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.streamItem}
                    >
                        <SiYoutube className={styles.streamIcon} style={{ color: '#FF0000' }} />
                        <span className={styles.streamNombre}>YouTube</span>
                        <span className={styles.streamStat}>
                            {cancion.streaming.youtube.valor}
                        </span>
                    </a>
                </div>
            </div>
        </motion.div>
    )
}

function Top10() {
    const destacadas = TOP10_CANCIONES.slice(0, 3)
    const compactas = TOP10_CANCIONES.slice(3)

    return (
        <section className={styles.top10} id="top10">

            <div className={styles.header}>

                <motion.h2
                    className={styles.titulo}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <span className={styles.tituloBlanco}>TOP 10</span>
                    <span className={styles.tituloGold}>CANCIONES</span>
                </motion.h2>

                <motion.p
                    className={styles.subtitulo}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    Descubre las tendencias de jory del momento.
                </motion.p>
            </div>

            <div className={styles.listaDestacadas}>
                {destacadas.map((cancion, i) => (
                    <CancionCard key={cancion.id} cancion={cancion} destacada index={i} />
                ))}
            </div>

            <div className={styles.listaCompacta}>
                {compactas.map((cancion, i) => (
                    <CancionCard key={cancion.id} cancion={cancion} destacada={false} index={i} />
                ))}
            </div>

        </section>
    )
}

export default Top10