import React, { useEffect, useRef, useState } from "react";
import CheckboxInput from "./input/input";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";

const Form = () => {
  const{user} = useSelector(state => state.appState)
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch()

  const catagoryChangeHandler = (updatedCatagory:string) => {   
    const catagories = {[updatedCatagory] : !user.catagories[updatedCatagory] }           
    dispatch(userReducer({catagories}))
  }
  const applyFiltersHandler = () => {
    const appData = getAppDataHandler()
    appData.catagories = user.catagories
    localStorage.setItem("appData", JSON.stringify(appData));
  };
  
  return (
    <>
      <form
        onChange={() => setDisabled(false)}
        method="dialog"
        className="text-lg flex flex-col justify-center py-2 w-full mx-auto max-w-96"
      >
        <p className="text-center w-full">Choose your catagory to review:</p>
        <div className="my-2 h-40 overflow-y-auto ">
          {Object.entries(user.catagories).map(([catagory,reviewing], i) => {
            return (
              <div
                key={i}
                className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]"
              >
                <CheckboxInput
                  catagory={catagory}
                  reviewing={reviewing}
                  catagoryChangeHandler={(updatedCatagory:string) => catagoryChangeHandler(updatedCatagory)}
                />
              </div>
            );
          })}
        </div>
        </form>
        <button
          onClick={() => applyFiltersHandler()}
          disabled={disabled}
          className="disabledBtn rounded-md mx-auto my-2 py-1 px-2 w-24 bg-blue-300 hover:text-white hover:bg-blue-500"
        >
          Apply
        </button>
    </>
  );
};

export default Form;
