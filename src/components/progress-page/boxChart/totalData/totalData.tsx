import CategoryInfo from "@/src/components/category-page/categoryOptions/categoryInfo/categoryInfo";
import { categoryItemsCountHandler } from "@/src/handlers/categoryItemsCountHandler";
import React from "react";
interface DataType {
  name: string;
  Reviewed: number;
  Pending: number;
}
export default function TotalData({ data,category }: { data: DataType[] | undefined,category:string }) {
  let reviewedNumber = 0;
  let pendingNumber = 0;
  const categoryInfo = categoryItemsCountHandler(category)
  if (data) {
    data.forEach((box: any) => {
      reviewedNumber += box.Reviewed;
      pendingNumber += box.Pending;
    });
  }
  return (
    <div className=" flex flex-wrap gap-1 w-full justify-start cursor-default">
      <span className="text-blue-600 w-44 h-6 ">All The Items: {categoryInfo.allItemsCount}</span>
      <span className="text-green-800 w-44 h-6">Learned Items: {categoryInfo.learnedCount}</span>
      <span className="text-orange-500 w-44 h-6">Items In The Box: {categoryInfo.unLearnedCount}</span>
      <span className="text-green-500 w-44 h-6">Reviewed: {reviewedNumber}</span>
      <span className="text-red-500 w-44 h-6">Pending: {pendingNumber}</span>
    </div>
  );
}
