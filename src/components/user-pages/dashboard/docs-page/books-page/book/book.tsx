import { timeToNowHandler } from "@/src/handlers/general/timeToNowHandler";
import React from "react";
import BookOptions from "./bookOptions/bookOptions";
import BookName from "./bookName/bookName";
import { PdfStateTypes } from "@/src/types/interface";

export default function Book({ book }: { book: PdfStateTypes }) {
  return (
    <div className="relative w-72 h-52 border border-gray-400 rounded-lg p-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <span className="text-xs font-bold">
          {timeToNowHandler(book.createdAt).daysHoursAgo}
        </span>
        <BookOptions book={book} />
      </div>
      <BookName book={book} />
      {book.numberOfPages > 0 && (
        <div className="absolute bottom-4 flex  w-full gap-2 left-4">
          <span>Pages:{book.numberOfPages}</span>
          <span className="text-green-500">
            Last page:{book.lastVisitedPage + 1}
          </span>
        </div>
      )}
    </div>
  );
}
