/* eslint-disable react-hooks/purity */

'use client';

import { useState, useEffect } from 'react';
import { Zap, Shield, Globe, CheckCircle, Users, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function OurPlatform() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const { lang } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: (
        <>
          {lang === 'en' && 'Secure & Private'}
          {lang === 'th' && 'ปลอดภัยและการเป็นส่วนตัว'}
          {lang === 'ja' && '安全かつプライベート'}
        </>
      ),
      desc: (
        <>
          {lang === 'en' && 'Files processed locally, never uploaded'}
          {lang === 'th' && 'ไฟล์ถูกประมวลผลในเครื่อง ไม่เคยอัปโหลด'}
          {lang === 'ja' && 'ファイルはローカルで処理され、アップロードされることはありません'}
        </>
      ),
      linear: 'from-emerald-400 to-teal-400',
    },
    {
      icon: Zap,
      title: (
        <>
          {lang === 'en' && 'Lightning Fast'}
          {lang === 'th' && 'เร็วทันใจ'}
          {lang === 'ja' && '瞬時に'}
        </>
      ),
      desc: (
        <>
          {lang === 'en' && 'Optimized for instant processing'}
          {lang === 'th' && 'ไฟล์ถูกประมวลผลในเครื่อง ไม่เคยอัปโหลด'}
          {lang === 'ja' && 'ファイルはローカルで処理され、アップロードされることはありません'}
        </>
      ),
      linear: 'from-amber-400 to-orange-400',
    },
    {
      icon: Star,
      title: (
        <>
          {lang === 'en' && '100% Free, No Limits, No Watermarks'}
          {lang === 'th' && 'ฟรี 100% ไม่มีข้อจำกัด ไม่มีลายน้ำ'}
          {lang === 'ja' && '100%無料、制限なし、透かしなし'}
        </>
      ),
      desc: (
        <>
          {lang === 'en' && 'No limits, no watermarks, forever'}
          {lang === 'th' && 'ไม่มีข้อจำกัด ไม่มีลายน้ำ ตลอดไป'}
          {lang === 'ja' && '制限なし、透かしなし、永久に'}
        </>
      ),
      linear: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Globe,
      title: (
        <>
          {lang === 'en' && 'Multilingual'}
          {lang === 'th' && 'หลายภาษา'}
          {lang === 'ja' && '多言語対応'}
        </>
      ),
      desc: (
        <>
          {lang === 'en' && 'Full support for 3+ languages'}
          {lang === 'th' && 'รองรับภาษา 3 ภาษาขึ้นไป'}
          {lang === 'ja' && '3つ以上の言語を完全にサポート'}
        </>
      ),
      linear: 'from-purple-400 to-pink-400',
    },
    {
      icon: Users,
      title: (
        <>
          {lang === 'en' && 'Trusted Globally'}
          {lang === 'th' && 'เชื่อถือได้ทั่วโลก'}
          {lang === 'ja' && '世界中で信頼'}
        </>
      ),
      desc: (
        <>
          {lang === 'en' && 'Used by thousands worldwide'}
          {lang === 'th' && 'ใช้งานโดยพันคนทั่วโลก'}
          {lang === 'ja' && '世界中の数千人によって使用'}
        </>
      ),
      linear: 'from-rose-400 to-red-400',
    },
    {
      icon: CheckCircle,
      title: (
        <>
          {lang === 'en' && 'Easy to Use'}
          {lang === 'th' && 'ใช้งานง่าย'}
          {lang === 'ja' && '使いやすい'}
        </>
      ),
      desc: (
        <>
          {lang === 'en' && 'Intuitive design for everyone'}
          {lang === 'th' && 'การออกแบบที่เข้าใจง่ายสำหรับทุกคน'}
          {lang === 'ja' && '誰もが使える直感的なデザイン'}
        </>
      ),
      linear: 'from-indigo-400 to-violet-400',
    },
  ];

  const isDark = theme === 'dark';

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6">
      {/* Features Section */}
      <div className="mb-32">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {lang === 'en' && 'Why Choose '}
          {lang === 'th' && 'ทำไมต้องเลือก'}
          {lang === 'ja' && 'なぜ私たちのプラットフォームを選ぶのか '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
            {lang === 'en' && 'Our Platform'}
            {lang === 'th' && 'แพลตฟอร์มของเรา'}
            {lang === 'ja' && '私たちのプラットフォーム'}
          </span>
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
  );
}