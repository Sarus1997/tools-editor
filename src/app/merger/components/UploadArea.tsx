"use client";

import { CloudUpload } from "lucide-react";

interface Props {
  disabled?: boolean;
  onFiles: (files: FileList) => void;
}

export default function UploadArea({ disabled, onFiles }: Props) {
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
        {disabled
          ? "เพิ่มไฟล์ครบ 10 ไฟล์แล้ว"
          : "คลิกหรือวางไฟล์ PDF ที่นี่"}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        รองรับไฟล์ PDF เท่านั้น
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
