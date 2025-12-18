/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  FileEdit,
  Scissors,
  FileDown,
  FileUp,
  FileSearch,
  FileText,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Clock,
  CheckCircle,
  Users,
  Star,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ReactNode, useEffect, useState } from "react";
import Particles from "@/components/ui/Particles";


type Lang = "en" | "th" | "ja";

export default function HomePage() {
  const { lang } = useLanguage();
  const { scrollY } = useScroll();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const t = {
    en: {
      title: "Professional PDF Tools",
      subtitle: "Transform, edit, and manage your PDFs with ease",
      merge: "Merge PDF",
      mergeDesc: "Combine multiple PDF files into one seamless document",
      compress: "Compress PDF",
      compressDesc: "Reduce PDF size without compromising quality",
      edit: "Edit PDF",
      editDesc: "Modify text, images, and pages effortlessly",
      comingSplit: "Split PDF",
      comingSplitDesc: "Divide large PDFs into smaller files (Coming Soon)",
      comingExtract: "Extract Text",
      comingExtractDesc: "Extract text and data from PDFs (Coming Soon)",
      comingImage: "PDF to Images",
      comingImageDesc: "Convert PDF pages to high-quality images (Coming Soon)",
      comingSearch: "Search in PDF",
      comingSearchDesc: "Advanced search and OCR capabilities (Coming Soon)",
      featuresTitle: "Why Choose Our Tools",
      secure: "Secure & Private",
      secureDesc: "Files are processed locally, never uploaded to servers",
      fast: "Lightning Fast",
      fastDesc: "Optimized algorithms for quick processing",
      free: "100% Free",
      freeDesc: "No subscriptions, no limits, no watermarks",
      global: "Multilingual",
      globalDesc: "Fully supports English, Thai, and Japanese",
      trusted: "Trusted by Thousands",
      trustedDesc: "Users worldwide rely on our tools daily",
      statsTitle: "Our Impact",
      filesProcessed: "Files Processed",
      timeSaved: "Hours Saved",
      happyUsers: "Happy Users",
      countries: "Countries",
    },
    th: {
      title: "เครื่องมือ PDF ระดับมืออาชีพ",
      subtitle: "แปลง แก้ไข และจัดการไฟล์ PDF ของคุณได้อย่างง่ายดาย",
      merge: "รวม PDF",
      mergeDesc: "รวมไฟล์ PDF หลายไฟล์เป็นเอกสารเดียวที่สมบูรณ์",
      compress: "บีบอัด PDF",
      compressDesc: "ลดขนาดไฟล์ PDF โดยไม่ลดคุณภาพ",
      edit: "แก้ไข PDF",
      editDesc: "แก้ไขข้อความ รูปภาพ และหน้าอย่างง่ายดาย",
      comingSplit: "แยก PDF",
      comingSplitDesc: "แบ่งไฟล์ PDF ขนาดใหญ่เป็นไฟล์เล็กๆ (เร็วๆ นี้)",
      comingExtract: "แยกข้อความ",
      comingExtractDesc: "ดึงข้อความและข้อมูลจากไฟล์ PDF (เร็วๆ นี้)",
      comingImage: "PDF เป็นรูปภาพ",
      comingImageDesc: "แปลงหน้า PDF เป็นภาพคุณภาพสูง (เร็วๆ นี้)",
      comingSearch: "ค้นหาใน PDF",
      comingSearchDesc: "ความสามารถในการค้นหาและ OCR ขั้นสูง (เร็วๆ นี้)",
      featuresTitle: "ทำไมต้องเลือกเครื่องมือของเรา",
      secure: "ปลอดภัย & เป็นส่วนตัว",
      secureDesc: "ประมวลผลไฟล์ในเครื่อง ไม่มีการอัพโหลดไปยังเซิร์ฟเวอร์",
      fast: "เร็วสุดๆ",
      fastDesc: "อัลกอริทึมที่ปรับปรุงเพื่อการประมวลผลที่รวดเร็ว",
      free: "ฟรี 100%",
      freeDesc: "ไม่มีค่าสมัครสมาชิก ไม่มีขีดจำกัด ไม่มีลายน้ำ",
      global: "หลายภาษา",
      globalDesc: "รองรับภาษาอังกฤษ ไทย และญี่ปุ่นอย่างเต็มที่",
      trusted: "ได้รับความไว้วางใจจากหลายพันคน",
      trustedDesc: "ผู้ใช้ทั่วโลกไว้วางใจเครื่องมือของเราทุกวัน",
      statsTitle: "ผลกระทบของเรา",
      filesProcessed: "ไฟล์ที่ประมวลผล",
      timeSaved: "ชั่วโมงที่ประหยัดได้",
      happyUsers: "ผู้ใช้ที่พึงพอใจ",
      countries: "ประเทศ",
    },
    ja: {
      title: "プロフェッショナルPDFツール",
      subtitle: "PDFを簡単に変換、編集、管理",
      merge: "PDFを結合",
      mergeDesc: "複数のPDFファイルを1つのシームレスな文書に結合",
      compress: "PDFを圧縮",
      compressDesc: "品質を損なうことなくPDFサイズを縮小",
      edit: "PDFを編集",
      editDesc: "テキスト、画像、ページを簡単に修正",
      comingSplit: "PDF分割",
      comingSplitDesc: "大きなPDFを小さなファイルに分割 (近日公開)",
      comingExtract: "テキスト抽出",
      comingExtractDesc: "PDFからテキストやデータを抽出 (近日公開)",
      comingImage: "PDFを画像に変換",
      comingImageDesc: "PDFページを高品質な画像に変換 (近日公開)",
      comingSearch: "PDF内検索",
      comingSearchDesc: "高度な検索とOCR機能 (近日公開)",
      featuresTitle: "私たちのツールを選ぶ理由",
      secure: "安全 & プライベート",
      secureDesc: "ファイルはローカルで処理され、サーバーにアップロードされません",
      fast: "超高速",
      fastDesc: "高速処理用に最適化されたアルゴリズム",
      free: "100% 無料",
      freeDesc: "サブスクリプション、制限、透かしなし",
      global: "多言語対応",
      globalDesc: "英語、タイ語、日本語を完全にサポート",
      trusted: "数千人に信頼されています",
      trustedDesc: "世界中のユーザーが毎日私たちのツールを利用",
      statsTitle: "私たちの影響",
      filesProcessed: "処理済みファイル",
      timeSaved: "節約時間",
      happyUsers: "満足ユーザー",
      countries: "国",
    },
  }[lang as Lang];

  const titleY = useTransform(scrollY, [0, 300], [0, -60]);
  const gridY = useTransform(scrollY, [0, 300], [0, -30]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.95]);

  const springTitleY = useSpring(titleY, { stiffness: 100, damping: 30 });
  const springGridY = useSpring(gridY, { stiffness: 100, damping: 30 });

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        scale: { delay: i * 0.08 + 0.3, duration: 0.4 },
      },
    }),
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const floatingIcons = [
    { icon: FileEdit, x: "10%", y: "20%", delay: 0 },
    { icon: FileDown, x: "85%", y: "15%", delay: 1 },
    { icon: Scissors, x: "15%", y: "80%", delay: 2 },
    { icon: FileText, x: "90%", y: "75%", delay: 3 },
  ];

  const stats = [
    { value: "500K+", label: t.filesProcessed, icon: FileText },
    { value: "10K+", label: t.timeSaved, icon: Clock },
    { value: "50K+", label: t.happyUsers, icon: Users },
    { value: "150+", label: t.countries, icon: Globe },
  ];

  const features = [
    { icon: Shield, title: t.secure, desc: t.secureDesc, color: "emerald" },
    { icon: Zap, title: t.fast, desc: t.fastDesc, color: "amber" },
    { icon: Star, title: t.free, desc: t.freeDesc, color: "blue" },
    { icon: Globe, title: t.global, desc: t.globalDesc, color: "purple" },
    { icon: Users, title: t.trusted, desc: t.trustedDesc, color: "rose" },
    { icon: CheckCircle, title: "Easy to Use", desc: "Intuitive interface for everyone", color: "indigo" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950/30">
      {/* Animated Background Elements */}
      <Particles count={80} />

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ delay: item.delay, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute"
            style={{ left: item.x, top: item.y }}
          >
            <item.icon className="h-12 w-12 text-indigo-300 dark:text-indigo-700" />
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl" />

      <motion.div
        style={{ y: springTitleY, scale, opacity }}
        className="mx-auto max-w-7xl px-6 py-20 text-center relative"
      >
        {/* Header with Glow Effect */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            {t.title}
            <Sparkles className="inline ml-4 h-10 w-10 text-yellow-500" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative mx-auto mb-16 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white/50 p-6 backdrop-blur-sm dark:bg-zinc-800/50"
            >
              <div className="flex items-center justify-center gap-3">
                <stat.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Tools Grid */}
        <motion.div
          style={{ y: springGridY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-20"
        >
          <ToolCard
            index={1}
            variants={cardVariants}
            href="/merger"
            icon={<FileEdit size={44} />}
            title={t.merge}
            desc={t.mergeDesc}
            color="from-blue-500 to-cyan-500"
            isHovered={hoveredCard === 1}
            onHover={() => setHoveredCard(1)}
            onLeave={() => setHoveredCard(null)}
          />
          <ToolCard
            index={2}
            variants={cardVariants}
            href="/compress"
            icon={<FileDown size={44} />}
            title={t.compress}
            desc={t.compressDesc}
            color="from-emerald-500 to-teal-500"
            isHovered={hoveredCard === 2}
            onHover={() => setHoveredCard(2)}
            onLeave={() => setHoveredCard(null)}
          />
          <ToolCard
            index={3}
            variants={cardVariants}
            href="/editor"
            icon={<FileText size={44} />}
            title={t.edit}
            desc={t.editDesc}
            color="from-purple-500 to-pink-500"
            isHovered={hoveredCard === 3}
            onHover={() => setHoveredCard(3)}
            onLeave={() => setHoveredCard(null)}
          />

          <ComingSoonCard
            index={4}
            variants={cardVariants}
            icon={<Scissors size={44} />}
            title={t.comingSplit}
            desc={t.comingSplitDesc}
            color="from-amber-500 to-orange-500"
          />
          <ComingSoonCard
            index={5}
            variants={cardVariants}
            icon={<FileText size={44} />}
            title={t.comingExtract}
            desc={t.comingExtractDesc}
            color="from-rose-500 to-red-500"
          />
          <ComingSoonCard
            index={6}
            variants={cardVariants}
            icon={<FileUp size={44} />}
            title={t.comingImage}
            desc={t.comingImageDesc}
            color="from-violet-500 to-purple-500"
          />
          <ComingSoonCard
            index={7}
            variants={cardVariants}
            icon={<FileSearch size={44} />}
            title={t.comingSearch}
            desc={t.comingSearchDesc}
            color="from-cyan-500 to-blue-500"
          />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white">
            {t.featuresTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl bg-white/50 p-6 backdrop-blur-sm transition-all hover:bg-white/80 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/80"
              >
                <div className={`mb-4 inline-flex rounded-xl bg-${feature.color}-100 p-3 dark:bg-${feature.color}-900/20`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12 text-white"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to transform your PDF workflow?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Start using our professional tools today. No registration required.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg"
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface CardProps {
  href?: string;
  icon: ReactNode;
  title: string;
  desc?: string;
  variants: any;
  index: number;
  color: string;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

function ToolCard({ href, icon, title, desc, variants, index, color, isHovered, onHover, onLeave }: CardProps) {
  return (
    <motion.div
      custom={index}
      variants={variants}
      whileHover="hover"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative"
    >
      <Link
        href={href!}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/80 p-8 text-left backdrop-blur-sm transition-all dark:bg-zinc-800/80"
      >
        {/* Animated Gradient Border */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        {/* Corner Accents */}
        <div className={`absolute top-0 right-0 h-24 w-24 -translate-y-12 translate-x-12 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300`} />

        <div className="relative z-10">
          <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${color} p-4 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {title}
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-2 inline-block"
              >
                →
              </motion.span>
            )}
          </h2>

          <p className="text-gray-600 dark:text-gray-400">{desc}</p>

          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            className="mt-6 h-1 bg-gradient-to-r from-transparent via-current to-transparent"
          />
        </div>
      </Link>
    </motion.div>
  );
}

function ComingSoonCard({ icon, title, desc, variants, index, color }: CardProps) {
  return (
    <motion.div
      custom={index}
      variants={variants}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50/50 p-8 backdrop-blur-sm dark:from-zinc-800/50 dark:to-zinc-900/50"
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative">
        <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${color} p-4 opacity-80`}>
          {icon}
        </div>

        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900/50 dark:text-white/50">
            {title}
          </h2>
          <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-semibold text-white">
            SOON
          </span>
        </div>

        <p className="text-gray-500 dark:text-gray-500">{desc}</p>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Coming Soon</span>
        </div>
      </div>
    </motion.div>
  );
}