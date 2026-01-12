/**
 * Product Card
 * Tarjeta de producto premium con diseño mejorado y botón de WhatsApp
 */

import { useEffect, useState } from 'react'
import { MessageCircle, Eye } from 'lucide-react'
import { getSetting } from '../../lib/supabase'

export default function ProductCard({ product }) {
    const [whatsappNumber, setWhatsappNumber] = useState('573001234567')

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

    return (
        <div className="card-premium group cursor-pointer">
            {/* Imagen con overlay al hover */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {product.imagen_url ? (
                    <>
                        <img
                            src={product.imagen_url}
                            alt={product.nombre}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay con efecto de aparición */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <Eye className="w-12 h-12 text-white" />
                            </div>
                        </div>
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
