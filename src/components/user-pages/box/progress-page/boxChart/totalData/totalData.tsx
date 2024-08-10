import { categoryItemsCountHandler } from "@/src/handlers/itemsCounter/categoryItemsCountHandler";
import { useEffect, useState } from "react";

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
      const { reviewed, pending } = data.reduce(
        (acc, box) => {
          acc.reviewed += box.Reviewed;
          acc.pending += box.Pending;
          return acc;
        },
        { reviewed: 0, pending: 0 },
      );

      setReviewedNumber(reviewed);
      setPendingNumber(pending);
    }
    categoryItemsCountHandler(categoryId).then((categoryData) => {
      setCategoryInfo(categoryData!);
    });
  }, [data, categoryId]);

  return (
    <div className="px-6 mb-2 w-full justify-start cursor-default">
      <div className="flex flex-row justify-around gap-2">
        <span>Items: {categoryInfo?.allItemsCount}</span>
        <span>Learned: {categoryInfo?.learnedCount}</span>
        <span>Learning: {categoryInfo?.unLearnedCount}</span>
      </div>
      <div className="flex flex-row gap-4 justify-center mt-4">
        <div className="text-green-500 flex flex-wrap items-center justify-center gap-2">
          <span className="block w-4 h-3 bg-green-300"></span>
          <h3>Reviewed: {reviewedNumber}</h3>
        </div>
        <div className="text-red-500 flex flex-wrap items-center justify-center gap-2">
          <span className="block w-4 h-3 bg-red-500"></span>
          <h3>Pending: {pendingNumber}</h3>
        </div>
      </div>
    </div>
  );
}
