import { categoryItemsCountHandler } from "@/src/handlers/categoryItemsCountHandler";
import React, { useEffect, useState } from "react";

export default function CategoryInfo({ category }: { category: string }) {
  const [itemInfo, setItemInfo] = useState<{
    allItemsCount: number;
    learnedCount: number;
    unLearnedCount: number;
  }>({ allItemsCount: 0, learnedCount: 0, unLearnedCount: 0 });

  useEffect(() => {
    const info = categoryItemsCountHandler(category);
    if(info){
      setItemInfo(info);
    }
  }, [category]);
  return (
    <div>
      <div className="pr-4 w-full text-left flex justify-between">
        <span>All:{itemInfo.allItemsCount}</span>
        <span className="text-green-600">Learned:{itemInfo.learnedCount}</span>
        <span className="text-yellow-500">Left:{itemInfo.unLearnedCount}</span>
      </div>
    </div>
  );
}
