import React from "react";
import { VscTriangleDown } from "react-icons/vsc";

export default function ItemProgress({
  itemBoxNumber,
}: {
  itemBoxNumber: number;
}) {
  const boxes = [1, 2, 3, 4, 5];
  return (
    <div
      title={`The item is in the box ${itemBoxNumber}`}
      className=" w-full flex flex-row justify-between mt-2 cursor-default"
    >
      {boxes.map((boxNumber) => {
        return (
          <div key={boxNumber} className="w-1/6 flex flex-col justify-end">
            {boxNumber === itemBoxNumber && (
              <span className="w-full h-4 text-lg flex justify-center">
                <VscTriangleDown />
              </span>
            )}
            <span
              className={`${
                boxNumber === itemBoxNumber && "bg-green-700 text-white"
              } w-full h-6 border border-gray-300 border-collapse text-center`}
            >
              {boxNumber}
            </span>
          </div>
        );
      })}
    </div>
  );
}
