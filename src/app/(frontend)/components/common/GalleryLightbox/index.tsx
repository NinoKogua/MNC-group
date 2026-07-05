'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryImage = {
  url: string
  alt?: string
}

type Props = {
  images: GalleryImage[]
}

export default function GalleryLightbox({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setActiveIndex(null), [])

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length))
  }, [images.length])

  // ⌨️ keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden' // lock scroll behind modal

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex, closeLightbox, showPrev, showNext])

  if (!images || images.length === 0) return null

  return (
    <>
      {/* THUMBNAILS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg group cursor-zoom-in"
          >
            <Image
              src={img.url}
              alt={img.alt || `Photo ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* CLOSE */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* COUNTER */}
          <div className="absolute top-6 left-6 text-white/60 text-sm tracking-widest">
            {activeIndex + 1} / {images.length}
          </div>

          {/* PREV */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showPrev()
              }}
              className="absolute left-3 md:left-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* IMAGE */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt || `Photo ${activeIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* NEXT */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showNext()
              }}
              className="absolute right-3 md:right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>
          )}
        </div>
      )}
    </>
  )
}
