import React, { useEffect, useRef } from "react";
import Form from "./form/form";
import { FaFilter } from "react-icons/fa";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { useAppDispatch } from "@/src/app/hooks";

type DialogElement = HTMLDialogElement | null;

const Filters = () => {

  const dispatch = useAppDispatch()
  const dialogElement = useRef(null);

  const filterHnadler = () => {

    (dialogElement.current as DialogElement)?.showModal()
    const {catagories} = getAppDataHandler(); 
    dispatch(userReducer({catagories}));
  };

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close()
      }
    };
  }, []);

  return (
    <div className="">
      <button
        onClick={filterHnadler}
        className="bg-white flex flex-row w-24 h-14 text-center align-middle justify-between rounded-md py-1 px-2"
      >
        <FaFilter className="icon" />
      </button>
      <dialog ref={dialogElement} className="cursor-default rounded-md w-full sm:w-96 h-80">
        <Form />
      </dialog>
    </div>
  );
};

export default Filters;
