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
  items: string; // formatted string: "Product x2 - 200 DH, ..."
  total: string;
};

export type OrderPayload = SingleOrderPayload | CartOrderPayload;

/**
 * Sends an order to the Google Apps Script webhook.
 * Returns true when the request was dispatched (Apps Script returns opaque
 * responses with no-cors, so we can't confirm server-side success).
 * Returns false only when no webhook URL is configured.
 */
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
    return true;
  } catch (err) {
    console.error('[dakhlaGO] Failed to submit order:', err);
    return false;
  }
}
