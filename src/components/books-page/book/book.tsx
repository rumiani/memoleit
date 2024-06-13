import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { PdfTypes } from "@/src/types/interface";
import Link from "next/link";
import React from "react";

export default function Book({ book }: { book: PdfTypes }) {
  console.log(timeToNowHandler(book.createdAt));
  
  function formatFileSize(sizeInBytes: number): string {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(2)} KB`;
    } else {
      const sizeInMB = sizeInKB / 1024;
      return `${sizeInMB.toFixed(2)} MB`;
    }
  }
  return (
    <div className="w-36 border border-gray-400 rounded-lg p-4 flex flex-col">
      <Link href={`/study/books/${book.id}`}>
        <span className="text-blue-500 hover:text-blue-700">{book.name}</span>
      </Link>
      <span>Size: {formatFileSize(book.file.size)}</span>
    </div>
  );
}
