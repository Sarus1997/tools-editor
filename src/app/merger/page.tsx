"use client";

import { useState } from "react";
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-white">
      <Link href="/" className="mb-6 flex items-center gap-2 text-gray-400">
        <ArrowLeft size={18} />
        กลับหน้าแรก
      </Link>

      <UploadArea
        disabled={files.length >= MAX_FILES}
        onFiles={handleUpload}
      />

      <PdfList files={files} setFiles={setFiles} />

      <div className="mt-8 text-center">
        <button
          disabled={files.length === 0}
          onClick={downloadMerged}
          className="
            rounded-xl bg-linear-to-r from-blue-500 to-cyan-500
            px-8 py-4 font-semibold transition
            hover:scale-105 disabled:opacity-40
          "
        >
          <Download className="mr-2 inline" />
          รวมและดาวน์โหลด PDF
        </button>
      </div>
    </div>
  );
}
