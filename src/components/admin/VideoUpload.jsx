/**
 * VideoUpload Component
 * Componente para subir videos a Supabase Storage
 */

import { useState } from 'react'
import { Upload, X, Loader2, Video, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function VideoUpload({ videoUrl, onVideoChange, label }) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tipo de archivo
        const validTypes = ['video/mp4', 'video/webm', 'video/quicktime']
        if (!validTypes.includes(file.type)) {
            setError('Formato no válido. Solo MP4, WebM o MOV.')
            return
        }

        // Validar tamaño (50MB)
        const maxSize = 50 * 1024 * 1024 // 50MB en bytes
        if (file.size > maxSize) {
            setError('El video es muy grande. Máximo 50MB.')
            return
        }

        setError('')
        setUploading(true)
        setProgress(0)

        try {
            // Generar nombre único
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
            const filePath = `${fileName}`

            // Subir archivo
            const { data, error: uploadError } = await supabase.storage
                .from('videos-italia')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                throw uploadError
            }

            // Obtener URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('videos-italia')
                .getPublicUrl(filePath)

            // Notificar cambio
            onVideoChange(publicUrl)
            setProgress(100)
        } catch (err) {
            console.error('Error uploading video:', err)
            setError(err.message || 'Error al subir el video')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!videoUrl) return

        if (!confirm('¿Estás seguro de eliminar este video?')) return

        try {
            // Extraer el nombre del archivo de la URL
            const fileName = videoUrl.split('/').pop()

            // Eliminar del storage
            const { error: deleteError } = await supabase.storage
                .from('videos-italia')
                .remove([fileName])

            if (deleteError) {
                console.error('Error deleting video:', deleteError)
            }

            // Limpiar URL
            onVideoChange('')
        } catch (err) {
            console.error('Error:', err)
            setError('Error al eliminar el video')
        }
    }

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            {videoUrl ? (
                <div className="space-y-3">
                    {/* Preview del video */}
                    <div className="relative rounded-lg overflow-hidden bg-black">
                        <video
                            src={videoUrl}
                            controls
                            className="w-full h-48 object-contain"
                        />
                    </div>

                    {/* Botón eliminar */}
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Eliminar video
                    </button>
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleFileSelect}
                        disabled={uploading}
                        className="hidden"
                        id={`video-upload-${label}`}
                    />
                    <label
                        htmlFor={`video-upload-${label}`}
                        className="cursor-pointer flex flex-col items-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                                <p className="text-sm text-gray-600">Subiendo... {progress}%</p>
                            </>
                        ) : (
                            <>
                                <Video className="w-12 h-12 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        Haz clic para subir un video
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        MP4, WebM o MOV (máx. 50MB)
                                    </p>
                                </div>
                            </>
                        )}
                    </label>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                    <X className="w-4 h-4" />
                    {error}
                </div>
            )}
        </div>
    )
}
