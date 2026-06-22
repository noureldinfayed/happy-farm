'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant } from '@/lib/animations'

const PRODUCTS = [
  {
    name: 'كركم',
    desc: 'يضيف لون ذهبي ونكهة أصيلة لأي طبق',
    bg: 'bg-gradient-to-br from-amber-100 to-orange-200',
    textColor: 'text-amber-800',
    image: '/images/products/kurkum.png',
    price: 36, weight: '50 جم',
  },
  {
    name: 'شطة',
    desc: 'حرارة طبيعية تلهّب النكهة على السفرة',
    bg: 'bg-gradient-to-br from-red-100 to-red-200',
    textColor: 'text-red-800',
    image: '/images/products/shata.png',
    price: 23, weight: '50 جم',
  },
  {
    name: 'كمون',
    desc: 'النكهة الأصيلة في قلب كل أكلة مصرية',
    bg: 'bg-gradient-to-br from-yellow-100 to-amber-200',
    textColor: 'text-yellow-800',
    image: '/images/products/kamoun.png',
    price: 36, weight: '50 جم',
  },
  {
    name: 'بهارات 7',
    desc: 'خلطة متوازنة من سبع بهارات طبيعية مختارة',
    bg: 'bg-gradient-to-br from-orange-100 to-amber-200',
    textColor: 'text-orange-800',
    image: '/images/products/baharat7.png',
    price: 40, weight: '50 جم',
  },
  {
    name: 'فلفل أسمر',
    desc: 'نكهة حارة قوية تناسب اللحوم والمشويات',
    bg: 'bg-gradient-to-br from-stone-200 to-stone-300',
    textColor: 'text-stone-800',
    image: '/images/products/felfel-asmar.png',
    price: 43, weight: '50 جم',
  },
  {
    name: 'فلفل أبيض',
    desc: 'حدة ناعمة تناسب أشهى الأطباق البيضاء',
    bg: 'bg-gradient-to-br from-slate-50 to-gray-100',
    textColor: 'text-slate-700',
    image: '/images/products/felfel-abyad.png',
    price: 80, weight: '50 جم',
  },
  {
    name: 'ثوم بودرة',
    desc: 'نكهة الثوم الطازج في شكل مريح ومركز',
    bg: 'bg-gradient-to-br from-stone-100 to-stone-200',
    textColor: 'text-stone-700',
    image: '/images/products/thoum.png',
    price: 32, weight: '70 جم',
  },
  {
    name: 'بصل بودر',
    desc: 'بصل مجفف بعناية للحفاظ على نكهته الكاملة',
    bg: 'bg-gradient-to-br from-amber-50 to-yellow-100',
    textColor: 'text-amber-700',
    image: '/images/products/basal.png',
    price: 32, weight: '50 جم',
  },
  {
    name: 'كزبرة',
    desc: 'نكهة عطرية خفيفة تكمل كل طبق مصري',
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    textColor: 'text-green-700',
    image: '/images/products/kozabra.png',
    price: 26, weight: '50 جم',
  },
  {
    name: 'قرفة',
    desc: 'حلاوة طبيعية للحلويات والأطباق الشرقية',
    bg: 'bg-gradient-to-br from-orange-100 to-red-100',
    textColor: 'text-orange-900',
    image: null,
    price: 46, weight: '50 جم',
  },
  {
    name: 'زعتر',
    desc: 'عطر البرية الأصيل على مائدتك',
    bg: 'bg-gradient-to-br from-green-100 to-emerald-200',
    textColor: 'text-green-800',
    image: '/images/products/zaatar.png',
    price: 29, weight: '25 جم',
  },
  {
    name: 'حبة البركة',
    desc: 'بركة في طعمها وفائدتها الطبيعية',
    bg: 'bg-gradient-to-br from-gray-200 to-gray-300',
    textColor: 'text-gray-800',
    image: '/images/products/habba.png',
    price: 38, weight: '50 جم',
  },
  {
    name: 'بابريكا مدخنة',
    desc: 'عمق النكهة المدخنة في كل لقمة',
    bg: 'bg-gradient-to-br from-red-100 to-orange-200',
    textColor: 'text-red-900',
    image: '/images/products/babrika.png',
    price: 40, weight: '50 جم',
  },
  {
    name: 'بهارات بطاطس',
    desc: 'خلطة مميزة خصيصاً لتتبيل البطاطس',
    bg: 'bg-gradient-to-br from-yellow-50 to-amber-100',
    textColor: 'text-yellow-900',
    image: '/images/products/baharat-batatas.png',
    price: 33, weight: '50 جم',
  },
  {
    name: 'مرقة دجاج',
    desc: 'خلطة مرق الدجاج المركز — طعم بيتي حقيقي',
    bg: 'bg-gradient-to-br from-yellow-100 to-amber-200',
    textColor: 'text-yellow-800',
    image: '/images/products/moraka-farkh.png',
    price: 30, weight: '70 جم',
  },
  {
    name: 'مرقة لحم',
    desc: 'مرقة اللحم الغنية لأشهى الأطباق الشرقية',
    bg: 'bg-gradient-to-br from-amber-100 to-brown-200',
    textColor: 'text-amber-900',
    image: '/images/products/moraka-lahm.png',
    price: 29, weight: '70 جم',
  },
  {
    name: 'محاشي',
    desc: 'خلطة تبهر المحاشي وتعطيها نكهتها المميزة',
    bg: 'bg-gradient-to-br from-lime-50 to-green-100',
    textColor: 'text-lime-800',
    image: null,
    price: 29, weight: '50 جم',
  },
  {
    name: 'مشاوي',
    desc: 'خلطة المشويات الأحلى لكل شوية ناجحة',
    bg: 'bg-gradient-to-br from-orange-100 to-red-200',
    textColor: 'text-red-800',
    image: null,
    price: 32, weight: '50 جم',
  },
  {
    name: 'كبدة',
    desc: 'البهارة الأصح لتتبيل الكبدة الإسكندراني',
    bg: 'bg-gradient-to-br from-red-50 to-rose-100',
    textColor: 'text-rose-800',
    image: null,
    price: 31, weight: '50 جم',
  },
]

