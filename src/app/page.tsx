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
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomePage() {
  const { lang } = useLanguage();
  const { scrollY } = useScroll();

  // ===== i18n (FIXED – no syntax error) =====
  const t = {
    en: {
      title: "PDF Tools",
      subtitle: "Choose a tool to get started",
      merge: "Merge PDF",
      mergeDesc: "Combine multiple PDF files into one",
      compress: "Compress PDF",
      compressDesc: "Reduce the file size of your PDFs",
      edit: "Edit PDF",
      editDesc: "Modify your PDF files easily",
      comingSplit: "Split PDF (coming soon)",
      comingExtract: "Extract Text (coming soon)",
      comingImage: "PDF to Images (coming soon)",
      comingSearch: "Search in PDF (coming soon)",
    },
    th: {
      title: "เครื่องมือ PDF",
      subtitle: "เลือกเครื่องมือที่ต้องการใช้งาน",
      merge: "รวม PDF",
      mergeDesc: "รวมไฟล์ PDF หลายไฟล์เป็นไฟล์เดียว",
      compress: "บีบอัด PDF",
      compressDesc: "ลดขนาดไฟล์ PDF ของคุณ",
      edit: "แก้ไข PDF",
      editDesc: "แก้ไขไฟล์ PDF ของคุณได้อย่างง่ายดาย",
      comingSplit: "แยก PDF (กำลังพัฒนา)",
      comingExtract: "แยกข้อความ (กำลังพัฒนา)",
      comingImage: "แปลง PDF เป็นรูปภาพ (กำลังพัฒนา)",
      comingSearch: "ค้นหาใน PDF (กำลังพัฒนา)",
    },
    ja: {
      title: "PDFツール",
      subtitle: "使用するツールを選択してください",
      merge: "PDFを結合",
      mergeDesc: "複数のPDFを1つのファイルに結合します",
      compress: "PDFを圧縮",
      compressDesc: "PDFファイルのサイズを縮小します",
      edit: "PDFを編集",
      editDesc: "PDFファイルを簡単に編集できます",
      comingSplit: "PDF分割（近日公開）",
      comingExtract: "テキスト抽出（近日公開）",
      comingImage: "PDFを画像に変換（近日公開）",
      comingSearch: "PDF内検索（近日公開）",
    },
  }[lang];

  // ===== Parallax =====
  const titleY = useTransform(scrollY, [0, 300], [0, -60]);
  const gridY = useTransform(scrollY, [0, 300], [0, -30]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-indigo-50 via-white to-white" />

      <motion.div style={{ y: titleY }} className="mx-auto max-w-275 px-6 py-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-4xl font-bold md:text-5xl"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-14 max-w-xl text-lg text-gray-600"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          style={{ y: gridY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
        >
          <ToolCard index={1} variants={cardVariants} href="/merger" icon={<FileEdit size={44} />} title={t.merge} desc={t.mergeDesc} />
          <ToolCard index={2} variants={cardVariants} href="/compress" icon={<FileDown size={44} />} title={t.compress} desc={t.compressDesc} />
          <ToolCard index={3} variants={cardVariants} href="/editor" icon={<FileDown size={44} />} title={t.edit} desc={t.editDesc} />

          <DisabledCard index={4} variants={cardVariants} icon={<Scissors size={44} />} title={t.comingSplit} />
          <DisabledCard index={5} variants={cardVariants} icon={<FileText size={44} />} title={t.comingExtract} />
          <DisabledCard index={6} variants={cardVariants} icon={<FileUp size={44} />} title={t.comingImage} />
          <DisabledCard index={7} variants={cardVariants} icon={<FileSearch size={44} />} title={t.comingSearch} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ToolCard({ href, icon, title, desc, variants, index }: any) {
  return (
    <motion.div custom={index} variants={variants}>
      <Link
        href={href}
        className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:scale-110">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{desc}</p>
      </Link>
    </motion.div>
  );
}

function DisabledCard({ icon, title, variants, index }: any) {
  return (
    <motion.div custom={index} variants={variants} className="rounded-2xl border border-gray-200 bg-white p-8 opacity-40">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </motion.div>
  );
}
