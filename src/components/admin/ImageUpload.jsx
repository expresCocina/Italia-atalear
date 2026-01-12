/**
 * Image Upload Component
 * Componente para subir imágenes a Supabase Storage
 */

import { useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage, deleteImage } from '../../lib/supabase'

export default function ImageUpload({ currentImage, onImageChange }) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState(currentImage || '')

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida')
            return
        }

        // Validar tamaño (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen no debe superar los 5MB')
            return
        }

        setUploading(true)

        try {
            // Eliminar imagen anterior si existe
            if (currentImage) {
                await deleteImage(currentImage)
            }

            // Subir nueva imagen
            const { url, error } = await uploadImage(file)

            if (error) {
                console.error('Error al subir imagen:', error)

                // Mensajes de error más específicos
                if (error.message?.includes('new row violates row-level security')) {
                    alert('⚠️ Error de permisos: Asegúrate de estar autenticado y que el bucket de storage esté configurado correctamente.')
                } else if (error.message?.includes('not found')) {
                    alert('⚠️ El bucket de storage no existe. Por favor, ejecuta el script de configuración de storage.')
                } else {
                    alert(`⚠️ Error al subir la imagen: ${error.message || 'Error desconocido'}`)
                }
                return
            }

            setPreview(url)
            onImageChange(url)
        } catch (error) {
            console.error('Error:', error)
            alert('❌ Error al procesar la imagen. Revisa la consola para más detalles.')
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = async () => {
        if (!preview) return

        const confirmed = confirm('¿Estás seguro de eliminar esta imagen?')
        if (!confirmed) return

        setUploading(true)

        try {
            if (currentImage) {
                await deleteImage(currentImage)
            }

            setPreview('')
            onImageChange('')
        } catch (error) {
            console.error('Error al eliminar imagen:', error)
            alert('Error al eliminar la imagen')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium">Imagen del Producto</label>

            {/* Preview */}
            {preview ? (
                <div className="relative aspect-[3/4] max-w-xs bg-luxury-gray-100 rounded-sm overflow-hidden">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />

                    {/* Botón eliminar */}
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={uploading}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                /* Upload area */
                <label className="block aspect-[3/4] max-w-xs border-2 border-dashed border-luxury-gray-300 rounded-sm hover:border-luxury-black transition-colors cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={uploading}
                        className="hidden"
                    />

                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                        {uploading ? (
                            <>
                                <Loader2 className="w-12 h-12 text-luxury-gray-400 animate-spin mb-4" />
                                <p className="text-sm text-luxury-gray-600">Subiendo imagen...</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-12 h-12 text-luxury-gray-400 mb-4" />
                                <p className="text-sm text-luxury-gray-600 mb-2">
                                    Haz clic para subir una imagen
                                </p>
                                <p className="text-xs text-luxury-gray-500">
                                    PNG, JPG hasta 5MB
                                </p>
                            </>
                        )}
                    </div>
                </label>
            )}
        </div>
    )
}
