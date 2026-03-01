import { useAuthActions } from "@/hooks/use-auth-actions"
import { Book, Calendar, Coins, LayoutDashboard, LogOut, MessageCircle, Pencil, Timer, User } from "lucide-react"
import { NavLink } from "react-router"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/layouts/root.layout"
import { Switch } from "./ui/switch"

const navigation = [
  { name: "Inicio", href: "/admin", icon: LayoutDashboard },
  { name: "Perfil", href: "/admin/profile", icon: User },
  { name: "Mensajes", href: "/admin/chat", icon: MessageCircle },
  { name: "Tareas", href: "/admin/tasks", icon: Book },
  { name: "Horario", href: "/admin/horario", icon: Calendar },
  { name: "Pomodoro", href: "/admin/pomodoro", icon: Timer },
  { name: "Promedio", href: "/admin/promedio", icon: Pencil },
  { name: "Control de gastos", href: "/admin/gastos", icon: Coins }
]

const NavBar = () => {
  const { logout } = useAuthActions()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto max-w-6xl flex items-center h-14 px-4 gap-1">
        {/* Logo */}
        <span className="text-lg font-bold tracking-tight mr-6">
          StudieUp
        </span>

        {/* Nav links */}
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )
            }
            end
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.name}</span>
          </NavLink>
        ))}

        {/* Theme toggle */}
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          className="ml-auto"
        />

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Salir</span>
        </Button>
      </nav>
    </header>
  )
}
export default NavBar