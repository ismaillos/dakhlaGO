import { Link } from 'react-router-dom';
import { BLOG_ARTICLES } from '../data/blog';
import { WHATSAPP_NUMBER } from '../data/products';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-xl border-b border-[#E8D2AE]">
      <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link to="/" className="block">
          <div className="font-serif text-[22px] font-bold text-[#B98A5A] tracking-[0.15em] leading-none">
            DAKHLA<span className="block text-[9px] text-[#B98A5A]/60 font-light tracking-[0.5em] font-sans mt-0.5">ARTISANAL</span>
            <span className="block text-[9px] text-[#6B8E5E] tracking-[0.2em] italic mt-[3px]">Nature&apos;s Touch</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[#7A5C45] text-sm font-medium hover:text-[#C4622D] transition-colors">Accueil</Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#C4622D] text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-[#A8501F] transition-colors">WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#3D2B1F]">
      <Navbar />

      <div className="pt-28 pb-8 px-5 bg-gradient-to-b from-[#F5E9D5] to-[#FAF7F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-[12px] text-[#B98A5A] mb-6">
            <Link to="/" className="hover:text-[#C4622D] transition-colors">Accueil</Link><span>/</span><span className="text-[#7A5C45]">Blog</span>
          </div>
          <div className="text-[#C4622D] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Conseils & Recettes</div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold mb-4 font-serif text-[#3D2B1F]">Blog <em className="text-[#C4622D] not-italic">Dakhla</em></h1>
          <p className="text-[#7A5C45] text-lg max-w-[600px]">Conseils, recettes et histoires autour des produits naturels du Sahara Marocain.</p>
        </div>
      </div>

      <section className="px-5 pb-24">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map(a => (
            <Link key={a.id} to={`/blog/${a.id}`} className="group bg-white border border-[#E8D2AE] rounded-2xl overflow-hidden transition-all hover:border-[#C4622D]/30 hover:shadow-[0_8px_24px_rgba(61,43,31,0.10)] block">
              <div className="aspect-[16/10] overflow-hidden bg-[#F5E9D5]">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] bg-[#C4622D]/10 text-[#C4622D] px-2.5 py-0.5 rounded-full font-semibold">{a.category}</span>
                  <span className="text-[10px] text-[#B98A5A]">{a.readTime} de lecture</span>
                </div>
                <h2 className="text-lg font-bold mb-2 text-[#3D2B1F] group-hover:text-[#C4622D] transition-colors leading-snug">{a.title}</h2>
                <p className="text-[13px] text-[#7A5C45] leading-relaxed mb-3">{a.excerpt}</p>
                <span className="text-[11px] text-[#B98A5A]/60">{a.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-[#2E1F15] border-t border-[#E8D2AE]/10 pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[#E8D2AE]/15 text-[11px]">&copy; 2025 Dakhla Artisanal — Nature&apos;s Touch</p>
          <p className="text-[#E8D2AE]/15 text-[11px]">Sahara Marocain — الصحراء المغربية</p>
        </div>
      </footer>
    </div>
  );
}
