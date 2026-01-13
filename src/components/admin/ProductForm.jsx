/**
 * Product Form
 * Formulario para crear y editar productos con galería de 4 imágenes
 */

import { useState, useEffect } from 'react'
import { getAllCategories, createProduct, updateProduct } from '../../lib/supabase'
import ImageUpload from './ImageUpload'
import { Save, X, Images } from 'lucide-react'

export default function ProductForm({ product, onSuccess, onCancel }) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        categoria_id: '',
        precio_sugerido: '',
        imagen_url: '',
        imagen_url_2: '',
        imagen_url_3: '',
        imagen_url_4: '',
        estado: 'activo',
    })

    useEffect(() => {
        loadCategories()

        // Si estamos editando, cargar datos del producto
        if (product) {
            setFormData({
                nombre: product.nombre || '',
                descripcion: product.descripcion || '',
                categoria_id: product.categoria_id || '',
                precio_sugerido: product.precio_sugerido || '',
                imagen_url: product.imagen_url || '',
                imagen_url_2: product.imagen_url_2 || '',
                imagen_url_3: product.imagen_url_3 || '',
                imagen_url_4: product.imagen_url_4 || '',
                estado: product.estado || 'activo',
            })
        }
    }, [product])

    const loadCategories = async () => {
        const { data } = await getAllCategories()
        if (data) {
            setCategories(data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Validaciones
            if (!formData.nombre.trim()) {
                alert('El nombre del producto es obligatorio')
                return
            }

            if (!formData.imagen_url) {
                alert('Debes subir al menos una imagen del producto')
                return
            }

            // Preparar datos
            const productData = {
                ...formData,
                precio_sugerido: formData.precio_sugerido ? parseFloat(formData.precio_sugerido) : null,
            }

            let result
            if (product) {
                // Actualizar producto existente
                result = await updateProduct(product.id, productData)
            } else {
                // Crear nuevo producto
                result = await createProduct(productData)
            }

            if (result.error) {
                console.error('Error:', result.error)
                alert('Error al guardar el producto')
                return
            }

            alert(product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente')
            onSuccess()
        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar la solicitud')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif">
                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-2 hover:bg-luxury-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Galería de Imágenes */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                    <Images className="w-5 h-5 text-gray-600" />
                    <label className="block text-sm font-medium">
                        Galería de Imágenes (hasta 4)
                    </label>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                    La primera imagen será la principal. Puedes subir hasta 4 imágenes del producto.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Imagen 1 (Principal) */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 z-10 bg-black text-white text-xs px-2 py-1 rounded-full">
                            Principal
                        </div>
                        <ImageUpload
                            currentImage={formData.imagen_url}
                            onImageChange={(url) => setFormData({ ...formData, imagen_url: url })}
                        />
                    </div>

                    {/* Imagen 2 */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 z-10 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                            2
                        </div>
                        <ImageUpload
                            currentImage={formData.imagen_url_2}
                            onImageChange={(url) => setFormData({ ...formData, imagen_url_2: url })}
                        />
                    </div>

                    {/* Imagen 3 */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 z-10 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                            3
                        </div>
                        <ImageUpload
                            currentImage={formData.imagen_url_3}
                            onImageChange={(url) => setFormData({ ...formData, imagen_url_3: url })}
                        />
                    </div>

                    {/* Imagen 4 */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 z-10 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                            4
                        </div>
                        <ImageUpload
                            currentImage={formData.imagen_url_4}
                            onImageChange={(url) => setFormData({ ...formData, imagen_url_4: url })}
                        />
                    </div>
                </div>
            </div>

            {/* Nombre */}
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                    Nombre del Producto *
                </label>
                <input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="input-elegant"
                    placeholder="Ej: Traje de tres piezas"
                    required
                />
            </div>

            {/* Descripción */}
            <div>
                <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
                    Descripción
                </label>
                <textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="input-elegant min-h-[100px] resize-y"
                    placeholder="Descripción detallada del producto..."
                />
            </div>

            {/* Categoría */}
            <div>
                <label htmlFor="categoria" className="block text-sm font-medium mb-2">
                    Categoría
                </label>
                <select
                    id="categoria"
                    value={formData.categoria_id}
                    onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                    className="input-elegant"
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Precio */}
            <div>
                <label htmlFor="precio" className="block text-sm font-medium mb-2">
                    Precio Sugerido (COP)
                </label>
                <input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={formData.precio_sugerido}
                    onChange={(e) => setFormData({ ...formData, precio_sugerido: e.target.value })}
                    className="input-elegant"
                    placeholder="0.00"
                />
            </div>

            {/* Estado */}
            <div>
                <label htmlFor="estado" className="block text-sm font-medium mb-2">
                    Estado
                </label>
                <select
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="input-elegant"
                >
                    <option value="activo">Activo (visible en la web)</option>
                    <option value="oculto">Oculto</option>
                </select>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-secondary"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}
