/* ============================================
   JORY BOY FAN PAGE — PÁGINA SHOWS
   pages/Shows/Shows.page.jsx
   ============================================ */

import Navbar from '../../components/layout/Navbar/Navbar'
import Shows from '../../components/sections/Shows/Shows'
import UltimoShowDestacado from '../../components/sections/Shows/UltimoShowDestacado'
import Footer from '../../components/layout/Footer/Footer'

function ShowsPage() {
  return (
    <>
      <Navbar />
      <Shows />
      <UltimoShowDestacado />
      <Footer />
    </>
  )
}

export default ShowsPage