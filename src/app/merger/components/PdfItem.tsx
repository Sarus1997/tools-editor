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
      className="flex items-center justify-between
        p-4 mb-2 rounded-xl
        bg-white/5 border border-white/10
        hover:bg-white/10 transition cursor-grab"
    >
      <div className="flex items-center gap-3">
        <FileText className="text-cyan-400" />
        <span className="text-sm font-medium">{file.name}</span>
      </div>

      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-500"
      >
        <X size={18} />
      </button>
    </div>
  );
}
