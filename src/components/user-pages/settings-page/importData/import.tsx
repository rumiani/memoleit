import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import { toast } from "react-toastify";
import { saveImportedTextHandler } from "./handlers/saveImportedTextHandler";
import { categoriesPageUrl } from "@/src/handlers/general/pagesLinks";
import Papa from "papaparse";
import { saveImportedCSVHandler } from "./handlers/saveImportedCSVHandler";
import CsvInfo from "./csvInfo/csvInfo";
import TextInfo from "./textInfo/textInfo";

type InputElement = HTMLInputElement | null;

export default function ImportComponent() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const inputElement = useRef<InputElement>(null);
  const router = useRouter();

  const handleFileUpload = async () => {
    const file = inputElement.current?.files?.[0];
    if (!file) return toast.error("You have not attached any files");
    const fileType = file.type;
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileType === "text/csv" || fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const rows = result.data as { word: string; meaning: string }[];
          saveData(rows, fileType, file.name);
        },
      });
    } else if (fileType === "text/plain" || fileExtension === "txt") {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function () {
        const newAppData = JSON.parse(fileReader.result as string);
        saveData(newAppData, "text/plain", file.name);
      };
    } else {
      alert("Upload a valid CSV or text file");
    }
  };

  const saveData = async (newData: any, fileType: string, fileName: string) => {
    setIsDisabled(true);
    try {
      if (fileType === "text/plain") {
        await saveImportedTextHandler(newData);
      } else if (fileType === "text/csv") {
        await saveImportedCSVHandler(newData, fileName);
      }
      toast.success("The imported data has been saved");
      toast.info("You have been redirected to categories page");
      router.push(categoriesPageUrl);
    } catch (error: any) {
      if (error.name === "ZodError") toast.error("Invalid file data");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="w-full flex flex-col mx-auto gap-4 my-4">
      <div className="flex flex-row justify-between">
        <strong>Import</strong>
        <div className="mx-2 text-gray-600 text-xs flex items-center w-fit gap-1">
          <span>Valid formats:</span>
          <span>JSON</span> <TextInfo />, <span>CSV</span> <CsvInfo />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <input
          ref={inputElement}
          type="file"
          accept=".csv,.txt"
          className="file !mx-auto "
        />
        <button
          disabled={isDisabled}
          onClick={handleFileUpload}
          className="primaryBtn !w-fit !flex flex-row justify-center items-center gap-2 hover:bg-blue-600 rounded-lg transition-all duration-600 !mx-auto"
        >
          Import
          <CiImport className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
