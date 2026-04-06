'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, UserX, TrendingDown, Star, Euro, ChevronDown, Info, RefreshCw, Stethoscope, Scissors, Activity } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── FÓRMULA CANÒNICA (idèntica a ROI.tsx a la home) ─────────────
// perdudaEquip     = persones × 15 × 4 × 15
// perdudaPacients  = cites × 0.35 × preu × 0.4
// recNoshow        = perdudaNoshow × 0.38
// recEquip         = perdudaEquip × 0.60
// recReact         = cites × 0.35 × preu × 0.20
// recBuits         = noshowsMes × preu × 0.25

// ── FADE HELPER ─────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

// ── PERFILS (valors per defecte per sector) ────────────────────
const PERFILES = [
  {
    id: 'fisio',
    label: 'Fisioteràpia',
    icon: Activity,
    defaults: { citas: 100, precio: 50, noshow: 10, personas: 1 },
  },
  {
    id: 'estetica',
    label: 'Estètica',
    icon: Scissors,
    defaults: { citas: 160, precio: 75, noshow: 18, personas: 2 },
  },
  {
    id: 'dental',
    label: 'Clínica Dental',
    icon: Stethoscope,
    defaults: { citas: 300, precio: 120, noshow: 15, personas: 3 },
  },
]

// ── DADES GOTIMS ──────────────────────────────────────────────────
const goteos = [
  {
    icon: UserX,
    n: '01',
    color: '#EF4444',
    title: 'El no-show',
    subtitle: 'El més visible. El que tothom coneix però pocs quantifiquen.',
    stat: '14–22% de les teves cites',
    explainer:
      'Entre el 14% i el 22% de les cites en clíniques privades de salut a Espanya acaben en absència. Si tens 150 cites al mes a 80€ de tiquet i un 18% de no-show, són 27 hores buides × 80€ = 2.160€ al mes que desapareixen sense aparèixer en cap factura. El temps ja estava bloquejat. El professional ja estava disponible. Només faltava el pacient.',
    secondary:
      'Un recordatori automàtic per WhatsApp 48h abans redueix els no-shows entre el 35% i el 45%. En aquest exemple: de 2.160€ a 1.200€ de pèrdua. 960€ recuperats només amb aquest flux.',
  },
  {
    icon: Clock,
    n: '02',
    color: '#F97316',
    title: 'El temps d\'equip',
    subtitle: 'El més costós a escala. I el més fàcil d\'ignorar.',
    stat: '15h/setmana per persona',
    explainer:
      'Confirmar cites per WhatsApp, respondre si venen o no venen, gestionar cancel·lacions a mà, recordar a qui trucar demà... Són entre 2 i 3 hores diàries de feina que no generen cap ingrés directe. A 15€/hora de cost laboral, una persona de l\'equip dedicant 15h/setmana a això val 900€/mes en temps pur. Amb dues persones, 1.800€/mes. Aquests diners existeixen, els estàs pagant, i no apareixen en cap partida de "pèrdues".',
    secondary:
      'El sistema automatitza el 60% d\'aquestes tasques. L\'equip continua sent necessari — però per al que importa: tractar pacients, no perseguir confirmacions.',
  },
  {
    icon: TrendingDown,
    n: '03',
    color: '#EF4444',
    title: 'El pacient que no torna',
    subtitle: 'El més car. I el que ningú veu venir.',
    stat: 'El 35–45% no tornen sols',
    explainer:
      'Entre el 35% i el 45% dels pacients que tenen una primera sessió no tornen si no reben un contacte actiu en les setmanes següents. No és que no vulguin — és que ningú els ha recordat que existeix aquesta opció. Per a una clínica dental amb 150 cites/mes, això és 52 pacients al mes que podrien tornar però no ho fan. Si cada un representa 3 tractaments futurs a 120€, el valor perdut supera els 18.000€ anuals en facturació que ja tenies guanyada.',
    secondary:
      'La reactivació automàtica als 90 dies contacta aquests pacients adormits. El 18–26% d\'ells reserva de nou sense intervenció humana.',
  },
  {
    icon: Star,
    n: '04',
    color: '#F59E0B',
    title: 'La ressenya que no arriba',
    subtitle: 'El gotim de captació. Silenciós però permanent.',
    stat: '87% busca a Google abans de trucar',
    explainer:
      'El 87% dels pacients nous tria clínica basant-se en les ressenyes de Google. Una clínica amb 50 ressenyes no competeix contra una amb 200 — simplement no apareix als primers resultats. Cada pacient satisfet que no deixa ressenya perquè ningú li ho va demanar en el moment correcte és un pacient nou que anirà a la teva competència. El cost d\'oportunitat no es mesura en euros directes, es mesura en pacients que mai no arriben a trucar.',
    secondary:
      'El sistema envia l\'enllaç de ressenya 24h després de cada visita, quan l\'experiència és fresca. La taxa de conversió és 4 vegades major que demanar-la a consulta.',
  },
]

