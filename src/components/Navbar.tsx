'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true) // Nuevo estado para visibilidad
  const [lastScrollY, setLastScrollY] = useState(0) // Para comparar posición

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      
      // Control de fondo (tu lógica original)
      setScrolled(currentScrollY > 60)

      // Control de esconder/mostrar al hacer scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false) // Bajando: escondemos
      } else {
        setVisible(true) // Subiendo: mostramos
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
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
        // Modificamos el animate para que dependa de 'visible'
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${
          scrolled ? 'bg-[#04040A]/90 backdrop-blur-xl border-b border-white/5' : ''
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group transition-transform hover:scale-105">
          <Image 
            src="/logo.png" 
            alt="Avoid Studio Logo" 
            width={120} 
            height={30} 
            priority 
            className="acid-glow-svg"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/diagnostico" className="btn-acid text-[10px] py-3 px-6">
            Solicitar DIAGNÓSTICO <ArrowRight size={12} />
          </a>
        </div>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative w-8 h-8 flex flex-col items-end justify-center gap-1.5 md:hidden z-[110]"
          aria-label="menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6, width: 32 } : { rotate: 0, y: 0, width: 32 }}
            className="h-[1.5px] bg-white block"
          />
          <motion.span
            animate={open ? { opacity: 0, width: 0 } : { opacity: 1, width: 20 }}
            className="h-[1.5px] bg-white block"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6, width: 32 } : { rotate: 0, y: 0, width: 28 }}
            className="h-[1.5px] bg-white block"
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#04040A] flex flex-col items-start justify-center px-10 gap-6"
          >
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#B8FF2E]/5 blur-[150px] rounded-full pointer-events-none" />
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="text-4xl font-extrabold uppercase tracking-tighter text-white/20 hover:text-[#B8FF2E] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="btn-acid mt-4"
            >
              Solicitar Demo <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}