import { useAppSelector } from "@/src/app/hooks";
import { categoryItemsCountHandler } from "@/src/handlers/itemsCounter/categoryItemsCountHandler";
import React, { useEffect, useState } from "react";

export default function CategoryInfo() {
  const { category } = useAppSelector((state) => state.categoryState);

  const [itemInfo, setItemInfo] = useState<{
    allItemsCount: number;
    learnedCount: number;
    unLearnedCount: number;
  }>({ allItemsCount: 0, learnedCount: 0, unLearnedCount: 0 });

  useEffect(() => {
    categoryItemsCountHandler(category.id).then((info) => {
      setItemInfo(info!);
    });
  }, [category]);
  return (
    <div>
      <h3 className="text-lg my-4 font-bold">{category.name}</h3>
      <div className="pr-4 w-full text-left flex justify-between">
        <span>All:{itemInfo.allItemsCount}</span>
        <span className="text-green-600">Learned:{itemInfo.learnedCount}</span>
        <span className="text-yellow-500">Left:{itemInfo.unLearnedCount}</span>
      </div>
    </div>
  );
}
