'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problema from '@/components/Problema'
import Sistema from '@/components/Sistema'
import ROI from '@/components/ROI'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problema />
      <Sistema />
      <ROI />
      <Contacto />
      <Footer />
    </main>
  )
}
