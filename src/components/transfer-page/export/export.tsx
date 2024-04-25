import React from "react";
import { toast } from "react-toastify";
import { CiExport } from "react-icons/ci";
export default function ExportComponent() {
  const downloadJsonFile = (
    content: string,
    fileName: string,
    contentType: string
  ) => {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
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
    <div>
      <button
        className="hover:bg-gray-300 rounded-lg transition-all duration-600 block mx-auto my-16"
        id="exportHistory"
        onClick={downloadLocalStorageData}
      >
        <CiExport className="w-16 h-16"/>
      </button>
    </div>
  );
}
