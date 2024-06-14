import React from "react";
import BooksPage from "./books-page/booksPage";
import NewPdfPage from "./newpdf-page/newPdfPage";

export default function DocsPage() {
  return (
    <div>
      <NewPdfPage />
      <BooksPage />
    </div>
  );
}
