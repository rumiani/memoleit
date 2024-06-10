import React from "react";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { usePathname } from "next/navigation";
interface TitleProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}
const TitleInput = ({ register, error }: TitleProps) => {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(formDataReducer({ [name]: value }));
  };

  return (
    <div className="w-full">
      <input
        dir="auto"
        id="inputTitle"
        className="first-element primaryInput"
        placeholder="Write a title here..."
        autoComplete="off"
        type="text"
        {...register("title", {
          onChange: handleInputChange,
          required: "Title is required",
          validate: async (title: string) => {
            if (path.split("/")[1] === "new") {
              const count = await db.items.where({ title: title }).count();
              return count > 0 ? "Title already exists." : true;
            }
          },
          pattern: {
            value: /^(?!\s*$).{1,100}$/,
            message: "Title must be 1-100 character",
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
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default TitleInput;
