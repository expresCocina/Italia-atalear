/**
 * Cliente de Supabase y funciones helper
 * Italia Atelier - Luxury Tailoring
 */

import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxOTAwMDAwMDAwfQ.placeholder'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase no configurado. El sitio se mostrará pero sin datos.')
    console.warn('📝 Configura tu archivo .env con las credenciales de Supabase para habilitar todas las funcionalidades.')
}

// Cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// =====================================================
// AUTH HELPERS
// =====================================================

/**
 * Iniciar sesión con email y contraseña
 */
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

/**
 * Registrar nuevo usuario (solo si el email está autorizado)
 */
export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

/**
 * Verificar si un email está en la lista de autorizados
 */
export const checkAuthorizedEmail = async (email) => {
    const { data, error } = await supabase
        .from('registros_autorizados')
        .select('*')
        .eq('email', email)
        .maybeSingle()

    return { data, error }
}

/**
 * Marcar un email como ya registrado
 */
export const markAsRegistered = async (email) => {
    const { error } = await supabase
        .from('registros_autorizados')
        .update({ registrado: true, updated_at: new Date() })
        .eq('email', email)

    return { error }
}

/**
 * Cerrar sesión
 */
export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}

/**
 * Obtener usuario actual
 */
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
}

// =====================================================
// STORAGE HELPERS
// =====================================================

/**
 * Subir imagen al bucket de Supabase Storage
 * @param {File} file - Archivo de imagen
 * @param {string} bucket - Nombre del bucket (default: 'fotos-catalogo')
 * @returns {Promise<{url: string, error: any}>}
 */
export const uploadImage = async (file, bucket = 'fotos-catalogo') => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = fileName

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

    if (error) {
        return { url: null, error }
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

    return { url: publicUrl, error: null }
}

/**
 * Eliminar imagen del bucket
 */
export const deleteImage = async (url, bucket = 'fotos-catalogo') => {
    // Extraer el nombre del archivo de la URL
    const fileName = url.split('/').pop()

    const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName])

    return { error }
}

// =====================================================
// PRODUCTOS HELPERS
// =====================================================

/**
 * Obtener todos los productos activos (para vista pública)
 */
export const getActiveProducts = async () => {
    const { data, error } = await supabase
        .from('productos_catalogo')
        .select(`
      *,
      categoria:categorias(*)
    `)
        .eq('estado', 'activo')
        .order('created_at', { ascending: false })

    return { data, error }
}

/**
 * Obtener todos los productos (para admin)
 */
export const getAllProducts = async () => {
    const { data, error } = await supabase
        .from('productos_catalogo')
        .select(`
      *,
      categoria:categorias(*)
    `)
        .order('created_at', { ascending: false })

    return { data, error }
}

/**
 * Crear producto
 */
export const createProduct = async (product) => {
    const { data, error } = await supabase
        .from('productos_catalogo')
        .insert([product])
        .select()

    return { data, error }
}

/**
 * Actualizar producto
 */
export const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
        .from('productos_catalogo')
        .update(updates)
        .eq('id', id)
        .select()

    return { data, error }
}

/**
 * Eliminar producto (automáticamente se agrega a facebook_delete_queue)
 */
export const deleteProduct = async (id) => {
    const { error } = await supabase
        .from('productos_catalogo')
        .delete()
        .eq('id', id)

    return { error }
}

// =====================================================
// CATEGORÍAS HELPERS
// =====================================================

/**
 * Obtener todas las categorías activas
 */
export const getActiveCategories = async () => {
    const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true })

    return { data, error }
}

/**
 * Obtener todas las categorías (para admin)
 */
export const getAllCategories = async () => {
    const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('orden', { ascending: true })

    return { data, error }
}

// =====================================================
// SETTINGS HELPERS
// =====================================================

/**
 * Obtener configuración por clave
 */
export const getSetting = async (key) => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', key)
        .single()

    return { data, error }
}

/**
 * Obtener todas las configuraciones
 */
export const getAllSettings = async () => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')

    return { data, error }
}

/**
 * Actualizar configuración
 */
export const updateSetting = async (key, value) => {
    const { data, error } = await supabase
        .from('settings')
        .update({ value })
        .eq('key', key)
        .select()

    return { data, error }
}

/**
 * Crear o actualizar configuración
 */
export const upsertSetting = async (key, value, tipo = 'text', descripcion = '') => {
    const { data, error } = await supabase
        .from('settings')
        .upsert({ key, value, tipo, descripcion }, { onConflict: 'key' })
        .select()

    return { data, error }
}
