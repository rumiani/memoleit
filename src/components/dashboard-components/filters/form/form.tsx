import React from "react";
import CheckboxInput from "./input/input";
import { itemReducer } from "@/src/redux/appStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { saveTopicsToLocal } from "@/src/handlers/saveTopicsToLocal";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { categoryReducer } from "@/src/redux/categoryStateSlice";

const Form = () => {
  const { categories } = useAppSelector((state) => state.categoryState);

  const dispatch = useAppDispatch();

  const handleInputChange = (name: string) => {
    dispatch(categoryReducer(name));
  };

  const applyFiltersHandler = () => {
    saveTopicsToLocal(categories);
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
        <p className="text-center w-full">Choose your category to review:</p>
        <div className="my-2 h-40 overflow-y-auto bg-gray-200">
          {categories.map((category, i) => {
            return (
              <div key={i}>
                <CheckboxInput
                  category={category.name}
                  status={category.status}
                  handleInputChange={() => handleInputChange(category.name)}
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
