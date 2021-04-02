import { createContext, useContext } from 'react'

export const AuthContext = createContext()
export const CurrentUser = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useCurrentUser = () => {
    return useContext(CurrentUser)
}