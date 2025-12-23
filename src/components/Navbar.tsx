/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLanguage, Lang } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "./Sidebar";

const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  th: "ไทย",
  ja: "日本語",
};

const LANG_FLAG: Record<Lang, string> = {
  en: "/flag/england.svg",
  th: "/flag/thailand.svg",
  ja: "/flag/japan.svg",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHoverLogo, setIsHoverLogo] = useState(false);

  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-700 ${scrolled
          ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl shadow-indigo-500/5"
          : "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm"
          }`}
      >
        {/* Animated linear line */}
        <div className="h-1 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-linear-x"></div>

        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between relative">
          {/* Ambient glow effect */}
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

          {/* LEFT SECTION */}
          <div className="flex items-center gap-4 relative z-10">
            {/* Premium Hamburger Button */}
            <button
              onClick={() => setOpen(true)}
              className="relative flex flex-col justify-center items-center w-11 h-11 md:hidden rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105"
              aria-label="Open menu"
            >
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

              <div className="flex flex-col items-center w-6 space-y-1.5 relative z-10">
                <span className="h-0.5 w-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50 transform transition-all duration-300"></span>
                <span className="h-0.5 w-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 transition-all duration-300"></span>
                <span className="h-0.5 w-full rounded-full bg-linear-to-r from-pink-500 to-indigo-500 shadow-lg shadow-pink-500/50 transform transition-all duration-300"></span>
              </div>
            </button>

            {/* Premium Logo */}
            <Link
              href="/"
              className="relative group"
              onMouseEnter={() => setIsHoverLogo(true)}
              onMouseLeave={() => setIsHoverLogo(false)}
            >
              <div className="flex items-center gap-3">
                {/* Icon Container with 3D effect */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse-slow"></div>
                  <div className="relative flex items-center justify-center w-14 h-14 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-600 rounded-2xl shadow-2xl shadow-indigo-500/50 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
                    <span className="text-3xl relative z-10 transform group-hover:scale-110 transition-transform duration-500">📄</span>
                  </div>
                  {/* Orbiting dots */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-linear-to-r from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/50 animate-bounce-slow"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-linear-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg shadow-indigo-500/50 animate-bounce-delayed"></div>
                </div>

                {/* Text Container */}
                <div className="relative">
                  <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-linear-x bg-size-[200%_auto] tracking-tight">
                    TOOLS EDITOR
                  </h1>
                  <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 font-semibold tracking-widest uppercase mt-0.5">
                    {lang === "en" && "Professional Suite"}
                    {lang === "th" && "ชุดเครื่องมือมืออาชีพ"}
                    {lang === "ja" && "プロフェッショナルスイート"}
                  </p>
                  {/* Animated underline */}
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-3 relative z-10">
            {/* Navigation Links */}
            <div className="flex items-center gap-1 mr-2">
              {[
                { href: "/", en: "Home", th: "หน้าแรก", ja: "ホーム" },
                { href: "/about", en: "About", th: "เกี่ยวกับ", ja: "概要" },
                { href: "/contact", en: "Contact", th: "ติดต่อ", ja: "お問い合わせ" }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  className="relative px-4 py-2.5 rounded-xl font-semibold text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group overflow-hidden"
                  href={item.href}
                >
                  <span className="relative z-10">
                    {lang === "en" && item.en}
                    {lang === "th" && item.th}
                    {lang === "ja" && item.ja}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                </Link>
              ))}
            </div>

            {/* Elegant Divider */}
            <div className="relative h-8 w-px mx-2">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"></div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-500/30 to-transparent animate-pulse-slow"></div>
            </div>

            {/* Theme Toggle - Glassmorphism Style */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-12 h-12 rounded-2xl group overflow-hidden transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-100/80 to-white/80 dark:from-zinc-800/80 dark:to-zinc-900/80 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
              <div className="absolute inset-0 border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl group-hover:border-indigo-500/50 transition-all duration-500"></div>

              <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                {theme === "light" ? (
                  <div className="relative">
                    <span className="text-2xl drop-shadow-lg">🌙</span>
                    <div className="absolute -inset-2 bg-indigo-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <span className="text-2xl drop-shadow-lg">☀️</span>
                    <div className="absolute -inset-2 bg-amber-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>
                )}
              </div>
            </button>

            {/* Language Dropdown - Ultra Premium */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(prev => !prev)}
                className="relative flex items-center gap-2.5 rounded-2xl px-4 py-2.5 group overflow-hidden transition-all duration-300 hover:scale-105"
                aria-label="Select language"
              >
                <div className="absolute inset-0 bg-linear-to-br from-zinc-100/80 to-white/80 dark:from-zinc-800/80 dark:to-zinc-900/80 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <div className="absolute inset-0 border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl group-hover:border-purple-500/50 transition-all duration-500"></div>

                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="relative w-7 h-5 overflow-hidden rounded-md shadow-lg ring-1 ring-black/5">
                    <Image
                      src={LANG_FLAG[lang]}
                      alt={lang}
                      width={28}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {lang}
                  </span>
                  <svg
                    className={`w-4 h-4 text-purple-500 transform transition-all duration-500 ${langOpen ? "rotate-180 scale-110" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Premium Dropdown Menu */}
              {langOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden animate-dropdown">
                  {/* linear overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

                  {/* Header */}
                  <div className="relative px-5 py-4 border-b border-zinc-100/50 dark:border-zinc-800/50 bg-linear-to-r from-zinc-50/50 to-white/50 dark:from-zinc-800/50 dark:to-zinc-900/50">
                    <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300 tracking-wide">
                      {lang === "en" && "🌍 Select Language"}
                      {lang === "th" && "🌍 เลือกภาษา"}
                      {lang === "ja" && "🌍 言語を選択"}
                    </p>
                  </div>

                  {/* Language Options */}
                  <div className="p-2 relative">
                    {(Object.keys(LANG_LABEL) as Lang[]).map((l, idx) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`flex w-full items-center gap-4 px-4 py-3.5 rounded-xl mb-1.5 last:mb-0 transition-all duration-300 group relative overflow-hidden ${lang === l
                          ? "bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                          : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 hover:scale-[1.01]"
                          }`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {lang === l && (
                          <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-pulse-slow"></div>
                        )}

                        <div className={`relative w-10 h-7 overflow-hidden rounded-lg shadow-md transition-all duration-300 ${lang === l ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 scale-110" : "group-hover:scale-105"
                          }`}>
                          <Image
                            src={LANG_FLAG[l]}
                            alt={l}
                            width={40}
                            height={28}
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col items-start flex-1">
                          <span className={`font-bold text-sm transition-colors duration-300 ${lang === l ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                            }`}>
                            {LANG_LABEL[l]}
                          </span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold">
                            {l}
                          </span>
                        </div>

                        {lang === l && (
                          <div className="relative">
                            <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50 animate-pulse"></div>
                            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 animate-ping"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Floating Particles */}
      <div className="fixed top-0 left-0 w-full h-32 pointer-events-none z-40 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-linear-to-r from-indigo-400/40 to-purple-400/40 shadow-lg shadow-indigo-500/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <style jsx global>{`
        @keyframes linear-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(10px) rotate(180deg); 
            opacity: 0.8;
          }
        }
        
        @keyframes dropdown {
          from { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes bounce-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        .animate-linear-x {
          animation: linear-x 3s ease infinite;
        }
        
        .animate-dropdown {
          animation: dropdown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-delayed {
          animation: bounce-delayed 2.5s ease-in-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
}