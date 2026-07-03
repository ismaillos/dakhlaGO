const WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL as string | undefined;

export type SingleOrderPayload = {
  type: 'single';
  nom: string;
  telephone: string;
  adresse: string;
  ville: string;
  produit: string;
  quantite: string;
  prix: string;
};

export type CartOrderPayload = {
  type: 'cart';
  nom: string;
  telephone: string;
  adresse: string;
  ville: string;
  items: string;
  total: string;
};

export type ProductRequestPayload = {
  type: 'demande';
  nom: string;
  telephone: string;
  email: string;
  produit_demande: string;
};

export type OrderPayload = SingleOrderPayload | CartOrderPayload | ProductRequestPayload;

export async function submitOrder(payload: OrderPayload): Promise<boolean> {
  if (!WEBHOOK_URL || WEBHOOK_URL.includes('PLACEHOLDER')) {
    console.warn('[dakhlaGO] VITE_SHEET_WEBHOOK_URL is not configured. Order was not sent.');
    return false;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    });
    // Fire Google Ads conversion on successful order
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const value = payload.type === 'single'
        ? parseFloat(payload.prix) || 0
        : parseFloat(payload.total) || 0;
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-502274695/purchase',
        value,
        currency: 'MAD',
      });
      (window as any).gtag('event', 'purchase', {
        currency: 'MAD',
        value,
      });
    }
    return true;
  } catch (err) {
    console.error('[dakhlaGO] Failed to submit order:', err);
    return false;
  }
}
