/**
 * Privacy Policy Page
 * Página de Política de Privacidad
 */

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

export default function Privacy() {
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
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-8 h-8 text-[#C9A961]" />
                        <h1 className="font-serif text-4xl text-gray-900">Política de Privacidad</h1>
                    </div>
                    <p className="text-gray-600">Última actualización: Enero 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12 space-y-8">

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">1. Introducción</h2>
                        <p className="text-gray-700 leading-relaxed">
                            En Italia Atelier, nos comprometemos a proteger su privacidad y sus datos personales.
                            Esta política de privacidad explica cómo recopilamos, usamos, almacenamos y protegemos
                            su información personal de acuerdo con la Ley 1581 de 2012 de Colombia y el RGPD europeo.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">2. Información que Recopilamos</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Recopilamos la siguiente información personal:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Nombre completo y documento de identidad</li>
                            <li>Información de contacto (teléfono, email, dirección)</li>
                            <li>Medidas corporales para confección de prendas</li>
                            <li>Preferencias de estilo y diseño</li>
                            <li>Historial de pedidos y transacciones</li>
                            <li>Información de navegación en nuestro sitio web</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">3. Uso de la Información</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Utilizamos su información personal para:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Procesar y completar sus pedidos</li>
                            <li>Proporcionar atención al cliente personalizada</li>
                            <li>Enviar actualizaciones sobre el estado de sus pedidos</li>
                            <li>Mejorar nuestros productos y servicios</li>
                            <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
                            <li>Cumplir con obligaciones legales y fiscales</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">4. Base Legal del Tratamiento</h2>
                        <p className="text-gray-700 leading-relaxed">
                            El tratamiento de sus datos personales se basa en su consentimiento expreso, la ejecución
                            de un contrato, el cumplimiento de obligaciones legales y nuestro interés legítimo en
                            proporcionar y mejorar nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">5. Compartir Información</h2>
                        <p className="text-gray-700 leading-relaxed">
                            No vendemos ni alquilamos su información personal a terceros. Podemos compartir su
                            información únicamente con:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
                            <li>Proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                            <li>Autoridades gubernamentales cuando sea requerido por ley</li>
                            <li>Procesadores de pago para completar transacciones</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">6. Seguridad de los Datos</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
                            su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
                            Esto incluye encriptación SSL, almacenamiento seguro y acceso restringido.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">7. Sus Derechos</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Usted tiene derecho a:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Acceder a sus datos personales</li>
                            <li>Rectificar datos inexactos o incompletos</li>
                            <li>Solicitar la eliminación de sus datos</li>
                            <li>Oponerse al tratamiento de sus datos</li>
                            <li>Solicitar la portabilidad de sus datos</li>
                            <li>Revocar su consentimiento en cualquier momento</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">8. Cookies y Tecnologías Similares</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web,
                            analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar
                            cookies, aunque esto puede afectar la funcionalidad del sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">9. Retención de Datos</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Conservamos su información personal durante el tiempo necesario para cumplir con los
                            propósitos descritos en esta política, a menos que la ley requiera o permita un período
                            de retención más largo.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">10. Cambios a esta Política</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Podemos actualizar esta política de privacidad periódicamente. Le notificaremos sobre
                            cambios significativos publicando la nueva política en nuestro sitio web y actualizando
                            la fecha de "última actualización".
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-gray-900 mb-4">11. Contacto</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Para ejercer sus derechos o realizar consultas sobre esta política de privacidad,
                            puede contactarnos:
                        </p>
                        <ul className="list-none text-gray-700 space-y-2">
                            <li><strong>WhatsApp:</strong> +57 322 210 2194</li>
                            <li><strong>Dirección:</strong> Ak. 15 #119-11 Local 207, Usaquén, Bogotá</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Al utilizar nuestros servicios, usted reconoce que ha leído y comprendido esta
                            política de privacidad y acepta el tratamiento de sus datos personales según lo descrito.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
