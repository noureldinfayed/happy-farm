'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { fadeUpVariant } from '@/lib/animations'
import { CheckCircle, Loader2 } from 'lucide-react'

const PRODUCTS = [
  'كركم',
  'شطة',
  'كمون',
  'بهارات 7',
  'فلفل أسمر',
  'فلفل أبيض',
  'ثوم بودرة',
  'بصل بودر',
  'كزبرة',
  'قرفة',
  'زعتر',
  'حبة البركة',
  'بابريكا مدخنة',
  'بهارات بطاطس',
  'مرقة دجاج',
  'مرقة لحم',
  'محاشي',
  'مشاوي',
  'كبدة',
]

const GOVERNORATES = [
  'الإسكندرية', 'القاهرة', 'الجيزة', 'الدقهلية', 'البحيرة',
  'الشرقية', 'الغربية', 'المنوفية', 'القليوبية', 'الإسماعيلية',
  'السويس', 'بورسعيد', 'دمياط', 'كفر الشيخ', 'المنيا',
  'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'أخرى',
]

const VODAFONE_NUMBER = '01556662920'

interface FormState {
  name: string
  phone: string
  governorate: string
  products: string[]
  quantity: string
  notes: string
}

const EMPTY: FormState = {
  name: '',
  phone: '',
  governorate: '',
  products: [],
  quantity: '',
  notes: '',
}

export default function Order() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const toggleProduct = (p: string) => {
    setForm((f) => ({
      ...f,
      products: f.products.includes(p) ? f.products.filter((x) => x !== p) : [...f.products, p],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || form.products.length === 0 || !form.governorate) {
      setErrorMsg('من فضلك اكمل الاسم والتليفون والمحافظة واختر منتج واحد على الأقل.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('server error')
      setStatus('success')
      setForm(EMPTY)
    } catch {
      setStatus('error')
      setErrorMsg('حصل خطأ. حاول تاني أو تواصل معنا على واتساب.')
    }
  }

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200'
  const labelCls = 'block text-sm font-semibold text-foreground mb-1.5'

  return (
    <section id="order" ref={ref} className="py-20 md:py-28 bg-primary/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="w-full text-center mb-12"
        >
          <div className="w-10 h-1 rounded-full bg-accent mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground">
            اطلب الآن
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl leading-relaxed mx-auto">
            امتلأ النموذج وهنتواصل معك لتأكيد الطلب وتفاصيل الدفع.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center gap-6 py-8"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-foreground mb-2">
                    تم استلام طلبك!
                  </h3>
                  <p className="text-muted text-base leading-relaxed max-w-sm mx-auto">
                    شكرًا لك! هنتواصل معك على واتساب لتأكيد الطلب وتفاصيل الدفع.
                  </p>
                </div>

                {/* Payment reminder */}
                <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-5">
                  <p className="font-semibold text-foreground text-sm mb-3 text-center">
                    لتأكيد طلبك — ابعت العربون على فودافون كاش:
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-display font-black text-3xl text-red-600 tracking-wider" dir="ltr">
                      {VODAFONE_NUMBER}
                    </span>
                  </div>
                  <p className="text-muted text-xs text-center mt-2">
                    ابعت صورة الإيصال على واتساب بعد التحويل
                  </p>
                </div>

                <a
                  href="https://wa.me/201556662920?text=مرحبا، بعت العربون وعايز أكمل طلبي"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 px-7 rounded-full bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل الآن على واتساب
                </a>

                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-muted hover:text-primary underline underline-offset-2 transition-colors"
                >
                  تقديم طلب جديد
                </button>
              </motion.div>
            ) : (
              /* Order form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Name & Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>الاسم الكامل *</label>
                    <input
                      type="text"
                      placeholder="اسمك هنا"
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>رقم الهاتف (واتساب) *</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className={inputCls}
                      dir="ltr"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Governorate */}
                <div>
                  <label className={labelCls}>المحافظة *</label>
                  <select
                    className={inputCls}
                    value={form.governorate}
                    onChange={(e) => setForm((f) => ({ ...f, governorate: e.target.value }))}
                  >
                    <option value="">اختر المحافظة</option>
                    {GOVERNORATES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Products checkboxes */}
                <div>
                  <label className={labelCls}>المنتجات المطلوبة * (يمكن اختيار أكثر من منتج)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
                    {PRODUCTS.map((p) => {
                      const checked = form.products.includes(p)
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => toggleProduct(p)}
                          className={`h-11 rounded-xl border-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                            checked
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 bg-white text-foreground hover:border-primary/40'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className={labelCls}>الكمية المطلوبة</label>
                  <input
                    type="text"
                    placeholder="مثال: 10 كرتون، 50 جرة، إلخ"
                    className={inputCls}
                    value={form.quantity}
                    onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className={labelCls}>ملاحظات إضافية</label>
                  <textarea
                    rows={3}
                    placeholder="أي تفاصيل إضافية أو استفسارات..."
                    className={`${inputCls} resize-none`}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  />
                </div>

                {/* Error */}
                {(errorMsg || status === 'error') && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {errorMsg || 'حصل خطأ. حاول تاني أو تواصل معنا مباشرة.'}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-14 rounded-full bg-primary text-white font-display font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    'أرسل طلبي الآن'
                  )}
                </button>

                <p className="text-center text-xs text-muted leading-relaxed">
                  بعد إرسال الطلب، ابعت العربون على فودافون كاش{' '}
                  <span className="font-bold text-foreground" dir="ltr">{VODAFONE_NUMBER}</span>{' '}
                  وابعتلنا صورة الإيصال على واتساب.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
