"use client";

import { CloudUpload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  disabled?: boolean;
  onFiles: (files: FileList) => void;
}

export default function UploadArea({ disabled, onFiles }: Props) {
  const { lang } = useLanguage();

  return (
    <label
      className={`
        group relative mb-8
        flex cursor-pointer flex-col items-center justify-center
        rounded-3xl border-2 border-dashed
        p-12 text-center
        transition-all duration-300
        ${disabled
          ? "cursor-not-allowed border-gray-700 bg-gray-800/60 text-gray-500"
          : "border-cyan-400/60 bg-white/5 hover:bg-cyan-400/10 hover:border-cyan-300"
        }
      `}
    >
      <CloudUpload
        size={46}
        className="
          mb-4 text-cyan-400
          transition-transform duration-300
          group-hover:-translate-y-1 group-hover:scale-110
        "
      />

      <p className="text-sm font-medium">
        {disabled ? (
          <>
            {lang === "en" && "Maximum of 10 files reached"}
            {lang === "th" && "เพิ่มไฟล์ครบ 10 ไฟล์แล้ว"}
            {lang === "ja" && "最大ファイル数10に達しました"}
          </>
        ) : (
          <>
            {lang === "en" && "Click or drop PDF files here"}
            {lang === "th" && "คลิกหรือวางไฟล์ PDF ที่นี่"}
            {lang === "ja" &&
              "ここをクリックするか、PDFファイルをドロップしてください"}
          </>
        )}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {lang === "en" && "PDF files only"}
        {lang === "th" && "รองรับไฟล์ PDF เท่านั้น"}
        {lang === "ja" && "PDF ファイルのみ"}
      </p>

      <input
        type="file"
        accept="application/pdf"
        multiple
        hidden
        disabled={disabled}
        onChange={(e) => e.target.files && onFiles(e.target.files)}
      />
    </label>
  );
}
