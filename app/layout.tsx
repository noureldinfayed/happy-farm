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

export const metadata: Metadata = {
  title: {
    default: 'هابي فارم | منتجات عضوية طبيعية',
    template: '%s | هابي فارم',
  },
  description: 'هابي فارم — بهارات ومنتجات عضوية طبيعية 100%. اطلب الآن بأفضل الأسعار بالجملة.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://happy-farm.store'),
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    siteName: 'هابي فارم',
    title: 'هابي فارم | منتجات عضوية طبيعية',
    description: 'هابي فارم — بهارات ومنتجات عضوية طبيعية 100%. اطلب الآن بأفضل الأسعار بالجملة.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'هابي فارم — منتجات عضوية طبيعية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`h-full antialiased ${displayFont.variable} ${bodyFont.variable}`}>
      <body dir="rtl" className="min-h-full flex flex-col bg-background text-foreground font-body">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
