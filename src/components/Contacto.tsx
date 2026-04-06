'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Zap, Sparkles } from 'lucide-react'

export default function Contacto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={ref} className="section bg-[#060610] py-20 md:py-40 overflow-hidden">
      {/* Afegim un extra de padding horitzontal en mòbil (px-4) per evitar que el text toqui les vores */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Left Side: Copy & Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="pill mb-6 inline-flex border-[#B8FF2E]/30 bg-[#B8FF2E]/5 text-[#B8FF2E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse mr-2" />
              Diagnòstic gratuït
            </div>
            {/* Ajustem el leading a 0.9 o 1 en mòbil per evitar que es tallin les ascendents/descendents de les lletres */}
            <h2 className="text-[clamp(2.2rem,8vw,5rem)] font-extrabold leading-[1] md:leading-[0.85] tracking-[-0.04em] uppercase mb-8">
              <span className="text-white/20">¿Llest per</span><br />
              <span className="text-[#B8FF2E] acid-glow">començar?</span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed mb-10 max-w-md text-base md:text-lg">
              Analitzem la teva operativa actual i dissenyem el teu sistema d'automatització en una sessió estratègica de 30 minuts.
              <span className="text-white/60"> Sense compromís.</span>
            </p>

            {/* Bullets */}
            <div className="space-y-4 mb-12">
              {[
                'Anàlisi gratuïta de pèrdues actuals',
                'Disseny del sistema adaptat a la teva clínica',
                'Pressupost clar i sense sorpreses',
                'Instal·lació del Setup inclosa',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
                  <span className="text-white/50 text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>

            {/* Social proof Table - Ajust de padding intern per a mòbil */}
            <div className="p-5 md:p-6 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
              <div className="mono text-[9px] text-white/20 mb-3 tracking-widest uppercase">// Últimes instal·lacions</div>
              {[
                { loc: 'Fisioteràpia · Madrid',       val: '14h lliures' },
                { loc: 'Clínica dental · Sevilla',    val: '−42% no-shows' },
                { loc: 'Medicina Estètica · BCN',     val: '+22 sessions' },
                { loc: 'Psicologia · Bilbao',         val: '4.9 ⭐' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-white/30 text-[10px] md:text-xs font-medium">{s.loc}</span>
                  <span className="text-[#B8FF2E] text-[10px] md:text-xs font-bold mono italic text-right">{s.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#B8FF2E]/5 blur-3xl rounded-[3rem] pointer-events-none" />
            
            <div className="relative card p-6 md:p-12 border border-white/10 bg-[#0A0A15] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap size={120} className="text-[#B8FF2E]" />
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#B8FF2E] flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_20px_rgba(184,255,46,0.3)]">
                  <Sparkles size={20} className="text-black" />
                </div>
                
                <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                  30 minuts.<br />
                  <span className="text-[#B8FF2E]">Una anàlisi que val diners.</span>
                </h3>
                
                <p className="text-white/40 font-medium mb-8 leading-relaxed text-xs md:text-base">
                  A la sessió de diagnòstic veiem junts quant estàs perdent ara mateix
                  i quins fluxos tenen més impacte a la teva clínica.
                </p>

                <div className="space-y-6">
                  <a 
                    href="/diagnostico" 
                    className="btn-acid w-full justify-center py-5 md:py-6 text-base md:text-lg group"
                  >
                    Sol·licitar diagnòstic <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 opacity-40">
                      <Shield size={12} className="text-[#B8FF2E]" />
                      <span className="mono text-[8px] md:text-[10px] uppercase tracking-widest text-white text-center">Sessió gratuïta · Sense compromís</span>
                    </div>
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
