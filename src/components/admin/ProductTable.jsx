/**
 * Product Table
 * Tabla administrativa de productos con acciones CRUD
 */

import { useState, useEffect } from 'react'
import { getAllProducts, deleteProduct } from '../../lib/supabase'
import { Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function ProductTable({ onEdit, refreshTrigger }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteModal, setDeleteModal] = useState({ show: false, product: null })

    useEffect(() => {
        loadProducts()
    }, [refreshTrigger])

    const loadProducts = async () => {
        setLoading(true)
        try {
            const { data, error } = await getAllProducts()
            if (error) {
                console.error('Error al cargar productos:', error)
                return
            }
            setProducts(data || [])
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteModal.product) return

        try {
            const { error } = await deleteProduct(deleteModal.product.id)

            if (error) {
                console.error('Error al eliminar:', error)
                alert('Error al eliminar el producto')
                return
            }

            alert('Producto eliminado exitosamente')
            setDeleteModal({ show: false, product: null })
            loadProducts()
        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar la solicitud')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-luxury-black" />
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-luxury-gray-500 text-lg">
                    No hay productos registrados. Crea tu primer producto.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-luxury-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                                Imagen
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-luxury-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-luxury-gray-50 transition-colors">
                                {/* Imagen */}
                                <td className="px-6 py-4">
                                    {product.imagen_url ? (
                                        <img
                                            src={product.imagen_url}
                                            alt={product.nombre}
                                            className="w-16 h-16 object-cover rounded-sm"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-luxury-gray-200 rounded-sm flex items-center justify-center">
                                            <span className="text-xs text-luxury-gray-500">Sin imagen</span>
                                        </div>
                                    )}
                                </td>

                                {/* Nombre */}
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-luxury-black">
                                        {product.nombre}
                                    </div>
                                    {product.descripcion && (
                                        <div className="text-sm text-luxury-gray-500 line-clamp-1">
                                            {product.descripcion}
                                        </div>
                                    )}
                                </td>

                                {/* Categoría */}
                                <td className="px-6 py-4 text-sm text-luxury-gray-600">
                                    {product.categoria?.nombre || '-'}
                                </td>

                                {/* Precio */}
                                <td className="px-6 py-4 text-sm text-luxury-gray-900">
                                    {product.precio_sugerido
                                        ? `$${new Intl.NumberFormat('es-CO').format(product.precio_sugerido)}`
                                        : '-'}
                                </td>

                                {/* Estado */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${product.estado === 'activo'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {product.estado === 'activo' ? (
                                            <>
                                                <Eye className="w-3 h-3" />
                                                Activo
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="w-3 h-3" />
                                                Oculto
                                            </>
                                        )}
                                    </span>
                                </td>

                                {/* Acciones */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
                                            title="Editar"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ show: true, product })}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de confirmación de eliminación */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-sm max-w-md w-full p-6 animate-scale-in">
                        <h3 className="text-xl font-serif mb-4">Confirmar Eliminación</h3>
                        <p className="text-luxury-gray-600 mb-6">
                            ¿Estás seguro de eliminar el producto "{deleteModal.product?.nombre}"?
                            Esta acción no se puede deshacer y el producto se agregará a la cola de
                            eliminación de Facebook.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700 transition-colors"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setDeleteModal({ show: false, product: null })}
                                className="flex-1 btn-secondary"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
