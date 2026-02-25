import { useProfielActions } from "@/hooks/use-profile-actiosn"
import { profileZodSchema, type ProfileZodSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"

import type { User } from "firebase/auth"
import { toast } from "sonner"

interface Props {
  user: User
}

const FormProfile = ({ user }: Props) => {
  const { loading, updateUserProfile } = useProfielActions()

  const form = useForm<ProfileZodSchema>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  })

  const photoURL = form.watch("photoURL")
  const displayName = form.watch("displayName")
  const initials = (displayName || "U").slice(0, 2).toUpperCase()

  const onSubmit = async (values: ProfileZodSchema) => {
    const response = await updateUserProfile(values)

    if (response.success) {
      return toast.success("Perfil actualizado")
    }
    toast.error("Error al actualizar el perfil")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Avatar preview + Photo URL */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold flex-shrink-0 overflow-hidden">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Avatar"
                    className="h-16 w-16 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                ) : (
                  initials
                )}
              </div>
              <FormField
                control={form.control}
                name="photoURL"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Foto de perfil</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="https://ejemplo.com/foto.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Display Name */}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email (read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={user.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                El email no se puede modificar
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default FormProfile