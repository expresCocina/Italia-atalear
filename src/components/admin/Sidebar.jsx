/**
 * Sidebar del Dashboard
 * Navegación lateral elegante y responsive
 */

import { useState, useEffect } from 'react'
import { Package, Settings, LogOut, Menu, X } from 'lucide-react'
import { signOut, getSetting } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Sidebar({ activeTab, setActiveTab }) {
    const navigate = useNavigate()
    const [logo, setLogo] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        loadLogo()
    }, [])

    const loadLogo = async () => {
        const { data } = await getSetting('site_logo')
        if (data?.value) {
            setLogo(data.value)
        }
    }

    const handleLogout = async () => {
        await signOut()
        navigate('/login')
    }

    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
        setIsMobileMenuOpen(false)
    }

    const menuItems = [
        { id: 'catalog', label: 'Catálogo', icon: Package },
        { id: 'settings', label: 'Configuración', icon: Settings },
    ]

    return (
        <>
            {/* Botón Hamburguesa Móvil */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-black text-white rounded-md shadow-xl hover:bg-gray-900 transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay Móvil */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen
                    w-72 bg-[#0A0A0A] text-white
                    flex flex-col z-50
                    transition-all duration-300 ease-in-out
                    shadow-2xl
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Header del Sidebar */}
                <div className="p-8 border-b border-white/10">
                    {logo ? (
                        <img src={logo} alt="Italia Atelier" className="h-14 object-contain mb-4" />
                    ) : (
                        <div className="mb-4">
                            <h1 className="font-serif text-2xl tracking-wider uppercase text-white mb-1">
                                Italia Atelier
                            </h1>
                            <span className="text-[9px] tracking-[0.35em] font-light uppercase text-gray-500 block">
                                Luxury Tailoring
                            </span>
                        </div>
                    )}
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                        Panel de Administración
                    </p>
                </div>

                {/* Navegación */}
                <nav className="flex-1 p-6 overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.id

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleTabChange(item.id)}
                                        className={`
                                            w-full flex items-center gap-4 px-5 py-4 rounded-lg
                                            transition-all duration-200 group
                                            ${isActive
                                                ? 'bg-white text-black shadow-lg'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                                        <span className="font-medium text-sm tracking-wide">{item.label}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Footer del Sidebar */}
                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm tracking-wide">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>
        </>
    )
}
