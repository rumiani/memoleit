import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { FormValues, categoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default function ChooseTopic({ register, error }:{register: UseFormRegister<FormValues>, error: string | undefined}) {
  const [categories, setCategories] = useState<categoryTypes[]>([]);
  useEffect(() => {
    const { catagories } = getAppDataHandler();
    console.log(catagories);
    
    if (!categories) setCategories(catagories);
  }, [categories]);

  return (
    <div className="min-w-64 max-w-80 my-4 flex flex-col">
      <input
        list="categories"
        id="category"
        autoComplete="off"
        className="outline-none p-1 focus:bg-gray-100 transition-all duration-300"
        // value={value}
        // onChange={(e) => changeHandler(e)}
        placeholder="Add a category or Choose one from the list ..."
        {...register("category", {
          required: "Category is required",
          pattern: {
            value: /^.{3,100}$/,
            message: "Category must be 3-100 character",
          },
        })}
      />
      <datalist id="categories">
        {
          categories.map((category) => {
            return <option key={category.name} value={category.name} />;
          })}
      </datalist>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
