import { useAppDispatch } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { userReducer } from "@/src/redux/appStateSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GoGear } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import CategoryFilter from "./categoryFilter/categoryFilter";
import CategoryDelete from "./categoryDelete/categoryDelete";
import CategoryInfo from "./categoryInfo/categoryInfo";

export default function CategoryOptions({ category }: { category: string }) {
  // const [categoryValue, setCategoryValue] = useState<string>(category);
  // const [readOnly, setReadOnly] = useState<boolean>(true);
  // const changeCategoryNameHandler = (e) => {
  //   setCategoryValue(e.target.value);
  //   console.log(categoryValue);
  // };
  // const saveCategoryHandler = () => {
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
      <h2 className="cursor-default text-xl">{category}</h2>
      <div className="flex flex-wrap gap-2">
        <CategoryDelete  category={category} />
        <CategoryFilter category={category} />
        <button
          // onClick={filterHnadler}
          className="icon text-green-600 !p-2 text-xl !w-fit"
          title="Filter categories"
        >
          <FaEdit className="text-3xl" />
        </button>
      </div>
      <CategoryInfo category={category} />
    </div>
  );
}
