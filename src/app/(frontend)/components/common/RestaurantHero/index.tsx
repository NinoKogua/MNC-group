'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import img1 from '../../../../assets/images/restaurant_imgs/restaurantt.jpg'
import img2 from '../../../../assets/images/restaurant_imgs/restaurant_page-0006.jpg'
import img3 from '../../../../assets/images/restaurant_imgs/restaurant_page-0007.jpg'
import img4 from '../../../../assets/images/restaurant_imgs/restaurant_page-0004.jpg'
import img5 from '../../../../assets/images/restaurant_imgs/restaurant_page-0005.jpg'
import logoKa from '../../../../assets/images/restaurant_imgs/rest_logo_ka.svg'
import logoEn from '../../../../assets/images/restaurant_imgs/rest_logo_en.svg'

const slides = [img1.src, img2.src, img3.src, img4.src, img5.src]

type Props = {
  locale: 'en' | 'ka'
}

export default function RestaurantHero({ locale }: Props) {
  const logo = locale === 'ka' ? logoKa : logoEn
  const colorRef = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const touchStartX = useRef<number>(0)

  useEffect(() => {
    const t1 = setTimeout(() => {
      colorRef.current?.classList.add('opacity-0')
      setZoomed(true)
    }, 300)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setCur((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => setCur((c) => (c + dir + slides.length) % slides.length)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
  }

  return (
    <section
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === cur ? 1 : 0,
            transform: i === cur ? (zoomed ? 'scale(1)' : 'scale(1.2)') : 'scale(1.2)',
            transition: 'opacity 0.7s ease, transform 8s ease',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/30" />

      <div
        ref={colorRef}
        className="absolute inset-0 transition-opacity duration-1000 z-10 bg-green-primary"
      />

      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <Image
          src={logo}
          alt="Restaurant logo"
          className="w-[45%] sm:w-[35%] md:w-[28%] lg:w-[20%] select-none brightness-0 invert sepia saturate-[0.2]"
          priority
        />
      </div>

      {/* ისრები — მხოლოდ md+ ზე */}
      <button
        onClick={() => go(-1)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 text-beige-primary opacity-70 hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={36} />
      </button>
      <button
        onClick={() => go(1)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 text-beige-primary opacity-70 hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={36} />
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
