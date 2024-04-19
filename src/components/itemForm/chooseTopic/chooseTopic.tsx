import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";
import { FormValues } from "@/src/types/interface";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

export default function ChooseTopic({
  register,
  error,
}: {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}) {
  const { categories } = useAppSelector((state) => state.categoryState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const existedCategories = getAppDataHandler().categories;
    if (isEmpty(categories) && !isEmpty(existedCategories))
      dispatch(categoriesReducer(existedCategories));
  }, [categories, dispatch]);

  return (
    <div className="min-w-64 max-w-80 my-4 flex flex-col">
      <input
        list="categories"
        id="category"
        autoComplete="off"
        className="outline-none p-1 focus:bg-gray-100 transition-all duration-300"
        placeholder="Add a category or Choose one from the list ..."
        {...register("category", {
          required: "Category is required",
          pattern: {
            value: /^[a-zA-Z0-9]*$/, 
            message: 'Please enter only English letters and numbers'
          },
          minLength: {
            value: 3,
            message: 'Input must be 3 - 12 character long'
          },
          maxLength: {
            value: 12,
            message: 'Input must be 3 - 12 characters long'
          }
        })}
      />
      <datalist id="categories">
        {categories.map((category) => {

          return <option key={category.name} value={category.name} />;
        })}
      </datalist>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
