import React, { ReactElement } from "react";
import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  RotateDirection,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
GlobalWorkerOptions.workerSrc = "./pdfWorker/pdf.worker.min.js";
import type { ToolbarSlot, ToolbarProps } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { CiSquarePlus } from "react-icons/ci";
import FullscreenBtn from "../documentOptions/fullscreenBtn/fullscreenBtn";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";

export default function DocContainer({
  pdfUrl,
  openDialog,
  documentElement,
}: {
  pdfUrl: string;
  openDialog: Function;
  documentElement: HTMLDivElement;
}) {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const toolbarPluginInstance = toolbarPlugin();
  //   const { Toolbar } = toolbarPluginInstance;
  //   const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
  //     ...slot,
  //     Download: () => <></>,
  //     SwitchTheme: () => <></>,
  //     Print: () => <></>,
  //     GoToNextPage: () => <></>,
  //     GoToPreviousPage: () => <></>,
  //     Open: () => <></>,
  //     CurrentPageInput: () => <></>,
  //   });

  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const { ZoomOut, ZoomIn, EnterFullScreen, Rotate } = slots;
        return (
          <div className="flex flex-row">
            <Rotate direction={RotateDirection.Forward} />
            <ZoomOut />
            <ZoomIn />
            <EnterFullScreen />
            <FullscreenBtn documentElement={documentElement} />
            <CiSquarePlus
              className={`icon !w-8 !h-8 !p-0 flex self-center ${
                title.length > 0
                  ? "text-green-500 font-bold animate-pulse 0.5"
                  : "font-thin text-gray-500"
              }`}
              onClick={() => {title.length > 0 ? openDialog():toast.error('You have not hilighted any words.')}}
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
    <div className="h-96 overflow-y-auto mb-24 sm:mb-0">
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
    </div>
  );
}
