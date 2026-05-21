'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import HeroImg from '../../../../assets/images/hero1.png'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import FloatingCallButton from '../../../components/common/FloatingCallButoon.tsx'
import AppButton from '../../../components/ui/AppButton'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 0,
      image: HeroImg,
      subtitle: 'ეკოლოგიური პროექტი',
      title: 'ფიჭვები',
      highlight: 'მანგლისი',
      description:
        'ფიჭვების პროექტი მიზნად ისახავს, კურორტ მანგლისში, ინოვაციური არქიტექტურისა და ტრადიციების შერწყმით ახალი მულტიფუნქციური საცხოვრებელი სივრცის შექმნას.',
    },
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop',
      subtitle: 'ინოვაციური მშენებლობა',
      title: 'ბუნებასთან',
      highlight: 'ერთად',
      description:
        'აღმოაჩინეთ თანამედროვე არქიტექტურა, რომელიც იდეალურად ერწყმის მანგლისის უნიკალურ ბუნებას.',
    },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // Automatic Slide Logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(timer)
  }, [currentSlide])

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
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
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
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[2px] bg-white" />
                  <span className="text-white font-bold uppercase -beige-primary tracking-[0.3em] text-sm">
                    {slides[currentSlide].subtitle}
                  </span>
                </div>

                <h1 className="text-white text-6xl md:text-8xl font-black leading-tight font-kirovi mb-8">
                  {slides[currentSlide].title} <br />
                  <span className="text-white italic font-light">
                    {slides[currentSlide].highlight}
                  </span>
                </h1>

                <p className="text-white text-lg md:text-xl max-w-xl leading-relaxed font-mtavruli opacity-90">
                  {slides[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-6 pt-10 font-kirovi">
                  {/* <button className="group relative bg-green-primary text-white   px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:bg-white hover:text-green-primary">
                    <span className="relative z-10 flex items-center gap-2">
                      გაიგე მეტი{" "}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="group flex items-center gap-4 text-white px-8 py-5 rounded-2xl text-lg font-bold border-2 border-white/70 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    ვრცლად
                  </button> */}
                  <AppButton variant="arrowButton" showArrow={true}>
                    გაიგე მეტი
                  </AppButton>
                  <AppButton variant="outline">ვრცლად</AppButton>
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
