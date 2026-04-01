'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── ANIMATION HELPER ─────────────────────────────────────────────
function SlideIn({
  children,
  from = 'bottom',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  from?: 'left' | 'right' | 'bottom'
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const x = from === 'left' ? -60 : from === 'right' ? 60 : 0
  const y = from === 'bottom' ? 36 : 0
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── DATA ─────────────────────────────────────────────────────────
const pieces = [
  {
    name: 'n8n',
    role: 'El cerebro del sistema',
    color: '#FF6B35',
    tag: 'Motor de automatización',
    headline: 'El director de orquesta que coordina todo.',
    body: 'n8n es la plataforma que conecta todas las piezas y decide cuándo actuar. Funciona como un empleado invisible que trabaja las 24 horas: comprueba el calendario, detecta qué citas hay mañana, genera los mensajes correctos y los envía en el momento exacto. Sin que tú hagas nada.',
    note: 'Instalado en la nube de AVOID. Tú no gestionas nada técnico.',
    stats: [
      { label: 'Workflows activos', val: '7' },
      { label: 'Ejecuciones / día', val: '~40' },
      { label: 'Intervención manual', val: '0' },
    ],
  },
  {
    name: 'Twilio',
    role: 'El canal de comunicación',
    color: '#F22F46',
    tag: 'WhatsApp Business API',
    headline: 'El que habla con tus pacientes. De verdad.',
    body: 'Twilio es la infraestructura oficial de WhatsApp para empresas. Gracias a él, el sistema envía y recibe mensajes reales — no simulados. Cuando un paciente responde "sí" a las 11 de la noche, Twilio lo captura y lo procesa en menos de un segundo.',
    note: 'Coste real: ~0,005€ por mensaje. Para 80 citas/mes, menos de 12€/mes total.',
    stats: [
      { label: 'Coste por mensaje', val: '0,005€' },
      { label: 'Entrega', val: '<1s' },
      { label: 'Apertura WhatsApp', val: '98%' },
    ],
  },
  {
    name: 'Google Calendar',
    role: 'La fuente de verdad',
    color: '#4285F4',
    tag: 'Tu agenda actual',
    headline: 'El sistema lee tu calendario. Tú no cambias nada.',
    body: 'No hay que instalar software nuevo ni migrar datos. El sistema lee el Google Calendar que ya usas, extrae el nombre y teléfono del paciente del título de cada evento, y actúa. Cuando una cita se confirma, el título se actualiza con ✅. Cuando se cancela, con ❌.',
    note: 'Formato: "Laura Martín - 612345678" o "Laura (primera visita) - 612345678"',
    stats: [
      { label: 'Software nuevo', val: 'Ninguno' },
      { label: 'Migración', val: 'No' },
      { label: 'Sync', val: 'Real-time' },
    ],
  },
  {
    name: 'Webhook',
    role: 'El oído que nunca duerme',
    color: '#B8FF2E',
    tag: 'Escucha activa 24/7',
    headline: 'Captura cada respuesta al instante, a cualquier hora.',
    body: 'Un webhook es un punto de conexión siempre encendido. Cuando un paciente responde "confirmo" a las 11 de la noche o un domingo, el sistema lo detecta al instante y ejecuta la acción correcta: avisar al negocio, responder al paciente y actualizar el calendario. Sin demoras, sin horarios.',
    note: 'Detecta +20 variantes: SÍ, SI, 1, OK, YES, VOY / NO, CANCELO, 2, NO PUEDO, ANULO...',
    stats: [
      { label: 'Disponibilidad', val: '24/7' },
      { label: 'Reacción', val: '<2s' },
      { label: 'Variantes detectadas', val: '+20' },
    ],
  },
  {
    name: 'Google Maps',
    role: 'Tu reputación en automático',
    color: '#34A853',
    tag: 'Google Reviews',
    headline: 'Más reseñas. Mejor posición. Más pacientes nuevos.',
    body: '24 horas después de cada visita, el sistema envía un WhatsApp con el enlace directo a tu ficha de Google. Sin rodeos, sin pasos extra, en el momento en que el paciente todavía recuerda bien cómo fue. El resultado: entre 3 y 5 reseñas nuevas por semana en clínicas activas, sin que nadie del equipo pida nada.',
    note: 'El 87% de nuevos pacientes elige clínica basándose en reseñas de Google.',
    stats: [
      { label: 'Reseñas / semana', val: '3–5' },
      { label: 'Momento de envío', val: '+24h' },
      { label: 'Conversión media', val: '31%' },
    ],
  },
  {
    name: 'Static Data',
    role: 'La memoria del sistema',
    color: '#8B5CF6',
    tag: 'Estado de confirmaciones',
    headline: 'Sabe exactamente qué citas están pendientes. Siempre.',
    body: 'El sistema guarda el estado de cada cita enviada: si el paciente respondió, confirmó, canceló o todavía no ha dicho nada. Con esa información, el Safety Net de las 9h del día anterior sabe exactamente a quién incluir en la lista de pendientes. Nada se cae por las grietas.',
    note: 'La memoria se resetea automáticamente cada día. Sin acumulación de datos innecesarios.',
    stats: [
      { label: 'Estados rastreados', val: '3' },
      { label: 'Falsos positivos', val: '0' },
      { label: 'Reset', val: 'Diario' },
    ],
  },
]

// ── STAT CHIP ─────────────────────────────────────────────────────
function StatChip({ label, val, color }: { label: string; val: string; color: string }) {
  return (
    <div
      className="flex flex-col gap-1.5 p-4 border"
      style={{ borderColor: `${color}20`, background: `${color}07` }}
    >
      <span className="text-xl md:text-2xl font-extrabold tracking-tighter" style={{ color }}>
        {val}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 leading-tight">
        {label}
      </span>
    </div>
  )
}

// ── PIECE BLOCK ────────────────────────────────────────────────────
function PieceBlock({ p, index }: { p: (typeof pieces)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 border border-white/[0.06] overflow-hidden"
    >
      {/* Visual panel */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`relative p-8 md:p-12 flex flex-col justify-between gap-10
          border-b md:border-b-0
          ${isEven ? 'md:order-1 md:border-r' : 'md:order-2 md:border-l'}
          border-white/[0.05]`}
        style={{ background: `${p.color}07` }}
      >
        {/* Glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: p.color }}
        />

        {/* Identity */}
        <div className="relative z-10">
          <div
            className="pill mb-5 inline-flex text-[9px]"
            style={{ borderColor: `${p.color}30`, color: p.color, background: `${p.color}10` }}
          >
            {p.tag}
          </div>
          <div
            className="text-[clamp(3rem,8vw,5rem)] font-extrabold tracking-tighter leading-none mb-2"
            style={{ color: p.color }}
          >
            {p.name}
          </div>
          <div className="text-white/25 text-xs font-bold uppercase tracking-widest">{p.role}</div>
        </div>

        {/* Stats grid */}
        <div className="relative z-10 grid grid-cols-3 gap-2">
          {p.stats.map((s, i) => (
            <StatChip key={i} label={s.label} val={s.val} color={p.color} />
          ))}
        </div>
      </motion.div>

      {/* Text panel */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 80 : -80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`p-8 md:p-12 flex flex-col justify-center gap-6 ${
          isEven ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <h3 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug">
          {p.headline}
        </h3>
        <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed">
          {p.body}
        </p>
        <div
          className="flex items-start gap-3 p-4 border-l-2 text-xs font-medium text-white/30 leading-relaxed"
          style={{ borderColor: `${p.color}40` }}
        >
          <span className="flex-shrink-0 mt-0.5" style={{ color: `${p.color}80` }}>→</span>
          <span>{p.note}</span>
        </div>
      </motion.div>
    </div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function Arquitectura() {
  return (
    <>
      <Navbar />

      <main className="relative">

        {/* HERO */}
        <section className="relative min-h-[65vh] flex flex-col justify-end pb-16 px-6 md:px-20 pt-40 overflow-hidden grid-bg">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(184,255,46,0.05) 0%, transparent 70%)' }}
          />
          <div className="max-w-5xl relative z-10">
            <SlideIn from="bottom">
              <div className="pill mb-8 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
                La Estructura · nuestras herramientas
              </div>
            </SlideIn>
            <SlideIn from="bottom" delay={0.1}>
              <h1 className="text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
                <span className="text-white/15">Cómo funciona</span><br />
                <span className="text-[#B8FF2E] acid-glow">por dentro.</span>
              </h1>
            </SlideIn>
            <SlideIn from="bottom" delay={0.2}>
              <p className="text-white/35 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                Seis herramientas conectadas entre sí. Cada una hace una cosa
                concreta y la hace muy bien. Juntas, forman un sistema que no
                necesita que nadie lo vigile.
              </p>
            </SlideIn>
          </div>
        </section>

        {/* CORE BANNER */}
        <section className="py-10 px-6 md:px-20 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <SlideIn from="bottom">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 border border-[#B8FF2E]/20 bg-[#B8FF2E]/[0.03] relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#B8FF2E]/10 blur-3xl rounded-full pointer-events-none" />

                {/* Core identity */}
                <div className="flex-shrink-0 text-center md:text-left relative z-10">
                  <div className="mono text-[9px] text-[#B8FF2E]/40 mb-1">AVOID.CORE</div>
                  <div className="text-4xl font-extrabold tracking-tighter text-[#B8FF2E]">n8n</div>
                  <div className="mono text-[9px] text-white/20 mt-1">Orchestrator</div>
                </div>

                <div className="w-px h-10 bg-white/10 hidden md:block self-center" />

                <p className="flex-1 text-white/45 text-sm font-medium leading-relaxed text-center md:text-left relative z-10">
                  Todas las piezas de abajo están coordinadas por{' '}
                  <span className="text-white/75 font-bold">n8n</span>, el motor central.
                  Es lo que hace que todo ocurra en el momento correcto, con los datos correctos,
                  sin que tú tengas que hacer nada.
                </p>

                <div className="flex gap-6 md:gap-8 text-center flex-shrink-0 relative z-10">
                  {[
                    { v: '7', l: 'flujos' },
                    { v: '24/7', l: 'activo' },
                    { v: '0', l: 'intervención' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-2xl font-extrabold text-[#B8FF2E] tracking-tighter">{s.v}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-white/20">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* PIECES */}
        <section className="px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto flex flex-col gap-5">
            {pieces.map((p, i) => (
              <PieceBlock key={i} p={p} index={i} />
            ))}
          </div>
        </section>

        {/* CALENDAR FORMAT */}
        <section className="px-6 md:px-20 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <SlideIn from="bottom">
              <div className="p-8 md:p-10 border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-8">
                  <Zap size={14} className="text-[#B8FF2E]" />
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    Cómo escribir los títulos en Google Calendar
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Formato estándar', val: 'Laura Martín - 612345678' },
                    { label: 'Primera visita', val: 'Carlos Vega - 698765432 (primera visita)' },
                    { label: 'Con prefijo', val: 'Ana López | +34612345678' },
                  ].map((ex, i) => (
                    <div key={i} className="bg-[#0B0B12] border border-white/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
                        <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest">{ex.label}</div>
                      </div>
                      <code className="mono text-[#B8FF2E] text-xs break-all">{ex.val}</code>
                    </div>
                  ))}
                </div>
                <p className="text-white/20 text-xs font-medium leading-relaxed">
                  El sistema extrae automáticamente el nombre y el teléfono. Si el título incluye
                  "primera visita", genera un mensaje de bienvenida distinto al de revisión. No hay
                  que tocar ningún otro ajuste.
                </p>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-[#060610] border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <SlideIn from="bottom">
              <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
                <span className="text-white/25">Todo esto</span><br />
                <span className="text-[#B8FF2E] acid-glow">Sin hacer nada</span>
              </h2>
              <p className="text-white/35 font-medium leading-relaxed max-w-lg mx-auto mb-10 text-sm md:text-base">
                No tienes que entender cada pieza técnica. Solo disfrutar del resultado:
                tu agenda llena, tus pacientes confirmados y tu Google Maps creciendo solo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/diagnostico" className="btn-acid">
                  Solicitar diagnóstico gratuito <ArrowRight size={13} />
                </a>
                <a href="/#sistema" className="btn-ghost">
                  Ver los 7 flujos
                </a>
              </div>
              <p className="text-white/25 text-[10px] font-medium mt-8 mono">
                Sin compromiso · Setup completo · Soporte incluido
              </p>
            </SlideIn>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
