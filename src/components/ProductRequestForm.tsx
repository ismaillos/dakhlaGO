import { useState } from 'react';
import { submitOrder } from '../lib/api';

interface Props {
  query: string;
  onClose?: () => void;
  compact?: boolean;
}

type Step = 'form' | 'success';

export default function ProductRequestForm({ query, onClose, compact = false }: Props) {
  const [step, setStep] = useState<Step>('form');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [produit, setProduit] = useState(query);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nom.trim()) e.nom = 'Nom requis';
    if (!/^[\d\s+]{8,15}$/.test(telephone.trim())) e.telephone = 'Numéro invalide';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide';
    if (!produit.trim()) e.produit = 'Décrivez le produit';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await submitOrder({
      type: 'demande',
      nom: nom.trim(),
      telephone: telephone.trim(),
      email: email.trim(),
      produit_demande: produit.trim(),
    });
    setLoading(false);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className={`text-center ${compact ? 'py-4' : 'py-8'}`}>
        <div className="w-12 h-12 rounded-full bg-[#5B7B5E]/20 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-[#5B7B5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-white font-bold text-[15px] mb-1">Demande reçue</div>
        <p className="text-white/40 text-[12px] leading-relaxed max-w-[280px] mx-auto">
          Le produit sera préparé pour vous — on vous contactera d&apos;abord pour connaître exactement votre besoin.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-4 text-white/30 text-[11px] hover:text-white/60 transition-colors">Fermer</button>
        )}
      </div>
    );
  }

  const field = (label: string, child: React.ReactNode, err?: string, required = true) => (
    <div>
      <label className="block text-[11px] text-white/40 uppercase tracking-[0.1em] mb-1.5 font-semibold">
        {label}{required && <span className="text-[#E8732F] ml-0.5">*</span>}
      </label>
      {child}
      {err && <p className="text-red-400 text-[10px] mt-1">{err}</p>}
    </div>
  );

  const inputCls = (err?: string) =>
    `w-full bg-white/[0.05] border ${err ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8732F]/50 transition-all`;

  return (
    <form onSubmit={handleSubmit} className={compact ? 'p-4 space-y-3' : 'space-y-4'}>
      <div className={`text-center ${compact ? 'mb-3' : 'mb-5'}`}>
        <div className="text-white/60 text-[13px] font-semibold mb-0.5">Ce produit n&apos;est pas encore dans notre catalogue</div>
        <p className="text-white/25 text-[11px]">Remplissez ce formulaire — on prépare votre commande sur mesure</p>
      </div>

      <div className={compact ? 'grid grid-cols-2 gap-3' : 'grid md:grid-cols-2 gap-4'}>
        {field('Votre nom', (
          <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Prénom Nom" className={inputCls(errors.nom)} />
        ), errors.nom)}
        {field('Téléphone', (
          <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+212 6XX XXX XXX" className={inputCls(errors.telephone)} type="tel" />
        ), errors.telephone)}
      </div>

      {field('Email', (
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className={inputCls(errors.email)} type="email" />
      ), errors.email, false)}

      {field('Produit souhaité', (
        <textarea value={produit} onChange={e => setProduit(e.target.value)} rows={compact ? 2 : 3}
          placeholder="Décrivez le produit que vous cherchez..."
          className={`${inputCls(errors.produit)} resize-none`} />
      ), errors.produit)}

      <button type="submit" disabled={loading}
        className="w-full bg-[#E8732F] text-white py-3 rounded-xl text-[13px] font-bold hover:bg-[#d46726] transition-colors disabled:opacity-50 shadow-[0_4px_16px_rgba(232,115,47,0.25)]">
        {loading ? 'Envoi...' : 'Envoyer ma demande'}
      </button>
    </form>
  );
}
