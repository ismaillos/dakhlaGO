import { useState } from 'react';
import { z } from 'zod';
import type { Product } from '../data/products';
import { submitOrder } from '../lib/api';

interface OrderFormProps {
  product: Product;
}

const orderSchema = z.object({
  nom: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  telephone: z
    .string()
    .regex(
      /^(0[5-7]\d{8}|\+212[5-7]\d{8}|00212[5-7]\d{8})$/,
      'Numéro marocain invalide (ex: 0612345678)',
    ),
  adresse: z.string().min(5, 'Adresse trop courte (minimum 5 caractères)'),
  ville: z.string().min(2, 'Ville requise'),
});

type FormErrors = Partial<Record<'nom' | 'telephone' | 'adresse' | 'ville', string>>;

/* ─── Icons ─── */
const UserIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const PhoneIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
const MapPinIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const BuildingIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
const CheckCircleIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClockIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TruckIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-[10px] mt-1">{msg}</p>;
}

export default function OrderForm({ product }: OrderFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    adresse: '',
    ville: '',
    quantite: '1',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isToutia = product.id === 'toutia';
  const quantiteOptions = isToutia
    ? [
        { value: '1', label: '1x', price: 169 },
        { value: '2', label: '2x', price: 199, saving: 'Economisez 139 DH' },
        { value: '3', label: '3x', price: 269, saving: 'Economisez 238 DH', popular: true },
        { value: '5', label: '5x', price: 379, saving: 'Economisez 466 DH' },
      ]
    : [
        { value: '1', label: '1x', price: product.price },
        { value: '2', label: '2x', price: product.price * 2 - 20, saving: 'Economisez 20 DH' },
        { value: '3', label: '3x', price: product.price * 3 - 50, saving: 'Economisez 50 DH', popular: true },
        { value: '5', label: '5x', price: product.price * 5 - 100, saving: 'Economisez 100 DH' },
      ];

  const selectedOption = quantiteOptions.find(q => q.value === formData.quantite) ?? quantiteOptions[0];

  const update = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = orderSchema.safeParse({
      nom: formData.nom,
      telephone: formData.telephone,
      adresse: formData.adresse,
      ville: formData.ville,
    });

    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('loading');

    const ok = await submitOrder({
      type: 'single',
      nom: formData.nom,
      telephone: formData.telephone,
      adresse: formData.adresse,
      ville: formData.ville,
      produit: product.name,
      quantite: selectedOption.label,
      prix: `${selectedOption.price} DH`,
    });

    if (ok) {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: selectedOption.price,
          currency: 'MAD',
          content_name: product.name,
          content_type: 'product',
        });
      }
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#141414] gold-border rounded-2xl p-6 text-center shadow-[0_4px_16px_rgba(61,43,31,0.08)]">
        <div className="w-16 h-16 bg-[#5B7B5E]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#5B7B5E]">
          <CheckCircleIcon />
        </div>
        <h3 className="text-lg font-bold mb-2 text-white font-serif">Commande enregistrée !</h3>
        <p className="text-white/60 text-sm mb-4">
          Merci <strong className="text-[#E8732F]">{formData.nom}</strong>, votre commande est bien reçue.
        </p>

        <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 text-left space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-[#E8732F] rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">1</span>
            <div>
              <p className="text-white text-xs font-semibold">Commande reçue</p>
              <p className="text-[#D4A574] text-[10px]">Enregistrée dans notre système</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-[#E8732F]/15 border border-[#E8732F]/30 rounded-full flex items-center justify-center text-[#E8732F] text-[10px] font-bold flex-shrink-0">2</span>
            <div>
              <p className="text-white text-xs font-semibold">Appel de confirmation sous 24h</p>
              <p className="text-[#D4A574] text-[10px]">Sur votre numéro : <strong className="text-white/60">{formData.telephone}</strong></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-[#E8732F]/15 border border-[#E8732F]/30 rounded-full flex items-center justify-center text-[#E8732F] text-[10px] font-bold flex-shrink-0">3</span>
            <div>
              <p className="text-white text-xs font-semibold">Livraison + Paiement</p>
              <p className="text-[#D4A574] text-[10px]">Vous payez quand vous recevez votre colis</p>
            </div>
          </div>
        </div>

        <p className="text-[#D4A574] text-[10px] mt-4">
          Questions ? WhatsApp : +212 677 031 561
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-[#141414] gold-border rounded-2xl p-6 text-center shadow-[0_4px_16px_rgba(61,43,31,0.08)]">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">Erreur d&apos;envoi</h3>
        <p className="text-white/60 text-sm mb-4">
          Votre commande n&apos;a pas pu être enregistrée. Veuillez réessayer ou nous contacter directement.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-[#E8732F] text-white py-3 rounded-full font-bold text-sm hover:bg-[#c45e22] transition-colors"
          >
            Réessayer
          </button>
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? '212677031561'}?text=${encodeURIComponent(`Bonjour, je souhaite commander ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-[#25D366] text-[#25D366] py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2"
          >
            Commander via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] gold-border rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(61,43,31,0.08)]">
      {/* ─── HEADER ─── */}
      <div className="bg-gradient-to-r from-[#E8732F] to-[#c45e22] px-4 py-3 flex items-center justify-center gap-2">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <span className="text-white text-[11px] font-bold uppercase tracking-wider">
          Plus de quantité = Prix diminué
        </span>
      </div>

      <div className="p-5">
        {/* ─── QUANTITY SELECTOR ─── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-[11px] text-white/60 uppercase tracking-[0.1em] font-bold">Choisir votre offre</label>
            <span className="inline-flex items-center gap-1 bg-[#5B7B5E]/15 text-[#5B7B5E] text-[10px] font-bold px-2.5 py-1 rounded-full">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Paiement à la livraison
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quantiteOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('quantite', opt.value)}
                className={`relative py-2.5 px-1 rounded-xl text-center transition-all ${
                  formData.quantite === opt.value
                    ? 'bg-[#E8732F] text-white shadow-[0_4px_12px_rgba(196,98,45,0.25)]'
                    : 'bg-[#0A0A0A] border border-white/[0.08] text-white/60 hover:bg-[#141414]'
                }`}
              >
                {opt.popular && formData.quantite !== opt.value && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#E8732F] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    TOP
                  </span>
                )}
                <span className="text-sm font-bold block">{opt.label}</span>
                <span className={`block text-[10px] mt-0.5 ${formData.quantite === opt.value ? 'text-white/80' : 'text-[#D4A574]'}`}>
                  {opt.price} DH
                </span>
                {opt.saving && (
                  <span className={`block text-[8px] mt-0.5 ${formData.quantite === opt.value ? 'text-white/70' : 'text-[#5B7B5E]'}`}>
                    {opt.saving}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── FORM HEADER ─── */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-[#E8732F]/10 rounded-lg flex items-center justify-center text-[#E8732F]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <span className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">Infos de livraison</span>
          <div className="flex-1 h-px bg-[white/[0.08]]" />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* ─── NOM + TELEPHONE ─── */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                <UserIcon /> Nom complet *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={e => update('nom', e.target.value)}
                placeholder="Ex: Fatima Zahra"
                className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.nom ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
              />
              <FieldError msg={errors.nom} />
            </div>
            <div>
              <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                <PhoneIcon /> Téléphone *
              </label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={e => update('telephone', e.target.value)}
                placeholder="06 XX XX XX XX"
                className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.telephone ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
              />
              <FieldError msg={errors.telephone} />
            </div>
          </div>

          {/* ─── ADRESSE ─── */}
          <div className="mb-3">
            <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
              <MapPinIcon /> Adresse de livraison *
            </label>
            <input
              type="text"
              value={formData.adresse}
              onChange={e => update('adresse', e.target.value)}
              placeholder="Rue, quartier, numéro d'immeuble, étage..."
              className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.adresse ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
            />
            <FieldError msg={errors.adresse} />
          </div>

          {/* ─── VILLE ─── */}
          <div className="mb-5">
            <label className="text-[10px] text-[#E8732F] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
              <BuildingIcon /> Ville *
            </label>
            <input
              type="text"
              value={formData.ville}
              onChange={e => update('ville', e.target.value)}
              placeholder="Casablanca, Rabat, Marrakech, Fès..."
              className={`w-full bg-[#0A0A0A] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder:text-[#D4A574]/50 focus:ring-1 focus:outline-none transition-all ${errors.ville ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-[#E8732F] focus:ring-[#E8732F]/20'}`}
            />
            <FieldError msg={errors.ville} />
          </div>

          {/* ─── TOTAL + CTA ─── */}
          <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[#D4A574] text-[10px] uppercase tracking-wider font-semibold mb-0.5">Total à payer</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#E8732F] text-3xl font-extrabold">{selectedOption.price} <span className="text-sm">DH</span></span>
                  {product.oldPrice && (
                    <span className="text-[#D4A574]/40 text-sm line-through">{product.oldPrice} DH</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="bg-[#5B7B5E]/15 text-[#5B7B5E] text-[9px] font-bold px-2 py-1 rounded-full block mb-1">
                  Paiement à la livraison
                </span>
                <span className="text-[#D4A574] text-[9px]">{selectedOption.label} — {product.name}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#E8732F] hover:bg-[#c45e22] disabled:bg-[#E8732F]/50 disabled:cursor-not-allowed text-white py-4 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(196,98,45,0.25)] active:scale-[0.98]"
            >
              {status === 'loading' ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <CheckCircleIcon />
                  Confirmer ma commande
                </>
              )}
            </button>
          </div>

          {/* ─── PROCESS STEPS ─── */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-[#E8732F]">
              <div className="w-5 h-5 rounded-full bg-[#E8732F]/10 flex items-center justify-center">
                <CheckCircleIcon />
              </div>
              <span className="text-[#D4A574] text-[9px]">Commande</span>
            </div>
            <div className="w-4 h-px bg-[white/[0.08]]" />
            <div className="flex items-center gap-1.5 text-[#E8732F]">
              <div className="w-5 h-5 rounded-full bg-[#E8732F]/10 flex items-center justify-center">
                <ClockIcon />
              </div>
              <span className="text-[#D4A574] text-[9px]">Appel 24h</span>
            </div>
            <div className="w-4 h-px bg-[white/[0.08]]" />
            <div className="flex items-center gap-1.5 text-[#E8732F]">
              <div className="w-5 h-5 rounded-full bg-[#E8732F]/10 flex items-center justify-center">
                <TruckIcon />
              </div>
              <span className="text-[#D4A574] text-[9px]">Livraison</span>
            </div>
          </div>

          {/* ─── NOTE ─── */}
          <div className="bg-[#E8732F]/5 border border-[#E8732F]/15 rounded-xl p-3 text-center">
            <p className="text-white/60 text-[10px] leading-relaxed">
              Notre service client vous contactera sous <strong className="text-[#E8732F]">24 heures</strong> par téléphone ou WhatsApp pour confirmer votre commande.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
