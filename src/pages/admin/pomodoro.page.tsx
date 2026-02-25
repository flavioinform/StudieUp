import FormPomodor from "@/components/pomodoro/form-pomodor"

const PomodoroPage = () => {
  const defaultDuration = 25

  return (
    <div className="max-w-lg mx-auto space-y-6 py-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Pomodoro</h1>
        <p className="text-muted-foreground text-sm">
          Gestiona tu tiempo de concentración
        </p>
      </div>

      <FormPomodor duration={defaultDuration} />
    </div>
  )
}

export default PomodoroPage