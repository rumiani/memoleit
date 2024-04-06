import { useAppDispatch } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { userReducer } from "@/src/redux/appStateSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GoGear } from "react-icons/go";
import CatagoryForm from "./catagoryInput/catagoryInput";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import CatagoryFilter from "./catagoryFilter/catagoryFilter";
import CatagoryDelete from "./catagoryDelete/catagoryDelete";
import CatagoryInfo from "./catagoryInfo/catagoryInfo";

export default function CatagoryOptions({ catagory }: { catagory: string }) {
  // const [catagoryValue, setCatagoryValue] = useState<string>(catagory);
  // const [readOnly, setReadOnly] = useState<boolean>(true);
  // const changeCatagoryNameHandler = (e) => {
  //   setCatagoryValue(e.target.value);
  //   console.log(catagoryValue);
  // };
  // const saveCatagoryHandler = () => {
  //   console.log(readOnly);

  //   if (readOnly) {
  //     console.log("editable");
  //   } else {
  //     console.log("not");
  //   }
  //   setReadOnly(!readOnly);
  // };

  // useEffect(() => {
  //   onclick = (event) => {
  //     if (event.target === dialogElement.current!) {
  //       (dialogElement.current as DialogElement)?.close();
  //     }
  //   };
  // }, []);

  return (
    <div className="w-full mt-8 flex flex-wrap justify-between">
      <h2 className="cursor-default text-xl">{catagory}</h2>
      <div className="flex flex-wrap gap-2">
        <CatagoryDelete  catagory={catagory} />
        <CatagoryFilter catagory={catagory} />
        <button
          // onClick={filterHnadler}
          className="icon text-green-600 !p-2 text-xl !w-fit"
          title="Filter catagories"
        >
          <FaEdit className="text-3xl" />
        </button>
      </div>
      <CatagoryInfo catagory={catagory} />
    </div>
  );
}
