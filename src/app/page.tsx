/* eslint-disable react-hooks/purity */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileEdit, Scissors, FileDown, FileUp, FileSearch, FileText,
  Sparkles, Zap, Shield, Globe, Clock, CheckCircle, Users, Star,
  ArrowRight, TrendingUp
} from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

export default function PremiumLanding() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentStat, setCurrentStat] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Detect theme from context or system
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);


  const { lang } = useLanguage();
  const tools = [
    {
      id: 1,
      icon: FileEdit,
      title: (
        <>
          {lang === "en" && "Merge Tools"}
          {lang === "th" && "เครื่องมือผสาน"}
          {lang === "ja" && "マージツール"}
        </>
      ),
      desc: (
        <>
          {lang === "en" && "Combine multiple PDF files into one seamless document"}
          {lang === "th" && "รวมไฟล์ PDF หลายไฟล์เป็นเอกสารเดียว"}
          {lang === "ja" && "複数のPDFファイルを1つのシームレスな文書に結合"}
        </>
      ),
      linear: "from-blue-500 via-cyan-500 to-teal-400",
      href: "/merger",
      active: true
    },
    {
      id: 2,
      icon: FileDown,
      title: (
        <>
          {lang === "en" && "Compress PDF"}
          {lang === "th" && "บีบอัด PDF"}
          {lang === "ja" && "PDFを圧縮"}
        </>
      ),
      desc: (
        <>
          {lang === "en" && "Reduce PDF size without compromising quality"}
          {lang === "th" && "ลดขนาด PDF โดยไม่กระทบคุณภาพ"}
          {lang === "ja" && "品質を損なうことなくPDFサイズを縮小"}
        </>
      ),
      linear: "from-emerald-500 via-green-500 to-lime-400",
      href: "/compress",
      active: true
    },
    {
      id: 3,
      icon: FileText,
      title: (
        <>
          {lang === "en" && "Edit PDF"}
          {lang === "th" && "แก้ไข PDF"}
          {lang === "ja" && "PDFを編集"}
        </>
      ),
      desc: (
        <>
          {lang === "en" && "Modify text, images, and pages effortlessly"}
          {lang === "th" && "แก้ไขข้อความ รูปภาพ และหน้าเอกสารอย่างง่ายดาย"}
          {lang === "ja" && "テキスト、画像、ページを簡単に編集"}
        </>
      ),
      linear: "from-purple-500 via-pink-500 to-rose-400",
      href: "/editor",
      active: true
    },
    {
      id: 4,
      icon: Scissors,
      title: (
        <>
          {lang === "en" && "Split PDF"}
          {lang === "th" && "แยก PDF"}
          {lang === "ja" && "PDFを分割"}
        </>
      ),
      desc: (
        <>
          {lang === "en" && "Divide large PDFs into smaller files"}
          {lang === "th" && "แบ่งไฟล์ PDF ขนาดใหญ่เป็นไฟล์เล็กๆ"}
          {lang === "ja" && "大きなPDFを小さなファイルに分割"}
        </>
      ),
      linear: "from-amber-500 via-orange-500 to-red-400",
      active: false
    },
    {
      id: 5,
      icon: FileSearch,
      title: (
        <>
          {lang === "en" && "Extract PDF Data"}
          {lang === "th" && "ดึงข้อมูล PDF"}
          {lang === "ja" && "PDFデータを抽出"}
        </>
      ),
      desc: (
        <>
          {lang === "en" && "Extract text and data from PDFs"}
          {lang === "th" && "ดึงข้อความและข้อมูลจากไฟล์ PDF"}
          {lang === "ja" && "PDFからテキストとデータを抽出"}
        </>
      ),
      linear: "from-rose-500 via-red-500 to-pink-400",
      active: false
    },
    {
      id: 6,
      icon: FileUp,
      title: (
        <>
          {lang === "en" && "PDF to Images"}
          {lang === "th" && "PDF เป็นรูปภาพ"}
          {lang === "ja" && "PDFを画像に変換"}
        </>
      ),
      desc: (
        <>
          {lang === "en" && "Convert PDF pages to high-quality images"}
          {lang === "th" && "แปลงหน้า PDF เป็นรูปภาพคุณภาพสูง"}
          {lang === "ja" && "PDFページを高品質な画像に変換"}
        </>
      ),
      linear: "from-violet-500 via-purple-500 to-indigo-400",
      active: false
    }
  ];

  const stats = [
    { value: "500K+", label: "Files Processed", icon: FileText, color: "from-blue-500 to-cyan-500" },
    { value: "10K+", label: "Hours Saved", icon: Clock, color: "from-emerald-500 to-teal-500" },
    { value: "50K+", label: "Happy Users", icon: Users, color: "from-purple-500 to-pink-500" },
    { value: "150+", label: "Countries", icon: Globe, color: "from-amber-500 to-orange-500" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      desc: "Files processed locally, never uploaded",
      linear: "from-emerald-400 to-teal-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Optimized for instant processing",
      linear: "from-amber-400 to-orange-400"
    },
    {
      icon: Star,
      title: "100% Free",
      desc: "No limits, no watermarks, forever",
      linear: "from-blue-400 to-cyan-400"
    },
    {
      icon: Globe,
      title: "Multilingual",
      desc: "Full support for 3+ languages",
      linear: "from-purple-400 to-pink-400"
    },
    {
      icon: Users,
      title: "Trusted Globally",
      desc: "Used by thousands worldwide",
      linear: "from-rose-400 to-red-400"
    },
    {
      icon: CheckCircle,
      title: "Easy to Use",
      desc: "Intuitive design for everyone",
      linear: "from-indigo-400 to-violet-400"
    }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDark
      ? 'bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white'
      : 'bg-linear-to-br from-slate-50 via-purple-50 to-slate-50 text-slate-900'
      }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* linear Orbs */}
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out ${isDark ? 'bg-linear-to-r from-blue-500/20 to-cyan-500/20' : 'bg-linear-to-r from-blue-400/30 to-cyan-400/30'
            }`}
          style={{
            left: `${mousePos.x / 20}px`,
            top: `${mousePos.y / 20}px`,
          }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out ${isDark ? 'bg-linear-to-r from-purple-500/20 to-pink-500/20' : 'bg-linear-to-r from-purple-400/30 to-pink-400/30'
            }`}
          style={{
            right: `${mousePos.x / 30}px`,
            bottom: `${mousePos.y / 30}px`,
          }}
        />

        {/* Animated Grid */}
        <div className={`absolute inset-0 ${isDark
          ? 'bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'
          : 'bg-[linear-linear(rgba(0,0,0,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
          } bg-size-[100px_100px] mask-[radial-linear(ellipse_80%_50%_at_50%_50%,black,transparent)]`} />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${isDark ? 'bg-white/30' : 'bg-slate-900/20'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-32">
          <div className="inline-block mb-6">
            <div className={`flex items-center gap-2 backdrop-blur-xl px-4 py-2 rounded-full border ${isDark
              ? 'bg-white/10 border-white/20'
              : 'bg-white/60 border-slate-200/60'
              }`}>
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="text-sm font-medium">
                {lang === "en" && "Professional Editor Tools"}
                {lang === "th" && "เครื่องมือแก้ไขระดับมืออาชีพ"}
                {lang === "ja" && "プロフェッショナルエディターツール"}
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="inline-block animate-[float_3s_ease-in-out_infinite]">
              {lang === "en" && "Transform"}
              {lang === "th" && "เปลี่ยนแปลง"}
              {lang === "ja" && "変換"}

            </span>
            <br />
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-size-[200%_100%]">
              {lang === "en" && "Your PDFs"}
              {lang === "th" && "ไฟล์ PDF ของคุณ"}
              {lang === "ja" && "あなたのPDF"}
            </span>
          </h1>

          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>
            {lang === "en" && "Edit, merge, and manage your documents with lightning-fast,"}
            {lang === "th" && "แก้ไข ผสาน และจัดการเอกสารของคุณด้วยความเร็วสูง,"}
            {lang === "ja" && "ドキュメントを超高速で編集、マージ、管理します、"}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
              {lang === "en" && "professional-grade tools"}
              {lang === "th" && "เครื่องมือระดับมืออาชีพ"}
              {lang === "ja" && "プロフェッショナルエディターツール"}
            </span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-lg text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
              <span className="relative z-10 flex items-center gap-2">
                {lang === "en" && "Get Started Free"}
                {lang === "th" && "เริ่มต้นฟรี"}
                {lang === "ja" && "無料で始める"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className={`px-8 py-4 backdrop-blur-xl rounded-xl font-semibold text-lg border transition-all hover:scale-105 ${isDark
              ? 'bg-white/10 border-white/20 hover:bg-white/20'
              : 'bg-white/60 border-slate-200/60 hover:bg-white/80'
              }`}>
              {lang === "en" && "Learn More"}
              {lang === "th" && "เรียนรู้เพิ่มเติม"}
              {lang === "ja" && "もっと詳しく"}
            </button>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isActive = currentStat === i;
            return (
              <div
                key={i}
                className={`relative p-6 rounded-2xl backdrop-blur-xl transition-all duration-500 ${isActive
                  ? isDark
                    ? 'bg-white/20 border-2 border-white/40 scale-105'
                    : 'bg-white/60 border-2 border-slate-300/60 scale-105'
                  : isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white/30 border border-slate-200/30'
                  }`}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 ${isActive ? 'opacity-20' : ''} transition-opacity duration-500 rounded-2xl`} />
                <div className="relative">
                  <Icon className={`w-8 h-8 mb-3 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{stat.label}</div>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Powerful Tools at Your
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
              {' '}Fingertips
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              const isHovered = hoveredCard === tool.id;

              const Card = (
                <div
                  className={`relative h-full p-8 rounded-2xl backdrop-blur-xl transition-all duration-500 ${tool.active
                    ? isDark
                      ? 'bg-white/10 border border-white/20 hover:bg-white/15 hover:scale-105 cursor-pointer'
                      : 'bg-white/40 border border-slate-200/40 hover:bg-white/60 hover:scale-105 cursor-pointer'
                    : isDark
                      ? 'bg-white/5 border border-white/10 opacity-60'
                      : 'bg-white/20 border border-slate-200/20 opacity-60'
                    }`}
                >
                  {!tool.active && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-white">
                      SOON
                    </div>
                  )}

                  <div
                    className={`relative w-16 h-16 mb-6 rounded-xl bg-linear-to-br ${tool.linear
                      } flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''
                      }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    {tool.title}
                    {isHovered && tool.active && (
                      <ArrowRight className="w-5 h-5 animate-[bounceRight_1s_ease-in-out_infinite]" />
                    )}
                  </h3>

                  <p className={isDark ? 'text-gray-400' : 'text-slate-600'}>
                    {tool.desc}
                  </p>

                  {tool.active && (
                    <div
                      className={`mt-6 h-1 bg-linear-to-r ${tool.linear
                        } rounded-full transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'
                        }`}
                    />
                  )}
                </div>
              );

              return (
                <div
                  key={tool.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(tool.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {tool.active && tool.href ? (
                    <Link href={tool.href} className="block h-full">
                      {Card}
                    </Link>
                  ) : (
                    Card
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400"> Our Platform</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className={`group p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white/30 border-slate-200/30 hover:bg-white/50'
                    }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-12 h-12 mb-4 rounded-lg bg-linear-to-br ${feature.linear} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className={isDark ? 'text-gray-400' : 'text-slate-600'}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounceRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}