import { useAppDispatch } from "@/src/app/hooks";
import { categoryEditNameReducer } from "@/src/redux/categoryStateSlice";
import { categoryTypes } from "@/src/types/interface";
import React, { useRef, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
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
    console.log(categoryValue);
  };
  const editHnadler = () => {
    (inputElement.current as InputElement)?.focus();
    setReadOnly(false);
  };
  const saveCategoryHandler = () => {
    console.log("saved");

    setReadOnly(true);
  };
  return (
    <div className="bg-gray-300 my-4 flex flex-wrap gap-2 w-72">
      <div>
        <input
          ref={inputElement}
          id="inputTitle"
          className={`w-56 h-full p-1 rounded-lg focus:bg-gray-50 text-xl outline outline-0 transition-all border-none ${
            readOnly && "focus:shadow-lg focus:shadow-gray-200"
          }`}
          placeholder="Write a title here..."
          autoComplete="off"
          type="text"
          required
          readOnly={readOnly}
          value={categoryValue}
          onChange={changeCategoryNameHandler}
        />
        {categoryValue.length < 3 && (
          <p className="text-red-500 text-sm pl-4">
            The input must be more at least 3 characters.
          </p>
        )}
      </div>
      <div>

      </div>
      <button
            onClick={() => dispatch(categoryEditNameReducer())}
            className="icon !p-2 text-xl !w-fit"
            title="Filter categories"
          >
            <FaSave className="text-3xl text-green-600" />
          </button>
    </div>
  );
}
