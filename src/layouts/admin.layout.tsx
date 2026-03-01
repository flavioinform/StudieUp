import NavBar from "@/components/navbar"
import { sendEmailVerification } from "firebase/auth"
import { Suspense } from "react"
import { Navigate, Outlet } from "react-router"
import { toast } from "sonner"
import { useSigninCheck, useUser } from "reactfire"

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck()

  // Loading state
  if (status === "loading" || !hasEmitted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-muted-foreground text-sm">
          Cargando...
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!signInCheckResult.signedIn) {
    return <Navigate to="auth/login" replace />
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-muted-foreground text-sm">
            Cargando usuario...
          </div>
        </div>
      }
    >
      <AuthenticatedLayout />
    </Suspense>
  )
}
export default AdminLayout

const AuthenticatedLayout = () => {
  const { data: user } = useUser({ suspense: true })

  if (user && !user.emailVerified) {
    const handleResend = async () => {
      try {
        await sendEmailVerification(user)
        toast.success("Correo reenviado, revisa tu bandeja de entrada")
      } catch {
        toast.error("Error al reenviar, espera un momento e intenta de nuevo")
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-center px-4">
        <h2 className="text-xl font-semibold">Verifica tu correo</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Te enviamos un email de verificación a <strong>{user.email}</strong>.
          Revisa tu bandeja de entrada (y spam) y haz clic en el enlace.
        </p>
        <p className="text-xs text-muted-foreground">
          Una vez verificado, recarga la página.
        </p>
        <button
          onClick={handleResend}
          className="text-sm text-primary underline underline-offset-4 hover:opacity-75 transition-opacity"
        >
          ¿No te llegó? Reenviar correo
        </button>
      </div>
    )
  }




  return (
    <div className="min-h-screen bg-muted/30">
      <NavBar />
      <main className="container mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}