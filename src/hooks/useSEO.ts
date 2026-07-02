import { useEffect } from 'react';

interface SEOMeta {
  title: string;
  description: string;
  url?: string;
  image?: string;
  lang?: string;
}

export function useSEO({ title, description, url, image, lang = 'fr' }: SEOMeta) {
  useEffect(() => {
    const fullTitle = `${title} | Dakhla Artisanal`;
    const canonical = url ? `https://www.dakhlaartisanal.com${url}` : 'https://www.dakhlaartisanal.com';
    const ogImage = image || 'https://www.dakhlaartisanal.com/images/og-default.jpg';

    document.title = fullTitle;
    document.documentElement.lang = lang === 'ar' ? 'ar' : lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'fr';

    const setMeta = (sel: string, val: string) => {
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const attr = sel.includes('[name=') ? 'name' : 'property';
        const key = sel.replace(/.*\["?([^"'\]]+)"?\].*/, '$1');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('[name="description"]', description);
    setMeta('[property="og:title"]', fullTitle);
    setMeta('[property="og:description"]', description);
    setMeta('[property="og:url"]', canonical);
    setMeta('[property="og:image"]', ogImage);
    setMeta('[property="og:type"]', 'website');
    setMeta('[property="og:site_name"]', 'Dakhla Artisanal');
    setMeta('[name="twitter:card"]', 'summary_large_image');
    setMeta('[name="twitter:title"]', fullTitle);
    setMeta('[name="twitter:description"]', description);
    setMeta('[name="twitter:image"]', ogImage);
    setLink('canonical', canonical);
  }, [title, description, url, image, lang]);
}
