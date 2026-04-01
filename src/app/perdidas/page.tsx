'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, UserX, TrendingDown, Star, Euro, ChevronDown, Info, RefreshCw, Stethoscope, Scissors, Activity } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── FÓRMULA CANÓNICA (idéntica a ROI.tsx en la home) ─────────────
// perdidaEquipo    = personas × 15 × 4 × 15
// perdidaPacientes = citas × 0.35 × precio × 0.4
// recNoshow        = perdidaNoshow × 0.38
// recEquipo        = perdidaEquipo × 0.60
// recReact         = citas × 0.35 × precio × 0.20
// recHuecos        = noshowsMes × precio × 0.25

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

// ── PERFILES (valores por defecto por sector) ────────────────────
const PERFILES = [
  {
    id: 'fisio',
    label: 'Fisioterapia',
    icon: Activity,
    defaults: { citas: 100, precio: 50, noshow: 10, personas: 1 },
  },
  {
    id: 'estetica',
    label: 'Estética',
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

// ── GOTEOS DATA ──────────────────────────────────────────────────
const goteos = [
  {
    icon: UserX,
    n: '01',
    color: '#EF4444',
    title: 'El no-show',
    subtitle: 'El más visible. El que todos conocen pero pocos cuantifican.',
    stat: '14–22% de tus citas',
    explainer:
      'Entre el 14% y el 22% de las citas en clínicas privadas de salud en España terminan en ausencia. Si tienes 150 citas al mes a 80€ de ticket y un 18% de no-show, son 27 horas vacías × 80€ = 2.160€ al mes que desaparecen sin aparecer en ninguna factura. El tiempo ya estaba bloqueado. El profesional ya estaba disponible. Solo faltaba el paciente.',
    secondary:
      'Un recordatorio automático por WhatsApp 48h antes reduce los no-shows entre el 35% y el 45%. En ese ejemplo: de 2.160€ a 1.200€ de pérdida. 960€ recuperados solo con este flujo.',
  },
  {
    icon: Clock,
    n: '02',
    color: '#F97316',
    title: 'El tiempo de equipo',
    subtitle: 'El más costoso a escala. Y el más fácil de ignorar.',
    stat: '15h/semana por persona',
    explainer:
      'Confirmar citas por WhatsApp, responder si vienen o no vienen, gestionar cancelaciones a mano, recordar a quién llamar mañana... Son entre 2 y 3 horas diarias de trabajo que no generan ningún ingreso directo. A 15€/hora de coste laboral, una persona del equipo dedicando 15h/semana a esto vale 900€/mes en tiempo puro. Con dos personas, 1.800€/mes. Ese dinero existe, lo estás pagando, y no aparece en ninguna partida de "pérdidas".',
    secondary:
      'El sistema automatiza el 60% de esas tareas. El equipo sigue siendo necesario — pero para lo que importa: tratar pacientes, no perseguir confirmaciones.',
  },
  {
    icon: TrendingDown,
    n: '03',
    color: '#EF4444',
    title: 'El paciente que no vuelve',
    subtitle: 'El más caro. Y el que nadie ve venir.',
    stat: 'El 35–45% no vuelven solos',
    explainer:
      'Entre el 35% y 45% de los pacientes que tienen una primera sesión no vuelven si no reciben un contacto activo en las semanas siguientes. No es que no quieran — es que nadie les ha recordado que existe esa opción. Para una clínica dental con 150 citas/mes, eso son 52 pacientes al mes que podrían volver pero no lo hacen. Si cada uno representa 3 tratamientos futuros a 120€, el valor perdido supera los 18.000€ anuales en facturación que ya tenías ganada.',
    secondary:
      'La reactivación automática a los 90 días contacta a esos pacientes dormidos. El 18–26% de ellos reserva de nuevo sin intervención humana.',
  },
  {
    icon: Star,
    n: '04',
    color: '#F59E0B',
    title: 'La reseña que no llega',
    subtitle: 'El goteo de captación. Silencioso pero permanente.',
    stat: '87% busca en Google antes de llamar',
    explainer:
      'El 87% de los pacientes nuevos elige clínica basándose en las reseñas de Google. Una clínica con 50 reseñas no compite contra una con 200 — simplemente no aparece en el top de resultados. Cada paciente satisfecho que no deja reseña porque nadie se lo pidió en el momento correcto es un paciente nuevo que irá a tu competencia. El coste de oportunidad no se mide en euros directos, se mide en pacientes que nunca llegan a llamar.',
    secondary:
      'El sistema envía el link de reseña 24h después de cada visita, cuando la experiencia está fresca. La tasa de conversión es 4 veces mayor que pedirla en consulta.',
  },
]

// ── ACORDEÓN ─────────────────────────────────────────────────────
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
                    Impacto real
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

// ── CALCULADORA CON PERFILES ─────────────────────────────────────
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

  // ── FÓRMULA CANÓNICA ──────────────────────────────────────────
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
    { label: 'Citas por mes',         val: citas,          set: setCitas,    min: 20,  max: 400, step: 10, suffix: '',  hint: 'Total citas al mes de toda la clínica' },
    { label: 'Ticket medio / cita',   val: precio,         set: setPrecio,   min: 30,  max: 300, step: 5,  suffix: '€', hint: 'Dental/estética: 80–200€ · Fisio: 40–70€ · Psicología: 60–90€' },
    { label: 'Tasa de no-shows',      val: noshow,         set: setNoshow,   min: 5,   max: 40,  step: 1,  suffix: '%', hint: 'Media sector privado España: 14–22%. Si no lo sabes, deja 18%.' },
    { label: 'Personas en el equipo', val: personasEquipo, set: setPersonas, min: 1,   max: 8,   step: 1,  suffix: '',  hint: 'Personas que gestionan citas, WhatsApps y confirmaciones.' },
  ]

  return (
    <div ref={ref} className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">

      {/* LEFT: CONTROLES */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8"
      >

        {/* Selector de perfil */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
            Selecciona tu especialidad
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

        {/* Sliders */}
        {sliders.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">{s.label}</span>
              <span className="mono font-extrabold text-[#B8FF2E] text-sm">
                {s.suffix === '€' && s.suffix}{s.val}{s.suffix === '%' && '%'}
                {!s.suffix && s.label.includes('Personas') && ` ${s.val > 1 ? 'personas' : 'persona'}`}
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

        {/* Desglose pérdidas */}
        <div className="border border-white/[0.06] bg-white/[0.01] p-6">
          <div className="mono text-[9px] text-white/20 mb-4">// Desglose mensual de pérdidas</div>
          <div className="flex flex-col gap-3">
            {[
              { icon: UserX,        label: `${noshowsMes} no-shows × ${precio}€/cita`,                                                              val: perdidaNoshow,    color: '#EF4444' },
              { icon: Clock,        label: `${personasEquipo} persona${personasEquipo > 1 ? 's' : ''} × 15h/sem × 15€/h × 4 sem`,                  val: perdidaEquipo,    color: '#F97316' },
              { icon: TrendingDown, label: '35% pacientes sin seguimiento activo',                                                                    val: perdidaPacientes, color: '#EF4444' },
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

      {/* RIGHT: RESULTADOS */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="flex flex-col gap-4 lg:sticky lg:top-28"
      >
        {/* Pérdida */}
        <div className="p-6 border border-red-500/20 bg-red-500/[0.03]">
          <div className="text-[10px] font-black uppercase tracking-widest text-red-400/60 mb-2">
            Pérdida mensual actual
          </div>
          <div className="text-4xl font-extrabold tracking-tighter text-red-400">
            −{perdidaTotal.toLocaleString('es-ES')}€
          </div>
          <div className="text-white/25 text-[10px] mt-2 font-medium">
            No-shows + equipo + pacientes sin seguimiento
          </div>
        </div>

        {/* Recuperación */}
        <div className="p-6 border border-[#B8FF2E]/20 bg-[#B8FF2E]/[0.03]">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#B8FF2E]/60 mb-2">
            Recuperación con AVOID
          </div>
          <div className="text-4xl font-extrabold tracking-tighter text-[#B8FF2E] mb-3">
            +{recTotal.toLocaleString('es-ES')}€
          </div>
          <div className="flex flex-col gap-1.5 mb-3">
            {[
              { label: 'Reducción no-shows (38%)',      val: recNoshow },
              { label: 'Equipo liberado (60%)',          val: recEquipo },
              { label: 'Reactivación pacientes',         val: recReact  },
              { label: 'Huecos last-minute',             val: recHuecos },
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
            {pct}% de recuperación estimada para este perfil
          </div>
        </div>

        {/* Anual + CTA */}
        <div className="p-6 border border-white/5 bg-white/[0.02]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-1">
                Recuperas en el primer año
              </div>
              <div className="text-3xl font-extrabold tracking-tighter text-white">
                +{recAnual.toLocaleString('es-ES')}€
              </div>
              <div className="text-white/25 text-[10px] mt-1">
                El sistema se amortiza en menos de 2 meses
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Payback</div>
              <div className="text-xl font-extrabold text-[#B8FF2E] tracking-tighter">&lt;2 meses</div>
            </div>
          </div>
          <a href="/diagnostico" className="btn-acid w-full justify-center py-4 text-[11px]">
            Solicitar diagnóstico gratuito <ArrowRight size={13} />
          </a>
        </div>

        {/* Fuente */}
        <div className="flex items-start gap-2">
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
                Reducción de no-shows del 38% basada en el rango auditado en clínicas privadas con sistemas de recordatorio automatizado (35–45%, fuentes: Auriia Studio 2026, DoctorConnect 2025). El 60% de liberación de equipo y la tasa de reactivación son estimaciones conservadoras. Tu resultado varía según perfil, ticket y tipo de clínica. El coste de instalación varía y no está incluido.
              </motion.p>
            ) : (
              <p
                className="text-[9px] text-white/20 font-medium italic cursor-pointer hover:text-white/35 transition-colors"
                onClick={() => setShowInfo(true)}
              >
                Basado en datos reales de clínicas privadas · Toca para ver metodología
              </p>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  )
}

// ── PÁGINA PRINCIPAL ─────────────────────────────────────────────
export default function PerdidasPage() {
  return (
    <main className="relative">
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
            Análisis de pérdidas reales · Cuatro goteos
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6"
          >
            <span className="text-white/15">Lo que no</span><br />
            <span className="text-red-500" style={{ textShadow: '0 0 60px rgba(239,68,68,0.25)' }}>ves.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-white/35 text-base md:text-xl font-medium max-w-2xl leading-relaxed"
          >
            Tu clínica tiene cuatro goteos distintos de facturación perdida.
            Ninguno aparece en la contabilidad. Todos se pueden cerrar.{' '}
            <span className="text-white/55">Esto es lo que te están costando.</span>
          </motion.p>
        </div>
      </section>

      {/* RESUMEN STATS */}
      <section className="section py-12 md:py-16 border-b border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '14–22%', label: 'Tasa de no-shows en clínicas privadas', color: '#EF4444' },
            { val: '15h',    label: 'Por semana de equipo gestionando citas', color: '#F97316' },
            { val: '35%',    label: 'Pacientes que no vuelven sin seguimiento', color: '#EF4444' },
            { val: '87%',    label: 'Pacientes nuevos que buscan en Google', color: '#B8FF2E' },
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

      {/* LOS 4 GOTEOS */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-12 md:mb-16">
            <div className="pill mb-6 inline-flex" style={{ borderColor: 'rgba(239,68,68,0.25)', color: '#EF4444', background: 'rgba(239,68,68,0.04)' }}>
              Los cuatro goteos
            </div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
              <span className="text-white/15">Por dónde se</span><br />
              <span className="text-red-500">escapa el dinero.</span>
            </h2>
          </FadeIn>
          <div className="flex flex-col gap-2">
            {goteos.map((g, i) => <GoteoItem key={i} g={g} i={i} />)}
          </div>
        </div>
      </section>

      {/* EL EFECTO COMPUESTO */}
      <section className="section bg-[#060610] border-y border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <div className="pill mb-8 inline-flex" style={{ borderColor: 'rgba(239,68,68,0.25)', color: '#EF4444', background: 'rgba(239,68,68,0.04)' }}>
              El efecto compuesto
            </div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8">
              <span className="text-white/15">Juntos,</span><br />
              <span className="text-red-500">se multiplican.</span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed text-sm md:text-base mb-6">
              El problema no es que existan los no-shows. Es que sin sistema,
              los cuatro goteos actúan a la vez y cada uno alimenta al siguiente.
            </p>
            <p className="text-white/30 font-medium leading-relaxed text-sm">
              Un paciente que no confirma y no aparece → tiempo de equipo perdido
              intentando localizarle → hueco que no se rellena → alguien que
              probablemente no vuelva → y que nunca dejará una reseña.{' '}
              <span className="text-white/55 font-semibold">Un solo no-show activa los cuatro goteos.</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-3">
              {[
                { from: 'No confirma la cita',      to: 'Equipo invierte 20 min en localizar',           color: '#F97316' },
                { from: 'No aparece',               to: 'Hueco vacío — 60–200€ perdidos',                color: '#EF4444' },
                { from: 'Sin seguimiento posterior', to: 'No vuelve en los 3 meses siguientes',            color: '#EF4444' },
                { from: 'Sin petición de reseña',   to: 'Google no crece. Nuevos pacientes a la competencia.', color: '#F59E0B' },
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
      <section className="section" id="calculadora">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-12 md:mb-16">
            <div className="pill mb-6 inline-flex">
              <Euro size={10} />
              Calculadora personalizada
            </div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
              <span className="text-white/15">Tus números,</span><br />
              <span className="text-[#B8FF2E] acid-glow">tu pérdida real.</span>
            </h2>
            <p className="text-white/30 text-sm font-medium mt-4 max-w-lg">
              Selecciona tu especialidad para cargar los valores por defecto del sector,
              o ajusta manualmente cada parámetro.
              El cálculo incluye los cuatro goteos, no solo los no-shows.
            </p>
          </FadeIn>
          <Calculadora />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section bg-[#060610] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8">
              <span className="text-white/15">Todo esto</span><br />
              <span className="text-[#B8FF2E] acid-glow">tiene solución.</span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed max-w-2xl mx-auto mb-4 text-base">
              Un sistema que confirma automáticamente, recuerda, rellena huecos,
              reactiva pacientes dormidos y pide reseñas en el momento exacto.
            </p>
            <p className="text-white/55 font-semibold text-lg mb-12">
              Tú pasas consulta. Nosotros llenamos la silla.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/diagnostico" className="btn-acid">
                Solicitar diagnóstico gratuito <ArrowRight size={13} />
              </a>
              <a href="/#sistema" className="btn-ghost">
                Ver cómo funciona el sistema
              </a>
            </div>
            <p className="text-white/15 text-[10px] font-medium mt-8 mono">
              Sin compromiso · Setup instalado · 7 flujos activos 24/7
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
