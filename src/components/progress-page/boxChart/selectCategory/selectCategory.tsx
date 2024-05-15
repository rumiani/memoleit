import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { getCategoriesHandler } from "@/src/handlers/newHandlers/getCategoriesHandler";
import {
  categoriesReducer,
  categoryNameReducer,
} from "@/src/redux/slices/categoryStateSlice";
import { CategoryTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";

export default function SelectCategory({
  handleChange,
}: {
  handleChange: Function;
}) {
  const { categories, category } = useAppSelector(
    (state) => state.categoryState
  );
  const[input,setInput] = useState('')
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategoriesHandler()
      .then((storedCategories) => {
        dispatch(categoriesReducer(storedCategories));
      })
      .catch((error) => console.log("error"));
  }, [dispatch]);

  const dropdownChangeHnadler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputVal = event.target.value;
    setInput(inputVal)
    dispatch(categoryNameReducer(inputVal));
    handleChange(inputVal);
  };
  return (
    <div className="w-52 flex flex-col justify-center items-start m-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        value={input}
        onChange={dropdownChangeHnadler}
      >
        <option value="">All</option>
        {categories.map((category: CategoryTypes) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
