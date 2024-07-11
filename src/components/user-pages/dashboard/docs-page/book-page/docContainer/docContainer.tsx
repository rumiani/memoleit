import React, { ReactElement, useRef } from "react";
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

export default function DocContainer({ pdfUrl }: { pdfUrl: string }) {
  const documentElement = useRef<HTMLDivElement>(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();

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
            </div>
            <div className="flex flex-row w-fit justify-between items-center">
              <FullscreenBtn documentElement={documentElement.current!} />
              <Zoom />
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
  const onDocumentLoadSuccess = () => {
    // setCurrentPage(0);
  };

  return (
    <div
      ref={documentElement}
      className="flex flex-col h-screen overflow-y-auto mb-24 sm:mb-0"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl}
          plugins={[
            pageNavigationPluginInstance,
            defaultLayoutPluginInstance,
            bookmarkPluginInstance,
          ]}
          onPageChange={(e) => console.log()}
          onDocumentLoad={onDocumentLoadSuccess}
        />
      </Worker>
      <SelectionTextComp/>
    </div>
  );
}
