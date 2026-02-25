import { lazy, Suspense } from "react"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire"

const MacbookScene = lazy(() => import("@/components/macbook-scene"))

const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck()

  if (status === "loading" || !hasEmitted) {
    return <div>Loading....</div>
  }

  // redirigir si el usuario ya está autenticado
  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#0a0f1a' }}>
      {/* Left side — 3D MacBook */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full h-full" style={{ background: 'linear-gradient(160deg, #030712 0%, #0a0f1a 40%, #111827 100%)' }} />
          }
        >
          <MacbookScene />
        </Suspense>
      </div>

      {/* Right side — Login / Register form (same dark theme) */}
      <div
        className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 py-12 sm:px-12 relative"
        style={{ background: 'linear-gradient(180deg, #0d1320 0%, #0a0f1a 100%)' }}
      >
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default AuthLayout