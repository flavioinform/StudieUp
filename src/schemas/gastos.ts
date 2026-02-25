export interface GastosEstudiante {
    title:string
    id: string
    userId: string
    importe: number
    fecha: string
    descripcion?: string
    categoria: CategoriaGasto
}

export type CategoriaGasto =
  | "comida"
  | "transporte"
  | "cafe"
  | "materiales"
  | "ocio"
  | "otros"