import type { Metadata } from 'next'
import { Tajawal, Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import LenisProvider from '@/components/ui/LenisProvider'
import './globals.css'

const displayFont = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://happy-farm.store'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'هابي فارم | بهارات طبيعية مصرية — توصيل الإسكندرية',
    template: '%s | هابي فارم',
  },
  description:
    'هابي فارم — علامة مصرية متخصصة في البهارات والتوابل الطبيعية 100%. 19 منتج طازج، توصيل داخل الإسكندرية. مناسب للأفراد والمطاعم والموزعين بالجملة.',

  keywords: [
    'بهارات طبيعية مصر',
    'توابل مصرية طبيعية',
    'بهارات بالجملة الإسكندرية',
    'شراء بهارات أونلاين مصر',
    'بهارات عضوية مصر',
    'توابل للمطاعم مصر',
    'هابي فارم',
    'Happy Farm spices Egypt',
    'Egyptian spices wholesale',
    'natural spices Alexandria Egypt',
    'organic spices Egypt online',
    'spice supplier Egypt restaurants',
  ],

  authors: [{ name: 'هابي فارم', url: SITE_URL }],
  creator: 'هابي فارم',
  publisher: 'هابي فارم',
  category: 'food',

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: SITE_URL,
    siteName: 'هابي فارم',
    title: 'هابي فارم | بهارات طبيعية مصرية — توصيل الإسكندرية',
    description:
      'هابي فارم — علامة مصرية متخصصة في البهارات والتوابل الطبيعية 100%. 19 منتج طازج، توصيل داخل الإسكندرية. مناسب للأفراد والمطاعم والموزعين بالجملة.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'هابي فارم — بهارات طبيعية مصرية',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'هابي فارم | بهارات طبيعية مصرية',
    description: '19 منتج من البهارات الطبيعية. توصيل الإسكندرية. مناسب للأفراد والمطاعم.',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    'geo.region': 'EG-ALX',
    'geo.placename': 'Alexandria, Egypt',
    'geo.position': '31.2001;29.9187',
    'ICBM': '31.2001, 29.9187',
    'DC.language': 'ar',
    'DC.coverage': 'Egypt',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'هابي فارم',
      alternateName: 'Happy Farm',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+201556662920',
        contactType: 'customer service',
        availableLanguage: 'Arabic',
        areaServed: 'EG',
      },
      sameAs: ['https://www.facebook.com/happyfarm1/'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'الإسكندرية',
        addressRegion: 'ALX',
        addressCountry: 'EG',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'هابي فارم',
      alternateName: 'Happy Farm',
      description:
        'علامة مصرية متخصصة في البهارات والتوابل الطبيعية 100%. 19 منتج طازج. توصيل داخل الإسكندرية. مناسب للأفراد والمطاعم والموزعين بالجملة.',
      url: SITE_URL,
      image: `${SITE_URL}/images/og-image.jpg`,
      telephone: '+201556662920',
      email: 'happy.farm7890@gmail.com',
      priceRange: 'ج٢٣–ج٨٠',
      servesCuisine: 'Egyptian',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'الإسكندرية',
        addressRegion: 'ALX',
        addressCountry: 'EG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.2001,
        longitude: 29.9187,
      },
      areaServed: {
        '@type': 'City',
        name: 'Alexandria',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'منتجات هابي فارم',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'كركم', description: 'بهارات كركم طبيعية 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'شطة', description: 'شطة طبيعية حارة 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'كمون', description: 'كمون طبيعي مصري 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'بهارات 7', description: 'خلطة سبع بهارات 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'فلفل أسمر', description: 'فلفل أسمر طبيعي 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'فلفل أبيض', description: 'فلفل أبيض طبيعي 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'ثوم بودرة', description: 'ثوم بودرة 70جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'بصل بودر', description: 'بصل بودرة 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'كزبرة', description: 'كزبرة طبيعية 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'قرفة', description: 'قرفة طبيعية 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'زعتر', description: 'زعتر طبيعي 25جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'حبة البركة', description: 'حبة البركة الطبيعية 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'بابريكا مدخنة', description: 'بابريكا مدخنة 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'بهارات بطاطس', description: 'خلطة بهارات بطاطس 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'مرقة دجاج', description: 'خلطة مرقة دجاج 70جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'مرقة لحم', description: 'خلطة مرقة لحم 70جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'محاشي', description: 'خلطة بهارات المحاشي 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'مشاوي', description: 'خلطة بهارات المشاوي 50جم' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'كبدة', description: 'خلطة بهارات الكبدة الإسكندراني 50جم' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'هابي فارم',
      inLanguage: 'ar-EG',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`h-full antialiased ${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body dir="rtl" className="min-h-full flex flex-col bg-background text-foreground font-body">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
