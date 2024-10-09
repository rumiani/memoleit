import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import {
  categoriesReducer,
  categoryReducer,
} from "@/src/redux/slices/categoryStateSlice";
import { CategoryTypes } from "@/src/types/interface";
import { capitalize } from "lodash";

export default function SelectCategory({
  handleChange,
}: {
  handleChange: Function;
}) {
  const { category, categories } = useAppSelector(
    (state) => state.categoryState,
  );
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategoriesHandler()
      .then((storedCategories) => {
        if (storedCategories) dispatch(categoriesReducer(storedCategories));
      })
      .catch((error) => {});
  }, [dispatch]);

  const dropdownChangeHnadler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const inputVal = event.target.value;
    setInput(inputVal);
    dispatch(
      categoryReducer({ ...category, name: event.target.name, id: inputVal }),
    );
    handleChange(inputVal);
  };
  return (
    <div className="w-52 flex flex-col justify-center items-start m-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        value={input}
        onChange={dropdownChangeHnadler}
      >
        <option value="">All Categories</option>
        {categories.map((category: CategoryTypes) => (
          <option key={category.id} value={category.id}>
            {capitalize(category.name)}
          </option>
        ))}
      </select>
    </div>
  );
}
