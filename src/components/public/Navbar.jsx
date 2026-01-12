import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Manejar el scroll para cambiar el estilo del navbar y cerrar menú móvil
  useEffect(() => {
    const handleScroll = () => {
      // Cambiar estilo del navbar
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Cerrar menú móvil al hacer scroll
      if (window.scrollY > 10) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Nosotros', href: '#nosotros' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-4 text-gray-900'
        : 'bg-transparent py-6 text-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo Tipográfico */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col items-center group">
              <h1 className={`font-serif text-3xl tracking-wider uppercase transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
                Italia Atelier
              </h1>
              <span className={`text-[10px] tracking-[0.3em] font-light uppercase mt-1 transition-all duration-500 group-hover:tracking-[0.5em] ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                Luxury Tailoring
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm uppercase tracking-widest font-light hover:text-luxury-gold transition-colors relative group ${isScrolled ? 'text-gray-800' : 'text-white/90'
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Action Icons */}
            <div className="flex items-center space-x-6 pl-6 border-l border-current opacity-50">
              <Link to="/login" className="hover:text-luxury-gold transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none transition-colors ${isScrolled ? 'text-black' : 'text-white'
                }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-transform duration-500 md:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '0' }}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-4 text-white p-2"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl text-white tracking-widest uppercase mb-2">Italia Atelier</h2>
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase">Luxury Tailoring</p>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-xl uppercase tracking-widest font-light hover:text-luxury-gold transition-colors"
          >
            {link.name}
          </a>
        ))}

        <Link
          to="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-8 px-8 py-3 border border-white/20 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Acceso Clientes
        </Link>
      </div>
    </nav>
  )
}
