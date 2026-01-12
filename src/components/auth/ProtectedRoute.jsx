/**
 * Ruta Protegida
 * Componente que protege rutas del dashboard
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-luxury-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-luxury-white">Verificando acceso...</p>
                </div>
            </div>
        )
    }

    // Redirigir a login si no está autenticado
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Renderizar contenido protegido
    return children
}
