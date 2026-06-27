'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant } from '@/lib/animations'
import WordReveal from '@/components/ui/WordReveal'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const video = videoRef.current
    const audio = audioRef.current
    
    if (video && audio) {
      const handlePlay = () => {
        if (!isMuted) audio.play().catch(() => setIsMuted(true))
      }
      const handlePause = () => audio.pause()
      const handleSeeked = () => { audio.currentTime = video.currentTime }
      
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('seeked', handleSeeked)
      
      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('seeked', handleSeeked)
      }
    }
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.currentTime = videoRef.current?.currentTime || 0
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
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
        <audio ref={audioRef} src="/images/hero-sfx.mp3?v=mixed" loop />
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
            as="h1"
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
          <button
            onClick={toggleMute}
            className="inline-flex items-center justify-center h-14 px-6 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white font-semibold text-base hover:bg-black/60 active:scale-95 transition-all duration-200"
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            )}
          </button>
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
            { value: '+19', label: 'منتج' },
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
