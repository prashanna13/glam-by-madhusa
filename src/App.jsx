import useReveal from './useReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Marquee from './components/Marquee'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Services />
        <Marquee />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
