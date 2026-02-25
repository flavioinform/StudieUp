import type { LastMessage, Message } from "@/schemas/room.schema"
import { addDoc, collection, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"


export const useMessageActions = (roomId: string) => {

    const { data: user } = useUser()

    const db = useFirestore()

    const messageRef = collection(db, "rooms", roomId, "messages")

    const messageQuery = query(messageRef, orderBy("timestamp", "asc"))

    const { data: messages } = useFirestoreCollectionData(messageQuery, {

        suspense: true,
        idField: "id"
    })

    const sendMessage = async (text: string) => {

        if (!user) throw new Error("no existe el usuario ")

        const timestamp = serverTimestamp()

        const messageData: Omit<Message, "id"> = {
            text: text.trim(),
            senderId: user.uid,
            timestamp
        }

        const lastMessageRef = doc(db, "rooms", roomId)

        const lastMessages: LastMessage = {
            senderId: user.uid,
            text: text.trim(),
            timestamp
        }

        await Promise.all([
            addDoc(messageRef, messageData),
            updateDoc(lastMessageRef, { lastMessages })
        ])
    }

    const deleteMessage = async (messageId: string) => {
        const messageDoc = doc(db, "rooms", roomId, "messages", messageId)
        await deleteDoc(messageDoc)
    }

    return {
        messages: messages as Message[], sendMessage, deleteMessage
    }

}