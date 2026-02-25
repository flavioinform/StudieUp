import { z } from "zod"

export const loginZodSchema = z.object({

  email: z.string().trim().pipe(z.email("formato de email invalido")),
  password: z.string().min(6, "tiene que tener minimo 6 caracrteres")



})

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>


export const registerZodSchema = z.object({

  email: z.string().trim().pipe(z.email("formato de email invalido ")),
  displayName: z.string().min(1, "el nombre es requerido ").max(50, " te has exccedido con el largo "),
  password: z.string().min(6, "tiene que tener almenos 6 caracteres "),
  confirmPassword: z.string(),

})
  //refine sirve para realizar validaciones que no se encuentran por parte de zod  
  .refine((data) => data.password === data.confirmPassword, {

    message: "password do not match",
    path: ["confirmPassword"], // esto produce que el error aparezca en el campo  confirm 
  })


export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>


export const profileZodSchema = z.object({

  displayName: z.string().min(1, "minimo 1 caracter requerido").max(50, "maximo 50 caracteres"),
  photoURL: z.union([z.url("formato invalido de url"), z.literal("")]).optional()



})

export type ProfileZodSchema = z.infer<typeof profileZodSchema>


export const createTaskZodSchema = z.object({

  title: z.string().min(1, "el titulo de la tarea es requerido ").max(100, "Titulo demasiado largo,supera los 100 caracteres"),
  description: z.string().max(500, "Descripcion demasiada larga").optional()


})

export type CreateTaskZodSchema = z.infer<typeof createTaskZodSchema>




//form chat

export const messageZodSchema = z.object({
  text: z.string().trim().min(1, "ingrese algun texto ")


})

export type MessageZodSchema = z.infer<typeof messageZodSchema>


export const findFriendSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email format")),
});

export type FindFriendSchemaType = z.infer<typeof findFriendSchema>;


//form pomodoro

export const pomodoroZodSchema = z.object({

  duration: z.coerce.number().min(1).max(180)
})

export type PomodoroZodSchema = z.infer<typeof pomodoroZodSchema>

//form promedio

export const promedioZodSchema = z.object({
  notas: z.array(
    z.object({
      valor: z.coerce
        .number()
        .min(0, "La nota mínima es 1")
        .max(7, "La nota máxima es 7"),

      porcentaje: z.coerce
        .number()
        .min(0, "El porcentaje no puede ser negativo")
        .max(100, "El porcentaje no puede ser mayor a 100")
    })
  ).min(1, "Debes ingresar al menos una nota")
}).refine(
  (data) => {
    const suma = data.notas.reduce((acc, nota) => acc + nota.porcentaje, 0)
    return suma <= 100 && suma >= 100
  },
  {
    message: "La suma de los porcentajes no puede superar 100%",
    path: ["notas"], // dónde mostrar el error
  }
)

export type PromedioZodSchema = z.infer<typeof promedioZodSchema>


export const horarioZodSchema = z.object({

  asignatura: z
    .string()
    .trim()
    .min(1, "La asignatura es obligatoria")
    .max(180, "Máximo 180 caracteres"),

  profesor: z
    .string()
    .trim()
    .min(1, "El profesor es obligatorio")
    .max(180),

  dia: z
    .coerce
    .number()
    .min(0, "Día inválido")
    .max(6, "Día inválido"),

  hora_inicio: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM"),

  hora_final: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM"),

  sala: z
    .string()
    .trim()
    .max(100)
    .optional()

}).refine((data) => data.hora_inicio < data.hora_final, {
  message: "La hora final debe ser mayor a la hora inicial",
  path: ["hora_final"]
})

export type HorarioZodSchema = z.infer<typeof horarioZodSchema>


export const categoriaGastoSchema = z.enum([
  "comida",
  "transporte",
  "cafe",
  "materiales",
  "ocio",
  "otros",
])

export const createGastoSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(60, "Título demasiado largo"),

  importe: z
    .coerce
    .number()
    .positive("El importe debe ser mayor a 0"),

  fecha: z
    .string()
    .min(1, "La fecha es obligatoria"),

  descripcion: z
    .string()
    .max(200, "Descripción demasiado larga")
    .optional(),

  categoria: categoriaGastoSchema,
})

export type CreateGastoInput = z.infer<typeof createGastoSchema>