import { useAppDispatch } from "@/src/app/hooks";
import { boxItemsFilterHandler } from "@/src/handlers/boxItemsFilterHandler";
import { categoryFilterHandler } from "@/src/handlers/categoryFilterHandler";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import React from "react";
interface BoxType {
  number: number;
}
const boxes: BoxType[] = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
];

export default function BoxesDropdown({
  categoryName,
}: {
  categoryName: string;
}) {
  const dispatch = useAppDispatch();

  const dropdownChangeHnadler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const boxNumber = +event.target.value;
    const filteredItemsData = boxItemsFilterHandler(categoryName, boxNumber);
    dispatch(allItemsReducer(filteredItemsData));
  };
  return (
    <div className="w-32 flex flex-col justify-center items-start mb-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={dropdownChangeHnadler}
      >
        <option value={undefined}>All</option>
        {boxes.map((box: BoxType) => (
          <option key={box.number} value={box.number}>
            {box.number === 6 ? "Archived" : "Box " + box.number}
          </option>
        ))}
      </select>
    </div>
  );
}
