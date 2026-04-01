'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Check, X, ChevronDown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── CONFIGURACIÓN DE DATOS ──────────────────────────────────────

const siList = [
  { n: '01', text: 'Tienes un volumen estable de pacientes y la gestión manual te frena.' },
  { n: '02', text: 'Buscas una estructura que funcione sin depender de ti constantemente.' },
  { n: '03', text: 'Estás dispuesto a implementar cambios para escalar facturación.' },
]

const noList = [
  'Tu clínica está en fase de idea o no genera facturación real.',
  'No tienes una estructura mínima de negocio para optimizar.',
  'Solo buscas información sin intención de invertir en sistemas.',
]

const results = [
  { val: '14 horas libres/mes en recepción', label: 'Fisioterapia · Madrid' },
  { val: '−42% no-shows en implantes', label: 'Clínica dental · Sevilla' },
  { val: '+22 sesiones reactivadas/mes', label: 'Medicina Estética · Barcelona' },
  { val: '+24 reseñas (4.9 estrellas)', label: 'Psicología · Bilbao' },
]

const roles = ['Fundador/a', 'CEO / Director General', 'Director de Operaciones', 'Socio/a', 'Otro']
const sectors = ['Fisioterapia', 'Clínica dental / Salud', 'Psicología', 'Nutrición', 'Estética médica', 'Otro']
const revenues = ['Menos de 3.000€/mes', '3.000€ – 10.000€/mes', '10.000€ – 30.000€/mes', 'Más de 30.000€/mes']

// ── COMPONENTES DE APOYO ───────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Input({ label, placeholder, value, onChange, type = 'text' }: any) {
  return (
    <div className="w-full">
      <label className="block text-[9px] font-black uppercase tracking-widest text-[#B8FF2E]/40 mb-3">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-white/10 focus:border-[#B8FF2E] pb-3 text-white font-bold placeholder:text-white/15 outline-none transition-colors text-sm"
      />
    </div>
  )
}

