/**
 * Settings Form Component
 * Formulario para configurar ajustes de la tienda
 */

import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { getSetting, upsertSetting } from '../../lib/supabase'
import VideoUpload from './VideoUpload'

export default function SettingsForm() {
    const [settings, setSettings] = useState({
        store_address: '',
        store_hours: '',
        whatsapp_number: '',
        instagram_url: '',
        facebook_url: '',
        tiktok_url: '',
        video_1_url: '',
        video_2_url: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        setLoading(true)
        try {
            const keys = Object.keys(settings)
            const results = await Promise.all(
                keys.map(key => getSetting(key))
            )

            const loadedSettings = {}
            results.forEach((result, index) => {
                const key = keys[index]
                loadedSettings[key] = result?.data?.value || ''
            })

            setSettings(loadedSettings)
        } catch (error) {
            console.error('Error loading settings:', error)
            setMessage({ type: 'error', text: 'Error al cargar configuración' })
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ type: '', text: '' })

        try {
            console.log('Guardando configuración:', settings) // Debug

            // Usar upsertSetting para crear o actualizar
            const updates = Object.entries(settings).map(([key, value]) =>
                upsertSetting(key, value, 'text', `Configuración de ${key}`)
            )

            const results = await Promise.all(updates)

            // Verificar si hubo errores en alguna de las operaciones
            const errors = results.filter(r => r.error).map(r => r.error)

            if (errors.length > 0) {
                console.error('Errores al guardar:', errors)
                throw new Error(errors[0].message || 'Error al guardar algunos campos')
            }

            setMessage({ type: 'success', text: '✓ Configuración guardada exitosamente' })
        } catch (error) {
            console.error('Error saving settings:', error)
            setMessage({ type: 'error', text: `Error: ${error.message}` })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Sección de Información de Contacto */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-serif font-medium mb-6">Información de Contacto</h3>

                {/* WhatsApp */}
                <div className="mb-6">
                    <label htmlFor="whatsapp_number" className="block text-sm font-medium mb-2">
                        Número de WhatsApp
                    </label>
                    <input
                        id="whatsapp_number"
                        type="tel"
                        value={settings.whatsapp_number || ''}
                        onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                        className="input-elegant"
                        placeholder="+57 322 210 2194"
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
                        placeholder="Carrera 15 N 119-59 Local 207, Edificio Uni Rueda"
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
                        placeholder="Lun - Sáb: 9:00 AM - 7:00 PM"
                    />
                </div>
            </div>

            {/* Sección de Redes Sociales */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-serif font-medium mb-6">Redes Sociales</h3>

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

                {/* TikTok */}
                <div className="mb-6">
                    <label htmlFor="tiktok_url" className="block text-sm font-medium mb-2">
                        URL de TikTok
                    </label>
                    <input
                        id="tiktok_url"
                        type="url"
                        value={settings.tiktok_url || ''}
                        onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
                        className="input-elegant"
                        placeholder="https://www.tiktok.com/@italiatelier"
                    />
                </div>
            </div>

            {/* Sección de Videos */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-serif font-medium mb-6">Galería de Videos</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Sube hasta 2 videos para mostrar en la página principal. Formatos aceptados: MP4, WebM, MOV (máx. 50MB cada uno).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Video 1 */}
                    <VideoUpload
                        videoUrl={settings.video_1_url}
                        onVideoChange={(url) => setSettings({ ...settings, video_1_url: url })}
                        label="Video 1"
                    />

                    {/* Video 2 */}
                    <VideoUpload
                        videoUrl={settings.video_2_url}
                        onVideoChange={(url) => setSettings({ ...settings, video_2_url: url })}
                        label="Video 2"
                    />
                </div>
            </div>

            {/* Botón Guardar */}
            <button
                type="submit"
                disabled={saving}
                className="btn-primary flex items-center gap-2"
            >
                {saving ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Guardando...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Guardar Configuración
                    </>
                )}
            </button>
        </form>
    )
}
