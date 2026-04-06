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
    role: 'El cervell del sistema',
    color: '#FF6B35',
    tag: 'Motor d\'automatització',
    headline: 'El director d\'orquestra que ho coordina tot.',
    body: 'n8n és la plataforma que connecta totes les peces i decideix quan actuar. Funciona com un empleat invisible que treballa les 24 hores: comprova el calendari, detecta quines cites hi ha demà, genera els missatges correctes i els envia en el moment exacte. Sense que tu facis res.',
    note: 'Instal·lat al núvol d\'AVOID. Tu no gestiones res tècnic.',
    stats: [
      { label: 'Workflows actius', val: '7' },
      { label: 'Execucions / dia', val: '~40' },
      { label: 'Intervenció manual', val: '0' },
    ],
  },
  {
    name: 'Twilio',
    role: 'El canal de comunicació',
    color: '#F22F46',
    tag: 'WhatsApp Business API',
    headline: 'El que parla amb els teus pacients. De debò.',
    body: 'Twilio és la infraestructura oficial de WhatsApp per a empreses. Gràcies a ell, el sistema envia i rep missatges reals — no simulats. Quan un pacient respon "sí" a les 11 de la nit, Twilio ho captura i ho processa en menys d\'un segon.',
    note: 'Cost real: ~0,005€ per missatge. Per a 80 cites/mes, menys de 12€/mes en total.',
    stats: [
      { label: 'Cost per missatge', val: '0,005€' },
      { label: 'Entrega', val: '<1s' },
      { label: 'Obertura WhatsApp', val: '98%' },
    ],
  },
  {
    name: 'Google Calendar',
    role: 'La font de veritat',
    color: '#4285F4',
    tag: 'La teva agenda actual',
    headline: 'El sistema llegeix el teu calendari. Tu no canvies res.',
    body: 'No cal instal·lar programari nou ni migrar dades. El sistema llegeix el Google Calendar que ja fas servir, extreu el nom i telèfon del pacient del títol de cada event, i actua. Quan una cita es confirma, el títol s\'actualitza amb ✅. Quan es cancel·la, amb ❌.',
    note: 'Format: "Laura Martín - 612345678" o "Laura (primera visita) - 612345678"',
    stats: [
      { label: 'Programari nou', val: 'Cap' },
      { label: 'Migració', val: 'No' },
      { label: 'Sync', val: 'Real-time' },
    ],
  },
  {
    name: 'Webhook',
    role: 'L\'oïda que mai dorm',
    color: '#B8FF2E',
    tag: 'Escolta activa 24/7',
    headline: 'Captura cada resposta a l\'instant, a qualsevol hora.',
    body: 'Un webhook és un punt de connexió sempre encès. Quan un pacient respon "confirmo" a les 11 de la nit o un diumenge, el sistema ho detecta a l\'instant i executa l\'acció correcta: avisar el negoci, respondre al pacient i actualitzar el calendari. Sense demores, sense horaris.',
    note: 'Detecta +20 variants: SÍ, SI, 1, OK, YES, VINC / NO, CANCEL·LO, 2, NO PUC, ANUL·LO...',
    stats: [
      { label: 'Disponibilitat', val: '24/7' },
      { label: 'Reacció', val: '<2s' },
      { label: 'Variants detectades', val: '+20' },
    ],
  },
  {
    name: 'Google Maps',
    role: 'La teva reputació en automàtic',
    color: '#34A853',
    tag: 'Google Reviews',
    headline: 'Més ressenyes. Millor posició. Més pacients nous.',
    body: '24 hores després de cada visita, el sistema envia un WhatsApp amb l\'enllaç directe a la teva fitxa de Google. Sense rodeos, sense passos extra, en el moment en què el pacient encara recorda bé com va anar. El resultat: entre 3 i 5 ressenyes noves per setmana en clíniques actives, sense que ningú de l\'equip demani res.',
    note: 'El 87% dels nous pacients tria clínica basant-se en ressenyes de Google.',
    stats: [
      { label: 'Ressenyes / setmana', val: '3–5' },
      { label: 'Moment d\'enviament', val: '+24h' },
      { label: 'Conversió mitjana', val: '31%' },
    ],
  },
  {
    name: 'Static Data',
    role: 'La memòria del sistema',
    color: '#8B5CF6',
    tag: 'Estat de confirmacions',
    headline: 'Sap exactament quines cites estan pendents. Sempre.',
    body: 'El sistema guarda l\'estat de cada cita enviada: si el pacient ha respost, ha confirmat, ha cancel·lat o encara no ha dit res. Amb aquesta informació, el Safety Net de les 9h del dia anterior sap exactament qui incloure a la llista de pendents. Res no cau per les escletxes.',
    note: 'La memòria es reseteja automàticament cada dia. Sense acumulació de dades innecessàries.',
    stats: [
      { label: 'Estats rastrejats', val: '3' },
      { label: 'Falsos positius', val: '0' },
      { label: 'Reset', val: 'Diari' },
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
                L'Estructura · les nostres eines
              </div>
            </SlideIn>
            <SlideIn from="bottom" delay={0.1}>
              <h1 className="text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
                <span className="text-white/15">Com funciona</span><br />
                <span className="text-[#B8FF2E] acid-glow">per dins.</span>
              </h1>
            </SlideIn>
            <SlideIn from="bottom" delay={0.2}>
              <p className="text-white/35 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                Sis eines connectades entre si. Cada una fa una cosa
                concreta i la fa molt bé. Juntes, formen un sistema que no
                necessita que ningú el vigili.
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
                  Totes les peces de baix estan coordinades per{' '}
                  <span className="text-white/75 font-bold">n8n</span>, el motor central.
                  És el que fa que tot passi en el moment correcte, amb les dades correctes,
                  sense que tu hagis de fer res.
                </p>

                <div className="flex gap-6 md:gap-8 text-center flex-shrink-0 relative z-10">
                  {[
                    { v: '7', l: 'fluxos' },
                    { v: '24/7', l: 'actiu' },
                    { v: '0', l: 'intervenció' },
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
                    Com escriure els títols a Google Calendar
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Format estàndard',    val: 'Laura Martín - 612345678' },
                    { label: 'Primera visita',       val: 'Carlos Vega - 698765432 (primera visita)' },
                    { label: 'Amb prefix',           val: 'Ana López | +34612345678' },
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
                  El sistema extreu automàticament el nom i el telèfon. Si el títol inclou
                  "primera visita", genera un missatge de benvinguda diferent al de revisió. No cal
                  tocar cap altre ajust.
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
                <span className="text-white/25">Tot això</span><br />
                <span className="text-[#B8FF2E] acid-glow">Sense fer res</span>
              </h2>
              <p className="text-white/35 font-medium leading-relaxed max-w-lg mx-auto mb-10 text-sm md:text-base">
                No has d'entendre cada peça tècnica. Només gaudir del resultat:
                la teva agenda plena, els teus pacients confirmats i el teu Google Maps creixent sol.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/diagnostico" className="btn-acid">
                  Sol·licitar diagnòstic gratuït <ArrowRight size={13} />
                </a>
                <a href="/#sistema" className="btn-ghost">
                  Veure els 7 fluxos
                </a>
              </div>
              <p className="text-white/25 text-[10px] font-medium mt-8 mono">
                Sense compromís · Setup complet · Suport inclòs
              </p>
            </SlideIn>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
