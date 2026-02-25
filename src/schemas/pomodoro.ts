import type { Timestamp } from "firebase/firestore";



export interface SchemaPomodoro{

   id:string
    duration:number
    type: "work" | "break";
    completedAt: Timestamp;



}