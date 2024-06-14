"use client";
import React from "react";
import NewPdfPage from "@/src/components/newpdf-page/newPdfPage";
import BooksPage from "@/src/components/books-page/booksPage";

export default function Page() {
  return (
    <div>
      <NewPdfPage />
      <BooksPage />
    </div>
  );
}
