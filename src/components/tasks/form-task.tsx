import { useTaskAction } from "@/hooks/use-task-actions"
import { createTaskZodSchema, type CreateTaskZodSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { useState } from "react"
import { toast } from "sonner"

const FormTask = () => {
  const [loading, setLoading] = useState(false)

  const { createTask } = useTaskAction()
  const form = useForm<CreateTaskZodSchema>({
    resolver: zodResolver(createTaskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit = async (values: CreateTaskZodSchema) => {
    try {
      setLoading(true)
      await createTask(values)
      toast.success("Tarea creada")
      form.reset()
    } catch (error) {
      console.log(error)
      toast.error("Error al crear la tarea")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva Tarea</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="¿Qué necesitas hacer?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Detalles adicionales (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear tarea"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default FormTask