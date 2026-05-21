'use client'
import React, { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { motion, Variants, useMotionValue, useTransform, animate, useInView } from 'framer-motion'

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = React.useState(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })

    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
      })
      return () => {
        controls.stop()
        unsubscribe()
      }
    }

    return unsubscribe
  }, [isInView, count, value, rounded])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

export default function AboutHero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  }

  return (
    <section className="relative pt-16 pb-20 px-4 overflow-hidden bg-gradient-to-b from-[#B5CDC3] via-[#D1DFD9] to-[#F8F6F1]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <motion.div
            variants={cardVariants}
            className="col-span-12 md:col-span-6 bg-[#161616] rounded-[32px] p-10 flex flex-col justify-between min-h-[450px] text-white relative font-kirovi group overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <motion.span className="text-xs font-bold tracking-widest opacity-50 uppercase block">
                ფიჭვები - 2010
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-none">
                ჩვენ <br /> შესახებ
              </h1>
              <p className="text-gray-400 text-lg max-w-sm leading-relaxed font-mtavruli">
                ფიჭვები 2024 - ადგილი სადაც ისტორია და თანამედროვეობა ერწყმის ერთმანეტს. ბუნების
                წიაღში აღმოცენებული თანამედროვე არქიტექტურა და კომფორტი, თქვენი საკუთარი
                დასვენებისთვის.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 mt-12 border border-white/20 rounded-full flex items-center justify-center relative z-10"
            >
              <ArrowDown className="text-white" size={24} />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-green-primary/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"
            />
          </motion.div>

          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 font-kirovi">
            <motion.div
              variants={cardVariants}
              className="bg-green-primary rounded-[32px] p-8 flex flex-col justify-between text-white shadow-xl"
            >
              <span className="text-sm font-bold uppercase tracking-widest opacity-70">
                გამოცდილება
              </span>
              <div className="flex flex-col">
                <span className="text-6xl font-black leading-none">
                  <Counter value={15} suffix="+" />
                </span>
                <span className="text-xs font-bold uppercase mt-2 opacity-70">წელი ბაზარზე</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="relative rounded-[32px] overflow-hidden min-h-[180px] shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80"
                alt="Pool"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="relative rounded-[32px] overflow-hidden min-h-[180px] shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                alt="Architecture"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* მაცხოვრებელი */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-[32px] p-8 flex flex-col justify-between border border-gray-100 shadow-sm text-green-primary"
            >
              <span className="text-sm font-bold uppercase tracking-widest">მაცხოვრებელი</span>
              <div className="flex flex-col">
                <span className="text-6xl font-black leading-none">
                  <Counter value={200} suffix="+" />
                </span>
                <span className="text-xs font-bold uppercase mt-2">ბედნიერი ოჯახი</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