function Select({ label, options, value, onChange }: any) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative w-full">
      <label className="block text-[9px] font-black uppercase tracking-widest text-[#B8FF2E]/40 mb-3">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-transparent border-b border-white/10 pb-3 text-left outline-none"
      >
        <span className={`text-sm font-bold ${value ? 'text-white' : 'text-white/20'}`}>
          {value || 'Seleccionar...'}
        </span>
        <ChevronDown size={14} className={`text-[#B8FF2E]/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 z-50 bg-[#0A0A14] border border-white/10 mt-1 max-h-60 overflow-y-auto"
          >
            {options.map((opt: string) => (
              <button
                key={opt} type="button"
                onClick={() => { onChange(opt); setOpen(false) }}
                className="w-full text-left px-5 py-3 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.03] flex justify-between items-center"
              >
                {opt} {value === opt && <Check size={12} className="text-[#B8FF2E]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── PÁGINA MAESTRA ─────────────────────────────────────────────

export default function DiagnosticoPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  
  // Form State
  const [form, setForm] = useState({
    nombre: '', email: '', tel: '', rol: '', clinica: '', sector: '', facturacion: ''
  })

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' })

  // Dentro de DiagnosticoPage()
const [loading, setLoading] = useState(false) // Opcional: para feedback visual

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (response.ok) {
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      alert("Hubo un error al enviar. Por favor, inténtalo de nuevo.")
    }
  } catch (error) {
    console.error("Error:", error)
  } finally {
    setLoading(false)
  }
}

  if (submitted) {
    return (
      <main className="bg-[#04040A] min-h-screen text-white">
        <Navbar activePage="diagnostico" />
        <section className="pt-60 pb-20 px-6 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#B8FF2E]/10 border border-[#B8FF2E]/20 flex items-center justify-center mx-auto mb-10">
            <Check size={40} className="text-[#B8FF2E]" />
          </div>
          <h1 className="text-5xl font-extrabold uppercase tracking-tighter mb-6">Solicitud Recibida</h1>
          <p className="text-white/40 mb-10 leading-relaxed">Te contactaremos en menos de *24 horas* para agendar tu sesión de diagnóstico estratégico.</p>
          <a href="/" className="btn-acid inline-flex">Volver al inicio</a>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-[#04040A] text-white overflow-x-hidden">
      <Navbar activePage="diagnostico" />

      {/* HERO */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-20 pt-40 grid-bg">
        <div className="max-w-4xl relative z-10">
          <div className="pill mb-8 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
            Diagnóstico gratuito
          </div>
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-[0.8] tracking-[-0.05em] uppercase mb-8">
            <span className="text-white/10">¿Es esto</span><br />
            <span className="text-[#B8FF2E] acid-glow">para ti?</span>
          </h1>
          <p className="text-white/30 text-lg md:text-xl max-w-xl font-medium mb-12">
            Antes de hablar, queremos asegurarnos de que tiene sentido para los dos.
            Lee esto con honestidad.          </p>
          <button onClick={scrollToForm} className="btn-acid inline-flex group">
            Ir directamente al formulario <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* BLOQUE SÍ / NO */}
      <section className="section border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <Check size={20} className="text-[#B8FF2E]" />
              <h2 className="font-black text-sm uppercase tracking-[0.2em] text-[#B8FF2E]">Sí es para ti si...</h2>
            </div>
            <div className="space-y-4">
              {siList.map((item, i) => (
                <div key={i} className="p-6 border border-[#B8FF2E]/10 bg-[#B8FF2E]/[0.03] flex gap-6">
                  <span className="mono text-[#B8FF2E]/30 text-xs font-bold pt-1">{item.n}</span>
                  <p className="text-white/70 text-sm font-semibold leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-10">
              <X size={20} className="text-red-500" />
              <h2 className="font-black text-sm uppercase tracking-[0.2em] text-red-500">No es para ti si...</h2>
            </div>
            <div className="space-y-4">
              {noList.map((text, i) => (
                <div key={i} className="p-6 border border-white/5 bg-white/[0.02] flex gap-6">
                  <X size={14} className="text-white/20 pt-1" />
                  <p className="text-white/30 text-sm font-medium">{text}</p>
                </div>
              ))}
            </div>
            {/* Social Proof Mini */}
            <div className="mt-10 p-6 border border-white/5 bg-black/40">
              <div className="mono text-[10px] text-white/30 mb-4 uppercase tracking-tighter"> - Resultados reales - </div>
              {results.map((r, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/40 text-xs">{r.label}</span>
                  <span className="text-[#B8FF2E] font-black text-xs mono">{r.val}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FORMULARIO UNIFICADO */}
      <section ref={formRef} className="section bg-[#060610] scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Solicitud de <span className="text-[#B8FF2E]">Sesión</span></h2>
            <p className="text-white/40 font-medium">Completa los datos y te contactaremos en 24h.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
              <Input label="Nombre" placeholder="Tu nombre" value={form.nombre} onChange={(v:any)=>setForm({...form, nombre: v})} />
              <Input label="WhatsApp" placeholder="+34 123 456 789" value={form.tel} onChange={(v:any)=>setForm({...form, tel: v})} type="tel" />
            </div>
            <Input label="Email" placeholder="nombre@clinica.com" value={form.email} onChange={(v:any)=>setForm({...form, email: v})} type="email" />
            
            <div className="grid md:grid-cols-2 gap-10">
              <Select label="Tu cargo" options={roles} value={form.rol} onChange={(v:any)=>setForm({...form, rol: v})} />
              <Select label="Sector" options={sectors} value={form.sector} onChange={(v:any)=>setForm({...form, sector: v})} />
            </div>
            
            <Input label="Nombre de la clínica" placeholder="Ej: Clínica Dental Martínez" value={form.clinica} onChange={(v:any)=>setForm({...form, clinica: v})} />
            <Select label="Facturación Mensual" options={revenues} value={form.facturacion} onChange={(v:any)=>setForm({...form, facturacion: v})} />

            <div className="pt-10">
              <button 
                  type="submit" 
                  disabled={loading} 
                  className={`btn-acid w-full justify-center py-6 text-lg transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Enviando... <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar solicitud y agendar sesión <ArrowRight size={20} />
                    </span>
                  )}
                </button>
              <p className="text-center text-[10px] text-white/30 mt-6 mono uppercase tracking-widest">
                Llamada estratégica · 30 minutos · Sin compromiso
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}