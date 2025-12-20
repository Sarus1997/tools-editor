"use client";

import { useState, useEffect } from "react";
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
}

export default function PdfList({ files, setFiles }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  /* ---------------- theme sync ---------------- */
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
          ไฟล์ทั้งหมด
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
            onClick={() => setFiles([])}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition"
          >
            <Trash2 size={16} />
            ลบทั้งหมด
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
          <p className="text-sm">ยังไม่มีไฟล์ PDF</p>
          <p className="text-xs opacity-70">
            ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์
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
                  onRemove={() =>
                    setFiles((prev) =>
                      prev.filter((f) => f.id !== file.id)
                    )
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
