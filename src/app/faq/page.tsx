'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const faqs = [
  {
    q: '¿Qué ROI puedo esperar realmente?',
    a: 'La media de nuestros sistemas se sitúa en ×4 el primer año. Recuperamos facturación que ya tenías pero perdías por olvidos, cancelaciones no cubiertas o falta de seguimiento en leads. Una clínica con 8 no-shows/mes a 60€ = 480€/mes recuperables.',
  },
  {
    q: '¿Tengo que cambiar mi software actual?',
    a: 'No. Somos agnósticos al software. Nos conectamos a lo que ya usas (Google Calendar) mediante n8n para crear una capa de inteligencia superior. Sin migraciones, sin interrupciones.',
  },
  {
    q: '¿Qué pasa con la privacidad de mis pacientes?',
    a: 'Todas las automatizaciones cumplen el RGPD. Usamos cifrado de extremo a extremo y los datos solo se utilizan para los disparadores (triggers) que tú autorices. Los datos no salen de tu infraestructura.',
  },
  {
    q: '¿Cuánto tiempo necesito dedicarle?',
    a: 'La instalación es 100% Done-For-You. Solo necesitamos 2 horas de tu tiempo: una para el diagnóstico y otra para la validación final. Después el sistema trabaja solo.',
  },
  {
    q: '¿Funciona con cualquier tipo de clínica?',
    a: 'Sí. Fisioterapia, odontología, psicología, osteopatía, nutrición, estética médica, veterinaria — cualquier negocio que viva de las citas concertadas. El sistema se adapta al sector.',
  },
  {
    q: '¿Qué pasa si un paciente no tiene WhatsApp?',
    a: 'El sistema detecta el número y solo envía si el número tiene WhatsApp activo. Si no lo tiene, la cita queda marcada como pendiente manual en el Safety Net para que el equipo pueda llamar.',
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
      {/* Inyección del Schema para Google */}
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
              <span className="text-white/20">Preguntas</span><br />
              <span className="text-[#B8FF2E] acid-glow">frecuentes.</span>
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