import { useAppDispatch } from "@/src/app/hooks";
import saveCategoryNameHandler from "@/src/handlers/saveCategoryNameHandler";
import { categoryEditNameReducer } from "@/src/redux/categoryStateSlice";
import { categoryTypes } from "@/src/types/interface";
import React, { useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
type InputElement = HTMLInputElement | null;

export default function CategoryInput({
  category,
}: {
  category: categoryTypes;
}) {
  const [categoryValue, setCategoryValue] = useState<string>(category.name);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const inputElement = useRef(null);
  const dispatch = useAppDispatch();

  const changeCategoryNameHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategoryValue(e.target.value);
  };

  const saveCategoryHandler = () => {
    setReadOnly(true);
    const saveTheCategory = saveCategoryNameHandler({
      id: category.id,
      categoryValue,
    });
    if (saveTheCategory) {
      toast.success("category name was saved successfully.", {
        autoClose: 2000,
      });

    } else {
      toast.error("Item was not found");
    }
    dispatch(categoryEditNameReducer(false));
  };
  useEffect(() => {
    (inputElement.current as InputElement)?.focus();
  }, []);
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
          // readOnly={readOnly}
          value={categoryValue}
          onChange={changeCategoryNameHandler}
        />
        {categoryValue.length < 3 && (
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
