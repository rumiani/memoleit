import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/src/app/hooks";
import { capitalize } from "lodash";
import BookNameInput from "./bookNameInput/bookNameInput";
import { PdfStateTypes } from "@/src/types/interface";

export default function BookName({ book }: { book: PdfStateTypes }) {
  const { pdfOnEdit } = useAppSelector((state) => state.pdfState);

  return (
    <div>
      {pdfOnEdit === book.id ? (
        <div>
          <BookNameInput book={book} />
        </div>
      ) : (
        <Link href={`/dashboard/docs/${book.id}`}>
          <span
            title={book.name}
            className="text-blue-500 p-2 hover:text-blue-700"
          >
            {capitalize(book.name)}
          </span>
        </Link>
      )}
    </div>
  );
}
