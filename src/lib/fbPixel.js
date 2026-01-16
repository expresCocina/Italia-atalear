/**
 * Facebook Pixel Helper
 * Funciones para tracking de eventos con Facebook Pixel
 */

import { capiContact } from './fbCapi';

/**
 * Track ViewContent event
 */
export const trackViewContent = (product) => {
    if (typeof window.fbq === 'undefined') return;

    const eventId = `view_${product.id}_${Date.now()}`;

    window.fbq('track', 'ViewContent', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: product.price,
        currency: 'COP'
    }, { eventID: eventId });

    return eventId;
};

/**
 * Track AddToCart event
 */
export const trackAddToCart = (product, quantity = 1) => {
    if (typeof window.fbq === 'undefined') return;

    const eventId = `add_${product.id}_${Date.now()}`;
    const value = product.price * quantity;

    window.fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: value,
        currency: 'COP',
        num_items: quantity
    }, { eventID: eventId });

    return eventId;
};

/**
 * Track InitiateCheckout event
 */
export const trackInitiateCheckout = (items, totalValue) => {
    if (typeof window.fbq === 'undefined') return;

    const eventId = `checkout_${Date.now()}`;

    window.fbq('track', 'InitiateCheckout', {
        content_ids: items.map(item => item.id),
        contents: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            item_price: item.price
        })),
        value: totalValue,
        currency: 'COP',
        num_items: items.reduce((sum, item) => sum + item.quantity, 0)
    }, { eventID: eventId });

    return eventId;
};

/**
 * Track Purchase event
 */
export const trackPurchase = (orderData) => {
    if (typeof window.fbq === 'undefined') return;

    const eventId = `purchase_${orderData.id}_${Date.now()}`;

    window.fbq('track', 'Purchase', {
        content_ids: orderData.items.map(item => item.product_id),
        contents: orderData.items.map(item => ({
            id: item.product_id,
            quantity: item.quantity,
            item_price: item.price
        })),
        value: orderData.total,
        currency: 'COP',
        num_items: orderData.items.reduce((sum, item) => sum + item.quantity, 0)
    }, { eventID: eventId });

    return eventId;
};

/**
 * Track Search event
 */
export const trackSearch = (searchQuery) => {
    if (typeof window.fbq === 'undefined') return;

    window.fbq('track', 'Search', {
        search_string: searchQuery
    });
};

/**
 * Track Contact event
 * Envía tanto a Pixel como a CAPI para asegurar que no se pierda
 */
export const trackContact = (method = 'whatsapp') => {
    if (typeof window.fbq === 'undefined') return;

    const eventId = `contact_${method}_${Date.now()}`;

    // Enviar a Pixel (browser)
    window.fbq('track', 'Contact', {
        contact_method: method
    }, { eventID: eventId });

    // Enviar a CAPI (server-side) para redundancia
    capiContact(method, eventId);

    return eventId;
};
