import React from "react";
import CheckboxInput from "./input/input";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";
import CheckBoxInput from "./CheckBoxInput/CheckBoxInput";
import { selectAllCategoriesReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import { toast } from "react-toastify";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import { selectedItemsToReviewHandler } from "@/src/handlers/selectedItemsToReviewHandler";

const Form = () => {
  const { categories } = useAppSelector((state) => state.categoryState);

  const { selectAllCategories } = useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();

  const selectAllHandler = async () => {
    try {
      const storedSetting = await db.setting.where({ name: "setting" }).first();
      storedSetting!.selectAllCategories = !selectAllCategories;
      await db.setting.put(storedSetting!);
      dispatch(selectAllCategoriesReducer());

      const allCategories = await getCategoriesHandler();
      if (selectAllCategories) {
        allCategories!.forEach((category) => (category.status = 0));
        toast.success("Removed all the categories");
      } else {
        allCategories!.forEach((category) => (category.status = 1));
        toast.success("Selected all the categories");
      }
      await db.categories.bulkPut(allCategories!);
      const newCategoriesInfo = await getCategoriesHandler();
      dispatch(categoriesReducer(newCategoriesInfo!));

      const itemsToReview = await selectedItemsToReviewHandler();
      const randomItem = randomItemHandler(itemsToReview!);
      dispatch(itemReducer(randomItem));
    } catch (error) {}
  };
  return (
    <>
      <form
        method="dialog"
        className="h-full text-lg flex flex-col justify-center p-1 w-full mx-auto max-w-96"
      >
        <p className="text-center w-full my-2">
          Choose your category to review
        </p>
        <div className="h-64 overflow-y-auto bg-gray-200">
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
        <div className="p-4">
          <CheckBoxInput
            isChecked={selectAllCategories}
            id="all"
            name="All"
            inputChangeHandler={selectAllHandler}
          />
        </div>
      </form>
    </>
  );
};

export default Form;
