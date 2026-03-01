import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { type BeneItem } from "@/types/home.types"
import { Reveal, stagger, cardFade } from "@/animations/home.animations"

const DiffSection = ({ items }: { items: BeneItem[] }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <section className="py-2 bg-[#972bc2]  border-black  transform transition-transform duration-500  hover:-translate-y-4 hover:scale-105">
      <div className="    ">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 lg:p-14">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
             Diseñada para cualquier persona
            </h2>
            <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
            
            </p>
          </Reveal>

          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {items.map((item) => (
              <motion.div
                key={item.title}
                variants={cardFade}
                className="flex gap-4"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg border border-slate-200 bg-[#F8FAFC] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#9333EA]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DiffSection