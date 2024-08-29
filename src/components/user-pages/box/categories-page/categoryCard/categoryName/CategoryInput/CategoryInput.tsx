import { useAppDispatch } from "@/src/app/hooks";
import {
  categoriesReducer,
  categoryOnEditReducer,
} from "@/src/redux/slices/categoryStateSlice";
import { CategoryTypes } from "@/src/types/interface";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import saveCategoryNameHandler from "../saveCategoryNameHandler";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import limits from "@/src/handlers/general/limits/limits";

export default function CategoryInput({
  category,
}: {
  category: CategoryTypes;
}) {
  const [newCategoryName, setNewCategoryName] = useState<string>(category.name);
  const inputElement = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const changeCategoryNameHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewCategoryName(e.target.value);
  };

  const saveCategoryHandler = async () => {
    if (isNotCategoryInputValidator(newCategoryName))
      return inputElement.current!.focus();
    try {
      if (category.name !== newCategoryName) {
        await saveCategoryNameHandler({
          categoryId: category.id,
          newCategoryName,
        });
        const storedCategories = await getCategoriesHandler();
        dispatch(categoriesReducer(storedCategories!));
        dispatch(categoryOnEditReducer(""));
      }
      toast.success("category name was saved successfully.");
    } catch (error: any) {
      if (error.name === "404") toast.error("Category not found.");
      console.log("Error");
    }
  };
  const isNotCategoryInputValidator = (inputText: string) => {
    const regexValidator = new RegExp(
      `^[a-zA-Z0-9\\s\\-]{${limits.minItemcategoryLimit},${limits.maxItemcategoryLimit}}$`,
    );
    return (
      !regexValidator.test(inputText) ||
      inputText.length < limits.minItemcategoryLimit ||
      inputText.length > limits.maxItemcategoryLimit
    );
  };
  return (
    <div className=" flex flex-col my-4">
      <div>
        <input
          ref={inputElement}
          id="inputTitle"
          className="w-full h-8 p-1 rounded-lg border px-2 focus:bg-gray-50 text-xl transition-all focus:shadow-lg focus:shadow-gray-200"
          placeholder="Write a title here..."
          autoComplete="off"
          type="text"
          required
          value={newCategoryName}
          onChange={changeCategoryNameHandler}
        />
        {isNotCategoryInputValidator(newCategoryName) && (
          <p className="text-red-500 text-xs font-bold p-1">
            The input must be a-z, 0-9, - or space and{" "}
            {limits.minItemcategoryLimit}-{limits.maxItemcategoryLimit} letters
          </p>
        )}
      </div>
      <div className="flex flex-row justify-end my-2">
        <button
          onClick={() => dispatch(categoryOnEditReducer(""))}
          className="redBtn !p-2 text-xl !w-fit"
          title="Save the category name"
        >
          Cancel
        </button>
        <button
          onClick={saveCategoryHandler}
          className="greenBtn !p-2 text-xl !w-fit"
          title="Save the category name"
        >
          Save
        </button>
      </div>
    </div>
  );
}
