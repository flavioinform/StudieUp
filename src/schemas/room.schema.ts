import type { Timestamp,FieldValue } from "firebase/firestore";


export type RoomType="private" | "group"

//interfaz para el chat 
export interface Room{

id:string
type:RoomType
participants:string[]
createdAt:Timestamp | FieldValue

lastMessage:LastMessage | null


}

// Interface para el último mensaje en un room

export interface LastMessage{


    text:string
    senderId:string
    timestamp:Timestamp | FieldValue

}
// Interface para Mensaje

export interface Message{

    id:string
    text:string
    senderId:string
    timestamp:Timestamp | FieldValue

}