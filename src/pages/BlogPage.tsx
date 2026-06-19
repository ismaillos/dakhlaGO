import { Link } from 'react-router-dom';
import { BLOG_ARTICLES } from '../data/blog';
import { WHATSAPP_NUMBER } from '../data/products';

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
          <Link to="/" className="text-white/50 text-sm font-medium hover:text-[#E8732F] transition-colors">Accueil</Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#E8732F] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#d46726] transition-colors">WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="pt-28 pb-8 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-[12px] text-white/30 mb-6">
            <Link to="/" className="hover:text-[#E8732F] transition-colors">Accueil</Link><span>/</span><span className="text-white/50">Blog</span>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold mb-4">Blog <em className="text-[#E8732F] not-italic">Dakhla</em></h1>
          <p className="text-white/40 text-lg max-w-[600px]">Conseils, recettes et histoires autour des produits naturels du Sahara Marocain.</p>
        </div>
      </div>

      <section className="px-5 pb-24">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map(a => (
            <Link key={a.id} to={`/blog/${a.id}`} className="group bg-[#141414] border border-white/[0.04] rounded-2xl overflow-hidden transition-all hover:border-[#E8732F]/20 block">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] bg-[#E8732F]/10 text-[#E8732F] px-2.5 py-0.5 rounded-full font-semibold">{a.category}</span>
                  <span className="text-[10px] text-white/30">{a.readTime} de lecture</span>
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:text-[#E8732F] transition-colors leading-snug">{a.title}</h2>
                <p className="text-[13px] text-white/40 leading-relaxed mb-3">{a.excerpt}</p>
                <span className="text-[11px] text-white/20">{a.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-[#050505] border-t border-white/[0.03] pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/10 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
          <p className="text-white/10 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
        </div>
      </footer>
    </div>
  );
}
