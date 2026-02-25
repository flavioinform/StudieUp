import FormGastos from "@/components/gastos/form-gastos"
import { Suspense } from "react"

const GastosPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground text-center py-8 animate-pulse">
            Cargando gastos...
          </div>
        }
      >
        <FormGastos />
      </Suspense>
    </div>
  )
}
export default GastosPage