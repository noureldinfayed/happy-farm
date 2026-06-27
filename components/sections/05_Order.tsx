'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { fadeUpVariant } from '@/lib/animations'
import { CheckCircle, Loader2, Minus, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const PRODUCTS: { name: string; price: number; weight: string }[] = [
  { name: 'كركم',          price: 36, weight: '50 جم' },
  { name: 'شطة',           price: 23, weight: '50 جم' },
  { name: 'كمون',          price: 36, weight: '50 جم' },
  { name: 'بهارات 7',      price: 40, weight: '50 جم' },
  { name: 'فلفل أسمر',    price: 43, weight: '50 جم' },
  { name: 'فلفل أبيض',    price: 80, weight: '50 جم' },
  { name: 'ثوم بودرة',    price: 32, weight: '70 جم' },
  { name: 'بصل بودر',     price: 32, weight: '50 جم' },
  { name: 'كزبرة',         price: 26, weight: '50 جم' },
  { name: 'قرفة',          price: 46, weight: '50 جم' },
  { name: 'زعتر',          price: 29, weight: '25 جم' },
  { name: 'حبة البركة',   price: 38, weight: '50 جم' },
  { name: 'بابريكا مدخنة', price: 40, weight: '50 جم' },
  { name: 'بهارات بطاطس', price: 33, weight: '50 جم' },
  { name: 'مرقة دجاج',    price: 30, weight: '70 جم' },
  { name: 'مرقة لحم',     price: 29, weight: '70 جم' },
  { name: 'محاشي',         price: 29, weight: '50 جم' },
  { name: 'مشاوي',         price: 32, weight: '50 جم' },
  { name: 'كبدة',          price: 31, weight: '50 جم' },
]

const FREE_SHIPPING_AT = 12
const VODAFONE_NUMBER = '01003815160'

interface FormState {
  name: string
  phone: string
  governorate: 'alexandria' | 'other'
  notes: string
}

const EMPTY: FormState = { name: '', phone: '', governorate: 'alexandria', notes: '' }

export default function Order() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { items, setQty, clearCart } = useCart()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const totalBottles = Object.values(items).reduce((a, b) => a + b, 0)
  const productTotal = PRODUCTS.reduce((sum, p) => sum + (items[p.name] ?? 0) * p.price, 0)
  const shippingFee = form.governorate === 'alexandria' ? 30 : 70
  const freeShipping = totalBottles >= FREE_SHIPPING_AT
  const shipping = totalBottles > 0 && !freeShipping ? shippingFee : 0
  const totalPrice = productTotal + shipping
  const progressPct = Math.min((totalBottles / FREE_SHIPPING_AT) * 100, 100)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      setErrorMsg('من فضلك اكمل الاسم ورقم الواتساب.')
      return
    }
    if (totalBottles === 0) {
      setErrorMsg('من فضلك اختار منتج واحد على الأقل.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    const products = Object.entries(items)
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => `${name} × ${qty}`)

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          governorate: form.governorate === 'alexandria' ? 'الإسكندرية' : 'محافظات أخرى',
          products,
          quantity: `${totalBottles} زجاجة`,
          notes: form.notes,
          shipping,
          total: totalPrice,
        }),
      })
      if (!res.ok) throw new Error('server error')
      setStatus('success')
      setForm(EMPTY)
      clearCart()
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
            اختار منتجاتك واملأ بياناتك وهنوصلك على طول
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full border border-green-200">
              🚚 توصيل لجميع المحافظات
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full border border-primary/20">
              🎉 توصيل مجاني من {FREE_SHIPPING_AT} زجاجة
            </div>
          </div>
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
                  <h3 className="font-display font-black text-2xl text-foreground mb-2">تم استلام طلبك!</h3>
                  <p className="text-muted text-base leading-relaxed max-w-sm mx-auto">
                    شكرًا لك! هنتواصل معك على واتساب لتأكيد الطلب وتفاصيل الدفع.
                  </p>
                </div>
                <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-5">
                  <p className="font-semibold text-foreground text-sm mb-3 text-center">
                    لتأكيد طلبك — ابعت العربون على فودافون كاش:
                  </p>
                  <span className="font-display font-black text-3xl text-red-600 tracking-wider" dir="ltr">
                    {VODAFONE_NUMBER}
                  </span>
                  <p className="text-muted text-xs text-center mt-2">ابعت صورة الإيصال على واتساب بعد التحويل</p>
                </div>
                <a
                  href="https://wa.me/201556662920?text=مرحبا، بعت العربون وعايز أكمل طلبي"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 px-7 rounded-full bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  تواصل الآن على واتساب
                </a>
                <button onClick={() => setStatus('idle')} className="text-sm text-muted hover:text-primary underline underline-offset-2 transition-colors">
                  تقديم طلب جديد
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>الاسم الكامل *</label>
                    <input type="text" placeholder="اسمك هنا" className={inputCls}
                      value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelCls}>رقم الواتساب *</label>
                    <input type="tel" placeholder="01XXXXXXXXX" className={inputCls} dir="ltr"
                      value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>المحافظة *</label>
                  <select 
                    className={inputCls} 
                    value={form.governorate} 
                    onChange={(e) => setForm(f => ({ ...f, governorate: e.target.value as 'alexandria' | 'other' }))}
                  >
                    <option value="alexandria">الإسكندرية (شحن 30 جنيه)</option>
                    <option value="other">محافظات أخرى (شحن 70 جنيه)</option>
                  </select>
                </div>

                {/* Progress bar + price summary */}
                <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">توصيل مجاني من 6 زجاجات</span>
                    <span className={`text-sm font-black tabular-nums transition-colors ${freeShipping ? 'text-green-600' : 'text-muted'}`}>
                      {totalBottles} / {FREE_SHIPPING_AT}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
                      animate={{ width: `${progressPct}%` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  </div>
                  <p className="text-xs transition-colors" style={{ color: freeShipping ? '#16a34a' : '#9ca3af' }}>
                    {freeShipping
                      ? '✅ توصيل مجاني!'
                      : totalBottles > 0
                        ? `أضف ${FREE_SHIPPING_AT - totalBottles} زجاجة أكتر للتوصيل المجاني`
                        : 'اختار منتجاتك'}
                  </p>

                  {/* Price breakdown */}
                  {totalBottles > 0 && (
                    <div className="border-t border-gray-200 pt-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm text-muted">
                        <span>المنتجات ({totalBottles} زجاجة)</span>
                        <span dir="ltr" className="font-semibold">{productTotal} جنيه</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={freeShipping ? 'text-green-600 font-semibold' : 'text-muted'}>
                          {freeShipping ? '🎉 توصيل مجاني' : 'رسوم التوصيل'}
                        </span>
                        <span dir="ltr" className={`font-semibold ${freeShipping ? 'text-green-600' : 'text-muted'}`}>
                          {freeShipping ? 'مجاني' : `${shippingFee} جنيه`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-base font-black text-foreground border-t border-gray-200 pt-1.5 mt-0.5">
                        <span>الإجمالي</span>
                        <span dir="ltr" className="text-primary">{totalPrice} جنيه</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Products +/- */}
                <div>
                  <label className={labelCls}>اختار المنتجات وكميتها *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRODUCTS.map((p) => {
                      const qty = items[p.name] ?? 0
                      return (
                        <div key={p.name} className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-200 ${qty > 0 ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}>
                          <div className="flex flex-col min-w-0">
                            <span className={`text-sm font-semibold leading-tight ${qty > 0 ? 'text-primary' : 'text-foreground'}`}>{p.name}</span>
                            <span className="text-xs text-muted/60" dir="ltr">{p.price} ج · {p.weight}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 mr-2">
                            <button type="button" onClick={() => setQty(p.name, -1)} disabled={qty === 0}
                              className="w-7 h-7 rounded-lg flex items-center justify-center border-2 border-gray-200 text-muted disabled:opacity-30 hover:border-primary hover:text-primary transition-colors active:scale-90">
                              <Minus size={12} />
                            </button>
                            <span className={`w-5 text-center text-sm font-black tabular-nums ${qty > 0 ? 'text-primary' : 'text-muted'}`}>{qty}</span>
                            <button type="button" onClick={() => setQty(p.name, 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center border-2 border-gray-200 text-muted hover:border-primary hover:text-primary transition-colors active:scale-90">
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={labelCls}>عنوانك + أي ملاحظات</label>
                  <textarea rows={3} placeholder="عنوانك بالتفصيل في الإسكندرية، أو أي طلبات إضافية..."
                    className={`${inputCls} resize-none`}
                    value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
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
                  disabled={status === 'loading' || totalBottles === 0}
                  className="w-full h-14 rounded-full bg-primary text-white font-display font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={20} className="animate-spin" /> جاري الإرسال...</>
                  ) : (
                    'أرسل طلبي الآن'
                  )}
                </button>

                <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-5 py-4 flex flex-col items-center gap-2 text-center">
                  <p className="text-red-700 font-bold text-sm">⚠️ بعد إرسال الطلب، ابعت العربون على فودافون كاش:</p>
                  <span className="font-display font-black text-2xl text-red-600 tracking-widest" dir="ltr">{VODAFONE_NUMBER}</span>
                  <p className="text-red-600 text-xs font-semibold">وابعتلنا صورة الإيصال على واتساب لتأكيد الطلب</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
