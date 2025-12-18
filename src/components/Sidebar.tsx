"use client";

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"
          }`}
      >
        <aside
          className={`absolute left-0 top-0 h-full w-72
            bg-white dark:bg-zinc-900 shadow-xl
            transform transition-transform
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <header className="flex items-center justify-between p-6">
            <h2 className="text-xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {lang === "en" ? "Menu" : "เมนู"}
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 text-xl hover:scale-110 transition"
            >
              ✕
            </button>
          </header>

          {/* Menu */}
          <ul className="px-4 space-y-2">
            {[
              { href: "/", label: lang === "en" ? "Home" : "หน้าแรก" },
              { href: "/about", label: lang === "en" ? "About" : "เกี่ยวกับ" },
              { href: "/contact", label: lang === "en" ? "Contact" : "ติดต่อ" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3
                    hover:bg-indigo-50 dark:hover:bg-zinc-800 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="p-4 space-y-3">
            <button onClick={toggleLang} className="w-full btn-primary">
              🌍 {lang === "en" ? "English" : "ภาษาไทย"}
            </button>

            <button onClick={toggleTheme} className="w-full btn-secondary">
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>

          {/* Footer */}
          <footer className="p-4 text-center text-sm text-zinc-500">
            ITD TEAM ⚒️ <br /> v1.1.1
          </footer>
        </aside>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}
    </>
  );
}
