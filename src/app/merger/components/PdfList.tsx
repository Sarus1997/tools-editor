"use client";

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
    <div className="mt-6 rounded-2xl border border-gray-700 bg-gray-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">
          ไฟล์ทั้งหมด{" "}
          <span
            className={
              files.length >= MAX_FILES
                ? "text-red-400"
                : "text-gray-400"
            }
          >
            ({files.length}/{MAX_FILES})
          </span>
        </h2>

        {files.length > 0 && (
          <button
            onClick={() => setFiles([])}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500"
          >
            <Trash2 size={16} />
            ลบทั้งหมด
          </button>
        )}
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-gray-500">
          <FileText size={48} className="opacity-40" />
          ยังไม่มีไฟล์
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
            <div className="space-y-2">
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
