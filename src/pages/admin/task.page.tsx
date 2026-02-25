import FormTask from "@/components/tasks/form-task"
import ListTask from "@/components/tasks/list.task"
import { Suspense } from "react"

const TaskPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tareas</h1>
        <p className="text-muted-foreground text-sm">
          Crea y gestiona tus tareas pendientes
        </p>
      </div>

      <FormTask />

      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground text-center py-8 animate-pulse">
            Cargando tareas...
          </div>
        }
      >
        <ListTask />
      </Suspense>
    </div>
  )
}
export default TaskPage