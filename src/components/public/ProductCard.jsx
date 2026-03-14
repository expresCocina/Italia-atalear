/**
 * Product Card
 * Tarjeta de producto premium — diseño luxury minimalista
 */

import { useEffect, useState, useRef } from 'react'
import { MessageCircle, ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { getSetting } from '../../lib/supabase'
import { trackContact } from '../../lib/fbPixel'

export default function ProductCard({ product }) {
    const [whatsappNumber, setWhatsappNumber] = useState('573001234567')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const autoScrollInterval = useRef(null)

    const images = [
        product.imagen_url,
        product.imagen_url_2,
        product.imagen_url_3,
        product.imagen_url_4
    ].filter(Boolean)

    useEffect(() => {
        loadWhatsappNumber()
    }, [])

    useEffect(() => {
        if (images.length > 1) startAutoScroll()
        return () => { if (autoScrollInterval.current) clearInterval(autoScrollInterval.current) }
    }, [images.length])

    const loadWhatsappNumber = async () => {
        const { data } = await getSetting('whatsapp_number')
        if (data?.value) setWhatsappNumber(data.value)
    }

    const startAutoScroll = () => {
        autoScrollInterval.current = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 4000)
    }

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) clearInterval(autoScrollInterval.current)
    }

    const handleWhatsAppClick = () => {
        trackContact('whatsapp_product')
        const message = `Hola, estoy interesado en: ${product.nombre}`
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    const nextImage = (e) => {
        e.stopPropagation()
        stopAutoScroll()
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        startAutoScroll()
    }

    const prevImage = (e) => {
        e.stopPropagation()
        stopAutoScroll()
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
        startAutoScroll()
    }

    const openModal = () => {
        stopAutoScroll()
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        if (images.length > 1) startAutoScroll()
    }

    return (
        <>
            <div className="group bg-white cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                {/* Imagen */}
                <div
                    className="relative aspect-[3/4] overflow-hidden bg-gray-50"
                    onClick={openModal}
                >
                    {images.length > 0 ? (
                        <>
                            {/* Imágenes con transición */}
                            <div className="relative w-full h-full">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product.nombre} ${index + 1}`}
                                        loading="lazy"
                                        onLoad={() => index === 0 && setImageLoaded(true)}
                                        onError={(e) => { e.target.style.display = 'none' }}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                        } group-hover:scale-105`}
                                    />
                                ))}
                            </div>

                            {/* Overlay hover con gradiente elegante */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icono expandir */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="bg-white/95 backdrop-blur-sm p-3 shadow-lg">
                                    <Expand className="w-5 h-5 text-gray-800" />
                                </div>
                            </div>

                            {/* Navegación discreta */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 shadow opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-white"
                                        aria-label="Imagen anterior"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 shadow opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-white"
                                        aria-label="Siguiente imagen"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-700" />
                                    </button>

                                    {/* Puntos indicadores */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    stopAutoScroll()
                                                    setCurrentImageIndex(index)
                                                    startAutoScroll()
                                                }}
                                                className={`rounded-full transition-all duration-300 ${
                                                    index === currentImageIndex
                                                        ? 'bg-white w-5 h-1.5'
                                                        : 'bg-white/50 w-1.5 h-1.5'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Contador */}
                                    <div className="absolute top-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 font-light tracking-wide">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}

                            {/* Badge categoría */}
                            {product.categoria && (
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5">
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-700 font-light">
                                        {product.categoria.nombre}
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                            <span className="text-xs font-light tracking-widest uppercase">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Info del producto */}
                <div className="px-6 py-7 border-t border-gray-50">
                    <h3 className="font-serif text-xl text-gray-900 mb-2 leading-tight">
                        {product.nombre}
                    </h3>

                    <div className="w-8 h-px bg-[#C9A961] mb-3"></div>

                    {product.descripcion && (
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2 font-light leading-relaxed tracking-wide">
                            {product.descripcion}
                        </p>
                    )}

                    {product.precio_sugerido && (
                        <p className="text-lg font-light text-gray-800 mb-5 tracking-wide">
                            ${new Intl.NumberFormat('es-CO').format(product.precio_sugerido)}
                            <span className="text-xs text-gray-400 ml-1.5">COP</span>
                        </p>
                    )}

                    <button
                        onClick={handleWhatsAppClick}
                        className="w-full flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-white text-[11px] uppercase tracking-[0.2em] font-light py-3.5 transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-lg hover:shadow-black/20 active:scale-[0.99]"
                    >
                        <MessageCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Consultar disponibilidad</span>
                    </button>
                </div>
            </div>

            {/* Modal de Zoom */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 p-2.5 transition-all z-20"
                        aria-label="Cerrar"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div
                        className="relative w-full h-full flex items-center justify-center p-6 md:p-12"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative max-w-3xl w-full">
                            <img
                                src={images[currentImageIndex]}
                                alt={`${product.nombre} - ${currentImageIndex + 1}`}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                                        }}
                                        className="absolute -left-5 md:-left-14 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrentImageIndex((prev) => (prev + 1) % images.length)
                                        }}
                                        className="absolute -right-5 md:-right-14 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5 text-white" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Info en modal */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                            <p className="font-serif text-white text-lg mb-1">{product.nombre}</p>
                            {images.length > 1 && (
                                <div className="flex justify-center gap-1.5 mt-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index) }}
                                            className={`rounded-full transition-all duration-300 ${
                                                index === currentImageIndex ? 'bg-white w-5 h-1.5' : 'bg-white/30 w-1.5 h-1.5'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
