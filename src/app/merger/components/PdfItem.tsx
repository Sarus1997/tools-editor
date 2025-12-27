"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FileText, X } from "lucide-react";
import type { PDFFile } from "../types";

interface Props {
  file: PDFFile;
  onRemove: () => void;
  isDark: boolean;
}

export default function PdfItem({ file, onRemove, isDark }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกัน event bubbling
    e.preventDefault(); // ป้องกันพฤติกรรมเริ่มต้น
    onRemove();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group flex items-center justify-between
        p-4 rounded-2xl
        backdrop-blur
        border transition-all duration-200
        hover:shadow-lg hover:shadow-cyan-500/10
        ${isDark
          ? "bg-white/5 border-white/10 hover:bg-white/10"
          : "bg-gray-50/80 border-gray-200 hover:bg-gray-100"
        }
      `}
    >
      {/* ส่วนที่สามารถลากได้ */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center gap-3 overflow-hidden flex-1 cursor-grab active:cursor-grabbing"
      >
        <FileText className={`${isDark ? "text-cyan-400" : "text-cyan-500"} shrink-0`} />
        <span className={`truncate text-sm font-medium transition ${isDark
          ? "text-gray-100 group-hover:text-white"
          : "text-gray-800 group-hover:text-gray-900"
          }`}>
          {file.name}
        </span>
      </div>

      {/* ปุ่มลบแยกต่างหาก ไม่ควรมี drag listener */}
      <button
        onClick={handleRemoveClick}
        className={`relative z-10 ${isDark
          ? "text-red-400 hover:text-red-300"
          : "text-red-500 hover:text-red-600"
          } transition p-2 rounded-lg hover:bg-red-500/10`}
        style={{ touchAction: "manipulation" }} // สำหรับ mobile
      >
        <X size={18} />
      </button>
    </div>
  );
}