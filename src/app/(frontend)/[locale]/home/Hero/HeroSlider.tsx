'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import FloatingCallButton from '../../../components/common/FloatingCallButoon.tsx'
import AppButton from '../../../components/ui/AppButton'

type Slide = {
  id: string
  title: string
  highlight: string
  description: string
  image: {
    url: string
    alt?: string
  }
  primaryButtonText?: string
  secondaryButtonText?: string
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (slides.length === 0) return

    const timer = setInterval(nextSlide, 6000)

    return () => clearInterval(timer)
  }, [currentSlide, slides.length])

  if (slides.length === 0) {
    return <section className="relative w-full h-[90vh] bg-[#161616]" />
  }

  const current = slides[currentSlide]

  const imageUrl = current.image.url
  console.log(current.image.url)

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-[#161616]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={imageUrl}
            alt={current.image.alt ?? current.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-white text-6xl md:text-8xl font-black leading-tight font-kirovi mb-8">
                  {current.title}
                  <br />
                  <span className="text-white italic font-light">{current.highlight}</span>
                </h1>

                <p className="text-white text-lg md:text-xl max-w-xl leading-relaxed font-mtavruli opacity-90">
                  {current.description}
                </p>

                <div className="flex flex-wrap gap-6 pt-10 font-kirovi">
                  <AppButton variant="arrowButton" showArrow>
                    {current.primaryButtonText || 'გაიგე მეტი'}
                  </AppButton>

                  <AppButton variant="outline">{current.secondaryButtonText || 'ვრცლად'}</AppButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 flex flex-col items-end gap-6 mb-10 lg:mb-0">
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white font-bold text-lg">0{currentSlide + 1}</span>

              <div className="w-32 h-[2px] bg-white/20 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-green-primary"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((currentSlide + 1) / slides.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <span className="text-white/40 font-bold text-lg">0{slides.length}</span>
            </div>
          </div>
        </div>
      </div>

      <FloatingCallButton />
    </section>
  )
}
