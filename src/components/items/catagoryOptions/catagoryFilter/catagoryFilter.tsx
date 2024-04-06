import React, { FormEvent, useEffect, useState } from "react";
import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";
interface checkBoxProps {
  catagory: string;
  status: boolean;
  handleInputChange: Function;
}

export default function CatagoryFilter({ catagory }: { catagory: string }) {

  const inputChangeHandler = (e: FormEvent) => {};

  return (
    <div className=" p-2 rounded-lg transition-all duration-300">
      <div className="flex relative ">
        <input
          checked={true}
          onChange={(e) => inputChangeHandler(e)}
          type="checkbox"
          id={catagory}
          name={catagory}
          className="cursor-pointer
relative peer shrink-0 flex justify-center align-middle
appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm bg-white
mt-1 mx-0
checked:bg-blue-600 checked:border-0"
        />
        <label htmlFor={catagory} className=" cursor-pointer pl-2">
          {catagory}
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
      
    </div>
  );
}
