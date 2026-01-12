/**
 * Catalog
 * Catálogo dinámico de productos con scroll horizontal elegante
 */

import { useEffect, useState, useRef } from 'react'
import { getActiveProducts, getActiveCategories } from '../../lib/supabase'
import ProductCard from './ProductCard'
import { Loader2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)
    const scrollContainerRef = useRef(null)

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

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            })
        }
    }

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
            <div className="max-w-[1600px] mx-auto">
                {/* Encabezado de sección */}
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

                {/* Filtros de categoría */}
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

                {/* Carrusel de productos */}
                {filteredProducts.length > 0 ? (
                    <div className="relative group">
                        {/* Botón Izquierda */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 -translate-x-4 group-hover:translate-x-0"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-900" />
                        </button>

                        {/* Contenedor de scroll */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-4"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="flex-shrink-0 w-[350px] animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Botón Derecha */}
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 translate-x-4 group-hover:translate-x-0"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-900" />
                        </button>

                        {/* Indicador de scroll */}
                        <div className="flex justify-center gap-2 mt-8">
                            <div className="text-xs text-gray-400 flex items-center gap-2">
                                <ChevronLeft className="w-3 h-3" />
                                <span>Desliza para ver más</span>
                                <ChevronRight className="w-3 h-3" />
                            </div>
                        </div>
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

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
