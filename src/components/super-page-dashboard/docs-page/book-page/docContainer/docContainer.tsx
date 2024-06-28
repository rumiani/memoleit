import React, { ReactElement, useRef, useState } from "react";
import {
  Viewer,
  Worker,
  Button,
  Position,
  Tooltip,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = "./pdfWorker/pdf.worker.min.js";
import type { ToolbarSlot, ToolbarProps } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import {
  highlightPlugin,
  HighlightArea,
  Trigger,
  SelectionData,
  MessageIcon,
  RenderHighlightTargetProps,
} from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

import FullscreenBtn from "../documentOptions/fullscreenBtn/fullscreenBtn";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import SelectedTextDialog from "./selectedTextDialog/selectedTextDialog";
import { IoIosAddCircle } from "react-icons/io";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";

interface HighlightAreaTypes {
  height: number;
  left: number;
  pageIndex: number;
  top: number;
  width: number;
}
interface SelectionDataTypes {
  startPageIndex: number;
  startOffset: number;
  startDivIndex: number;
  endPageIndex: number;
  endOffset: number;
  endDivIndex: number;
}
interface Note {
  // The generated unique identifier
  id: number;
  // The note content
  content: string;
  // The list of highlight areas
  highlightAreas: HighlightAreaTypes[];
  // The selected text
  quote: string;
}
export default function DocContainer({ pdfUrl }: { pdfUrl: string }) {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const documentElement = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button
          
            onClick={() => {
              console.log(5);
              props.toggle;
            }}
          >
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: "100px" }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    trigger: Trigger.TextSelection,
  });
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
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-row items-center w-fit">
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
    sidebarTabs: (defaultTabs) => [
      defaultTabs[2],
      defaultTabs[0], // Bookmarks tab
      defaultTabs[1], // Thumbnails tab
    ],
  });
  const onDocumentLoadSuccess = () => {
    // setCurrentPage(0);
  };

  return (
    <div
      ref={documentElement}
      className="flex flex-col overflow-y-auto mb-24 sm:mb-0"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl}
          plugins={[
            pageNavigationPluginInstance,
            defaultLayoutPluginInstance,
            bookmarkPluginInstance,
            highlightPluginInstance,
          ]}
          onPageChange={(e) => console.log()}
          onDocumentLoad={onDocumentLoadSuccess}
        />
      </Worker>
      <SelectedTextDialog isOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
