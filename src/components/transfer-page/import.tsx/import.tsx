import { saveNewDataToLocalHandler } from "@/src/handlers/saveNewDataToLocalHandler";
import React, { useRef } from "react";
import { CiImport } from "react-icons/ci";
import { toast } from "react-toastify";

type InputElement = HTMLInputElement | null;

export default function ImportComponent() {
  const inputElement = useRef<InputElement>(null);

  const importData = () => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const newAppData = JSON.parse(fileReader.result as string);
      saveDataFunction(newAppData);
    };
    if (inputElement.current?.files) {
      fileReader.readAsText(inputElement.current.files[0]);
    }
  };

  function saveDataFunction(newAppData: any) {
    const saveResult = saveNewDataToLocalHandler(newAppData);
    if (saveResult) {
      toast.success("The imported data has been saved");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col w-fit mx-auto justify-center gap-4">
      Choose your text file and then click Import:
      <input ref={inputElement} type="file" className="file mx-auto" />
      <button
        onClick={importData}
        className="primaryBtn  !w-fit !flex flex-row justify-center items-center gap-2 hover:bg-blue-600 rounded-lg transition-all duration-600 mx-auto"
      >
        Import
        <CiImport className="w-6 h-6" />
      </button>
    </div>
  );
}
