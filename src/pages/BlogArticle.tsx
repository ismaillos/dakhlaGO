import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../data/blog';
import { WHATSAPP_NUMBER } from '../data/products';
import { useLang } from '../hooks/useLanguage';
import { LANGS } from '../i18n/translations';

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
        className="flex items-center gap-1.5 text-[#4A3728]/70 hover:text-[#E8732F] transition-colors text-[13px] font-medium px-2 py-1 rounded-lg">
        <span>{current.flag}</span>
        <span className="uppercase text-[11px] font-bold tracking-wide">{current.code}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#C4A882]/20 rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.15)] z-50 min-w-[130px]">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors text-left ${l.code === lang ? 'bg-[#E8732F]/10 text-[#E8732F]' : 'text-[#2D1F0A] hover:bg-[#FAF6EF] hover:text-[#E8732F]'}`}>
              <span className="text-base">{l.flag}</span>
              <span className="font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const { t } = useLang();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#C4A882]/20">
      <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="block">
          <div className="font-serif text-[22px] font-bold text-[#8B5E34] tracking-[0.15em] leading-none">
            DAKHLA<span className="block text-[9px] text-[#8B5E34]/60 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#5B7B5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[#4A3728]/70 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.blogArticle.home}</Link>
          <Link to="/blog" className="text-[#4A3728]/70 text-sm font-medium hover:text-[#E8732F] transition-colors">{t.blogArticle.blog}</Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#c45e22] transition-colors">WhatsApp</a>
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const article = BLOG_ARTICLES.find(a => a.id === id);

  const getTitle = (a: typeof BLOG_ARTICLES[0]) =>
    lang === 'ar' ? (a.titleAr || a.title) :
    lang === 'en' ? (a.titleEn || a.title) :
    lang === 'es' ? (a.titleEs || a.title) : a.title;

  const getCategory = (a: typeof BLOG_ARTICLES[0]) =>
    lang === 'ar' ? (a.categoryAr || a.category) :
    lang === 'en' ? (a.categoryEn || a.category) :
    lang === 'es' ? (a.categoryEs || a.category) : a.category;

  const getContent = (a: typeof BLOG_ARTICLES[0]) =>
    lang === 'ar' ? (a.contentAr || a.content) :
    lang === 'en' ? (a.contentEn || a.content) :
    lang === 'es' ? (a.contentEs || a.content) : a.content;

  if (!article) {
    return (
      <div className="min-h-screen bg-white text-[#2D1F0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.blogArticle.notFound}</h1>
          <Link to="/blog" className="text-[#E8732F] hover:underline">{t.blogArticle.backBlog}</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <div className="min-h-screen bg-white text-[#2D1F0A]">
      <Navbar />

      <div className="pt-28 pb-4 px-5">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 text-[12px] text-[#8B5E34]">
            <Link to="/" className="hover:text-[#E8732F] transition-colors">{t.blogArticle.home}</Link><span>/</span>
            <Link to="/blog" className="hover:text-[#E8732F] transition-colors">{t.blogArticle.blog}</Link><span>/</span>
            <span className="text-[#4A3728]/60">{getTitle(article)}</span>
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <section className="px-5 pb-8">
        <div className="max-w-[800px] mx-auto">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-[0_8px_32px_rgba(61,43,31,0.12)]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="eager" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] bg-[#E8732F] text-white px-3 py-1 rounded-full font-bold">{getCategory(article)}</span>
            <span className="text-[12px] text-[#8B5E34]">{article.date}</span>
            <span className="text-[12px] text-[#8B5E34]">{article.readTime} {t.blogArticle.readTime}</span>
          </div>
          <h1 className="text-[clamp(24px,4vw,40px)] font-extrabold mb-4 leading-tight font-serif text-[#2D1F0A]">{getTitle(article)}</h1>
          <p className="text-[#8B5E34] text-sm mb-6" dir="rtl">{t.blogArticle.articleBy}</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="prose-custom text-[#4A3728] text-base leading-[1.9]">
            {getContent(article).split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## Commander')) {
                return (
                  <div key={i} className="my-8 rounded-2xl p-6 text-center border border-[#C4A882]/30 bg-[#FAF6EF]">
                    <button
                      onClick={() => navigate(article.ctaUrl)}
                      className="inline-block text-white px-8 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                      style={{ background: article.ctaColor }}
                    >
                      🛒 {article.ctaLabel}
                    </button>
                    <p className="text-[#4A3728]/50 text-xs mt-3">{t.blogArticle.orderDelivery}</p>
                  </div>
                );
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold text-[#2D1F0A] mt-10 mb-4 font-serif">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('[IMAGE:')) {
                const imgPath = paragraph.replace('[IMAGE:', '').replace(']', '');
                return (
                  <div key={i} className="my-6 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(61,43,31,0.10)]">
                    <img src={imgPath} alt="" className="w-full object-cover" loading="lazy" />
                  </div>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={i} className="text-[#E8732F] font-semibold my-4">{paragraph.replace(/\*\*/g, '')}</p>;
              }
              if (paragraph.match(/^\*\*\[/)) {
                return null;
              }
              if (paragraph.match(/^\d+\./)) {
                return <p key={i} className="my-3 pl-4 border-l-2 border-[#E8732F]/30">{paragraph}</p>;
              }
              return <p key={i} className="my-4">{paragraph}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl p-8 text-center border border-[#C4A882]/30 bg-[#FAF6EF]">
            <h3 className="text-xl font-bold mb-3 font-serif text-[#2D1F0A]">{t.blogArticle.orderTitle}</h3>
            <p className="text-[#4A3728]/60 text-sm mb-6">{t.blogArticle.orderSub}</p>
            <button
              onClick={() => navigate(article.ctaUrl)}
              className="inline-block text-white px-8 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90 shadow-[0_4px_16px_rgba(0,0,0,0.15)] mr-3"
              style={{ background: article.ctaColor }}
            >
              🛒 {article.ctaLabel}
            </button>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)]">{t.blogArticle.whatsapp}</a>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 px-5 bg-[#FAF6EF]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-xl font-bold mb-6 font-serif text-[#2D1F0A]">{t.blogArticle.related} <em className="text-[#E8732F] not-italic">{t.blogArticle.relatedEm}</em></h2>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map(a => (
                <Link key={a.id} to={`/blog/${a.id}`} className="group bg-white border border-[#C4A882]/20 rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/30 hover:shadow-[0_8px_24px_rgba(61,43,31,0.10)] block">
                  <div className="aspect-[16/10] overflow-hidden bg-[#F0E8D8]">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] bg-[#E8732F]/10 text-[#E8732F] px-2 py-0.5 rounded-full">{getCategory(a)}</span>
                    <h3 className="text-sm font-bold mt-2 text-[#2D1F0A] group-hover:text-[#E8732F] transition-colors">{getTitle(a)}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#FAF6EF] border-t border-[#C4A882]/20 pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[#4A3728]/40 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
          <p className="text-[#4A3728]/40 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
        </div>
      </footer>
    </div>
  );
}
