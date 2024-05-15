import React from "react";
import CheckboxInput from "./input/input";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { saveTopicsToLocal } from "@/src/handlers/saveTopicsToLocal";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { categoryReducer } from "@/src/redux/slices/categoryStateSlice";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";

const Form = () => {
  const { categories } = useAppSelector((state) => state.categoryState);

  return (
    <>
      <form
        method="dialog"
        className="h-full text-lg flex flex-col justify-center p-1 w-full mx-auto max-w-96"
      >
        <p className="text-center w-full my-2">Choose your category to review</p>
        <div className="h-40 overflow-y-auto bg-gray-200">
          {categories.map((category, i) => {
            return (
              <div key={i}>
                <CheckboxInput
                  category={category}
                />
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
};

export default Form;
