import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, WHATSAPP_NUMBER } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { BLOG_ARTICLES } from '../data/blog';
import { useCart } from '../hooks/useCart';
import { useLang } from '../hooks/useLanguage';
import { LANGS } from '../i18n/translations';
import OrderModal from '../components/OrderModal';
import ProductRequestForm from '../components/ProductRequestForm';

/* ─── LANG SWITCHER ─── */
function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-[13px] font-medium px-2 py-1 rounded-lg hover:bg-[#141414]/[0.05]">
        <span>{current.flag}</span>
        <span className="uppercase text-[11px] font-bold tracking-wide">{current.code}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(61,43,31,0.12)] z-50 min-w-[130px]">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors text-left ${l.code === lang ? 'bg-[#E8732F]/10 text-[#E8732F]' : 'text-white/60 hover:bg-[#141414] hover:text-white'}`}>
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openModal } = useCart();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A/95] backdrop-blur-xl border-b border-white/[0.08]' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="block">
          <div className="font-serif text-[22px] font-bold text-[#D4A574] tracking-[0.15em] leading-none">
            DAKHLA
            <span className="block text-[9px] text-[#D4A574]/60 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#produits" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.nav.products}</a>
          <a href="#story" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.nav.story}</a>
          <Link to="/blog" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.nav.blog}</Link>
          <a href="#avis" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.nav.reviews}</a>
          <a href="#contact" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.nav.contact}</a>
          {itemCount > 0 && (
            <button onClick={openModal} className="relative text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">
              {t.nav.cart}
              <span className="absolute -top-2 -right-4 bg-[#E8732F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{itemCount}</span>
            </button>
          )}
          <LangSwitcher />
          <a href="https://web.facebook.com/dakhlaartisanal.maroc" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="text-white/60/60 hover:text-[#1877F2] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#c45e22] transition-colors">WhatsApp</a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangSwitcher />
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
        <div className="md:hidden bg-[#0A0A0A]/97 backdrop-blur-xl border-t border-white/[0.08] px-5 py-4 space-y-3">
          <a href="#produits" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">{t.nav.products}</a>
          <a href="#story" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">{t.nav.story}</a>
          <Link to="/blog" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">{t.nav.blog}</Link>
          <a href="#avis" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">{t.nav.reviews}</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-white/60 text-sm py-2">{t.nav.contact}</a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const { t } = useLang();
  return (
    <section className="min-h-screen flex items-center pt-20 pb-0 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 zellige-pattern opacity-60 pointer-events-none" />
      {/* Soft glow accents */}
      <div className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#D4A574]/[0.18] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#5B7B5E]/[0.10] blur-[80px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center pb-16 pt-8">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#5B7B5E]/15 border border-[#5B7B5E]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B7B5E] animate-pulse" />
            <span className="text-[#5B7B5E] text-[11px] font-bold uppercase tracking-[0.2em]">{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(44px,6.5vw,78px)] font-extrabold leading-[0.93] tracking-[-0.03em] mb-5 font-serif">
            <span className="text-white">{t.hero.line1}</span><br />
            <em className="not-italic bg-gradient-to-r from-[#E8732F] via-[#D4A574] to-[#E8732F] bg-clip-text text-transparent">{t.hero.line2}</em><br />
            <span className="text-white">{t.hero.line3}</span>
          </h1>

          <p className="text-white/60 text-[16px] max-w-[460px] mb-8 leading-[1.75]">
            {t.hero.sub}
          </p>

          <div className="flex gap-3 flex-wrap mb-10">
            <a href="#produits" className="bg-[#E8732F] text-white px-8 py-4 rounded-full text-[13px] font-bold hover:bg-[#c45e22] transition-all duration-200 shadow-[0_8px_32px_rgba(196,98,45,0.30)] hover:shadow-[0_12px_40px_rgba(196,98,45,0.45)] hover:-translate-y-0.5">
              {t.hero.cta1}
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/[0.08] text-white/60 px-8 py-4 rounded-full text-[13px] font-semibold hover:border-[#25D366]/50 hover:text-[#25D366] transition-all duration-200 bg-white/60">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-white/[0.08]">
            {[
              { n: '26+', label: t.hero.stat1 },
              { n: '10K+', label: t.hero.stat2 },
              { n: '100%', label: t.hero.stat3, color: true },
            ].map(s => (
              <div key={s.label}>
                <div className={`text-[clamp(28px,3.5vw,40px)] font-extrabold leading-none font-serif ${s.color ? 'text-[#E8732F]' : 'text-white'}`}>{s.n}</div>
                <div className="text-[10px] text-[#D4A574] uppercase tracking-[0.12em] mt-1.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#E8732F]/10 via-transparent to-[#D4A574]/15 rounded-[40px] blur-2xl" />
          <div className="relative rounded-[32px] overflow-hidden gold-border shadow-[0_40px_100px_rgba(61,43,31,0.18)]">
            <img src="/images/toutia/toutia.jpg" alt="Toutia Ismailiya — Dakhla Artisanal" className="w-full h-auto object-cover" loading="eager" />
            {/* Overlay badge */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="bg-white/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-[14px]">Toutia Ismailiya</div>
                  <div className="text-white/60 text-[11px]">Pierre naturelle du Sahara · Best-seller</div>
                </div>
                <div className="text-[#E8732F] font-extrabold text-[18px]">169 DH</div>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 bg-[#5B7B5E] text-white text-[10px] font-bold px-3.5 py-2 rounded-full shadow-lg rotate-6">
            ✓ 100% Naturel
          </div>
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white border border-white/[0.08] rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(61,43,31,0.12)] hidden md:block">
            <div className="flex items-center gap-2 mb-1">
              {[1,2,3,4,5].map(i => <span key={i} className="text-[#E8732F] text-xs">★</span>)}
            </div>
            <div className="text-white/60 text-[11px] font-medium">10 000+ avis</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ─── */
function TrustStrip() {
  const { t } = useLang();
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#5B7B5E]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-5 4.5-7 4.5 0 6 2.5 10.5 7 12 4.5-1.5 7-6 7-12-2 0-5.5-1.5-7-4.5z" />
        </svg>
      ),
      title: t.trust.t1, sub: t.trust.s1
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#D4A574]">
          <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        </svg>
      ),
      title: t.trust.t2, sub: t.trust.s2
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#E8732F]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-5-5 5-5M20 12H3M20 7l-2-2h-5a2 2 0 00-2 2v6a2 2 0 002 2h5l2-2" />
        </svg>
      ),
      title: t.trust.t3, sub: t.trust.s3
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#D4A574]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.196-3.8M9 20H4v-2a4 4 0 015.196-3.8M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a2 2 0 11-4 0 2 2 0 014 0zM7 12a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t.trust.t4, sub: t.trust.s4
    },
  ];
  return (
    <div className="bg-[#141414] py-5 px-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center">{item.icon}</span>
            <div>
              <div className="text-white text-[12px] font-bold">{item.title}</div>
              <div className="text-[#D4A574]/60 text-[10px]">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── BESTSELLERS ─── */
const BESTSELLER_IDS = ['toutia', 'pack-feminite', 'elixir'];
function Bestsellers() {
  const picks = PRODUCTS.filter(p => BESTSELLER_IDS.includes(p.id));
  const { addItem } = useCart();
  const { t } = useLang();
  return (
    <section className="py-20 px-5 bg-[#0A0A0A]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[#E8732F] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{t.bestsellers.tag}</div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold leading-tight font-serif text-white">
              {t.bestsellers.title1} <em className="text-[#E8732F] not-italic">{t.bestsellers.title2}</em>
            </h2>
          </div>
          <a href="#produits" className="text-[#D4A574] text-[13px] hover:text-[#E8732F] transition-colors font-medium">
            {t.bestsellers.viewAll}
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {picks.map((p, i) => (
            <div key={p.id} className={`group relative rounded-3xl overflow-hidden bg-white gold-border hover:shadow-[0_30px_60px_rgba(61,43,31,0.15)] transition-all duration-500 hover:-translate-y-2 ${i === 1 ? 'md:-mt-6' : ''}`}>
              <Link to={`/produit/${p.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {i === 0 && <div className="absolute top-4 left-4 bg-[#E8732F] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">{t.bestsellers.badge1}</div>}
                  {i === 1 && <div className="absolute top-4 left-4 bg-[#D4A574] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">{t.bestsellers.badge2}</div>}
                  {i === 2 && <div className="absolute top-4 left-4 bg-[#5B7B5E] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">{t.bestsellers.badge3}</div>}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-[#E8732F] text-sm">★</span>)}
                      <span className="text-white/50 text-[10px] ml-1.5 self-center">({t.bestsellers.reviews})</span>
                    </div>
                    <h3 className="text-white font-extrabold text-[18px] leading-tight mb-1">{p.name}</h3>
                    <p className="text-white/60 text-[12px] leading-snug line-clamp-2">{p.hook}</p>
                  </div>
                </div>
              </Link>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[#E8732F] text-[22px] font-extrabold">{p.price} DH</span>
                  {p.oldPrice && <span className="text-[#D4A574]/40 text-sm line-through ml-2">{p.oldPrice} DH</span>}
                </div>
                <button onClick={() => addItem(p)}
                  className="bg-[#E8732F] text-white px-5 py-2.5 rounded-full text-[12px] font-bold hover:bg-[#c45e22] transition-colors shadow-[0_4px_16px_rgba(196,98,45,0.25)]">
                  {t.bestsellers.order}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRESORS DU SAHARA ─── */
const IngredientIcon = ({ type }: { type: string }) => {
  if (type === 'stone') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <ellipse cx="16" cy="20" rx="12" ry="8" fill="#D4A574" opacity="0.2" />
      <ellipse cx="16" cy="18" rx="10" ry="7" fill="#D4A574" opacity="0.35" stroke="#D4A574" strokeWidth="0.5" />
      <path d="M10 14 Q16 10 22 14 Q20 20 16 21 Q12 20 10 14Z" fill="#D4A574" opacity="0.5" />
    </svg>
  );
  if (type === 'leaf') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M16 28 C16 28 6 20 8 10 C12 6 22 8 24 14 C26 20 16 28 16 28Z" fill="#5B7B5E" opacity="0.35" stroke="#5B7B5E" strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M16 28 C16 28 14 18 16 10" stroke="#5B7B5E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
  if (type === 'flower') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <circle cx="16" cy="16" r="3" fill="#E8732F" opacity="0.7" />
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx={16 + 7*Math.cos(a*Math.PI/180)} cy={16 + 7*Math.sin(a*Math.PI/180)} rx="3.5" ry="2" fill="#D4A574" opacity="0.5" transform={`rotate(${a} ${16 + 7*Math.cos(a*Math.PI/180)} ${16 + 7*Math.sin(a*Math.PI/180)})`} />
      ))}
    </svg>
  );
  if (type === 'cactus') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect x="14" y="8" width="4" height="18" rx="2" fill="#5B7B5E" opacity="0.5" />
      <path d="M14 16 Q8 16 8 12 L8 10" stroke="#5B7B5E" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
      <path d="M18 19 Q24 19 24 15 L24 13" stroke="#5B7B5E" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
      <ellipse cx="16" cy="26" rx="6" ry="2" fill="#5B7B5E" opacity="0.2" />
    </svg>
  );
  if (type === 'root') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <ellipse cx="16" cy="12" rx="7" ry="5" fill="#E8732F" opacity="0.35" stroke="#E8732F" strokeWidth="0.6" />
      <path d="M12 17 Q10 24 8 26M16 17 V26M20 17 Q22 24 24 26" stroke="#E8732F" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
  if (type === 'seed') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <ellipse cx="13" cy="14" rx="4" ry="5.5" fill="#D4A574" opacity="0.5" transform="rotate(-20 13 14)" />
      <ellipse cx="19" cy="14" rx="4" ry="5.5" fill="#D4A574" opacity="0.4" transform="rotate(20 19 14)" />
      <ellipse cx="16" cy="20" rx="3.5" ry="5" fill="#D4A574" opacity="0.45" />
    </svg>
  );
  return null;
};

function Ingredients() {
  const { t } = useLang();
  const items = [
    { type: 'stone', name: 'Toutia', origin: 'Jebel Saghro, Sud-Est', desc: 'Pierre ancestrale aux propriétés purifiantes et déodorantes. Utilisée depuis l\'Antiquité.' },
    { type: 'leaf', name: 'Argan Bio', origin: 'Souss-Massa, Maroc', desc: 'Or liquide du Maroc. Nourrit, protège et illumine la peau et les cheveux.' },
    { type: 'flower', name: 'Rose de Damas', origin: 'Vallée du Dadès', desc: 'Reine des fleurs. Hydrate en profondeur et apaise les peaux sensibles.' },
    { type: 'cactus', name: 'Aloe du Sahara', origin: 'Sahara Marocain', desc: 'Géant de l\'hydratation. Répare, cicatrise et rafraîchit intensément.' },
    { type: 'root', name: 'Curcuma', origin: 'Plaines de Marrakech', desc: 'Or jaune anti-inflammatoire. Soulage les articulations et réduit l\'inflammation.' },
    { type: 'seed', name: 'Nigelle', origin: 'Récoltes rurales du Maroc', desc: 'La "graine de bénédiction". Fortifie les cheveux et booste l\'immunité naturellement.' },
  ];
  return (
    <section className="py-20 px-5 bg-[#141414] relative overflow-hidden zellige-pattern">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="text-[#D4A574] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{t.ingredients.tag}</div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold mb-4 font-serif text-white">
            {t.ingredients.title1} <em className="text-[#E8732F] not-italic">{t.ingredients.title2}</em>
          </h2>
          <p className="text-white/60 text-[15px] max-w-[500px] mx-auto leading-relaxed">
            {t.ingredients.sub}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.name} className="group bg-white/80 border border-white/[0.08] hover:border-[#D4A574] rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_24px_rgba(61,43,31,0.08)]">
              <div className="mb-3"><IngredientIcon type={item.type} /></div>
              <div className="text-[#D4A574] font-bold text-[15px] mb-0.5">{item.name}</div>
              <div className="text-white/60/50 text-[10px] uppercase tracking-[0.1em] mb-2.5">{item.origin}</div>
              <p className="text-white/60 text-[12px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STORY ─── */
function Story() {
  return (
    <section id="story" className="py-24 px-5 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#D4A574]/[0.12] blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Notre Histoire</div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-6 leading-[1.05] font-serif text-white">
            Des Mains du <em className="text-[#E8732F] not-italic">Sahara</em>,<br />Pour Votre Beauté
          </h2>
          <p className="text-white/60 text-base leading-[1.8] mb-4">
            Dakhla Artisanal naît des mains expertes des <strong className="text-white">femmes rurales du Maroc</strong> — des femmes fortes du <strong className="text-white">Sud-Est</strong>, de l&apos;Anti-Atlas, et de toutes les régions du Sahara Marocain.
          </p>
          <p className="text-white/60 text-[15px] leading-[1.8] mb-8">
            Pendant des siècles, ces femmes ont transmis des secrets de beauté ancestraux, utilisant les plantes médicinales et les minéraux purs du désert. Aujourd&apos;hui, Dakhla Artisanal perpétue ce savoir-faire pour vous offrir des produits <strong className="text-white">100% naturels, authentiques et efficaces</strong>.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🌵', title: '7+ Régions', sub: 'du Sahara Marocain' },
              { icon: '👩‍🌾', title: '50+ Femmes', sub: 'Artisanes partenaires' },
              { icon: '🌿', title: '100%', sub: 'Naturel & Fait Main' },
            ].map(c => (
              <div key={c.title} className="bg-[#141414] border border-white/[0.08] rounded-xl p-5 text-center hover:border-[#E8732F]/30 transition-colors">
                <div className="text-2xl mb-2">{c.icon}</div>
                <h4 className="text-[13px] font-bold mb-1 text-white">{c.title}</h4>
                <p className="text-[10px] text-white/60">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] overflow-hidden gold-border shadow-[0_30px_80px_rgba(61,43,31,0.14)]">
          <img src="/images/elixir-real-1.jpg" alt="Dakhla Artisanal — femmes artisanes" className="w-full h-auto" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ─── SHARED SEARCH SCORER ─── */
function scoreProduct(p: (typeof PRODUCTS)[0], lower: string): number {
  let score = 0;
  const words = lower.split(/\s+/).filter(w => w.length > 1);
  const fields = [
    { text: p.name.toLowerCase(), w: 12 },
    { text: p.nameAr, w: 12 },
    { text: p.hook.toLowerCase(), w: 7 },
    { text: p.description.toLowerCase(), w: 5 },
    { text: p.descriptionAr, w: 5 },
    { text: p.ingredients.toLowerCase(), w: 4 },
    { text: p.ingredientsAr, w: 4 },
    { text: p.usage.toLowerCase(), w: 3 },
    { text: p.usageAr, w: 3 },
    { text: p.benefits.join(' ').toLowerCase(), w: 5 },
    { text: p.benefitsAr.join(' '), w: 5 },
    { text: p.catLabel.toLowerCase(), w: 3 },
  ];
  for (const { text, w } of fields) {
    if (text.includes(lower)) score += w;
    else words.forEach(word => { if (text.includes(word)) score += Math.floor(w / 2); });
  }
  return score;
}

/* ─── SEARCH BAR (compact, inside Products) ─── */
function ProductSearch({ onSearch, value }: { onSearch: (query: string) => void; value: string }) {
  const [suggestions, setSuggestions] = useState<typeof PRODUCTS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const fuseSearch = useCallback((q: string) => {
    if (!q.trim()) { setSuggestions([]); return; }
    const lower = q.toLowerCase();
    const scored = PRODUCTS.map(p => ({ product: p, score: scoreProduct(p, lower) }))
      .filter(s => s.score > 0).sort((a, b) => b.score - a.score);
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
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A574]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => { fuseSearch(e.target.value); setShowSuggestions(true); onSearch(e.target.value); }}
          onFocus={() => { if (value) setShowSuggestions(true); }}
          placeholder={t.products.filterLabel}
          className="w-full bg-white border border-white/[0.08] rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-[#D4A574]/60 focus:outline-none focus:border-[#E8732F]/50 transition-all shadow-[0_2px_8px_rgba(61,43,31,0.06)]"
        />
        {value && (
          <button onClick={() => { setSuggestions([]); setShowSuggestions(false); onSearch(''); inputRef.current?.focus(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4A574] hover:text-white text-xs">✕</button>
        )}
      </div>
      {showSuggestions && value.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-white/[0.08] rounded-2xl overflow-y-auto max-h-[480px] z-50 shadow-[0_20px_60px_rgba(61,43,31,0.15)]">
          {suggestions.length > 0 ? suggestions.map(p => (
            <Link key={p.id} to={`/produit/${p.id}`} onClick={() => setShowSuggestions(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#141414] transition-colors border-b border-white/[0.08]/50 last:border-0">
              <img src={p.img} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate text-white">{p.name}</div>
                <div className="text-[10px] text-white/60">{p.catLabel} — {p.price} DH</div>
              </div>
              <span className="text-[#E8732F] text-xs font-bold">→</span>
            </Link>
          )) : (
            <ProductRequestForm query={value} onClose={() => setShowSuggestions(false)} />
          )}
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
  const [blogSuggestions, setBlogSuggestions] = useState<typeof BLOG_ARTICLES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const fuseSearch = useCallback((q: string) => {
    if (!q.trim()) { setSuggestions([]); setBlogSuggestions([]); return; }
    const lower = q.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 1);

    const scored = PRODUCTS.map(p => ({ product: p, score: scoreProduct(p, lower) }))
      .filter(s => s.score > 0).sort((a, b) => b.score - a.score);
    setSuggestions(scored.slice(0, 5).map(s => s.product));

    const blogScored = BLOG_ARTICLES.map(a => {
      let score = 0;
      const fields = [a.title.toLowerCase(), a.excerpt.toLowerCase(), a.content.toLowerCase(), a.category.toLowerCase()];
      for (const text of fields) {
        if (text.includes(lower)) score += 8;
        else words.forEach(w => { if (text.includes(w)) score += 3; });
      }
      return { article: a, score };
    }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);
    setBlogSuggestions(blogScored.slice(0, 2).map(s => s.article));
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
    <section className="py-14 px-5 bg-[#141414] border-y border-white/[0.08] relative">
      <div className="absolute inset-0 zellige-pattern opacity-40 pointer-events-none" />
      <div className="max-w-[800px] mx-auto relative z-10">
        <div className="text-center mb-8">
          <p className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.25em] mb-3">{t.search.tag}</p>
          <h2 className="text-[clamp(24px,4vw,42px)] font-extrabold leading-tight mb-2 font-serif text-white">
            {t.search.title1} <em className="text-[#E8732F] not-italic">{t.search.title2}</em>
          </h2>
          <p className="text-white/60 text-sm">{t.search.sub}</p>
        </div>

        <div ref={wrapRef} className="relative mb-6 z-50">
          <div className="relative">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#E8732F]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={localQuery}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => { if (localQuery) setShowSuggestions(true); }}
              placeholder={t.search.placeholder}
              className="w-full bg-white border-2 border-white/[0.08] hover:border-[#D4A574] rounded-2xl py-5 pl-14 pr-14 text-base text-white placeholder:text-[#D4A574]/60 focus:outline-none focus:border-[#E8732F]/60 transition-all duration-200 shadow-[0_8px_32px_rgba(61,43,31,0.08)]"
            />
            {localQuery ? (
              <button onClick={handleClear}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-[#D4A574]/40 text-white/60 hover:text-white flex items-center justify-center transition-all text-sm">✕</button>
            ) : (
              <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-[#E8732F]/10 border border-[#E8732F]/20 rounded-xl px-3 py-1.5 hidden sm:flex items-center gap-1.5">
                <svg className="w-3 h-3 text-[#E8732F]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-[#E8732F]/60 text-[11px] font-semibold">{t.search.btn}</span>
              </div>
            )}
          </div>

          {showSuggestions && localQuery.trim().length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-white/[0.08] rounded-2xl overflow-y-auto max-h-[520px] z-50 shadow-[0_24px_80px_rgba(61,43,31,0.15)]">
              {suggestions.length > 0 || blogSuggestions.length > 0 ? (
                <>
                  {suggestions.length > 0 && (
                    <>
                      <div className="px-4 pt-3 pb-1.5 text-[10px] text-[#D4A574] uppercase tracking-[0.15em] font-bold border-b border-white/[0.08]/50">
                        {suggestions.length} {suggestions.length > 1 ? t.search.founds : t.search.found}
                      </div>
                      {suggestions.map(p => (
                        <Link key={p.id} to={`/produit/${p.id}`} onClick={() => setShowSuggestions(false)}
                          className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#141414] transition-colors border-b border-white/[0.08]/40 last:border-0 group">
                          <img src={p.img} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-bold truncate text-white group-hover:text-[#E8732F] transition-colors">{p.name}</div>
                            <div className="text-[11px] text-white/60 truncate mt-0.5">{p.hook}</div>
                            <div className="text-[10px] text-[#D4A574] mt-0.5">{p.catLabel}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[#E8732F] font-extrabold text-[15px]">{p.price} DH</div>
                            {p.oldPrice && <div className="text-[#D4A574]/50 text-[11px] line-through">{p.oldPrice} DH</div>}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  {blogSuggestions.length > 0 && (
                    <>
                      <div className="px-4 pt-3 pb-1.5 text-[10px] text-[#D4A574] uppercase tracking-[0.15em] font-bold border-b border-white/[0.08]/50">
                        {t.search.blogResults}
                      </div>
                      {blogSuggestions.map(a => (
                        <Link key={a.id} to={`/blog/${a.id}`} onClick={() => setShowSuggestions(false)}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-[#141414] transition-colors border-b border-white/[0.08]/40 last:border-0 group">
                          <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 opacity-80" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate text-white group-hover:text-[#D4A574] transition-colors">{a.title}</div>
                            <div className="text-[10px] text-[#D4A574] mt-0.5">{a.category} · {a.readTime}</div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  <div className="px-4 py-3 border-t border-white/[0.08]/50">
                    <button onClick={() => { setShowSuggestions(false); document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="w-full text-center text-[12px] text-[#E8732F] font-semibold hover:text-[#c45e22] transition-colors">
                      {t.search.allResults}
                    </button>
                  </div>
                </>
              ) : (
                <ProductRequestForm query={localQuery} onClose={() => setShowSuggestions(false)} />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {QUICK_CHIPS.map((chip, i) => {
            const chipLabel = (t.search.chips as readonly string[])[i] ?? chip.label.split(' ').slice(1).join(' ');
            const emoji = chip.label.split(' ')[0];
            return (
              <button key={chip.query} onClick={() => handleChip(chip.query)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer border ${
                  searchQuery === chip.query
                    ? 'bg-[#E8732F] text-white border-[#E8732F]'
                    : 'bg-white border-white/[0.08] text-white/60 hover:bg-[#141414] hover:text-white hover:border-[#D4A574]'
                }`}>
                {emoji} {chipLabel}
              </button>
            );
          })}
          {searchQuery && (
            <button onClick={handleClear}
              className="px-4 py-2 rounded-full text-[12px] font-semibold border border-red-300 text-red-500/80 hover:bg-red-50 transition-all cursor-pointer">
              {t.search.clear}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCT NOT FOUND / AI FALLBACK ─── */
function ProductNotFound({ query, closest }: { query: string; closest: typeof PRODUCTS }) {
  return (
    <div className="col-span-full">
      <div className="bg-white gold-border rounded-2xl p-8 md:p-10 max-w-[680px] mx-auto">
        <ProductRequestForm query={query} />
        {closest.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <p className="text-[#D4A574] text-xs uppercase tracking-[0.15em] mb-4">Produits similaires</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {closest.map(p => (
                <Link key={p.id} to={`/produit/${p.id}`} className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-3 text-left hover:border-[#E8732F]/30 transition-colors block">
                  <img src={p.img} alt={p.name} className="w-full aspect-square object-cover rounded-lg mb-2" loading="lazy" />
                  <div className="text-xs font-semibold truncate text-white">{p.name}</div>
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

  const filtered = PRODUCTS.filter(p => {
    const catMatch = activeFilter === 'tous' || p.cat === activeFilter;
    if (!searchQuery.trim()) return catMatch;
    return catMatch && scoreProduct(p, searchQuery.toLowerCase()) > 0;
  });

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
    <section id="produits" className="py-24 px-5 bg-[#0A0A0A] zellige-pattern">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Nos Produits</div>
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-4 font-serif text-white">Formules du <em className="text-[#E8732F] not-italic">Sahara</em></h2>
        <p className="text-white/60 text-base mb-8 max-w-[600px]">Des formules naturelles élaborées avec soin dans le Sahara marocain par des femmes artisanes.</p>

        <ProductSearch onSearch={onSearch} value={searchQuery} />

        <div className="flex gap-2.5 mb-9 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setActiveFilter(cat.key)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.05em] transition-all cursor-pointer ${activeFilter === cat.key ? 'bg-[#141414] text-white' : 'bg-white border border-white/[0.08] text-white/60 hover:bg-[#141414] hover:border-[#D4A574]'}`}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="group bg-white gold-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A574]/60 hover:shadow-[0_20px_40px_rgba(61,43,31,0.12)]">
              <Link to={`/produit/${p.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-[#141414]/0 group-hover:bg-[#141414]/25 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-white text-white px-7 py-3 rounded-full text-xs font-bold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap shadow-md">Voir détails</span>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#E8732F] text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.05em] z-10">{p.badge}</span>
                </div>
              </Link>
              <div className="p-4">
                <div className="text-[10px] text-[#D4A574] uppercase tracking-[0.15em] font-bold mb-1.5">{p.catLabel}</div>
                <Link to={`/produit/${p.id}`}><h3 className="text-[15px] font-bold mb-2 leading-tight text-white hover:text-[#E8732F] transition-colors">{p.name}</h3></Link>
                <p className="text-[11px] text-white/60 leading-snug mb-3">{p.hook}</p>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#E8732F] text-xl font-extrabold">{p.price} DH</span>
                  {p.oldPrice && <span className="text-[#D4A574]/40 text-sm line-through">{p.oldPrice} DH</span>}
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/produit/${p.id}`} className="flex-1 text-center border border-white/[0.08] text-white/60 py-2 rounded-full text-[11px] font-semibold hover:border-[#E8732F] hover:text-[#E8732F] transition-colors">Détails</Link>
                  <Link to={`/produit/${p.id}`} className="flex-1 text-center bg-[#E8732F] text-white py-2 rounded-full text-[11px] font-bold hover:bg-[#c45e22] transition-colors">Commander</Link>
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
    <section id="avis" className="py-24 px-5 bg-[#141414] zellige-pattern">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Témoignages</div>
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-4 font-serif text-white">Ce Que Disent <em className="text-[#E8732F] not-italic">Nos Clients</em></h2>
        <p className="text-white/60 text-base mb-10 max-w-[600px]">Plus de 10 000 clients satisfaits font confiance à Dakhla Artisanal.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.id} className="bg-white gold-border rounded-2xl p-6 shadow-[0_4px_16px_rgba(61,43,31,0.06)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E8732F]/15 rounded-full flex items-center justify-center text-[#E8732F] font-bold text-sm">{r.avatar}</div>
                <div>
                  <div className="text-sm font-bold text-white">{r.name}</div>
                  <div className="text-[10px] text-[#D4A574]">{r.product}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < r.rating ? 'text-[#E8732F]' : 'text-white/60'}`}>★</span>
                ))}
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed mb-3">{r.text}</p>
              <p className="text-[10px] text-[#D4A574]/60">{r.date}</p>
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
    <section className="py-24 px-5 bg-[#0A0A0A]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[#E8732F] text-xs font-bold uppercase tracking-[0.2em] mb-4">Blog</div>
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold mb-4 font-serif text-white">Secrets de <em className="text-[#E8732F] not-italic">Beauté</em></h2>
        <p className="text-white/60 text-base mb-10 max-w-[600px]">Conseils, recettes et histoires autour des produits naturels du Sahara.</p>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {articles.map(a => (
            <Link key={a.id} to={`/blog/${a.id}`} className="group bg-white border border-white/[0.08] rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/30 hover:shadow-[0_8px_24px_rgba(61,43,31,0.10)] block">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-2">
                  <span className="text-[10px] bg-[#E8732F]/10 text-[#E8732F] px-2 py-0.5 rounded-full">{a.category}</span>
                  <span className="text-[10px] text-[#D4A574]">{a.readTime}</span>
                </div>
                <h3 className="text-[15px] font-bold mb-2 leading-tight text-white group-hover:text-[#E8732F] transition-colors">{a.title}</h3>
                <p className="text-[12px] text-white/60 leading-relaxed">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog" className="inline-block border border-white/[0.08] text-white/60 px-8 py-3 rounded-full text-sm font-semibold hover:border-[#E8732F] hover:text-[#E8732F] transition-colors bg-white">Voir tous les articles</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── YOUTUBE ─── */
function YouTube() {
  return (
    <section className="py-24 px-5 bg-[#141414]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#E8732F] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Notre Chaîne</div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold mb-4 font-serif text-white">
            Découvrez <em className="text-[#E8732F] not-italic">nos secrets</em> en vidéo
          </h2>
          <p className="text-white/60 text-base max-w-[500px] mx-auto">
            Tutoriels, recettes et coulisses de notre atelier artisanal du Sahara Marocain.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(61,43,31,0.14)] bg-[#141414]">
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=dakhlaartisanal"
              title="Dakhla Artisanal — Chaîne YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white">Dakhla Artisanal</div>
                <div className="text-white/60 text-sm">@dakhlaartisanal</div>
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3 font-serif">Secrets du Sahara en vidéo</h3>
            <p className="text-white/60 leading-relaxed mb-6">
              Rejoignez notre communauté et découvrez les secrets de beauté ancestraux du Sahara Marocain. Tutoriels, recettes naturelles et histoires de nos artisanes — directement depuis nos ateliers.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: '🎥', label: 'Tutoriels beauté' },
                { icon: '🌿', label: 'Recettes naturelles' },
                { icon: '👩‍🍳', label: 'Coulisses atelier' },
                { icon: '📦', label: 'Unboxing produits' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 bg-white border border-white/[0.08] rounded-xl px-3 py-2.5">
                  <span>{item.icon}</span>
                  <span className="text-white/60 text-[12px] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            <a href="https://www.youtube.com/@dakhlaartisanal" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-red-700 transition-colors shadow-[0_4px_16px_rgba(220,38,38,0.30)]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Voir la chaîne YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="contact" className="py-24 px-5 text-center bg-[#141414] relative overflow-hidden">
      <div className="absolute inset-0 zellige-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8732F]/[0.12] blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="text-[#D4A574] text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Commandez Maintenant</div>
        <h2 className="text-[clamp(36px,5vw,64px)] font-extrabold mb-5 font-serif text-white">Prêt à <em className="text-[#E8732F] not-italic">commander?</em></h2>
        <p className="text-white/70 text-lg mb-9 max-w-[500px] mx-auto">Livraison partout au Maroc. Paiement à la livraison disponible. Commandez sur WhatsApp.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#E8732F] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#c45e22] transition-colors shadow-[0_8px_32px_rgba(196,98,45,0.40)]">Commander sur WhatsApp — +212 677 031 561</a>
          <a href="#produits" className="inline-flex items-center gap-2 border border-[#D4A574]/40 text-white/60 px-8 py-4 rounded-full text-sm font-semibold hover:border-[#D4A574] hover:text-white transition-colors">Voir les produits</a>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-6 px-5">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-9">
        <div>
          <div className="font-serif text-xl font-bold text-[#D4A574] tracking-[0.12em] leading-none mb-3">
            DAKHLA<span className="block text-[8px] text-[#D4A574]/50 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
          <p className="text-white/40 text-[13px] leading-relaxed">Produits naturels artisanaux du Sahara Marocain. Fabriqués avec passion par des femmes artisanes de Dakhla.</p>
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
          <a href="https://web.facebook.com/dakhlaartisanal.maroc" target="_blank" rel="noopener noreferrer" className="block text-white/30 text-[13px] mb-2.5 hover:text-[#1877F2] transition-colors">Facebook: dakhlaartisanal</a>
          <a href="https://www.youtube.com/@dakhlaartisanal" target="_blank" rel="noopener noreferrer" className="block text-white/30 text-[13px] mb-2.5 hover:text-red-500 transition-colors">YouTube: @dakhlaartisanal</a>
          <span className="block text-white/30 text-[13px] mb-2.5">Dakhla, Sahara Marocain</span>
        </div>
      </div>
      <div className="border-t border-white/[0.08]/[0.06] pt-5 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-2 items-center">
        <p className="text-white/15 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
        <div className="flex items-center gap-4">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="text-white/60/20 hover:text-[#25D366] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.84L.055 23.454a.5.5 0 00.491.617l5.741-.055A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-4.98-1.363l-.356-.212-3.697.035.978-3.595-.232-.37A9.794 9.794 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
          </a>
          <a href="https://web.facebook.com/dakhlaartisanal.maroc" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="text-white/60/20 hover:text-[#1877F2] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/@dakhlaartisanal" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
            className="text-white/60/20 hover:text-red-500 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
        <p className="text-white/15 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
      </div>
    </footer>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <Hero />
      <TrustStrip />
      <HeroSearch onSearch={setSearchQuery} searchQuery={searchQuery} />
      <Bestsellers />
      <Story />
      <Ingredients />
      <Products searchQuery={searchQuery} onSearch={setSearchQuery} />
      <Reviews />
      <BlogPreview />
      <YouTube />
      <CTA />
      <Footer />
      <OrderModal />
    </div>
  );
}
