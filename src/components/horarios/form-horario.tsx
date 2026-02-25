import { useHorarioActions } from "@/hooks/use-horario-actions"
import { horarioZodSchema, type HorarioZodSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { horario } from "@/schemas/horario"

const DIAS_LABELS: Record<number, string> = { 1: "Lun", 2: "Mar", 3: "Mié", 4: "Jue", 5: "Vie", 6: "Sáb", 0: "Dom" }
const DIAS_FULL_LABELS: Record<number, string> = { 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado", 0: "Domingo" }
const DIAS_ORDEN = [1, 2, 3, 4, 5, 6, 0] // Lun → Dom

const COLORES = [
  { bg: "from-blue-500/20 to-blue-600/10", border: "border-blue-400/40", text: "text-blue-800", dot: "bg-blue-500" },
  { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-400/40", text: "text-emerald-800", dot: "bg-emerald-500" },
  { bg: "from-violet-500/20 to-violet-600/10", border: "border-violet-400/40", text: "text-violet-800", dot: "bg-violet-500" },
  { bg: "from-amber-500/20 to-amber-600/10", border: "border-amber-400/40", text: "text-amber-800", dot: "bg-amber-500" },
  { bg: "from-rose-500/20 to-rose-600/10", border: "border-rose-400/40", text: "text-rose-800", dot: "bg-rose-500" },
  { bg: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-400/40", text: "text-cyan-800", dot: "bg-cyan-500" },
  { bg: "from-fuchsia-500/20 to-fuchsia-600/10", border: "border-fuchsia-400/40", text: "text-fuchsia-800", dot: "bg-fuchsia-500" },
  { bg: "from-orange-500/20 to-orange-600/10", border: "border-orange-400/40", text: "text-orange-800", dot: "bg-orange-500" },
]

const FormHorario = () => {

  const { createHorario, horario, deleteHorario } = useHorarioActions()
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const form = useForm<HorarioZodSchema>({
    resolver: zodResolver(horarioZodSchema),
    defaultValues: {
      asignatura: "",
      profesor: "",
      dia: 1,
      hora_inicio: "",
      hora_final: "",
      sala: ""
    }
  })

  const onSubmit = async (values: HorarioZodSchema) => {
    try {
      setLoading(true)
      await createHorario(values)
      toast.success("Horario creado correctamente")
      form.reset()
      setShowForm(false)
    } catch (error) {
      console.log(error)
      toast.error("Error al crear el horario")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteHorario(id)
      toast.success("Clase eliminada")
    } catch {
      toast.error("Error al eliminar")
    }
  }

  const handleRepeat = (clase: horario) => {
    form.reset({
      asignatura: clase.asignatura,
      profesor: clase.profesor || "",
      sala: clase.sala || "",
      dia: 1,
      hora_inicio: "",
      hora_final: ""
    })
    setShowForm(true)
  }

  // Mapa de colores por asignatura
  const colorMap = new Map<string, typeof COLORES[0]>()
  horario.forEach((h) => {
    if (!colorMap.has(h.asignatura)) {
      colorMap.set(h.asignatura, COLORES[colorMap.size % COLORES.length])
    }
  })

  // Agrupar por día (solo Lun-Sáb para la vista principal)
  const horarioPorDia = DIAS_ORDEN.map((diaIndex) => ({
    dia: DIAS_LABELS[diaIndex],
    diaFull: DIAS_FULL_LABELS[diaIndex],
    index: diaIndex,
    clases: horario
      .filter((h) => h.dia === diaIndex)
      .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
  }))

  // Asignaturas únicas para leyenda
  const asignaturasUnicas = Array.from(colorMap.entries())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mi Horario</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {horario.length === 0
              ? "Empezá agregando tu primera clase"
              : `${horario.length} ${horario.length === 1 ? "clase" : "clases"} esta semana`
            }
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "default"}
          size="sm"
        >
          {showForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              Cerrar
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              Nueva clase
            </>
          )}
        </Button>
      </div>

      {/* Formulario colapsable */}
      {showForm && (
        <Card className="border-primary/20 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Agregar clase</CardTitle>
            <CardDescription>Completá los datos de la nueva clase</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Asignatura</Label>
                  <Input {...form.register("asignatura")} placeholder="Ej: Cálculo III" />
                  {form.formState.errors.asignatura && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.asignatura.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Profesor</Label>
                  <Input {...form.register("profesor")} placeholder="Ej: Prof. García" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Día</Label>
                  <select
                    {...form.register("dia")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
                  >
                    {DIAS_ORDEN.map((diaIndex) => (
                      <option key={diaIndex} value={diaIndex}>{DIAS_FULL_LABELS[diaIndex]}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Inicio</Label>
                  <Input type="time" {...form.register("hora_inicio")} />
                  {form.formState.errors.hora_inicio && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.hora_inicio.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Final</Label>
                  <Input type="time" {...form.register("hora_final")} />
                  {form.formState.errors.hora_final && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.hora_final.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Sala <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                <Input {...form.register("sala")} placeholder="Ej: Aula 301" />
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Guardando..." : "Agregar"}
                </Button>
                <Button type="button" variant="ghost" onClick={() => { form.reset(); setShowForm(false) }}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leyenda de asignaturas */}
      {asignaturasUnicas.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {asignaturasUnicas.map(([nombre, color]) => (
            <span key={nombre} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-1">
              <span className={`w-2 h-2 rounded-full ${color.dot}`} />
              {nombre}
            </span>
          ))}
        </div>
      )}

      {/* Grilla semanal */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[700px]">
            {/* Headers */}
            {horarioPorDia.map(({ dia, index }) => {
              const hoy = new Date().getDay()
              const esHoy = hoy === index
              return (
                <div
                  key={`header-${index}`}
                  className={`px-2 py-3 text-center border-b ${esHoy ? "bg-primary/5" : "bg-muted/30"}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-widest ${esHoy ? "text-primary" : "text-muted-foreground"}`}>
                    {dia}
                  </p>
                  {esHoy && <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-1" />}
                </div>
              )
            })}

            {/* Celdas de cada día */}
            {horarioPorDia.map(({ clases, index }) => {
              const hoy = new Date().getDay()
              const esHoy = hoy === index
              return (
                <div
                  key={`cell-${index}`}
                  className={`p-2 space-y-1.5 min-h-[100px] border-r last:border-r-0 ${esHoy ? "bg-primary/[0.02]" : ""}`}
                >
                  {clases.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-muted-foreground/30 text-[10px]">Sin clases</span>
                    </div>
                  ) : (
                    clases.map((clase) => (
                      <ClaseCard
                        key={clase.id}
                        clase={clase}
                        color={colorMap.get(clase.asignatura) || COLORES[0]}
                        onDelete={handleDelete}
                        onRepeat={handleRepeat}
                      />
                    ))
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Empty state */}
      {horario.length === 0 && (
        <div className="text-center py-10 space-y-3">
          <div className="text-4xl"></div>
          <p className="text-muted-foreground text-sm">Tu horario está vacío</p>
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            Agregar primera clase
          </Button>
        </div>
      )}
    </div>
  )
}

// ─── Tarjeta de clase ───
const ClaseCard = ({
  clase,
  color,
  onDelete,
  onRepeat
}: {
  clase: horario
  color: typeof COLORES[0]
  onDelete: (id: string) => void
  onRepeat: (clase: horario) => void
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`rounded-lg border bg-gradient-to-br ${color.bg} ${color.border} p-2 cursor-pointer transition-all duration-150 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${color.dot}`} />
        <div className="min-w-0 flex-1">
          <p className={`text-[11px] font-bold leading-tight truncate ${color.text}`}>
            {clase.asignatura}
          </p>
          <p className={`text-[10px] mt-0.5 opacity-70 ${color.text}`}>
            {clase.hora_inicio} – {clase.hora_final}
          </p>
          <p className={`text-[10px] mt-0.5 opacity-70 ${color.text}`}>
            sala {clase.sala}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="mt-1.5 pt-1.5 border-t border-current/10 space-y-0.5 animate-in fade-in duration-150">
          {clase.profesor && (
            <p className={`text-[10px] opacity-60 ${color.text} flex items-center gap-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              {clase.profesor}
            </p>
          )}
          {clase.sala && (
            <p className={`text-[10px] opacity-60 ${color.text} flex items-center gap-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              {clase.sala}
            </p>
          )}
          <div className="flex gap-1 mt-1">
            <Button
              variant="outline"
              size="xs"
              className="flex-1 h-5 text-[10px]"
              onClick={(e) => {
                e.stopPropagation()
                onRepeat(clase)
              }}
            >
              Repetir
            </Button>
            <Button
              variant="destructive"
              size="xs"
              className="flex-1 h-5 text-[10px]"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(clase.id)
              }}
            >
              Eliminar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormHorario