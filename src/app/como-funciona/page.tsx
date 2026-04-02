'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Bell, MessageSquare, Star, RefreshCw, BarChart2, Target,
  ArrowRight, Check, Clock, Zap, Shield,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── HELPERS ──────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

// ── DATA ─────────────────────────────────────────────────────────
const flows = [
  {
    id: 1,
    icon: Bell,
    color: '#B8FF2E',
    title: 'Recordatorio 48h',
    trigger: 'Cada día · 9:00h',
    badge: 'Anti no-show principal',
    tagline: 'El mensaje que llega justo cuando el paciente todavía puede reorganizarse.',
    desc: 'Dos días antes de cada cita, el sistema comprueba tu Google Calendar, extrae el nombre y teléfono del paciente y envía un WhatsApp personalizado. Si es la primera visita, el tono es de bienvenida. Si es una revisión, es un recordatorio directo. El paciente solo tiene que responder una palabra.',
    why: 'La mayoría de no-shows ocurren porque el paciente se olvidó, no porque no quisiera venir. Un recordatorio a 48h da tiempo de reorganizarse y reduce las ausencias entre un 70% y un 87%.',
    steps: [
      { n: '1', t: 'Comprueba el calendario', d: 'Busca todas las citas del día +48h.' },
      { n: '2', t: 'Detecta el tipo de visita', d: 'Primera vez o revisión — mensaje distinto.' },
      { n: '3', t: 'Extrae datos del paciente', d: 'Nombre y teléfono del título del evento.' },
      { n: '4', t: 'Genera el mensaje', d: 'Personalizado, natural, en tono humano.' },
      { n: '5', t: 'Envía por WhatsApp', d: 'Vía Twilio. Entregado en menos de 1 segundo.' },
    ],
    wa: 'Hola Laura! 👋 Te confirmamos tu sesión de *FISIO* el *jueves 20* a las *11:00h*.\n\nPor favor responde:\n✅ *SÍ* para confirmar\n❌ *NO* si necesitas cancelar\n\n_AVOID · Sistema automático_',
    impact: [
      { val: '−87%', label: 'No-shows' },
      { val: '48h', label: 'Antelación' },
      { val: '100%', label: 'Automático' },
    ],
  },
  {
    id: 2,
    icon: MessageSquare,
    color: '#22C55E',
    title: 'Gestión de respuestas',
    trigger: 'Webhook · 24/7',
    badge: 'Respuesta inmediata',
    tagline: 'El bot entiende lo que dice el paciente. A las 11 de la noche. Un domingo.',
    desc: 'Cuando el paciente responde al WhatsApp, el sistema lo procesa al instante. No importa si escribe "sí", "1", "confirmo", "ok" o incluso "claro que sí". También detecta cancelaciones en cualquier formato. En décimas de segundo: avisa al negocio, responde al paciente y actualiza el calendario.',
    why: 'Un sistema que solo envía mensajes pero no gestiona las respuestas es incompleto. La magia ocurre en el ciclo completo: mensaje → respuesta → acción → calendario actualizado. Sin intervención humana en ningún momento.',
    steps: [
      { n: '1', t: 'Escucha 24/7', d: 'Webhook activo siempre, sin horarios.' },
      { n: '2', t: 'Detecta la intención', d: 'SÍ, 1, OK, CONFIRMO / NO, 2, CANCELO, ANULO...' },
      { n: '3', t: 'Avisa al negocio', d: 'WhatsApp inmediato al número del centro.' },
      { n: '4', t: 'Responde al paciente', d: 'Confirmación o alternativa según el caso.' },
      { n: '5', t: 'Actualiza el calendario', d: '✅ confirmada · ❌ cancelada · visible al instante.' },
    ],
    wa: '✅ *Perfecto Laura!* Tu cita queda confirmada.\n\nTe esperamos el *jueves 20 a las 11:00h*.\n\n¡Hasta pronto! 😊\n\n_AVOID · Sistema automático_',
    impact: [
      { val: '<2s', label: 'Tiempo de reacción' },
      { val: '+20', label: 'Palabras detectadas' },
      { val: '24/7', label: 'Sin horarios' },
    ],
  },
  {
    id: 3,
    icon: Star,
    color: '#F59E0B',
    title: 'Reseña post-visita',
    trigger: 'Cada día · 10:00h',
    badge: 'SEO local automático',
    tagline: 'El momento exacto en que el paciente todavía recuerda cómo fue la visita.',
    desc: 'Cada mañana, el sistema busca todas las citas que se realizaron ayer. Excluye las canceladas. Comprueba que el paciente tenga teléfono. Y envía un WhatsApp con el enlace directo a la ficha de Google de tu clínica — sin intermediarios, sin formularios. El paciente llega directamente a dejar su valoración en un clic.',
    why: 'Pedir la reseña 24 horas después de la visita, cuando la experiencia todavía está fresca, multiplica la tasa de conversión por 4 respecto a pedirla en consulta o por email semanas después. Sin este sistema, la mayoría de pacientes satisfechos nunca dejan reseña porque nadie se lo pide en el momento correcto.',
    steps: [
      { n: '1', t: 'Busca citas de ayer', d: 'En Google Calendar, ordenadas por hora.' },
      { n: '2', t: 'Excluye canceladas', d: 'Solo pacientes que asistieron realmente.' },
      { n: '3', t: 'Valida el teléfono', d: 'Sin número, sin envío. Cero errores.' },
      { n: '4', t: 'Envía el WhatsApp', d: 'Con link directo a tu ficha de Google Maps.' },
      { n: '5', t: 'Sin duplicados', d: 'Si ya recibió una reseña esta semana, se omite.' },
    ],
    wa: 'Hola Laura! 😊 Esperamos que tu visita de ayer fuera genial.\n\n¿Nos dejarías una reseña rápida en Google? Solo 1 minuto ⏱️\n\n👉 maps.google.com/tu-clinica\n\n¡Gracias de corazón! 🙏\n_AVOID · Sistema automático_',
    impact: [
      { val: '3–5', label: 'Reseñas / semana' },
      { val: '×4', label: 'Más conversión' },
      { val: '+24h', label: 'Timing perfecto' },
    ],
  },
  {
    id: 4,
    icon: RefreshCw,
    color: '#8B5CF6',
    title: 'Reactivación 90 días',
    trigger: 'Cada lunes · 10:00h',
    badge: 'Facturación recurrente',
    tagline: 'Pacientes que se fueron. Que vuelven solos. Sin que nadie les llame.',
    desc: 'Cada lunes, el sistema analiza el calendario de hace exactamente 90 días. Identifica qué pacientes tuvieron una cita entonces pero no han vuelto en los meses siguientes. Filtra duplicados para no enviar dos mensajes al mismo teléfono. Y envía un mensaje cálido, sin presión, invitando a volver cuando lo necesiten.',
    why: 'El 40% de los pacientes que no vuelven no es porque no quieran — es porque nadie les ha contactado. Un mensaje de reactivación enviado en el momento correcto (90 días) convierte entre el 18% y el 26% de esos pacientes dormidos en citas nuevas. Es facturación que ya tenías ganada y que se estaba perdiendo por falta de seguimiento.',
    steps: [
      { n: '1', t: 'Lee citas de hace 90 días', d: 'Rango de ±3 días para mayor cobertura.' },
      { n: '2', t: 'Cruza con historial reciente', d: 'Descarta quienes ya han vuelto.' },
      { n: '3', t: 'Filtra duplicados', d: 'Un mensaje por teléfono, sin excepciones.' },
      { n: '4', t: 'Genera el mensaje', d: 'Cálido, sin presión, con nombre propio.' },
      { n: '5', t: 'Envía el lunes a las 10h', d: 'Momento de mayor tasa de apertura.' },
    ],
    wa: 'Hola Laura! 👋 Hace tiempo que no nos vemos y quería saber cómo estás.\n\nSi en algún momento necesitas volver a verte con nosotros, estaremos encantados de atenderte.\n\n¿Reservamos esta semana? 😊\n_AVOID · Sistema automático_',
    impact: [
      { val: '18–26%', label: 'Conversión' },
      { val: '40%', label: 'Pacientes dormidos' },
      { val: 'Lunes 10h', label: 'Timing óptimo' },
    ],
  },
  {
    id: 5,
    icon: Shield,
    color: '#EF4444',
    title: 'Safety Net 9h',
    trigger: 'Cada día · 9:00h',
    badge: 'Red de seguridad humana',
    tagline: 'La lista de pacientes que aún no han confirmado. En tu móvil cada mañana.',
    desc: 'A las 9 de la mañana del día anterior, el sistema revisa todas las citas de mañana. Identifica cuáles no tienen el ✅ de confirmación en el título del calendario. Y envía al negocio una lista clara con nombre, hora y teléfono de cada paciente pendiente. El equipo puede llamarles si lo considera necesario.',
    why: 'El sistema automatiza el 90% del trabajo, pero hay pacientes que simplemente no responden a WhatsApp. Este flujo garantiza que el negocio siempre tenga una visión completa de lo que puede pasar mañana, con tiempo suficiente para actuar si quiere. Es la red de seguridad que protege contra lo imprevisto.',
    steps: [
      { n: '1', t: 'Busca citas de mañana', d: 'Todas las del día siguiente.' },
      { n: '2', t: 'Filtra las confirmadas', d: 'Las que ya tienen ✅ en el título.' },
      { n: '3', t: 'Extrae las pendientes', d: 'Nombre, hora y teléfono de cada una.' },
      { n: '4', t: 'Genera el listado', d: 'Claro, ordenado por hora.' },
      { n: '5', t: 'Envía al negocio', d: 'A las 9h en punto. Siempre.' },
    ],
    wa: '⚠️ *CITAS SIN CONFIRMAR MAÑANA*\n\n• Laura Martín · 11:00h · +34612345678\n• Carlos Vega · 12:30h · +34698765432\n• Ana López · 16:00h · +34691234567\n\nTotal pendientes: 3\n💡 Puedes llamarles si lo consideras.\n_AVOID · Sistema automático_',
    impact: [
      { val: '9:00h', label: 'Alerta diaria' },
      { val: '0', label: 'Citas perdidas por descuido' },
      { val: '100%', label: 'Visibilidad' },
    ],
  },
  {
    id: 6,
    icon: BarChart2,
    color: '#06B6D4',
    title: 'Resumen diario',
    trigger: 'Cada día · 8:00h',
    badge: 'Briefing matutino',
    tagline: 'Tu equipo empieza el día sabiendo exactamente qué tiene por delante.',
    desc: 'Cada mañana a las 8h, antes de que abra la clínica, el negocio recibe un WhatsApp con el resumen completo del día: nombre de cada paciente, hora, y estado de confirmación. Confirmadas en verde, pendientes en amarillo, canceladas indicadas. Sin abrir el ordenador, sin entrar al calendario. La información relevante directamente en el móvil.',
    why: 'Empezar el día con claridad sobre la agenda elimina la fricción de los primeros 20 minutos de trabajo donde el equipo comprueba quién viene y quién no. También permite anticipar huecos y gestionar mejor los tiempos. Es un pequeño detalle que cambia la dinámica del equipo.',
    steps: [
      { n: '1', t: 'Carga las citas del día', d: 'Todas, en orden cronológico.' },
      { n: '2', t: 'Detecta el estado de cada una', d: '✅ confirmada · 🟡 pendiente · ❌ cancelada.' },
      { n: '3', t: 'Cuenta y agrupa', d: 'Total, confirmadas, pendientes, canceladas.' },
      { n: '4', t: 'Genera el briefing', d: 'Limpio, legible en móvil de un vistazo.' },
      { n: '5', t: 'Envía a las 8h en punto', d: 'Antes de que empiece la jornada.' },
    ],
    wa: '📋 *AGENDA DE HOY · Jueves 20*\n\n10:00h · Laura Martín · ✅\n11:30h · Carlos Vega · 🟡 Sin confirmar\n13:00h · Ana López · ✅\n16:00h · Pedro Ruiz · ❌ Cancelada\n\n──────────────\nTotal: 4 · ✅ 2 · 🟡 1 · ❌ 1\n\n_AVOID · Briefing automático_',
    impact: [
      { val: '8:00h', label: 'Antes de abrir' },
      { val: '0min', label: 'Preparación manual' },
      { val: '100%', label: 'Visibilidad diaria' },
    ],
  },
  {
    id: 7,
    icon: Target,
    color: '#F97316',
    title: 'Huecos last-minute',
    trigger: 'Cada día · 20:00h',
    badge: 'Facturación recuperada',
    tagline: 'Cada cancelación es un hueco. Cada hueco avisado a tiempo es una oportunidad.',
    desc: 'Cada día a las 8 de la tarde, el sistema detecta si hay cancelaciones para el día siguiente. Si las hay, envía una alerta al negocio con la hora exacta del hueco liberado. El equipo puede ofrecer esa plaza a un paciente en lista de espera o a alguien que había pedido cita urgente. Sin este sistema, ese hueco simplemente queda vacío.',
    why: 'Una cancelación a las 7 de la tarde para el día siguiente es casi imposible de cubrir de forma manual — el equipo ya no está trabajando. Este flujo automático permite actuar en el momento en que todavía hay tiempo para reaccionar, antes de que sea demasiado tarde. Cada hueco recuperado es entre 40€ y 100€ directamente a la caja.',
    steps: [
      { n: '1', t: 'Detecta cancelaciones de mañana', d: 'Títulos con ❌ en el calendario.' },
      { n: '2', t: 'Extrae la hora del hueco', d: 'El slot exacto que queda libre.' },
      { n: '3', t: 'Comprueba si hay más de una', d: 'Agrupa si hay varios huecos.' },
      { n: '4', t: 'Genera la alerta', d: 'Clara, con la hora y el contexto.' },
      { n: '5', t: 'Envía a las 20h', d: 'Tiempo suficiente para reaccionar.' },
    ],
    wa: '🎯 *HUECO DISPONIBLE MAÑANA*\n\nSe ha liberado una cita a las *12:30h*.\n\n¿Tienes algún paciente en lista de espera o que necesite cita urgente?\n\n¡Es el momento de recuperar esa hora! 💪\n_AVOID · Alerta automática_',
    impact: [
      { val: '20:00h', label: 'Alerta diaria' },
      { val: '40–100€', label: 'Por hueco recuperado' },
      { val: '0', label: 'Huecos invisibles' },
    ],
  },
]

