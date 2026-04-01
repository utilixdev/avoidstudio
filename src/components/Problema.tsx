'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, Clock, UserX, TrendingDown } from 'lucide-react'

const pains = [
  {
    icon: UserX,
    num: '−18%',
    label: 'Facturación directa',
    text: 'Cada cita vacía es dinero que no vuelve. Con 8 pacientes al día, un no-show diario ya desequilibra el mes.',
    color: '#FF4444',
  },
  {
    icon: Clock,
    num: '15h',
    label: 'Por semana de tu equipo',
    text: 'Cada WhatsApp gestionado a mano, cada llamada para confirmar, cada cancelación redirigida. Son horas que tu equipo paga con salario y tú no ves en ninguna factura.',
    color: '#FF8800',
  },
  {
    icon: TrendingDown,
    num: '4/10',
    label: 'Pacientes no vuelven',
    text: 'Sin seguimiento activo, casi la mitad de los pacientes desaparecen después de la primera sesión.',
    color: '#FF4444',
  },
  {
    icon: AlertTriangle,
    num: 'El 87% ',
    label: 'Elige clínica por Google',
    text: 'Sin reseñas, no apareces. Sin aparecer, no llaman. Cada visita sin petición de reseña es visibilidad que regala a tu competencia.',
    color: '#FF8800',
  },
]

export default function Problema() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="problema" ref={ref} className="section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="pill mb-8 inline-flex"
            style={{ borderColor: 'rgba(255,68,68,0.3)', color: '#FF4444', background: 'rgba(255,68,68,0.04)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Lo que pierdes cada semana
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="text-[clamp(2.8rem,7vw,7rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase"
          >
            <span className="text-white/15">Las pérdidas</span><br />
            <span className="text-red-500" style={{ textShadow: '0 0 40px rgba(255,68,68,0.3)' }}>que no ves.</span>
          </motion.h2>
        </div>

        {/* Pain cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
              className="card group p-8 md:p-10 flex gap-6 items-start relative overflow-hidden"
              style={{ borderColor: `${p.color}15` }}
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 0% 0%, ${p.color}06 0%, transparent 60%)` }}
              />

              {/* Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center"
                style={{ background: `${p.color}12`, border: `1px solid ${p.color}20` }}
              >
                <p.icon size={20} style={{ color: p.color }} />
              </div>

              <div className="flex-1 relative z-10">
                <div className="flex items-baseline gap-4 mb-3">
                  <span
                    className="text-3xl md:text-4xl font-extrabold tracking-tighter"
                    style={{ color: p.color }}
                  >
                    {p.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    {p.label}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed font-medium">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 p-8 border border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/40 text-sm font-medium max-w-xl">
            Una clínica con 120 citas/mes, ticket de 80€ y un <span className="text-white font-bold"> 18% de no-shows </span> pierde {' '}
            <span className="text-red-400 font-bold"> 1.728€/mes </span> solo en huecos vacíos. 
          Sin contar el tiempo de equipo ni los pacientes que no vuelven. Con los cuatro goteos, la pérdida real supera los 3.000€/mes.
          </p>

          <a href="#sistema" className="btn-acid flex-shrink-0">
            Ver cómo lo paramos →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
