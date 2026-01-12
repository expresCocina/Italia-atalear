/**
 * Settings Form
 * Formulario para gestionar configuraciones dinámicas del sitio
 */

import { useState, useEffect } from 'react'
import { getAllSettings, upsertSetting, uploadImage } from '../../lib/supabase'
import { Save, Loader2, Upload } from 'lucide-react'

export default function SettingsForm() {
    const [settings, setSettings] = useState({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploadingLogo, setUploadingLogo] = useState(false)

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        setLoading(true)
        try {
            const { data, error } = await getAllSettings()
            if (error) {
                console.error('Error al cargar configuraciones:', error)
                return
            }

            // Convertir array a objeto para fácil acceso
            const settingsObj = {}
            data?.forEach(setting => {
                settingsObj[setting.key] = setting.value || ''
            })
            setSettings(settingsObj)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida')
            return
        }

        setUploadingLogo(true)
        try {
            const { url, error } = await uploadImage(file)
            if (error) {
                alert('Error al subir el logo')
                return
            }

            setSettings({ ...settings, site_logo: url })
        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar el logo')
        } finally {
            setUploadingLogo(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            // Guardar cada configuración
            const promises = Object.entries(settings).map(([key, value]) =>
                upsertSetting(key, value)
            )

            await Promise.all(promises)

            alert('Configuraciones guardadas exitosamente')
        } catch (error) {
            console.error('Error al guardar:', error)
            alert('Error al guardar las configuraciones')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-luxury-black" />
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            <div className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-2xl font-serif mb-6">Configuración General</h3>

                {/* Logo */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Logo del Sitio</label>

                    {settings.site_logo && (
                        <div className="mb-4">
                            <img
                                src={settings.site_logo}
                                alt="Logo"
                                className="h-16 object-contain bg-luxury-gray-100 p-2 rounded-sm"
                            />
                        </div>
                    )}

                    <label className="btn-secondary inline-flex items-center gap-2 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        {uploadingLogo ? 'Subiendo...' : 'Cambiar Logo'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={uploadingLogo}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Hero Title */}
                <div className="mb-6">
                    <label htmlFor="hero_title" className="block text-sm font-medium mb-2">
                        Título del Hero
                    </label>
                    <input
                        id="hero_title"
                        type="text"
                        value={settings.hero_title || ''}
                        onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                        className="input-elegant"
                        placeholder="Sastrería profesional: trabajo hecho con amor"
                    />
                </div>

                {/* WhatsApp */}
                <div className="mb-6">
                    <label htmlFor="whatsapp_number" className="block text-sm font-medium mb-2">
                        Número de WhatsApp
                    </label>
                    <input
                        id="whatsapp_number"
                        type="text"
                        value={settings.whatsapp_number || ''}
                        onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                        className="input-elegant"
                        placeholder="573001234567"
                    />
                    <p className="text-xs text-luxury-gray-500 mt-1">
                        Incluye el código de país sin el símbolo +
                    </p>
                </div>

                {/* Instagram */}
                <div className="mb-6">
                    <label htmlFor="instagram_url" className="block text-sm font-medium mb-2">
                        URL de Instagram
                    </label>
                    <input
                        id="instagram_url"
                        type="url"
                        value={settings.instagram_url || ''}
                        onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                        className="input-elegant"
                        placeholder="https://instagram.com/italiaatelier"
                    />
                </div>

                {/* Facebook */}
                <div className="mb-6">
                    <label htmlFor="facebook_url" className="block text-sm font-medium mb-2">
                        URL de Facebook
                    </label>
                    <input
                        id="facebook_url"
                        type="url"
                        value={settings.facebook_url || ''}
                        onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                        className="input-elegant"
                        placeholder="https://facebook.com/italiaatelier"
                    />
                </div>

                {/* Dirección */}
                <div className="mb-6">
                    <label htmlFor="store_address" className="block text-sm font-medium mb-2">
                        Dirección de la Tienda
                    </label>
                    <input
                        id="store_address"
                        type="text"
                        value={settings.store_address || ''}
                        onChange={(e) => setSettings({ ...settings, store_address: e.target.value })}
                        className="input-elegant"
                        placeholder="Ak 15 #119-11 Local 207, Usaquén, Bogotá"
                    />
                </div>

                {/* Horario */}
                <div className="mb-6">
                    <label htmlFor="store_hours" className="block text-sm font-medium mb-2">
                        Horario de Atención
                    </label>
                    <input
                        id="store_hours"
                        type="text"
                        value={settings.store_hours || ''}
                        onChange={(e) => setSettings({ ...settings, store_hours: e.target.value })}
                        className="input-elegant"
                        placeholder="11:00 a.m. – 7:00 p.m."
                    />
                </div>

                {/* Botón Guardar */}
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Guardando...' : 'Guardar Configuraciones'}
                </button>
            </div>
        </form>
    )
}
