'use client'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── COMPONENTE DE ESTRUCTURA (Para que no de error de "not defined") ──
function LayoutLegal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="bg-[#04040A] text-white min-h-screen">
      <Navbar activePage="" />
      
      {/* Botón Flotante para Retroceder */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <a 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] mono uppercase tracking-widest text-white/50 hover:text-[#B8FF2E] hover:border-[#B8FF2E]/30 transition-all group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </a>
      </div>

      <article className="pt-48 pb-32 px-6 max-w-3xl mx-auto">
        <header className="mb-16">
          <div className="mono text-[#B8FF2E] text-[10px] uppercase tracking-[0.3em] mb-4">// Documentación Legal</div>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9]">
            {title}
          </h1>
        </header>

        <div className="space-y-12 text-white/40 text-sm leading-relaxed">
          {children}
        </div>
      </article>

      <Footer />
    </main>
  )
}

// ── LA PÁGINA QUE SE EXPORTA ──
export default function AvisoLegalPage() {
  return (
    <LayoutLegal title="Aviso Legal">
      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// 1. Información Titular</h3>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, se informa que *Avoid Studio* es una marca operada por 
          **[Tu Nombre o Empresa]**, con domicilio en **[Tu Dirección]** y contacto en **[Tu Email]**.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// 2. Propiedad Intelectual</h3>
        <p>
          Todo el contenido, diseño de interfaz y sistemas de automatización son propiedad exclusiva de *Avoid Studio*. 
          La reproducción total o parcial sin autorización queda estrictamente prohibida.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">// 3. Uso del Sitio</h3>
        <p>
          El acceso a este sitio web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, 
          las Condiciones Generales de Uso aquí reflejadas.
        </p>
      </section>
    </LayoutLegal>
  )
}