// ── ACORDIÓ ─────────────────────────────────────────────────────
function GoteoItem({ g, i }: { g: typeof goteos[0]; i: number }) {
  const [open, setOpen] = useState(i === 0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      className="border border-white/[0.06] overflow-hidden"
      style={{ borderColor: open ? `${g.color}20` : undefined }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-5 p-6 md:p-8 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div
          className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: open ? `${g.color}18` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${open ? g.color + '35' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          <g.icon size={16} style={{ color: open ? g.color : 'rgba(255,255,255,0.3)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="mono text-[9px] font-black" style={{ color: `${g.color}60` }}>{g.n}</span>
            <span className={`font-extrabold text-sm uppercase tracking-tight transition-colors ${open ? 'text-white' : 'text-white/50'}`}>
              {g.title}
            </span>
          </div>
          <div className="text-white/25 text-xs font-medium">{g.subtitle}</div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="font-extrabold text-sm hidden sm:block" style={{ color: g.color }}>{g.stat}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            style={{ color: open ? g.color : 'rgba(255,255,255,0.2)' }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 pt-0 grid md:grid-cols-2 gap-6">
              <div
                className="p-6 border-l-2 text-white/50 text-sm font-medium leading-relaxed"
                style={{ borderColor: g.color + '40' }}
              >
                {g.explainer}
              </div>
              <div
                className="p-6 flex flex-col justify-between gap-4"
                style={{ background: `${g.color}06`, border: `1px solid ${g.color}15` }}
              >
                <p className="text-white/35 text-xs font-medium leading-relaxed italic">"{g.secondary}"</p>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: `${g.color}60` }}>
                    Impacte real
                  </div>
                  <div className="text-xl font-extrabold tracking-tighter" style={{ color: g.color }}>{g.stat}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── CALCULADORA AMB PERFILS ─────────────────────────────────────
function Calculadora() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showInfo, setShowInfo] = useState(false)
  const [activePerfil, setActivePerfil] = useState(PERFILES[1])

  const [citas, setCitas]             = useState(PERFILES[1].defaults.citas)
  const [precio, setPrecio]           = useState(PERFILES[1].defaults.precio)
  const [noshow, setNoshow]           = useState(PERFILES[1].defaults.noshow)
  const [personasEquipo, setPersonas] = useState(PERFILES[1].defaults.personas)

  const selectPerfil = (p: typeof PERFILES[0]) => {
    setActivePerfil(p)
    setCitas(p.defaults.citas)
    setPrecio(p.defaults.precio)
    setNoshow(p.defaults.noshow)
    setPersonas(p.defaults.personas)
  }

  // ── FÓRMULA CANÒNICA ──────────────────────────────────────────
  const noshowsMes      = Math.round(citas * noshow / 100)
  const perdidaNoshow   = noshowsMes * precio
  const perdidaEquipo   = personasEquipo * 15 * 4 * 15
  const perdidaPacientes = Math.round(citas * 0.35 * precio * 0.4)
  const perdidaTotal    = perdidaNoshow + perdidaEquipo + perdidaPacientes

  const recNoshow   = Math.round(perdidaNoshow * 0.38)
  const recEquipo   = Math.round(perdidaEquipo * 0.60)
  const recReact    = Math.round(citas * 0.35 * precio * 0.20)
  const recHuecos   = Math.round(noshowsMes * precio * 0.25)
  const recTotal    = recNoshow + recEquipo + recReact + recHuecos
  const recAnual    = recTotal * 12
  const pct         = Math.min(Math.round((recTotal / perdidaTotal) * 100), 95)

  const sliders = [
    { label: 'Cites per mes',          val: citas,          set: setCitas,     min: 20,  max: 400, step: 10, suffix: '',  hint: 'Total de cites al mes de tota la clínica' },
    { label: 'Tiquet mitjà / cita',    val: precio,          set: setPrecio,    min: 30,  max: 300, step: 5,  suffix: '€', hint: 'Dental/estètica: 80–200€ · Fisio: 40–70€ · Psicologia: 60–90€' },
    { label: 'Taxa de no-shows',       val: noshow,          set: setNoshow,    min: 5,   max: 40,  step: 1,  suffix: '%', hint: 'Mitjana sector privat Espanya: 14–22%. Si no ho saps, deixa 18%.' },
    { label: 'Persones a l\'equip',    val: personasEquipo, set: setPersonas, min: 1,   max: 8,   step: 1,  suffix: '',  hint: 'Persones que gestionen cites, WhatsApps i confirmacions.' },
  ]

  return (
    <div ref={ref} className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start px-0 sm:px-0 overflow-visible">

      {/* LEFT: CONTROLS */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8 w-full"
      >

        {/* Selector de perfil */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
            Selecciona la teva especialitat
          </span>
          <div className="grid grid-cols-3 gap-2">
            {PERFILES.map(p => {
              const Icon = p.icon
              return (
                <button
                  key={p.id}
                  onClick={() => selectPerfil(p)}
                  className="flex flex-col items-center gap-2 p-4 border transition-all duration-300"
                  style={{
                    borderColor: activePerfil.id === p.id ? '#B8FF2E' : 'rgba(255,255,255,0.05)',
                    background: activePerfil.id === p.id ? 'rgba(184,255,46,0.10)' : 'rgba(255,255,255,0.02)',
                    color: activePerfil.id === p.id ? '#B8FF2E' : 'rgba(255,255,255,0.40)',
                  }}
                >
                  <Icon size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{p.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Sliders amb correcció d'amplada i visibilitat */}
        <div className="flex flex-col gap-8 px-4">
          {sliders.map((s, i) => (
            <div key={i} className="w-full overflow-visible">
              <div className="flex justify-between items-center mb-1.5 w-full pr-1">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">{s.label}</span>
                <span className="mono font-extrabold text-[#B8FF2E] text-sm flex-shrink-0 ml-4">
                  {s.suffix === '€' && s.suffix}{s.val}{s.suffix === '%' && '%'}
                  {!s.suffix && s.label.includes('Persones') && ` ${s.val > 1 ? 'persones' : 'persona'}`}
                </span>
              </div>
              <p className="text-white/20 text-[10px] font-medium mb-3 pr-8">{s.hint}</p>
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
                <span className="text-[9px] text-white/15 mono pr-1">
                  {s.suffix === '€' && s.suffix}{s.max}{s.suffix === '%' && '%'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desglossament pèrdues */}
        <div className="border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6 w-full">
          <div className="mono text-[9px] text-white/20 mb-4">// Desglossament mensual de pèrdues</div>
          <div className="flex flex-col gap-3">
            {[
              { icon: UserX,        label: `${noshowsMes} no-shows × ${precio}€/cita`,                                          val: perdidaNoshow,    color: '#EF4444' },
              { icon: Clock,        label: `${personasEquipo} persona${personasEquipo > 1 ? 'es' : ''} × 15h/set × 15€/h × 4 set`, val: perdidaEquipo,    color: '#F97316' },
              { icon: TrendingDown, label: '35% pacients sense seguiment actiu',                                                  val: perdidaPacientes, color: '#EF4444' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <row.icon size={11} style={{ color: row.color, flexShrink: 0 }} />
                  <span className="text-white/30 text-[10px] font-medium mono truncate">{row.label}</span>
                </div>
                <span className="font-bold text-sm flex-shrink-0" style={{ color: row.color }}>
                  −{row.val.toLocaleString('es-ES')}€
                </span>
              </div>
            ))}
            <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
              <span className="text-white/50 text-xs font-black uppercase tracking-wider">Total / mes</span>
              <span className="text-red-400 font-extrabold text-xl tracking-tighter">
                −{perdidaTotal.toLocaleString('es-ES')}€
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: RESULTATS */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="flex flex-col gap-4 lg:sticky lg:top-28 w-full"
      >
        {/* Pèrdua */}
        <div className="p-6 border border-red-500/20 bg-red-500/[0.03]">
          <div className="text-[10px] font-black uppercase tracking-widest text-red-400/60 mb-2">
            Pèrdua mensual actual
          </div>
          <div className="text-4xl font-extrabold tracking-tighter text-red-400">
            −{perdidaTotal.toLocaleString('es-ES')}€
          </div>
          <div className="text-white/25 text-[10px] mt-2 font-medium">
            No-shows + equip + pacients sense seguiment
          </div>
        </div>

        {/* Recuperació */}
        <div className="p-6 border border-[#B8FF2E]/20 bg-[#B8FF2E]/[0.03]">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#B8FF2E]/60 mb-2">
            Recuperació amb AVOID
          </div>
          <div className="text-4xl font-extrabold tracking-tighter text-[#B8FF2E] mb-3">
            +{recTotal.toLocaleString('es-ES')}€
          </div>
          <div className="flex flex-col gap-1.5 mb-3">
            {[
              { label: 'Reducció no-shows (38%)',     val: recNoshow },
              { label: 'Equip alliberat (60%)',        val: recEquipo },
              { label: 'Reactivació pacients',         val: recReact  },
              { label: 'Buits last-minute',            val: recHuecos },
            ].map((r, i) => (
              <div key={i} className="flex justify-between text-[10px]">
                <span className="text-[#B8FF2E]/45 font-medium">{r.label}</span>
                <span className="text-[#B8FF2E] font-bold mono">+{r.val.toLocaleString('es-ES')}€</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-white/5 h-1 overflow-hidden">
            <motion.div
              animate={inView ? { width: `${pct}%` } : { width: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="h-full bg-[#B8FF2E]"
            />
          </div>
          <div className="text-white/20 text-[10px] mt-1.5 font-medium">
            {pct}% de recuperació estimada per a aquest perfil
          </div>
        </div>

        {/* Anual + CTA */}
        <div className="p-6 border border-white/5 bg-white/[0.02]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-1">
                Recuperes el primer any
              </div>
              <div className="text-3xl font-extrabold tracking-tighter text-white">
                +{recAnual.toLocaleString('es-ES')}€
              </div>
              <div className="text-white/25 text-[10px] mt-1">
                El sistema s'amortitza en menys de 2 mesos
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Payback</div>
              <div className="text-xl font-extrabold text-[#B8FF2E] tracking-tighter">&lt;2 mesos</div>
            </div>
          </div>
          <a href="/diagnostico" className="btn-acid w-full justify-center py-4 text-[11px]">
            Sol·licitar diagnòstic gratuït <ArrowRight size={13} />
          </a>
        </div>

        {/* Font */}
        <div className="flex items-start gap-2 px-2">
          <button onClick={() => setShowInfo(!showInfo)} className="mt-0.5 flex-shrink-0">
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
                Reducció de no-shows del 38% basada en el rang auditat en clíniques privades amb sistemes de recordatori automatitzat (35–45%, fonts: Auriia Studio 2026, DoctorConnect 2025). El 60% d'alliberació d'equip i la taxa de reactivació són estimacions conservadores. El teu resultat varia segons perfil, tiquet i tipus de clínica. El cost d'instal·lació varia i no està inclòs.
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
  )
}

// ── PÀGINA PRINCIPAL ─────────────────────────────────────────────
export default function PerdidasPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[65vh] flex flex-col justify-end pb-16 px-6 md:px-20 pt-40 overflow-hidden grid-bg">
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="pill mb-8 inline-flex"
            style={{ borderColor: 'rgba(239,68,68,0.25)', color: '#EF4444', background: 'rgba(239,68,68,0.04)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Anàlisi de pèrdues reals · Quatre gotims
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6"
          >
            <span className="text-white/15">El que no</span><br />
            <span className="text-red-500" style={{ textShadow: '0 0 60px rgba(239,68,68,0.25)' }}>veus.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-white/35 text-base md:text-xl font-medium max-w-2xl leading-relaxed"
          >
            La teva clínica té quatre gotims diferents de facturació perduda.
            Cap apareix a la comptabilitat. Tots es poden tancar.{' '}
            <span className="text-white/55">Això és el que t'estan costant.</span>
          </motion.p>
        </div>
      </section>

      {/* RESUM STATS */}
      <section className="section py-12 md:py-16 border-b border-white/5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '14–22%', label: 'Taxa de no-shows en clíniques privades', color: '#EF4444' },
            { val: '15h',    label: 'Per setmana d\'equip gestionant cites', color: '#F97316' },
            { val: '35%',    label: 'Pacients que no tornen sense seguiment', color: '#EF4444' },
            { val: '87%',    label: 'Pacients nous que busquen a Google', color: '#B8FF2E' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="p-5 border bg-white/[0.01] text-center" style={{ borderColor: `${s.color}15` }}>
                <div className="text-xl md:text-2xl font-extrabold tracking-tighter mb-1" style={{ color: s.color }}>
                  {s.val}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 leading-tight">
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ELS 4 GOTIMS */}
      <section className="section px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-12 md:mb-16">
            <div className="pill mb-6 inline-flex" style={{ borderColor: 'rgba(239,68,68,0.25)', color: '#EF4444', background: 'rgba(239,68,68,0.04)' }}>
              Els quatre gotims
            </div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
              <span className="text-white/15">Per on se'n va</span><br />
              <span className="text-red-500">els diners.</span>
            </h2>
          </FadeIn>
          <div className="flex flex-col gap-2">
            {goteos.map((g, i) => <GoteoItem key={i} g={g} i={i} />)}
          </div>
        </div>
      </section>

      {/* L'EFECTE COMPOST */}
      <section className="section bg-[#060610] border-y border-white/5 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <div className="pill mb-8 inline-flex" style={{ borderColor: 'rgba(239,68,68,0.25)', color: '#EF4444', background: 'rgba(239,68,68,0.04)' }}>
              L'efecte compost
            </div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8">
              <span className="text-white/15">Junts,</span><br />
              <span className="text-red-500">es multipliquen.</span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed text-sm md:text-base mb-6">
              El problema no és que existeixin els no-shows. És que sense sistema,
              els quatre gotims actuen alhora i cada un alimenta el següent.
            </p>
            <p className="text-white/30 font-medium leading-relaxed text-sm">
              Un pacient que no confirma i no apareix → temps d'equip perdut
              intentant localitzar-lo → buit que no es cobreix → algú que
              probablement no tornarà → i que mai no deixarà una ressenya.{' '}
              <span className="text-white/55 font-semibold">Un sol no-show activa els quatre gotims.</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-3">
              {[
                { from: 'No confirma la cita',          to: 'Equip inverteix 20 min a localitzar',              color: '#F97316' },
                { from: 'No apareix',                   to: 'Buit buit — 60–200€ perduts',                      color: '#EF4444' },
                { from: 'Sense seguiment posterior',    to: 'No torna en els 3 mesos següents',                  color: '#EF4444' },
                { from: 'Sense petició de ressenya',    to: 'Google no creix. Nous pacients a la competència.', color: '#F59E0B' },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border"
                  style={{ borderColor: `${row.color}12`, background: `${row.color}04` }}>
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: row.color }} />
                    {i < 3 && <div className="w-px h-8 mt-2" style={{ background: `${row.color}30` }} />}
                  </div>
                  <div>
                    <div className="text-white/55 text-xs font-bold mb-1">{row.from}</div>
                    <div className="text-white/25 text-xs font-medium flex items-center gap-2">
                      <ArrowRight size={10} style={{ color: row.color }} />
                      {row.to}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="section px-6" id="calculadora">
        <div className="max-w-5xl mx-auto overflow-visible">
          <FadeIn className="mb-12 md:mb-16">
            <div className="pill mb-6 inline-flex">
              <Euro size={10} />
              Calculadora personalitzada
            </div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
              <span className="text-white/15">Els teus números,</span><br />
              <span className="text-[#B8FF2E] acid-glow">la teva pèrdua real.</span>
            </h2>
            <p className="text-white/30 text-sm font-medium mt-4 max-w-lg leading-relaxed">
              Selecciona la teva especialitat per carregar els valors per defecte del sector,
              o ajusta manualment cada paràmetre.
              El càlcul inclou els quatre gotims, no només els no-shows.
            </p>
          </FadeIn>
          <Calculadora />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section bg-[#060610] border-t border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8">
              <span className="text-white/15">Tot això</span><br />
              <span className="text-[#B8FF2E] acid-glow">té solució.</span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed max-w-2xl mx-auto mb-4 text-base">
              Un sistema que confirma automàticament, recorda, omple buits,
              reactiva pacients adormits i demana ressenyes en el moment exacte.
            </p>
            <p className="text-white/55 font-semibold text-lg mb-12">
              Tu passes consulta. Nosaltres omplim la cadira.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/diagnostico" className="btn-acid w-full sm:w-auto px-10">
                Sol·licitar diagnòstic gratuït <ArrowRight size={13} />
              </a>
              <a href="/#sistema" className="btn-ghost w-full sm:w-auto">
                Veure com funciona el sistema
              </a>
            </div>
            <p className="text-white/15 text-[10px] font-medium mt-8 mono">
              Sense compromís · Setup instal·lat · 7 fluxos actius 24/7
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
