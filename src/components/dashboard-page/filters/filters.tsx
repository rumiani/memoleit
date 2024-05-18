import React, { useEffect, useRef } from "react";
import Form from "./form/form";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { MdFilterListAlt } from "react-icons/md";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { getCategoriesHandler } from "@/src/handlers/newHandlers/getCategoriesHandler";

type DialogElement = HTMLDialogElement | null;

export default function Filters() {
  const { item, items } = useAppSelector((state) => state.itemState);

  const dispatch = useAppDispatch();
  const dialogElement = useRef(null);

  const filterHnadler = async () => {
    try {
      (dialogElement.current as DialogElement)?.showModal();
      const storedCategories = await getCategoriesHandler();
      if (storedCategories) dispatch(categoriesReducer(storedCategories));
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close();
      }
    };
  }, []);

  return (
    <div>
      <button
        onClick={filterHnadler}
        className="absolute top-10 right-10 icon text-xl !w-fit"
        title="Filter categories"
      >
        <MdFilterListAlt className="text-3xl" />
        <span className="mx-2 hidden sm:block">Filters</span>
      </button>
      <dialog
        ref={dialogElement}
        className=" cursor-default rounded-md w-full sm:w-96 h-fit"
      >
        <Form />
      </dialog>
    </div>
  );
}
