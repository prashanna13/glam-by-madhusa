import BrushCanvas from './BrushCanvas'

const SERVICES = [
  { ic: '👰', title: 'Bridal Makeup', desc: 'Timeless, long-wear bridal looks designed around your outfit, features and the length of your day.' },
  { ic: '🎨', title: 'Artistic Makeup', desc: 'Editorial, themed and creative looks for shoots, events and moments that call for something bold.' },
  { ic: '🌿', title: 'Mehendi', desc: 'Elegant henna designs for brides and celebrations, from delicate motifs to full intricate patterns.' },
  { ic: '💇‍♀️', title: 'Hairstyling', desc: 'Complementary hairstyling to complete your look — updos, soft curls and occasion-ready finishes.' },
]

export default function Services() {
  return (
    <section id="services" aria-label="Services">
      <BrushCanvas variant="services" />
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">What I Offer</span>
          <h2>Services</h2>
          <p>Every look is tailored to the person and the occasion, using professional, skin-friendly products.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div className="card reveal" key={s.title}>
              <span className="ic">{s.ic}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
