'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 60

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#' },
  { label: 'منتجاتنا', href: '#products' },
  { label: 'كيف تطلب؟', href: '#how-to-order' },
  { label: 'عن هابي فارم', href: '#about' },
]

export default function Navbar() {
  const { direction, scrollY } = useScrollDirection({ threshold: 10 })
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > SCROLL_THRESHOLD
  const isHidden = direction === 'down' && scrollY > SCROLL_THRESHOLD + 80

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center gap-2.5 order-last" aria-label="هابي فارم">
              <span className={cn(
                'font-display font-black text-base tracking-wide transition-colors duration-300 leading-none',
                isScrolled ? 'text-foreground' : 'text-white'
              )}>
                HAPPY FARM
              </span>
              <Image
                src="/images/logo.png"
                alt="Happy Farm"
                width={40}
                height={23}
                className="transition-all duration-300 flex-shrink-0"
                priority
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6" aria-label="التنقل الرئيسي">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-sm font-semibold transition-colors duration-200',
                    isScrolled
                      ? 'text-foreground hover:text-primary'
                      : 'text-white/90 hover:text-white'
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-accent text-white text-sm font-bold hover:opacity-90 transition-opacity duration-200 shadow-md"
              >
                اطلب الآن
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'md:hidden flex items-center justify-center w-11 h-11 rounded-md transition-colors order-first',
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white'
              )}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#order"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.2 }}
                className="mt-4 inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-white text-base font-bold hover:opacity-90 transition-opacity shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                اطلب الآن
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
