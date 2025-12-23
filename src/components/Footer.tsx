/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// ประเภทของคุกกี้ที่สามารถเลือกได้
type CookieType = 'necessary' | 'analytics' | 'preferences' | 'marketing';

// Interface สำหรับเก็บสถานะคุกกี้
interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  consentDate: string;
  version: number;
}

export default function Footer() {
  const [isHoverLogo, setIsHoverLogo] = useState(false);
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "cookies" | null>(null);

  // สถานะการตั้งค่าคุกกี้
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true, // คุกกี้จำเป็นต้องเปิดตลอด
    analytics: false,
    preferences: false,
    marketing: false,
    consentDate: '',
    version: 1
  });

  // สำหรับหน้าแรกที่เข้ามา ตรวจสอบว่ายอมรับคุกกี้แล้วหรือยัง
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const { lang } = useLanguage();

  // ตรวจสอบคุกกี้ consent เมื่อโหลด component
  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent");
    const savedPreferences = localStorage.getItem("cookie_preferences");

    if (savedConsent === "accepted" && savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setCookiePreferences(parsedPreferences);
        setShowCookieBanner(false);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    } else {
      // ถ้ายังไม่เคยตั้งค่า ให้แสดงแบนเนอร์
      setTimeout(() => {
        setShowCookieBanner(true);
      }, 1000);
    }
  }, []);

  // บันทึกการตั้งค่าคุกกี้
  const saveCookiePreferences = (prefs: CookiePreferences) => {
    const preferencesWithDate = {
      ...prefs,
      consentDate: new Date().toISOString()
    };

    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("cookie_preferences", JSON.stringify(preferencesWithDate));
    setCookiePreferences(preferencesWithDate);

    // อัพเดทคุกกี้ตามการตั้งค่า
    updateCookiesBasedOnPreferences(preferencesWithDate);
  };

  // อัพเดทคุกกี้ตามการตั้งค่าผู้ใช้
  const updateCookiesBasedOnPreferences = (prefs: CookiePreferences) => {
    // สร้างคุกกี้ตามประเภทที่อนุญาต
    if (prefs.analytics) {
      // ตั้งค่าคุกกี้สำหรับ analytics (Google Analytics, etc.)
      document.cookie = "analytics_cookie=true; path=/; max-age=31536000; SameSite=Lax";
    } else {
      // ลบคุกกี้ analytics
      document.cookie = "analytics_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (prefs.preferences) {
      // ตั้งค่าคุกกี้สำหรับ preferences
      document.cookie = "preferences_cookie=true; path=/; max-age=31536000; SameSite=Lax";
    } else {
      // ลบคุกกี้ preferences
      document.cookie = "preferences_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (prefs.marketing) {
      // ตั้งค่าคุกกี้สำหรับ marketing
      document.cookie = "marketing_cookie=true; path=/; max-age=31536000; SameSite=Lax";
    } else {
      // ลบคุกกี้ marketing
      document.cookie = "marketing_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // คุกกี้จำเป็นจะถูกตั้งค่าอัตโนมัติเสมอ
    document.cookie = "necessary_cookie=true; path=/; max-age=31536000; SameSite=Lax";
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงการตั้งค่าคุกกี้
  const handleCookieToggle = (type: CookieType) => {
    if (type === 'necessary') return; // ไม่สามารถปิดคุกกี้จำเป็นได้

    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // ฟังก์ชันยอมรับการตั้งค่าปัจจุบัน
  const handleAcceptSelected = () => {
    saveCookiePreferences(cookiePreferences);
    setActiveModal(null);
    setShowCookieBanner(false);
  };

  // ฟังก์ชันยอมรับทั้งหมด
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
      consentDate: new Date().toISOString(),
      version: 1
    };
    saveCookiePreferences(allAccepted);
    setActiveModal(null);
    setShowCookieBanner(false);
  };

  // ฟังก์ชันปฏิเสธทั้งหมด (ยกเว้นคุกกี้จำเป็น)
  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
      consentDate: new Date().toISOString(),
      version: 1
    };
    saveCookiePreferences(onlyNecessary);
    setActiveModal(null);
    setShowCookieBanner(false);
  };

  // แบนเนอร์คุกกี้สำหรับหน้าแรก
  const CookieConsentBanner = () => {
    if (!showCookieBanner) return null;

    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-10 lg:right-10 z-40 animate-in slide-in-up duration-300">
        <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm">🍪</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200">
                  {lang === "en" && "Cookie Settings"}
                  {lang === "th" && "การตั้งค่าคุกกี้"}
                  {lang === "ja" && "クッキー設定"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                {lang === "en" && "We use cookies to enhance your experience. Choose which cookies you allow."}
                {lang === "th" && "เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ เลือกว่าคุณอนุญาตคุกกี้ประเภทใดบ้าง"}
                {lang === "ja" && "より良い体験を提供するためクッキーを使用しています。許可するクッキーを選択してください。"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex-1 sm:flex-none"
              >
                {lang === "en" && "Accept All"}
                {lang === "th" && "ยอมรับทั้งหมด"}
                {lang === "ja" && "すべて承認"}
              </button>
              <button
                onClick={() => setActiveModal("cookies")}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300 flex-1 sm:flex-none"
              >
                {lang === "en" && "Customize"}
                {lang === "th" && "ปรับแต่ง"}
                {lang === "ja" && "カスタマイズ"}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 flex-1 sm:flex-none"
              >
                {lang === "en" && "Reject All"}
                {lang === "th" && "ปฏิเสธทั้งหมด"}
                {lang === "ja" && "すべて拒否"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="relative mt-16 sm:mt-24 lg:mt-32">
        {/* Animated linear Line */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

        {/* Main Footer Content */}
        <div className="relative bg-linear-to-b from-white/60 via-white/80 to-white dark:from-zinc-900/60 dark:via-zinc-900/80 dark:to-zinc-900 backdrop-blur-3xl">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-linear(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-linear(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(0,0,0,0))]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">

              {/* LOGO & DESCRIPTION - Full width on mobile */}
              <div className="sm:col-span-2 lg:col-span-5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 sm:gap-4 group"
                  onMouseEnter={() => setIsHoverLogo(true)}
                  onMouseLeave={() => setIsHoverLogo(false)}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-2 sm:-inset-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-1000" />

                    {/* Icon Container */}
                    <div className="relative w-12 h-12 sm:w-14 lg:w-16 sm:h-14 lg:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-600 flex items-center justify-center shadow-lg sm:shadow-xl shadow-indigo-500/20 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-500 group-hover:scale-105">
                      <span className="text-2xl sm:text-3xl lg:text-4xl transform group-hover:scale-110 transition-transform duration-500">📄</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
                      TOOLS EDITOR
                    </h2>
                    <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold mt-0.5">
                      {lang === "en" && "Professional Suite"}
                      {lang === "th" && "ชุดเครื่องมือระดับมืออาชีพ"}
                      {lang === "ja" && "プロフェッショナルスイート"}
                    </p>
                  </div>
                </Link>

                <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed sm:leading-loose max-w-md">
                  {lang === "en" && "Transform your workflow with powerful PDF tools. Edit, merge, and manage documents with an elegant, modern interface designed for professionals."}
                  {lang === "th" && "เปลี่ยนแปลงการทำงานของคุณด้วยเครื่องมือ PDF ที่ทรงพลัง แก้ไข รวม และจัดการเอกสารด้วยอินเทอร์เฟซที่สวยงาม ทันสมัย ออกแบบมาสำหรับมืออาชีพ"}
                  {lang === "ja" && "強力なPDFツールでワークフローを変革。プロフェッショナル向けに設計されたエレガントでモダンなインターフェースで、ドキュメントの編集、結合、管理を行います。"}
                </p>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
                  {["𝕏", "📘", "📷"].map((icon, idx) => (
                    <button
                      key={idx}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800/50 hover:bg-linear-to-br hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-zinc-600 dark:text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 text-sm sm:text-base"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* NAVIGATION - Half width on tablet, auto on desktop */}
              <div className="lg:col-span-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-zinc-800 dark:text-zinc-200 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-0.5 sm:w-1 h-3 sm:h-4 bg-linear-to-b from-indigo-500 to-purple-500 rounded-full" />
                  {lang === "en" && "Navigation"}
                  {lang === "th" && "นำทาง"}
                  {lang === "ja" && "ナビゲーション"}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3.5">
                  {[
                    { href: "/", label: lang === "en" ? "Home" : lang === "th" ? "หน้าหลัก" : "ホーム" },
                    { href: "/tools", label: lang === "en" ? "All Tools" : lang === "th" ? "เครื่องมือทั้งหมด" : "すべてのツール" },
                    { href: "/about", label: lang === "en" ? "About Us" : lang === "th" ? "เกี่ยวกับเรา" : "私たちについて" },
                    { href: "/contact", label: lang === "en" ? "Contact" : lang === "th" ? "ติดต่อ" : "お問い合わせ" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                      >
                        <span className="w-0 h-px bg-linear-to-r from-indigo-500 to-purple-500 group-hover:w-3 sm:group-hover:w-4 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RESOURCES - Half width on tablet */}
              <div className="lg:col-span-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-zinc-800 dark:text-zinc-200 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-0.5 sm:w-1 h-3 sm:h-4 bg-linear-to-b from-purple-500 to-pink-500 rounded-full" />
                  {lang === "en" && "Resources"}
                  {lang === "th" && "ทรัพยากร"}
                  {lang === "ja" && "リソース"}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3.5">
                  {[
                    { label: lang === "en" ? "Help Center" : lang === "th" ? "ศูนย์ช่วยเหลือ" : "ヘルプセンター" },
                    { label: lang === "en" ? "Tutorials" : lang === "th" ? "บทเรียน" : "チュートリアル" },
                    { label: lang === "en" ? "API Docs" : lang === "th" ? "เอกสาร API" : "APIドキュメント" },
                    { label: lang === "en" ? "Support" : lang === "th" ? "สนับสนุน" : "サポート" },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <button className="group inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300">
                        <span className="w-0 h-px bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-3 sm:group-hover:w-4 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NEWSLETTER - Full width on mobile, half on tablet */}
              <div className="sm:col-span-2 lg:col-span-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-zinc-800 dark:text-zinc-200 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-0.5 sm:w-1 h-3 sm:h-4 bg-linear-to-b from-pink-500 to-rose-500 rounded-full" />
                  {lang === "en" && "Stay Updated"}
                  {lang === "th" && "ติดตามข่าวสาร"}
                  {lang === "ja" && "最新情報"}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 sm:mb-4 leading-relaxed">
                  {lang === "en" && "Get the latest features and updates"}
                  {lang === "th" && "รับฟีเจอร์และอัปเดตล่าสุด"}
                  {lang === "ja" && "最新の機能とアップデートを入手"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={lang === "en" ? "Email" : lang === "th" ? "อีเมล" : "メール"}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                  />
                  <button className="px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300">
                    →
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="relative border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                {/* Copyright - Stack on mobile */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-center sm:text-left">
                  <span>© {new Date().getFullYear()}</span>
                  <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {lang === "en" && "Tools Editor"}
                    {lang === "th" && "Tools Editor"}
                    {lang === "ja" && "Tools Editor"}
                  </span>
                  <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="w-full sm:w-auto">
                    {lang === "en" && "All rights reserved"}
                    {lang === "th" && "สงวนลิขสิทธิ์"}
                    {lang === "ja" && "全著作権所有"}
                  </span>
                </p>

                {/* Links - Stack on mobile */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs">
                  <button
                    onClick={() => setActiveModal("privacy")}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  >
                    {lang === "en" && "Privacy"}
                    {lang === "th" && "ความเป็นส่วนตัว"}
                    {lang === "ja" && "プライバシー"}
                  </button>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <button
                    onClick={() => setActiveModal("terms")}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  >
                    {lang === "en" && "Terms"}
                    {lang === "th" && "ข้อกำหนด"}
                    {lang === "ja" && "利用規約"}
                  </button>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <button
                    onClick={() => setActiveModal("cookies")}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  >
                    {lang === "en" && "Cookies"}
                    {lang === "th" && "คุกกี้"}
                    {lang === "ja" && "クッキー"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* แบนเนอร์คุกกี้สำหรับหน้าแรก */}
      <CookieConsentBanner />

      {/* ================= MODAL ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          />

          {/* MODAL BOX - Responsive sizing */}
          <div className="relative w-full max-w-full sm:max-w-2xl lg:max-w-3xl h-[90vh] sm:h-auto sm:max-h-[85vh] bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

            {/* linear Header */}
            <div className="relative bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5">
              <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pr-2">
                  {activeModal === "privacy"
                    ? lang === "en"
                      ? "Privacy Policy"
                      : lang === "th"
                        ? "นโยบายความเป็นส่วนตัว"
                        : "プライバシーポリシー"
                    : activeModal === "terms"
                      ? lang === "en"
                        ? "Terms & Conditions"
                        : lang === "th"
                          ? "ข้อกำหนดและเงื่อนไข"
                          : "利用規約"
                      : lang === "en"
                        ? "Cookie Settings"
                        : lang === "th"
                          ? "การตั้งค่าคุกกี้"
                          : "クッキー設定"}
                </h2>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-all duration-300 hover:rotate-90 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 shrink-0"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* CONTENT - Scrollable */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto h-[calc(90vh-64px)] sm:h-auto sm:max-h-[calc(85vh-88px)] text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed sm:leading-loose space-y-4 sm:space-y-6">
              {activeModal === "privacy" && (
                <>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {lang === "en" && "Data Protection"}
                      {lang === "th" && "การปกป้องข้อมูล"}
                      {lang === "ja" && "データ保護"}
                    </h3>
                    <p>
                      {lang === "en" && "We value your privacy and are committed to protecting your personal information. Your data is encrypted and securely stored using industry-standard protocols."}
                      {lang === "th" && "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ และมุ่งมั่นในการปกป้องข้อมูลส่วนบุคคลของคุณ ข้อมูลของคุณถูกเข้ารหัสและจัดเก็บอย่างปลอดภัยโดยใช้โปรโตคอลมาตรฐานอุตสาหกรรม"}
                      {lang === "ja" && "私たちはあなたのプライバシーを重視し、個人情報の保護に取り組んでいます。あなたのデータは暗号化され、業界標準のプロトコルを使用して安全に保存されます。"}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-purple-500 shrink-0" />
                      {lang === "en" && "Data Sharing"}
                      {lang === "th" && "การแบ่งปันข้อมูล"}
                      {lang === "ja" && "データ共有"}
                    </h3>
                    <p>
                      {lang === "en" && "We do not sell, trade, or share your personal data with third parties for marketing purposes. Data may only be disclosed when required by law or to protect our legal rights."}
                      {lang === "th" && "เราไม่ขาย แลกเปลี่ยน หรือแบ่งปันข้อมูลส่วนบุคคลของคุณกับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาด ข้อมูลอาจถูกเปิดเผยเฉพาะเมื่อกฎหมายกำหนดหรือเพื่อปกป้องสิทธิ์ทางกฎหมายของเรา"}
                      {lang === "ja" && "マーケティング目的で個人データを第三者に販売、取引、共有することはありません。データは、法律で要求された場合、または法的権利を保護するためにのみ開示される場合があります。"}
                    </p>
                  </div>
                </>
              )}

              {activeModal === "cookies" && (
                <>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-pink-500 shrink-0" />
                      {lang === "en" && "Cookie Preferences"}
                      {lang === "th" && "การตั้งค่าคุกกี้"}
                      {lang === "ja" && "クッキー設定"}
                    </h3>
                    <p>
                      {lang === "en" && "Choose which cookies you allow. Necessary cookies are always enabled for the website to function properly."}
                      {lang === "th" && "เลือกว่าคุณอนุญาตคุกกี้ประเภทใดบ้าง คุกกี้ที่จำเป็นจะเปิดใช้งานเสมอเพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง"}
                      {lang === "ja" && "許可するクッキーを選択してください。ウェブサイトが正しく機能するために必要なクッキーは常に有効になっています。"}
                    </p>
                  </div>

                  {/* Cookie Type Selection */}
                  <div className="space-y-4">
                    {[
                      {
                        type: 'necessary' as CookieType,
                        title: lang === "en" ? "Necessary Cookies" : lang === "th" ? "คุกกี้ที่จำเป็น" : "必須クッキー",
                        description: lang === "en"
                          ? "Required for basic website functionality. Cannot be disabled."
                          : lang === "th"
                            ? "จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดใช้งานได้"
                            : "ウェブサイトの基本的な機能に必要です。無効にすることはできません。",
                        required: true
                      },
                      {
                        type: 'analytics' as CookieType,
                        title: lang === "en" ? "Analytics Cookies" : lang === "th" ? "คุกกี้วิเคราะห์ข้อมูล" : "分析クッキー",
                        description: lang === "en"
                          ? "Help us understand how visitors interact with our website."
                          : lang === "th"
                            ? "ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมมีปฏิสัมพันธ์กับเว็บไซต์ของเราอย่างไร"
                            : "訪問者が当サイトとどのように関わっているかを理解するのに役立ちます。"
                      },
                      {
                        type: 'preferences' as CookieType,
                        title: lang === "en" ? "Preference Cookies" : lang === "th" ? "คุกกี้การตั้งค่า" : "設定クッキー",
                        description: lang === "en"
                          ? "Remember your settings and preferences for future visits."
                          : lang === "th"
                            ? "จดจำการตั้งค่าและค่ากำหนดของคุณสำหรับการเยี่ยมชมในอนาคต"
                            : "次回の訪問時に設定と好みを記憶します。"
                      },
                      {
                        type: 'marketing' as CookieType,
                        title: lang === "en" ? "Marketing Cookies" : lang === "th" ? "คุกกี้การตลาด" : "マーケティングクッキー",
                        description: lang === "en"
                          ? "Used to deliver relevant advertisements and track campaign performance."
                          : lang === "th"
                            ? "ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องและติดตามผลการรณรงค์"
                            : "関連する広告を配信し、キャンペーンのパフォーマンスを追跡するために使用されます。"
                      }
                    ].map((cookie) => (
                      <div
                        key={cookie.type}
                        className={`p-4 rounded-xl border transition-all duration-300 ${cookie.required
                          ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-900/20'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                {cookie.title}
                              </h4>
                              {cookie.required && (
                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded">
                                  {lang === "en" ? "Required" : lang === "th" ? "จำเป็น" : "必須"}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                              {cookie.description}
                            </p>
                          </div>

                          {!cookie.required ? (
                            <button
                              onClick={() => handleCookieToggle(cookie.type)}
                              className={`w-12 h-6 rounded-full transition-all duration-300 flex items-center p-1 ${cookiePreferences[cookie.type]
                                ? 'bg-linear-to-r from-purple-500 to-pink-500 justify-end'
                                : 'bg-zinc-200 dark:bg-zinc-700 justify-start'
                                }`}
                            >
                              <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                            </button>
                          ) : (
                            <div className="w-12 h-6 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-end p-1">
                              <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      {lang === "en" && "Accept All Cookies"}
                      {lang === "th" && "ยอมรับคุกกี้ทั้งหมด"}
                      {lang === "ja" && "すべてのクッキーを承認"}
                    </button>

                    <button
                      onClick={handleAcceptSelected}
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                    >
                      {lang === "en" && "Accept Selected"}
                      {lang === "th" && "ยอมรับที่เลือก"}
                      {lang === "ja" && "選択したものを承認"}
                    </button>

                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300"
                    >
                      {lang === "en" && "Reject All"}
                      {lang === "th" && "ปฏิเสธทั้งหมด"}
                      {lang === "ja" && "すべて拒否"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}