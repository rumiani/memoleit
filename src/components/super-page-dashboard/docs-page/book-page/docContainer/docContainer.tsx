import React, { ReactElement } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
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

export default function DocContainer({
  pdfUrl,
  openDialog,
}: {
  pdfUrl: string;
  openDialog: Function;
}) {
  // const fullScreenPluginInstance = fullScreenPlugin(props?: FullScreenPluginProps);

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
        const { ZoomOut, ZoomIn, EnterFullScreen } = slots;
        return (
          <div className="flex flex-row">
            <ZoomOut />
            <ZoomIn />
            <EnterFullScreen />
            <CiSquarePlus
              className="icon text-green-600"
              onClick={() => openDialog()}
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
    <>
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
    </>
  );
}
