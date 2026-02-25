import NavBar from "@/components/navbar"
import { Suspense } from "react"
import { Navigate, Outlet } from "react-router"
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
  useUser({ suspense: true })

  return (
    <div className="min-h-screen bg-muted/30">
      <NavBar />
      <main className="container mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}