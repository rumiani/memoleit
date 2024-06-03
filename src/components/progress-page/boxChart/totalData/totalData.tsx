import { categoryItemsCountHandler } from "@/src/handlers/itemsCounter/categoryItemsCountHandler";
import React, { useEffect, useState } from "react";
interface DataType {
  name: string;
  Reviewed: number;
  Pending: number;
}
export default function TotalData({
  data,
  categoryId,
}: {
  data: DataType[] | undefined;
  categoryId: string;
}) {
  const [reviewedNumber, setReviewedNumber] = useState<number>(0);
  const [pendingNumber, setPendingNumber] = useState<number>(0);
  const [categoryInfo, setCategoryInfo] = useState<{
    allItemsCount: number;
    learnedCount: number;
    unLearnedCount: number;
  } | null>(null);

  useEffect(() => {    
    if (data) {
      let reviewed = 0;
      let pending = 0;
      data.forEach((box: any) => {
        reviewed += box.Reviewed;
        pending += box.Pending;
      });
      setReviewedNumber(reviewed);
      setPendingNumber(pending);
    }
    categoryItemsCountHandler(categoryId).then((categoryData) => {
      
      setCategoryInfo(categoryData!);
    });
  }, [data, categoryId]);

  return (
    <div className="px-6 mb-4 w-full justify-start cursor-default">
      <span className="text-blue-600 w-32 h-6 ">
        All: {categoryInfo?.allItemsCount}
      </span>
      <div className="flex flex-wrap gap-4">
      <span className="text-green-800 w-32 h-6">
        Learned: {categoryInfo?.learnedCount}
      </span>
      <span className="text-orange-500 w-32 h-6">
        In The Box: {categoryInfo?.unLearnedCount}
      </span>
      </div>
      <div className="flex flex-wrap gap-4">
      <span className="text-green-500 w-32 h-6">
        Reviewed: {reviewedNumber}
      </span>
      <span className="text-red-500 w-32 h-6">Pending: {pendingNumber}</span>
      </div>
    </div>
  );
}
