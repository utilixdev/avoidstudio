'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 60)
      if (open) return 
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY, open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
      document.body.style.touchAction = ''
    }
  }, [open])

  const links = [
    { label: 'Calcular Pérdidas', href: '/perdidas' },
    { label: 'Cómo funciona', href: '/como-funciona' },
    { label: 'El Sistema', href: '/sistema' },
    { label: 'Sobre AVOID', href: '/sobre-avoid' },
    { label: 'FAQ', href: '/faq' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible || open ? 0 : -100, opacity: visible || open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[120] flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${
          scrolled || open ? 'bg-[#04040A]/90 backdrop-blur-xl border-b border-white/5' : ''
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center z-[130]">
          <Image src="/logo.png" alt="Avoid Logo" width={110} height={28} priority className="acid-glow-svg" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.label} href={l.href} className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">{l.label}</Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/diagnostico" className="btn-acid text-[10px] py-3 px-6">DIAGNÓSTICO <ArrowRight size={12} /></Link>
        </div>

        <button 
          onClick={() => setOpen(!open)}
          className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 md:hidden z-[130] bg-white/5 rounded-full"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <motion.span 
            animate={open ? { rotate: 45, y: 4, width: 20 } : { rotate: 0, y: 0, width: 24 }}
            className="h-[1.5px] bg-white block origin-center" 
          />
          <motion.span 
            animate={open ? { rotate: -45, y: -4, width: 20 } : { rotate: 0, y: 0, width: 16 }}
            className="h-[1.5px] bg-white block origin-center" 
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] bg-[#04040A] flex flex-col items-start justify-center px-8 gap-6 pt-20"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[#B8FF2E]/5 blur-[120px] pointer-events-none" />
            
            {links.map((l, i) => (
              <div key={l.label} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1], 
                    delay: i * 0.08 
                  }}
                >
                  <Link 
                    href={l.href} 
                    onClick={() => setOpen(false)} 
                    className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-[#B8FF2E] transition-all active:scale-95 italic block"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              </div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <Link href="/diagnostico" onClick={() => setOpen(false)} className="btn-acid scale-110 origin-left">Solicitar Demo <ArrowRight size={14} /></Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}