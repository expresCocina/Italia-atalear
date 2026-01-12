# Italia Atelier - Sitio Web de Sastrería de Lujo

Sitio web completo para Italia Atelier, una sastrería de alta gama en Bogotá, Colombia. Incluye catálogo público dinámico y dashboard administrativo privado.

## 🎨 Características

### Vista Pública
- ✨ Hero section elegante con imagen de fondo
- 📦 Catálogo dinámico de productos desde Supabase
- 🏷️ Filtros por categoría
- 💬 Botón de WhatsApp por producto
- 📍 Información de la tienda (dirección, horario)
- 📱 100% responsive

### Dashboard Administrativo
- 🔐 Autenticación con Supabase Auth
- 🛡️ Rutas protegidas
- ➕ Crear, editar y eliminar productos
- 🖼️ Carga de imágenes a Supabase Storage
- ⚙️ Configuraciones dinámicas (logo, redes, textos)
- 🗑️ Cola de eliminación para Facebook Catalog

## 🚀 Tecnologías

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router DOM
- **Iconos**: Lucide React

## 📋 Requisitos Previos

1. Node.js 18+ instalado
2. Cuenta de Supabase (gratis en https://supabase.com)

## ⚙️ Configuración

### 1. Configurar Supabase

1. Crea un nuevo proyecto en Supabase
2. Ve a **SQL Editor** y ejecuta el archivo `schema.sql` (ubicado en la carpeta brain)
3. Ve a **Storage** y crea un bucket llamado `fotos-catalogo` (público)
4. Ve a **Authentication** > **Users** y crea un usuario administrador

### 2. Configurar Variables de Entorno

Edita el archivo `.env` y reemplaza con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Puedes encontrar estas credenciales en:
**Supabase Dashboard** > **Settings** > **API**

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 🌐 Rutas

- `/` - Página pública (catálogo)
- `/login` - Login de administrador
- `/admin` - Dashboard administrativo (protegido)

## 📝 Configuración Inicial

### Actualizar Configuraciones

1. Inicia sesión en `/login` con tu usuario de Supabase
2. Ve a la sección **Configuración** en el dashboard
3. Actualiza:
   - Logo del sitio
   - Número de WhatsApp (formato: 573001234567)
   - URL de Instagram
   - Dirección de la tienda
   - Horario de atención
   - Texto del hero

### Agregar Productos

1. Ve a **Catálogo** en el dashboard
2. Haz clic en **Nuevo Producto**
3. Completa el formulario:
   - Sube una imagen
   - Nombre del producto
   - Descripción
   - Categoría
   - Precio sugerido
   - Estado (Activo/Oculto)

## 🗄️ Base de Datos

### Tablas Principales

- `productos_catalogo` - Productos del catálogo
- `categorias` - Categorías de productos
- `settings` - Configuraciones dinámicas del sitio
- `facebook_delete_queue` - Cola de eliminación para Facebook

### Trigger Automático

Cuando eliminas un producto, automáticamente se agrega a `facebook_delete_queue` para futura integración con Facebook Catalog.

## 🎨 Diseño

### Paleta de Colores (Quiet Luxury)
- Negro profundo: `#0B0B0B`
- Blanco puro: `#FFFFFF`
- Grises suaves para bordes y textos

### Tipografía
- **Títulos**: Playfair Display (serif elegante)
- **Texto**: Inter (sans moderna)

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

## 🚀 Despliegue

### Vercel (Recomendado)

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Configura las variables de entorno en Vercel Dashboard

### Netlify

1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configura las variables de entorno

## 📞 Soporte

Para cualquier duda o problema, contacta al desarrollador.

## 📄 Licencia

© 2026 Italia Atelier. Todos los derechos reservados.
