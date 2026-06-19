import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, WHATSAPP_NUMBER } from '../data/products';
import OrderForm from '../components/OrderForm';

/* ─── IMAGE GALLERY ─── */
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden bg-[#141414] border border-white/[0.04] aspect-square">
        <img src={images[active]} alt={productName} className="w-full h-full object-cover" loading="eager" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${active === i ? 'border-[#E8732F]' : 'border-white/10 hover:border-white/30'}`}>
              <img src={img} alt={`${productName} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="block">
          <div className="font-serif text-[22px] font-bold text-[#D4A574] tracking-[0.15em] leading-none">
            DAKHLA<span className="block text-[9px] text-[#D4A574]/50 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors hidden md:block">Accueil</Link>
          <Link to="/blog" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors hidden md:block">Blog</Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#d46726] transition-colors">WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouve</h1>
          <Link to="/" className="text-[#E8732F] hover:underline">Retour a l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  // Scroll to top when entering product page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const extraImages: Record<string, string[]> = {
    elixir: ['/images/elixir-1.jpg', '/images/elixir-2.jpg'],
    masque: ['/images/masque-1.jpg', '/images/masque-2.jpg'],
    biotin: ['/images/biotin-1.jpg', '/images/biotin-2.jpg'],
    huile: ['/images/huile-1.jpg', '/images/huile-2.jpg'],
    serumint: ['/images/serumintime-1.jpg', '/images/serumintime-2.jpg'],
    spray: ['/images/spray-1.jpg', '/images/spray-2.jpg'],
    floro: ['/images/floro-calm-3.jpg', '/images/floro-calm-4.jpg'],
    'floro-calm-complement': ['/images/floro-calm-pack-1.jpg', '/images/pack-floro-calm-2.jpg'],
    'pack-floro-calm': ['/images/pack-floro-calm-1.jpg', '/images/pack-floro-calm-2.jpg'],
    serum: ['/images/serum-1.jpg'],
    'shampoing-proteines': ['/images/shampoing-proteines-3.jpg', '/images/shampoing-proteines-4.jpg'],
    'pack-duo-cheveux': ['/images/pack-duo-1.jpg', '/images/pack-duo-2.jpg'],
    'pack-anti-gris': ['/images/pack-anti-gris.jpg'],
    'pack-feminite': ['/images/pack-feminite.jpg'],
    'pack-anti-chute': ['/images/pack-anti-chute.jpg'],
    'vitamin-c-spirulina': ['/images/vitamin-c-3.jpg', '/images/vitamin-c-4.jpg'],
    eclarte: ['/images/eclarte-3.jpg', '/images/eclarte-4.jpg'],
    rawnaq: ['/images/rawnaq-3.jpg', '/images/rawnaq-4.jpg'],
    'v-eclat': ['/images/v-eclat-3.jpg', '/images/v-eclat-4.jpg'],
    psoriasis: ['/images/psoriasis-3.jpg', '/images/psoriasis-4.jpg'],
    'elixir-maca': ['/images/elixir-maca-3.jpg', '/images/elixir-maca-4.jpg'],
    blush: ['/images/blush-3.jpg', '/images/blush-4.jpg'],
    'cycle-bio': ['/images/cycle-bio-3.jpg', '/images/cycle-bio-4.jpg'],
    'bio-eclat': ['/images/bio-eclat-3.jpg', '/images/bio-eclat-4.jpg'],
    'retinol-pack': ['/images/retinol-pack-1.jpg', '/images/retinol-pack-2.jpg'],
    tranquilysse: ['/images/tranquilysse-3.jpg', '/images/tranquilysse-4.jpg'],
    hemorcalm: ['/images/hemorcalm-3.jpg', '/images/hemorcalm-4.jpg'],
    'eclat-artisan': ['/images/eclat-artisan-3.jpg', '/images/eclat-artisan-4.jpg'],
    loubane: ['/images/loubane-3.jpg', '/images/loubane-4.jpg'],
  };
  const galleryImages = extraImages[product.id] || [product.img];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-5">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 text-[12px] text-white/30">
          <Link to="/" className="hover:text-[#E8732F] transition-colors">Accueil</Link>
          <span>/</span>
          <a href="/#produits" className="hover:text-[#E8732F] transition-colors">Produits</a>
          <span>/</span>
          <span className="text-white/50">{product.name}</span>
        </div>
      </div>

      {/* Product Hero + Order Form — side by side on desktop */}
      <section className="px-5 pb-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left — Images */}
          <div className="lg:col-span-3">
            <ImageGallery images={galleryImages} productName={product.name} />
          </div>

          {/* Right — Info + Form (sticky on desktop) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Product Info */}
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="text-[9px] bg-[#E8732F] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-[0.05em]">{product.badge}</span>
                  <span className="text-[9px] bg-white/5 text-white/40 px-2.5 py-0.5 rounded-full uppercase tracking-[0.05em]">{product.catLabel}</span>
                </div>

                <h1 className="text-[clamp(22px,3vw,32px)] font-extrabold leading-tight mb-1">{product.name}</h1>
                <p className="text-white/30 text-xs mb-3" dir="rtl">{product.nameAr}</p>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#E8732F] text-2xl font-extrabold">{product.price} DH</span>
                  {product.oldPrice && <span className="text-white/20 text-base line-through">{product.oldPrice} DH</span>}
                  <span className="bg-[#5B7B5E]/15 text-[#5B7B5E] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Paiement a la livraison
                  </span>
                </div>

                {/* Compact benefits */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                  {product.benefits.slice(0, 3).map((b, i) => (
                    <span key={i} className="text-white/50 text-[11px] flex items-center gap-1">
                      <span className="text-[#E8732F]">✓</span> {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order Form — compact */}
              <OrderForm product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients & Usage */}
      <section className="py-10 px-5 bg-[#080808]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-[#141414] border border-white/[0.04] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3 text-[#E8732F]">Ingredients</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-3">{product.ingredients}</p>
            <p className="text-white/30 text-sm leading-relaxed" dir="rtl">{product.ingredientsAr}</p>
          </div>
          <div className="bg-[#141414] border border-white/[0.04] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3 text-[#E8732F]">Mode d&apos;emploi</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-3">{product.usage}</p>
            <p className="text-white/30 text-sm leading-relaxed" dir="rtl">{product.usageAr}</p>
          </div>
        </div>
      </section>

      {/* Description FR/AR */}
      <section className="py-10 px-5">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">{product.description}</p>
          <p className="text-white/40 text-sm leading-relaxed" dir="rtl">{product.descriptionAr}</p>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 px-5 bg-[#080808]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-8">Produits <em className="text-[#E8732F] not-italic">similaires</em></h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/produit/${p.id}`} className="group bg-[#141414] border border-white/[0.04] rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/20 block">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold mb-2 group-hover:text-[#E8732F] transition-colors">{p.name}</h3>
                    <span className="text-[#E8732F] font-extrabold">{p.price} DH</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/[0.03] pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/10 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
          <p className="text-white/10 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
        </div>
      </footer>
    </div>
  );
}
