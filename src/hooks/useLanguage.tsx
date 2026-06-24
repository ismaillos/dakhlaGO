import { createContext, useContext, useEffect, useState } from 'react';
import { LANGS, translations } from '../i18n/translations';
import type { Lang, Translations } from '../i18n/translations';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('dakhla-lang');
    return (stored as Lang) || 'fr';
  });

  const setLang = (l: Lang) => {
    localStorage.setItem('dakhla-lang', l);
    setLangState(l);
  };

  const dir = LANGS.find(x => x.code === lang)?.dir ?? 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] as unknown as Translations, dir }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
