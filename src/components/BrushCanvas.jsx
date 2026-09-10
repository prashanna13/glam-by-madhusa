import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// 3D makeup brush fixed on the right that rotates and travels down the page as you scroll.
export default function BrushCanvas({ variant = 'page' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    cam.position.z = 8

    scene.add(new THREE.AmbientLight(0xf4e6d6, 0.9))
    const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 6, 5); scene.add(key)
    const rim = new THREE.DirectionalLight(0xc98a54, 0.8); rim.position.set(-5, -2, 3); scene.add(rim)

    const brush = new THREE.Group()

    const fallback = new THREE.Group()
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x5c4433, roughness: 0.35, metalness: 0.15 })
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.30, 4.4, 32), handleMat)
    handle.position.y = 1.5; fallback.add(handle)
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.30, 24, 24), handleMat)
    cap.position.y = -0.7; fallback.add(cap)

    const ferMat = new THREE.MeshStandardMaterial({ color: 0xc98a54, roughness: 0.2, metalness: 0.9 })
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.20, 0.9, 32), ferMat)
    ferrule.position.y = -0.95; fallback.add(ferrule)

    const briMat = new THREE.MeshStandardMaterial({ color: 0xb06a45, roughness: 0.85, metalness: 0 })
    const bristles = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.62), briMat
    )
    bristles.scale.set(1, 1.7, 1); bristles.position.y = -1.9; bristles.rotation.x = Math.PI; fallback.add(bristles)
    brush.add(fallback)

    const loader = new GLTFLoader()
    loader.load(
      '/images/Meshy_AI_Makeup_Brush_0907165611_texture.glb',
      (gltf) => {
        const model = gltf.scene
        model.scale.set(1.7, 1.7, 1.7)
        model.rotation.set(0, Math.PI * 0.55, 0.15)
        model.position.y = -0.1
        brush.add(model)
        brush.remove(fallback)
      },
      undefined,
      () => {
        brush.add(fallback)
      }
    )

    brush.rotation.z = 0.5; brush.position.y = 0.2
    scene.add(brush)

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix()
    }
    addEventListener('resize', resize); resize()

    let target = 0, cur = 0
    const onScroll = () => {
      if (variant === 'hero') {
        const max = document.body.scrollHeight - innerHeight
        target = max > 0 ? scrollY / max : 0
        return
      }

      const services = document.getElementById('services')
      if (!services) {
        const max = document.body.scrollHeight - innerHeight
        target = max > 0 ? scrollY / max : 0
        return
      }

      const start = services.offsetTop - innerHeight * 0.7
      const end = services.offsetTop + services.offsetHeight * 0.9
      const range = Math.max(end - start, 1)
      const value = (scrollY - start) / range
      target = Math.min(Math.max(value, 0), 1)
    }
    addEventListener('scroll', onScroll); onScroll()

    const startedAt = performance.now()
    let raf
    const loop = () => {
      const now = performance.now()
      const intro = reduce ? 1 : Math.min((now - startedAt) / 1200, 1)
      const introEase = 1 - Math.pow(1 - intro, 3)
      cur += (target - cur) * 0.06
      const idle = reduce ? 0 : Math.sin(now * 0.0018) * 0.08
      brush.rotation.y = cur * Math.PI * 3 + idle

      if (variant === 'hero') {
        brush.position.y = 0.9 - cur * 3.4 + (1 - introEase) * 1.4
        brush.position.x = -cur * 1.4 + (1 - introEase) * 0.8
        brush.rotation.z = 0.5 - cur * 0.9 + (1 - introEase) * 0.16
      } else {
        brush.position.y = 1.4 - cur * 4.5 + (1 - introEase) * 1.2
        brush.position.x = 1.2 - cur * 2.1 + (1 - introEase) * 0.6
        brush.rotation.z = 0.9 - cur * 0.8 + (1 - introEase) * 0.18
      }
      renderer.render(scene, cam)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('scroll', onScroll)
      renderer.dispose()
      scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
    }
  }, [])

  return <canvas className={`brush-canvas brush-canvas--${variant}`} ref={ref} aria-hidden="true" />
}
