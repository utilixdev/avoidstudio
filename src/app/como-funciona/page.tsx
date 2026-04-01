'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, Star, RefreshCw, 
  Bell, BarChart2, Target, Check, Zap, ArrowRight 
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Componente auxiliar para animaciones de sección
const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
)

const flows = [
  {
    id: 1,
    icon: Bell,
    color: '#B8FF2E',
    title: 'Recordatorio 48h',
    trigger: 'Automático · 48h antes',
    headline: 'Adiós a los "se me ha olvidado".',
    desc: 'El sistema revisa tu agenda, identifica quién viene pasado mañana y le envía un mensaje que parece escrito por ti. Detecta si es su primera vez en la clínica para darle una bienvenida especial o si es un paciente habitual.',
    benefits: ['Reduce el absentismo un 40%', 'Libera 2h de llamadas al día', 'Imagen profesional inmediata'],
    steps: ['Escanea Google Calendar', 'Extrae nombre y móvil', 'Personaliza el mensaje', 'Envía vía WhatsApp oficial'],
    wa: 'Hola Laura! 👋 Te confirmamos tu sesión de *FISIO* el *jueves 20* a las *11:00h*.\n\nPor favor responde:\n✅ *SÍ* para confirmar\n❌ *NO* si necesitas cancelar',
  },
  {
    id: 2,
    icon: MessageSquare,
    color: '#22C55E',
    title: 'Gestión respuestas',
    trigger: 'Vivo 24/7',
    headline: 'Tu agenda se gestiona sola mientras duermes.',
    desc: 'Cuando el paciente responde (ya sea a las 11 de la noche o un domingo), el sistema entiende lo que dice. No solo lee "SÍ", entiende variantes como "allí estaré" o "confirmo". Actualiza tu calendario al instante para que tú solo tengas que abrirlo y ver qué hay.',
    benefits: ['Agenda siempre actualizada', 'Cero errores de transcripción', 'Atención instantánea 24/7'],
    steps: ['Recibe respuesta del paciente', 'IA procesa la intención', 'Marca el evento con ✅ o ❌', 'Te avisa si hay dudas'],
    wa: '✅ Perfecto Laura! Tu cita queda confirmada.\n\nTe esperamos el jueves a las 11:00h. ¡Hasta pronto! 😊',
  },
  {
    id: 3,
    icon: Star,
    color: '#F59E0B',
    title: 'Reseña post-visita',
    trigger: '24h después de la cita',
    headline: 'Tu reputación en Google crece sin pedirlo.',
    desc: 'El mejor momento para pedir una reseña es cuando el paciente está feliz tras su cita. El sistema espera 24h, filtra a los que no asistieron y envía el link directo. Es la forma más rápida de subir posiciones en Google Maps.',
    benefits: ['3-5 reseñas nuevas por semana', 'Mejor posicionamiento SEO', 'Confianza para nuevos pacientes'],
    steps: ['Detecta citas finalizadas', 'Filtra pacientes satisfechos', 'Envía enlace directo', 'Aumenta tu nota media'],
    wa: 'Hola Laura! 😊 Esperamos que tu visita de ayer fuera genial.\n\n¿Nos dejarías una reseña rápida en Google? Solo 1 minuto:\n\n👉 https://g.page/tu-clinica/review \n\n¡Gracias de corazón! 🙏',
  },
  {
    id: 4,
    icon: RefreshCw,
    color: '#8B5CF6',
    title: 'Reactivación 90 días',
    trigger: 'Lunes · 10:00h',
    headline: 'Recupera pacientes que creías perdidos.',
    desc: 'Es 7 veces más barato recuperar un paciente que conseguir uno nuevo. Cada lunes, el sistema busca a personas que no te visitan desde hace 90 días y les invita a volver con un mensaje cálido. Sin parecer spam.',
    benefits: ['Recupera facturación "dormida"', 'Fidelización automática', 'Agenda llena en horas bajas'],
    steps: ['Busca bajas de hace 3 meses', 'Comprueba si tienen cita futura', 'Filtra duplicados', 'Envía invitación cordial'],
    wa: 'Hola Laura! 👋 Hace tiempo que no nos vemos y quería saber cómo estás.\n\nSi necesitas volver a verte con nosotros, estaremos encantados.\n\n¿Reservamos una cita esta semana? 😊',
  },
  {
    id: 5,
    icon: Bell,
    color: '#EF4444',
    title: 'Safety Net 9h',
    trigger: 'Diario · 09:00h',
    headline: 'Tu red de seguridad anti-huecos.',
    desc: 'Si alguien no ha respondido al recordatorio de 48h, el sistema te avisa a primera hora del día anterior. Te da el nombre y el teléfono para que puedas hacer una llamada rápida y no perder ese hueco de mañana.',
    benefits: ['Cero huecos vacíos', 'Control total de la jornada', 'Anticipación a imprevistos'],
    steps: ['Chequea citas de mañana', 'Identifica las "Sin confirmar"', 'Recopila teléfonos de contacto', 'Te envía el listado de acción'],
    wa: '⚠️ *CITAS SIN CONFIRMAR MAÑANA*\n\n• Laura Martín - 11:00h - +34612345678\n• Carlos Vega - 12:30h - +34698765432\n\n💡 Sugerencia: Llamar ahora.',
  },
  {
    id: 6,
    icon: BarChart2,
    color: '#06B6D4',
    title: 'Resumen diario',
    trigger: 'Diario · 08:00h',
    headline: 'Empieza el día con todo bajo control.',
    desc: 'Recibe un informe estructurado en tu móvil antes de abrir la clínica. Quién viene, quién ha confirmado y quién ha cancelado. Sin tener que entrar a mirar el calendario evento por evento.',
    benefits: ['Planificación perfecta', 'Información para el equipo', 'Ahorro de tiempo matutino'],
    steps: ['Sincroniza agenda del día', 'Clasifica estados (✅/🟡/❌)', 'Calcula totales de asistencia', 'Envía briefing al equipo'],
    wa: '📋 *AGENDA DE HOY*\n\n10:00h · Laura Martín · ✅ Confirmada\n11:30h · Carlos Vega · 🟡 Pendiente\n13:00h · Ana López · ✅ Confirmada\n\n─────\nTotal: 3 · ✅ 2 · 🟡 1',
  },
  {
    id: 7,
    icon: Target,
    color: '#F97316',
    title: 'Huecos last-minute',
    trigger: 'Diario · 20:00h',
    headline: 'Convierte cancelaciones en oportunidades.',
    desc: 'Si alguien cancela a última hora para el día siguiente, el sistema te avisa por la noche. Así puedes llamar a alguien de tu lista de espera o poner un anuncio en redes para llenar ese hueco y no perder dinero.',
    benefits: ['Recuperación de ingresos', 'Optimización del tiempo', 'Gestión de listas de espera'],
    steps: ['Escanea cancelaciones nuevas', 'Detecta horas liberadas', 'Te alerta al cierre del día', 'Facilita la re-venta del hueco'],
    wa: '🎯 *HUECO DISPONIBLE MAÑANA*\n\nSe ha liberado una cita a las *12:30h*.\n\n¿Tienes algún paciente en lista de espera? ¡Es el momento!',
  },
]

