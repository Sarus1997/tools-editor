/* eslint-disable react-hooks/purity */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage, Lang } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

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

const MENU_ITEMS = [
  {
    href: "/",
    en: "Home",
    th: "หน้าแรก",
    ja: "ホーム",
    icon: "🏠",
    linear: "from-blue-500 to-cyan-500"
  },
  {
    href: "/about",
    en: "About",
    th: "เกี่ยวกับ",
    ja: "概要",
    icon: "📖",
    linear: "from-purple-500 to-pink-500"
  },
  {
    href: "/contact",
    en: "Contact",
    th: "ติดต่อ",
    ja: "お問い合わせ",
    icon: "📞",
    linear: "from-orange-500 to-red-500"
  },
  {
    href: "/features",
    en: "Features",
    th: "ฟีเจอร์",
    ja: "特徴",
    icon: "✨",
    linear: "from-green-500 to-emerald-500"
  },
  {
    href: "/pricing",
    en: "Pricing",
    th: "ราคา",
    ja: "料金",
    icon: "💰",
    linear: "from-yellow-500 to-amber-500"
  },
  {
    href: "/tools",
    en: "Tools",
    th: "เครื่องมือ",
    ja: "ツール",
    icon: "🛠️",
    linear: "from-indigo-500 to-blue-500"
  }
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState("/");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const getLabel = (item: typeof MENU_ITEMS[0]) => {
    return item[lang as keyof typeof item] || item.en;
  };

  return (
    <>
      {/* Overlay with animated linear */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-700 ease-in-out ${open
          ? "visible opacity-100 backdrop-blur-md"
          : "invisible opacity-0 backdrop-blur-0"
          }`}
        onClick={onClose}
      >
        {/* Animated linear background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-linear-to-r from-indigo-400/40 to-purple-400/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 7}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm transition-all duration-700 ease-out ${open ? "translate-x-0" : "-translate-x-full"
          }`}
        ref={sidebarRef}
      >
        {/* Sidebar with glass morphism effect */}
        <aside
          className="relative h-full w-full overflow-hidden"
          style={{
            background: theme === "light"
              ? "linear-linear(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)"
              : "linear-linear(145deg, rgba(15,15,20,0.95) 0%, rgba(9,9,12,0.95) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Decorative linear border */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"></div>

          {/* Animated floating orbs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-linear-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-linear-to-r from-pink-500/20 to-orange-500/20 blur-3xl"></div>

          {/* Header section */}
          <div className="relative z-10 p-8 border-b border-white/10 dark:border-zinc-800/50">
            <div className="flex items-center justify-between mb-6">
              {/* Logo with animation */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
                  <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500">
                    <span className="text-3xl">📄</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-linear">
                    PDF EDITOR
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {lang === "en" && "Professional Tools"}
                    {lang === "th" && "เครื่องมือระดับมืออาชีพ"}
                    {lang === "ja" && "プロフェッショナルツール"}
                  </p>
                </div>
              </div>

              {/* Close button with animation */}
              <button
                onClick={onClose}
                className="relative group w-12 h-12 rounded-2xl flex items-center justify-center"
                aria-label="Close menu"
              >
                <div className="absolute inset-0 bg-linear-to-r from-red-500/0 to-orange-500/0 group-hover:from-red-500/20 group-hover:to-orange-500/20 rounded-2xl transition-all duration-300"></div>
                <div className="relative z-10 text-2xl transform transition-all duration-300 group-hover:rotate-90 group-hover:scale-110">
                  <span className="text-red-500 group-hover:text-red-400">✕</span>
                </div>
              </button>
            </div>

            {/* User info card */}
            <div className="relative overflow-hidden rounded-2xl p-4 bg-linear-to-r from-white/50 to-white/30 dark:from-zinc-800/50 dark:to-zinc-800/30 backdrop-blur-sm border border-white/20 dark:border-zinc-700/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-30"></div>
                  <div className="relative w-12 h-12 rounded-xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {lang === "en" && "Welcome Back!"}
                    {lang === "th" && "ยินดีต้อนรับ!"}
                    {lang === "ja" && "おかえりなさい！"}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {lang === "en" && "Premium Member"}
                    {lang === "th" && "สมาชิกระดับพรีเมียม"}
                    {lang === "ja" && "プレミアムメンバー"}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-linear-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold">
                  PRO
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="relative z-10 p-6 overflow-y-auto h-[calc(100vh-280px)]">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold mb-4 px-2">
              {lang === "en" && "NAVIGATION"}
              {lang === "th" && "เมนูนำทาง"}
              {lang === "ja" && "ナビゲーション"}
            </h3>

            <ul className="space-y-2">
              {MENU_ITEMS.map((item) => {
                const isActive = activeMenu === item.href;
                const isHovered = hoveredItem === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveMenu(item.href);
                        onClose();
                      }}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
                        ? "shadow-lg transform scale-[1.02]"
                        : "hover:shadow-md"
                        }`}
                    >
                      {/* Background linear effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${item.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${isActive ? 'opacity-10' : ''}`}></div>

                      {/* Icon container */}
                      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                        ? `bg-linear-to-br ${item.linear} shadow-lg`
                        : 'bg-white/50 dark:bg-zinc-800/50 group-hover:bg-white/80 dark:group-hover:bg-zinc-700/80'
                        }`}>
                        <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : ''
                          }`}>
                          {item.icon}
                        </span>
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-linear-to-r from-green-400 to-emerald-500 ring-2 ring-white dark:ring-zinc-900"></div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <span className={`font-medium transition-colors duration-300 ${isActive
                          ? 'bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent'
                          : 'text-zinc-700 dark:text-zinc-300'
                          }`}>
                          {getLabel(item)}
                        </span>
                        <div className="h-1 w-0 group-hover:w-full bg-linear-to-r from-transparent via-current to-transparent transition-all duration-500 mt-1 opacity-50"></div>
                      </div>

                      {/* Arrow indicator */}
                      <div className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''
                        }`}>
                        <svg
                          className={`w-5 h-5 ${isActive ? 'text-purple-500' : 'text-zinc-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="my-8 relative">
              <div className="h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 bg-white dark:bg-zinc-900 text-xs text-zinc-500">
                {lang === "en" && "SETTINGS"}
                {lang === "th" && "การตั้งค่า"}
                {lang === "ja" && "設定"}
              </div>
            </div>

            {/* Settings Section */}
            <div className="space-y-4">
              {/* Language Selector */}
              <div className="bg-white/30 dark:bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-zinc-700/30">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                  {lang === "en" && "Language"}
                  {lang === "th" && "ภาษา"}
                  {lang === "ja" && "言語"}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${lang === l
                        ? "bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg transform scale-105"
                        : "bg-white/50 dark:bg-zinc-800/50 hover:bg-white/80 dark:hover:bg-zinc-700/80"
                        }`}
                    >
                      <div className={`w-10 h-7 rounded overflow-hidden mb-2 ${lang === l ? 'ring-2 ring-white/50' : ''}`}>
                        <Image
                          src={LANG_FLAG[l]}
                          alt={l}
                          width={40}
                          height={28}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className={`text-xs font-medium ${lang === l ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {LANG_LABEL[l]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="bg-white/30 dark:bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-zinc-700/30">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                  {lang === "en" && "Theme"}
                  {lang === "th" && "ธีม"}
                  {lang === "ja" && "テーマ"}
                </h4>
                <button
                  onClick={toggleTheme}
                  className="relative w-full overflow-hidden rounded-xl group"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-500"></div>
                  <div className="relative z-10 flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === "light"
                        ? "bg-linear-to-br from-amber-400 to-orange-500"
                        : "bg-linear-to-br from-indigo-600 to-purple-700"
                        }`}>
                        <span className="text-2xl">
                          {theme === "light" ? "☀️" : "🌙"}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-zinc-800 dark:text-zinc-200">
                          {theme === "light"
                            ? (lang === "en" ? "Light Mode" : lang === "th" ? "โหมดสว่าง" : "ライトモード")
                            : (lang === "en" ? "Dark Mode" : lang === "th" ? "โหมดมืด" : "ダークモード")
                          }
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          {theme === "light"
                            ? (lang === "en" ? "Switch to dark theme" : lang === "th" ? "เปลี่ยนเป็นธีมมืด" : "ダークテーマに切り替え")
                            : (lang === "en" ? "Switch to light theme" : lang === "th" ? "เปลี่ยนเป็นธีมสว่าง" : "ライトテーマに切り替え")
                          }
                        </div>
                      </div>
                    </div>
                    <div className="relative w-14 h-8 rounded-full bg-linear-to-r from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 p-1">
                      <div className={`w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform duration-500 ${theme === "dark" ? "translate-x-6" : ""
                        }`}></div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 border-t border-white/10 dark:border-zinc-800/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-green-400 to-emerald-500"></div>
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-blue-400 to-cyan-500"></div>
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-purple-400 to-pink-500"></div>
              </div>
              <div className="text-sm font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                ITD TEAM ⚒️
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                v1.1.1 • {lang === "en" ? "Premium Edition" : lang === "th" ? "รุ่นพรีเมียม" : "プレミアム版"}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        @keyframes linear {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .animate-linear {
          animation: linear 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-linear(to bottom, #8b5cf6, #ec4899);
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-linear(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </>
  );
}