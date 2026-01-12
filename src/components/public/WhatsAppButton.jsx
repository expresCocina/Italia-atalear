/**
 * WhatsApp Floating Button
 * Botón flotante elegante para contacto directo por WhatsApp
 */

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false)
    const whatsappNumber = '+573222102194'
    const message = 'Hola, me gustaría obtener más información sobre Italia Atelier'

    const handleClick = () => {
        const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Tooltip */}
            {isHovered && (
                <div className="absolute bottom-full right-0 mb-3 animate-fade-in-up">
                    <div className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl border border-gray-200 whitespace-nowrap">
                        <p className="text-sm font-medium">¿Necesitas ayuda?</p>
                        <p className="text-xs text-gray-600">Chatea con nosotros</p>
                    </div>
                    <div className="absolute top-full right-4 -mt-1">
                        <div className="w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                    </div>
                </div>
            )}

            {/* Botón Principal */}
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                aria-label="Contactar por WhatsApp"
            >
                {/* Efecto de pulso */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping"></span>

                {/* Icono */}
                <MessageCircle className="relative w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />

                {/* Badge de notificación */}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                </span>
            </button>
        </div>
    )
}
