import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/01_Hero'
import Products from '@/components/sections/02_Products'
import HowToOrder from '@/components/sections/03_HowToOrder'
import About from '@/components/sections/04_About'
import Order from '@/components/sections/05_Order'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <HowToOrder />
        <About />
        <Order />
      </main>
      <Footer />
    </>
  )
}
