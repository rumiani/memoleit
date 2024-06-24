import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { PdfStateTypes } from "@/src/types/interface";
import Link from "next/link";
import React from "react";
import BookOptions from "./bookOptions/bookOptions";
import BookName from "./bookName/bookName";

export default function Book({ book }: { book: PdfStateTypes }) {
  function formatFileSize(sizeInBytes: number): string {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(0)} kB`;
    } else {
      const sizeInMB = sizeInKB / 1024;
      return `${sizeInMB.toFixed(2)} MB`;
    }
  }
  return (
    <div className="relative w-72 h-52 border border-gray-400 rounded-lg p-4 flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <span className="text-xs font-bold">
          {timeToNowHandler(book.createdAt).daysHoursAgo}
        </span>
        <BookOptions book={book} />
      </div>

      <BookName book={book}/>
      <span className="absolute bottom-4 left-4">
        Size: {formatFileSize(book.size!)}
      </span>
    </div>
  );
}
