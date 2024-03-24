import React, { useEffect, useRef, useState } from "react";
import CheckboxInput from "./input/input";
import { useDispatch, useSelector } from "react-redux";
import { itemReducer, userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { toast } from "react-toastify";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { saveTopicsToLocal } from "@/src/handlers/saveTopicsToLocal";
import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";
interface FormState {
  [key: string]: string;
}
const Form = () => {
  const [formData, setFormData] = useState<FormState>({});

  const { user } = useSelector((state) => state.appState);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const applyFiltersHandler = () => {
    saveTopicsToLocal(formData);
    const randomItem = randomItemHandler();
    dispatch(itemReducer(randomItem));
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
          {Object.entries(user.catagories).map(([catagory, reviewing], i) => {
            return (
              <div
                key={i}
                className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]"
              >
                <CheckboxInput
                  catagory={catagory}
                  reviewing={reviewing}
                  handleInputChange={handleInputChange}
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
