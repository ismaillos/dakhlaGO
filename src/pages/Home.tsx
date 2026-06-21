import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, WHATSAPP_NUMBER } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { BLOG_ARTICLES } from '../data/blog';
import { useCart } from '../hooks/useCart';
import OrderModal from '../components/OrderModal';

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openModal } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="block">
          <div className="font-serif text-[22px] font-bold text-[#D4A574] tracking-[0.15em] leading-none">
            DAKHLA
            <span className="block text-[9px] text-[#D4A574]/50 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#produits" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">Produits</a>
          <a href="#story" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">Histoire</a>
          <Link to="/blog" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">Blog</Link>
          <a href="#avis" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">Avis</a>
          <a href="#contact" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">Contact</a>
          {itemCount > 0 && (
            <button onClick={openModal} className="relative text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">
              Panier
              <span className="absolute -top-2 -right-4 bg-[#E8732F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{itemCount}</span>
            </button>
          )}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#d46726] transition-colors">WhatsApp</a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {itemCount > 0 && (
            <button onClick={openModal} className="relative text-white text-sm">
              🛒
              <span className="absolute -top-2 -right-2 bg-[#E8732F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{itemCount}</span>
            </button>
          )}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white text-xs px-4 py-2 rounded-full font-bold">WhatsApp</a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white text-xl">{mobileOpen ? '✕' : '☰'}</button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 px-5 py-4 space-y-3">
          <a href="#produits" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">Produits</a>
          <a href="#story" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">Histoire</a>
          <Link to="/blog" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">Blog</Link>
          <a href="#avis" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">Avis</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">Contact</a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-5 bg-[#0a0a0a] relative overflow-hidden zellige-pattern">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#E8732F]/[0.06] blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <div>
          <h1 className="text-[clamp(48px,7vw,80px)] font-extrabold leading-[0.95] tracking-[-0.03em] mb-6">
            Secrets du<br /><em className="text-[#E8732F] not-italic">Desert.</em>
          </h1>
          <p className="text-white/50 text-lg max-w-[480px] mb-9 leading-relaxed">
            Produits artisanaux 100% naturels du <strong className="text-[#E8732F]">Sahara Marocain</strong>. Elabores par des femmes artisanes de Dakhla avec des ingredients purs et ancestraux.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#produits" className="bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-sm font-bold hover:bg-[#E8732F] hover:text-white transition-colors">Explorer les produits</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/60 px-9 py-4 rounded-full text-sm font-semibold hover:border-[#E8732F] hover:text-[#E8732F] transition-colors">WhatsApp</a>
          </div>
          <div className="flex gap-12 mt-10 pt-6 border-t border-white/[0.06]">
            <div><h3 className="text-4xl font-extrabold">10+</h3><p className="text-xs text-white/30 uppercase tracking-[0.1em] mt-1.5">Produits</p></div>
            <div><h3 className="text-4xl font-extrabold">10K+</h3><p className="text-xs text-white/30 uppercase tracking-[0.1em] mt-1.5">Clients</p></div>
            <div><h3 className="text-4xl font-extrabold text-[#E8732F]">100%</h3><p className="text-xs text-white/30 uppercase tracking-[0.1em] mt-1.5">Naturel</p></div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] gold-border moroccan-arch">
          <img src="/images/toutia/toutia.jpg" alt="Toutia Ismailiya - Dakhla Artisanal" className="w-full h-auto object-cover" loading="eager" />
        </div>
      </div>
    </section>
  );
}

