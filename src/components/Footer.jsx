export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a href="#top" className="brand">Glam by <b>Madhusa</b></a>
            <p>Professional makeup artistry in Kathmandu bridal, artistic, mehendi &amp; hairstyling.</p>
          </div>
          <nav className="foot-links" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#gallery">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Madhusa Maharjan. All rights reserved.</span>
          <a className="ig-btn" href="https://www.instagram.com/glamby_madhusa/" target="_blank" rel="noopener">◎ @glamby_madhusa</a>
        </div>
      </div>
    </footer>
  )
}
