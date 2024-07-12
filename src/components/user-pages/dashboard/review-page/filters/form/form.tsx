import React, { useState } from "react";
import CheckboxInput from "./input/input";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";
import CheckBoxInput from "./CheckBoxInput/CheckBoxInput";
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

const Form = () => {
  const { categories } = useAppSelector((state) => state.categoryState);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const selectAllHandler = async () => {
    try {
      const allCategories = await getCategoriesHandler();
      if (selectAll) {
        allCategories!.forEach(
          (category: CategoryTypes) => (category.status = 0),
        );
        toast.success("Removed all the categories");
      } else {
        allCategories!.forEach(
          (category: CategoryTypes) => (category.status = 1),
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
        className="h-full text-lg flex flex-col justify-center p-1 w-full mx-auto max-w-96"
      >
        {isEmpty(categories) ? (
          <p className="text-center w-full my-2">
            Go add a{" "}
            <Link
              href={newPageUrl}
              className="text-blue-500 hover:underline"
            >
              new item
            </Link>{" "}
            to learn.
          </p>
        ) : (
          <p className="text-center w-full my-2">
            Choose your category to review
          </p>
        )}
        <div className="h-64 overflow-y-auto">
          {isEmpty(categories) ? (
            <div className="text-red-500 text-center my-16">No categories.</div>
          ) : (
            categories.map((category, i) => {
              return (
                <div key={i}>
                  <CheckboxInput category={category} />
                </div>
              );
            })
          )}
        </div>
        {categories.length > 1 && (
          <div className="p-4">
            <CheckBoxInput
              isChecked={selectAll}
              id="all"
              name="All"
              inputChangeHandler={selectAllHandler}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
