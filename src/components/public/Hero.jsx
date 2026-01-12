/**
 * Hero Section
 * Sección principal con imagen de fondo y mensaje elegante - DISEÑO MEJORADO
 */

import { useEffect, useState } from 'react'
import { getSetting } from '../../lib/supabase'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
    const [heroTitle, setHeroTitle] = useState('Sastrería profesional: trabajo hecho con amor')

    useEffect(() => {
        loadHeroTitle()
    }, [])

    const loadHeroTitle = async () => {
        const { data } = await getSetting('hero_title')
        if (data?.value) {
            setHeroTitle(data.value)
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Imagen de fondo con overlay mejorado */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/hero-image.jpg')`,
                }}
            >
                {/* Overlay oscuro elegante con gradiente */}
                <div className="overlay-dark"></div>

                {/* Patrón sutil de textura */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            {/* Contenido */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center max-w-5xl">
                    {/* Línea decorativa superior */}
                    <div className="w-16 h-px bg-white/40 mx-auto mb-8"></div>

                    {/* Título principal con animación */}
                    <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-wide animate-fade-in-up">
                        {heroTitle}
                    </h1>

                    {/* Línea decorativa inferior */}
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mt-8"></div>

                    {/* Subtítulo */}
                    <p className="text-white/80 text-lg md:text-xl mt-8 font-light tracking-widest uppercase" style={{ animationDelay: '200ms' }}>
                        Bogotá, Colombia
                    </p>
                </div>
            </div>

            {/* Indicador de scroll mejorado */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="text-xs uppercase tracking-widest font-light">Descubre</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </div>
        </section>
    )
}
