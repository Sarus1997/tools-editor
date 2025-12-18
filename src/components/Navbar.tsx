"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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

            <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              📄 PDF EDITOR
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            <Link className="nav-link" href="/">{lang === "en" ? "Home" : "หน้าแรก"}</Link>
            <Link className="nav-link" href="/about">{lang === "en" ? "About" : "เกี่ยวกับ"}</Link>
            <Link className="nav-link" href="/contact">{lang === "en" ? "Contact" : "ติดต่อ"}</Link>

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="rounded-xl border px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* LANGUAGE */}
            <button
              onClick={toggleLang}
              className="rounded-xl border px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <Image
                src={lang === "en" ? "/img/flag/england.svg" : "/img/flag/thailand.svg"}
                alt="lang"
                width={26}
                height={18}
              />
            </button>
          </div>
        </div>
      </nav>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
