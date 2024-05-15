import { categoryItemsCountHandler } from "@/src/handlers/newHandlers/itemsCounter/categoryItemsCountHandler copy";
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
  const [isChecked, setIsChecked] = useState<boolean>(category.status);
  const [itemsInfo, setItemsInfo] = useState<ItemsInfoTypes>({
    allItemsCount: 0,
    learnedCount: 0,
    unLearnedCount: 0,
  });

  const inputChangeHandler = () => {
    setIsChecked(!isChecked);
    db.categories
      .get(category.id)
      .then((storedCategory) => {
        if (storedCategory) {
          storedCategory.status = !isChecked;
          console.log(storedCategory);
          db.categories.put(storedCategory!).then((result) => {
            isChecked
              ? toast.success("Category items removed from review list.")
              : toast.success("Category items added to review list.");
          });
        }
      })
      .catch(() => {
        console.log("Error");
      });
  };

  useEffect(() => {
    categoryItemsCountHandler(category.id)
      .then((itemsInfo) => {
        if (itemsInfo) setItemsInfo(itemsInfo);
      })
      .catch(() => {
        console.log(console.log("Error"));
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
