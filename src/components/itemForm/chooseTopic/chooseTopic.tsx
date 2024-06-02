import React from "react";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { useLiveQuery } from "dexie-react-hooks";
export default function ChooseTopic({
  register,
  error,
}: {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}) {
  const categories = useLiveQuery(() => getCategoriesHandler(), [], []);

  return (
    <div className=" min-w-64 max-w-80 my-4 flex flex-col">
      <input
        list="categories"
        id="category"
        autoComplete="off"
        className="third-element outline-none p-1 focus:bg-gray-100 transition-all duration-300"
        placeholder="Add a category or Choose one from the list ..."
        {...register("category", {
          required: "Category is required",
          pattern: {
            value: /^[a-zA-Z0-9\s\-]+$/,
            message: "Please enter only a-z, 0-9, - or space.",
          },
          minLength: {
            value: 3,
            message: "Input must be 3 - 20 character long.",
          },
          maxLength: {
            value: 20,
            message: "Input must be 3 - 20 characters long.",
          },
        })}
      />
      {categories && categories?.length > 0 && (
        <datalist id="categories">
          {categories.map((category) => {
            return <option key={category.name} value={category.name} />;
          })}
        </datalist>
      )}
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
