'use client'

import { useEffect, useRef, useState } from 'react'
import img1 from '../../../../assets/images/restaurantt.jpg'
import img2 from '../../../../assets/images/restaurantt2.jpg'

const slides = [img1.src, img2.src]

export default function RestaurantHero() {
  const colorRef = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  // page load — მწვანე ქრება + zoom იწყება
  useEffect(() => {
    const t1 = setTimeout(() => {
      colorRef.current?.classList.add('opacity-0')
      setZoomed(true)
    }, 300)
    return () => clearTimeout(t1)
  }, [])

  // ავტომატური გადასვლა ყოველ 5 წამში
  useEffect(() => {
    const t = setInterval(() => {
      setCur((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => setCur((c) => (c + dir + slides.length) % slides.length)

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === cur ? 1 : 0,
            transform: i === cur ? (zoomed ? 'scale(1)' : 'scale(1.2)') : 'scale(1.2)',
            transition: 'opacity 0.7s ease, transform 8s ease',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div
        ref={colorRef}
        className="absolute inset-0 transition-opacity duration-1000 z-10 bg-green-primary"
      />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className="text-beige-primary tracking-[0.12em] select-none font-kirovi text-8xl">
          რესტორნის სახელი
        </span>
      </div>

      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-beige-primary text-xl px-4 py-3 opacity-70 hover:opacity-100"
      >
        ←
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-beige-primary text-xl px-4 py-3 opacity-70 hover:opacity-100"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            className={`w-1.5 h-1.5 rounded-full bg-beige-primary transition-opacity ${i === cur ? 'opacity-100' : 'opacity-30'}`}
          />
        ))}
      </div>
    </section>
  )
}
