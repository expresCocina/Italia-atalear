/**
 * Store Info / Footer
 * Pie de página con información de la tienda y enlaces
 */

import { useEffect, useState } from 'react'
import { MapPin, Clock, Instagram, Phone, ArrowUp, Facebook, Music2 } from 'lucide-react'
import { getSetting } from '../../lib/supabase'
import { Link } from 'react-router-dom'

export default function StoreInfo() {
    const [address, setAddress] = useState('Carrera 15 N 119-59 Local 207, Edificio Uni Rueda, Usaquén, Bogotá')
    const [hours, setHours] = useState('11:00 a.m. – 7:00 p.m.')
    const [instagram, setInstagram] = useState('https://instagram.com/italiaatelier')
    const [facebook, setFacebook] = useState('https://www.facebook.com/italia.atelier.2025/')
    const [tiktok, setTiktok] = useState('https://www.tiktok.com/@italiatelier')
    const [whatsapp, setWhatsapp] = useState('573001234567')

    useEffect(() => {
        loadStoreInfo()
    }, [])

    const loadStoreInfo = async () => {
        const [addressData, hoursData, instagramData, whatsappData, facebookData, tiktokData] = await Promise.all([
            getSetting('store_address'),
            getSetting('store_hours'),
            getSetting('instagram_url'),
            getSetting('whatsapp_number'),
            getSetting('facebook_url'),
            getSetting('tiktok_url')
        ])

        if (addressData?.data?.value) setAddress(addressData.data.value)
        if (hoursData?.data?.value) setHours(hoursData.data.value)
        if (instagramData?.data?.value) setInstagram(instagramData.data.value)
        if (whatsappData?.data?.value) setWhatsapp(whatsappData.data.value)
        if (facebookData?.data?.value) setFacebook(facebookData.data.value)
        if (tiktokData?.data?.value) setTiktok(tiktokData.data.value)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer id="footer" className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">

                    {/* Columna 1: Logo y Eslogan */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="flex flex-col items-start">
                            <h2 className="font-serif text-4xl tracking-wider uppercase text-white">
                                Italia Atelier
                            </h2>
                            <span className="text-[10px] tracking-[0.4em] font-light uppercase mt-2 text-white/60">
                                Luxury Tailoring
                            </span>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed max-w-sm">
                            Sastrería tradicional con visión contemporánea.
                            Creamos prendas únicas que cuentan historias de elegancia y distinción,
                            confeccionadas a medida para quienes valoran la excelencia.
                        </p>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-medium uppercase tracking-widest text-[#C9A961] mb-6">
                            Contacto
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-gray-400 group">
                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 group-hover:text-white transition-colors" />
                                <span className="font-light hover:text-white transition-colors cursor-pointer">
                                    {address}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400 group">
                                <Phone className="w-5 h-5 flex-shrink-0 group-hover:text-white transition-colors" />
                                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-light hover:text-white transition-colors">
                                    (+57) {whatsapp}
                                </a>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400 group">
                                <Clock className="w-5 h-5 flex-shrink-0 group-hover:text-white transition-colors" />
                                <span className="font-light">
                                    {hours}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: Redes Sociales */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-medium uppercase tracking-widest text-[#C9A961] mb-6">
                            Síguenos
                        </h3>
                        <div className="flex flex-col gap-4">
                            <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group"
                            >
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/40 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </div>
                                <span className="font-light">Instagram</span>
                            </a>

                            <a
                                href={facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group"
                            >
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/40 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </div>
                                <span className="font-light">Facebook</span>
                            </a>

                            <a
                                href={tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group"
                            >
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/40 transition-colors">
                                    <Music2 className="w-5 h-5" />
                                </div>
                                <span className="font-light">TikTok</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright y Enlaces Legales */}
                <div className="border-t border-white/10 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Italia Atelier. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link
                                to="/terminos"
                                className="text-gray-500 hover:text-[#C9A961] transition-colors"
                            >
                                Términos y Condiciones
                            </Link>
                            <span className="text-gray-700">•</span>
                            <Link
                                to="/privacidad"
                                className="text-gray-500 hover:text-[#C9A961] transition-colors"
                            >
                                Política de Privacidad
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón Scroll to Top */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 left-6 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#C9A961] transition-all duration-300 shadow-lg hover:shadow-xl z-40"
                aria-label="Volver arriba"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </footer>
    )
}
