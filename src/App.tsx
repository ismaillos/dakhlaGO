import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { LanguageProvider } from './hooks/useLanguage';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <LanguageProvider>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produit/:id" element={<ProductPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
    </LanguageProvider>
  );
}
