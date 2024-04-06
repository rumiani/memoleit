import React, { useEffect, useRef, useState } from "react";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { usePathname } from "next/navigation";
import CategoryInput from "../categoryFilter/categoryFilter";
import CategoryDelete from "../categoryDelete/categoryDelete";

type DialogElement = HTMLDialogElement | null;
export default function CategoryForm({ category }: { category: string }) {
  const [categoryValue, setCategoryValue] = useState<string>(category);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const changeCategoryNameHandler = (e) => {
    setCategoryValue(e.target.value);
    console.log(categoryValue);
  };
  const saveCategoryHandler = () => {
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
    const { categories } = getAppDataHandler();
    dispatch(userReducer({ categories }));
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
