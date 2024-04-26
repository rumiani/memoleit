import React from "react";
import { toast } from "react-toastify";
import { CiExport } from "react-icons/ci";
export default function ExportComponent() {
  const downloadJsonFile = (
    content: string,
    fileName: string,
    contentType: string
  ) => {
    let a = document.createElement("a");
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const downloadLocalStorageData = () => {
    const appDataJson: string | null = localStorage.getItem("appData");
    if (appDataJson) {
      downloadJsonFile(appDataJson, "memoleit-data.txt", "text/plain");
    } else {
      toast.error("There is no data to export");
    }
  };
  return (
    <div className="w-fit mx-auto flex flex-col gap-4">
      <p>Export your data as a text file:</p>
      <button
        className="primaryBtn  !w-fit !flex flex-row justify-center items-center gap-2 hover:bg-blue-600 rounded-lg transition-all duration-600 mx-auto"
        id="exportHistory"
        onClick={downloadLocalStorageData}
      >
        Export
        <CiExport className="w-6 h-6" />
      </button>
    </div>
  );
}
