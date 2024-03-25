import React, { useState } from "react";
import CheckboxInput from "./input/input";
import { itemReducer, userReducer } from "@/src/redux/appStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { saveTopicsToLocal } from "@/src/handlers/saveTopicsToLocal";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

interface FormState {
  [key: string]: boolean;
}
const Form = () => {
  const [formData, setFormData] = useState<FormState>({});

  const { user } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const applyFiltersHandler = () => {
    saveTopicsToLocal(formData);
    const randomItem = randomItemHandler();
    if (randomItem) {
      dispatch(itemReducer(randomItem));
    }
    dispatch(userReducer({ catagories: { ...user.catagories, ...formData } }));
  };

  return (
    <>
      <form
        method="dialog"
        className="h-full text-lg flex flex-col justify-center p-4 w-full mx-auto max-w-96"
      >
        <p className="text-center w-full">Choose your catagory to review:</p>
        <div className="my-2 h-40 overflow-y-auto ">
          {Object.entries(user.catagories).map(
            ([catagory, reviewing]: [string, unknown], i) => {
              const isReviewing: boolean = reviewing as boolean;
              return (
                <div
                  key={i}
                  className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]"
                >
                  <CheckboxInput
                    catagory={catagory}
                    reviewing={isReviewing}
                    handleInputChange={handleInputChange}
                  />
                </div>
              );
            }
          )}
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
