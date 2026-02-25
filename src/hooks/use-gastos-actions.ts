import type { CategoriaGasto, GastosEstudiante } from "@/schemas/gastos"
import { addDoc, collection, deleteDoc, doc, query, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useGastosActions = () => {


    const { data: user } = useUser()

    const db = useFirestore()

    const gastosCollectionsRef = collection(db, "gastos")

    const gastoQuery = query(
        gastosCollectionsRef,
        where("userId", "==", user!.uid)
    )


    const { data: gastos } = useFirestoreCollectionData(gastoQuery, {
        idField: "id", //nos traemos todo el documento para luego realizar algun cambio pero que sea mas facil con el id ,
        suspense: true
    })

    //create
    const createGastos = async (data: {
        title: string
        importe: number
        descripcion?: string
        fecha: string
        categoria: CategoriaGasto
    }) => {

        const newGastos: Omit<GastosEstudiante, "id"> = {
            ...data,
            userId: user!.uid,

        }
        return await addDoc(gastosCollectionsRef, newGastos)
    }


    const deleteGastos = async (id: string) => {

        const gastosDoc = doc(db, "gastos", id)

        return await deleteDoc(gastosDoc)
    }

    return {
        gastos,
        createGastos,
        deleteGastos
    }


}