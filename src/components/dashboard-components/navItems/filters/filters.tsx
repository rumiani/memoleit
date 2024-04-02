import React, { useEffect, useRef } from "react";
import Form from "./form/form";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch } from "@/src/app/hooks";
import { MdFilterListAlt } from "react-icons/md";

type DialogElement = HTMLDialogElement | null;

export default function Filters ()  {
  const dispatch = useAppDispatch();
  const dialogElement = useRef(null);

  const filterHnadler = () => {
    (dialogElement.current as DialogElement)?.showModal();
    const { catagories } = getAppDataHandler();
    dispatch(userReducer(catagories));
  };

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close();
      }
    };
  }, []);

  return (
    <div className="">
      <button
        onClick={filterHnadler}
        className="icon"
      >
        <MdFilterListAlt className="" />
      </button>
      <dialog
        ref={dialogElement}
        className="cursor-default rounded-md w-full sm:w-96 h-80"
      >
        <Form />
      </dialog>
    </div>
  );
};