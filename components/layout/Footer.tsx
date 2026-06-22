import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

const BUSINESS_NAME = 'هابي فارم'
const BUSINESS_NAME_EN = 'Happy Farm'
const TAGLINE = 'بهاراتنا.. سر الطعم الأصيل ✨'
const PHONE = '01556662920'
const EMAIL = 'happy.farm7890@gmail.com'
const FACEBOOK_URL = 'https://www.facebook.com/happyfarm1/'
const WHATSAPP_URL = 'https://wa.me/201556662920'

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#' },
  { label: 'منتجاتنا', href: '#products' },
  { label: 'كيف تطلب؟', href: '#how-to-order' },
  { label: 'عن هابي فارم', href: '#about' },
  { label: 'اطلب الآن', href: '#order' },
]

const PRODUCTS = [
  'كركم', 'شطة', 'كمون', 'بهارات 7', 'فلفل أسمر', 'فلفل أبيض',
  'ثوم بودرة', 'بصل بودر', 'كزبرة', 'قرفة', 'زعتر', 'حبة البركة',
  'بابريكا مدخنة', 'بهارات بطاطس', 'مرقة دجاج', 'مرقة لحم',
  'محاشي', 'مشاوي', 'كبدة',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Happy Farm"
                width={48}
                height={28}
                className="flex-shrink-0"
              />
              <span className="font-display font-black text-lg text-white tracking-wide leading-none">
                HAPPY FARM
              </span>
            </div>
            <p className="text-sm text-secondary/70 leading-relaxed max-w-xs">
              {TAGLINE}
            </p>
            <p className="text-xs text-secondary/50 leading-relaxed max-w-xs">
              منتجات عضوية طبيعية 100% مختارة من أجود المكونات.
              الإسكندرية، مصر.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {/* Facebook */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-secondary/30 text-secondary/70 hover:text-white hover:border-secondary transition-colors duration-200"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-secondary/30 text-secondary/70 hover:text-white hover:border-secondary transition-colors duration-200"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary/50 mb-1">
              روابط سريعة
            </h3>
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-secondary/70 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Products & Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary/50 mb-3">
                منتجاتنا
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {PRODUCTS.map((p) => (
                  <li key={p} className="text-sm text-secondary/70 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary/50 mb-3">
                تواصل معنا
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-secondary/70 hover:text-white transition-colors duration-200"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  {EMAIL}
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-2 text-sm text-secondary/70 hover:text-white transition-colors duration-200"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-secondary/40">
          <span>© {currentYear} {BUSINESS_NAME}. جميع الحقوق محفوظة.</span>
          {/* FI STAMP — NON-NEGOTIABLE, DO NOT REMOVE */}
          <span dir="ltr" className="font-medium tracking-wide">
            Architected &amp; Engineered by Fayed Intelligence
          </span>
        </div>
      </div>
    </footer>
  )
}
