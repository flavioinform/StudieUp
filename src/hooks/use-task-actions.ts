import type { createTask } from "@/schemas/createTask"
import type { Task } from "@/schemas/task.schema"
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useTaskAction=()=>{

    //para obtener atraves de este hook la infomracion necesaria para autenticar 
const {data:user}=useUser()

const db=useFirestore()  //para acceder a la instancia de firenStore 


const taskCollectionRef=collection(db,"tasks")

const taskQuery=query(
    taskCollectionRef,
    where("userId","==", user!.uid)
)

const {data:tasks}=useFirestoreCollectionData(taskQuery,{
    idField:"id", //nos traemos todo el documento para luego realizar algun cambio pero que sea mas facil con el id ,
    suspense:true
})

//create
const createTask=async(data:{
    title:string
    description?:string
})=>{

    const newTask:createTask={
        ...data,
        completed:false,
        userId:user!.uid,

    }
    return await addDoc(taskCollectionRef,newTask)
}
//delete

const deleteTask=async(id:string)=>{

    const taskDoc=doc(db,"tasks",id)

    return await deleteDoc(taskDoc)
}

//update

const update=async(id:string)=>{

    const upTask=tasks.find((upTask)=>upTask.id===id)

    if(upTask){
      const taskDoc=doc(db,"tasks",id)

        return await updateDoc(taskDoc,{
            completed:!upTask.completed          
        })
    }else{

        throw new Error("Tarea no encontrada ")
    }
}

return{

tasks:tasks as Task[],
createTask,
deleteTask,
update

}

}