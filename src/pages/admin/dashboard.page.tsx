import { useUser } from "reactfire"
import { Link } from "react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Book,
  Calendar,
  Coins,
  MessageCircle,
  Pencil,
  Timer,
  User,
  ArrowRight,
} from "lucide-react"

const quickActions = [
  {
    title: "Tareas",
    description: "Crea y organiza tus tareas pendientes",
    href: "/admin/tasks",
    icon: Book,
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-500",
    borderColor: "hover:border-blue-500/30",
  },
  {
    title: "Mensajes",
    description: "Conversa con tus contactos en tiempo real",
    href: "/admin/chat",
    icon: MessageCircle,
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-500",
    borderColor: "hover:border-violet-500/30",
  },
  {
    title: "Perfil",
    description: "Actualiza tu nombre y foto de perfil",
    href: "/admin/profile",
    icon: User,
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-500",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    title: "Pomodoro",
    description: "Gestiona tu tiempo con sesiones de enfoque",
    href: "/admin/pomodoro",
    icon: Timer,
    color: "from-red-500/10 to-red-600/5",
    iconColor: "text-red-500",
    borderColor: "hover:border-red-500/30",
  },
  {
    title: "Promedio",
    description: "Calcula y visualiza tus promedios académicos",
    href: "/admin/promedio",
    icon: Pencil,
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-500",
    borderColor: "hover:border-amber-500/30",
  },
  {
    title: "Horario",
    description: "Organiza tu semana con bloques de horario",
    href: "/admin/horario",
    icon: Calendar,
    color: "from-cyan-500/10 to-cyan-600/5",
    iconColor: "text-cyan-500",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    title: "Gastos",
    description: "Controla y visualiza tus gastos mensuales",
    href: "/admin/gastos",
    icon: Coins,
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-orange-500",
    borderColor: "hover:border-orange-500/30",
  },
]



const DashboardPage = () => {
  const { data: user } = useUser()

  const displayName = user?.displayName || "Invitado"
  const email = user?.email || ""
  const initials = displayName.slice(0, 2).toUpperCase()
  return (
    <div className="space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-violet-500/10 border">
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold flex-shrink-0 ring-2 ring-primary/20 shadow-lg">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground font-medium">
                Bienvenido
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5 truncate">
                {displayName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Label */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Accesos rápidos</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Todo lo que necesitas para tu día a día académico
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.href} to={action.href}>
            <Card
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${action.borderColor}`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`h-10 w-10 rounded-xl bg-background border flex items-center justify-center ${action.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <CardTitle className="relative text-lg mt-3">
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-[13px] leading-relaxed">
                  {action.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer tip */}
      <div className="text-center pb-4">
        <p className="text-xs text-muted-foreground">
          Usa la barra de navegación superior para acceder a cualquier sección
        </p>
      </div>
    </div>
  )
}
export default DashboardPage