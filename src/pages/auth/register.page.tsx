import CardFooterAuth from "@/components/card-footer-auth"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { registerZodSchema, type RegisterZodSchemaType } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { toast } from "sonner"


const RegisterPage = () => {
  const { register } = useAuthActions()
  const onSubmit = async (values: RegisterZodSchemaType) => {

    const response = await register(values)
    if (response.error) {
      toast.error("problema al crear la cuenta ")

      if (response.error?.code === "auth/email-already-in-use") {

        form.setError("email", {
          type: "manual",
          message: "Email ya esta en uso ",
        })
      } else {
        //console.log("error al registrarse ", response.error)
      }
    } else {
      toast.success("¡Cuenta creada! Revisa tu correo para verificarla.")
    }

  }

  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: ""

    }


  })

  return (
    <div className="w-full">
      {/* Logo (visible on mobile only) */}
      <div className="mb-8 lg:hidden text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Studie<span className="text-indigo-400">Up</span>
        </h1>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/20">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-semibold tracking-tight text-white">Crear cuenta</CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Regístrate con tu correo o con Google
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-300">Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@correo.com"
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-300">Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-300">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-300">Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 mt-2 font-medium text-sm bg-purple-600 text-white hover:bg-purple-500 transition-all duration-200"
              >
                Crear cuenta
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooterAuth name="Continuar con Google"></CardFooterAuth>
      </Card>

      {/* Login link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/auth/login"
          className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
export default RegisterPage