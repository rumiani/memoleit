import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import { toast } from "react-toastify";
import { saveNewImportedDataHandler } from "./handlers/saveNewImportedDataHandler";
import { categoriesPageUrl } from "@/src/handlers/general/pagesLinks";

type InputElement = HTMLInputElement | null;

export default function ImportComponent() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const inputElement = useRef<InputElement>(null);
  const router = useRouter();

  const importData = () => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      let newAppData;
      try {
        newAppData = JSON.parse(fileReader.result as string);
        saveDataFunction(newAppData);
      } catch (error) {
        toast.error("Invalid file");
      }
    };
    if (inputElement.current?.files) {
      if (inputElement.current?.files.length === 0) {
        toast.error("The text file is not attached");
      } else {
        fileReader.readAsText(inputElement.current.files[0]);
      }
    }
  };

  const saveDataFunction = async (newAppData: any) => {
    setIsDisabled(true);
    try {
      await saveNewImportedDataHandler(newAppData);
      toast.success("The imported data has been saved");
      toast.info("You have been redirected to categories page");
      router.push(categoriesPageUrl);
    } catch (error: any) {
      console.log(error.name);
      if (error.name === "ZodError") toast.error("Invalid data");
      console.log("Error uploading");
    }
  };

  return (
    <div className="flex flex-col mx-auto gap-4">
      <strong>Import</strong>
      <div className="flex flex-col gap-4 justify-center items-center">
        <input ref={inputElement} type="file" className="file !mx-auto " />
        <button
          disabled={isDisabled}
          onClick={importData}
          className="primaryBtn !w-fit !flex flex-row justify-center items-center gap-2 hover:bg-blue-600 rounded-lg transition-all duration-600 !mx-auto"
        >
          Import
          <CiImport className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
