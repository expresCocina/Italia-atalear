/**
 * Facebook CAPI Helper
 * Envía eventos al servidor de Facebook a través de Supabase Edge Function
 */

import { supabase } from './supabase';

/**
 * Envía evento a Facebook Conversions API vía Edge Function
 */
export const sendToFacebookCAPI = async (eventName, eventData, eventId) => {
    try {
        // Obtener datos del usuario
        const userData = {
            event_source_url: window.location.href,
            client_ip_address: await getClientIP(),
            client_user_agent: navigator.userAgent,
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc')
        };

        // Llamar a Edge Function de Supabase
        const { data, error } = await supabase.functions.invoke('facebook-capi', {
            body: {
                eventName,
                eventData,
                eventId,
                userData
            }
        });

        if (error) {
            console.error('❌ CAPI error:', error);
            return null;
        }

        console.log('✅ CAPI event sent:', eventName, data);
        return data;
    } catch (error) {
        console.error('❌ CAPI error:', error);
        // No bloquear la UI si falla CAPI
        return null;
    }
};

/**
 * Obtiene la IP del cliente
 */
const getClientIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return null;
    }
};

/**
 * Obtiene una cookie por nombre
 */
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

/**
 * Track Contact via CAPI
 */
export const capiContact = async (method, eventId) => {
    return sendToFacebookCAPI('Contact', {
        contact_method: method
    }, eventId);
};
