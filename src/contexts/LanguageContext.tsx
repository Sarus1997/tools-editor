/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "th" | "ja";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LangContextType | null>(null);

const LANGS: Lang[] = ["en", "th", "ja"];

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") as Lang | null;
    if (savedLang && LANGS.includes(savedLang)) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("appLanguage", newLang);
  };

  const toggleLang = () => {
    const currentIndex = LANGS.indexOf(lang);
    const nextLang = LANGS[(currentIndex + 1) % LANGS.length];
    setLang(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
