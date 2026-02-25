import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { type BeneItem } from "@/types/home.types"
import { Reveal, stagger, cardFade } from "@/animations/home.animations"

// Stagger card grid
function StaggerCards({ items }: { items: BeneItem[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {items.map((b) => (
        <motion.div
          key={b.title}
          variants={cardFade}
          className="group rounded-xl bg-white border border-slate-200 p-7 hover:border-purple-200 hover:shadow-md transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
            <b.icon className="w-5 h-5 text-[#9333EA]" />
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-2">{b.title}</h3>
          <p className="text-[#64748B] text-sm leading-relaxed">{b.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

const FeaturesSection = ({ items }: { items: BeneItem[] }) => {
  return (
    <section id="features" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <p className="text-[#9333EA] text-xs font-semibold uppercase tracking-widest mb-3">
            Características
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Todo lo que necesitas para rendir mejor
          </h2>
          <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            Diseñado para estudiantes universitarios que quieren tomar control de su
            tiempo y rendimiento académico.
          </p>
        </Reveal>

        <StaggerCards items={items} />
      </div>
    </section>
  )
}

export default FeaturesSection