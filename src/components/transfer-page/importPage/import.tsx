import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import { toast } from "react-toastify";
import { saveNewDataToLocalHandler } from "./handlers/saveNewDataToLocalHandler";
import { db } from "@/src/services/db";
import { useAppDispatch } from "@/src/app/hooks";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";

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
    saveNewDataToLocalHandler(newAppData)
      .then(() => {
        console.log(2);
        
        toast.success("The imported data has been saved");
        toast.info("Redirecting to categories page");
        setTimeout(() => {
          router.push("/box/categories");
        }, 5000);
      })
      .catch(() => {
        console.log("Error uploading");
      });
  };

  return (
    <div className="flex flex-col w-fit mx-auto justify-center gap-4">
      Choose your text file and then click Import:
      <input ref={inputElement} type="file" className="file mx-auto" />
      <button
        disabled={isDisabled}
        onClick={importData}
        className="primaryBtn  !w-fit !flex flex-row justify-center items-center gap-2 hover:bg-blue-600 rounded-lg transition-all duration-600 mx-auto"
      >
        Import
        <CiImport className="w-6 h-6" />
      </button>
    </div>
  );
}
