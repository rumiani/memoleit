import React from "react";
import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { CategoryTypes } from "@/src/types/interface";
import CardOptions from "./cardOptions/cardOptions";
import CategoryName from "./categoryName/categoryName";

export default function CategoryCard({
  category,
}: {
  category: CategoryTypes;
}) {
  const { daysHoursAgo, startedDate } = timeToNowHandler(category.createdAt);

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
      <CategoryName category={category} />
    </div>
  );
}
