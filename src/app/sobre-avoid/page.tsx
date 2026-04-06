'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── COPY — mateixa estructura, altres paraules ──────────────────────
const problems = [
  'Tot depenia que una persona concreta hi fos present',
  'Cada eina funcionava per separat, sense parlar amb les altres',
  'El temps de l\'equip se n\'anava en coses que podien fer-se soles',
  'Hi havia pacients que desapareixien perquè ningú els trucava després',
]

const understood = [
  'El problema no era fer les coses més ràpid. Era fer altres coses.',
  'Cada tasca manual que s\'elimina és temps que es converteix en diners.',
  'Un bon sistema segueix treballant fins i tot quan ningú hi és.',
]

const method = [
  {
    n: '01',
    t: 'Anàlisi sense filtres',
    d: 'Abans de proposar res, mirem per dins com funciona el teu negoci de veritat. Què està costant diners. Què està costant temps.',
  },
  {
    n: '02',
    t: 'Disseny específic per a tu',
    d: 'No fem servir la mateixa solució per a tots. Cada sistema es construeix pensant en com funciona la teva clínica concreta. El que serveix per a una no encaixa en una altra.',
  },
  {
    n: '03',
    t: 'Números reals, no estimacions',
    d: 'Si no es pot mesurar, no compta. Treballem amb dades concretes: buits recuperats, diners generats, hores que ja no has de dedicar.',
  },
]

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function SobreAvoid() {
  return (
    <main className="relative">
      <Navbar activePage="sobre-avoid" />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-20 px-6 md:px-20 pt-40 overflow-hidden grid-bg">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(184,255,46,0.05) 0%, transparent 70%)' }}
        />

        <div className="max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pill mb-10 inline-flex"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
            Qui som
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,8vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-8"
          >
            <span className="text-white/15">Del problema</span><br />
            <span className="text-[#B8FF2E] acid-glow">a la solució.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed"
          >
            AVOID va néixer de veure, una vegada i una altra, clíniques que funcionaven bé
            però perdien diners per coses que es podien solucionar soles.
          </motion.p>
        </div>
      </section>

      {/* ── ORIGEN ── */}
      <section className="section">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <Section>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#B8FF2E]/50 mb-6 mono">// L'origen</div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase mb-8">
              El que vam trobar
            </h2>
            <div className="flex flex-col gap-4">
              {problems.map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-red-500/10 bg-red-500/[0.02]">
                  <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-white/50 text-sm font-medium leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#B8FF2E]/50 mb-6 mono">// El que vam entendre</div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase mb-8">
              La conclusió
            </h2>
            <div className="flex flex-col gap-4 mb-10">
              {understood.map((u, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-[#B8FF2E]/10 bg-[#B8FF2E]/[0.02]">
                  <div className="w-5 h-5 rounded-full bg-[#B8FF2E]/15 border border-[#B8FF2E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
                  </div>
                  <span className="text-white/60 text-sm font-medium leading-relaxed">{u}</span>
                </div>
              ))}
            </div>
            <blockquote className="border-l-2 border-[#B8FF2E]/40 pl-6">
              <p className="text-white/30 text-sm italic leading-relaxed font-medium">
                "Així va anar prenent forma AVOID. No com un producte. Com la resposta
                natural a alguna cosa que veiem passar en totes i cadascuna de les clíniques."
              </p>
            </blockquote>
          </Section>
        </div>
      </section>

      {/* ── QUÈ FEM AVUI ── */}
      <section className="section bg-[#060610] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <Section>
            <div className="pill mb-8 inline-flex">Avui</div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-10">
              <span className="text-white/20">Menys soroll.</span><br />
              <span className="text-[#B8FF2E] acid-glow">Més resultat.</span>
            </h2>
            <p className="text-white/40 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Connectem les eines que ja fas servir, eliminem les tasques que
              consumeixen temps sense generar valor i reduïm tot el que frena la teva
              clínica. El resultat: facturació que creix sense que hagis d'estar
              pendent de tot.
            </p>
          </Section>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { val: '72h',  label: 'Setup complet'  },
              { val: '−38%', label: 'No-shows'        },
              { val: '×4',   label: 'ROI mitjà'       },
              { val: '24/7', label: 'Actiu sempre'    },
            ].map((s, i) => (
              <Section key={i}>
                <div className="p-6 border border-white/5 bg-white/[0.02] text-center">
                  <div className="text-3xl font-extrabold text-[#B8FF2E] tracking-tighter">{s.val}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 mt-1">{s.label}</div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÈTODE ── */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Section className="mb-16 md:mb-20">
            <div className="pill mb-8 inline-flex">Com treballem</div>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
              <span className="text-white/20">Sense rodeos.</span><br />
              <span className="text-[#B8FF2E] acid-glow">Sense fum.</span>
            </h2>
          </Section>

          <div className="flex flex-col gap-px">
            {method.map((m, i) => (
              <Section key={i}>
                <div className="group flex items-start gap-8 p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#B8FF2E]/15 transition-all duration-400">
                  <span className="mono text-[#B8FF2E]/30 text-sm font-black flex-shrink-0 group-hover:text-[#B8FF2E]/60 transition-colors">
                    {m.n}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base uppercase tracking-tight mb-2">{m.t}</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">{m.d}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section bg-[#060610] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <Zap size={28} className="text-[#B8FF2E] mx-auto mb-8 opacity-60" />
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
              Té sentit<br />
              <span className="text-[#B8FF2E] acid-glow">parlar?</span>
            </h2>
            <p className="text-white/40 font-medium mb-10 max-w-md mx-auto leading-relaxed">
              En 30 minuts veiem junts quants diners estan sortint per la porta
              i què cal fer per aturar-ho.
            </p>
            <a href="/diagnostico" className="btn-acid inline-flex">
              Sol·licitar diagnòstic gratuït <ArrowRight size={14} />
            </a>
            <p className="text-white/20 text-xs font-medium mt-6 mono">
              Sense compromís · Responem en menys de 24h
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </main>
  )
}
