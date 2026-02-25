import { useTaskAction } from "@/hooks/use-task-actions"
import type { Task } from "@/schemas/task.schema"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { Check, Trash2, RotateCcw } from "lucide-react"

interface Props {
    task: Task
}

const ItemTask = ({ task }: Props) => {
    const { deleteTask, update } = useTaskAction()
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(() => {
            deleteTask(task.id)
        })
    }

    const handleUpdate = () => {
        startTransition(() => {
            update(task.id)
        })
    }

    return (
        <Card className={`py-0 gap-0 ${task.completed ? "opacity-60" : ""}`}>
            <CardContent className="flex items-center gap-3 px-4 py-3">
                {/* Checkbox circle */}
                <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={isPending}
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.completed
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground/40 hover:border-primary"
                        }`}
                >
                    {task.completed && <Check className="h-3 w-3" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p
                        className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""
                            }`}
                    >
                        {task.title}
                    </p>
                    {task.description && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {task.description}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleUpdate}
                        disabled={isPending}
                        className="h-8 w-8 p-0"
                        title={task.completed ? "Marcar pendiente" : "Completar"}
                    >
                        {task.completed ? (
                            <RotateCcw className="h-3.5 w-3.5" />
                        ) : (
                            <Check className="h-3.5 w-3.5" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        title="Eliminar"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
export default ItemTask