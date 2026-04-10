'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Check, X, ChevronDown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── CONFIGURACIÓ DE DADES ──────────────────────────────────────

const siList = [
  { n: '01', text: 'Tens un volum estable de pacients i la gestió manual et frena.' },
  { n: '02', text: 'Busques una estructura que funcioni sense dependre de tu constantment.' },
  { n: '03', text: 'Estàs disposat a implementar canvis per escalar la facturació.' },
]

const noList = [
  'La teva clínica està en fase d\'idea o no genera facturació real.',
  'No tens una estructura mínima de negoci per optimitzar.',
  'Només busques informació sense intenció d\'invertir en sistemes.',
]

const results = [
  { val: '14 hores lliures/mes a recepció', label: 'Estalvi estimat en recepció' },
  { val: '−42% no-shows en implants', label: 'Objectiu en no-shows' },
  { val: '+22 sessions reactivades/mes', label: 'Potencial de reactivació' },
  { val: '+24 ressenyes (4.9 estrelles)', label: 'Objectiu en reputació Google' },
]

const roles = ['Fundador/a', 'CEO / Director General', 'Director d\'Operacions', 'Soci/a', 'Altre']
const sectors = ['Fisioteràpia', 'Clínica dental / Salut', 'Psicologia', 'Nutrició', 'Estètica mèdica', 'Altre']
const revenues = ['Menys de 3.000€/mes', '3.000€ – 10.000€/mes', '10.000€ – 30.000€/mes', 'Més de 30.000€/mes']

// ── COMPONENTS DE SUPORT ───────────────────────────────────────

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

// ── PÀGINA MESTRA ─────────────────────────────────────────────

export default function DiagnosticoPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  
  // Form State
  const [form, setForm] = useState({
    nombre: '', email: '', tel: '', rol: '', clinica: '', sector: '', facturacion: ''
  })

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' })

  // Dins de DiagnosticoPage()
const [loading, setLoading] = useState(false) // Opcional: per a feedback visual

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
      alert("Hi ha hagut un error en enviar. Si us plau, torna-ho a intentar.")
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
          <h1 className="text-5xl font-extrabold uppercase tracking-tighter mb-6">Sol·licitud Rebuda</h1>
          <p className="text-white/40 mb-10 leading-relaxed">Et contactarem en menys de *24 hores* per agendar la teva sessió de diagnòstic estratègic.</p>
          <a href="/" className="btn-acid inline-flex">Tornar a l'inici</a>
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
            Diagnòstic gratuït
          </div>
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-[0.8] tracking-[-0.05em] uppercase mb-8">
            <span className="text-white/10">Això és</span><br />
            <span className="text-[#B8FF2E] acid-glow">per a tu?</span>
          </h1>
          <p className="text-white/30 text-lg md:text-xl max-w-xl font-medium mb-12">
            Abans de parlar, volem assegurar-nos que té sentit per als dos.
            Llegeix això amb honestedat.          </p>
          <button onClick={scrollToForm} className="btn-acid inline-flex group">
            Anar directament al formulari <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* BLOC SÍ / NO */}
      <section className="section border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <Check size={20} className="text-[#B8FF2E]" />
              <h2 className="font-black text-sm uppercase tracking-[0.2em] text-[#B8FF2E]">Sí és per a tu si...</h2>
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
              <h2 className="font-black text-sm uppercase tracking-[0.2em] text-red-500">No és per a tu si...</h2>
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
              <div className="mono text-[10px] text-white/30 mb-4 uppercase tracking-tighter"> - Resultats reals - </div>
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

      {/* FORMULARI UNIFICAT */}
      <section ref={formRef} className="section bg-[#060610] scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Sol·licitud de <span className="text-[#B8FF2E]">Sessió</span></h2>
            <p className="text-white/40 font-medium">Omple les dades i et contactarem en 24h.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
              <Input label="Nom" placeholder="El teu nom" value={form.nombre} onChange={(v:any)=>setForm({...form, nombre: v})} />
              <Input label="WhatsApp" placeholder="+34 123 456 789" value={form.tel} onChange={(v:any)=>setForm({...form, tel: v})} type="tel" />
            </div>
            <Input label="Email" placeholder="nom@clinica.com" value={form.email} onChange={(v:any)=>setForm({...form, email: v})} type="email" />
            
            <div className="grid md:grid-cols-2 gap-10">
              <Select label="El teu càrrec" options={roles} value={form.rol} onChange={(v:any)=>setForm({...form, rol: v})} />
              <Select label="Sector" options={sectors} value={form.sector} onChange={(v:any)=>setForm({...form, sector: v})} />
            </div>
            
            <Input label="Nom de la clínica" placeholder="Ex: Clínica Dental Martínez" value={form.clinica} onChange={(v:any)=>setForm({...form, clinica: v})} />
            <Select label="Facturació Mensual" options={revenues} value={form.facturacion} onChange={(v:any)=>setForm({...form, facturacion: v})} />

            <div className="pt-10">
              <button 
                  type="submit" 
                  disabled={loading} 
                  className={`btn-acid w-full justify-center py-6 text-lg transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Enviant... <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar sol·licitud i agendar sessió <ArrowRight size={20} />
                    </span>
                  )}
                </button>
              <p className="text-center text-[10px] text-white/30 mt-6 mono uppercase tracking-widest">
                Trucada estratègica · 30 minuts · Sense compromís
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
