import React from "react";
import ExportComponent from "./export/export";
import ImportComponent from "./import.tsx/import";

export default function TransferPage() {
  return (
    <div className="flex flex-col gap-16 justify-center p-8 m-0 border border-gray-200">
      <p className="text-white bg-gray-400 p-2 rounded-lg text-center">
        You can export from one browser or device to another
      </p>
      <ExportComponent />
      <div className="border-t border-gray-400"></div>
      <ImportComponent />
    </div>
  );
}
