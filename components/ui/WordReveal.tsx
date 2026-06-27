'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { wordRevealVariant, wordVariant } from '@/lib/animations'

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

export default function WordReveal({ text, className, delay = 0, as = 'div' }: WordRevealProps) {
  const ref = useRef<any>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  const MotionComponent = motion[as] as any

  return (
    <MotionComponent
      ref={ref}
      className={`flex flex-wrap gap-x-[0.25em] ${className ?? ''}`}
      variants={wordRevealVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ transitionDelay: `${delay}s` }}
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span className="block" variants={wordVariant}>
            {word}
          </motion.span>
        </div>
      ))}
    </MotionComponent>
  )
}
