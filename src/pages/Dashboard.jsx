/**
 * Dashboard Page
 * Panel de administración responsive y elegante
 */

import { useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import ProductForm from '../components/admin/ProductForm'
import ProductTable from '../components/admin/ProductTable'
import SettingsForm from '../components/admin/SettingsForm'
import { Plus } from 'lucide-react'

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('catalog')
    const [showProductForm, setShowProductForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const handleEdit = (product) => {
        setEditingProduct(product)
        setShowProductForm(true)
    }

    const handleFormSuccess = () => {
        setShowProductForm(false)
        setEditingProduct(null)
        setRefreshTrigger(prev => prev + 1)
    }

    const handleFormCancel = () => {
        setShowProductForm(false)
        setEditingProduct(null)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Contenido Principal */}
            <main className="flex-1 w-full min-w-0">
                <div className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-12 pt-20 lg:pt-12">

                    {/* Sección Catálogo */}
                    {activeTab === 'catalog' && (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2">
                                        Gestión de Catálogo
                                    </h1>
                                    <p className="text-gray-600 text-sm lg:text-base">
                                        Administra los productos de tu catálogo
                                    </p>
                                </div>

                                {!showProductForm && (
                                    <button
                                        onClick={() => setShowProductForm(true)}
                                        className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Nuevo Producto
                                    </button>
                                )}
                            </div>

                            {showProductForm ? (
                                <ProductForm
                                    product={editingProduct}
                                    onSuccess={handleFormSuccess}
                                    onCancel={handleFormCancel}
                                />
                            ) : (
                                <ProductTable
                                    onEdit={handleEdit}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                        </div>
                    )}

                    {/* Sección Configuración */}
                    {activeTab === 'settings' && (
                        <div>
                            <div className="mb-10">
                                <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2">
                                    Configuración
                                </h1>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Personaliza la información de tu sitio web
                                </p>
                            </div>

                            <SettingsForm />
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
