'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, Clock, UserX, TrendingDown } from 'lucide-react'

const pains = [
  {
    icon: UserX,
    num: '−18%',
    label: 'Facturació directa',
    text: 'Cada cita buida és diners que no tornen. Amb 8 pacients al dia, un no-show diari ja desequilibra el mes.',
    color: '#FF4444',
  },
  {
    icon: Clock,
    num: '15h',
    label: 'Per setmana del teu equip',
    text: 'Cada WhatsApp gestionat a mà, cada trucada per confirmar, cada cancel·lació redirigida. Són hores que el teu equip paga amb salari i tu no veus en cap factura.',
    color: '#FF8800',
  },
  {
    icon: TrendingDown,
    num: '4/10',
    label: 'Pacients no tornen',
    text: 'Sense seguiment actiu, gairebé la meitat dels pacients desapareixen després de la primera sessió.',
    color: '#FF4444',
  },
  {
    icon: AlertTriangle,
    num: 'El 87% ',
    label: 'Tria clínica per Google',
    text: 'Sense ressenyes, no apareixes. Sense aparèixer, no truquen. Cada visita sense petició de ressenya és visibilitat que regales a la teva competència.',
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
            El que perds cada setmana
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="text-[clamp(2.8rem,7vw,7rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase"
          >
            <span className="text-white/15">Les pèrdues</span><br />
            <span className="text-red-500" style={{ textShadow: '0 0 40px rgba(255,68,68,0.3)' }}>que no veus.</span>
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
            Una clínica amb 120 cites/mes, tiquet de 80€ i un <span className="text-white font-bold"> 18% de no-shows </span> perd {' '}
            <span className="text-red-400 font-bold"> 1.728€/mes </span> només en buits buits. 
          Sense comptar el temps d'equip ni els pacients que no tornen. Amb els quatre gotims, la pèrdua real supera els 3.000€/mes.
          </p>

          <a href="#sistema" className="btn-acid flex-shrink-0">
            Veure com ho aturem →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
