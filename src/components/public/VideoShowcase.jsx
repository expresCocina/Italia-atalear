/**
 * VideoShowcase Component
 * Sección para mostrar videos en la página principal
 */

import { useEffect, useState } from 'react'
import { getSetting } from '../../lib/supabase'
import { Play, Sparkles } from 'lucide-react'

export default function VideoShowcase() {
    const [videos, setVideos] = useState({
        video1: '',
        video2: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadVideos()
    }, [])

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

    // No mostrar la sección si no hay videos
    if (!loading && !videos.video1 && !videos.video2) {
        return null
    }

    if (loading) {
        return null // O un skeleton loader
    }

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
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

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.video1 && (
                        <div className="group relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-black">
                            <video
                                src={videos.video1}
                                controls
                                className="w-full h-[400px] object-cover"
                                preload="metadata"
                            >
                                Tu navegador no soporta el elemento de video.
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    )}

                    {videos.video2 && (
                        <div className="group relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-black">
                            <video
                                src={videos.video2}
                                controls
                                className="w-full h-[400px] object-cover"
                                preload="metadata"
                            >
                                Tu navegador no soporta el elemento de video.
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
