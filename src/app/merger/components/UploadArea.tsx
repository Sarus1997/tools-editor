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
        flex cursor-pointer flex-col items-center justify-center
        rounded-2xl border-2 border-dashed p-10 text-center transition
        ${disabled
          ? "cursor-not-allowed border-gray-600 bg-gray-800 text-gray-500"
          : "border-blue-400 hover:bg-blue-900/30"
        }
      `}
    >
      <CloudUpload size={42} className="mb-3" />
      <p className="text-sm">
        {disabled
          ? "เพิ่มไฟล์ครบ 10 ไฟล์แล้ว"
          : "คลิกหรือวางไฟล์ PDF ที่นี่"}
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
