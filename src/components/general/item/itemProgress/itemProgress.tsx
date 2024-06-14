import React from "react";
export default function ItemProgress({
  itemBoxNumber,
}: {
  itemBoxNumber: number;
}) {
  return (
    <div
      title={
        itemBoxNumber < 6
          ? `The item is in the box ${itemBoxNumber}`
          : "Item is archived"
      }
      className="w-full flex flex-row gap-1 justify-between cursor-default"
    >
      {[1, 2, 3, 4, 5, 6].map((boxNumber) => {
        return (
          <div key={boxNumber} className="w-1/5 flex flex-col justify-end">
            <span
              className={`${
                (itemBoxNumber > 5 || boxNumber <= itemBoxNumber) &&
                "bg-green-700 text-white"
              } bg-gray-200  w-full h-[2px] text-center rounded-d`}
            ></span>
          </div>
        );
      })}
    </div>
  );
}
