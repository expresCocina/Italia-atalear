/**
 * Componente de Registro
 * Solo permite registrarse si el email está en la tabla registros_autorizados
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { checkAuthorizedEmail, signUp, markAsRegistered } from '../../lib/supabase'
import { ArrowRight, Loader2, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Validaciones básicas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            setLoading(false)
            return
        }

        try {
            // 1. Verificar si el email está autorizado
            const { data: authorized, error: authError } = await checkAuthorizedEmail(email)

            if (authError || !authorized) {
                setError('Este correo no está autorizado para registrarse. Contacta al administrador.')
                setLoading(false)
                return
            }

            if (authorized.registrado) {
                setError('Este correo ya ha sido registrado previamente. Intenta iniciar sesión.')
                setLoading(false)
                return
            }

            // 2. Intentar registro en Supabase Auth
            const { data, error: signUpError } = await signUp(email, password)

            if (signUpError) {
                if (signUpError.message.includes('already registered')) {
                    setError('Este correo ya tiene una cuenta activa.')
                } else {
                    setError('Error al registrarse: ' + signUpError.message)
                }
                return
            }

            // 3. Marcar como registrado en la tabla de whitelist
            await markAsRegistered(email)

            // Verificar si el usuario necesita confirmar el email
            // Si no hay sesión inmediatamente, es probable que requiera confirmación
            const needsConfirmation = !data.session;
            setSuccess(needsConfirmation ? 'confirmation_pending' : 'success')
        } catch (err) {
            setError('Error de conexión. Intenta nuevamente.')
            console.error('Error de registro:', err)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black p-4">
                <div className="max-w-md w-full bg-white p-10 rounded-sm text-center space-y-6 animate-fade-in">
                    <div className="flex justify-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <h2 className="font-serif text-3xl text-gray-900">
                        {success === 'confirmation_pending' ? 'Verifica tu Correo' : '¡Registro Exitoso!'}
                    </h2>
                    <p className="text-gray-600 font-light">
                        {success === 'confirmation_pending'
                            ? 'Te hemos enviado un enlace de confirmación a tu correo electrónico. Por favor, revísalo para activar tu cuenta.'
                            : 'Tu cuenta ha sido creada exitosamente. Ahora puedes acceder al panel.'}
                    </p>
                    <Link
                        to="/login"
                        className="block w-full bg-black text-white px-8 py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                        Ir al Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex w-full relative">
            {/* Imagen de Fondo (Similar a Login) */}
            <div className={`
                absolute inset-0 z-0 bg-cover bg-center 
                lg:static lg:w-1/2 lg:flex lg:items-center lg:justify-center lg:bg-black lg:relative
            `}
                style={{ backgroundImage: "url('/traje-negro.png')" }}
            >
                <div className="absolute inset-0 bg-black/70 lg:bg-gradient-to-t lg:from-black lg:via-black/40 lg:to-transparent"></div>
                <div className="relative z-10 p-12 text-white max-w-lg hidden lg:block">
                    <h2 className="font-serif text-5xl mb-6 leading-tight text-white">
                        Únete a la exclusividad.
                    </h2>
                    <p className="text-gray-300 font-light text-lg leading-relaxed">
                        Crea tu cuenta para gestionar tus preferencias y pedidos personalizados.
                    </p>
                    <div className="mt-12 w-24 h-0.5 bg-[#C9A961]"></div>
                </div>
            </div>

            {/* Sección Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 lg:bg-white text-white lg:text-gray-900">
                <div className="w-full max-w-md space-y-8">
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
                        <h2 className="mt-8 text-2xl font-serif text-white lg:text-gray-900">Crear Cuenta</h2>
                        <p className="mt-2 text-sm text-gray-400 lg:text-gray-500 font-light">
                            Solo para clientes previamente autorizados.
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-5">
                            {/* Email */}
                            <div className="relative group">
                                <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-2 font-medium text-gray-400 lg:text-gray-500">
                                    Correo Autorizado
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

                            {/* Confirmar Contraseña */}
                            <div className="relative group">
                                <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-wider mb-2 font-medium text-gray-400 lg:text-gray-500">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-0 top-3 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#C9A961]" />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full border-b border-gray-500/50 lg:border-gray-300 py-3 pl-8 bg-transparent focus:border-[#C9A961] focus:outline-none transition-colors text-lg font-light placeholder-gray-600 lg:placeholder-gray-300 text-white lg:text-gray-900"
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-200 lg:bg-red-50 lg:text-red-600 lg:border-l-2 lg:border-red-500 lg:border-t-0 lg:border-r-0 lg:border-b-0 text-sm font-light flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex items-center justify-center overflow-hidden rounded-sm bg-white lg:bg-black text-black lg:text-white px-8 py-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,97,0.3)] disabled:opacity-70 disabled:cursor-not-allowed border border-transparent hover:border-[#C9A961]/30"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C9A961]/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="relative z-10 uppercase tracking-[0.2em] text-sm font-medium mr-4 transition-all duration-300 group-hover:tracking-[0.3em] group-hover:text-[#C9A961]">
                                    {loading ? 'Procesando...' : 'Crear mi Cuenta'}
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
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="text-white lg:text-black font-medium hover:text-[#C9A961] underline underline-offset-4 decoration-current transition-colors">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>

                    <p className="text-center lg:text-left text-xs text-gray-500 font-light mt-8">
                        © 2026 Italia Atelier. Sistema de Registro Exclusivo.
                    </p>
                </div>
            </div>
        </div>
    )
}
