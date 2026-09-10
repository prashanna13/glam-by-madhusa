import { useEffect, useRef, useState } from 'react'

const BRIDAL_IMAGES = [
  '/images/bridal/466596828_18020528315552601_7186049666487591357_n.jpg',
  '/images/bridal/466786754_18020528234552601_8877261093018146746_n.jpg',
  '/images/bridal/466993702_18020528060552601_5211093253762709693_n.jpg',
  '/images/bridal/604336313_18063729668552601_864606103394196070_n.jpg',
  '/images/bridal/604748910_18063729695552601_8306307211343200585_n.jpg',
]

const ARTISTIC_IMAGES = [
  '/images/Artistic/490182084_3017708521724824_220798085557623244_n.jpg',
  '/images/Artistic/490073688_3017696401726036_6985830852095820402_n.jpg',
]

const GALLERY = [
  { src: BRIDAL_IMAGES[0], cap: 'Bridal' },
  { src: ARTISTIC_IMAGES[0], cap: 'Artistic' },
  { src: '/images/3.jpg', cap: 'Mehendi' },
  { src: '/images/4.jpg', cap: 'Party Look' },
  { src: '/images/5.jpg', cap: 'Natural Glam' },
  { src: '/images/6.jpg', cap: 'Hairstyling' },
]

const POPUP_IMAGES = [
  ...BRIDAL_IMAGES,
  ...ARTISTIC_IMAGES,
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
]

function Tile({ src, cap, onOpen }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className="tile placeholder"><div className="cap">{cap}</div></div>
  }

  return (
    <button type="button" className="tile" onClick={() => onOpen(src, cap)} aria-label={`Open ${cap} photo`}>
      <img
        src={src}
        alt={`${cap} makeup by Madhusa Maharjan`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <div className="cap">{cap}</div>
    </button>
  )
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const startX = useRef(null)

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') setActiveIndex((prev) => (prev === 0 ? POPUP_IMAGES.length - 1 : prev - 1))
      if (event.key === 'ArrowRight') setActiveIndex((prev) => (prev === POPUP_IMAGES.length - 1 ? 0 : prev + 1))
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  const openAt = (src) => {
    const index = POPUP_IMAGES.indexOf(src)
    setActiveIndex(index >= 0 ? index : 0)
  }

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? POPUP_IMAGES.length - 1 : prev - 1))
  const handleNext = () => setActiveIndex((prev) => (prev === POPUP_IMAGES.length - 1 ? 0 : prev + 1))

  const onTouchStart = (event) => {
    startX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (startX.current === null) return
    const diff = event.changedTouches[0].clientX - startX.current
    if (diff > 40) handlePrev()
    if (diff < -40) handleNext()
    startX.current = null
  }

  return (
    <>
      <section className="gallery" id="gallery" aria-label="Portfolio gallery">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Selected Work</span>
            <h2>Portfolio</h2>
            <p>A glimpse of recent looks. To feature your own photos, drop them into <code>public/images/</code> and edit the list in <code>src/components/Gallery.jsx</code>.</p>
          </div>
          <div className="masonry">
            {GALLERY.map((g) => <Tile key={g.src} {...g} onOpen={openAt} />)}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <div className="gallery-modal" onClick={() => setActiveIndex(null)} role="dialog" aria-modal="true">
          <div className="gallery-modal__card" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button type="button" className="gallery-modal__close" onClick={() => setActiveIndex(null)} aria-label="Close gallery">×</button>
            <button type="button" className="gallery-modal__nav gallery-modal__nav--prev" onClick={handlePrev} aria-label="Previous image">‹</button>
            <img src={POPUP_IMAGES[activeIndex]} alt="Portfolio look preview" />
            <button type="button" className="gallery-modal__nav gallery-modal__nav--next" onClick={handleNext} aria-label="Next image">›</button>
            <div className="gallery-modal__caption">{GALLERY.find((item) => item.src === POPUP_IMAGES[activeIndex])?.cap || 'Gallery'} {activeIndex + 1} / {POPUP_IMAGES.length}</div>
          </div>
        </div>
      )}
    </>
  )
}
