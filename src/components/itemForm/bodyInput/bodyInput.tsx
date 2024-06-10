import React from "react";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { db } from "@/src/services/db";
interface BodyProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}
const BodyInput = ({ register, error }: BodyProps) => {
  const { body } = useAppSelector(
    (state) => state.itemState.formData
  );
  const dispatch = useAppDispatch();
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(formDataReducer({ [name]: value }));
  };

  return (
    <div className=" w-full second-element">
      <textarea
        rows={6}
        dir="auto"
        className="primaryInput"
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
      <p>{body.length + "/1000"}</p>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default BodyInput;
