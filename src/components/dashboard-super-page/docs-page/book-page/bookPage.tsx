import { db } from "@/src/services/db";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import SelectionModal from "./selectionModal/selectionModal";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";

export default function BookPage({ id }: { id: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [highlightPosition, setHighlightPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const pageElements = container.querySelectorAll(".react-pdf__Page");
    pageElements.forEach((pageElement, index) => {
      const { top, bottom } = pageElement.getBoundingClientRect();
      if (top < window.innerHeight && bottom >= 0) {
        setCurrentPage(index + 1);
      }
    });
  };
  const handleTextHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setHighlightPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
      dispatch(formDataReducer({ title: selection.toString() }));
    } else {
      setHighlightPosition(null);
    }
  };

  useEffect(() => {
    // setPdfUrl("/m.pdf");
    const container = containerRef.current;

    console.log(id);

    db.pdfs.get(id).then((book) => {
      console.log(book);
      if (book)
        dispatch(formDataReducer({ category: makeUrlFriendly(book.name) }));
      const blob = new Blob([book?.file!], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      console.log(book, book?.file);
    });
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [id, dispatch]);

  return (
    <div className="relative">
      <h1>PDF Viewer</h1>
      <p>Page:{currentPage}</p>
      <div ref={containerRef} style={{ height: "70vh", overflowY: "scroll" }}>
        {pdfUrl && (
          <div className="w-full">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onMouseUp={handleTextHighlight}
              onTouchStart={handleTextHighlight}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  width={containerRef.current?.offsetWidth}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </div>
        )}
      </div>
      <SelectionModal highlightPosition={highlightPosition} />
    </div>
  );
}
