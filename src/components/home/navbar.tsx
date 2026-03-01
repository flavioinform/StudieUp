import { useState } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import logoMob from "@/assets/logo/logoMob.png"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: "Características", href: "#features" },
    { label: "Cómo funciona", href: "#how" },
    { label: "Contacto", href: "#footer" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoMob} alt="StudieUp Logo" className="w-8 h-8 rounded-lg object-contain bg-[#9333EA]" />
          <span className="font-bold text-[#0F172A] text-lg tracking-tight">
            StudieUp
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-sm text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-slate-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/auth/login"
            className="text-sm text-[#1E293B] font-medium hover:text-[#9333EA] transition-colors px-2"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/auth/register"
            className="text-sm bg-[#9333EA] text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Crea tu cuenta
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Menú"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-1"
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-slate-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2.5">
            <Link
              to="/auth/login"
              className="text-center text-sm py-2.5 text-[#1E293B] font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/auth/register"
              className="text-center text-sm py-2.5 bg-[#9333EA] text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Comenzar gratis
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Navbar