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

type HeroStat = {
  label: string
  value: number
  suffix?: string | null
  caption?: string | null
}

type Props = {
  badge?: string
  title?: string
  description?: string
  stats?: HeroStat[]
  images?: string[]
}

export default function AboutHero({ badge, title, description, stats, images }: Props) {
  const [firstStat, secondStat] = stats ?? []
  const [firstImage, secondImage] = images ?? []

  const hasContent =
    Boolean(badge || title || description) || Boolean(stats?.length) || Boolean(images?.length)

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

  if (!hasContent) return null

  return (
    <section className="relative pt-16 pb-20 px-4 overflow-hidden ">
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
            className="col-span-12 md:col-span-6 bg-[#161616] rounded-[20px] p-10 flex flex-col justify-between min-h-[450px] text-white relative font-kirovi group overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              {badge && (
                <motion.span className="text-xs font-bold tracking-widest opacity-50 uppercase block">
                  {badge}
                </motion.span>
              )}
              {title && (
                <h1 className="text-5xl md:text-7xl font-extrabold leading-none whitespace-pre-line">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-gray-400 text-lg max-w-sm leading-relaxed font-mtavruli">
                  {description}
                </p>
              )}
            </div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 mt-12 border border-white/20 rounded-[20px] flex items-center justify-center relative z-10"
            >
              <ArrowDown className="text-white" size={24} />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-green-primary/10 rounded-[20px] -mr-20 -mt-20 blur-3xl pointer-events-none"
            />
          </motion.div>

          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 font-kirovi">
            {firstStat && (
              <motion.div
                variants={cardVariants}
                className="bg-green-primary rounded-[20px] p-8 flex flex-col justify-between text-white shadow-xl"
              >
                <span className="text-sm font-bold uppercase tracking-widest opacity-70">
                  {firstStat.label}
                </span>
                <div className="flex flex-col">
                  <span className="text-6xl font-black leading-none">
                    <Counter value={firstStat.value} suffix={firstStat.suffix ?? ''} />
                  </span>
                  <span className="text-xs font-bold uppercase mt-2 opacity-70">
                    {firstStat.caption}
                  </span>
                </div>
              </motion.div>
            )}

            {firstImage && (
              <motion.div
                variants={cardVariants}
                className="relative rounded-[20px] overflow-hidden min-h-[180px] shadow-lg"
              >
                <Image src={firstImage} alt={title ?? ''} fill className="object-cover" />
              </motion.div>
            )}

            {secondImage && (
              <motion.div
                variants={cardVariants}
                className="relative rounded-[20px] overflow-hidden min-h-[180px] shadow-lg"
              >
                <Image src={secondImage} alt={title ?? ''} fill className="object-cover" />
              </motion.div>
            )}

            {/* მეორე ციფრი */}
            {secondStat && (
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-[20px] p-8 flex flex-col justify-between border border-gray-100 shadow-sm text-green-primary"
              >
                <span className="text-sm font-bold uppercase tracking-widest">
                  {secondStat.label}
                </span>
                <div className="flex flex-col">
                  <span className="text-6xl font-black leading-none">
                    <Counter value={secondStat.value} suffix={secondStat.suffix ?? ''} />
                  </span>
                  <span className="text-xs font-bold uppercase mt-2">{secondStat.caption}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
