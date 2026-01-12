/**
 * About Component
 * Sección "Nosotros" con historia de la marca y mapa de ubicación
 */

import { useEffect, useState } from 'react'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { getSetting } from '../../lib/supabase'

export default function About() {
    const [storeInfo, setStoreInfo] = useState({
        address: '',
        hours: '',
        phone: '',
        email: ''
    })

    useEffect(() => {
        loadStoreInfo()
    }, [])

    const loadStoreInfo = async () => {
        try {
            const [addressData, hoursData, phoneData] = await Promise.all([
                getSetting('store_address'),
                getSetting('store_hours'),
                getSetting('whatsapp_number')
            ])

            setStoreInfo({
                address: addressData?.data?.value || 'Ak 15 #119-11 Local 207, Usaquén, Bogotá',
                hours: hoursData?.data?.value || 'Lun - Sáb: 9:00 AM - 7:00 PM',
                phone: phoneData?.data?.value || '+57 123 456 7890'
            })
        } catch (error) {
            console.error('Error loading store info:', error)
        }
    }

    return (
        <section id="nosotros" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-4">
                        Sobre Nosotros
                    </h2>
                    <div className="w-24 h-0.5 bg-[#C9A961] mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Tradición, elegancia y excelencia en sastrería de lujo
                    </p>
                </div>

                {/* Contenido Principal */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">

                    {/* Historia y Valores */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-serif text-2xl text-gray-900 mb-4">Nuestra Historia</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Italia Atelier nace de la pasión por la sastrería de alta calidad y el compromiso
                                con la excelencia. Cada prenda que creamos es una obra de arte, diseñada con
                                precisión y confeccionada con los mejores materiales.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Nuestra filosofía se basa en la atención al detalle, el servicio personalizado
                                y la búsqueda constante de la perfección en cada costura.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-serif text-2xl text-gray-900 mb-4">Nuestros Valores</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#C9A961] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-gray-900">Calidad Superior:</strong>
                                        <span className="text-gray-600"> Utilizamos únicamente las mejores telas y materiales.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#C9A961] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-gray-900">Atención Personalizada:</strong>
                                        <span className="text-gray-600"> Cada cliente recibe un servicio único y exclusivo.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#C9A961] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-gray-900">Tradición Artesanal:</strong>
                                        <span className="text-gray-600"> Técnicas clásicas combinadas con diseño contemporáneo.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Información de Contacto */}
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h3 className="font-serif text-2xl text-gray-900 mb-6">Visítanos</h3>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Dirección</h4>
                                    <p className="text-gray-600">{storeInfo.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Horario</h4>
                                    <p className="text-gray-600">{storeInfo.hours}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Teléfono</h4>
                                    <a
                                        href={`https://wa.me/${storeInfo.phone.replace(/\D/g, '')}`}
                                        className="text-gray-600 hover:text-[#C9A961] transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {storeInfo.phone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/${storeInfo.phone.replace(/\D/g, '')}?text=Hola, me gustaría agendar una cita`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            Agendar Cita
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Mapa */}
                <div className="mb-8">
                    <h3 className="font-serif text-2xl text-gray-900 mb-6 text-center">Encuéntranos</h3>
                    <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2934753827596!2d-74.03527492503827!3d4.704476842127841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a8e8e8e8e8f%3A0x1234567890abcdef!2sAk.%2015%20%23119-11%2C%20Usaqu%C3%A9n%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Italia Atelier"
                        ></iframe>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        <a
                            href="https://maps.app.goo.gl/qwnRXEwaHZYdbtap8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C9A961] hover:underline"
                        >
                            Haz clic aquí para abrir en Google Maps y obtener direcciones
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
