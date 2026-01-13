/**
 * Product Card
 * Tarjeta de producto premium con carrusel automático y modal de zoom
 */

import { useEffect, useState, useRef } from 'react'
import { MessageCircle, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { getSetting } from '../../lib/supabase'

export default function ProductCard({ product }) {
    const [whatsappNumber, setWhatsappNumber] = useState('573001234567')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const autoScrollInterval = useRef(null)

    // Crear array de imágenes disponibles
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
        // Auto-scroll de imágenes cada 4 segundos
        if (images.length > 1) {
            startAutoScroll()
        }

        return () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current)
            }
        }
    }, [images.length])

    const loadWhatsappNumber = async () => {
        const { data } = await getSetting('whatsapp_number')
        if (data?.value) {
            setWhatsappNumber(data.value)
        }
    }

    const startAutoScroll = () => {
        autoScrollInterval.current = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 4000) // Cambiar cada 4 segundos
    }

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current)
        }
    }

    const handleWhatsAppClick = () => {
        const message = `Hola, estoy interesado en el producto: ${product.nombre}`
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

    const goToImage = (index, e) => {
        e.stopPropagation()
        stopAutoScroll()
        setCurrentImageIndex(index)
        startAutoScroll()
    }

    const openModal = (e) => {
        e.stopPropagation()
        stopAutoScroll()
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        if (images.length > 1) {
            startAutoScroll()
        }
    }

    return (
        <>
            <div className="card-premium group cursor-pointer">
                {/* Carrusel de Imágenes */}
                <div
                    className="relative aspect-[3/4] overflow-hidden bg-gray-100"
                    onClick={openModal}
                >
                    {images.length > 0 ? (
                        <>
                            {/* Imagen actual con transición suave */}
                            <div className="relative w-full h-full">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product.nombre} - Imagen ${index + 1}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${index === currentImageIndex
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-105'
                                            } group-hover:scale-110`}
                                    />
                                ))}
                            </div>

                            {/* Overlay con icono de zoom */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full">
                                        <ZoomIn className="w-8 h-8 text-gray-900" />
                                    </div>
                                </div>
                            </div>

                            {/* Botones de navegación sutiles */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110"
                                        aria-label="Imagen anterior"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-gray-900" />
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110"
                                        aria-label="Siguiente imagen"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-900" />
                                    </button>

                                    {/* Indicadores de posición elegantes */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => goToImage(index, e)}
                                                className={`transition-all duration-300 rounded-full ${index === currentImageIndex
                                                        ? 'bg-white w-8 h-2'
                                                        : 'bg-white/60 hover:bg-white/80 w-2 h-2'
                                                    }`}
                                                aria-label={`Ir a imagen ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Contador sutil */}
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-light">
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

                    {/* Badge de categoría elegante */}
                    {product.categoria && (
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-sm">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-800 font-light">
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

            {/* Modal de Zoom Mejorado */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/97 z-50 flex items-center justify-center animate-fade-in"
                    onClick={closeModal}
                >
                    {/* Botón cerrar elegante */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full transition-all hover:scale-110 z-20"
                        aria-label="Cerrar"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>

                    {/* Contenedor de imagen centrado */}
                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
                        {/* Imagen ampliada con mejor proporción */}
                        <div className="relative max-w-4xl w-full">
                            <img
                                src={images[currentImageIndex]}
                                alt={`${product.nombre} - Imagen ${currentImageIndex + 1}`}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />

                            {/* Navegación en modal - más sutil */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                                        }}
                                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-xl transition-all hover:scale-110"
                                    >
                                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrentImageIndex((prev) => (prev + 1) % images.length)
                                        }}
                                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-xl transition-all hover:scale-110"
                                    >
                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Info del producto - posición fija abajo */}
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-xl max-w-[90%]">
                            <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                                <p className="font-serif text-sm md:text-base">{product.nombre}</p>
                                {images.length > 1 && (
                                    <>
                                        <div className="hidden md:block w-px h-4 bg-white/30"></div>
                                        <div className="flex gap-1.5">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setCurrentImageIndex(index)
                                                    }}
                                                    className={`transition-all duration-300 rounded-full ${index === currentImageIndex
                                                            ? 'bg-white w-6 h-2'
                                                            : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                                                        }`}
                                                />
                                            ))}</div>
                                        <div className="hidden md:block w-px h-4 bg-white/30"></div>
                                        <p className="text-xs md:text-sm text-white/80">
                                            {currentImageIndex + 1}/{images.length}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