export default function Sistema() {
  const containerRef = useRef(null)

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="bg-[#060610] relative">
        
        {/* HERO SECTION */}
        <section className="min-h-[100vh] flex flex-col justify-center px-6 pt-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="pill mb-8 inline-flex border-[#B8FF2E]/30 bg-[#B8FF2E]/5 text-[#B8FF2E] self-start"
          >
            <Zap size={14} className="mr-2" />
            Infraestructura 100% Autónoma
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.8] tracking-[-0.06em] uppercase mb-12"
          >
            <span className="text-white">El Motor</span><br />
            <span className="text-[#B8FF2E] acid-glow">Invisible.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-xl md:text-3xl font-medium max-w-2xl border-l-2 border-[#B8FF2E] pl-8"
          >
            Siete flujos diseñados para que tu única preocupación sea atender a tus pacientes. El resto sucede solo.
          </motion.p>
        </section>

        {/* STACKED CARDS SECTION */}
        <div className="px-4 md:px-6 pb-40">
          {flows.map((flow, index) => (
            <FlowCard key={flow.id} flow={flow} index={index} />
          ))}
        </div>

        {/* ── CTA FINAL ── */}
        <section className="py-32 px-6 bg-[#060610] border-t border-white/5 relative overflow-hidden">
          {/* Luz de fondo para el CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8FF2E]/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Section>
              <Zap size={32} className="text-[#B8FF2E] mx-auto mb-10 opacity-60" />
              <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8 text-white">
                ¿Quieres saber <br />
                <span className="text-[#B8FF2E] acid-glow">donde pierdes dinero?</span>
              </h2>
              <p className="text-white/50 font-medium mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                Analizamos tu operativa actual en 20 minutos. Sin rodeos: te diremos dónde tienes fugas y cómo taparlas con automatización.
              </p>
              
              <div className="flex flex-col items-center gap-6">
                <a href="/diagnostico" className="btn-acid inline-flex items-center gap-3 py-6 px-10 text-lg">
                  Agendar Auditoría Gratuita <ArrowRight size={18} />
                </a>
                
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/30 text-xs font-bold mono tracking-widest uppercase">
                    Sesión 100% gratuita · Sin obligaciones 
                  </p>
                  <p className="text-white/20 text-[10px] mono">
                    Respondemos en menos de 24h · Sin compromiso de permanencia
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

function FlowCard({ flow, index }: { flow: any, index: number }) {
  const cardRef = useRef(null)
  
  return (
    <section 
      ref={cardRef}
      className="sticky top-[10vh] min-h-[80vh] flex items-center justify-center mb-[10vh]"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-[#0A0A12] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 overflow-hidden relative shadow-2xl"
      >
        <div 
          className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 pointer-events-none"
          style={{ background: flow.color }}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${flow.color}15`, border: `1px solid ${flow.color}30` }}
              >
                <flow.icon size={30} style={{ color: flow.color }} />
              </div>
              <div>
                <span className="text-[#B8FF2E] mono text-[10px] tracking-widest uppercase font-black opacity-50">Módulo 0{flow.id}</span>
                <h2 className="text-white text-2xl font-bold uppercase tracking-tight">{flow.title}</h2>
              </div>
            </div>

            <h3 className="text-4xl md:text-6xl font-extrabold text-white leading-none tracking-tighter">
              {flow.headline}
            </h3>

            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              {flow.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flow.benefits.map((benefit: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={16} className="text-[#B8FF2E] flex-shrink-0" />
                  <span className="text-white/80 text-sm font-bold">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-6 hidden md:block backdrop-blur-md">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6 font-mono">Lógica Interna</div>
              <div className="space-y-4">
                {flow.steps.map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-[#B8FF2E] font-mono text-xs font-black">0{i+1}</span>
                    <span className="text-white/60 text-sm font-medium italic">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              whileHover={{ y: -5, rotate: 0 }}
              initial={{ rotate: 2 }}
              className="bg-[#1C1C24] rounded-[2.5rem] p-2 md:p-3 border-[6px] border-[#2A2A35] shadow-2xl mx-auto max-w-[320px]"
            >
              <div className="bg-[#0B0B12] rounded-[2rem] overflow-hidden">
                <div className="bg-[#2A2A35]/50 p-4 flex items-center gap-3 border-b border-white/5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageSquare size={14} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white">AVOIDStudio</span>
                </div>
                <div className="p-6">
                  <div className="bg-[#2A2A35] rounded-2xl rounded-tl-none p-4 text-white text-[11px] leading-relaxed font-medium mono relative shadow-inner">
                    {flow.wa.split('\n').map((line: string, i: number) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                    <div className="text-[8px] text-white/20 text-right mt-2 font-mono italic">AHORA ✓✓</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>an

        </div>
      </motion.div>
    </section>
  )
}