import { useTaskAction } from "@/hooks/use-task-actions"
import ItemTask from "./item-taks"

const ListTask = () => {
  const { tasks } = useTaskAction()

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Mis Tareas</h2>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{tasks.length} completadas
        </span>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">
            No tienes tareas aún. ¡Crea una arriba!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <ItemTask key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
export default ListTask