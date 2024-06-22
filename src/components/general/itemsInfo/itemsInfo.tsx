import { ItemsInfoTypes } from "@/src/types/interface";
import React from "react";

export default function ItemsInfo({
  itemsInfo,
}: {
  itemsInfo: ItemsInfoTypes;
}) {
  return (
    <div className="pr-4 w-full text-left flex justify-between text-sm">
      <span>All:{itemsInfo.allItemsCount}</span>
      <span className="text-green-600">Learned:{itemsInfo.learnedCount}</span>
      <span className="text-yellow-500">Left:{itemsInfo.unLearnedCount}</span>
    </div>
  );
}
