import React, { useEffect, useState } from "react";
import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { CategoryTypes, ItemsInfoTypes } from "@/src/types/interface";
import CardOptions from "./cardOptions/cardOptions";
import CategoryName from "./categoryName/categoryName";
import { categoryItemsCountHandler } from "@/src/handlers/itemsCounter/categoryItemsCountHandler";
import ItemsInfo from "@/src/components/general/itemsInfo/itemsInfo";
import { useAppSelector } from "@/src/app/hooks";

export default function CategoryCard({
  category,
}: {
  category: CategoryTypes;
}) {
  const { categories } = useAppSelector((state) => state.categoryState);
  const { daysHoursAgo, startedDate } = timeToNowHandler(category.createdAt);
  const [itemsInfo, setItemsInfo] = useState<ItemsInfoTypes>({
    allItemsCount: 0,
    learnedCount: 0,
    unLearnedCount: 0,
    pending: 0,
  });
  useEffect(() => {
    categoryItemsCountHandler(category.id).then((categoryInfo) => {
      if (categoryInfo) setItemsInfo(categoryInfo);
    });
  }, [category.id, categories]);
  return (
    <div className="bg-yellow-50 w-full max-w-72 p-4 rounded-lg border border-gray-300 shadow-sm shadow-gray-200">
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
      <ItemsInfo itemsInfo={itemsInfo} />
    </div>
  );
}
