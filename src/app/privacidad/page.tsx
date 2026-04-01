'use client'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function LayoutLegal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="bg-[#04040A] text-white min-h-screen">
      <Navbar activePage="" />
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <a href="/" className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] mono uppercase tracking-widest text-white/50 hover:text-[#B8FF2E] hover:border-[#B8FF2E]/30 transition-all group">
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </a>
      </div>
      <article className="pt-48 pb-32 px-6 max-w-3xl mx-auto">
        <header className="mb-16">
          <div className="mono text-[#B8FF2E] text-[10px] uppercase tracking-[0.3em] mb-4">// Documentación Legal</div>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9]">{title}</h1>
        </header>
        <div className="space-y-12 text-white/40 text-sm leading-relaxed">{children}</div>
      </article>
      <Footer />
    </main>
  )
}

export default function PrivacidadPage() {
  return (
    <LayoutLegal title="Privacidad">
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// Responsable del Tratamiento</h3>
        <p>Los datos recogidos a través de los formularios de diagnóstico de *Avoid Studio* serán tratados con la única finalidad de contactar con el interesado para la sesión estratégica.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// Derechos del Usuario</h3>
        <p>Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición enviando un email a **[Tu Email]**. No cedemos datos a terceros sin tu consentimiento explícito.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// Seguridad de Datos</h3>
        <p>Implementamos medidas técnicas para garantizar que la información de tu clínica esté protegida contra accesos no autorizados.</p>
      </section>
    </LayoutLegal>
  )
}