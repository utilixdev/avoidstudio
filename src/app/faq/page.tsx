'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const faqs = [
  {
    q: 'Quin ROI puc esperar realment?',
    a: 'La mitjana dels nostres sistemes se situa en ×4 el primer any. Recuperem facturació que ja tenies però perdies per oblits, cancel·lacions no cobertes o falta de seguiment en leads. Una clínica amb 8 no-shows/mes a 60€ = 480€/mes recuperables.',
  },
  {
    q: 'He de canviar el meu programari actual?',
    a: 'No. Som agnòstics al programari. Ens connectem al que ja fas servir (Google Calendar) mitjançant n8n per crear una capa d\'intel·ligència superior. Sense migracions, sense interrupcions.',
  },
  {
    q: 'Què passa amb la privacitat dels meus pacients?',
    a: 'Totes les automatitzacions compleixen el RGPD. Fem servir xifrat de cap a cap i les dades només s\'utilitzen per als disparadors (triggers) que tu autoritzes. Les dades no surten de la teva infraestructura.',
  },
  {
    q: 'Quant de temps he de dedicar-hi?',
    a: 'La instal·lació és 100% Done-For-You. Només necessitem 2 hores del teu temps: una per al diagnòstic i una altra per a la validació final. Després el sistema treballa sol.',
  },
  {
    q: 'Funciona amb qualsevol tipus de clínica?',
    a: 'Sí. Fisioteràpia, odontologia, psicologia, osteopatia, nutrició, estètica mèdica, veterinària — qualsevol negoci que visqui de les cites concertades. El sistema s\'adapta al sector.',
  },
  {
    q: 'Què passa si un pacient no té WhatsApp?',
    a: 'El sistema detecta el número i només envia si el número té WhatsApp actiu. Si no en té, la cita queda marcada com a pendent manual al Safety Net perquè l\'equip pugui trucar.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState<number | null>(null)

  // GENERADOR DE FAQ SCHEMA (SEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <main className="bg-[#04040A]">
      {/* Injecció de l'Schema per a Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Navbar activePage="faq" />
      
      <section id="faq" ref={ref} className="section min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase"
            >
              <span className="text-white/20">Preguntes</span><br />
              <span className="text-[#B8FF2E] acid-glow">freqüents.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col border-t border-white/[0.06]">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                className="border-b border-white/[0.06]"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-8 text-left group"
                >
                  <span className={`text-base font-bold transition-colors ${open === i ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                    {f.q}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: open === i ? 'rgba(184,255,46,0.15)' : 'rgba(255,255,255,0.04)',
                      border: open === i ? '1px solid rgba(184,255,46,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {open === i
                      ? <Minus size={14} className="text-[#B8FF2E]" />
                      : <Plus size={14} className="text-white/30" />
                    }
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/40 text-sm leading-relaxed pb-8 font-medium max-w-2xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section> 

      <Footer />
    </main>
  )
}