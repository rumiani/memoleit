import React from "react";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
interface BodyProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}
const BodyInput = ({ register, error }: BodyProps) => {
  const dispatch = useAppDispatch();
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(formDataReducer({ [name]: value }));
  };

  return (
    <div className=" w-full mx-auto my-4 second-element">
      <textarea
        rows={6}
        dir="auto"
        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none first-element focus:bg-gray-100 text-xl outline outline-0 transition-all border-none   focus:outline-0 resize-none"
        id="inputBody"
        placeholder="Write a description here..."
        autoComplete="off"
        {...register("body", {
          onChange: handleInputChange,
          required: "Body is required",
          pattern: {
            value: /^(?!\s*$).{1,100}$/,
            message: "Body must be 1-100 character",
          },
          minLength: {
            value: 1,
            message: "Input must be 1 - 100 character long",
          },
          maxLength: {
            value: 100,
            message: "Input must be 1 - 100 characters long",
          },
        })}
      />
      {/* <p>{body.length + "/1000"}</p> */}
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default BodyInput;
