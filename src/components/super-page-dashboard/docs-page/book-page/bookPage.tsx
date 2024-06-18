import React, { useEffect, useRef, useState } from "react";
import { db } from "@/src/services/db";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import Dialog from "@/src/components/general/dialog/dialog";
import HilightedTextDialog from "./selectionModal/HilightedTextDialog/HilightedTextDialog";
import DocumentOptions from "./documentOptions/documentOptions";

import { Viewer, Worker } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = "./pdfWorker/pdf.worker.min.js";

export default function BookPage({ id }: { id: string }) {
  const bookmarkPluginInstance = bookmarkPlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const documentElement = useRef<HTMLDivElement>(null);

  const handleTextHighlight = async () => {
    const setting = await db.setting.where("name").equals("setting").first();
    if (!setting?.leitnerTextSelectionMode!) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      if (selection.toString().trim().length > 0) {
        dispatch(formDataReducer({ title: selection.toString() }));
        setDialogOpen(true);
      }
    } else {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    // const container = containerRef.current;
    db.pdfs.get(id).then((book) => {
      if (book)
        dispatch(formDataReducer({ category: makeUrlFriendly(book.name) }));
      const blob = new Blob([book?.file!], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });
  }, [id, dispatch]);

  return (
    <div className="relative my-4">
      <h1 className="font-bold text-center">PDF Viewer</h1>
      <div>
        {pdfUrl && (
          <div
            className="group relative overflow-y-auto w-full h-full"
            onMouseUp={handleTextHighlight}
            ref={documentElement}
          >
            <div className="hidden group-hover:block fixed  transition-all duration-300 z-10">
              <DocumentOptions
                openDialog={() => setDialogOpen(true)}
                documentElement={documentElement.current!}
              />
            </div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfUrl}
                plugins={[
                  // defaultLayoutPluginInstance,
                  bookmarkPluginInstance,
                  fullScreenPluginInstance,
                ]}
                renderLoader={(percentages: number) => (
                  <div className="w-full my-16">
                    {Math.round(percentages)}
                    <LoadingPulse />
                  </div>
                )}
              />
            </Worker>
          </div>
        )}
      </div>
      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <HilightedTextDialog />
      </Dialog>
    </div>
  );
}
