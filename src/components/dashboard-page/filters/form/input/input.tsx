import { useAppDispatch } from "@/src/app/hooks";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import { categoryItemsCountHandler } from "@/src/handlers/newHandlers/itemsCounter/categoryItemsCountHandler";
import notFoundError from "@/src/handlers/newHandlers/notFoundError";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import { CategoryTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ItemsInfoTypes {
  allItemsCount: number;
  learnedCount: number;
  unLearnedCount: number;
}
export default function CheckboxInput({
  category,
}: {
  category: CategoryTypes;
}) {
  const defaultStatus = category.status === 1 ? true : false;
  const [isChecked, setIsChecked] = useState<boolean>(defaultStatus);
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
      setIsChecked(!isChecked);
      storedCategory.status = isChecked ? 0 : 1;
      const editedCategory = await db.categories.put(storedCategory!);
      isChecked
        ? toast.success("Category items removed from review list.")
        : toast.success("Category items added to review list.");
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
    <div className=" p-2 rounded-lg transition-all duration-300">
      <div className="flex relative ">
        <input
          checked={isChecked}
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
      <div className="pr-4 w-full text-left flex justify-between">
        <span>All:{itemsInfo.allItemsCount}</span>
        <span className="text-green-600">Learned:{itemsInfo.learnedCount}</span>
        <span className="text-yellow-500">Left:{itemsInfo.unLearnedCount}</span>
      </div>
    </div>
  );
}
