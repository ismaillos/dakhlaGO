const WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL as string | undefined;

// Rate limiting: max 3 submissions per 10 minutes per session
const _submissions: number[] = [];
function isRateLimited(): boolean {
  const now = Date.now();
  const window = 10 * 60 * 1000;
  while (_submissions.length && _submissions[0] < now - window) _submissions.shift();
  if (_submissions.length >= 3) return true;
  _submissions.push(now);
  return false;
}

function sanitize(value: string): string {
  return value.replace(/[<>"'&]/g, '').trim().slice(0, 500);
}

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

  if (isRateLimited()) {
    console.warn('[dakhlaGO] Rate limit reached. Submission blocked.');
    return false;
  }

  // Sanitize all string fields before sending
  const clean = (v: string) => sanitize(v);
  const sanitized: OrderPayload = payload.type === 'single'
    ? { ...payload, nom: clean(payload.nom), telephone: clean(payload.telephone), adresse: clean(payload.adresse), ville: clean(payload.ville) }
    : payload.type === 'cart'
    ? { ...payload, nom: clean(payload.nom), telephone: clean(payload.telephone), adresse: clean(payload.adresse), ville: clean(payload.ville) }
    : { ...payload, nom: clean(payload.nom), telephone: clean(payload.telephone), email: clean(payload.email), produit_demande: clean(payload.produit_demande) };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(sanitized),
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
