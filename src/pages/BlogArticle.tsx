import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_ARTICLES } from '../data/blog';
import { WHATSAPP_NUMBER } from '../data/products';

function Navbar() {
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
          <Link to="/" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">Accueil</Link>
          <Link to="/blog" className="text-white/60 text-sm font-medium hover:text-[#E8732F] transition-colors">Blog</Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#c45e22] transition-colors">WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const article = BLOG_ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-[#E8732F] hover:underline">Retour au blog</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      <div className="pt-28 pb-4 px-5">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 text-[12px] text-[#D4A574]">
            <Link to="/" className="hover:text-[#E8732F] transition-colors">Accueil</Link><span>/</span>
            <Link to="/blog" className="hover:text-[#E8732F] transition-colors">Blog</Link><span>/</span>
            <span className="text-white/60">{article.title}</span>
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
            <span className="text-[10px] bg-[#E8732F] text-white px-3 py-1 rounded-full font-bold">{article.category}</span>
            <span className="text-[12px] text-[#D4A574]">{article.date}</span>
            <span className="text-[12px] text-[#D4A574]">{article.readTime} de lecture</span>
          </div>
          <h1 className="text-[clamp(24px,4vw,40px)] font-extrabold mb-4 leading-tight font-serif text-white">{article.title}</h1>
          <p className="text-[#D4A574] text-sm mb-6" dir="rtl">مقال Dakhla Artisanal</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="prose-custom text-white/60 text-base leading-[1.9]">
            {article.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4 font-serif">{paragraph.replace('## ', '')}</h2>;
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
              if (paragraph.match(/^\d+\./)) {
                return <p key={i} className="my-3 pl-4 border-l-2 border-[#E8732F]/30">{paragraph}</p>;
              }
              return <p key={i} className="my-4">{paragraph}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#141414] border border-white/[0.08] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3 font-serif text-white">Découvrez nos produits</h3>
            <p className="text-white/60 text-sm mb-6">Transformez votre routine beauté avec les secrets du Sahara Marocain.</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#E8732F] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#c45e22] transition-colors shadow-[0_4px_16px_rgba(196,98,45,0.25)]">Commander sur WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 px-5 bg-[#141414]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-xl font-bold mb-6 font-serif text-white">Articles <em className="text-[#E8732F] not-italic">similaires</em></h2>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map(a => (
                <Link key={a.id} to={`/blog/${a.id}`} className="group bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/30 hover:shadow-[0_8px_24px_rgba(61,43,31,0.10)] block">
                  <div className="aspect-[16/10] overflow-hidden bg-[#141414]">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] bg-[#E8732F]/10 text-[#E8732F] px-2 py-0.5 rounded-full">{a.category}</span>
                    <h3 className="text-sm font-bold mt-2 text-white group-hover:text-[#E8732F] transition-colors">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#0A0A0A] border-t border-white/[0.08]/10 pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/15 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
          <p className="text-white/15 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
        </div>
      </footer>
    </div>
  );
}
