import React, { ReactElement, useRef, useState } from "react";
import { Viewer, Worker, RotateDirection } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = "./pdfWorker/pdf.worker.min.js";
import type { ToolbarSlot, ToolbarProps } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { CiSquarePlus } from "react-icons/ci";
import FullscreenBtn from "../documentOptions/fullscreenBtn/fullscreenBtn";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import SelectedTextDialog from "./selectedTextDialog/selectedTextDialog";

export default function DocContainer({ pdfUrl }: { pdfUrl: string }) {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const documentElement = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          ZoomOut,
          ZoomIn,
          Rotate,
          GoToFirstPage,
          NumberOfPages,
          ShowSearchPopover,
          Zoom,
        } = slots;
        return (
          <div className="flex flex-row items-center gap-2">
            <Rotate direction={RotateDirection.Forward} />
            {/* <ZoomOut />
            <ZoomIn /> */}
            <Zoom />
            <div className="absolute w-32 right-0">
              <div className="flex flex-row justify-between items-center">
                <p>Pages:</p> <NumberOfPages />
                <GoToFirstPage />
              </div>
            </div>
            <ShowSearchPopover />
            <FullscreenBtn documentElement={documentElement.current!} />
            <CiSquarePlus
              className={`icon !w-8 !h-8 !p-0 flex self-center ${
                title.length > 0
                  ? "text-green-500 font-bold animate-pulse 0.5"
                  : "font-thin text-gray-500"
              }`}
              onClick={() => {
                title.length > 0
                  ? setDialogOpen(true)
                  : toast.error("You have not hilighted any words.");
              }}
            />
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: () => [],
  });

  return (
    <div
      ref={documentElement}
      className="h-screen overflow-y-auto mb-24 sm:mb-0"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance]}
          renderLoader={(percentages: number) => (
            <div className="w-full my-16">
              {Math.round(percentages)}
              <LoadingPulse />
            </div>
          )}
        />
      </Worker>
      <SelectedTextDialog isOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
