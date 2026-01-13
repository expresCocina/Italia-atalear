/**
 * Home Page
 * Página pública principal con Hero, Catálogo, Nosotros y Footer
 */

import Navbar from '../components/public/Navbar'
import Hero from '../components/public/Hero'
import VideoShowcase from '../components/public/VideoShowcase'
import Catalog from '../components/public/Catalog'
import About from '../components/public/About'
import StoreInfo from '../components/public/StoreInfo'
import WhatsAppButton from '../components/public/WhatsAppButton'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <VideoShowcase />
            <Catalog />
            <About />
            <StoreInfo />
            <WhatsAppButton />
        </main>
    )
}
