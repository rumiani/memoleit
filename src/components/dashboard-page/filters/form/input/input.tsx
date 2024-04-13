import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";
import React, { FormEvent, useEffect, useState } from "react";
interface checkBoxProps {
  category: string;
  status: boolean;
  handleInputChange: Function;
}
export default function CheckboxInput({
  category,
  status,
  handleInputChange,
}: checkBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(status);
  const [itemInfo, setItemInfo] = useState<{
    all: number;
    learned: number;
    unLearned: number;
  }>({ all: 0, learned: 0, unLearned: 0 });

  const inputChangeHandler = () => {
    setIsChecked(!isChecked);
    handleInputChange();
  };

  useEffect(() => {
    const info = topicItemsCountHandler(category);
    setItemInfo(info);
  }, [category]);

  return (
    <div className=" p-2 rounded-lg transition-all duration-300">
      <div className="flex relative ">
        <input
          checked={isChecked}
          onChange={inputChangeHandler}
          type="checkbox"
          id={category}
          name={category}
          className="cursor-pointer
relative peer shrink-0 flex justify-center align-middle
appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm bg-white
mt-1 mx-0
checked:bg-blue-600 checked:border-0"
        />
        <label htmlFor={category} className=" cursor-pointer pl-2">
          {category}
        </label>
        <svg
          className="
        cursor-pointer
absolute 
w-4 h-4 mt-[6px] ml-[2px]
hidden peer-checked:block
pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div className="pr-4 w-full text-left flex justify-between">
        <span>All:{itemInfo.all}</span>
        <span className="text-green-600">Learned:{itemInfo.learned}</span>
        <span className="text-yellow-500">Left:{itemInfo.unLearned}</span>
      </div>
    </div>
  );
}
