'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let mouse = { x: -500, y: -500 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.fillStyle = 'rgba(184,255,46,0.25)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (dm < 160) {
          ctx.strokeStyle = `rgba(184,255,46,${0.25 * (1 - dm/160)})`
          ctx.lineWidth = 0.6
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      })
      pts.forEach((p, i) => {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y)
          if (d < 100) {
            ctx.strokeStyle = `rgba(184,255,46,${0.12 * (1 - d/100)})`
            ctx.lineWidth = 0.4
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
  <section ref={ref} className="relative min-h-screen flex flex-col items-center pt-32 pb-32 overflow-hidden grid-bg">
    <ParticleCanvas />

    {/* Acid orb - Baixat una mica per no molestar el text */}
    <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(184,255,46,0.06) 0%, transparent 70%)' }} />

    <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">

      {/* Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-10"
      >
        <div className="pill">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
          Automatització de cites per a clíniques · WhatsApp + Google Calendar 
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22,1,0.36,1] }}
        className="text-[clamp(3.5rem,8vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-4"
      >
        <span className="block text-white/20">LA TEVA AGENDA </span>
        <span className="block text-[#B8FF2E] acid-glow">S'OMPLE SOLA.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="text-lg md:text-xl text-white/40 font-medium max-w-2xl mx-auto mb-14 leading-relaxed"
      >
        El sistema revisa la teva agenda cada matí, recorda els teus pacients per WhatsApp i omple els buits quan algú cancel·la. 
        Sense tocar el teu programari. Sense formació d'equip. <br/><br/>
        <span className="text-white/60">Tu passes consulta. La cadira la omplim nosaltres.</span>
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        {/* Lògica de navegació a /perdudes */}
        <Link href="/perdidas" className="btn-acid">
          Calcular quant estic perdent <ArrowRight size={12} />
        </Link>

        {/* Lògica anterior comentada per enviar l'usuari a la secció de la mateixa pàgina:
        <button 
          onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })} 
          className="btn-acid"
        >
          Calcular quant estic perdent <ArrowRight size={12} />
        </button> 
        */}

        <button 
          onClick={() => document.getElementById('sistema')?.scrollIntoView({ behavior: 'smooth' })} 
          className="btn-ghost"
        >
          Veure com funciona
        </button>
      </motion.div>

      {/* Ticker stats - Amb un marge superior una mica més curt per guanyar espai */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-16 w-full"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {[
            { val: '−38%', label: 'Menys no-shows' },
            { val: '+1.200€', label: 'Recuperats/mes*' },
            { val: '72h', label: 'Setup complet' },
            { val: '24/7', label: 'Sense intervenció' },
          ].map((s, i) => (
            <div key={i} className="text-center min-w-[120px]">
              <div className="text-2xl md:text-3xl font-extrabold text-[#B8FF2E] tracking-tighter leading-none">{s.val}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
        
        {/* Nota al peu amb CTA - Ara amb més marge perquè respiri */}
        <div className="mt-10 pb-10">
           <p className="text-[10px] mono text-white/50 tracking-wide">
             *Mitjana per a clínica amb 2 professionals i tiquet de 80€. 
             <button 
               onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
               className="ml-2 text-white/70 hover:text-[#B8FF2E] underline underline-offset-4 transition-colors font-bold"
             >
               Calcula el teu →
             </button>
           </p>
        </div>
      </motion.div>
    </motion.div>

    {/* Scroll cue - Pujat una mica més amb bottom-6 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 mono">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent"
      />
    </motion.div>
  </section>
)
}
