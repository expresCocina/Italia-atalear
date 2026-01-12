/**
 * Contexto de Autenticación
 * Maneja el estado global de autenticación
 */

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getCurrentUser } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Verificar sesión actual
        checkUser()

        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            subscription?.unsubscribe()
        }
    }, [])

    const checkUser = async () => {
        try {
            const { user } = await getCurrentUser()
            setUser(user)
        } catch (error) {
            console.error('Error al verificar usuario:', error)
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        loading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
