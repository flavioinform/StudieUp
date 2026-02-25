import FormProfile from "@/components/form-profile"
import { useUser } from "reactfire"

const ProfilePage = () => {
  const { data: user } = useUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground text-sm">
          Cargando...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground text-sm">
          Administra tu información personal
        </p>
      </div>

      <FormProfile user={user} />
    </div>
  )
}
export default ProfilePage