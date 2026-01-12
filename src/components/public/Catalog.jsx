/**
 * Catalog
 * Catálogo dinámico de productos con filtros por categoría - DISEÑO MEJORADO
 */

import { useEffect, useState } from 'react'
import { getActiveProducts, getActiveCategories } from '../../lib/supabase'
import ProductCard from './ProductCard'
import { Loader2, Sparkles } from 'lucide-react'

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        try {
            const [productsResult, categoriesResult] = await Promise.all([
                getActiveProducts(),
                getActiveCategories()
            ])

            if (productsResult.data) {
                setProducts(productsResult.data)
            }

            if (categoriesResult.data) {
                setCategories(categoriesResult.data)
            }
        } catch (error) {
            console.error('Error al cargar datos:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.categoria?.id === selectedCategory)

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 animate-spin text-gray-900 mx-auto mb-4" />
                    <p className="text-gray-600 font-light tracking-wide">Cargando colección...</p>
                </div>
            </div>
        )
    }

    return (
        <section id="catalogo" className="py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado de sección mejorado */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-5 h-5 text-gray-400" />
                        <span className="text-sm uppercase tracking-widest text-gray-500 font-light">Colección</span>
                        <Sparkles className="w-5 h-5 text-gray-400" />
                    </div>

                    <h2 className="text-5xl md:text-6xl font-serif mb-6 text-gray-900 tracking-wide">
                        Nuestro Catálogo
                    </h2>

                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-6"></div>

                    <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg leading-relaxed">
                        Descubre nuestra colección de prendas hechas a medida con la más alta calidad
                    </p>
                </div>

                {/* Filtros de categoría mejorados */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-8 py-3 transition-all duration-400 uppercase text-sm tracking-widest font-light ${selectedCategory === 'all'
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            Todos
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-8 py-3 transition-all duration-400 uppercase text-sm tracking-widest font-light ${selectedCategory === category.id
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category.nombre}
                            </button>
                        ))}
                    </div>
                )}

                {/* Grid de productos */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg font-light tracking-wide">
                            No hay productos disponibles en esta categoría
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
