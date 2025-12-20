"use client";

import { useState, useEffect } from "react";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { PDFFile } from "./types";
import { mergePDFs } from "./utils/mergePDFs";
import UploadArea from "./components/UploadArea";
import PdfList from "./components/PdfList";

const MAX_FILES = 10;
const uid = () => crypto.randomUUID();

export default function MergerPage() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  /* ------------------ theme sync (เหมือน PremiumLanding) ------------------ */
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
  const downloadMerged = async () => {
    const blob = await mergePDFs(
      [...files]
        .sort((a, b) => a.order - b.order)
        .map((f) => f.file)
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
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
        <Link
          href="/"
          className={`mb-6 inline-flex items-center gap-2 text-sm transition ${isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
            }`}
        >
          <ArrowLeft size={18} />
          กลับหน้าแรก
        </Link>

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
              onClick={downloadMerged}
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
              รวมและดาวน์โหลด PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
