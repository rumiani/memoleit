import React, { useEffect, useRef } from "react";
import Form from "./form/form";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";

const Filters = () => {
  const st = useSelector(state => state.appstate)
  const dispatch = useDispatch()
  const dialogElement = useRef(null);

  const filterHnadler = () => {
    dialogElement.current!.showModal();

    const appData = getAppDataHandler(); 
    const catagories = appData.catagories
    console.log({catagories});
    
    dispatch(userReducer({catagories}));
  };

  useEffect(() => {
    console.log(st);
    
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        dialogElement.current!.close();
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
      <dialog ref={dialogElement} className="rounded-md w-full sm:w-96 h-80">
        <Form />
      </dialog>
    </div>
  );
};

export default Filters;
