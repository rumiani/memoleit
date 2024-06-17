import React, { useEffect, useRef, useState } from "react";
import { db } from "@/src/services/db";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import Dialog from "@/src/components/general/dialog/dialog";
import HilightedTextDialog from "./selectionModal/HilightedTextDialog/HilightedTextDialog";
import DocumentOptions from "./documentOptions/documentOptions";

export default function BookPage({ id }: { id: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const[isLandscape,setIsLandscape]=useState(false);
  const dispatch = useAppDispatch();
  const documentElement = useRef<HTMLDivElement>(null);
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
  const handleTextHighlight = async () => {
    const setting = await db.setting.where("name").equals("setting").first();
    if (!setting?.leitnerTextSelectionMode!) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      // const range = selection.getRangeAt(0);
      // const rect = range.getBoundingClientRect();
      if (selection.toString().trim().length > 0) {
        dispatch(formDataReducer({ title: selection.toString() }));
        setDialogOpen(true);
      }
    } else {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    db.pdfs.get(id).then((book) => {
      if (book)
        dispatch(formDataReducer({ category: makeUrlFriendly(book.name) }));
      const blob = new Blob([book?.file!], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }

    setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
  }, [id, dispatch]);

  return (
    <div className="relative">
      <h1>PDF Viewer</h1>
      <p>
        Page:{currentPage} of {numPages}
      </p>
      <div ref={containerRef} >
        {pdfUrl && (
          <div ref={documentElement} className={` group relative overflow-y-auto w-full h-96`}>
            <div className="hidden group-hover:block fixed  transition-all duration-300 z-10">
            <DocumentOptions openDialog={()=> setDialogOpen(true)} documentElement={documentElement.current!}/>
            </div>
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
      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <HilightedTextDialog />
      </Dialog>
    </div>
  );
}
