import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useFirestore, useUser } from "reactfire"

export const PomodoroActions=()=>{

const{data:user}=useUser()

const db=useFirestore()


const pomodoroCollection=collection(db,"pomodoro")

const savePomodoro=async(duration:number)=>{

    if(!user) throw new Error ("error al encontrar al usuario ")

        await addDoc(pomodoroCollection,{
            userId:user.uid,
            duration,
            completedAt:serverTimestamp()

        })

        
    }
    
    
    return{
        savePomodoro
    }





}