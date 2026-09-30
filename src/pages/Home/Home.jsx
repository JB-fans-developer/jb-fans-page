import Navbar  from '../../components/layout/Navbar/Navbar'
import Footer  from '../../components/layout/Footer/Footer'
import Hero    from '../../components/sections/Hero/Hero'
import Albums  from '../../components/sections/Albums/Albums'
import Top10 from '../../components//sections/Top 10/Top10'
import styles  from './Home.module.css'

function Home() {
  return (
    <main className={styles.home}>
      <Navbar />
      <Hero />
      <Albums />
      <Top10/>
      <Footer />
    </main>
  )
}

export default Home