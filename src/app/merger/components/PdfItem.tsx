"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FileText, X } from "lucide-react";
import type { PDFFile } from "../types";

interface Props {
  file: PDFFile;
  onRemove: () => void;
}

export default function PdfItem({ file, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        group flex items-center justify-between
        p-4 rounded-2xl
        bg-white/5 backdrop-blur
        border border-white/10
        transition-all duration-200
        hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10
        cursor-grab active:cursor-grabbing
      "
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <FileText className="text-cyan-400 shrink-0" />
        <span className="truncate text-sm font-medium text-gray-200 group-hover:text-white transition">
          {file.name}
        </span>
      </div>

      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-500 transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}
