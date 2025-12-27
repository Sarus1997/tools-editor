"use client";

import { useState, useEffect, useRef } from "react";
import { Download, ArrowLeft, X, Sparkles } from "lucide-react";
import Link from "next/link";
import type { PDFFile } from "./types";
import { mergePDFs } from "./utils/mergePDFs";
import UploadArea from "./components/UploadArea";
import PdfList from "./components/PdfList";
import { useLanguage } from "@/contexts/LanguageContext";

const MAX_FILES = 10;
const uid = () => crypto.randomUUID();

export default function MergerPage() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<PDFFile[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // popup state
  const [showNameModal, setShowNameModal] = useState(false);
  const [fileName, setFileName] = useState("merged");

  /* ------------------ mouse tracking ------------------ */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  /* ------------------ theme detect ------------------ */
  useEffect(() => {
    const checkTheme = () => {
      setTheme(
        document.documentElement.classList.contains("dark")
          ? "dark"
          : "light"
      );
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  /* ------------------ upload logic ------------------ */
  const handleUpload = (list: FileList) => {
    setFiles((prev) => {
      const incoming: PDFFile[] = Array.from(list)
        .filter((f) => f.type === "application/pdf")
        .map((file, i) => ({
          id: uid(),
          name: file.name,
          file,
          order: prev.length + i,
        }));

      return [...prev, ...incoming].slice(0, MAX_FILES);
    });
  };

  /* ------------------ delete file logic ------------------ */
  const handleDeleteFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  /* ------------------ merge & download ------------------ */
  const downloadMerged = async (name: string) => {
    const blob = await mergePDFs(
      [...files]
        .sort((a, b) => a.order - b.order)
        .map((f) => f.file)
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name || "merged"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ------------------ UI ------------------ */
  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDark
        ? "bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
        : "bg-linear-to-br from-slate-50 via-purple-50 to-slate-50 text-slate-900"
        }`}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute w-37.5 h-37.5 rounded-full blur-3xl transition-all duration-300 ${isDark ? "bg-cyan-500/20" : "bg-cyan-400/30"
            }`}
          style={{
            left: mousePos.x / 20,
            top: mousePos.y / 20,
            transform: "translate(-50%, -50%)"
          }}
        />
        <div
          className={`absolute w-37.5 h-37.5 rounded-full blur-3xl transition-all duration-300 ${isDark ? "bg-purple-500/20" : "bg-purple-400/30"
            }`}
          style={{
            right: mousePos.x / 30,
            bottom: mousePos.y / 30,
            transform: "translate(50%, 50%)"
          }}
        />
        <div
          className={`absolute w-25 h-25 rounded-full blur-3xl transition-all duration-500 ${isDark ? "bg-pink-500/15" : "bg-pink-400/25"
            }`}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm transition py-10 ${isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
            }`}
        >
          <ArrowLeft size={18} />
          {lang === "en" && "Back to Home"}
          {lang === "th" && "กลับหน้าแรก"}
          {lang === "ja" && "ホームに戻る"}
        </Link>

        {/* Header Section */}
        <div className="pt-3 pb-8">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="text-sm font-medium bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {lang === "en" && "PDF Merger Tool"}
                {lang === "th" && "เครื่องมือรวมไฟล์ PDF"}
                {lang === "ja" && "PDF結合ツール"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              {lang === "en" && "Merge PDF Files"}
              {lang === "th" && "รวมไฟล์ PDF"}
              {lang === "ja" && "PDFファイルを結合"}
            </h1>

            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              {lang === "en" &&
                "Combine multiple PDF files into one document quickly and easily"}
              {lang === "th" &&
                "รวมหลายไฟล์ PDF เป็นไฟล์เดียวอย่างรวดเร็วและง่ายดาย"}
              {lang === "ja" &&
                "複数のPDFファイルを素早く簡単に1つのドキュメントに結合"}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative pb-32">
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <UploadArea
              disabled={files.length >= MAX_FILES}
              onFiles={handleUpload}
            />

            <PdfList
              files={files}
              setFiles={setFiles}
              onDelete={handleDeleteFile}
              isDark={isDark}
            />

            <div className="mt-10 text-center">
              <button
                disabled={files.length === 0}
                onClick={() => setShowNameModal(true)}
                className="
                  inline-flex items-center gap-2
                  rounded-2xl
                  bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500
                  bg-size-[200%_200%]
                  px-10 py-4 font-bold text-lg text-white
                  shadow-lg shadow-purple-500/30
                  transition-all duration-300
                  hover:scale-105 hover:bg-right hover:shadow-2xl hover:shadow-purple-500/50
                  active:scale-95
                  disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100
                "
              >
                <Download size={20} />
                {lang === "en" && "Merge & Download PDF"}
                {lang === "th" && "รวมและดาวน์โหลด PDF"}
                {lang === "ja" && "PDF を結合してダウンロード"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ Save name modal ------------------ */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowNameModal(false)}
          />

          {/* modal */}
          <div
            className={`relative w-full max-w-md rounded-3xl p-8 shadow-2xl border backdrop-blur-xl ${isDark
              ? "bg-slate-900/80 border-white/10 text-white"
              : "bg-white/90 border-gray-200 text-gray-900"
              }`}
          >
            {/* เพิ่มปุ่มปิดที่มุมขวาบน */}
            <button
              onClick={() => setShowNameModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-full ${isDark
                ? "hover:bg-white/10"
                : "hover:bg-gray-100"
                }`}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-2">
              {lang === "en" && "Save PDF"}
              {lang === "th" && "บันทึกไฟล์ PDF"}
              {lang === "ja" && "PDF を保存"}
            </h2>

            <p className="text-sm opacity-70 mb-6">
              {lang === "en" && "Choose a file name before downloading"}
              {lang === "th" && "เลือกชื่อไฟล์ก่อนดาวน์โหลด"}
              {lang === "ja" && "ダウンロード前にファイル名を選択"}
            </p>

            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="merged"
              className={`w-full rounded-xl px-4 py-3 mb-6 outline-none border backdrop-blur-sm ${isDark
                ? "bg-black/30 border-white/10 text-white"
                : "bg-white/50 border-gray-300 text-gray-900"
                }`}
            />

            <div className="flex gap-3 justify-end">
              {/* ปุ่มยกเลิกใหม่ */}
              <button
                onClick={() => setShowNameModal(false)}
                className={`rounded-xl px-4 py-2 text-sm ${isDark
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors`}
              >
                {lang === "en" && "Cancel"}
                {lang === "th" && "ยกเลิก"}
                {lang === "ja" && "キャンセル"}
              </button>

              <button
                onClick={() => {
                  downloadMerged("merged");
                  setShowNameModal(false);
                }}
                className={`rounded-xl px-4 py-2 text-sm ${isDark
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors`}
              >
                {lang === "en" && "Use default"}
                {lang === "th" && "ใช้ชื่อเดิม"}
                {lang === "ja" && "デフォルト名"}
              </button>

              <button
                onClick={() => {
                  downloadMerged(fileName);
                  setShowNameModal(false);
                }}
                className="
                  rounded-xl px-6 py-2 font-semibold text-white
                  bg-linear-to-r from-cyan-500 to-purple-500
                  transition hover:scale-105
                "
              >
                {lang === "en" && "Save"}
                {lang === "th" && "บันทึก"}
                {lang === "ja" && "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}