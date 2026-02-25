import { Link } from "react-router"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import HeroDashboard from "./hero-dashboard"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-28 lg:pt-28 lg:pb-36">
      {/* Radial decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-purple-50/60 blur-3xl" />
        <div className="absolute top-32 right-[-120px] w-64 h-64 rounded-full bg-purple-100/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14 xl:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3.5 py-1.5 text-[11px] font-semibold text-purple-700 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Plataforma para apoyo a estudiante,docente y trabajador
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F172A] leading-[1.1] tracking-tight"
            >
              Organiza tu vida
              <br />
              académica con <span className="text-[#9333EA]">inteligencia</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-[#64748B] text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Tareas, Chat, Control de tus gastos y productividad en una sola
              plataforma.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#9333EA] text-white font-semibold text-sm rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
              >
                Comenzar ahora
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-[#1E293B] font-medium text-sm rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Ver cómo funciona
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
            >
              {/* <div className="flex -space-x-2">
                {["#7C3AED", "#9333EA", "#0891B2", "#059669", "#D97706"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: c, fontSize: 10 }}
                    >
                      {["A", "B", "C", "D", "E"][i]}
                    </div>
                  )
                )}
              </div>
              <p className="text-sm text-[#64748B]">
                <span className="font-semibold text-[#0F172A]">+2,400</span>{" "}
                estudiantes ya organizan su carrera
              </p> */}
            </motion.div>
          </div>

          {/* Dashboard visual */}
          <div className="flex-1 w-full">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero