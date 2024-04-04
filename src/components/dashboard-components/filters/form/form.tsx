import React, { useState } from "react";
import CheckboxInput from "./input/input";
import {
  catagoriesReducer,
  itemReducer,
  updateCatagoryReducer,
  userReducer,
} from "@/src/redux/appStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { saveTopicsToLocal } from "@/src/handlers/saveTopicsToLocal";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

const Form = () => {
  const { catagories } = useAppSelector((state) => state.appState);

  const dispatch = useAppDispatch();

  const handleInputChange = (name:string) => {
    dispatch(updateCatagoryReducer(name));
  };

  const applyFiltersHandler = () => {
    saveTopicsToLocal(catagories);
    const randomItem = randomItemHandler();
    if (randomItem) {
      dispatch(itemReducer(randomItem));
    }
  };

  return (
    <>
      <form
        method="dialog"
        className="h-full text-lg flex flex-col justify-center p-1 w-full mx-auto max-w-96"
      >
        <p className="text-center w-full">Choose your catagory to review:</p>
        <div className="my-2 h-40 overflow-y-auto bg-gray-200">
          {catagories.map((catagory, i) => {            
            return (
              <div key={i}>
                <CheckboxInput
                  catagory={catagory.name}
                  status={catagory.status}
                  handleInputChange={() => handleInputChange(catagory.name)}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => applyFiltersHandler()}
          // disabled={disabled}
          className="disabledBtn rounded-md mx-auto my-2 py-1 px-2 w-24 bg-blue-300 hover:text-white hover:bg-blue-500"
        >
          Apply
        </button>
      </form>
    </>
  );
};

export default Form;
