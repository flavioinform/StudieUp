import { ListChecks, Bell, TrendingUp, UserPlus, BarChart2, Zap, GraduationCap } from "lucide-react"
import { type BeneItem } from "@/types/home.types"

export const benefits: BeneItem[] = [
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

export const steps: BeneItem[] = [
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

export const diffs: BeneItem[] = [
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