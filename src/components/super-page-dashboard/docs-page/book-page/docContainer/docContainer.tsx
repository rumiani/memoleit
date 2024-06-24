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
import FullscreenBtn from "../documentOptions/fullscreenBtn/fullscreenBtn";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import SelectedTextDialog from "./selectedTextDialog/selectedTextDialog";
import { IoIosAddCircle } from "react-icons/io";
export default function DocContainer({ pdfUrl }: { pdfUrl: string }) {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const documentElement = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const { GoToFirstPage, NumberOfPages, ShowSearchPopover, Zoom } = slots;
        return (
          <div className="flex w-full flex-row justify-between">
            <span className="flex flex-row items-center w-fit">
              <ShowSearchPopover />
              <IoIosAddCircle
                className={` cursor-pointer !w-6 !h-6 !p-0 flex self-center ${
                  title.length > 0
                    ? "text-green-500 font-bold  animate-spin"
                    : "font-thin text-gray-500"
                }`}
                onClick={() => {
                  title.length > 0
                    ? setDialogOpen(true)
                    : toast.error("You have not hilighted any words.");
                }}
              />
            </span>
            <div className="flex flex-row w-fit justify-between items-center">
              <FullscreenBtn documentElement={documentElement.current!} />
              <Zoom />
              <p>Pages:</p> <NumberOfPages />
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
