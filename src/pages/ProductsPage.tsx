import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../hooks/useCart';
import OrderModal from '../components/OrderModal';

export default function ProductsPage() {
  const [activecat, setActivecat] = useState('tous');
  const { openModal } = useCart();

  const filtered = activecat === 'tous'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activecat);

  return (
    <>
      <OrderModal />
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link to="/" className="text-[#D4A574] font-bold text-lg tracking-wide">
              DAKHLA <span className="text-white/60 font-normal text-sm">ARTISANAL</span>
            </Link>
            <button onClick={openModal}
              className="text-sm text-white/70 hover:text-white transition-colors">
              Panier
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-10">
          {/* SEO heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Produits Naturels Maroc — Dakhla Artisanal
            </h1>
            <p className="text-white/60 text-base">
              Cosmétiques bio, compléments alimentaires et soins naturels artisanaux du Maroc.
              Livraison partout au Maroc. Paiement à la livraison.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActivecat(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activecat === cat.key
                    ? 'bg-[#E8732F] text-white'
                    : 'bg-white/[0.07] text-white/60 hover:text-white hover:bg-white/[0.12]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <Link
                key={product.id}
                to={`/produit/${product.id}`}
                className="group bg-[#141414] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[#D4A574]/40 transition-all hover:shadow-[0_8px_30px_rgba(212,165,116,0.1)]"
              >
                <div className="aspect-square bg-[#1a1a1a] relative overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-[#E8732F]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-white/50 text-[11px] uppercase tracking-wider mb-0.5">{product.catLabel}</p>
                  <h2 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
                    {product.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#E8732F] font-bold text-base">{product.price} DH</span>
                      {product.oldPrice && (
                        <span className="text-white/30 text-xs line-through ml-1.5">{product.oldPrice} DH</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🚚', title: 'Livraison Maroc', sub: 'Partout au Maroc' },
              { icon: '💳', title: 'Paiement livraison', sub: 'Cash à la réception' },
              { icon: '🌿', title: '100% Naturel', sub: 'Sans produits chimiques' },
              { icon: '✅', title: 'Garantie satisfait', sub: 'Ou remboursé' },
            ].map(b => (
              <div key={b.title} className="bg-[#141414] rounded-xl p-4 border border-white/[0.06]">
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-white text-sm font-semibold">{b.title}</div>
                <div className="text-white/50 text-xs">{b.sub}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
