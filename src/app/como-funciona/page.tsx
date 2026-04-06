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
    title: 'Recordatori 48h',
    trigger: 'Cada dia · 9:00h',
    badge: 'Anti no-show principal',
    tagline: 'El missatge que arriba just quan el pacient encara pot reorganitzar-se.',
    desc: 'Dos dies abans de cada cita, el sistema comprova el teu Google Calendar, extreu el nom i telèfon del pacient i envia un WhatsApp personalitzat. Si és la primera visita, el to és de benvinguda. Si és una revisió, és un recordatori directe. El pacient només ha de respondre una paraula.',
    why: 'La majoria de no-shows passen perquè el pacient s\'ha oblidat, no perquè no volgués venir. Un recordatori a 48h dona temps per reorganitzar-se i redueix les absències entre un 70% i un 87%.',
    steps: [
      { n: '1', t: 'Comprova el calendari', d: 'Busca totes les cites del dia +48h.' },
      { n: '2', t: 'Detecta el tipus de visita', d: 'Primera vegada o revisió — missatge diferent.' },
      { n: '3', t: 'Extreu dades del pacient', d: 'Nom i telèfon del títol de l\'event.' },
      { n: '4', t: 'Genera el missatge', d: 'Personalitzat, natural, en to humà.' },
      { n: '5', t: 'Envia per WhatsApp', d: 'Via Twilio. Entregat en menys d\'1 segon.' },
    ],
    wa: 'Hola Laura! 👋 Et confirmem la teva sessió de *FISIO* el *dijous 20* a les *11:00h*.\n\nSi us plau respon:\n✅ *SÍ* per confirmar\n❌ *NO* si necessites cancel·lar\n\n_AVOID · Sistema automàtic_',
    impact: [
      { val: '−87%', label: 'No-shows' },
      { val: '48h', label: 'Antelació' },
      { val: '100%', label: 'Automàtic' },
    ],
  },
  {
    id: 2,
    icon: MessageSquare,
    color: '#22C55E',
    title: 'Gestió de respostes',
    trigger: 'Webhook · 24/7',
    badge: 'Resposta immediata',
    tagline: 'El bot entén el que diu el pacient. A les 11 de la nit. Un diumenge.',
    desc: 'Quan el pacient respon al WhatsApp, el sistema ho processa a l\'instant. No importa si escriu "sí", "1", "confirmo", "ok" o fins i tot "clar que sí". També detecta cancel·lacions en qualsevol format. En dècimes de segon: avisa el negoci, respon al pacient i actualitza el calendari.',
    why: 'Un sistema que només envia missatges però no gestiona les respostes és incomplet. La màgia passa en el cicle complet: missatge → resposta → acció → calendari actualitzat. Sense intervenció humana en cap moment.',
    steps: [
      { n: '1', t: 'Escolta 24/7', d: 'Webhook actiu sempre, sense horaris.' },
      { n: '2', t: 'Detecta la intenció', d: 'SÍ, 1, OK, CONFIRMO / NO, 2, CANCEL·LO, ANUL·LO...' },
      { n: '3', t: 'Avisa el negoci', d: 'WhatsApp immediat al número del centre.' },
      { n: '4', t: 'Respon al pacient', d: 'Confirmació o alternativa segons el cas.' },
      { n: '5', t: 'Actualitza el calendari', d: '✅ confirmada · ❌ cancel·lada · visible a l\'instant.' },
    ],
    wa: '✅ *Perfecte Laura!* La teva cita queda confirmada.\n\nT\'esperem el *dijous 20 a les 11:00h*.\n\nFins aviat! 😊\n\n_AVOID · Sistema automàtic_',
    impact: [
      { val: '<2s', label: 'Temps de reacció' },
      { val: '+20', label: 'Paraules detectades' },
      { val: '24/7', label: 'Sense horaris' },
    ],
  },
  {
    id: 3,
    icon: Star,
    color: '#F59E0B',
    title: 'Ressenya post-visita',
    trigger: 'Cada dia · 10:00h',
    badge: 'SEO local automàtic',
    tagline: 'El moment exacte en que el pacient encara recorda com va anar la visita.',
    desc: 'Cada matí, el sistema busca totes les cites que es van realitzar ahir. Exclou les cancel·lades. Comprova que el pacient tingui telèfon. I envia un WhatsApp amb l\'enllaç directe a la fitxa de Google de la teva clínica — sense intermediaris, sense formularis. El pacient arriba directament a deixar la seva valoració en un clic.',
    why: 'Demanar la ressenya 24 hores després de la visita, quan l\'experiència encara és fresca, multiplica la taxa de conversió per 4 respecte a demanar-la a consulta o per email setmanes després. Sense aquest sistema, la majoria de pacients satisfets mai no deixen ressenya perquè ningú els ho demana en el moment correcte.',
    steps: [
      { n: '1', t: 'Busca cites d\'ahir', d: 'A Google Calendar, ordenades per hora.' },
      { n: '2', t: 'Exclou cancel·lades', d: 'Només pacients que han assistit realment.' },
      { n: '3', t: 'Valida el telèfon', d: 'Sense número, sense enviament. Zero errors.' },
      { n: '4', t: 'Envia el WhatsApp', d: 'Amb link directe a la teva fitxa de Google Maps.' },
      { n: '5', t: 'Sense duplicats', d: 'Si ja ha rebut una ressenya aquesta setmana, s\'omet.' },
    ],
    wa: 'Hola Laura! 😊 Esperem que la teva visita d\'ahir fos genial.\n\nEns deixaries una ressenya ràpida a Google? Només 1 minut ⏱️\n\n👉 maps.google.com/la-teva-clinica\n\nMoltes gràcies! 🙏\n_AVOID · Sistema automàtic_',
    impact: [
      { val: '3–5', label: 'Ressenyes / setmana' },
      { val: '×4', label: 'Més conversió' },
      { val: '+24h', label: 'Timing perfecte' },
    ],
  },
  {
    id: 4,
    icon: RefreshCw,
    color: '#8B5CF6',
    title: 'Reactivació 90 dies',
    trigger: 'Cada dilluns · 10:00h',
    badge: 'Facturació recurrent',
    tagline: 'Pacients que se n\'han anat. Que tornen sols. Sense que ningú els truqui.',
    desc: 'Cada dilluns, el sistema analitza el calendari de fa exactament 90 dies. Identifica quins pacients van tenir una cita llavors però no han tornat en els mesos següents. Filtra duplicats per no enviar dos missatges al mateix telèfon. I envia un missatge càlid, sense pressió, invitant a tornar quan ho necessitin.',
    why: 'El 40% dels pacients que no tornen no és perquè no vulguin — és perquè ningú els ha contactat. Un missatge de reactivació enviat en el moment correcte (90 dies) converteix entre el 18% i el 26% d\'aquests pacients adormits en cites noves. És facturació que ja tenies guanyada i que s\'estava perdent per falta de seguiment.',
    steps: [
      { n: '1', t: 'Llegeix cites de fa 90 dies', d: 'Rang de ±3 dies per a més cobertura.' },
      { n: '2', t: 'Creua amb historial recent', d: 'Descarta qui ja ha tornat.' },
      { n: '3', t: 'Filtra duplicats', d: 'Un missatge per telèfon, sense excepcions.' },
      { n: '4', t: 'Genera el missatge', d: 'Càlid, sense pressió, amb nom propi.' },
      { n: '5', t: 'Envia el dilluns a les 10h', d: 'Moment de major taxa d\'obertura.' },
    ],
    wa: 'Hola Laura! 👋 Fa temps que no ens veiem i volia saber com estàs.\n\nSi en algun moment necessites tornar a veure\'t amb nosaltres, estarem encantats d\'atendre\'t.\n\n¿Reservem aquesta setmana? 😊\n_AVOID · Sistema automàtic_',
    impact: [
      { val: '18–26%', label: 'Conversió' },
      { val: '40%', label: 'Pacients adormits' },
      { val: 'Dilluns 10h', label: 'Timing òptim' },
    ],
  },
  {
    id: 5,
    icon: Shield,
    color: '#EF4444',
    title: 'Safety Net 9h',
    trigger: 'Cada dia · 9:00h',
    badge: 'Xarxa de seguretat humana',
    tagline: 'La llista de pacients que encara no han confirmat. Al teu mòbil cada matí.',
    desc: 'A les 9 del matí del dia anterior, el sistema revisa totes les cites de demà. Identifica quines no tenen el ✅ de confirmació al títol del calendari. I envia al negoci una llista clara amb nom, hora i telèfon de cada pacient pendent. L\'equip els pot trucar si ho considera necessari.',
    why: 'El sistema automatitza el 90% de la feina, però hi ha pacients que simplement no responen al WhatsApp. Aquest flux garanteix que el negoci sempre tingui una visió completa del que pot passar demà, amb temps suficient per actuar si vol. És la xarxa de seguretat que protegeix contra l\'imprevist.',
    steps: [
      { n: '1', t: 'Busca cites de demà', d: 'Totes les del dia següent.' },
      { n: '2', t: 'Filtra les confirmades', d: 'Les que ja tenen ✅ al títol.' },
      { n: '3', t: 'Extreu les pendents', d: 'Nom, hora i telèfon de cada una.' },
      { n: '4', t: 'Genera el llistat', d: 'Clar, ordenat per hora.' },
      { n: '5', t: 'Envia al negoci', d: 'A les 9h en punt. Sempre.' },
    ],
    wa: '⚠️ *CITES SENSE CONFIRMAR DEMÀ*\n\n• Laura Martín · 11:00h · +34612345678\n• Carlos Vega · 12:30h · +34698765432\n• Ana López · 16:00h · +34691234567\n\nTotal pendents: 3\n💡 Pots trucar-los si ho consideres.\n_AVOID · Sistema automàtic_',
    impact: [
      { val: '9:00h', label: 'Alerta diària' },
      { val: '0', label: 'Cites perdudes per descuit' },
      { val: '100%', label: 'Visibilitat' },
    ],
  },
  {
    id: 6,
    icon: BarChart2,
    color: '#06B6D4',
    title: 'Resum diari',
    trigger: 'Cada dia · 8:00h',
    badge: 'Briefing matutí',
    tagline: 'El teu equip comença el dia sabent exactament què té per davant.',
    desc: 'Cada matí a les 8h, abans que obri la clínica, el negoci rep un WhatsApp amb el resum complet del dia: nom de cada pacient, hora, i estat de confirmació. Confirmades en verd, pendents en groc, cancel·lades indicades. Sense obrir l\'ordinador, sense entrar al calendari. La informació rellevant directament al mòbil.',
    why: 'Començar el dia amb claredat sobre l\'agenda elimina la fricció dels primers 20 minuts de feina on l\'equip comprova qui ve i qui no. També permet anticipar buits i gestionar millor els temps. És un petit detall que canvia la dinàmica de l\'equip.',
    steps: [
      { n: '1', t: 'Carrega les cites del dia', d: 'Totes, en ordre cronològic.' },
      { n: '2', t: 'Detecta l\'estat de cada una', d: '✅ confirmada · 🟡 pendent · ❌ cancel·lada.' },
      { n: '3', t: 'Compta i agrupa', d: 'Total, confirmades, pendents, cancel·lades.' },
      { n: '4', t: 'Genera el briefing', d: 'Net, llegible al mòbil d\'un cop d\'ull.' },
      { n: '5', t: 'Envia a les 8h en punt', d: 'Abans que comenci la jornada.' },
    ],
    wa: '📋 *AGENDA D\'AVUI · Dijous 20*\n\n10:00h · Laura Martín · ✅\n11:30h · Carlos Vega · 🟡 Sense confirmar\n13:00h · Ana López · ✅\n16:00h · Pedro Ruiz · ❌ Cancel·lada\n\n──────────────\nTotal: 4 · ✅ 2 · 🟡 1 · ❌ 1\n\n_AVOID · Briefing automàtic_',
    impact: [
      { val: '8:00h', label: 'Abans d\'obrir' },
      { val: '0min', label: 'Preparació manual' },
      { val: '100%', label: 'Visibilitat diària' },
    ],
  },
  {
    id: 7,
    icon: Target,
    color: '#F97316',
    title: 'Buits last-minute',
    trigger: 'Cada dia · 20:00h',
    badge: 'Facturació recuperada',
    tagline: 'Cada cancel·lació és un buit. Cada buit avisat a temps és una oportunitat.',
    desc: 'Cada dia a les 8 del vespre, el sistema detecta si hi ha cancel·lacions per al dia següent. Si n\'hi ha, envia una alerta al negoci amb l\'hora exacta del buit alliberat. L\'equip pot oferir aquella plaça a un pacient en llista d\'espera o a algú que havia demanat cita urgent. Sense aquest sistema, aquell buit simplement queda buit.',
    why: 'Una cancel·lació a les 7 del vespre per al dia següent és gairebé impossible de cobrir de forma manual — l\'equip ja no treballa. Aquest flux automàtic permet actuar en el moment en què encara hi ha temps per reaccionar, abans que sigui massa tard. Cada buit recuperat és entre 40€ i 100€ directament a caixa.',
    steps: [
      { n: '1', t: 'Detecta cancel·lacions de demà', d: 'Títols amb ❌ al calendari.' },
      { n: '2', t: 'Extreu l\'hora del buit', d: 'El slot exacte que queda lliure.' },
      { n: '3', t: 'Comprova si n\'hi ha més d\'un', d: 'Agrupa si hi ha diversos buits.' },
      { n: '4', t: 'Genera l\'alerta', d: 'Clara, amb l\'hora i el context.' },
      { n: '5', t: 'Envia a les 20h', d: 'Temps suficient per reaccionar.' },
    ],
    wa: '🎯 *BUIT DISPONIBLE DEMÀ*\n\nS\'ha alliberat una cita a les *12:30h*.\n\nTens algun pacient en llista d\'espera o que necessiti cita urgent?\n\nÉs el moment de recuperar aquesta hora! 💪\n_AVOID · Alerta automàtica_',
    impact: [
      { val: '20:00h', label: 'Alerta diària' },
      { val: '40–100€', label: 'Per buit recuperat' },
      { val: '0', label: 'Buits invisibles' },
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
          <div className="mono text-[8px] text-[#25D366] leading-none mt-0.5">● En línia</div>
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
function StackCard({ flow, index, total }: { flow: typeof flows[0]; index: number; total: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const topOffset = 80 + index * 8

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="sticky"
      style={{ top: topOffset }}
    >
      <div
        className="border bg-[#06060F] overflow-hidden"
        style={{
          borderColor: `${flow.color}20`,
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
                Per què funciona
              </div>
              {flow.why}
            </div>
            {/* Steps */}
            <div className="flex flex-col gap-2">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">
                Seqüència
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
                Missatge real generat
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
                7 fluxos · Actius 24/7 · Sense intervenció
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase mb-6">
                <span className="text-white/15">El sistema</span><br />
                <span className="text-[#B8FF2E] acid-glow">que treballa.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-white/35 text-base md:text-xl font-medium max-w-2xl leading-relaxed mb-10">
                Set fluxos automatitzats que s'executen sols, en el moment exacte,
                amb el missatge exacte. Tu passes consulta. El sistema omple la cadira.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Clock, label: 'Sense horaris d\'atenció' },
                  { icon: Zap, label: 'Resposta en segons' },
                  { icon: Shield, label: 'Zero fallades per oblit' },
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
              { val: '7',    label: 'Fluxos actius',     color: '#B8FF2E' },
              { val: '24/7', label: 'Sense parar mai',   color: '#22C55E' },
              { val: '−87%', label: 'Menys no-shows',    color: '#EF4444' },
              { val: '72h',  label: 'Setup complet',     color: '#8B5CF6' },
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
              <div className="pill mb-5 inline-flex">Els 7 fluxos</div>
              <h2 className="text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] uppercase">
                <span className="text-white/15">Què fa</span><br />
                <span className="text-[#B8FF2E] acid-glow">cadascun.</span>
              </h2>
              <p className="text-white/30 text-sm font-medium mt-4 max-w-lg">
                Fes scroll. Cada targeta s'apila sobre l'anterior mentre llegeixes el flux següent.
              </p>
            </FadeUp>

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
                <span className="text-white/15">Tot això,</span><br />
                <span className="text-[#B8FF2E] acid-glow">ho fem nosaltres.</span>
              </h2>
              <p className="text-white/35 font-medium leading-relaxed max-w-lg mx-auto mb-10 text-sm md:text-base">
                No has de configurar res. No has d'entendre la tecnologia.
                Només gaudir d'una agenda que es gestiona sola.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/diagnostico" className="btn-acid">
                  Sol·licitar diagnòstic gratuït <ArrowRight size={13} />
                </a>
                <a href="/perdidas" className="btn-ghost">
                  Veure quant perds ara
                </a>
              </div>
              <p className="text-white/15 text-[10px] font-medium mt-8 mono">
                Sense compromís · 30 min · Responem en menys de 24h
              </p>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
