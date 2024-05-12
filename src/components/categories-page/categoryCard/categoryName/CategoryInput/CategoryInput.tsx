import { useAppDispatch } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import {
  categoriesReducer,
  categoryEditNameReducer,
} from "@/src/redux/slices/categoryStateSlice";
import { CategoryTypes } from "@/src/types/interface";
import React, { useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import saveCategoryNameHandler from "../saveCategoryNameHandler";
import { db } from "@/src/services/db";

export default function CategoryInput({
  category,
}: {
  category: CategoryTypes;
}) {
  const [newCategoryName, setNewCategoryName] = useState<string>(category.name);
  const inputElement = useRef(null);
  const dispatch = useAppDispatch();

  const changeCategoryNameHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewCategoryName(e.target.value);
  };

  const saveCategoryHandler = () => {
    saveCategoryNameHandler({
      categoryId: category.id,
      newCategoryName,
    })
      .then((result) => {
        console.log(result);

        db.categories.toArray().then((storedCategories) => {
          dispatch(categoriesReducer(storedCategories));
          dispatch(categoryEditNameReducer(""));
        });
        toast.success("category name was saved successfully.", {
          autoClose: 2000,
        });
      })
      .catch(() => {
        console.log("Error");
        //   toast.error("Item was not found");
      });
  };

  return (
    <div className=" my-4 flex flex-wrap gap-2">
      <div>
        <input
          ref={inputElement}
          id="inputTitle"
          className="w-44 h-8 p-1 rounded-lg border px-2 focus:bg-gray-50 text-xl transition-all focus:shadow-lg focus:shadow-gray-200"
          placeholder="Write a title here..."
          autoComplete="off"
          type="text"
          required
          value={newCategoryName}
          onChange={changeCategoryNameHandler}
        />
        {newCategoryName.length < 3 && (
          <p className="text-red-500 text-xs font-bold p-1">
            The input must be ≥ 3 letters
          </p>
        )}
      </div>
      <div></div>
      <button
        onClick={saveCategoryHandler}
        className="icon !p-2 text-xl !w-fit"
        title="Save the category name"
      >
        <FaSave className="text-3xl text-green-600" />
      </button>
    </div>
  );
}
