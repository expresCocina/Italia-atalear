/**
 * Catalog
 * Catálogo premium con grid masonry y filtros de categoría elegantes
 */

import { useEffect, useState, useRef } from 'react'
import { getActiveProducts, getActiveCategories } from '../../lib/supabase'
import ProductCard from './ProductCard'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)
    const scrollContainerRef = useRef(null)
    const filtersRef = useRef(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async (attempt = 1) => {
        if (attempt === 1) setLoading(true)
        try {
            const [productsResult, categoriesResult] = await Promise.all([
                getActiveProducts(),
                getActiveCategories()
            ])

            if (productsResult.error) throw productsResult.error
            if (categoriesResult.error) throw categoriesResult.error

            if (productsResult.data) setProducts(productsResult.data)
            if (categoriesResult.data) setCategories(categoriesResult.data)

            setLoading(false)
        } catch (error) {
            console.error(`Error al cargar catálogo (intento ${attempt}/3):`, error)
            if (attempt < 3) {
                setTimeout(() => loadData(attempt + 1), 1500)
            } else {
                setProducts([])
                setCategories([])
                setLoading(false)
            }
        }
    }

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.categoria?.id === selectedCategory)

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' })
        }
    }

    const scrollFilters = (direction) => {
        if (filtersRef.current) {
            filtersRef.current.scrollLeft += direction === 'left' ? -200 : 200
        }
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border border-gray-200 rounded-full mx-auto flex items-center justify-center">
                            <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
                        </div>
                        <div className="absolute inset-0 w-16 h-16 border-t border-[#C9A961] rounded-full mx-auto animate-spin" style={{ animationDuration: '2s' }}></div>
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-light">Cargando colección</p>
                </div>
            </div>
        )
    }

    return (
        <section id="catalogo" className="py-24 bg-white">
            {/* Header elegante */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#C9A961] font-light mb-4">
                        Colección Exclusiva
                    </p>
                    <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-5">
                        Nuestro Catálogo
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px bg-gray-200 w-16"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A961]"></div>
                        <div className="h-px bg-gray-200 w-16"></div>
                    </div>
                    <p className="mt-6 text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
                        Prendas hechas a medida con la más alta calidad y distinción
                    </p>
                </div>
            </div>

            {/* Filtros de categoría — scroll horizontal elegante */}
            {categories.length > 0 && (
                <div className="relative mb-14 border-y border-gray-100">
                    {/* Scroll izquierda (móvil) */}
                    <button
                        onClick={() => scrollFilters('left')}
                        className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-white to-transparent md:hidden"
                        aria-label="Scroll izquierda"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>

                    <div
                        ref={filtersRef}
                        className="flex items-center overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <div className="flex mx-auto">
                            {/* Botón Todos */}
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`
                                    relative px-7 py-5 text-[11px] uppercase tracking-[0.2em] font-light whitespace-nowrap transition-all duration-300
                                    ${selectedCategory === 'all'
                                        ? 'text-gray-900'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }
                                `}
                            >
                                Todos
                                {selectedCategory === 'all' && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-[#C9A961]"></span>
                                )}
                            </button>

                            {/* Divisor */}
                            <div className="w-px bg-gray-100 self-stretch my-3"></div>

                            {categories.map((category, i) => (
                                <div key={category.id} className="flex items-center">
                                    <button
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`
                                            relative px-7 py-5 text-[11px] uppercase tracking-[0.2em] font-light whitespace-nowrap transition-all duration-300
                                            ${selectedCategory === category.id
                                                ? 'text-gray-900'
                                                : 'text-gray-400 hover:text-gray-600'
                                            }
                                        `}
                                    >
                                        {category.nombre}
                                        {selectedCategory === category.id && (
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-[#C9A961]"></span>
                                        )}
                                    </button>
                                    {i < categories.length - 1 && (
                                        <div className="w-px bg-gray-100 self-stretch my-3"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll derecha (móvil) */}
                    <button
                        onClick={() => scrollFilters('right')}
                        className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-white to-transparent md:hidden"
                        aria-label="Scroll derecha"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            )}

            {/* Carrusel de productos */}
            {filteredProducts.length > 0 ? (
                <div className="relative group max-w-[1700px] mx-auto px-4 sm:px-8">
                    {/* Botón Izquierda */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-gray-400 hover:shadow-lg"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Contenedor scroll */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-5 overflow-x-auto scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 w-[300px] md:w-[320px] animate-fade-in-up"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Botón Derecha */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-gray-400 hover:shadow-lg"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Indicador de scroll desliza */}
                    <div className="flex items-center justify-center gap-2 mt-10 text-gray-300">
                        <ChevronLeft className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-widest">Desliza para explorar</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>
            ) : (
                <div className="text-center py-32 max-w-sm mx-auto">
                    <div className="w-16 h-16 border border-gray-100 flex items-center justify-center mx-auto mb-6">
                        <div className="w-6 h-6 border border-gray-300 rotate-45"></div>
                    </div>
                    <p className="text-gray-400 font-light tracking-wide text-sm">
                        No hay prendas disponibles en esta categoría
                    </p>
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className="mt-6 text-xs uppercase tracking-widest text-gray-400 underline underline-offset-4 hover:text-gray-600 transition-colors"
                    >
                        Ver toda la colección
                    </button>
                </div>
            )}

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    )
}
