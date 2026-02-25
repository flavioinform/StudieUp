
import type { Nota } from "@/schemas/promedio"





export const useCalculo=()=>{

    const calcular=(promedio:Nota[])=>{

       const total =promedio.reduce((acc,nota) =>{

        return acc+nota.valor*(nota.porcentaje/100)
       },0)
      return total
    }

  return {calcular}
     


} 