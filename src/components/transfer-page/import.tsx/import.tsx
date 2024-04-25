import { saveNewDataToLocalHandler } from "@/src/handlers/saveNewDataToLocalHandler";
import React, { useRef } from "react";
import { CiImport } from "react-icons/ci";

type InputElement = HTMLInputElement | null;

export default function ImportComponent() {
  const inputElement = useRef<InputElement>(null);

  const importData = () => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const newAppData = JSON.parse(fileReader.result as string);
      lssave(newAppData);
    };
    if (inputElement.current?.files) {
      fileReader.readAsText(inputElement.current.files[0]);
    }
  };

  function lssave(newAppData: any) {
    console.log(newAppData);
    saveNewDataToLocalHandler(newAppData);
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <input ref={inputElement} type="file" className="file mx-auto" />

      <button
        onClick={importData}
        className="hover:bg-gray-300 rounded-lg transition-all duration-600 block mx-auto"
      >
        <CiImport className="w-16 h-16" />
      </button>
    </div>
  );
}
