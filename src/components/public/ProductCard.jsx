/**
 * Product Card
 * Tarjeta de producto premium con carrusel de imágenes
 */

import { useEffect, useState } from 'react'
import { MessageCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { getSetting } from '../../lib/supabase'

export default function ProductCard({ product }) {
    const [whatsappNumber, setWhatsappNumber] = useState('573001234567')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Crear array de imágenes disponibles
    const images = [
        product.imagen_url,
        product.imagen_url_2,
        product.imagen_url_3,
        product.imagen_url_4
    ].filter(Boolean) // Filtrar solo las que existen

    useEffect(() => {
        loadWhatsappNumber()
    }, [])

    const loadWhatsappNumber = async () => {
        const { data } = await getSetting('whatsapp_number')
        if (data?.value) {
            setWhatsappNumber(data.value)
        }
    }

    const handleWhatsAppClick = () => {
        const message = `Hola, estoy interesado en el producto: ${product.nombre}`
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const goToImage = (index, e) => {
        e.stopPropagation()
        setCurrentImageIndex(index)
    }

    return (
        <div className="card-premium group cursor-pointer">
            {/* Carrusel de Imágenes */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {images.length > 0 ? (
                    <>
                        {/* Imagen actual */}
                        <img
                            src={images[currentImageIndex]}
                            alt={`${product.nombre} - Imagen ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay con efecto de aparición */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <Eye className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        {/* Botones de navegación (solo si hay más de 1 imagen) */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    aria-label="Imagen anterior"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-900" />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight className="w-4 h-4 text-gray-900" />
                                </button>

                                {/* Indicadores de posición (dots) */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => goToImage(index, e)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                    ? 'bg-white w-6'
                                                    : 'bg-white/50 hover:bg-white/75'
                                                }`}
                                            aria-label={`Ir a imagen ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Contador de imágenes */}
                                <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                    {currentImageIndex + 1}/{images.length}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        <span className="text-sm font-light">Sin imagen</span>
                    </div>
                )}

                {/* Badge de categoría */}
                {product.categoria && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5">
                        <p className="text-xs uppercase tracking-widest text-gray-800 font-light">
                            {product.categoria.nombre}
                        </p>
                    </div>
                )}
            </div>

            {/* Información del producto */}
            <div className="p-8">
                {/* Nombre del producto */}
                <h3 className="text-2xl font-serif mb-3 text-gray-900 tracking-wide">
                    {product.nombre}
                </h3>

                {/* Línea decorativa */}
                <div className="gold-line mb-4"></div>

                {/* Descripción */}
                {product.descripcion && (
                    <p className="text-sm text-gray-600 mb-6 line-clamp-2 font-light leading-relaxed">
                        {product.descripcion}
                    </p>
                )}

                {/* Precio */}
                {product.precio_sugerido && (
                    <p className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                        ${new Intl.NumberFormat('es-CO').format(product.precio_sugerido)}
                        <span className="text-sm text-gray-500 ml-2">COP</span>
                    </p>
                )}

                {/* Botón WhatsApp mejorado */}
                <button
                    onClick={handleWhatsAppClick}
                    className="btn-primary w-full flex items-center justify-center gap-3"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>Consultar</span>
                </button>
            </div>
        </div>
    )
}
