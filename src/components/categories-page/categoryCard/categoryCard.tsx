import React from "react";
import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { categoryTypes } from "@/src/types/interface";
import Link from "next/link";
import CardOptions from "./cardOptions/cardOptions";
import CategoryName from "./categoryName/categoryName";
import { categoryItemsCountHandler } from "@/src/handlers/categoryItemsCountHandler";

export default function CategoryCard({
  category,
}: {
  category: categoryTypes;
}) {
  const { daysHoursAgo, startedDate } = timeToNowHandler(category.createdAt);
  const categoryData = categoryItemsCountHandler(category.name);
  return (
    <div className="w-full max-w-72 p-4 rounded-lg border border-gray-300 shadow-sm shadow-gray-200">
      <div className=" flex flex-row justify-between mb-4">
        <span
          title={"Created At: " + startedDate}
          className="text-bold cursor-default"
        >
          {daysHoursAgo}
        </span>
        <CardOptions category={category} />
      </div>
      <CategoryName category={category}/>
      <div className="w-full flex flex-row justify-between font-bold">
        <span className="Number of Items text-gray-500 px-1 cursor-default">
          All: {categoryData.allItemsCount}
        </span>
        <span
          title="Number of items have been learned"
          className=" text-green-500 px-1 cursor-default"
        >
          Done: {categoryData.learnedCount}
        </span>
        <span
          title="Number of items left to learn"
          className="text-yellow-500 px-1 cursor-default"
        >
          Left: {categoryData.unLearnedCount}
        </span>
      </div>
    </div>
  );
}
