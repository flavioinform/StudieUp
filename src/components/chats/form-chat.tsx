import { messageZodSchema, type MessageZodSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface Props {
  sendMessage: (text: string) => Promise<void>
}

const FormChat = ({ sendMessage }: Props) => {

  const [isLoading, startTransition] = useTransition()

  const form = useForm<MessageZodSchema>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: "",
    }
  })

  const onSubmit = async (values: MessageZodSchema) => {
    startTransition(() => {
      (async () => {
        try {
          await sendMessage(values.text)
          form.reset()
        } catch (error) {
          console.log(error)
        }
      })()
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 items-end"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Escribe un mensaje..."
                  className="h-10"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading}
          className="h-10 px-4"
        >
          {isLoading ? (
            <span className="animate-pulse">···</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default FormChat
