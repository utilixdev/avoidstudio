'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* FILA 1: LOGO Y NAVEGACIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image 
                src="/logo.png" 
                alt="Avoid Studio Logo" 
                width={100} 
                height={25} 
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest max-w-xs leading-relaxed">
              Sistemas de automatización para negocios de alto rendimiento.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              { label: 'Problema', href: '/perdidas' },
              { label: 'Sistema', href: '/sistema' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contacto', href: '/diagnostico' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-[10px] font-bold uppercase tracking-widest text-white/25 hover:text-[#B8FF2E] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* FILA 2: BLOQUE SEO OSONA (IMPORTANTE: FUERA DE LOS CRÉDITOS) */}
        <div className="pt-8 border-t border-white/[0.04]">
          <p className="text-[10px] text-white/20 leading-relaxed text-center md:text-left max-w-5xl">
            <span className="font-bold text-white/40">AVOID Studio · Especialistas en Automatización para Clínicas en Osona. </span> 
            Implementamos sistemas inteligentes de gestión de citas y reducción de no-shows para centros sanitarios, fisioterapeutas y odontólogos en 
            <span className="text-white/30"> Vic, Manlleu, Torelló, Tona, Taradell, Centelles y Balenyà </span>. 
            Damos soporte tecnológico en toda la comarca: 
            <span className="text-white/30"> Roda de Ter, Santa Eugènia de Berga, Gurb, Calldetenes, Sant Julià de Vilatorta, Seva, Hostalets de Balenyà, Sant Hipòlit de Voltregà, Masies de Voltregà, Montesquiu y Prats de Lluçanès</span>. 
            Digitalización mediante WhatsApp Marketing y Google Calendar en la Cataluña Central.
          </p>
        </div>

        {/* FILA 3: LEGAL Y CRÉDITOS FINALES */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-6 items-center">
            <span className="text-[9px] font-medium text-white/20 mono">© 2026 AVOID STRATEGIC STUDIO</span>
            <a href="/aviso-legal" className="text-[9px] text-white/15 hover:text-white/40 transition-colors uppercase tracking-widest">Aviso Legal</a>
            <a href="/privacidad" className="text-[9px] text-white/15 hover:text-white/40 transition-colors uppercase tracking-widest">Privacidad</a>
            <a href="/cookies" className="text-[9px] text-white/15 hover:text-white/40 transition-colors uppercase tracking-widest">Cookies</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse shadow-[0_0_8px_rgba(184,255,46,0.8)]" />
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-bold text-white/35 mono uppercase tracking-widest">
                AvoidStudio es una creación de{' '}
                <a href="https://www.utilix.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8FF2E] transition-colors">
                  UtiLiX
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}