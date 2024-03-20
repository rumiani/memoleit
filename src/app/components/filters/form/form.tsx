import React, { useEffect, useRef, useState } from "react";
import CheckboxInput from "./input/input";
import { useSelector } from "react-redux";

type Categories = {
  [key: string]: boolean;
};
const catagoriesObj:Categories ={"11plus": true ,"example": false ,"another one": true }
const Form = () => {
  // const{user} = useSelector(state => state.appState)
  const [catagories, setCategories] = useState(catagoriesObj);
  const [disabled, setDisabled] = useState(true);

  const catagoryChangeHandler = (updatedCatagory:string) => {
    catagories[updatedCatagory] =!catagories[updatedCatagory]    
    setCategories(catagories)
  }
  const applyFiltersHandler = () => {
    console.log(catagories);
  };
  return (
    <>
      <form
        onChange={() => setDisabled(false)}
        method="dialog"
        className="text-lg flex flex-col justify-center p-4 w-full mx-auto max-w-96 h-full "
      >
        <p className="text-center w-full">Choose your catagory to review:</p>
        <div className="my-8 ">
          {Object.entries(catagoriesObj).map(([catagory,reviewing], i) => {
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
          className="disabledBtn rounded-md mx-auto my-4 py-1 px-2 w-24 bg-blue-300 hover:text-white hover:bg-blue-500"
        >
          Apply
        </button>
    </>
  );
};

export default Form;
