import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, WHATSAPP_NUMBER } from '../data/products';
import OrderForm from '../components/OrderForm';
import { useLang } from '../hooks/useLanguage';
import { useSEO } from '../hooks/useSEO';
import { LANGS } from '../i18n/translations';

/* ─── IMAGE GALLERY ─── */
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden bg-[#141414] border border-white/[0.08] aspect-square">
        <img src={images[active]} alt={productName} className="w-full h-full object-cover" loading="eager" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${active === i ? 'border-[#E8732F]' : 'border-white/[0.08] hover:border-[#D4A574]'}`}>
              <img src={img} alt={`${productName} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── LANG SWITCHER ─── */
function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-[13px] font-medium px-2 py-1 rounded-lg">
        <span>{current.flag}</span>
        <span className="uppercase text-[11px] font-bold tracking-wide">{current.code}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-[#2A1C0A] border border-[#F0C060]/[0.15] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-50 min-w-[130px]">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors text-left ${l.code === lang ? 'bg-[#E8732F]/15 text-[#E8732F]' : 'text-white/70 hover:bg-white/[0.07] hover:text-white'}`}>
              <span className="text-base">{l.flag}</span>
              <span className="font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const { t } = useLang();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="block">
          <div className="font-serif text-[22px] font-bold text-[#D4A574] tracking-[0.15em] leading-none">
            DAKHLA<span className="block text-[9px] text-[#D4A574]/60 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors hidden md:block">{t.productPage.home}</Link>
          <Link to="/blog" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors hidden md:block">{t.blogPage.blog}</Link>
          <a href="https://web.facebook.com/Dakhlaartisanal" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="text-white/60 hover:text-[#1877F2] transition-colors hidden md:block">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/dakhlaartisanal1" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="text-white/60 hover:text-[#E1306C] transition-colors hidden md:block">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#c45e22] transition-colors">WhatsApp</a>
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}

function ToutiaVideoBlock() {
  const [playing, setPlaying] = useState(false);
  const { t, lang } = useLang();
  return (
    <div className="bg-[#1a0a00] border border-[#E8732F]/30 rounded-2xl overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="w-full flex items-center gap-3 p-4 hover:border-[#E8732F]/70 transition-all group text-left"
        >
          <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(220,38,38,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-0.5">{t.productPage.videoTag}</div>
            <div className="text-white text-sm font-bold leading-tight">{t.productPage.videoTitle}</div>
            <div className="text-white/40 text-[11px] mt-0.5">{t.productPage.videoSub}</div>
          </div>
        </button>
      ) : (
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/EutvbCmyLZw?start=134&autoplay=1&rel=0&modestbranding=1"
            title="Experts sur la Toutia"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useLang();


  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.productPage.notFound}</h1>
          <Link to="/" className="text-[#E8732F] hover:underline">{t.productPage.backHome}</Link>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  const productName = lang === 'ar' && product.nameAr ? product.nameAr : product.name;
  const productDesc = lang === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;
  useSEO({
    title: productName,
    description: productDesc.slice(0, 155).replace(/\n/g, ' '),
    url: `/produit/${product.id}`,
    image: product.img,
    lang,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Meta SEO dynamique
    const isToutia = product.id === 'toutia';
    document.title = isToutia
      ? 'Toutia Ismailiya — Pierre Minérale Déodorant Naturel Maroc | Dakhla Artisanal'
      : `${product.name} — ${product.hook.slice(0, 60)} | Dakhla Artisanal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', isToutia
      ? 'Toutia Ismailiya par Dakhla Artisanal — Pierre minérale 100% naturelle du Sahara Marocain. Déodorant ancestral sans aluminium, anti-bactérien, anti-mycoses. Livraison Maroc. 169 MAD.'
      : product.description.slice(0, 155).replace(/\n/g, ' ') + '…'
    );

    // Schema.org Product
    const existing = document.getElementById('schema-product');
    if (existing) existing.remove();
    const schema = document.createElement('script');
    schema.id = 'schema-product';
    schema.type = 'application/ld+json';

    const productSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description.slice(0, 200).replace(/\n/g, ' '),
      image: `https://www.dakhlaartisanal.com${product.img}`,
      brand: { '@type': 'Brand', name: 'Dakhla Artisanal', url: 'https://www.dakhlaartisanal.com' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'MAD',
        price: product.price,
        availability: 'https://schema.org/InStock',
        url: `https://www.dakhlaartisanal.com/#/produit/${product.id}`,
        seller: { '@type': 'Organization', name: 'Dakhla Artisanal', url: 'https://www.dakhlaartisanal.com' },
        shippingDetails: { '@type': 'OfferShippingDetails', shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'MA' } },
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '247', bestRating: '5' },
    };

    if (isToutia) {
      productSchema['@type'] = ['Product'];
      productSchema.additionalType = 'https://schema.org/Product';
      productSchema.material = 'Pierre minérale naturelle — potassium';
      productSchema.countryOfOrigin = { '@type': 'Country', name: 'Maroc' };
      productSchema.keywords = 'toutia, toutia ismailiya, pierre toutia, toutia maroc, déodorant naturel maroc, pierre minérale déodorant, alun maroc, توتيا, التوتية الإسماعيلية';
    }

    const schemas: any[] = [productSchema];

    if (isToutia) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'C\'est quoi la Toutia Ismailiya ?',
            acceptedAnswer: { '@type': 'Answer', text: 'La Toutia Ismailiya est une pierre minérale 100% naturelle, composée de potassium, extraite des montagnes du Sud-Est du Maroc (Sahara Marocain). Ce n\'est PAS une plante — c\'est une pierre minérale aux propriétés astringentes, anti-bactériennes et purifiantes, utilisée depuis l\'Antiquité comme déodorant naturel. Vendue exclusivement par Dakhla Artisanal.' },
          },
          {
            '@type': 'Question',
            name: 'La Toutia est-elle une pierre ou une plante ?',
            acceptedAnswer: { '@type': 'Answer', text: 'La Toutia Ismailiya est une PIERRE MINÉRALE naturelle — pas une plante. C\'est un cristal minéral composé de potassium, extrait des montagnes du Sahara Marocain. Elle se présente sous forme de poudre fine ou de pierre brute.' },
          },
          {
            '@type': 'Question',
            name: 'Où acheter la Toutia Ismailiya au Maroc ?',
            acceptedAnswer: { '@type': 'Answer', text: 'La Toutia Ismailiya authentique est disponible sur dakhlaartisanal.com — Livraison partout au Maroc, paiement à la livraison. Prix : 169 MAD. Marque : Dakhla Artisanal.' },
          },
          {
            '@type': 'Question',
            name: 'Comment utiliser la Toutia Ismailiya comme déodorant ?',
            acceptedAnswer: { '@type': 'Answer', text: 'Prenez une pincée de poudre de Toutia Ismailiya et appliquez-la directement sous les aisselles ou sur la zone à traiter. Ne pas mouiller — c\'est une poudre sèche. Un pot dure environ 1 mois.' },
          },
          {
            '@type': 'Question',
            name: 'La Toutia Ismailiya contient-elle de l\'aluminium ?',
            acceptedAnswer: { '@type': 'Answer', text: 'Non. La Toutia Ismailiya de Dakhla Artisanal est 100% sans aluminium. Elle est composée uniquement de potassium naturel extrait des montagnes marocaines. Contrairement aux anti-transpirants classiques, elle ne bloque pas les pores mais neutralise les bactéries responsables des odeurs.' },
          },
          {
            '@type': 'Question',
            name: 'La Toutia est-elle efficace contre les mycoses des pieds ?',
            acceptedAnswer: { '@type': 'Answer', text: 'Oui. La Toutia Ismailiya est anti-fongique naturelle. Appliquez la poudre entre les orteils pour lutter efficacement contre les mycoses et les démangeaisons.' },
          },
        ],
      });

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Comment utiliser la Toutia Ismailiya',
        description: 'Guide d\'utilisation de la pierre minérale Toutia Ismailiya comme déodorant naturel',
        supply: [{ '@type': 'HowToSupply', name: 'Toutia Ismailiya en poudre — Dakhla Artisanal' }],
        step: [
          { '@type': 'HowToStep', name: 'Préparer', text: 'Assurez-vous que la zone est propre et sèche avant l\'application.' },
          { '@type': 'HowToStep', name: 'Appliquer', text: 'Prenez une petite pincée de poudre de Toutia Ismailiya (comme une pincée de sel).' },
          { '@type': 'HowToStep', name: 'Frotter', text: 'Frottez doucement la poudre sous les aisselles ou sur la zone concernée. Ne pas mouiller.' },
          { '@type': 'HowToStep', name: 'Résultat', text: 'Fraîcheur garantie toute la journée, sans traces blanches, sans aluminium.' },
        ],
      });
    }

    schema.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    document.head.appendChild(schema);
    // Meta Pixel ViewContent — setTimeout ensures fbq is ready after React render
    const fbqTimer = setTimeout(() => {
      try {
        (window as any).fbq('track', 'ViewContent', {
          content_name: product.name,
          content_ids: [product.id],
          content_type: 'product',
          value: product.price,
          currency: 'MAD',
        });
      } catch (_) {}
    }, 300);
    return () => { schema.remove(); clearTimeout(fbqTimer); };
  }, [id, product]);

  const extraImages: Record<string, string[]> = {
    elixir: ['/images/elixir-1.jpg', '/images/elixir-2.jpg'],
    masque: ['/images/masque-1.jpg', '/images/masque-2.jpg'],
    biotin: ['/images/biotin-1.jpg', '/images/biotin-2.jpg'],
    huile: ['/images/huile-1.jpg', '/images/huile-2.jpg'],
    serumint: ['/images/serumintime-1.jpg', '/images/serumintime-2.jpg'],
    spray: ['/images/spray-1.jpg', '/images/spray-2.jpg'],
    floro: ['/images/floro-calm-3.jpg', '/images/floro-calm-4.jpg'],
    'floro-calm-huile': ['/images/floro-calm-1.jpg', '/images/floro-calm-2.jpg'],
    'pack-floro-calm': ['/images/floro-calm-pack-1.jpg'],
    serum: ['/images/serum-1.jpg'],
    'shampoing-proteines': ['/images/shampoing-proteines-3.jpg', '/images/shampoing-proteines-4.jpg'],
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

  const isAr = lang === 'ar';
  const displayName = isAr && product.nameAr ? product.nameAr : product.name;
  const displayIngredients = isAr && product.ingredientsAr ? product.ingredientsAr : product.ingredients;
  const displayUsage = isAr && product.usageAr ? product.usageAr : product.usage;
  const displayDescription = isAr && product.descriptionAr ? product.descriptionAr : product.description;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-5">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 text-[12px] text-[#D4A574]">
          <Link to="/" className="hover:text-[#E8732F] transition-colors">{t.productPage.home}</Link>
          <span>/</span>
          <a href="/#produits" className="hover:text-[#E8732F] transition-colors">{t.productPage.products}</a>
          <span>/</span>
          <span className="text-white/60">{displayName}</span>
        </div>
      </div>

      {/* Product Hero + Order Form */}
      <section className="px-5 pb-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-3">
            <ImageGallery images={galleryImages} productName={displayName} />
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="text-[9px] bg-[#E8732F] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-[0.05em]">{product.badge}</span>
                  <span className="text-[9px] bg-[#141414] text-white/60 px-2.5 py-0.5 rounded-full uppercase tracking-[0.05em] border border-white/[0.08]">{product.catLabel}</span>
                </div>

                <h1 className="text-[clamp(22px,3vw,32px)] font-extrabold leading-tight mb-1 font-serif text-white" dir={isAr ? 'rtl' : 'ltr'}>{displayName}</h1>
                {!isAr && product.nameAr && (
                  <p className="text-[#D4A574] text-xs mb-3" dir="rtl">{product.nameAr}</p>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#E8732F] text-2xl font-extrabold">{product.price} DH</span>
                  {product.oldPrice && <span className="text-[#D4A574]/50 text-base line-through">{product.oldPrice} DH</span>}
                  <span className="bg-[#5B7B5E]/15 text-[#5B7B5E] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {t.productPage.payDelivery}
                  </span>
                </div>

                {/* Trust badges inline */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[t.productPage.badge1, t.productPage.badge2, t.productPage.badge3].map(b => (
                    <span key={b} className="text-[10px] bg-[#141414] border border-white/[0.08] text-white/60 px-2.5 py-1 rounded-full font-medium">{b}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                  {product.benefits.slice(0, 3).map((b, i) => (
                    <span key={i} className="text-white/60 text-[11px] flex items-center gap-1">
                      <span className="text-[#E8732F]">✓</span> {b}
                    </span>
                  ))}
                </div>
              </div>

              {product.id === 'toutia' && (
                <ToutiaVideoBlock />
              )}

              <OrderForm product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients & Usage */}
      <section className="py-10 px-5 bg-[#141414]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3 text-[#E8732F] font-serif">{t.productPage.ingredients}</h2>
            <p className="text-white/60 text-sm leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>{displayIngredients}</p>
          </div>
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3 text-[#E8732F] font-serif">{t.productPage.usage}</h2>
            <p className="text-white/60 text-sm leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>{displayUsage}</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 px-5 bg-[#0A0A0A]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-xl font-bold mb-3 font-serif text-white">{t.productPage.description}</h2>
          <p className="text-white/60 text-sm leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>{displayDescription}</p>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 px-5 bg-[#141414]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-8 font-serif text-white">{t.productPage.related} <em className="text-[#E8732F] not-italic">{t.productPage.relatedEm}</em></h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/produit/${p.id}`} className="group bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/30 hover:shadow-[0_8px_24px_rgba(61,43,31,0.10)] block">
                  <div className="aspect-[3/4] overflow-hidden bg-[#141414]">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold mb-2 text-white group-hover:text-[#E8732F] transition-colors">{p.name}</h3>
                    <span className="text-[#E8732F] font-extrabold">{p.price} DH</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/[0.08]/10 pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/15 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
          <p className="text-white/15 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
        </div>
      </footer>
    </div>
  );
}
