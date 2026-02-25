import { updateProfile } from "firebase/auth"
import { useState } from "react"
import { useUser } from "reactfire"
import { useUserActions } from "./use-user-actions"


export const useProfielActions=()=>{

    const [loading,setLoading]=useState(false)
    const{data:user}=useUser()
        const{createOrUpdateUser}=useUserActions()
    
const updateUserProfile=async (data:{




    displayName?:string
    photoURL?:string
})=>{

     if(!user){
  
        throw new Error("Este usuario no esta autenticado ")

     }
     setLoading(true)

     try {
           await updateProfile(user,{
            displayName:data.displayName || user.displayName,
            photoURL:data.photoURL || user.photoURL

            
        }); await createOrUpdateUser ({
             //aca destruturamos para poder ecibir las actuliazacion , pero en caso de no de tener la data  que es informacion ya lista 
            ...user,
            ...data
        }) 
        
        return {success:true }

     } catch (error) {
        console.log("error en actualizar el perfil ",error)
        throw error
        return {success:false }

        
     }finally{
        setLoading(false)
     }



}

return{

    updateUserProfile,
    loading
}

}