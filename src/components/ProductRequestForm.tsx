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
        <div className="w-12 h-12 rounded-full bg-[#6B8E5E]/20 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-[#6B8E5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-[#3D2B1F] font-bold text-[15px] mb-1">Demande reçue</div>
        <p className="text-[#7A5C45] text-[12px] leading-relaxed max-w-[280px] mx-auto">
          Le produit sera préparé pour vous — on vous contactera d&apos;abord pour connaître exactement votre besoin.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-4 text-[#B98A5A] text-[11px] hover:text-[#7A5C45] transition-colors">Fermer</button>
        )}
      </div>
    );
  }

  const field = (label: string, child: React.ReactNode, err?: string, required = true) => (
    <div>
      <label className="block text-[11px] text-[#7A5C45] uppercase tracking-[0.1em] mb-1.5 font-semibold">
        {label}{required && <span className="text-[#C4622D] ml-0.5">*</span>}
      </label>
      {child}
      {err && <p className="text-red-500 text-[10px] mt-1">{err}</p>}
    </div>
  );

  const inputCls = (err?: string) =>
    `w-full bg-[#FAF7F0] border ${err ? 'border-red-400' : 'border-[#E8D2AE]'} rounded-xl py-2.5 px-4 text-sm text-[#3D2B1F] placeholder:text-[#B98A5A]/50 focus:outline-none focus:border-[#C4622D] transition-all`;

  return (
    <form onSubmit={handleSubmit} className={compact ? 'p-4 space-y-3' : 'space-y-4'}>
      <div className={`text-center ${compact ? 'mb-3' : 'mb-5'}`}>
        <div className="text-[#3D2B1F] text-[13px] font-semibold mb-0.5">Ce produit n&apos;est pas encore dans notre catalogue</div>
        <p className="text-[#7A5C45] text-[11px]">Remplissez ce formulaire — on prépare votre commande sur mesure</p>
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
        className="w-full bg-[#C4622D] text-white py-3 rounded-xl text-[13px] font-bold hover:bg-[#A8501F] transition-colors disabled:opacity-50 shadow-[0_4px_16px_rgba(196,98,45,0.25)]">
        {loading ? 'Envoi...' : 'Envoyer ma demande'}
      </button>
    </form>
  );
}
