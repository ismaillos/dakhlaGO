import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CartProvider } from './hooks/useCart';
import { LanguageProvider } from './hooks/useLanguage';
import GaTracker from './components/GaTracker';
import Home from './pages/Home';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ReturnPolicyPage = lazy(() => import('./pages/ReturnPolicyPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

export default function App() {
  return (
    <LanguageProvider>
    <CartProvider>
      <GaTracker />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/produits/:cat" element={<ProductsPage />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/politique-retour" element={<ReturnPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </CartProvider>
    </LanguageProvider>
  );
}
