import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = "./pdfWorker/pdf.worker.min.js";
import type { ToolbarSlot, ToolbarProps } from "@react-pdf-viewer/toolbar";
import FullscreenBtn from "./fullscreenBtn/fullscreenBtn";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import SelectionTextComp from "./selectionTextComp/selectionTextComp";
import { db } from "@/src/services/db";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import getPDFsHandler from "../../handlers/getPDFsHandler";
import { allPdfsReducer } from "@/src/redux/slices/pdfStateSlice";
import { useParams } from "next/navigation";

export default function DocContainer() {
  const params = useParams();
  const { pdf } = useAppSelector((state) => state.pdfState);
  const documentElement = useRef<HTMLDivElement>(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPageNum, setCurrentPageNum] = useState<number>(0);
  const dispatch = useAppDispatch();
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          GoToFirstPage,
          CurrentPageInput,
          NumberOfPages,
          ShowSearchPopover,
          Zoom,
        } = slots;
        return (
          <div className="flex w-full flex-row justify-between px-2">
            <div className="flex flex-row items-center w-fit">
              <ShowSearchPopover />
              <FullscreenBtn documentElement={documentElement.current!} />
              <Zoom />
            </div>
            <div className="flex flex-row w-fit justify-between items-center">
              <CurrentPageInput />/<NumberOfPages />
              <GoToFirstPage />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: () => [],
  });
  useEffect(() => {
    console.log(pdf.lastVisitedPage);
    
    return () => {
      const savePDFinfo = async () => {
        const foundPdf = await db.pdfs.get(params.id);
        if (foundPdf) {
          foundPdf.numberOfPages = numberOfPages;
          foundPdf.lastVisitedPage = currentPageNum;
          db.pdfs.put(foundPdf);
        }

        const pdfs = await getPDFsHandler();
        if (pdfs) dispatch(allPdfsReducer(pdfs));
      };
      savePDFinfo();
    };
  }, [params,pdf, currentPageNum, numberOfPages, dispatch]);
  return (
    <div
      ref={documentElement}
      className="relative flex flex-col h-screen overflow-y-auto mb-24 sm:mb-0"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdf.url}
          plugins={[
            pageNavigationPluginInstance,
            defaultLayoutPluginInstance,
            bookmarkPluginInstance,
          ]}
          onPageChange={(e) => {
            setCurrentPageNum(e.currentPage);
            setNumberOfPages(e.doc.numPages);
          }}
          initialPage={pdf.lastVisitedPage}
          onDocumentLoad={() => {}}
        />
      </Worker>
      <div
        style={{ width: `${(100 * currentPageNum) / numberOfPages}%` }}
        className="absolute top-10 z-50 h-1 bg-blue-500"
      ></div>
      <SelectionTextComp />
    </div>
  );
}
