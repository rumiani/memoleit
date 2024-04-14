import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import {
  categoriesReducer,
  categoryNameReducer,
} from "@/src/redux/categoryStateSlice";
import { categoryTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";

export default function SelectCategory({
  handleChange,
}: {
  handleChange: Function;
}) {
  const { categories, category } = useAppSelector(
    (state) => state.categoryState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCategories = getAppDataHandler().categories;
    dispatch(categoriesReducer(storedCategories));
  }, [dispatch]);

  const dropdownChangeHnadler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputVal = event.target.value;
    dispatch(categoryNameReducer(inputVal));
    handleChange(inputVal)
  };
  return (
    <div className="w-52 flex flex-col justify-center items-start m-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        value={category.name}
        onChange={dropdownChangeHnadler}
      >
        <option value="">All</option>
        {categories.map((category: categoryTypes) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
