import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '')}>
      <a href="#top" className="brand">Glam by <b>Madhusa</b></a>
      <nav className={'links' + (open ? ' open' : '')}>
        <a href="#about" onClick={close}>About</a>
        <a href="#services" onClick={close}>Services</a>
        <a href="#gallery" onClick={close}>Portfolio</a>
        <a href="#contact" onClick={close}>Contact</a>
      </nav>
      <a href="#contact" className="nav-cta">Book Now</a>
      <button
        className={'burger' + (open ? ' open' : '')}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  )
}
