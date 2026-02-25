
export interface UserFirestore {
    uid: string
    email: string
    photoURL?: string
    displayName?: string
}

export interface JamFirestore {
    usuario: UserFirestore[]
    session: string


}