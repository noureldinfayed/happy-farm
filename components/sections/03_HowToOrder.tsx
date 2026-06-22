'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant } from '@/lib/animations'
import { ShoppingCart, ClipboardList, Wallet, PackageCheck } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    icon: ShoppingCart,
    title: 'تصفح المنتجات',
    desc: 'اطلع على جميع منتجاتنا واختر اللي يناسبك من كركم، شطة، كمون وغيرها.',
  },
  {
    step: '02',
    icon: ClipboardList,
    title: 'امتلأ طلبك',
    desc: 'اكتب اسمك ورقم واتساب والمنتجات والكمية المطلوبة في نموذج الطلب.',
  },
  {
    step: '03',
    icon: Wallet,
    title: 'ادفع العربون',
    desc: 'ابعت عربون مبدئي على فودافون كاش وابعتنا صورة التحويل على واتساب.',
  },
  {
    step: '04',
    icon: PackageCheck,
    title: 'استلم طلبك',
    desc: 'هنتواصل معك لتأكيد الطلب وتحديد موعد التسليم أو الشحن.',
  },
]

const VODAFONE_NUMBER = '01556662920'
const WHATSAPP_URL = 'https://wa.me/201556662920?text=عايز أطلب من هابي فارم'

export default function HowToOrder() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-to-order" ref={ref} className="py-20 md:py-28 bg-primary/5">
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
            كيف تطلب؟
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl leading-relaxed mx-auto">
            بسيطة وسهلة في 4 خطوات وطلبك يوصلك.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                variants={fadeUpVariant}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
              >
                {/* Step number */}
                <span className="absolute top-3 left-3 font-display font-black text-5xl text-primary/10 leading-none select-none" dir="ltr">
                  {s.step}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={22} className="text-primary" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Vodafone Cash highlight */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
            {/* Vodafone icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#E60000"/>
                <path d="M33 16.5C30.5 13.8 26.9 12 23 12C15.3 12 9 18.3 9 26C9 33.7 15.3 40 23 40C30.7 40 37 33.7 37 26C37 22.9 35.9 20.1 34.1 17.9L30.2 21.8C31.3 23.1 32 24.8 32 26.7C32 31.1 28.4 34.7 24 34.7C19.6 34.7 16 31.1 16 26.7C16 22.3 19.6 18.7 24 18.7C25.8 18.7 27.5 19.3 28.8 20.3L33 16.5Z" fill="white"/>
              </svg>
            </div>

            <div className="text-center md:text-right flex-1">
              <h3 className="font-display font-black text-xl text-foreground mb-1">
                الدفع عبر فودافون كاش
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-3">
                ابعت العربون على الرقم دا وابعتنا صورة الإيصال على واتساب وهنأكد طلبك فورًا.
              </p>
              <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-3">
                <span className="text-muted text-sm font-medium">فودافون كاش:</span>
                <span className="font-display font-black text-2xl text-red-600 tracking-wider" dir="ltr">
                  {VODAFONE_NUMBER}
                </span>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-[#25D366] text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل على واتساب
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
