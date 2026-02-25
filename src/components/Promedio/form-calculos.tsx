import { useState } from "react"
import { useCalculo } from "@/hooks/use-calculo"
import { promedioZodSchema, type PromedioZodSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const FormCalculo = () => {

  const { calcular } = useCalculo()
  const [resultado, setResultado] = useState<number | null>(null)




  const form = useForm<PromedioZodSchema>({
    resolver: zodResolver(promedioZodSchema),
    defaultValues: {
      notas: [{ valor: 1, porcentaje: 0 }]
    }
  })

  const { control, register, handleSubmit } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "notas"
  })
  const notas = form.watch("notas")
  const sumaPorcentajes = notas.reduce((acc, n) => acc + (Number(n.porcentaje) || 0), 0)

  const onSubmit = (values: PromedioZodSchema) => {
    const promedio = calcular(values.notas)
    setResultado(promedio)
  }

  return (
    <div className="flex items-start justify-center py-8 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>
            Calculadora de Promedio
          </CardTitle>
          <CardDescription>
            Ingresa tus notas y sus porcentajes para calcular el promedio ponderado.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Nota</Label>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Porcentaje (%)</Label>
              <div className="w-9" />
            </div>

            {/* Grade rows */}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center group">
                  <Input
                    type="number"
                    placeholder="Ej: 5.5"
                    step="0.1"
                    {...register(`notas.${index}.valor`)}
                  />
                  <Input
                    type="number"
                    placeholder="Ej: 30"
                    min={0}
                    max={100}


                    {...register(`notas.${index}.porcentaje`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                  </Button>
                </div>
              ))}
            </div>

            {/* Add note button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={() => append({ valor: 1, porcentaje: 0 })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              Agregar Nota
            </Button>

            {/* Result display */}
            {resultado !== null && (
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-center space-y-1">
                <p className="text-sm text-muted-foreground font-medium">Tu promedio ponderado es</p>
                <p className="text-3xl font-bold text-primary tracking-tight">
                  {resultado.toFixed(2)}
                </p>
              </div>

            )}
            <div>
              {sumaPorcentajes !== 100 && (
                <p className={`text-sm font-medium ${sumaPorcentajes > 100 ? "text-destructive" : "text-red-500"}`}>
                  Porcentaje total: {sumaPorcentajes}% / 100% , tiene que ser 100%
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full mt-4" size="lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /><circle cx="12" cy="12" r="10" /></svg>
              Calcular Promedio
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default FormCalculo