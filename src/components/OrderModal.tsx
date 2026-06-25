import { useState } from 'react';
import { z } from 'zod';
import { useCart } from '../hooks/useCart';
import { WHATSAPP_NUMBER } from '../data/products';
import { submitOrder } from '../lib/api';

type View = 'cart' | 'checkout' | 'success';
type FormErrors = Partial<Record<'nom' | 'telephone' | 'adresse' | 'ville', string>>;

const checkoutSchema = z.object({
  nom: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  telephone: z
    .string()
    .regex(
      /^(0[5-7]\d{8}|\+212[5-7]\d{8}|00212[5-7]\d{8})$/,
      'Numéro marocain invalide (ex: 0612345678)',
    ),
  adresse: z.string().min(5, 'Adresse trop courte'),
  ville: z.string().min(2, 'Ville requise'),
});

/* ─── Icons ─── */
const UserIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const PhoneIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
const MapPinIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const BuildingIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
const WhatsAppIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-[10px] mt-1">{msg}</p>;
}

export default function OrderModal() {
  const { items, modalOpen, closeModal, removeItem, updateQuantity, total, clearCart } = useCart();
  const [view, setView] = useState<View>('cart');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [form, setForm] = useState({ nom: '', telephone: '', adresse: '', ville: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const resetAndClose = () => {
    closeModal();
    setTimeout(() => {
      setView('cart');
      setSubmitError(false);
      setErrors({});
    }, 300);
  };

  const buildWhatsAppUrl = (name?: string) => {
    let text = `Bonjour Dakhla Artisanal!\n\nJe souhaite commander:\n`;
    items.forEach((item, i) => {
      text += `\n${i + 1}. ${item.product.name}`;
      if (item.quantity > 1) text += ` (x${item.quantity})`;
      text += ` - ${item.product.price * item.quantity} DH`;
    });
    text += `\n\n*Total: ${total} DH*`;
    if (name) text += `\n\nNom: ${name}`;
    text += `\n\nMerci!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = checkoutSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(false);

    const itemsStr = items
      .map(i => `${i.product.name} x${i.quantity} - ${i.product.price * i.quantity} DH`)
      .join(', ');

    const ok = await submitOrder({
      type: 'cart',
      nom: form.nom,
      telephone: form.telephone,
      adresse: form.adresse,
      ville: form.ville,
      items: itemsStr,
      total: `${total} DH`,
    });

    setSubmitting(false);

    if (ok) {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: total,
          currency: 'MAD',
          content_type: 'product',
        });
      }
      setCustomerName(form.nom);
      clearCart();
      setView('success');
    } else {
      setSubmitError(true);
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[white]/60 backdrop-blur-sm" onClick={resetAndClose} />

      <div className="relative bg-[#141414] gold-border rounded-3xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-[0_40px_100px_rgba(61,43,31,0.25)]">

        {/* ════════════ CART VIEW ════════════ */}
        {view === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-white/60 text-sm">Votre panier est vide.</p>
                <button onClick={resetAndClose} className="mt-4 text-[#E8732F] text-sm font-semibold">Continuer vos achats</button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">Votre Panier</h3>
                    <p className="text-[12px] text-[#D4A574] mt-1">{items.reduce((s, i) => s + i.quantity, 0)} article(s)</p>
                  </div>
                  <button onClick={resetAndClose} className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-white/60 hover:text-white hover:bg-[white/[0.08]] transition-colors">
                    ✕
                  </button>
                </div>

                {/* Items */}
                <div className="p-6 space-y-3">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4 bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-3">
                      <img src={item.product.img} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate text-white">{item.product.name}</h4>
                        <p className="text-[11px] text-[#D4A574]">{item.product.catLabel}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#E8732F] font-bold">{item.product.price * item.quantity} DH</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-[white/[0.08]] text-white/60 hover:bg-[#E8732F] hover:text-white transition-colors flex items-center justify-center text-sm font-bold"
                            >−</button>
                            <span className="text-[12px] text-white/60 w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-[white/[0.08]] text-white/60 hover:bg-[#E8732F] hover:text-white transition-colors flex items-center justify-center text-sm font-bold"
                            >+</button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-[#D4A574]/50 hover:text-red-500 transition-colors text-[11px] ml-1"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="px-6 py-4 border-t border-white/[0.08]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/60 text-sm">Sous-total</span>
                    <span className="text-white/60 text-sm">{total} DH</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/60 text-sm">Livraison</span>
                    <span className="text-[#5B7B5E] text-sm font-semibold">Gratuite</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.08] mt-3">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-[#E8732F] text-2xl font-extrabold">{total} DH</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-2 space-y-3">
                  <button
                    onClick={() => setView('checkout')}
                    className="w-full bg-[#E8732F] text-white py-4 rounded-full font-bold text-sm hover:bg-[#c45e22] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(196,98,45,0.25)]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Commander maintenant
                  </button>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { clearCart(); resetAndClose(); }}
                    className="w-full border border-[#25D366]/40 text-[#25D366] py-3.5 rounded-full font-semibold text-sm hover:border-[#25D366] transition-colors flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon />
                    Commander via WhatsApp
                  </a>
                  <button onClick={resetAndClose} className="w-full text-[#D4A574] text-sm py-2 hover:text-white/60 transition-colors">
                    Continuer vos achats
                  </button>
                </div>

                <div className="px-6 pb-4 text-center">
                  <p className="text-[10px] text-[#D4A574]/50">Livraison partout au Maroc • Paiement à la livraison</p>
                </div>
              </>
            )}
          </>
        )}

        {/* ════════════ CHECKOUT FORM ════════════ */}
        {view === 'checkout' && (
          <>
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('cart')} className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">Livraison</h3>
                  <p className="text-[12px] text-[#D4A574] mt-0.5">Total : <span className="text-[#E8732F] font-bold">{total} DH</span></p>
                </div>
              </div>
              <button onClick={resetAndClose} className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-white/60 hover:text-white transition-colors">✕</button>
            </div>

            <form onSubmit={handleCheckoutSubmit} noValidate className="p-6 space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <p className="text-red-600 text-[12px]">Erreur d&apos;envoi. Vérifiez votre connexion et réessayez.</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                    <UserIcon /> Nom *
                  </label>
                  <input
                    type="text"
                    value={form.nom}
                    onChange={e => updateField('nom', e.target.value)}
                    placeholder="Fatima Zahra"
                    className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.nom ? 'border-red-400 focus:ring-red-400/30' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
                  />
                  <FieldError msg={errors.nom} />
                </div>
                <div>
                  <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                    <PhoneIcon /> Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={form.telephone}
                    onChange={e => updateField('telephone', e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.telephone ? 'border-red-400 focus:ring-red-400/30' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
                  />
                  <FieldError msg={errors.telephone} />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                  <MapPinIcon /> Adresse *
                </label>
                <input
                  type="text"
                  value={form.adresse}
                  onChange={e => updateField('adresse', e.target.value)}
                  placeholder="Rue, quartier, numéro..."
                  className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.adresse ? 'border-red-400 focus:ring-red-400/30' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
                />
                <FieldError msg={errors.adresse} />
              </div>

              <div>
                <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                  <BuildingIcon /> Ville *
                </label>
                <input
                  type="text"
                  value={form.ville}
                  onChange={e => updateField('ville', e.target.value)}
                  placeholder="Casablanca, Rabat, Marrakech..."
                  className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.ville ? 'border-red-400 focus:ring-red-400/30' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
                />
                <FieldError msg={errors.ville} />
              </div>

              {/* Order summary */}
              <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 space-y-2">
                <p className="text-[10px] text-[#D4A574] uppercase tracking-wider font-bold mb-3">Récapitulatif</p>
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-[12px]">
                    <span className="text-white/60">{item.product.name} <span className="text-[#D4A574]">x{item.quantity}</span></span>
                    <span className="text-white/60">{item.product.price * item.quantity} DH</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.08] mt-2">
                  <span className="font-bold text-sm text-white">Total</span>
                  <span className="text-[#E8732F] font-extrabold text-lg">{total} DH</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#E8732F] hover:bg-[#c45e22] disabled:bg-[#E8732F]/50 text-white py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(196,98,45,0.25)]"
              >
                {submitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Envoi en cours...
                  </>
                ) : (
                  'Confirmer la commande'
                )}
              </button>

              <div className="bg-[#5B7B5E]/10 border border-[#5B7B5E]/20 rounded-xl p-3 text-center">
                <p className="text-white/60 text-[10px]">
                  Paiement à la livraison • Confirmation par appel sous <strong className="text-[#5B7B5E]">24h</strong>
                </p>
              </div>
            </form>
          </>
        )}

        {/* ════════════ SUCCESS VIEW ════════════ */}
        {view === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-[#5B7B5E]/15 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-[#5B7B5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold mb-2 font-serif text-white">Commande confirmée !</h3>
            {customerName && (
              <p className="text-white/60 text-sm mb-6">
                Merci <strong className="text-[#E8732F]">{customerName}</strong>, votre commande est enregistrée.
              </p>
            )}

            <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-5 text-left space-y-4 mb-6">
              {[
                { n: 1, title: 'Commande reçue', sub: 'Enregistrée dans notre système', active: true },
                { n: 2, title: 'Appel de confirmation sous 24h', sub: 'Notre équipe vous contacte pour confirmer', active: false },
                { n: 3, title: 'Livraison + Paiement à la livraison', sub: 'Vous payez quand vous recevez votre colis', active: false },
              ].map(step => (
                <div key={step.n} className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${step.active ? 'bg-[#E8732F] text-white' : 'bg-[#E8732F]/10 border border-[#E8732F]/30 text-[#E8732F]'}`}>{step.n}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{step.title}</p>
                    <p className="text-[#D4A574] text-[11px]">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={buildWhatsAppUrl(customerName)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 mb-3 hover:bg-[#1ebc59] transition-colors"
            >
              <WhatsAppIcon />
              Suivre sur WhatsApp (optionnel)
            </a>

            <button onClick={resetAndClose} className="w-full border border-white/[0.08] text-white/60 py-3 rounded-full text-sm hover:text-white hover:border-[#D4A574] transition-colors">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
