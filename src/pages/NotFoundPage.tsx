import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <div className="text-[120px] font-extrabold text-white/5 leading-none select-none">404</div>
        <div className="text-6xl -mt-8 mb-4">🌿</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page introuvable</h1>
        <p className="text-white/40 text-sm max-w-sm">
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour découvrir nos produits naturels.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="bg-[#E8732F] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#d46726] transition-colors"
        >
          Retour à l'accueil
        </Link>
        <Link
          to="/blog"
          className="border border-white/15 text-white/60 px-6 py-3 rounded-full font-semibold text-sm hover:border-[#E8732F] hover:text-[#E8732F] transition-colors"
        >
          Lire notre blog
        </Link>
      </div>
      <p className="text-white/20 text-xs mt-8">Dakhla Artisanal — Produits naturels du Maroc</p>
    </div>
  );
}
