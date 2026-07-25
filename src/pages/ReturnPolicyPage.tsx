import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ReturnPolicyPage() {
  useEffect(() => {
    document.title = 'Politique de Retour — Dakhla Artisanal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link to="/" className="text-[#D4A574] text-sm hover:underline mb-8 inline-block">← Retour à l'accueil</Link>

        <h1 className="text-3xl font-bold font-serif mb-2">Politique de Retour</h1>
        <p className="text-white/40 text-sm mb-10">Dakhla Artisanal — dakhlaartisanal.com</p>

        <div className="space-y-8 text-white/80 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Fenêtre de retour</h2>
            <p>Vous disposez de <strong className="text-white">7 jours</strong> à compter de la date de réception pour retourner un produit.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Conditions de retour</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Le produit doit être dans son état d'origine, non ouvert et non utilisé.</li>
              <li>L'emballage doit être intact.</li>
              <li>Un justificatif d'achat (numéro de commande ou confirmation) est requis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Produits échangeables</h2>
            <p>Nous acceptons les retours pour produits défectueux et non défectueux. Les échanges sont également acceptés sous réserve de disponibilité.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Frais de retour</h2>
            <p>Les frais de retour sont <strong className="text-white">gratuits</strong> pour les produits défectueux ou endommagés à la livraison. Pour tout autre retour, les frais de renvoi sont à la charge du client.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Remboursement</h2>
            <p>Après réception et vérification du produit retourné, le remboursement sera effectué dans un délai de <strong className="text-white">5 à 7 jours ouvrables</strong>.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Comment initier un retour</h2>
            <p>Contactez-nous via WhatsApp au <strong className="text-white">+212 677 031 561</strong> en indiquant votre numéro de commande et la raison du retour. Notre équipe vous guidera dans la procédure.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Exceptions</h2>
            <p>Les compléments alimentaires ouverts, les produits cosmétiques descellés utilisés, et les produits en promotion finale ne sont pas éligibles au retour pour des raisons d'hygiène.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.08] text-center">
          <p className="text-white/30 text-xs">Dakhla Artisanal · Dakhla, Maroc · +212 677 031 561</p>
        </div>
      </div>
    </div>
  );
}