export default function Products() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="products" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="w-full text-center mb-14"
        >
          <div className="w-10 h-1 rounded-full bg-accent mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground">
            منتجاتنا
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl leading-relaxed mx-auto">
            كل منتج مختار بعناية من أجود المكونات الطبيعية، طازج، نقي، وبنكهة بتحبها.
          </p>
        </motion.div>

        {/* Group lineup image */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-14 shadow-xl"
        >
          <Image
            src="/images/products/lineup.jpg"
            alt="منتجات هابي فارم — الطاقم الكامل"
            width={1200}
            height={500}
            className="w-full object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-6">
            <p dir="ltr" className="text-white/80 text-sm font-semibold tracking-wide text-center">
              Happy Farm — Pure Egyptian Spices
            </p>
          </div>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              variants={fadeUpVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.15 + i * 0.07 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image or branded placeholder */}
              <div className={`relative h-44 sm:h-52 overflow-hidden ${!product.image ? product.bg : 'bg-[#FAF7F0]'}`}>
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-4"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  /* Branded jar-style placeholder */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                    {/* Jar shape */}
                    <div className="relative w-20 h-24 flex flex-col items-center justify-center">
                      {/* Jar body */}
                      <div className="absolute inset-0 bg-[#111] rounded-xl opacity-90" />
                      {/* Jar lid */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#222] rounded-t-md" />
                      {/* Label */}
                      <div className="relative z-10 flex flex-col items-center gap-0.5 px-2">
                        <span className="text-[#1E6B3C] text-[7px] font-bold tracking-wider leading-none">HAPPY FARM</span>
                        <div className="w-full h-px bg-[#1E6B3C]/40 my-0.5" />
                        <span className={`font-display font-black text-sm text-white leading-tight text-center`}>
                          {product.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                    {product.name}
                  </h3>
                  <span className="shrink-0 font-black text-base text-primary" dir="ltr">
                    {product.price} ج
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{product.desc}</p>
                <p className="text-xs text-muted/60 mt-1">{product.weight}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#order"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/30"
          >
            اطلب منتجاتك الآن
          </a>
        </motion.div>
      </div>
    </section>
  )
}
