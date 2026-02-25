import type { horario } from "@/schemas/horario"
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore"

import { 
  useFirestore, 
  useFirestoreCollectionData, 
  useUser 
} from "reactfire"

export const useHorarioActions = () => {

  const { data: user } = useUser()
  const db = useFirestore()

  if (!user) throw new Error("Usuario no encontrado")

  // 🔹 Referencia colección
  const horarioCollectionRef = collection(db, "horario")

  // 🔹 Query por usuario
  const horarioQuery = query(
    horarioCollectionRef,
    where("userId", "==", user.uid)
  )

  const { data: horario } = useFirestoreCollectionData(horarioQuery, {
    idField: "id",
    suspense: true
  })

  // ✅ CREATE
  const createHorario = async (data: {
    asignatura: string
    profesor?: string
    hora_inicio: string
    hora_final: string
    dia: number
    sala?: string
  }) => {

    const newHorario = {
      ...data,
      userId: user.uid,
      createdAt: new Date()
    }

    return await addDoc(horarioCollectionRef, newHorario)
  }

  // ✅ DELETE
  const deleteHorario = async (id: string) => {

    const horarioDoc = doc(db, "horario", id)

    return await deleteDoc(horarioDoc)
  }

  return {
    horario:horario as horario[],
    createHorario,
    deleteHorario
  }
}