import { useState } from 'react'

export default function About() {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <section className="about" id="about" aria-label="About Madhusa">
      <div className="wrap about-grid">
        <div className="about-portrait reveal">
          {!imgFailed && (
            <img
              src="/images/portait.png"
              alt="Portrait of makeup artist Madhusa Maharjan"
              onError={() => setImgFailed(true)}
            />
          )}
          {imgFailed && (
            <div className="ph"><span>💄</span><small>Add images/portait.png</small></div>
          )}
        </div>
        <div className="about-text reveal">
          <span className="eyebrow">The Artist</span>
          <h2>Beauty, done with care and intention.</h2>
          <p>Creative and dedicated, I trained at Bliss Academy of Aesthetics &amp; Cosmetology with a professional diploma in makeup artistry. My work is grounded in strong beauty technique, attentive client care, and clean, flawless application.</p>
          <p>A quick learner with a friendly approach, I adapt to each client's features and wishes — from soft natural looks to bold artistic statements. I've worked freelance across family celebrations, company events and social functions, and I'm passionate about helping people feel their most confident.</p>
          <div className="about-stats">
            <div className="stat"><b>Bliss</b><small>Academy Trained</small></div>
            <div className="stat"><b>4+</b><small>Signature Services</small></div>
            <div className="stat"><b>100%</b><small>Personalised Looks</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