// ── WHATSAPP MOCKUP ───────────────────────────────────────────────
function WaMockup({ text, color }: { text: string; color: string }) {
  return (
    <div className="bg-[#0A0A14] border border-white/[0.06] overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.05]"
        style={{ background: `${color}08` }}>
        <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
          <MessageSquare size={9} className="text-white" />
        </div>
        <div>
          <div className="mono text-[9px] text-white/50 font-bold leading-none">AVOID · WhatsApp Bot</div>
          <div className="mono text-[8px] text-[#25D366] leading-none mt-0.5">● En línea</div>
        </div>
        <div className="ml-auto flex gap-1">
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="p-4 pb-5" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm p-4" style={{ background: '#1E2A1E' }}>
          <p className="text-white/75 text-xs leading-relaxed whitespace-pre-line font-medium mono">
            {text}
          </p>
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-[8px] text-white/20 mono">09:00</span>
            <Check size={9} className="text-[#25D366]" />
            <Check size={9} className="text-[#25D366] -ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── STACKING CARD ─────────────────────────────────────────────────
// Each card sticks to the top as you scroll, and the next one slides over it.
// offset controls how much of the previous card peeks above the new one.
function StackCard({ flow, index, total }: { flow: typeof flows[0]; index: number; total: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  // Cards are progressively sticky: top offset increases per card so
  // earlier cards peek out from behind later ones.
  const topOffset = 80 + index * 8 // px — tiny peek increases with each card

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      // sticky: card stays in viewport as next card slides in on top of it
      className="sticky"
      style={{ top: topOffset }}
    >
      <div
        className="border bg-[#06060F] overflow-hidden"
        style={{
          borderColor: `${flow.color}20`,
          // slight scale-down for cards further back, creating depth
          transform: `scale(${1 - (total - 1 - index) * 0.012})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Card header strip */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: `${flow.color}15`, background: `${flow.color}06` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: `${flow.color}20`, border: `1px solid ${flow.color}35` }}
            >
              <flow.icon size={14} style={{ color: flow.color }} />
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: `${flow.color}70` }}>
                {flow.badge}
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-tight text-white">{flow.title}</h3>
            </div>
          </div>
          <div className="mono text-[9px] font-bold" style={{ color: flow.color }}>
            ⏰ {flow.trigger}
          </div>
        </div>

        {/* Card body */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: explanation */}
          <div className="p-6 md:p-8 flex flex-col gap-5 border-r border-white/[0.04]">
            <p className="text-white/65 text-sm md:text-base font-semibold leading-snug border-l-2 pl-4"
              style={{ borderColor: `${flow.color}50` }}>
              {flow.tagline}
            </p>
            <p className="text-white/40 text-sm font-medium leading-relaxed">{flow.desc}</p>
            <div className="p-4 border text-xs font-medium leading-relaxed text-white/30"
              style={{ borderColor: `${flow.color}15`, background: `${flow.color}05` }}>
              <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: `${flow.color}60` }}>
                Por qué funciona
              </div>
              {flow.why}
            </div>
            {/* Steps */}
            <div className="flex flex-col gap-2">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">
                Secuencia
              </div>
              {flow.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black mt-0.5"
                    style={{ background: `${flow.color}18`, color: flow.color }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <span className="text-white/65 text-xs font-bold">{s.t}</span>
                    <span className="text-white/25 text-xs font-medium"> — {s.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: WhatsApp + impact */}
          <div className="p-6 md:p-8 flex flex-col gap-5">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">
                Mensaje real generado
              </div>
              <WaMockup text={flow.wa} color={flow.color} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {flow.impact.map((s, i) => (
                <div key={i} className="p-4 border text-center"
                  style={{ borderColor: `${flow.color}20`, background: `${flow.color}06` }}>
                  <div className="text-base font-extrabold tracking-tighter" style={{ color: flow.color }}>
                    {s.val}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 mt-1 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── TICKER ────────────────────────────────────────────────────────
function Ticker() {
  const items = flows.map(f => f.title)
  return (
    <div className="overflow-hidden border-y border-white/5 py-3 bg-white/[0.01]">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-4 px-6 text-[10px] font-black uppercase tracking-widest text-white/20">
            <Zap size={8} className="text-[#B8FF2E]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────
export default function SistemaPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      <Navbar />

      <main className="relative">

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="relative min-h-[75vh] flex flex-col justify-end pb-12 px-6 md:px-20 pt-40 overflow-hidden grid-bg"
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(184,255,46,0.06) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl relative z-10">
            <FadeUp>
              <div className="pill mb-8 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
                7 flujos · Activos 24/7 · Sin intervención
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
                <span className="text-white/15">El sistema</span><br />
                <span className="text-[#B8FF2E] acid-glow">que trabaja.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-white/35 text-base md:text-xl font-medium max-w-2xl leading-relaxed mb-10">
                Siete flujos automatizados que se ejecutan solos, en el momento exacto,
                con el mensaje exacto. Tú pasas consulta. El sistema llena la silla.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Clock, label: 'Sin horarios de atención' },
                  { icon: Zap, label: 'Respuesta en segundos' },
                  { icon: Shield, label: 'Cero fallos por olvido' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon size={12} className="text-[#B8FF2E] flex-shrink-0" />
                    <span className="text-white/35 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </motion.div>
        </section>

        {/* Ticker */}
        <Ticker />

        {/* ── STATS ── */}
        <section className="px-6 md:px-20 py-12 border-b border-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '7',    label: 'Flujos activos',   color: '#B8FF2E' },
              { val: '24/7', label: 'Sin parar nunca',  color: '#22C55E' },
              { val: '−87%', label: 'Menos no-shows',   color: '#EF4444' },
              { val: '72h',  label: 'Setup completo',   color: '#8B5CF6' },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="p-5 border text-center"
                  style={{ borderColor: `${s.color}18`, background: `${s.color}05` }}>
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-1" style={{ color: s.color }}>
                    {s.val}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/25">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── STACKING CARDS ── */}
        <section id="sistema" className="px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <FadeUp className="mb-14">
              <div className="pill mb-5 inline-flex">Los 7 flujos</div>
              <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
                <span className="text-white/15">Qué hace</span><br />
                <span className="text-[#B8FF2E] acid-glow">cada uno.</span>
              </h2>
              <p className="text-white/30 text-sm font-medium mt-4 max-w-lg">
                Haz scroll. Cada tarjeta se apila sobre la anterior mientras lees el siguiente flujo.
              </p>
            </FadeUp>

            {/* Stack container — needs enough height for all cards + viewport */}
            <div className="flex flex-col gap-4">
              {flows.map((f, i) => (
                <StackCard key={f.id} flow={f} index={i} total={flows.length} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <FadeUp>
              <Zap size={24} className="text-[#B8FF2E] mx-auto mb-8 opacity-60" />
              <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
                <span className="text-white/15">Todo esto,</span><br />
                <span className="text-[#B8FF2E] acid-glow">Lo hacemos nosotros.</span>
              </h2>
              <p className="text-white/35 font-medium leading-relaxed max-w-lg mx-auto mb-10 text-sm md:text-base">
                No tienes que configurar nada. No tienes que entender la tecnología.
                Solo disfrutar de una agenda que se gestiona sola.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/diagnostico" className="btn-acid">
                  Solicitar diagnóstico gratuito <ArrowRight size={13} />
                </a>
                <a href="/perdidas" className="btn-ghost">
                  Ver cuánto pierdes ahora
                </a>
              </div>
              <p className="text-white/15 text-[10px] font-medium mt-8 mono">
                Sin compromiso · 30 min · Respondemos en menos de 24h
              </p>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
