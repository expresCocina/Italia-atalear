-- Script de verificación para Facebook CAPI
-- Este script verifica que la configuración esté lista

-- 1. Verificar que la tabla de settings existe y tiene los datos correctos
SELECT key, value 
FROM settings 
WHERE key IN ('facebook_url', 'instagram_url', 'whatsapp_number')
ORDER BY key;

-- 2. Insertar/actualizar el link de Facebook si no existe
INSERT INTO settings (key, value, tipo, descripcion)
VALUES (
    'facebook_url', 
    'https://www.facebook.com/italia.atelier.2025/', 
    'text', 
    'URL de la página de Facebook'
)
ON CONFLICT (key) 
DO UPDATE SET 
    value = 'https://www.facebook.com/italia.atelier.2025/',
    updated_at = NOW();

-- 3. Verificar que se insertó correctamente
SELECT * FROM settings WHERE key = 'facebook_url';

-- NOTA IMPORTANTE:
-- Este script SQL NO puede desplegar la Edge Function de CAPI.
-- Para que CAPI funcione, DEBES:
-- 1. Ir a Supabase Dashboard → Functions
-- 2. Crear la función 'facebook-capi' manualmente
-- 3. Copiar el código de index.ts
-- 4. Desactivar "Verify JWT"
-- 5. Desplegar

-- La Edge Function NO es una función SQL, es código TypeScript
-- que se ejecuta en servidores de Supabase.
