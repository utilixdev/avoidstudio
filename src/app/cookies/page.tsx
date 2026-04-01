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

export default function CookiesPage() {
  return (
    <LayoutLegal title="Cookies">
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// ¿Qué son las cookies?</h3>
        <p>Este sitio utiliza cookies técnicas necesarias para el funcionamiento del sistema de diagnóstico y cookies analíticas para medir el rendimiento de la web.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// Control de Cookies</h3>
        <p>Puedes bloquear o eliminar las cookies a través de la configuración de tu navegador. Ten en cuenta que esto podría afectar a la funcionalidad de los formularios dinámicos.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// Tipos utilizados</h3>
        <p>Utilizamos cookies de sesión para la navegación y cookies de terceros (como Google Analytics) para entender cómo interactúas con nuestra propuesta estratégica.</p>
      </section>
    </LayoutLegal>
  )
}