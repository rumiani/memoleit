import React, { useEffect, useRef } from "react";
import Form from "./form/form";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch } from "@/src/app/hooks";
import { MdFilterListAlt } from "react-icons/md";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";

type DialogElement = HTMLDialogElement | null;

export default function Filters() {
  const dispatch = useAppDispatch();
  const dialogElement = useRef(null);

  const filterHnadler = () => {
    (dialogElement.current as DialogElement)?.showModal();
    const { categories } = getAppDataHandler();
    dispatch(categoriesReducer(categories));
  };

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close();
      }
    };
  }, []);

  return (
    <>
      <button
        onClick={filterHnadler}
        className="absolute right-10 icon text-xl !w-fit"
        title="Filter categories"
      >
        <MdFilterListAlt className="text-3xl" />
        <span className="mx-2 hidden sm:block">Filters</span>
      </button>
      <dialog
        ref={dialogElement}
        className="cursor-default rounded-md w-full sm:w-96 h-80"
      >
        <Form />
      </dialog>
    </>
  );
}
