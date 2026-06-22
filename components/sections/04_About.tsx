'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, clipRevealVariant } from '@/lib/animations'
import { Leaf, Award, Truck, HeartHandshake } from 'lucide-react'

const QUALITIES = [
  { icon: Leaf, text: 'مكونات طبيعية 100% بدون إضافات صناعية' },
  { icon: Award, text: 'مختارة بعناية من أجود المصادر' },
  { icon: Truck, text: 'توصيل لجميع محافظات مصر' },
  { icon: HeartHandshake, text: 'أسعار الجملة المناسبة للتجار والأفراد' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <motion.div
            variants={clipRevealVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square"
          >
            <Image
              src="/images/character.jpg"
              alt="هابي فارم — منتجاتنا طبيعية"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 left-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4">
                <p className="font-display font-bold text-foreground text-sm leading-relaxed text-center">
                  "مع بهاراتنا، كل أكلة عادية تتحول لتحفة على سفرتك 🍲🌿"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="w-10 h-1 rounded-full bg-accent mb-1"
            />

            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground leading-tight"
            >
              عن هابي فارم
            </motion.h2>

            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="text-muted text-base sm:text-lg leading-relaxed"
            >
              هابي فارم علامة تجارية متخصصة في إنتاج وتوزيع البهارات والتوابل
              العضوية الطبيعية بالجملة. منتجاتنا معمولة من أجود المكونات الطبيعية
              المختارة بعناية، عشان توصلك طازجة وغنية بالنكهة الأصيلة.
            </motion.p>

            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.28 }}
              className="text-muted text-base leading-relaxed"
            >
              بنخدم التجار والموزعين وأصحاب المحلات في الإسكندرية وجميع محافظات مصر.
              تقدر تطلب بالجملة بأسعار منافسة ونوعية ممتازة.
            </motion.p>

            {/* Qualities list */}
            <motion.ul
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.36 }}
              className="flex flex-col gap-3 mt-2"
            >
              {QUALITIES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </span>
                  <span className="text-foreground text-sm font-medium">{text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.44 }}
              className="pt-2"
            >
              <a
                href="#order"
                className="inline-flex items-center justify-center h-13 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25"
              >
                اطلب منتجاتك الآن
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
