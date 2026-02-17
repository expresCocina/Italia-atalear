/**
 * Componente de Login
 * Diseño Split-Screen Premium responsivo
 * Móvil: Imagen de fondo con formulario superpuesto
 * Desktop: Pantalla dividida 50/50
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../../lib/supabase'
import { ArrowRight, Loader2, Mail, Lock } from 'lucide-react'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { data, error } = await signIn(email, password)

            if (error) {
                // Mensajes más descriptivos para depuración
                if (error.message.includes('Email not confirmed')) {
                    setError('Tu correo aún no ha sido confirmado. Revisa tu bandeja de entrada.')
                } else if (error.message.includes('Invalid login credentials')) {
                    setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
                } else {
                    setError(error.message)
                }
                return
            }

            if (data.user) {
                navigate('/admin')
            }
        } catch (err) {
            setError('Error de conexión. Intenta nuevamente.')
            console.error('Error de login:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex w-full relative">
            {/* Imagen de Fondo (Móvil y Desktop izquierda) */}
            <div className={`
                absolute inset-0 z-0 bg-cover bg-center 
                lg:static lg:w-1/2 lg:flex lg:items-center lg:justify-center lg:bg-black lg:relative
            `}
                style={{ backgroundImage: "url('/traje-negro.png')" }}
            >
                {/* Overlay Oscuro */}
                <div className="absolute inset-0 bg-black/70 lg:bg-gradient-to-t lg:from-black lg:via-black/40 lg:to-transparent"></div>

                {/* Texto Motivacional (Visible en desktop) */}
                <div className="relative z-10 p-12 text-white max-w-lg hidden lg:block">
                    <h2 className="font-serif text-5xl mb-6 leading-tight text-white">
                        La excelencia en cada detalle.
                    </h2>
                    <p className="text-gray-300 font-light text-lg leading-relaxed">
                        Gestiona tu catálogo, pedidos y clientes desde un panel diseñado para la eficiencia y el estilo.
                    </p>
                    <div className="mt-12 w-24 h-0.5 bg-[#C9A961]"></div>
                </div>
            </div>

            {/* Sección Formulario (Derecha Desktop / Centrado Móvil) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 lg:bg-white text-white lg:text-gray-900">
                <div className="w-full max-w-md space-y-10">

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <Link to="/" className="inline-block group">
                            <h1 className="font-serif text-3xl tracking-wide uppercase mb-1 text-white lg:text-black">
                                Italia Atelier
                            </h1>
                            <span className="text-[10px] tracking-[0.3em] font-light uppercase block group-hover:tracking-[0.5em] transition-all duration-500 text-gray-300 lg:text-gray-500">
                                Luxury Tailoring
                            </span>
                        </Link>
                        <h2 className="mt-12 text-2xl font-serif text-white lg:text-gray-900">Bienvenido de nuevo</h2>
                        <p className="mt-2 text-sm text-gray-400 lg:text-gray-500 font-light">
                            Ingresa tus credenciales para acceder al panel.
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="relative group">
                                <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-2 font-medium text-gray-400 lg:text-gray-500">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-0 top-3 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#C9A961]" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border-b border-gray-500/50 lg:border-gray-300 py-3 pl-8 bg-transparent focus:border-[#C9A961] focus:outline-none transition-colors text-lg font-light placeholder-gray-600 lg:placeholder-gray-300 text-white lg:text-gray-900"
                                        placeholder="nombre@ejemplo.com"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div className="relative group">
                                <label htmlFor="password" className="block text-xs uppercase tracking-wider mb-2 font-medium text-gray-400 lg:text-gray-500">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-0 top-3 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#C9A961]" />
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border-b border-gray-500/50 lg:border-gray-300 py-3 pl-8 bg-transparent focus:border-[#C9A961] focus:outline-none transition-colors text-lg font-light placeholder-gray-600 lg:placeholder-gray-300 text-white lg:text-gray-900"
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-200 lg:bg-red-50 lg:text-red-600 lg:border-l-2 lg:border-red-500 lg:border-t-0 lg:border-r-0 lg:border-b-0 text-sm font-light">
                                {error}
                            </div>
                        )}

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex items-center justify-center overflow-hidden rounded-sm bg-white lg:bg-black text-black lg:text-white px-8 py-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,97,0.3)] disabled:opacity-70 disabled:cursor-not-allowed border border-transparent hover:border-[#C9A961]/30"
                            >
                                {/* Fondo animado al hover */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C9A961]/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

                                <span className="relative z-10 uppercase tracking-[0.2em] text-sm font-medium mr-4 transition-all duration-300 group-hover:tracking-[0.3em] group-hover:text-[#C9A961]">
                                    {loading ? 'Verificando...' : 'Ingresar al Panel'}
                                </span>

                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-[#C9A961]" />
                                ) : (
                                    <ArrowRight className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#C9A961]" />
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center lg:text-left mt-6">
                        <p className="text-sm font-light text-gray-400 lg:text-gray-500">
                            ¿No tienes acceso?{' '}
                            <Link to="/register" className="text-white lg:text-black font-medium hover:text-[#C9A961] underline underline-offset-4 decoration-current transition-colors">
                                Solicitar Registro
                            </Link>
                        </p>
                    </div>

                    <p className="text-center lg:text-left text-xs text-gray-500 font-light mt-8">
                        © 2026 Italia Atelier. Sistema de Gestión Exclusivo.
                    </p>
                </div>
            </div>
        </div>
    )
}
