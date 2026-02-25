import { useGastosActions } from "@/hooks/use-gastos-actions"
import { createGastoSchema, type CreateGastoInput } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { CategoriaGasto } from "@/schemas/gastos"

const CATEGORIAS: { value: CategoriaGasto; label: string; emoji: string }[] = [
  { value: "comida", label: "Comida", emoji: "🍔" },
  { value: "transporte", label: "Transporte", emoji: "🚌" },
  { value: "cafe", label: "Café", emoji: "☕" },
  { value: "materiales", label: "Materiales", emoji: "📚" },
  { value: "ocio", label: "Ocio", emoji: "🎮" },
  { value: "otros", label: "Otros", emoji: "📦" },
]

const CATEGORIA_COLORS: Record<CategoriaGasto, { bg: string; border: string; text: string; fill: string }> = {
  comida: { bg: "from-amber-500/15 to-orange-500/10", border: "border-amber-400/30", text: "text-amber-700", fill: "#f59e0b" },
  transporte: { bg: "from-blue-500/15 to-sky-500/10", border: "border-blue-400/30", text: "text-blue-700", fill: "#3b82f6" },
  cafe: { bg: "from-yellow-600/15 to-amber-600/10", border: "border-yellow-500/30", text: "text-yellow-700", fill: "#ca8a04" },
  materiales: { bg: "from-emerald-500/15 to-green-500/10", border: "border-emerald-400/30", text: "text-emerald-700", fill: "#10b981" },
  ocio: { bg: "from-violet-500/15 to-purple-500/10", border: "border-violet-400/30", text: "text-violet-700", fill: "#8b5cf6" },
  otros: { bg: "from-slate-500/15 to-gray-500/10", border: "border-slate-400/30", text: "text-slate-600", fill: "#64748b" },
}

const MESES_LABELS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

