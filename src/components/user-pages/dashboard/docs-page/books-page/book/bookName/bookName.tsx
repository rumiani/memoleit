import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/src/app/hooks";
import { capitalize, startCase } from "lodash";
import BookNameInput from "./bookNameInput/bookNameInput";
import { PdfStateTypes } from "@/src/types/interface";
import { getDocsUrl } from "@/src/handlers/getUrls/getDocsUrl";

export default function BookName({ book }: { book: PdfStateTypes }) {
  const { pdfOnEdit } = useAppSelector((state) => state.pdfState);

  return (
    <div>
      {pdfOnEdit === book.id ? (
        <div>
          <BookNameInput book={book} />
        </div>
      ) : (
        <Link href={getDocsUrl(book.id,book.name)}>
          <span
            title={startCase(book.name)}
            className="text-blue-500 p-2 hover:text-blue-700"
          >
            {startCase(book.name)}
          </span>
        </Link>
      )}
    </div>
  );
}
