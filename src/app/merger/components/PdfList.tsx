"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { FileText, Trash2 } from "lucide-react";
import type { PDFFile } from "../types";
import PdfItem from "./PdfItem";

const MAX_FILES = 10;

interface Props {
  files: PDFFile[];
  setFiles: React.Dispatch<React.SetStateAction<PDFFile[]>>;
  onDelete: (id: string) => void;
  isDark: boolean;
}

export default function PdfList({ files, setFiles, onDelete, isDark }: Props) {
  const { lang } = useLanguage();

  /* ---------------- drag logic ---------------- */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = files.findIndex((f) => f.id === active.id);
    const newIndex = files.findIndex((f) => f.id === over.id);

    setFiles(
      arrayMove(files, oldIndex, newIndex).map((f, i) => ({
        ...f,
        order: i,
      }))
    );
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <div
      className={`rounded-3xl backdrop-blur-xl p-6 shadow-xl border transition-colors ${isDark
        ? "bg-white/5 border-white/10"
        : "bg-white/70 border-gray-200"
        }`}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {lang === "en" && "Selected Files"}
          {lang === "th" && "ไฟล์ที่เลือก"}
          {lang === "ja" && "選択されたファイル"}
          <span
            className={`ml-2 text-sm ${files.length >= MAX_FILES
              ? "text-red-500"
              : isDark
                ? "text-gray-400"
                : "text-gray-500"
              }`}
          >
            ({files.length}/{MAX_FILES})
          </span>
        </h2>

        {files.length > 0 && (
          <button
            onClick={handleClearAll}
            className={`flex items-center gap-1 text-sm transition relative z-10 ${isDark
              ? "text-red-400 hover:text-red-300"
              : "text-red-500 hover:text-red-600"
              } px-3 py-2 rounded-lg hover:bg-red-500/10`}
          >
            <Trash2 size={16} />
            {lang === "en" && "Clear All"}
            {lang === "th" && "ลบทั้งหมด"}
            {lang === "ja" && "全て削除"}
          </button>
        )}
      </div>

      {/* Empty state */}
      {files.length === 0 ? (
        <div
          className={`flex flex-col items-center gap-3 py-16 ${isDark ? "text-gray-500" : "text-gray-400"
            }`}
        >
          <FileText size={56} className="opacity-30" />
          <p className="text-sm">
            {lang === "en" && "No PDF files yet."}
            {lang === "th" && "ยังไม่มีไฟล์ PDF"}
            {lang === "ja" && "PDFファイルがありません。"}
          </p>
          <p className="text-xs opacity-70">
            {lang === "en" && "Drag & drop files here, or click to select files"}
            {lang === "th" && "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์"}
            {lang === "ja" && "ファイルをここにドラッグ＆ドロップするか、クリックしてファイルを選択してください"}
          </p>
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={files.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {files.map((file) => (
                <PdfItem
                  key={file.id}
                  file={file}
                  onRemove={() => onDelete(file.id)}
                  isDark={isDark}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}