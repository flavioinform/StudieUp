import {
  ListChecks,
  Bell,
  TrendingUp,
  UserPlus,
  BarChart2,
  Zap,
  GraduationCap,
} from "lucide-react"
import { type BeneItem } from "@/types/home.types"
import Navbar from "@/components/home/navbar"
import Hero from "@/components/home/hero"
import FeaturesSection from "@/components/home/features-section"
import StepsSection from "@/components/home/steps-section"
import DiffSection from "@/components/home/diff-section"
import CtaSection from "@/components/home/cta-section"
import Footer from "@/components/home/footer"

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const benefits: BeneItem[] = [
    {
      icon: ListChecks,
      title: "Gestióna tus tareas",
      desc: "Organiza, prioriza y rastrea todas tus entregas académicas en un solo lugar. Sin caos.",
    },
    {
      icon: Bell,
      title: "chatea de forma dinamica con solo tu correo",
      desc: "Crea grupos de estudios de forma dinamica y sin tener que dar contactos personales.",
    },
    {
      icon: TrendingUp,
      title: "Horario Academico",
      desc: "Crea tu horario academico o laboral de forma que mas te agrade.",
    },
  ]

  const steps: BeneItem[] = [
    {
      icon: UserPlus,
      title: "Crea tu cuenta",
      desc: "Regístrate gratis en menos de un minuto. Sin tarjeta de crédito.",
    },
    {
      icon: ListChecks,
      title: "Dashboard Interactivo ",
      desc: "Podras ver las diferentes funcionalidades con las que cuenta nuestra web .",
    },
    {
      icon: BarChart2,
      title: "Mejora tu rendimiento",
      desc: "Analiza tu progreso y alcanza tus metas académicas con claridad.",
    },
  ]

  const diffs: BeneItem[] = [
    {
      icon: Zap,
      title: "Plataforma simple",
      desc: "Productivo desde el primer día.",
    },
    {
      icon: BarChart2,
      title: "Enfocada en productividad",
      desc: "Cada función fue construida para maximizar tu rendimiento académico y cubrir ciertas necesidades.",
    },
    {
      icon: GraduationCap,
      title: "Para universitarios",
      desc: "Pensada desde cero para las necesidades reales de la vida universitaria.",
    },
  ]

  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Navbar />

      <Hero />

      <FeaturesSection items={benefits} />

      <section id="how" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#9333EA] text-xs font-semibold uppercase tracking-widest mb-3">
              Proceso
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Empieza en 3 pasos simples
            </h2>
          </div>
          <StepsSection steps={steps} />
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 lg:p-14">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                ¿Por qué elegir StudieUp?
              </h2>
              <p className="mt-4 text-[#64748B] max-w-xl mx-auto">
                No somos otra app genérica. Construida desde cero pensando en
                el estudiante universitario moderno.
              </p>
            </div>
            <DiffSection items={diffs} />
          </div>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </div>
  )
}

export default HomePage