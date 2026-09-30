/* ============================================
   JORY BOY FAN PAGE — FOOTER
   Footer.jsx
   ============================================ */

import { Link } from 'react-router-dom'
import { SiSpotify, SiYoutube, SiApplemusic, SiDeezer, SiTidal, SiInstagram, SiTiktok, SiFacebook } from 'react-icons/si'
import { FaAmazon, FaXTwitter } from 'react-icons/fa6'
import styles from './Footer.module.css'

/* Navegación interna — mismas rutas que el Navbar */
const FOOTER_LINKS = [
  { label: 'Inicio', path: '/' },
  { label: 'Su Historia', path: '/historia' },
  { label: 'Galería', path: '/galeria' },
]

/* Plataformas de streaming — reemplaza los "#" por los links reales del artista */
const FOOTER_STREAMING = [
  { nombre: 'Spotify',      icon: SiSpotify,    color: '#1DB954', url: 'https://open.spotify.com/intl-es/artist/5lFhCi03HDneWzvCxGctrT' },
  { nombre: 'YouTube',      icon: SiYoutube,    color: '#FF0000', url: 'https://www.youtube.com/channel/UC-8k7L_8TtDhR-xPNHo9FXA' },
  { nombre: 'Apple Music',  icon: SiApplemusic, color: '#FC3C44', url: 'https://music.apple.com/es/artist/jory-boy/653649635' },
  { nombre: 'Deezer',       icon: SiDeezer,     color: '#A238FF', url: 'https://www.deezer.com/mx/artist/4808771' },
  { nombre: 'Tidal',        icon: SiTidal,      color: '#00FFFF', url: 'https://tidal.com/artist/4940659' },
  { nombre: 'Amazon Music', icon: FaAmazon,     color: '#00A8E1', url: 'https://music.amazon.com/es-co/artists/B00D01ICAG' },
]

/* Redes sociales — reemplaza los "#" por los perfiles reales */
const FOOTER_SOCIAL = [
  { nombre: 'Instagram', icon: SiInstagram, url: 'https://www.instagram.com/joryboyofficial/?hl=es' },
  { nombre: 'TikTok',    icon: SiTiktok,    url: 'https://www.tiktok.com/@joryboyofficial' },
]

function Footer() {
  const año = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>

        {/* ══════════════════════════════════
            BLOQUE SUPERIOR — Marca + columnas
        ══════════════════════════════════ */}
        <div className={styles.top}>

          {/* Marca / disclaimer de fan page */}
          <div className={styles.brandCol}>
            <span className={styles.brandLogo}>JORY BOY</span>
            <p className={styles.brandTexto}>
              Sitio creado para fanáticos, dedicado a la trayectoria,Noticias actuales y la música de Jory Boy.
            </p>
          </div>

          {/* Streaming */}
          <div className={styles.col}>
            <span className={styles.colTitulo}>Escúchalo en</span>
            <div className={styles.iconGrid}>
              {FOOTER_STREAMING.map((plat) => (
                <a
                  key={plat.nombre}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconBtn}
                  aria-label={plat.nombre}
                  style={{ '--icon-color': plat.color }}
                >
                  <plat.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Redes sociales */}
          <div className={styles.col}>
            <span className={styles.colTitulo}>Síguelo</span>
            <div className={styles.iconGrid}>
              {FOOTER_SOCIAL.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconBtn}
                  aria-label={red.nombre}
                >
                  <red.icon />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════
            DIVISOR
        ══════════════════════════════════ */}
        <div className={styles.divider} />

        {/* ══════════════════════════════════
            BLOQUE INFERIOR — Copyright
        ══════════════════════════════════ */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {año} Fan Page Jory Boy. Proyecto hecho para fans.
          </span>
          <span className={styles.creditos}>
            Diseñado con <span className={styles.corazon}>♥</span> para la Familia Jory Boy
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer