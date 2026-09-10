import BrushCanvas from './BrushCanvas'

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <BrushCanvas variant="hero" />
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="wrap hero-content">
        <span className="eyebrow">Kathmandu, Nepal</span>
        <h1><span>Glam By</span><span>Madhusa</span></h1>
        <div className="role">Makeup Artist</div>
        <p className="lead">Enhancing natural beauty with clean, flawless application bridal, artistic and everyday looks crafted for your moment.</p>
        <div className="hero-actions">
          <a href="#gallery" className="btn btn-primary">View Portfolio</a>
          <a href="#contact" className="btn btn-ghost">Book a Session</a>
        </div>
      </div>
    </section>
  )
}
