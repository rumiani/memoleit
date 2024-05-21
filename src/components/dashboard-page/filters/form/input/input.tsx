import { useAppDispatch } from "@/src/app/hooks";
import ItemsInfo from "@/src/components/general/intemsInfo/itemsInfo";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import { categoryItemsCountHandler } from "@/src/handlers/itemsCounter/categoryItemsCountHandler";
import notFoundError from "@/src/handlers/notFoundError";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import { CategoryTypes, ItemsInfoTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";

export default function CheckboxInput({
  category,
}: {
  category: CategoryTypes;
}) {
  const [itemsInfo, setItemsInfo] = useState<ItemsInfoTypes>({
    allItemsCount: 0,
    learnedCount: 0,
    unLearnedCount: 0,
  });
  const dispatch = useAppDispatch();

  const inputChangeHandler = async () => {
    try {
      const storedCategory = await db.categories.get(category.id);
      if (!storedCategory) throw notFoundError("404");
      storedCategory.status = storedCategory.status ? 0 : 1;
      await db.categories.put(storedCategory!);
      storedCategory.status
        ? toast.success("Category items removed from review list.")
        : toast.success("Category items added to review list.");
      const newStoredCategories = await getCategoriesHandler();
      dispatch(categoriesReducer(newStoredCategories!));
      const itemsToReview = await itemsToReviewHandler();
      const randomItem = randomItemHandler(itemsToReview!);
      dispatch(itemReducer(randomItem));
    } catch (error: any) {
      if ((error.name = "404")) {
        toast.error("Category not found.");
      }
      console.log("Error");
    }
  };

  useEffect(() => {
    categoryItemsCountHandler(category.id)
      .then((itemsInfo) => {
        if (itemsInfo) setItemsInfo(itemsInfo);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [category]);

  return (
    <div className="border-y border-gray-300 p-2 rounded-lg transition-all duration-300 my-2">
      <div className="flex relative ">
        <input
          checked={category.status ? true : false}
          onChange={inputChangeHandler}
          type="checkbox"
          id={category.id}
          name={category.name}
          className="cursor-pointer
relative peer shrink-0 flex justify-center align-middle
appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm bg-white
mt-1 mx-0
checked:bg-blue-600 checked:border-0"
        />
        <label htmlFor={category.id} className=" cursor-pointer pl-2">
          {category.name}
        </label>
        <svg
          className="
        cursor-pointer
absolute 
w-4 h-4 mt-[6px] ml-[2px]
hidden peer-checked:block
pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <ItemsInfo itemsInfo={itemsInfo} />
    </div>
  );
}
