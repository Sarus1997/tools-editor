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

  // ตรวจสอบการ scroll
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

  // ปิด dropdown เมื่อคลิกนอก
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl"
          : "bg-white dark:bg-zinc-900"
          }`}
        style={{
          background: scrolled
            ? theme === "light"
              ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)"
              : "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(9,9,11,0.95) 100%)"
            : theme === "light"
              ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
              : "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
        }}
      >
        {/* Decorative top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="mx-auto max-w-350 px-6 h-20 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* Hamburger button with animation */}
            <button
              onClick={() => setOpen(true)}
              className="relative flex flex-col justify-center items-center w-10 h-10 md:hidden rounded-xl overflow-hidden group"
              aria-label="Open menu"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* Animated hamburger lines */}
              <div className="flex flex-col items-center w-6 space-y-1.5">
                <span
                  className={`h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transform transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""
                    }`}
                ></span>
                <span
                  className={`h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${open ? "opacity-0" : "opacity-100"
                    }`}
                ></span>
                <span
                  className={`h-0.5 w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transform transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""
                    }`}
                ></span>
              </div>
            </button>

            {/* Logo with hover effects */}
            <Link
              href="/"
              className="relative flex items-center gap-3"
              onMouseEnter={() => setIsHoverLogo(true)}
              onMouseLeave={() => setIsHoverLogo(false)}
            >
              {/* Animated background effect */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 transition-all duration-500 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10"></div>

              {/* Icon with glow effect */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-2xl">📄</span>
                </div>
              </div>

              {/* Logo text with gradient animation */}
              <div className="relative">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  PDF EDITOR
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                  {lang === "en" && "Professional PDF Tools"}
                  {lang === "th" && "เครื่องมือจัดการ PDF มืออาชีพ"}
                  {lang === "ja" && "プロフェッショナルPDFツール"}
                </p>
              </div>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-2">
            {/* Navigation links with hover effects */}
            <div className="flex items-center gap-1 mr-2">
              <Link
                className="relative px-5 py-2.5 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group"
                href="/"
              >
                <span className="relative z-10">
                  {lang === "en" && "Home"}
                  {lang === "th" && "หน้าแรก"}
                  {lang === "ja" && "ホーム"}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              </Link>

              <Link
                className="relative px-5 py-2.5 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group"
                href="/about"
              >
                <span className="relative z-10">
                  {lang === "en" && "About"}
                  {lang === "th" && "เกี่ยวกับ"}
                  {lang === "ja" && "概要"}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              </Link>

              <Link
                className="relative px-5 py-2.5 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group"
                href="/contact"
              >
                <span className="relative z-10">
                  {lang === "en" && "Contact"}
                  {lang === "th" && "ติดต่อ"}
                  {lang === "ja" && "お問い合わせ"}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent mx-2"></div>

            {/* THEME toggle button with animation */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-12 h-12 rounded-2xl group"
              aria-label="Toggle theme"
            >
              {/* Background effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                {theme === "light" ? (
                  <div className="relative">
                    <span className="text-xl">🌙</span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <span className="text-xl">☀️</span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                )}
              </div>
            </button>

            {/* LANGUAGE DROPDOWN - Premium version */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(prev => !prev)}
                className="relative flex items-center gap-3 rounded-2xl px-4 py-3 group overflow-hidden"
                aria-label="Select language"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>

                {/* Border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative w-8 h-6 overflow-hidden rounded-md shadow-md">
                    <Image
                      src={LANG_FLAG[lang]}
                      alt={lang}
                      width={32}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {lang}
                  </span>
                  <svg
                    className={`w-4 h-4 text-purple-500 transform transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Dropdown menu */}
              {langOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in"
                >
                  {/* Dropdown header */}
                  <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      {lang === "en" && "Select Language"}
                      {lang === "th" && "เลือกภาษา"}
                      {lang === "ja" && "言語を選択"}
                    </p>
                  </div>

                  {/* Language options */}
                  <div className="p-2">
                    {(Object.keys(LANG_LABEL) as Lang[]).map(l => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`flex w-full items-center gap-4 px-4 py-3.5 rounded-xl mb-1 last:mb-0 transition-all duration-300 group ${lang === l
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 shadow-sm"
                          : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80"
                          }`}
                      >
                        <div className={`relative w-9 h-7 overflow-hidden rounded-md shadow-sm ${lang === l ? "ring-2 ring-indigo-500" : ""}`}>
                          <Image
                            src={LANG_FLAG[l]}
                            alt={l}
                            width={36}
                            height={28}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className={`font-medium ${lang === l ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-300"}`}>
                            {LANG_LABEL[l]}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase">
                            {l}
                          </span>
                        </div>
                        {lang === l && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
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

      {/* Floating particles effect (optional) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </>
  );
}