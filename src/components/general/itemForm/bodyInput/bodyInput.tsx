import React, { ChangeEvent } from "react";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { FaWindowClose } from "react-icons/fa";

interface BodyProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}
const BodyInput = ({ register, error }: BodyProps) => {
  const { formData } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(formDataReducer({ body: event.target.value }));
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <div className=" w-full second-element">
      <textarea
        rows={5}
        dir="auto"
        className="primaryInput"
        id="inputBody"
        placeholder="Write a description here..."
        autoComplete="off"
        {...register("body", {
          onChange: handleInputChange,
          required: "Body is required",
          minLength: {
            value: 1,
            message: "Input must be 1 - 1000 character long",
          },
          maxLength: {
            value: 1000,
            message: "Input must be 1 - 1000 characters long",
          },
        })}
      />
      {formData.body !== "" && (
        <div className="flex flex-row gap-2 items-center">
          <FaWindowClose
            onClick={() => dispatch(formDataReducer({ body: "" }))}
            className="text-red-500 rounded-sm !p-0 hover:font-bold cursor-pointer"
          />
          <p>{formData.body.length + "/1000"}</p>
        </div>
      )}
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default BodyInput;
