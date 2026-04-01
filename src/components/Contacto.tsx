'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Zap, Sparkles } from 'lucide-react'

export default function Contacto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={ref} className="section bg-[#060610] py-24 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left Side: Copy & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="pill mb-8 inline-flex border-[#B8FF2E]/30 bg-[#B8FF2E]/5 text-[#B8FF2E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse mr-2" />
              Diagnóstico gratuito
            </div>
            <h2 className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8">
              <span className="text-white/20">¿Listo para</span><br />
              <span className="text-[#B8FF2E] acid-glow">empezar?</span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed mb-10 max-w-md text-lg">
              Analizamos tu operativa actual y diseñamos tu sistema de automatización en una sesión estratégica de 30 minutos.
              <span className="text-white/60"> Sin compromiso.</span>
            </p>

            {/* Bullets */}
            <div className="space-y-4 mb-12">
              {[
                'Análisis gratuito de pérdidas actuales',
                'Diseño del sistema adaptado a tu clínica',
                'Presupuesto claro y sin sorpresas',
                'Instalación del Setup incluído',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
                  <span className="text-white/50 text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>

            {/* Social proof Table */}
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
              <div className="mono text-[9px] text-white/20 mb-3 tracking-widest uppercase">// Últimas instalaciones</div>
              {[
                { loc: 'Fisioterapia · Madrid',          val: '14 horas libres/mes en recepción' },
                { loc: 'Clínica dental · Sevilla',       val: '−42% no-shows en implantes'       },
                { loc: 'Medicina Estética · Barcelona',  val: '+22 sesiones reactivadas/mes'     },
                { loc: 'Psicología · Bilbao',            val: '+24 reseñas (4.9 estrellas)'      },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-white/30 text-xs font-medium">{s.loc}</span>
                  <span className="text-[#B8FF2E] text-xs font-bold mono italic">{s.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: CTA Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-[#B8FF2E]/5 blur-3xl rounded-[3rem] pointer-events-none" />
            
            <div className="relative card p-8 md:p-12 border border-white/10 bg-[#0A0A15] rounded-[2.5rem] overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={120} className="text-[#B8FF2E]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#B8FF2E] flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(184,255,46,0.3)]">
                  <Sparkles size={24} className="text-black" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                  30 minutos.<br />
                  <span className="text-[#B8FF2E]">Un análisis que vale dinero.</span>
                </h3>
                
                <p className="text-white/40 font-medium pb-10 mb-10 leading-relaxed text-sm md:text-base">
                  En la sesión de diagnóstico vemos juntos cuánto estás perdiendo ahora mismo
                  y qué flujos tienen más impacto en tu tipo de clínica.
                  <br/> <br/>Sales con números reales, no con promesas genéricas.
                </p>

                <div className="space-y-6">
                  <a 
                    href="/diagnostico" 
                    className="btn-acid w-full justify-center py-6 text-lg group"
                  >
                    Solicitar diagnóstico gratuito <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 opacity-40">
                      <Shield size={12} className="text-[#B8FF2E]" />
                      <span className="mono text-[10px] uppercase tracking-widest text-white">Sesión 100% gratuita · Sin obligaciones</span>
                    </div>
                    <p className="text-[10px] text-white/20 font-mono text-center uppercase tracking-widest">
                      Respondemos en menos de 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
