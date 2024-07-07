import React from "react";
import { CiExport } from "react-icons/ci";
import { db } from "@/src/services/db";
export default function ExportComponent() {
  const downloadJsonFile = (
    content: string,
    fileName: string,
    contentType: string,
  ) => {
    let a = document.createElement("a");
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const downloadLocalStorageData = async () => {
    try {
      const items = await db.items.toArray();
      const categories = await db.categories.toArray();
      const reviews = await db.reviews.toArray();
      const setting = await db.setting.toArray();
      const appDataJson = JSON.stringify({
        items,
        categories,
        reviews,
        setting,
      });
      downloadJsonFile(appDataJson, "memoleit-data.txt", "text/plain");
    } catch (error) {
      console.log("Error");
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
