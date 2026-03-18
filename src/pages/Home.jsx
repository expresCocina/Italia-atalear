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
import SEO from '../components/SEO'

export default function Home() {
    // Definición de datos estructurados para Sastrería / LocalBusiness
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Tailor",
        "name": "Italia Atelier",
        "image": "https://www.italiatelier.com/favicon.png",
        "@id": "https://www.italiatelier.com",
        "url": "https://www.italiatelier.com",
        "telephone": "+573222102194",
        "priceRange": "$$$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ak. 15 #119-11 Local 207, Usaquén",
            "addressLocality": "Bogotá",
            "addressRegion": "Cundinamarca",
            "addressCountry": "CO"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 4.698380,
            "longitude": -74.032220
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            "opens": "10:00",
            "closes": "19:00"
        }
    };

    return (
        <main className="min-h-screen">
            <SEO />
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
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
