export default function Marquee() {
  const items = ['Bridal Makeup', 'Artistic Makeup', 'Mehendi', 'Hairstyling', 'Party Looks']
  return (
    <div className="strip" aria-hidden="true">
      <div className="track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  )
}
