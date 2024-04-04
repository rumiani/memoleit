import React, { useEffect, useRef } from "react";
import Form from "./form/form";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { MdFilterListAlt } from "react-icons/md";
import { usePathname } from "next/navigation";

type DialogElement = HTMLDialogElement | null;

export default function Filters() {
  const router = usePathname();
  const dispatch = useAppDispatch();
  const dialogElement = useRef(null);

  const filterHnadler = () => {
    (dialogElement.current as DialogElement)?.showModal();
    const { catagories } = getAppDataHandler();
    dispatch(userReducer({ catagories }));
  };

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close();
      }
    };
  }, []);

  if (!router.startsWith("/dashboard")) return;

  return (
    <>
      <button
        onClick={filterHnadler}
        className="icon text-xl !w-fit"
        title="Filter catagories"
      >
        <MdFilterListAlt className="text-3xl"/>
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
