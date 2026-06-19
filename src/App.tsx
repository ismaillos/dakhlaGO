import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produit/:id" element={<ProductPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
      </Routes>
    </CartProvider>
  );
}
