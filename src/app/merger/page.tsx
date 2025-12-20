"use client";

import { useState, useEffect } from "react";
import { Download, ArrowLeft } from "lucide-react";
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

  const [files, setFiles] = useState<PDFFile[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // popup state
  const [showNameModal, setShowNameModal] = useState(false);
  const [fileName, setFileName] = useState("merged");

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
      className={`min-h-screen transition-colors duration-500 ${isDark
        ? "bg-linear-to-br from-gray-950 via-gray-900 to-black text-white"
        : "bg-linear-to-br from-gray-50 via-white to-gray-100 text-gray-900"
        }`}
    >
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* back */}
        <Link
          href="/"
          className={`mb-6 inline-flex items-center gap-2 text-sm transition ${isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
            }`}
        >
          <ArrowLeft size={18} />
          {lang === "en" && "Back to Home"}
          {lang === "th" && "กลับหน้าแรก"}
          {lang === "ja" && "ホームに戻る"}
        </Link>

        {/* card */}
        <div
          className={`rounded-3xl backdrop-blur-xl p-8 shadow-2xl border transition-colors ${isDark
            ? "bg-white/5 border-white/10"
            : "bg-white/70 border-gray-200"
            }`}
        >
          <UploadArea
            disabled={files.length >= MAX_FILES}
            onFiles={handleUpload}
          />

          <PdfList files={files} setFiles={setFiles} />

          <div className="mt-10 text-center">
            <button
              disabled={files.length === 0}
              onClick={() => setShowNameModal(true)}
              className="
                inline-flex items-center gap-2
                rounded-2xl
                bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500
                bg-size-[200%_200%]
                px-10 py-4 font-semibold text-white
                shadow-lg shadow-cyan-500/30
                transition-all duration-300
                hover:scale-105 hover:bg-right
                active:scale-95
                disabled:opacity-40 disabled:shadow-none
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
            className={`relative w-full max-w-md rounded-3xl p-8 shadow-2xl border ${isDark
              ? "bg-gray-900/80 border-white/10 text-white"
              : "bg-white border-gray-200 text-gray-900"
              }`}
          >
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
              className={`w-full rounded-xl px-4 py-3 mb-6 outline-none border ${isDark
                ? "bg-black/30 border-white/10"
                : "bg-gray-50 border-gray-300"
                }`}
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  downloadMerged("merged");
                  setShowNameModal(false);
                }}
                className="rounded-xl px-4 py-2 text-sm opacity-70 hover:opacity-100"
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
                  bg-linear-to-r from-blue-500 to-cyan-400
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
