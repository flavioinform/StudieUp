import CardFooterAuth from "@/components/card-footer-auth"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { Link } from "react-router";




const LoginPage = () => {

  const { login } = useAuthActions()

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },

  })

  const onSubmit = async (data: LoginZodSchemaType) => {

    const response = await login(data)
    if (!response.success) {
      console.log(response)
      if (response.error?.code === "auth/invalid-login-credentials") {

        form.setError("email", {
          type: "manual",
          message: "email or password invalido "

        })
        form.setError("password", {
          type: "manual",
          message: "email or password invalido "

        })

      }
      return
    }
  }

  return (
    <>
      <div className="w-full">


        {/* Logo */}
        <div className="mb-8 lg:hidden text-center">

          <h1 className="text-2xl font-bold tracking-tight text-white">
            Studie<span className="text-indigo-400">Up</span>
          </h1>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/20">



          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold tracking-tight text-white">Iniciar sesión</CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Ingresa con tu correo o con Google
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* EMAIL */}
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
                      <FormDescription className="text-xs text-slate-500">
                        Este correo será usado para iniciar sesión
                      </FormDescription>
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
                      <FormDescription className="text-xs text-slate-500">
                        Mínimo 6 caracteres
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 mt-2 font-medium text-sm bg-purple-600 text-white hover:bg-purple-500 transition-all duration-200"
                >
                  Iniciar sesión
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooterAuth name="Continuar con Google"></CardFooterAuth>
        </Card>

        {/* Register link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </>
  )
}
export default LoginPage