import { db } from "@/src/services/db";
import { PdfTypes } from "@/src/types/interface";
import { divide } from "lodash";
import React, { useEffect, useState } from "react";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import LoadingPulses from "../loading-comps/loadingPulses/loadingPulses";
import Book from "./book/book";

export default function BooksPage() {
  const [books, setBooks] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.pdfs
      .toArray()
      .then((pdfs) => {
        console.log(pdfs);
        setBooks(pdfs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loading) return <LoadingPulses />;
  return (
    <div className="p-4">
      <h2>List of the books:</h2>
      <div>
        {books.length === 0 ? (
          <div>There is no book to read.</div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {books.map((book: PdfTypes, i: number) => {
              return (
                <div key={i}>
                  <Book book={book} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
