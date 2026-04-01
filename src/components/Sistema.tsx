'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, MessageSquare, Star, RefreshCw, Bell, BarChart2, Target, Check } from 'lucide-react'

const flows = [
  {
    id: 1,
    icon: Bell,
    color: '#B8FF2E',
    title: 'Recordatorio 48h',
    trigger: 'Cada día 9:00h',
    desc: 'El sistema lee el calendario, extrae nombre y teléfono, detecta si es primera visita o rutina y envía un WhatsApp personalizado 48h antes.',
    steps: ['Scheduler dispara a las 9h', 'Lee citas de pasado mañana', 'Extrae datos del título del evento', 'Genera mensaje según tipo de visita', 'Envía vía Twilio WhatsApp'],
    wa: 'Hola Laura! 👋 Te confirmamos tu sesión de *FISIO* el *jueves 20* a las *11:00h*.\n\nPor favor responde:\n✅ *SÍ* para confirmar\n❌ *NO* si necesitas cancelar',
  },
  {
    id: 2,
    icon: MessageSquare,
    color: '#22C55E',
    title: 'Gestión respuestas',
    trigger: 'Webhook 24/7',
    desc: 'Escucha todas las respuestas entrantes. Detecta confirmación o cancelación, avisa al negocio en tiempo real y actualiza el calendario automáticamente.',
    steps: ['Webhook activo 24/7', 'Detecta SÍ / NO / 1 / 2 / OK', 'Avisa al negocio vía WhatsApp', 'Responde al paciente al instante', 'Actualiza evento en Calendar con ✅ / ❌'],
    wa: '✅ Perfecto Laura! Tu cita queda confirmada.\n\nTe esperamos el jueves a las 11:00h. ¡Hasta pronto! 😊',
  },
  {
    id: 3,
    icon: Star,
    color: '#F59E0B',
    title: 'Reseña post-visita',
    trigger: 'Cada día 10:00h',
    desc: 'Al día siguiente de cada cita, busca pacientes que asistieron y les envía un WhatsApp pidiendo reseña en Google. Sin canceladas. Sin duplicados.',
    steps: ['Busca citas de ayer en Calendar', 'Excluye canceladas automáticamente', 'Extrae teléfonos de pacientes reales', 'Envía link directo a Google Reviews', '100% automático, cero gestión'],
    wa: 'Hola Laura! 😊 Esperamos que tu visita de ayer fuera genial.\n\n¿Nos dejarías una reseña rápida en Google? Solo 1 minuto:\n\n👉 maps.google.com/tu-clinica\n\n¡Gracias de corazón! 🙏',
  },
  {
    id: 4,
    icon: RefreshCw,
    color: '#8B5CF6',
    title: 'Reactivación 90 días',
    trigger: 'Cada lunes 10:00h',
    desc: 'Cada semana busca pacientes que tuvieron cita hace 90 días y no han vuelto. Filtra duplicados. Envía mensaje de reactivación cálido y personalizado.',
    steps: ['Lee citas de hace 90 días', 'Cruza con últimos 89 días', 'Filtra quien no ha vuelto', 'Elimina duplicados de teléfono', 'Envía WhatsApp de reactivación'],
    wa: 'Hola Laura! 👋 Hace tiempo que no nos vemos y quería saber cómo estás.\n\nSi necesitas volver a verte con nosotros, estaremos encantados.\n\n¿Reservamos una cita esta semana? 😊',
  },
  {
    id: 5,
    icon: Bell,
    color: '#EF4444',
    title: 'Safety Net 9h',
    trigger: 'Cada día 9:00h',
    desc: 'Revisa las citas de mañana sin confirmar. Envía al negocio una lista de pacientes pendientes para que pueda llamarles manualmente si lo considera oportuno.',
    steps: ['Busca citas de mañana', 'Detecta sin ✅ en el título', 'Lista nombre, hora y teléfono', 'Envía alerta al negocio', 'Red de seguridad humana activada'],
    wa: '⚠️ *CITAS SIN CONFIRMAR MAÑANA*\n\n• Laura Martín - 11:00h - +34612345678\n• Carlos Vega - 12:30h - +34698765432\n\n💡 Puedes llamarles manualmente.',
  },
  {
    id: 6,
    icon: BarChart2,
    color: '#06B6D4',
    title: 'Resumen diario',
    trigger: 'Cada día 8:00h',
    desc: 'Cada mañana, el negocio recibe un briefing completo de la agenda del día: confirmadas, pendientes y canceladas. El equipo empieza el día 100% informado.',
    steps: ['Carga todas las citas del día', 'Detecta estado de cada una', 'Cuenta confirmadas/pendientes/canceladas', 'Genera briefing estructurado', 'Envía al negocio a las 8h en punto'],
    wa: '📋 *AGENDA DE HOY*\n\n10:00h · Laura Martín · ✅ Confirmada\n11:30h · Carlos Vega · 🟡 Pendiente\n13:00h · Ana López · ✅ Confirmada\n\n─────\nTotal: 3 · ✅ 2 · 🟡 1',
  },
  {
    id: 7,
    icon: Target,
    color: '#F97316',
    title: 'Huecos last-minute',
    trigger: 'Cada día 20:00h',
    desc: 'Detecta cancelaciones del día siguiente a las 8 de la tarde. Avisa al negocio para que pueda ofrecer ese hueco a pacientes en lista de espera. Cada hueco recuperado = facturación.',
    steps: ['Detecta cancelaciones de mañana', 'Extrae hora del hueco liberado', 'Avisa al negocio a las 20h', 'Opción de ofrecer a lista de espera', 'Recuperación directa de facturación'],
    wa: '🎯 *HUECO DISPONIBLE MAÑANA*\n\nSe ha liberado una cita a las *12:30h*.\n\n¿Tienes algún paciente en lista de espera? ¡Es el momento!',
  },
]

