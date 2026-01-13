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

      {/* Mobile Menu Overlay - Mejorado */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-xl z-40 transition-all duration-500 md:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        style={{ paddingTop: isScrolled ? '80px' : '100px' }}
      >
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center text-gray-900 text-lg uppercase tracking-widest font-light hover:text-luxury-gold transition-all py-3 border-b border-gray-100 last:border-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isMobileMenuOpen ? 'fadeInDown 0.5s ease-out forwards' : 'none'
              }}
            >
              {link.name}
            </a>
          ))}

          {/* Action Button */}
          <div className="pt-4">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Acceder</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  )
}
