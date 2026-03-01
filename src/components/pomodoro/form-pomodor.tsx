import { pomodoroZodSchema, type PomodoroZodSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"
import { playAlarm } from "./sonido"

interface Props {
  duration: number
}

const FormPomodor = ({ duration }: Props) => {
  // 1. Guardamos el tiempo en SEGUNDOS para poder restar de 1 en 1
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60)
  const [totalTime, setTotalTime] = useState<number>(duration * 60)

  // 2. Estado para saber si el reloj está corriendo o pausado
  const [isActive, setIsActive] = useState(false)

  // 3. Toggle para mostrar/ocultar el form de configuración
  const [showConfig, setShowConfig] = useState(false)

  const form = useForm({
    resolver: zodResolver(pomodoroZodSchema),
    defaultValues: {
      duration: duration
    }
  })

  // 3. EL MOTOR: Esto hace que el tiempo baje
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {

        setTimeLeft((prevTime) => {
          // Verificamos SI EL SIGUIENTE paso va a ser 0
          if (prevTime <= 1) {
            setIsActive(false); // Detenemos el reloj
            playAlarm();
            toast.success("¡Pomodoro terminado!");
            return 0; // Fijamos en 0
          }
          // Si no es 0, restamos 1 segundo
          return prevTime - 1;
        });

      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // QUITA 'timeLeft' de aquí. Solo escuchamos si está activo o no.
  }, [isActive, timeLeft]);


  const onSubmit = (values: PomodoroZodSchema) => {
    try {
      // Cuando actualizas, convertimos los minutos nuevos a segundos
      const newTime = values.duration * 60
      setTimeLeft(newTime)
      setTotalTime(newTime)
      setIsActive(false) // Pausamos al cambiar el tiempo
      setShowConfig(false)
      toast.success(`Tiempo configurado a ${values.duration} min`)
    } catch {
      toast.error("Error al actualizar")
    }
  }

  // 4. Función auxiliar para mostrar formato 00:00
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  // SVG circle progress
  const radius = 120
  const strokeWidth = 6
  const circumference = 2 * Math.PI * radius
  const progress = totalTime > 0 ? timeLeft / totalTime : 0
  const strokeDashoffset = circumference * (1 - progress)

  // Color based on state
  const ringColor = isActive
    ? "stroke-primary"
    : timeLeft === 0
      ? "stroke-destructive"
      : "stroke-muted-foreground/30"

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circular Timer */}
      <Card className="w-full max-w-sm mx-auto py-0 gap-0">
        <CardContent className="flex flex-col items-center py-8 px-6">
          {/* SVG Ring */}
          <div className="relative">
            <svg
              width={radius * 2 + strokeWidth * 2}
              height={radius * 2 + strokeWidth * 2}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                className="stroke-muted"
              />
              {/* Progress circle */}
              <circle
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`${ringColor} transition-[stroke-dashoffset] duration-1000 ease-linear`}
              />
              {/* Dot at the end of progress */}
              {progress > 0 && progress < 1 && (
                <circle
                  cx={
                    radius +
                    strokeWidth +
                    radius * Math.cos(2 * Math.PI * progress - Math.PI / 2)
                  }
                  cy={
                    radius +
                    strokeWidth +
                    radius * Math.sin(2 * Math.PI * progress - Math.PI / 2)
                  }
                  r={strokeWidth * 1.5}
                  className="fill-primary"
                />
              )}
            </svg>

            {/* Time display centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold font-mono tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {isActive ? "En curso..." : timeLeft === 0 ? "¡Terminado!" : "Listo"}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => {
                setIsActive(false)
                setTimeLeft(totalTime)
              }}
              title="Reiniciar"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className={`h-14 w-14 rounded-full transition-colors ${isActive
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-primary hover:bg-primary/90"
                }`}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => setShowConfig(!showConfig)}
              title="Configurar"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Config form (collapsible) */}
          {showConfig && (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 w-full"
            >
              <div className="flex gap-2">
                <Input
                  type="number"
                  {...form.register("duration")}
                  placeholder="Minutos"
                  className="h-9 text-sm"
                />
                <Button type="submit" size="sm" className="h-9 px-4">
                  Aplicar
                </Button>
              </div>
              {form.formState.errors.duration && (
                <p className="text-destructive text-xs mt-1">
                  {form.formState.errors.duration.message}
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FormPomodor