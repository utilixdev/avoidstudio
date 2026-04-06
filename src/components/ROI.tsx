'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Euro, ArrowRight, Info, TrendingDown, Clock, RefreshCw } from 'lucide-react'

// ── FÓRMULA CANÒNICA (idèntica a /perdudes) ────────────────────
// perdudaEquip    = persones × 15h/set × 4set × 15€/h
// perdudaPacients = cites × 0.35 × preu × 0.4
// recNoshow        = perdudaNoshow × 0.38
// recEquip         = perdudaEquip × 0.60
// recReact         = cites × 0.35 × preu × 0.20
// recBuits         = noshowsMes × preu × 0.25

export default function ROI() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showInfo, setShowInfo] = useState(false)

  const [citas, setCitas]           = useState(160)
  const [precio, setPrecio]         = useState(90)
  const [noshow, setNoshow]         = useState(18)
  const [personasEquipo, setPersonas] = useState(2)

  // Pèrdues
  const noshowsMes      = Math.round(citas * noshow / 100)
  const perdidaNoshow   = noshowsMes * precio
  const perdidaEquipo   = personasEquipo * 15 * 4 * 15
  const perdidaPacientes = Math.round(citas * 0.35 * precio * 0.4)
  const perdidaTotal    = perdidaNoshow + perdidaEquipo + perdidaPacientes

  // Recuperació
  const recNoshow   = Math.round(perdidaNoshow * 0.38)
  const recEquipo   = Math.round(perdidaEquipo * 0.60)
  const recReact    = Math.round(citas * 0.35 * precio * 0.20)
  const recHuecos   = Math.round(noshowsMes * precio * 0.25)
  const recTotal    = recNoshow + recEquipo + recReact + recHuecos
  const recAnual    = recTotal * 12
  const pct         = Math.min(Math.round((recTotal / perdidaTotal) * 100), 95)

  const sliders = [
    { label: 'Cites per mes',           val: citas,          set: setCitas,     min: 20,  max: 400, step: 10, suffix: '',  hint: 'Total de cites al mes de tota la clínica' },
    { label: 'Tiquet mitjà / cita',     val: precio,          set: setPrecio,    min: 30,  max: 300, step: 5,  suffix: '€', hint: 'Dental/estètica: 80–200€ · Fisio: 40–70€ · Psicologia: 60–90€' },
    { label: 'Taxa de no-shows',        val: noshow,          set: setNoshow,    min: 5,   max: 40,  step: 1,  suffix: '%', hint: 'Mitjana sector privat: 14–22%. Si no ho saps exactament, deixa 18%.' },
    { label: 'Persones a l\'equip',     val: personasEquipo, set: setPersonas,  min: 1,   max: 8,   step: 1,  suffix: '',  hint: 'Persones que gestionen cites, WhatsApps i confirmacions.' },
  ]

  return (
    <section id="roi" ref={ref} className="section border-y border-white/5 py-12 md:py-32 overflow-hidden bg-[#04040A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT: SLIDERS + DESGLOSSAMENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="pill mb-8 inline-flex border-[#B8FF2E]/30 bg-[#B8FF2E]/5 text-[#B8FF2E]">
              <Euro size={10} className="mr-2" />
              Calculadora de pèrdues reals
            </div>

            <h2 className="text-[clamp(2.2rem,5vw,5rem)] font-extrabold leading-[1] md:leading-[0.85] tracking-[-0.04em] uppercase mb-4">
              <span className="text-white/20">Quant et</span><br />
              <span className="text-[#B8FF2E] acid-glow">costen?</span>
            </h2>

            <p className="text-white/35 text-sm font-medium leading-relaxed mb-10 max-w-md">
              Inclou els quatre gotims reals: no-shows, temps d'equip,
              pacients que no tornen i buits sense cobrir.
            </p>

            <div className="flex flex-col gap-8">
              {sliders.map((s, i) => (
                <div key={i} className="w-full">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">{s.label}</span>
                    <span className="mono font-extrabold text-[#B8FF2E] text-sm">
                      {s.suffix === '€' && s.suffix}{s.val}{s.suffix === '%' && '%'}
                      {!s.suffix && s.label.includes('Persones') && ` ${s.val > 1 ? 'persones' : 'persona'}`}
                    </span>
                  </div>
                  <p className="text-white/20 text-[10px] font-medium mb-3">{s.hint}</p>
                  <input
                    type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                    onChange={e => s.set(Number(e.target.value))}
                    className="w-full cursor-pointer appearance-none h-[3px] rounded-full outline-none"
                    style={{
                      accentColor: '#B8FF2E',
                      background: `linear-gradient(to right, #B8FF2E ${((s.val - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.08) ${((s.val - s.min) / (s.max - s.min)) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] text-white/15 mono">
                      {s.suffix === '€' && s.suffix}{s.min}{s.suffix === '%' && '%'}
                    </span>
                    <span className="text-[9px] text-white/15 mono">
                      {s.suffix === '€' && s.suffix}{s.max}{s.suffix === '%' && '%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desglossament pèrdues */}
            <div className="mt-10 w-full overflow-hidden">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">
                Desglossament de pèrdues / mes
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { icon: TrendingDown, label: `${noshowsMes} no-shows × ${precio}€`,                                                                     val: perdidaNoshow,    color: '#EF4444' },
                  { icon: Clock,        label: `${personasEquipo} persona${personasEquipo > 1 ? 'es' : ''} · 15h/set gestionant manualment`, val: perdidaEquipo,    color: '#F97316' },
                  { icon: RefreshCw,    label: '35% de pacients sense seguiment actiu',                                                                    val: perdidaPacientes, color: '#EF4444' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 px-4 py-3 border border-white/[0.04] bg-white/[0.01]">
                    <div className="flex items-center gap-3 min-w-0">
                      <row.icon size={12} style={{ color: row.color, flexShrink: 0 }} />
                      <span className="text-white/30 text-[10px] font-medium mono truncate uppercase">{row.label}</span>
                    </div>
                    <span className="font-bold text-sm flex-shrink-0" style={{ color: row.color }}>
                      −{row.val.toLocaleString('es-ES')}€
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 border border-red-500/20 bg-red-500/[0.04]">
                  <span className="text-white/50 text-xs font-black uppercase tracking-wider">Total / mes</span>
                  <span className="text-red-400 font-extrabold text-lg tracking-tighter">
                    −{perdidaTotal.toLocaleString('es-ES')}€
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: RESULTATS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-4 lg:sticky lg:top-28 mt-12 lg:mt-0 w-full"
          >
            {/* Pèrdua total */}
            <div className="p-7 md:p-8 border border-red-500/20 bg-red-500/[0.03] rounded-2xl w-full">
              <div className="text-[10px] font-black uppercase tracking-widest text-red-400/60 mb-3">
                Pèrdua mensual actual
              </div>
              <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-red-400">
                −{perdidaTotal.toLocaleString('es-ES')}€
              </div>
              <div className="text-white/25 text-xs mt-3 font-medium leading-relaxed">
                No-shows + equip gestionant manualment + pacients que no tornen
              </div>
            </div>

            {/* Recuperació desglossada */}
            <div className="p-7 md:p-8 border border-[#B8FF2E]/20 bg-[#B8FF2E]/[0.03] rounded-2xl w-full">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#B8FF2E]/60 mb-3">
                Recuperació amb AVOID
              </div>
              <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#B8FF2E] mb-4">
                +{recTotal.toLocaleString('es-ES')}€
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { label: 'Reducció de no-shows (38%)',         val: recNoshow },
                  { label: 'Equip alliberat de gestió manual',   val: recEquipo },
                  { label: 'Reactivació pacients adormits',      val: recReact  },
                  { label: 'Buits last-minute coberts',          val: recHuecos },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px]">
                    <span className="text-[#B8FF2E]/50 font-medium">{r.label}</span>
                    <span className="text-[#B8FF2E] font-bold mono">+{r.val.toLocaleString('es-ES')}€</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-white/5 h-1.5 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : {}}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  className="h-full bg-[#B8FF2E]"
                />
              </div>
              <div className="text-white/20 text-[10px] font-medium uppercase tracking-widest">
                {pct}% de recuperació estimada
              </div>
            </div>

            {/* Anual + payback + CTA */}
            <div className="p-6 md:p-7 border border-white/5 bg-white/[0.02] rounded-2xl w-full">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-1">
                    Recuperes el primer any
                  </div>
                  <div className="text-3xl font-extrabold tracking-tighter text-white">
                    +{recAnual.toLocaleString('es-ES')}€
                  </div>
                  <div className="text-white/25 text-[10px] font-medium mt-1">
                    El sistema s'amortitza en menys de 2 mesos
                  </div>
                </div>
                <div className="sm:text-right flex-shrink-0">
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Payback</div>
                  <div className="text-xl font-extrabold text-[#B8FF2E] tracking-tighter">&lt;2 mesos</div>
                </div>
              </div>
              <a href="/diagnostico" className="btn-acid w-full justify-center py-5 text-sm uppercase font-bold group flex items-center">
                Vull recuperar aquests diners <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Fonts col·lapsades */}
            <div className="flex items-start gap-2 px-2 w-full">
              <button onClick={() => setShowInfo(!showInfo)} className="mt-0.5 flex-shrink-0 outline-none">
                <span className="sr-only">Info</span>
                <Info size={11} className="text-white/20 hover:text-white/40 transition-colors" />
              </button>
              <AnimatePresence>
                {showInfo ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[9px] text-white/25 font-medium leading-relaxed overflow-hidden"
                  >
                    Reducció de no-shows del 38% basada en el rang auditat en clíniques privades amb sistemes de recordatori automatitzat (35–45%). El 60% d'alliberació d'equip i la taxa de reactivació són estimacions conservadores. El teu resultat varia segons perfil, tiquet i tipus de clínica. El cost d'instal·lació varia i no està inclòs.
                  </motion.p>
                ) : (
                  <p
                    className="text-[9px] text-white/20 font-medium italic cursor-pointer hover:text-white/35 transition-colors"
                    onClick={() => setShowInfo(true)}
                  >
                    Basat en dades reals de clíniques privades · Toca per veure la metodologia
                  </p>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
