import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { type BeneItem } from "@/types/home.types"
import { Reveal, stagger, cardFade } from "@/animations/home.animations"

const StepsSection = ({ steps }: { steps: BeneItem[] }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <section id="how" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-[#9333EA] text-xs font-semibold uppercase tracking-widest mb-3">
            Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Empieza en 3 pasos simples
          </h2>
        </Reveal>

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
        >
          {steps.map((s, i) => (
            <motion.div key={s.title} variants={cardFade} className="text-center">
              <div className="inline-flex flex-col items-center mb-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#9333EA] bg-purple-50 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-[#9333EA]" />
                </div>
                <span className="text-[10px] font-bold text-[#9333EA] tracking-widest uppercase">
                  Paso 0{i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-[#0F172A] text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StepsSection