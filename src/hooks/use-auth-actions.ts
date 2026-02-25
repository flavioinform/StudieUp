import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, type AuthError } from "firebase/auth";
import { useState } from "react"
import { useAuth } from "reactfire";
import { useUserActions } from "./use-user-actions";


interface authActionsRespones {

    success: boolean
    error: AuthError | null
}

export const useAuthActions = () => {

    const [loading, setLoading] = useState(false);
    const auth = useAuth()

    const { createOrUpdateUser } = useUserActions()

    const login = async (data: { email: string; password: string }): Promise<authActionsRespones> => {
        setLoading(true)
        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            return {
                success: true,
                error: null
            }

        } catch (error) {
            const authError = error as AuthError
            return {
                success: false,
                error: authError
            }

        } finally {
            setLoading(false)
        }


    }
    const register = async (data: { email: string; password: string, displayName: string }): Promise<authActionsRespones> => {


        setLoading(true)
        try {
            const currentuser = await createUserWithEmailAndPassword(auth, data.email, data.password)

            if (currentuser.user) {
                await updateProfile(currentuser.user, {
                    displayName: data.displayName
                })

                await createOrUpdateUser(currentuser.user)  //obtiene los datos de registro 

                await currentuser.user.reload() //recarga del usuario para reacfire
            }
            return {
                success: true,
                error: null
            }

        } catch (error) {
            const authError = error as AuthError
            return {
                success: false,
                error: authError
            }

        } finally {
            setLoading(false)
        }


    }
    const loginWithGoogle = async (): Promise<authActionsRespones> => {

        setLoading(true)

        try {

            const provider = new GoogleAuthProvider()
            const data = await signInWithPopup(auth, provider)
            await createOrUpdateUser(data.user)  //obtiene los datos de login 

            return {

                success: true,
                error: null
            }

        } catch (error) {
            const authError = error as AuthError
            return {
                success: false,
                error: authError
            }

        } finally {
            setLoading(false)
        }
    }

    const logout = async (): Promise<authActionsRespones> => {
        setLoading(true);
        try {
            await signOut(auth);

            // Limpiar cache
            localStorage.clear();
            sessionStorage.clear();

            if ("caches" in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map((name) => caches.delete(name)));
            }

            window.location.href = "/auth/login";

            return {
                success: true,
                error: null,
            };
        } catch (error) {
            const authError = error as AuthError;
            return {
                success: false,
                error: authError,
            };
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        login,
        register,
        loginWithGoogle,
        logout
    }
}