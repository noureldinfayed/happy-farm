'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant } from '@/lib/animations'
import WordReveal from '@/components/ui/WordReveal'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-banner.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video can't play */}
          <Image
            src="/images/hero-banner.jpg"
            alt="هابي فارم"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </video>
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
      </div>

      {/* Content — use flex col + items-center for reliable RTL centering */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center">

        {/* Eyebrow */}
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-white/60 text-sm font-medium mb-6 tracking-wide"
        >
          علامة تجارية مصرية — بهارات طبيعية ١٠٠٪
        </motion.p>

        {/* Headline */}
        <div className="mb-6 w-full">
          <WordReveal
            text="بهاراتنا.. سر الطعم الأصيل"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight justify-center"
            delay={0.1}
          />
        </div>

        {/* Subheadline */}
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="text-center text-lg sm:text-xl text-white/80 leading-relaxed w-full max-w-2xl mb-10 font-body"
        >
          لما تدوق أكلة معمولة بلمسة من بهاراتنا، منتجنا معمول من أجود المكونات الطبيعية،
          مختارة بعناية عشان يوصلك طازج وغني بالنكهة اللي بتحبها.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#order"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-accent text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-accent/40 min-w-[160px]"
          >
            اطلب الآن
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-base hover:bg-white/25 active:scale-95 transition-all duration-200 min-w-[160px]"
          >
            منتجاتنا
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-8 w-full max-w-xs"
        >
          {[
            { value: '+59K', label: 'متابع' },
            { value: '+8', label: 'منتج' },
            { value: '100%', label: 'طبيعي' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span dir="ltr" className="text-2xl sm:text-3xl font-display font-black text-accent">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-white/70 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
      </motion.div>
    </section>
  )
}
