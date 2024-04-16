import React from "react";
interface DataType {
  name: string;
  Reviewed: number;
  Pending: number;
}
export default function TotalData({ data }: { data: DataType[] | undefined }) {
  let reviewedNumber = 0;
  let pendingNumber = 0;
  if (data) {
    data.forEach((box: any) => {
      reviewedNumber += box.Reviewed;
      pendingNumber += box.Pending;
    });
  }
  return (
    <div className="w-52 flex justify-between cursor-default">
      <span className="text-green-500">Reviewed: {reviewedNumber}</span>
      <span className="text-red-500">Pending: {pendingNumber}</span>
    </div>
  );
}