// ─── SVG Pie Chart ───
function PieChart({ data }: { data: { label: string; value: number; color: string; emoji: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  if (total === 0) return null

  const size = 160
  const cx = size / 2
  const cy = size / 2
  const r = 60

  let cumulative = 0
  const slices = data.map((d) => {
    const pct = d.value / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    cumulative += pct
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2

    const largeArc = pct > 0.5 ? 1 : 0
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)

    // For single-slice case, draw a circle instead
    if (pct >= 0.9999) {
      return {
        ...d,
        pct,
        path: `M ${cx},${cy - r} A ${r},${r} 0 1,1 ${cx - 0.001},${cy - r} Z`,
      }
    }

    return {
      ...d,
      pct,
      path: `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`,
    }
  })

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.path}
            fill={s.color}
            stroke="white"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-80"
          />
        ))}
        {/* Center hole for donut effect */}
        <circle cx={cx} cy={cy} r={32} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">Total</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="text-[13px] fill-foreground font-bold">
          ${total.toLocaleString("es-CL")}
        </text>
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-muted-foreground truncate">
              {s.emoji} {s.label}
            </span>
            <span className="text-xs font-semibold ml-auto">{Math.round(s.pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FormGastos = () => {
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showChart, setShowChart] = useState(false)

  // Month navigator state
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth())
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const { gastos, createGastos, deleteGastos } = useGastosActions()

  const form = useForm<CreateGastoInput>({
    resolver: zodResolver(createGastoSchema),
    defaultValues: {
      title: "",
      fecha: "",
      importe: 1,
      descripcion: "",
      categoria: "comida",
    },
  })

  const onSubmit = async (values: CreateGastoInput) => {
    try {
      setLoading(true)
      await createGastos(values)
      toast.success("Gasto registrado")
      form.reset()
      setShowForm(false)
    } catch (error) {
      console.log(error)
      toast.error("Error al registrar el gasto")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGastos(id)
      toast.success("Gasto eliminado")
    } catch {
      toast.error("Error al eliminar")
    }
  }

  // Filter gastos by selected month/year
  const gastosFiltrados = gastos.filter((g) => {
    const fecha = new Date(g.fecha)
    return fecha.getMonth() === selectedMonth && fecha.getFullYear() === selectedYear
  })

  const totalMes = gastosFiltrados.reduce((acc, g) => acc + (g.importe || 0), 0)

  // Pie chart data grouped by category
  const pieData = CATEGORIAS.map((cat) => {
    const total = gastosFiltrados
      .filter((g) => g.categoria === cat.value)
      .reduce((acc, g) => acc + (g.importe || 0), 0)
    return {
      label: cat.label,
      value: total,
      color: CATEGORIA_COLORS[cat.value].fill,
      emoji: cat.emoji,
    }
  }).filter((d) => d.value > 0)

  const getCatInfo = (cat: string) =>
    CATEGORIAS.find((c) => c.value === cat) || CATEGORIAS[5]

  // Month navigation
  const goToPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear((y) => y - 1)
    } else {
      setSelectedMonth((m) => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear((y) => y + 1)
    } else {
      setSelectedMonth((m) => m + 1)
    }
  }

  const isCurrentMonth = selectedMonth === now.getMonth() && selectedYear === now.getFullYear()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mis Gastos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {gastos.length === 0
              ? "Empezá registrando tu primer gasto"
              : `${gastos.length} ${gastos.length === 1 ? "gasto" : "gastos"} registrados`}
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
              Nuevo gasto
            </>
          )}
        </Button>
      </div>

      {/* Formulario colapsable */}
      {showForm && (
        <Card className="border-primary/20 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Registrar gasto</CardTitle>
            <CardDescription>Completá los datos del gasto</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Título</Label>
                  <Input {...form.register("title")} placeholder="Ej: Almuerzo" />
                  {form.formState.errors.title && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Importe ($)</Label>
                  <Input type="number" step="1" {...form.register("importe")} placeholder="0" />
                  {form.formState.errors.importe && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.importe.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Fecha</Label>
                  <Input type="date" {...form.register("fecha")} />
                  {form.formState.errors.fecha && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.fecha.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Categoría</Label>
                  <select
                    {...form.register("categoria")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
                  >
                    {CATEGORIAS.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.emoji} {cat.label}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.categoria && (
                    <p className="text-[11px] text-destructive">{form.formState.errors.categoria.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Descripción <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                <Input {...form.register("descripcion")} placeholder="Detalles adicionales..." />
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

      {/* Month navigator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={goToPrevMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </Button>
            <div className="text-center">
              <p className="text-sm font-semibold capitalize">
                {MESES_LABELS[selectedMonth]} {selectedYear}
              </p>
              {!isCurrentMonth && (
                <button
                  onClick={() => { setSelectedMonth(now.getMonth()); setSelectedYear(now.getFullYear()) }}
                  className="text-[11px] text-primary hover:underline mt-0.5"
                >
                  Volver al mes actual
                </button>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={goToNextMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </Button>
          </div>

          {/* Summary row */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total del mes</p>
              <p className="text-2xl font-bold mt-1">${totalMes.toLocaleString("es-CL")}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {gastosFiltrados.length} {gastosFiltrados.length === 1 ? "gasto" : "gastos"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pie chart toggle */}
      {pieData.length > 0 && (
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between"
            onClick={() => setShowChart(!showChart)}
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
              Distribución por categoría
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${showChart ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
          </Button>
          {showChart && (
            <Card className="animate-in fade-in slide-in-from-top-2 duration-200">
              <CardContent className="pt-6">
                <PieChart data={pieData} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Lista de gastos */}
      {gastosFiltrados.length > 0 && (
        <div className="space-y-2">
          {[...gastosFiltrados]
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            .map((gasto) => {
              const cat = getCatInfo(gasto.categoria)
              const color = CATEGORIA_COLORS[gasto.categoria] || CATEGORIA_COLORS.otros

              return (
                <Card
                  key={gasto.id}
                  className={`border bg-gradient-to-r ${color.bg} ${color.border} overflow-hidden transition-all duration-150 hover:shadow-sm`}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{cat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold truncate ${color.text}`}>{gasto.title}</p>
                          <span className="text-[10px] text-muted-foreground bg-muted/50 rounded-full px-2 py-0.5 shrink-0">
                            {cat.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground">
                            {new Date(gasto.fecha + "T12:00:00").toLocaleDateString("es-CL", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                          {gasto.descripcion && (
                            <p className="text-xs text-muted-foreground truncate">· {gasto.descripcion}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <p className={`text-sm font-bold ${color.text}`}>
                          ${gasto.importe.toLocaleString("es-CL")}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(gasto.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      )}

      {/* Empty state for selected month */}
      {gastosFiltrados.length === 0 && (
        <div className="text-center py-10 space-y-3">
          <div className="text-4xl">💸</div>
          <p className="text-muted-foreground text-sm">
            No hay gastos en {MESES_LABELS[selectedMonth].toLowerCase()} {selectedYear}
          </p>
          {isCurrentMonth && (
            <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
              Registrar primer gasto
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
export default FormGastos