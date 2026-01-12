/**
 * Terms and Conditions Page
 * Página de Términos y Condiciones
 */

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C9A961] transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al inicio
                    </Link>
                    <h1 className="font-serif text-4xl text-gray-900 mb-2">Términos y Condiciones</h1>
                    <p className="text-gray-600">Última actualización: Enero 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12 space-y-8">

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">1. Aceptación de los Términos</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Al acceder y utilizar el sitio web de Italia Atelier, usted acepta estar sujeto a estos
                            términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos,
                            no debe utilizar nuestro sitio web.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">2. Servicios Ofrecidos</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Italia Atelier ofrece servicios de sastrería de lujo, incluyendo:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Confección de trajes a medida</li>
                            <li>Diseño y elaboración de prendas personalizadas</li>
                            <li>Ajustes y modificaciones de prendas</li>
                            <li>Asesoría de estilo personalizada</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">3. Proceso de Pedidos</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Los pedidos de prendas personalizadas requieren:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Cita previa para toma de medidas</li>
                            <li>Anticipo del 50% al momento de confirmar el pedido</li>
                            <li>Pago del saldo restante al momento de la entrega</li>
                            <li>Los tiempos de entrega varían según la complejidad de la prenda</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">4. Precios y Pagos</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Los precios mostrados en el catálogo son referenciales y pueden variar según las
                            especificaciones finales del cliente. Aceptamos pagos en efectivo, transferencia
                            bancaria y tarjetas de crédito/débito. Todos los precios están expresados en pesos
                            colombianos (COP).
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">5. Política de Devoluciones</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Debido a la naturaleza personalizada de nuestros productos, no aceptamos devoluciones
                            una vez iniciado el proceso de confección. Sin embargo, garantizamos ajustes gratuitos
                            si la prenda no cumple con las especificaciones acordadas.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">6. Propiedad Intelectual</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseños,
                            es propiedad de Italia Atelier y está protegido por las leyes de propiedad intelectual.
                            Queda prohibida su reproducción sin autorización expresa.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">7. Limitación de Responsabilidad</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Italia Atelier no se hace responsable por daños indirectos, incidentales o consecuentes
                            derivados del uso de nuestros servicios. Nuestra responsabilidad se limita al valor
                            pagado por el producto o servicio específico.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">8. Modificaciones</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
                            Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">9. Contacto</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Para cualquier consulta sobre estos términos y condiciones, puede contactarnos a través de:
                        </p>
                        <ul className="list-none text-gray-700 space-y-2 mt-3">
                            <li><strong>WhatsApp:</strong> +57 322 210 2194</li>
                            <li><strong>Dirección:</strong> Ak. 15 #119-11 Local 207, Usaquén, Bogotá</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
