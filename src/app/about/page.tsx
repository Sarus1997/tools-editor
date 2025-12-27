'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrollY, setScrollY] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${isDark
      ? 'bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white'
      : 'bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-900'
      }`}>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary linear Orb */}
        <div
          className={`absolute w-150 h-150 rounded-full blur-3xl opacity-30 transition-all duration-1000 ${isDark ? 'bg-linear-to-r from-blue-600 to-purple-600' : 'bg-linear-to-r from-blue-400 to-purple-400'
            }`}
          style={{
            left: mousePos.x / 15 - 300,
            top: mousePos.y / 15 - 300,
            transform: `scale(${1 + scrollY / 5000})`
          }}
        />

        {/* Secondary linear Orb */}
        <div
          className={`absolute w-125 h-125 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${isDark ? 'bg-linear-to-r from-purple-600 to-pink-600' : 'bg-linear-to-r from-purple-400 to-pink-400'
            }`}
          style={{
            right: -mousePos.x / 20,
            bottom: -mousePos.y / 20,
            transform: `scale(${1 + scrollY / 6000})`
          }}
        />

        {/* Accent Orb */}
        <div
          className={`absolute w-100 h-100 rounded-full blur-3xl opacity-25 transition-all duration-1000 ${isDark ? 'bg-linear-to-r from-cyan-500 to-blue-500' : 'bg-linear-to-r from-cyan-300 to-blue-300'
            }`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${1 + scrollY / 4000})`
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className={`absolute inset-0 opacity-[0.03] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
          style={{
            backgroundImage: `linear-linear(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-linear(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-24 text-center space-y-12">
          {/* Animated Title */}
          <div className="space-y-4">
            <h1 className={`text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r ${isDark
              ? 'from-blue-400 via-purple-400 to-pink-400'
              : 'from-blue-600 via-purple-600 to-pink-600'
              } animate-[linear_8s_ease_infinite]`}>
              {lang === 'en' && 'Tools Editor'}
              {lang === 'th' && 'Tools Editor'}
              {lang === 'ja' && 'Tools Editor'}
            </h1>
            <p className={`text-xl md:text-2xl font-light ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
              {lang === 'en' && 'Professional Document Tools for Everyone'}
              {lang === 'th' && 'เครื่องมือจัดการเอกสารระดับมืออาชีพสำหรับทุกคน'}
              {lang === 'ja' && 'すべての人のためのプロフェッショナルドキュメントツール'}
            </p>
          </div>

          {/* Description */}
          <p className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
            {lang === 'en' && (
              <>Tools Editor is a professional suite of powerful, easy-to-use document tools designed to help you edit, merge, and manage files effortlessly — from PDFs to complex workflows — right in your browser. Our platform is secure, lightning fast, multilingual, and absolutely free for users worldwide.</>
            )}
            {lang === 'th' && (
              <>Tools Editor คือชุดเครื่องมือจัดการเอกสารระดับมืออาชีพ ที่ออกแบบมาเพื่อให้คุณสามารถแก้ไข รวม และจัดการไฟล์ได้อย่างง่ายดาย — ตั้งแต่ PDF ไปจนถึง workflow ที่ซับซ้อน — โดยสามารถใช้งานได้ทันทีผ่านเว็บเบราว์เซอร์ของคุณเอง แพลตฟอร์มนี้ปลอดภัย เร็ว และรองรับหลายภาษา พร้อมใช้งานฟรีทั่วโลก</>
            )}
            {lang === 'ja' && (
              <>Tools Editor は、プロフェッショナル向けのドキュメントツールスイートで、PDF の編集・結合・管理をブラウザで簡単に行えるように設計されています。安全で高速、多言語対応、そして世界中のユーザーが無料で利用できます。</>
            )}
          </p>

          {/* Feature Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
            {[
              { label: lang === 'en' ? 'Secure' : lang === 'th' ? 'ปลอดภัย' : 'セキュア', icon: '🔒' },
              { label: lang === 'en' ? 'Fast' : lang === 'th' ? 'รวดเร็ว' : '高速', icon: '⚡' },
              { label: lang === 'en' ? 'Multilingual' : lang === 'th' ? 'หลายภาษา' : '多言語', icon: '🌐' },
              { label: lang === 'en' ? 'Free' : lang === 'th' ? 'ฟรี' : '無料', icon: '✨' }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-white/60 border-purple-200/50 hover:bg-white/80'
                  }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Cards Section */}
        <section className="pb-24 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Why Choose Us Card */}
            <div className={`group p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${isDark
              ? 'bg-linear-to-br from-white/5 to-white/10 border-white/10 hover:border-purple-500/50'
              : 'bg-linear-to-br from-white/80 to-white/60 border-purple-200/50 hover:border-purple-400/50'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`text-4xl p-3 rounded-2xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                  }`}>
                  ⭐
                </div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
                  {lang === 'en' && 'Why Choose Us'}
                  {lang === 'th' && 'ทำไมต้องเลือกเรา'}
                  {lang === 'ja' && '選ばれる理由'}
                </h3>
              </div>

              <ul className="space-y-4">
                {lang === 'en' && (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">🔐</span>
                      <div>
                        <div className="font-semibold text-lg">Secure & Private Processing</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Your files stay private</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">⚡</span>
                      <div>
                        <div className="font-semibold text-lg">Fast and Intuitive Interface</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Lightning-fast performance</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">🌍</span>
                      <div>
                        <div className="font-semibold text-lg">Multilingual Support</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Available in many languages</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">💎</span>
                      <div>
                        <div className="font-semibold text-lg">Free to Use Forever</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>No hidden costs</div>
                      </div>
                    </li>
                  </>
                )}
                {lang === 'th' && (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">🔐</span>
                      <div>
                        <div className="font-semibold text-lg">การประมวลผลที่ปลอดภัยและเป็นส่วนตัว</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>ไฟล์ของคุณเป็นความลับ</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">⚡</span>
                      <div>
                        <div className="font-semibold text-lg">อินเทอร์เฟซที่รวดเร็วและใช้งานง่าย</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>ประสิทธิภาพที่รวดเร็วเหมือนสายฟ้า</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">🌍</span>
                      <div>
                        <div className="font-semibold text-lg">รองรับหลายภาษา</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>ใช้งานได้หลายภาษา</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">💎</span>
                      <div>
                        <div className="font-semibold text-lg">ใช้งานฟรีตลอดไป</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>ไม่มีค่าใช้จ่ายแอบแฝง</div>
                      </div>
                    </li>
                  </>
                )}
                {lang === 'ja' && (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">🔐</span>
                      <div>
                        <div className="font-semibold text-lg">セキュアでプライベートな処理</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>ファイルはプライベートのまま</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">⚡</span>
                      <div>
                        <div className="font-semibold text-lg">高速で直感的なインターフェース</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>超高速パフォーマンス</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">🌍</span>
                      <div>
                        <div className="font-semibold text-lg">多言語サポート</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>多くの言語で利用可能</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl mt-1">💎</span>
                      <div>
                        <div className="font-semibold text-lg">永久に無料で使用可能</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>隠れたコストなし</div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Our Mission Card */}
            <div className={`group p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${isDark
              ? 'bg-linear-to-br from-white/5 to-white/10 border-white/10 hover:border-blue-500/50'
              : 'bg-linear-to-br from-white/80 to-white/60 border-blue-200/50 hover:border-blue-400/50'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`text-4xl p-3 rounded-2xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                  🎯
                </div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                  {lang === 'en' && 'Our Mission'}
                  {lang === 'th' && 'พันธกิจของเรา'}
                  {lang === 'ja' && '私たちのミッション'}
                </h3>
              </div>

              <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'en' && 'We believe in empowering everyone with powerful online tools — eliminating complexity, enhancing productivity, and giving users full control over their documents with no limits.'}
                {lang === 'th' && 'เรามุ่งมั่นที่จะมอบเครื่องมือออนไลน์ที่ทรงพลังให้ทุกคน — ลดความซับซ้อน เพิ่มประสิทธิภาพการทำงาน และมอบการควบคุมไฟล์ให้แก่ผู้ใช้โดยไม่มีข้อจำกัด'}
                {lang === 'ja' && '私たちは、誰もが強力なオンラインツールを使えるようにし、複雑さを排除し、生産性を高め、ユーザーに制限なくドキュメントの完全な制御を提供することを信じています。'}
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {lang === 'en' && 'Eliminate complexity'}
                    {lang === 'th' && 'ลดความซับซ้อน'}
                    {lang === 'ja' && '複雑さを排除'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {lang === 'en' && 'Enhance productivity'}
                    {lang === 'th' && 'เพิ่มประสิทธิภาพ'}
                    {lang === 'ja' && '生産性を向上'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-pink-400' : 'bg-pink-600'}`}></div>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {lang === 'en' && 'Full user control'}
                    {lang === 'th' && 'ควบคุมได้อย่างเต็มที่'}
                    {lang === 'ja' && '完全なユーザー制御'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}