/* ─── STORY ─── */
function Story() {
  return (
    <section id="story" className="py-24 px-5 bg-[#080808] zellige-pattern">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Notre Histoire</div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-6 leading-[1.05]">
            Des Mains du <em className="text-[#E8732F] not-italic">Sahara</em>,<br />Pour Votre Beaute
          </h2>
          <p className="text-white/45 text-base leading-[1.8] mb-4">
            Dakhla Artisanal nait des mains expertes des <strong className="text-white/80">femmes rurales du Maroc</strong> — des femmes fortes du <strong className="text-white/80">Sud-Est</strong>, de l&apos;Anti-Atlas, et de toutes les regions du Sahara Marocain.
          </p>
          <p className="text-white/45 text-[15px] leading-[1.8] mb-6">
            Pendant des siecles, ces femmes ont transmis des secrets de beaute ancestraux, utilisant les plantes medicinales et les mineraux purs du desert. Aujourd&apos;hui, Dakhla Artisanal perpétue ce savoir-faire en collaborant directement avec ces cooperatives feminines pour vous offrir des produits <strong className="text-white/80">100% naturels, authentiques et efficaces</strong>.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-[#0f0f0f] gold-border rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-[#E8732F]/10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-lg">🌵</div>
              <h4 className="text-[13px] mb-1">7+ Regions</h4><p className="text-[10px] text-white/30">du Sahara Marocain</p>
            </div>
            <div className="bg-[#0f0f0f] gold-border rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-[#E8732F]/10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-lg">👩🌾</div>
              <h4 className="text-[13px] mb-1">50+ Femmes</h4><p className="text-[10px] text-white/30">Artisanes partenaires</p>
            </div>
            <div className="bg-[#0f0f0f] gold-border rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-[#E8732F]/10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-lg">🌿</div>
              <h4 className="text-[13px] mb-1">100%</h4><p className="text-[10px] text-white/30">Naturel &amp; Fait Main</p>
            </div>
          </div>
        </div>
        <div className="rounded-[20px] overflow-hidden gold-border moroccan-arch">
          <img src="/images/elixir-real-1.jpg" alt="Dakhla Artisanal" className="w-full h-auto" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ─── SEARCH BAR (compact, inside Products) ─── */
function ProductSearch({ onSearch, value }: { onSearch: (query: string) => void; value: string }) {
  const [suggestions, setSuggestions] = useState<typeof PRODUCTS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fuseSearch = useCallback((q: string) => {
    if (!q.trim()) { setSuggestions([]); return; }
    const lower = q.toLowerCase();
    const scored = PRODUCTS.map(p => {
      let score = 0;
      if (p.name.toLowerCase().includes(lower)) score += 10;
      if (p.nameAr.toLowerCase().includes(lower)) score += 10;
      if (p.hook.toLowerCase().includes(lower)) score += 5;
      if (p.benefits.some(b => b.toLowerCase().includes(lower))) score += 4;
      if (p.catLabel.toLowerCase().includes(lower)) score += 2;
      return { product: p, score };
    }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);
    setSuggestions(scored.slice(0, 6).map(s => s.product));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative max-w-[600px] mb-8">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => { fuseSearch(e.target.value); setShowSuggestions(true); onSearch(e.target.value); }}
          onFocus={() => { if (value) setShowSuggestions(true); }}
          placeholder="Filtrer les produits..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8732F]/40 transition-all"
        />
        {value && (
          <button onClick={() => { setSuggestions([]); setShowSuggestions(false); onSearch(''); inputRef.current?.focus(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 text-xs">✕</button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/[0.08] rounded-2xl overflow-hidden z-50 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {suggestions.map(p => (
            <Link key={p.id} to={`/produit/${p.id}`} onClick={() => setShowSuggestions(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors border-b border-white/[0.03] last:border-0">
              <img src={p.img} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{p.name}</div>
                <div className="text-[10px] text-white/30">{p.catLabel} — {p.price} DH</div>
              </div>
              <span className="text-[#E8732F] text-xs font-bold">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── HERO SEARCH SECTION ─── */
const QUICK_CHIPS = [
  { label: '🦴 Douleurs', query: 'douleurs articulations' },
  { label: '💆 Cheveux', query: 'cheveux' },
  { label: '✨ Éclat Peau', query: 'visage eclat' },
  { label: '😴 Sommeil', query: 'sommeil stress' },
  { label: '⚡ Énergie', query: 'energie vitalite' },
  { label: '🌿 Corps', query: 'corps' },
  { label: '🌸 Féminin', query: 'intime feminin' },
  { label: '💊 Compléments', query: 'complement' },
];

function HeroSearch({ onSearch, searchQuery }: { onSearch: (q: string) => void; searchQuery: string }) {
  const [localQuery, setLocalQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof PRODUCTS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fuseSearch = useCallback((q: string) => {
    if (!q.trim()) { setSuggestions([]); return; }
    const lower = q.toLowerCase();
    const scored = PRODUCTS.map(p => {
      let score = 0;
      if (p.name.toLowerCase().includes(lower)) score += 10;
      if (p.nameAr.toLowerCase().includes(lower)) score += 8;
      if (p.hook.toLowerCase().includes(lower)) score += 6;
      if (p.description.toLowerCase().includes(lower)) score += 3;
      if (p.benefits.some(b => b.toLowerCase().includes(lower))) score += 5;
      if (p.benefitsAr.some(b => b.toLowerCase().includes(lower))) score += 4;
      if (p.catLabel.toLowerCase().includes(lower)) score += 3;
      const allText = (p.name + ' ' + p.hook + ' ' + p.benefits.join(' ')).toLowerCase();
      lower.split(/\s+/).forEach(w => { if (w.length > 2 && allText.includes(w)) score += 2; });
      return { product: p, score };
    }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);
    setSuggestions(scored.slice(0, 6).map(s => s.product));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = (val: string) => {
    setLocalQuery(val);
    fuseSearch(val);
    setShowSuggestions(true);
    onSearch(val);
  };

  const handleChip = (query: string) => {
    setLocalQuery(query);
    fuseSearch(query);
    setShowSuggestions(false);
    onSearch(query);
    document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClear = () => {
    setLocalQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <section className="py-14 px-5 bg-[#080808] border-y border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8732F]/[0.04] via-transparent to-[#D4A574]/[0.03] pointer-events-none" />
      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Tagline */}
        <div className="text-center mb-8">
          <p className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.25em] mb-3">Trouvez Votre Soin</p>
          <h2 className="text-[clamp(24px,4vw,42px)] font-extrabold leading-tight mb-2">
            Que cherchez-vous <em className="text-[#E8732F] not-italic">aujourd&apos;hui?</em>
          </h2>
          <p className="text-white/35 text-sm">Tapez un problème, un ingrédient ou un produit — on le trouve pour vous</p>
        </div>

        {/* Big Search Input */}
        <div ref={wrapRef} className="relative mb-6">
          <div className="relative">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#E8732F]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={localQuery}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => { if (localQuery) setShowSuggestions(true); }}
              placeholder="Ex: douleurs genoux, cheveux cassants, peau terne, stress..."
              className="w-full bg-white/[0.05] border-2 border-white/[0.10] hover:border-white/20 rounded-2xl py-5 pl-14 pr-14 text-base text-white placeholder:text-white/25 focus:outline-none focus:border-[#E8732F]/60 focus:bg-white/[0.07] transition-all duration-200 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            />
            {localQuery ? (
              <button onClick={handleClear}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/20 text-white/50 hover:text-white flex items-center justify-center transition-all text-sm">✕</button>
            ) : (
              <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-[#E8732F]/15 border border-[#E8732F]/20 rounded-xl px-3 py-1.5 hidden sm:flex items-center gap-1.5">
                <svg className="w-3 h-3 text-[#E8732F]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-[#E8732F]/60 text-[11px] font-semibold">Rechercher</span>
              </div>
            )}
          </div>

          {/* Dropdown suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#141414] border border-white/[0.10] rounded-2xl overflow-hidden z-50 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              <div className="px-4 pt-3 pb-1.5 text-[10px] text-white/25 uppercase tracking-[0.15em] font-bold border-b border-white/[0.04]">
                {suggestions.length} produit{suggestions.length > 1 ? 's' : ''} trouvé{suggestions.length > 1 ? 's' : ''}
              </div>
              {suggestions.map(p => (
                <Link key={p.id} to={`/produit/${p.id}`} onClick={() => setShowSuggestions(false)}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.05] transition-colors border-b border-white/[0.03] last:border-0 group">
                  <img src={p.img} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold truncate group-hover:text-[#E8732F] transition-colors">{p.name}</div>
                    <div className="text-[11px] text-white/35 truncate mt-0.5">{p.hook}</div>
                    <div className="text-[10px] text-white/20 mt-0.5">{p.catLabel}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[#E8732F] font-extrabold text-[15px]">{p.price} DH</div>
                    {p.oldPrice && <div className="text-white/20 text-[11px] line-through">{p.oldPrice} DH</div>}
                  </div>
                </Link>
              ))}
              <div className="px-4 py-3 border-t border-white/[0.04]">
                <button onClick={() => { setShowSuggestions(false); document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full text-center text-[12px] text-[#E8732F] font-semibold hover:text-[#E8732F]/70 transition-colors">
                  Voir tous les résultats ↓
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {QUICK_CHIPS.map(chip => (
            <button key={chip.query} onClick={() => handleChip(chip.query)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer border ${
                searchQuery === chip.query
                  ? 'bg-[#E8732F] text-white border-[#E8732F]'
                  : 'bg-white/[0.04] border-white/[0.10] text-white/50 hover:bg-white/[0.08] hover:text-white hover:border-white/25'
              }`}>
              {chip.label}
            </button>
          ))}
          {searchQuery && (
            <button onClick={handleClear}
              className="px-4 py-2 rounded-full text-[12px] font-semibold border border-red-500/30 text-red-400/70 hover:bg-red-500/10 transition-all cursor-pointer">
              ✕ Effacer
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── AI SUGGESTED NAME GENERATOR ─── */
function getAISuggestedName(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('levre') || q.includes('lip')) return 'Sérum Repulpant Lèvres Premium';
  if (q.includes('visage') || q.includes('face') || q.includes('teint')) return 'Sérum Éclat Visage';
  if (q.includes('cheveux') || q.includes('hair')) return 'Huile Capillaire Réparatrice';
  if (q.includes('corps') || q.includes('body')) return 'Huile de Massage Corps';
  if (q.includes('oeil') || q.includes('eye')) return 'Contour des Yeux Anti-Cernes';
  if (q.includes('solaire') || q.includes('sun')) return 'Crème Solaire Naturelle SPF50';
  if (q.includes('anti-age') || q.includes('rides')) return 'Sérum Anti-Âge Rétinol';
  if (q.includes('main') || q.includes('hand')) return 'Crème Mains Réparatrice';
  if (q.includes('pied') || q.includes('foot')) return 'Baume Pieds au Karité';
  if (q.includes('barbe') || q.includes('beard')) return 'Huile à Barbe Naturelle';
  if (q.includes('mascara') || q.includes('cils')) return 'Sérum Pousse de Cils';
  if (q.includes('fond') || q.includes('bb') || q.includes('cc')) return 'BB Crème Naturelle';
  return 'Sérum Naturel du Sahara';
}

/* ─── PRODUCT NOT FOUND / AI FALLBACK ─── */
function ProductNotFound({ query, closest }: { query: string; closest: typeof PRODUCTS }) {
  const [requestForm, setRequestForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const aiName = getAISuggestedName(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Produit Demandé', query);
    formData.append('Nom AI Suggéré', aiName);
    formData.append('Nom', requestForm.name);
    formData.append('Téléphone', requestForm.phone);
    formData.append('Email', requestForm.email || '');
    formData.append('Date', new Date().toLocaleString('fr-FR'));
    formData.append('Type', 'Demande Produit En Rupture');
    // Google Sheet webhook
    fetch('https://script.google.com/macros/s/AKfycbxb1Vg_v0hZxCypBVZnRiEe0gKTVz7jGgx0NL-_Oj1V73sKY9uCMifW7MCfrq8H5T8/exec', {
      method: 'POST', body: formData, mode: 'no-cors'
    }).catch(() => {});
    setSubmitted(true);
  };

  return (
    <div className="col-span-full">
      <div className="bg-[#141414] gold-border rounded-2xl p-8 md:p-10 max-w-[700px] mx-auto text-center">
        <div className="grid md:grid-cols-[120px_1fr] gap-5 items-center mb-6 text-left">
          <img src="/images/produit-en-rupture.jpg" alt="Produit en rupture" className="w-full aspect-[3/4] object-cover rounded-xl" />
          <div>
            <div className="text-[10px] text-[#E8732F] uppercase tracking-[0.2em] font-bold mb-1.5">Bientôt disponible</div>
            <h3 className="text-xl font-bold mb-1">"{query}" — Produit en rupture</h3>
            <p className="text-white/40 text-sm mb-3">Ce produit n&apos;est pas encore disponible dans notre catalogue.</p>
            <div className="bg-[#E8732F]/10 border border-[#E8732F]/20 rounded-lg px-3 py-2 inline-block">
              <span className="text-[10px] text-[#E8732F] uppercase tracking-[0.1em]">Suggestion AI : </span>
              <span className="text-sm font-semibold text-white">{aiName}</span>
            </div>
          </div>
        </div>
        <p className="text-white/40 text-sm mb-6">Laissez-nous vos coordonnées et nous vous contacterons des qu&apos;il sera en stock !</p>

        {submitted ? (
          <div className="bg-[#5B7B5E]/15 border border-[#5B7B5E]/20 rounded-xl p-5">
            <div className="text-[#5B7B5E] font-bold mb-1">Demande enregistrée !</div>
            <p className="text-white/40 text-xs">Nous vous contacterons sous 24h sur WhatsApp.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-[400px] mx-auto text-left">
            <input type="text" required placeholder="Votre nom complet *" value={requestForm.name} onChange={e => setRequestForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8732F]/40" />
            <input type="tel" required placeholder="Téléphone * (ex: 06XX... )" value={requestForm.phone} onChange={e => setRequestForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8732F]/40" />
            <input type="email" placeholder="Email (optionnel)" value={requestForm.email} onChange={e => setRequestForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#E8732F]/40" />
            <button type="submit" className="w-full bg-[#E8732F] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#d46726] transition-colors">
              M&apos;alerter quand disponible
            </button>
          </form>
        )}

        {closest.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-white/30 text-xs uppercase tracking-[0.15em] mb-4">Produits similaires</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {closest.map(p => (
                <Link key={p.id} to={`/produit/${p.id}`} className="bg-[#0a0a0a] border border-white/[0.04] rounded-xl p-3 text-left hover:border-[#E8732F]/20 transition-colors block">
                  <img src={p.img} alt={p.name} className="w-full aspect-square object-cover rounded-lg mb-2" loading="lazy" />
                  <div className="text-xs font-semibold truncate">{p.name}</div>
                  <div className="text-[#E8732F] text-xs font-bold">{p.price} DH</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PRODUCTS ─── */
function Products({ searchQuery, onSearch }: { searchQuery: string; onSearch: (q: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('tous');
  const [showNotFound, setShowNotFound] = useState(false);

  // Apply both category filter AND search
  const filtered = PRODUCTS.filter(p => {
    const catMatch = activeFilter === 'tous' || p.cat === activeFilter;
    if (!searchQuery.trim()) return catMatch;
    const lower = searchQuery.toLowerCase();
    const searchMatch =
      p.name.toLowerCase().includes(lower) ||
      p.nameAr.toLowerCase().includes(lower) ||
      p.hook.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.benefits.some(b => b.toLowerCase().includes(lower)) ||
      p.benefitsAr.some(b => b.toLowerCase().includes(lower)) ||
      p.catLabel.toLowerCase().includes(lower);
    return catMatch && searchMatch;
  });

  // Find closest products if search yields nothing
  const findClosest = (q: string) => {
    const lower = q.toLowerCase();
    return PRODUCTS.map(p => {
      let score = 0;
      const pText = (p.name + ' ' + p.hook + ' ' + p.benefits.join(' ')).toLowerCase();
      const words = lower.split(/\s+/).filter(w => w.length > 2);
      words.forEach(w => {
        if (p.name.toLowerCase().includes(w)) score += 5;
        else if (pText.includes(w)) score += 2;
        else {
          // Levenshtein-like partial match
          for (let i = 0; i <= p.name.length - w.length; i++) {
            const sub = p.name.toLowerCase().slice(i, i + w.length);
            let match = 0;
            for (let j = 0; j < w.length; j++) if (sub[j] === w[j]) match++;
            if (match / w.length > 0.6) score += 1;
          }
        }
      });
      return { product: p, score };
    }).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(s => s.product);
  };

  const closest = showNotFound && searchQuery ? findClosest(searchQuery) : [];

  useEffect(() => {
    if (searchQuery.trim().length > 2 && filtered.length === 0) {
      setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  }, [searchQuery, filtered.length]);

  return (
    <section id="produits" className="py-24 px-5 bg-[#0a0a0a] zellige-pattern">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Nos Produits</div>
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-4">Formules du <em className="text-[#E8732F] not-italic">Sahara</em></h2>
        <p className="text-white/40 text-base mb-8 max-w-[600px]">Des formules naturelles elaborees avec soin dans le Sahara marocain par des femmes artisanes.</p>

        <ProductSearch onSearch={onSearch} value={searchQuery} />

        <div className="flex gap-2.5 mb-9 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setActiveFilter(cat.key)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.05em] transition-all cursor-pointer ${activeFilter === cat.key ? 'bg-white text-[#0a0a0a]' : 'bg-white/[0.03] border border-white/[0.08] text-white/40 hover:bg-white/10'}`}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="group bg-[#141414] gold-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9A96E]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <Link to={`/produit/${p.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0f0f0f]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-white text-[#0a0a0a] px-7 py-3 rounded-full text-xs font-bold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">Voir details</span>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#E8732F] text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.05em] z-10">{p.badge}</span>
                </div>
              </Link>
              <div className="p-4">
                <div className="text-[10px] text-white/25 uppercase tracking-[0.15em] font-bold mb-1.5">{p.catLabel}</div>
                <Link to={`/produit/${p.id}`}><h3 className="text-[15px] font-bold mb-2 leading-tight hover:text-[#E8732F] transition-colors">{p.name}</h3></Link>
                <p className="text-[11px] text-white/35 leading-snug mb-3">{p.hook}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#E8732F] text-xl font-extrabold">{p.price} DH</span>
                    {p.oldPrice && <span className="text-white/20 text-sm line-through">{p.oldPrice} DH</span>}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/produit/${p.id}`} className="flex-1 text-center border border-white/10 text-white/60 py-2 rounded-full text-[11px] font-semibold hover:border-[#E8732F] hover:text-[#E8732F] transition-colors">Details</Link>
                  <Link to={`/produit/${p.id}`} className="flex-1 text-center bg-[#E8732F] text-white py-2 rounded-full text-[11px] font-bold hover:bg-[#d46726] transition-colors">Commander</Link>
                </div>
              </div>
            </div>
          ))}
          {showNotFound && searchQuery && (
            <ProductNotFound query={searchQuery} closest={closest} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function Reviews() {
  return (
    <section id="avis" className="py-24 px-5 bg-[#080808] zellige-pattern">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Temoignages</div>
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-4">Ce Que Disent <em className="text-[#E8732F] not-italic">Nos Clients</em></h2>
        <p className="text-white/40 text-base mb-10 max-w-[600px]">Plus de 10 000 clients satisfaits font confiance a Dakhla Artisanal.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.id} className="bg-[#141414] gold-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E8732F]/20 rounded-full flex items-center justify-center text-[#E8732F] font-bold text-sm">{r.avatar}</div>
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-[10px] text-white/30">{r.product}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < r.rating ? 'text-[#E8732F]' : 'text-white/10'}`}>★</span>
                ))}
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-3">{r.text}</p>
              <p className="text-[10px] text-white/20">{r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BLOG PREVIEW ─── */
function BlogPreview() {
  const articles = BLOG_ARTICLES.slice(0, 3);
  return (
    <section className="py-24 px-5 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Blog</div>
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-4">Secrets de <em className="text-[#E8732F] not-italic">Beaute</em></h2>
        <p className="text-white/40 text-base mb-10 max-w-[600px]">Conseils, recettes et histoires autour des produits naturels du Sahara.</p>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {articles.map(a => (
            <Link key={a.id} to={`/blog/${a.id}`} className="group bg-[#141414] border border-white/[0.04] rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/20 block">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-2">
                  <span className="text-[10px] bg-[#E8732F]/10 text-[#E8732F] px-2 py-0.5 rounded-full">{a.category}</span>
                  <span className="text-[10px] text-white/30">{a.readTime}</span>
                </div>
                <h3 className="text-[15px] font-bold mb-2 leading-tight group-hover:text-[#E8732F] transition-colors">{a.title}</h3>
                <p className="text-[12px] text-white/35 leading-relaxed">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog" className="inline-block border border-white/15 text-white/60 px-8 py-3 rounded-full text-sm font-semibold hover:border-[#E8732F] hover:text-[#E8732F] transition-colors">Voir tous les articles</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="contact" className="py-24 px-5 text-center bg-gradient-to-b from-[#080808] to-[#0a0a0a] relative overflow-hidden zellige-pattern">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8732F]/[0.06] blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-[clamp(36px,5vw,64px)] font-extrabold mb-5">Pret a <em className="text-[#E8732F] not-italic">commander?</em></h2>
        <p className="text-white/40 text-lg mb-9 max-w-[500px] mx-auto">Livraison partout au Maroc. Paiement a la livraison disponible. Commandez sur WhatsApp.</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#E8732F] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#d46726] transition-colors">Commander sur WhatsApp — +212 677 031 561</a>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.03] pt-16 pb-6 px-5">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-9">
        <div>
          <div className="font-serif text-xl font-bold text-[#D4A574] tracking-[0.12em] leading-none mb-3">
            DAKHLA<span className="block text-[8px] text-[#D4A574]/50 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
          <p className="text-white/30 text-[13px] leading-relaxed">Produits naturels artisanaux du Sahara Marocain. Fabriques avec passion par des femmes artisanes de Dakhla.</p>
        </div>
        <div>
          <h4 className="text-white/50 text-xs uppercase tracking-[0.1em] mb-3.5 font-semibold">Liens</h4>
          <a href="#produits" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Produits</a>
          <a href="#story" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Notre Histoire</a>
          <Link to="/blog" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Blog</Link>
          <a href="#avis" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Avis Clients</a>
        </div>
        <div>
          <h4 className="text-white/50 text-xs uppercase tracking-[0.1em] mb-3.5 font-semibold">Produits</h4>
          <Link to="/produit/toutia" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Toutia Ismailiya</Link>
          <Link to="/produit/shampoing" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Secret d&apos;Atlas</Link>
          <Link to="/produit/huile" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">Huile d&apos;Argan</Link>
          <Link to="/produit/elixir" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">ELIXIR+</Link>
        </div>
        <div>
          <h4 className="text-white/50 text-xs uppercase tracking-[0.1em] mb-3.5 font-semibold">Contact</h4>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#E8732F] transition-colors">WhatsApp: +212 677 031 561</a>
          <span className="block text-white/30 text-[13px] mb-2.5">Dakhla, Sahara Marocain</span>
          <span className="block text-white/30 text-[13px]" dir="rtl">الصحراء المغربية</span>
        </div>
      </div>
      <div className="border-t border-white/[0.03] pt-5 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-2">
        <p className="text-white/10 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
        <p className="text-white/10 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
      </div>
    </footer>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <HeroSearch onSearch={setSearchQuery} searchQuery={searchQuery} />
      <Story />
      <Products searchQuery={searchQuery} onSearch={setSearchQuery} />
      <Reviews />
      <BlogPreview />
      <CTA />
      <Footer />
      <OrderModal />
    </div>
  );
}