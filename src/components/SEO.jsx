import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'Italia Atelier | Sastrería de Lujo en Bogotá',
  description = 'Italia Atelier: Sastrería tradicional con visión contemporánea en Bogotá. Creamos prendas únicas que cuentan historias de elegancia y distinción.',
  keywords = 'sastrería, bogotá, trajes a medida, italia atelier, moda hombre, luxury tailoring, ropa formal, camisas a medida',
  url = 'https://www.italiatelier.com/',
  image = 'https://www.italiatelier.com/favicon.png'
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}