export default function Sistema() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const flow = flows[active]

  return (
    <section id="sistema" ref={ref} className="section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="pill mb-6 inline-flex"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
              7 Flujos automatizados
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
              className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase"
            >
              <span className="text-white">El sistema</span><br />
              <span className="text-[#B8FF2E] acid-glow">que trabaja.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/40 font-medium max-w-sm text-sm leading-relaxed"
          >
          El sistema funciona mientras pasas consulta. Nadie lo arranca, nadie lo para,
          nadie tiene que acordarse de nada.         
          </motion.p>
        </div>

        {/* Flow grid + detail */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
          
          {/* Flow list */}
          <div className="flex flex-col gap-2">
            {flows.map((f, i) => (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-4 p-5 text-left transition-all duration-300 border rounded-sm ${
                  active === i
                    ? 'bg-white/[0.05] border-[#B8FF2E]/20'
                    : 'bg-transparent border-white/[0.04] hover:bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <div
                  className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: active === i ? `${f.color}15` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active === i ? f.color + '30' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <f.icon size={15} style={{ color: active === i ? f.color : 'rgba(255,255,255,0.3)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-bold ${active === i ? 'text-white' : 'text-white/50'}`}>
                      {f.title}
                    </span>
                    <span
                      className="mono text-[9px] font-bold uppercase flex-shrink-0"
                      style={{ color: active === i ? f.color : 'rgba(255,255,255,0.2)' }}
                    >
                      {f.trigger}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
              className="card p-8 md:p-10 flex flex-col gap-8"
              style={{ borderColor: `${flow.color}20` }}
            >
              {/* Title */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center"
                    style={{ background: `${flow.color}15`, border: `1px solid ${flow.color}30` }}
                  >
                    <flow.icon size={18} style={{ color: flow.color }} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg tracking-tight">{flow.title}</h3>
                    <span className="mono text-[10px]" style={{ color: flow.color }}>⏰ {flow.trigger}</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{flow.desc}</p>
              </div>

              {/* Steps */}
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-4">Secuencia de ejecución</div>
                <div className="flex flex-col gap-2">
                  {flow.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black"
                        style={{ background: `${flow.color}18`, color: flow.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-white/60 text-xs font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp mockup */}
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-3">Mensaje generado</div>
                <div className="bg-[#0B0B12] border border-white/6 rounded p-5">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
                    <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                      <MessageSquare size={10} className="text-white" />
                    </div>
                    <span className="mono text-[9px] text-white/30 font-bold">AVOID · WhatsApp Bot</span>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed whitespace-pre-line font-medium mono">
                    {flow.wa}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
