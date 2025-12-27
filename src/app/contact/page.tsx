'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { lang } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDark
        ? 'bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white'
        : 'bg-linear-to-br from-slate-50 via-purple-50 to-slate-50 text-slate-900'
        }`}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-linear(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-linear(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute w-150 h-150 rounded-full blur-3xl transition-all duration-300 ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
            }`}
          style={{
            left: mousePos.x / 20,
            top: mousePos.y / 20,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div
          className={`absolute w-150 h-150 rounded-full blur-3xl transition-all duration-300 ${isDark ? 'bg-purple-500/20' : 'bg-purple-400/30'
            }`}
          style={{
            right: mousePos.x / 30,
            bottom: mousePos.y / 30,
            transform: 'translate(50%, 50%)'
          }}
        />
        <div
          className={`absolute w-100 h-100 rounded-full blur-3xl transition-all duration-500 ${isDark ? 'bg-pink-500/15' : 'bg-pink-400/25'
            }`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center justify-center text-center">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="text-sm font-medium bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {lang === 'en' && 'Contact Us'}
                {lang === 'th' && 'ติดต่อเรา'}
                {lang === 'ja' && 'お問い合わせ'}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              {lang === 'en' && 'Get in Touch'}
              {lang === 'th' && 'ติดต่อทีมงานของเรา'}
              {lang === 'ja' && 'お気軽にご連絡ください'}
            </h1>

            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' &&
                'Have questions, feedback, or need support? We\'re here to help you.'}
              {lang === 'th' &&
                'มีคำถาม ข้อเสนอแนะ หรืออยากติดต่อทีมงาน เรายินดีช่วยเหลือคุณ'}
              {lang === 'ja' &&
                'ご質問・ご意見・サポートが必要な場合はお気軽にお問い合わせください'}
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="pb-32">
          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {lang === 'en' && 'Send Us a Message'}
              {lang === 'th' && 'ส่งข้อความถึงเรา'}
              {lang === 'ja' && 'メッセージを送信'}
            </h2>

            <form className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={
                    lang === 'en'
                      ? 'Your Name'
                      : lang === 'th'
                        ? 'ชื่อของคุณ'
                        : 'お名前'
                  }
                  className={`w-full px-6 py-4 rounded-xl border ${isDark
                    ? 'border-white/10 bg-white/5 focus:bg-white/10'
                    : 'border-slate-200 bg-white/50 focus:bg-white'
                    } outline-none focus:border-cyan-500 transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20`}
                />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  placeholder={
                    lang === 'en'
                      ? 'Your Email'
                      : lang === 'th'
                        ? 'อีเมลของคุณ'
                        : 'メールアドレス'
                  }
                  className={`w-full px-6 py-4 rounded-xl border ${isDark
                    ? 'border-white/10 bg-white/5 focus:bg-white/10'
                    : 'border-slate-200 bg-white/50 focus:bg-white'
                    } outline-none focus:border-cyan-500 transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20`}
                />
              </div>

              <div className="relative group">
                <textarea
                  rows={5}
                  placeholder={
                    lang === 'en'
                      ? 'Your Message'
                      : lang === 'th'
                        ? 'ข้อความของคุณ'
                        : 'メッセージ'
                  }
                  className={`w-full px-6 py-4 rounded-xl border ${isDark
                    ? 'border-white/10 bg-white/5 focus:bg-white/10'
                    : 'border-slate-200 bg-white/50 focus:bg-white'
                    } outline-none focus:border-cyan-500 transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20 resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-lg bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {lang === 'en' && 'Send Message'}
                {lang === 'th' && 'ส่งข้อความ'}
                {lang === 'ja' && '送信'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: { en: string; th: string; ja: string };
  value: string;
}) {
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/10 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex justify-center mb-6 transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
        <div className="p-4 rounded-full bg-linear-to-br from-cyan-500 to-purple-500 text-white shadow-lg group-hover:shadow-cyan-500/50">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {lang === 'en' && title.en}
        {lang === 'th' && title.th}
        {lang === 'ja' && title.ja}
      </h3>
      <p className="opacity-80 font-medium">{value}</p>
    </div>
  );
}