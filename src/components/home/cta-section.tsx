import { Link } from "react-router"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { fadeUp, fadeIn } from "@/animations/home.animations"

const CtaSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-28 bg-[#0F172A]">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          ¿Listo para empezar?
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          Empieza a organizar tu
          <br />
          <span className="text-[#9333EA]">éxito académico</span> hoy
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-5 text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
        >
          Únete a miles de estudiantes que ya logran más con StudieUp. Es gratis
          para comenzar.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/auth/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#9333EA] text-white font-semibold rounded-lg hover:bg-purple-500 transition-colors text-sm shadow-lg shadow-purple-500/20"
          >
            Crear cuenta gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center px-8 py-4 border border-slate-700 text-slate-300 font-medium rounded-lg hover:border-slate-500 hover:text-white transition-colors text-sm"
          >
            Ya tengo cuenta
          </Link>
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-6 text-slate-600 text-xs"
        >
          Sin tarjeta de crédito · Cancela cuando quieras · Plan básico siempre
          gratis
        </motion.p>
      </div>
    </section>
  )
}

export default CtaSection