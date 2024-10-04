import { useState } from "react";
import CheckboxInput from "./CheckBoxInput/CheckBoxInput";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";
import { db } from "@/src/services/db";
import { toast } from "react-toastify";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import {
  allItemsReducer,
  itemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { CategoryTypes } from "@/src/types/interface";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import Link from "next/link";
import { newPageUrl } from "@/src/handlers/general/pagesLinks";
import CheckBoxInputAll from "./CheckBoxInputAll/CheckBoxInputAll";

const Form = () => {
  const { categories } = useAppSelector((state) => state.categoryState);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selectedCategories = categories.filter((category) => category.status);

  const selectAllHandler = async () => {
    try {
      const allCategories = await getCategoriesHandler();
      if (selectAll) {
        allCategories!.forEach(
          (category: CategoryTypes) => (category.status = false),
        );
        toast.success("Removed all the categories");
      } else {
        allCategories!.forEach(
          (category: CategoryTypes) => (category.status = true),
        );
        toast.success("Selected all the categories");
      }
      setSelectAll(!selectAll);
      await db.categories.bulkPut(allCategories!);
      const newCategoriesInfo = await getCategoriesHandler();
      dispatch(categoriesReducer(newCategoriesInfo!));

      const itemsToReview = await itemsToReviewWithActiveCategoryHandler();
      if (itemsToReview) {
        dispatch(allItemsReducer(itemsToReview));
        const newRandomItem = randomItemHandler(itemsToReview);
        dispatch(itemReducer(newRandomItem));
      }
    } catch (error) {}
  };
  return (
    <>
      <form
        method="dialog"
        className="h-full text-lg flex flex-col justify-center w-full mx-auto max-w-96"
      >
        {isEmpty(categories) ? (
          <p className="text-center w-full my-2">
            Go add a{" "}
            <Link href={newPageUrl} className="text-blue-500 hover:underline">
              new item
            </Link>{" "}
            to learn.
          </p>
        ) : (
          <p className="text-center w-full mb-2">
            Choose your category to review
          </p>
        )}
        <div className="max-h-80 overflow-visible overflow-y-scroll bg-gray-100 my-2">
          {isEmpty(categories) ? (
            <div className="text-red-500 text-center my-16">No categories.</div>
          ) : (
            categories.map((category, i) => (
              <div key={i}>
                <CheckboxInput category={category} />
              </div>
            ))
          )}
        </div>
        {categories.length > 1 && (
          <CheckBoxInputAll
            isChecked={selectAll}
            id="all"
            name={
              categories.length === selectedCategories.length
                ? "Deselect all"
                : "Select all"
            }
            inputChangeHandler={selectAllHandler}
          />
        )}
        <div className="flex flex-col text-start">
          <span>
            All categories:
            <strong>{categories.length}</strong>
          </span>
          <span>
            Selected Categoris:
            <strong>{selectedCategories.length}</strong>
          </span>
        </div>
      </form>
    </>
  );
};

export default Form;
