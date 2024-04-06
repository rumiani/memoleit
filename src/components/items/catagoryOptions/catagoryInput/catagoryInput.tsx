import React, { useEffect, useRef, useState } from "react";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { usePathname } from "next/navigation";
import CatagoryInput from "../catagoryFilter/catagoryFilter";
import CatagoryDelete from "../catagoryDelete/catagoryDelete";

type DialogElement = HTMLDialogElement | null;
export default function CatagoryForm({ catagory }: { catagory: string }) {
  const [catagoryValue, setCatagoryValue] = useState<string>(catagory);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const changeCatagoryNameHandler = (e) => {
    setCatagoryValue(e.target.value);
    console.log(catagoryValue);
  };
  const saveCatagoryHandler = () => {
    console.log(readOnly);

    if (readOnly) {
      console.log("editable");
    } else {
      console.log("not");
    }
    setReadOnly(!readOnly);
  };

  const router = usePathname();
  const dispatch = useAppDispatch();
  const dialogElement = useRef(null);

  const filterHnadler = () => {
    (dialogElement.current as DialogElement)?.showModal();
    const { catagories } = getAppDataHandler();
    dispatch(userReducer({ catagories }));
  };



  return (
    <>
      <form className="bg-red-500 w-full h-full p-4">
        <div className="w-full mx-auto my-2">

        </div>
        <div>
        </div>
      </form>
    </>
  );
}
