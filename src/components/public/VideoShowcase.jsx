/**
 * VideoShowcase Component
 * Carrusel horizontal de videos con scroll automático
 */

import { useEffect, useState, useRef } from 'react'
import { getSetting } from '../../lib/supabase'
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

export default function VideoShowcase() {
    const [videos, setVideos] = useState({
        video1: '',
        video2: ''
    })
    const [loading, setLoading] = useState(true)
    const scrollContainerRef = useRef(null)
    const autoScrollInterval = useRef(null)

    useEffect(() => {
        loadVideos()
    }, [])

    useEffect(() => {
        // Auto-scroll cada 8 segundos
        if (videos.video1 && videos.video2) {
            startAutoScroll()
        }

        return () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current)
            }
        }
    }, [videos])

    const loadVideos = async () => {
        try {
            const [video1Data, video2Data] = await Promise.all([
                getSetting('video_1_url'),
                getSetting('video_2_url')
            ])

            setVideos({
                video1: video1Data?.data?.value || '',
                video2: video2Data?.data?.value || ''
            })
        } catch (error) {
            console.error('Error loading videos:', error)
        } finally {
            setLoading(false)
        }
    }

    const startAutoScroll = () => {
        autoScrollInterval.current = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current
                const scrollWidth = container.scrollWidth
                const clientWidth = container.clientWidth
                const currentScroll = container.scrollLeft

                // Si llegamos al final, volver al inicio
                if (currentScroll + clientWidth >= scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' })
                } else {
                    // Scroll al siguiente video
                    container.scrollBy({ left: clientWidth, behavior: 'smooth' })
                }
            }
        }, 8000) // Cambiar cada 8 segundos
    }

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth
            const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            })

            // Reiniciar auto-scroll después de interacción manual
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current)
                startAutoScroll()
            }
        }
    }

    // No mostrar la sección si no hay videos
    if (!loading && !videos.video1 && !videos.video2) {
        return null
    }

    if (loading) {
        return null
    }

    const videoList = [videos.video1, videos.video2].filter(Boolean)

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-5 h-5 text-gray-400" />
                        <span className="text-sm uppercase tracking-widest text-gray-500 font-light">Galería</span>
                        <Sparkles className="w-5 h-5 text-gray-400" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900 tracking-wide">
                        Nuestro Trabajo
                    </h2>

                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
                </div>

                {/* Carrusel de Videos */}
                <div className="relative group">
                    {/* Botón Izquierda */}
                    {videoList.length > 1 && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 -translate-x-4 group-hover:translate-x-0"
                            aria-label="Video anterior"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-900" />
                        </button>
                    )}

                    {/* Contenedor de scroll */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        onMouseEnter={() => {
                            // Pausar auto-scroll al hacer hover
                            if (autoScrollInterval.current) {
                                clearInterval(autoScrollInterval.current)
                            }
                        }}
                        onMouseLeave={() => {
                            // Reanudar auto-scroll al quitar hover
                            if (videoList.length > 1) {
                                startAutoScroll()
                            }
                        }}
                    >
                        {videoList.map((videoUrl, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full md:w-[calc(100%-2rem)] animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="group relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-black">
                                    <video
                                        src={videoUrl}
                                        controls
                                        className="w-full h-[300px] md:h-[500px] object-cover"
                                        preload="metadata"
                                    >
                                        Tu navegador no soporta el elemento de video.
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón Derecha */}
                    {videoList.length > 1 && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 translate-x-4 group-hover:translate-x-0"
                            aria-label="Siguiente video"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-900" />
                        </button>
                    )}

                    {/* Indicador de scroll */}
                    {videoList.length > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <div className="text-xs text-gray-400 flex items-center gap-2">
                                <ChevronLeft className="w-3 h-3" />
                                <span>Desliza para ver más</span>
                                <ChevronRight className="w-3 h-3" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
