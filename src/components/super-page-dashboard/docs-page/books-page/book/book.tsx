import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { PdfStateTypes } from "@/src/types/interface";
import Link from "next/link";
import React from "react";

export default function Book({ book }: { book: PdfStateTypes }) {
  console.log(book);
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
    <div className="relative w-52 h-36 border border-gray-400 rounded-lg p-4 flex flex-col">
      <span className="text-xs font-bold">
        {timeToNowHandler(book.createdAt).daysHoursAgo}
      </span>
      <Link href={`/dashboard/docs/${book.id}`}>
        <span
          title={book.name}
          className="text-blue-500 p-2 hover:text-blue-700"
        >
          {book.name}
        </span>
      </Link>
      <span className="absolute bottom-4 left-4">
        Size: {formatFileSize(book.size!)}
      </span>
    </div>
  );
}
