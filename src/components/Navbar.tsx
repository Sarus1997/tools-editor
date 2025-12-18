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

  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
        <div className="mx-auto max-w-350 px-6 h-17.5 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex flex-col justify-between w-7 h-6 md:hidden"
            >
              <span className="h-0.75 rounded bg-linear-to-r from-indigo-500 to-purple-500" />
              <span className="h-0.75 rounded bg-linear-to-r from-indigo-500 to-purple-500" />
              <span className="h-0.75 rounded bg-linear-to-r from-indigo-500 to-purple-500" />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold
                         bg-linear-to-r from-indigo-500 to-purple-500
                         bg-clip-text text-transparent"
            >
              📄 PDF EDITOR
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            <Link className="nav-link" href="/">
              {lang === "en" && "Home"}
              {lang === "th" && "หน้าแรก"}
              {lang === "ja" && "ホーム"}
            </Link>

            <Link className="nav-link" href="/about">
              {lang === "en" && "About"}
              {lang === "th" && "เกี่ยวกับ"}
              {lang === "ja" && "概要"}
            </Link>

            <Link className="nav-link" href="/contact">
              {lang === "en" && "Contact"}
              {lang === "th" && "ติดต่อ"}
              {lang === "ja" && "お問い合わせ"}
            </Link>

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="rounded-xl border px-3 py-2
                         hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* LANGUAGE DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-xl border px-3 py-2
                           hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <Image
                  src={LANG_FLAG[lang]}
                  alt={lang}
                  width={26}
                  height={18}
                />
                <span className="text-sm font-medium uppercase">
                  {lang}
                </span>
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-xl border
                             bg-white dark:bg-zinc-900 shadow-lg overflow-hidden"
                >
                  {(Object.keys(LANG_LABEL) as Lang[]).map(l => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2
                        hover:bg-zinc-100 dark:hover:bg-zinc-800
                        ${lang === l ? "font-semibold bg-zinc-100 dark:bg-zinc-800" : ""}
                      `}
                    >
                      <Image
                        src={LANG_FLAG[l]}
                        alt={l}
                        width={24}
                        height={16}
                      />
                      {LANG_LABEL[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
