import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";
import React, { useEffect, useState } from "react";

export default function CategoryInfo({ category }: { category: string }) {
  const [itemInfo, setItemInfo] = useState<{
    all: number;
    learned: number;
    unLearned: number;
  }>({ all: 0, learned: 0, unLearned: 0 });

  useEffect(() => {
    const info = topicItemsCountHandler(category);
    setItemInfo(info);
  }, [category]);
  return (
    <div>
      <div className="pr-4 w-full text-left flex justify-between">
        <span>All:{itemInfo.all}</span>
        <span className="text-green-600">Learned:{itemInfo.learned}</span>
        <span className="text-yellow-500">Left:{itemInfo.unLearned}</span>
      </div>
    </div>
  );
}
