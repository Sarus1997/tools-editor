"use client";

import { PDFDocument } from "pdf-lib";

export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();

  // Cast to Uint8Array to resolve the type issue
  return new Blob([mergedBytes as Uint8Array<ArrayBuffer>], {
    type: "application/pdf"
  });
}