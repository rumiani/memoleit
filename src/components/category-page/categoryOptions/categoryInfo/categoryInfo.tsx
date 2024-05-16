import { categoryItemsCountHandler } from "@/src/handlers/newHandlers/itemsCounter/categoryItemsCountHandler";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryInfo({ categoryId }: { categoryId: string }) {
  const [itemInfo, setItemInfo] = useState<{
    allItemsCount: number;
    learnedCount: number;
    unLearnedCount: number;
  }>({ allItemsCount: 0, learnedCount: 0, unLearnedCount: 0 });

  useEffect(() => {
    categoryItemsCountHandler(categoryId).then((info) => {
      setItemInfo(info!);
    });
  }, [categoryId]);
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
