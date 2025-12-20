/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const [isHoverLogo, setIsHoverLogo] = useState(false);
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const { lang } = useLanguage();

  return (
    <>
      <footer className="relative mt-24">
        {/* Gradient Top Line */}
        <div className="h-1 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl">
          <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* LOGO */}
            <div>
              <Link
                href="/"
                className="flex items-center gap-4 group"
                onMouseEnter={() => setIsHoverLogo(true)}
                onMouseLeave={() => setIsHoverLogo(false)}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700" />
                  <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-600 flex items-center justify-center shadow-2xl">
                    <span className="text-3xl">📄</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    TOOLS EDITOR
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
                    {lang === "en" && "Professional Suite"}
                    {lang === "th" && "ชุดเครื่องมือระดับมืออาชีพ"}
                    {lang === "ja" && "プロフェッショナルスイート"}
                  </p>
                </div>
              </Link>

              <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                {lang === "en" && "Tools Editor is a powerful suite of PDF tools for editing, merging, and managing documents with a clean and modern experience."}
                {lang === "th" && "Tools Editor คือชุดเครื่องมือ PDF ที่ทรงพลังสำหรับการแก้ไข รวม และจัดการเอกสาร ด้วยประสบการณ์ที่สะอาดและทันสมัย"}
                {lang === "ja" && "Tools Editorは、ドキュメントの編集、結合、管理のための強力なPDFツールスイートであり、クリーンでモダンな体験を提供します。"}
              </p>
            </div>

            {/* NAVIGATION */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-4">
                {lang === "en" && "Navigation"}
                {lang === "th" && "นำทาง"}
                {lang === "ja" && "ナビゲーション"}
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* INFO */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-4">
                {lang === "en" && "Information"}
                {lang === "th" && "ข้อมูล"}
                {lang === "ja" && "情報"}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {lang === "en" && "Built with Next.js & Tailwind CSS. Focused on performance, beauty, and usability."}
                {lang === "th" && "สร้างด้วย Next.js & Tailwind CSS มุ่งเน้นที่ประสิทธิภาพ ความสวยงาม และการใช้งานง่าย"}
                {lang === "ja" && "Next.js & Tailwind CSSで構築。パフォーマンス、美しさ、使いやすさに重点を置いています。"}
              </p>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-zinc-200/50 dark:border-zinc-800/50">
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                © {new Date().getFullYear()}
                {lang === "en" && "PDF Editor. All rights reserved."}
                {lang === "th" && "PDF Editor สงวนลิขสิทธิ์"}
                {lang === "ja" && "PDF Editor。全著作権所有。"}
              </p>

              <div className="flex gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <button
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-indigo-500 transition"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-indigo-500 transition"
                >
                  Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          />

          {/* MODAL BOX */}
          <div className="relative w-full h-full md:h-[90vh] md:w-[90vw] bg-white dark:bg-zinc-900 rounded-none md:rounded-3xl shadow-2xl overflow-hidden animate-fade-in">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-bold">
                {activeModal === "privacy"
                  ? "Privacy Policy"
                  : "Terms & Conditions"}
              </h2>

              <button
                onClick={() => setActiveModal(null)}
                className="w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 overflow-y-auto h-[calc(100%-64px)] text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
              {activeModal === "privacy" && (
                <>
                  <p>
                    {lang === "en" && "We value your privacy. Your data is securely stored."}
                    {lang === "th" && "เราให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน ข้อมูลของคุณจะถูกจัดเก็บอย่างปลอดภัย"}
                    {lang === "ja" && "私たちはあなたのプライバシーを重視しています。あなたのデータは安全に保存されます。"}
                  </p>
                  <p>
                    {lang === "en" && "We do not share data with third parties unless required by law."}
                    {lang === "th" && "เราไม่แบ่งปันข้อมูลกับบุคคลที่สาม เว้นแต่เป็นไปตามกฎหมาย"}
                    {lang === "ja" && "法的に要求されない限り、第三者とデータを共有しません。"}
                  </p>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p>
                    {lang === "en" && "By using this website, you agree to all terms and conditions."}
                    {lang === "th" && "การใช้งานเว็บไซต์นี้ถือว่าคุณยอมรับข้อกำหนดทั้งหมด"}
                    {lang === "ja" && "このウェブサイトを使用することで、すべての利用規則に同意したものとみなされます。"}
                  </p>
                  <p>
                    {lang === "en" && "Do not use content for commercial purposes without permission."}
                    {lang === "th" && "ห้ามนำเนื้อหาไปใช้เชิงพาณิชย์โดยไม่ได้รับอนุญาต"}
                    {lang === "ja" && "商業目的の目的を持ってコンテンツを使用しないでください。"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
