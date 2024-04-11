import { categoryTypes } from "@/src/types/interface";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import CategoryDelete from "./categoryDelete/categoryDelete";
import { useAppDispatch } from "@/src/app/hooks";
import { categoryEditNameReducer } from "@/src/redux/categoryStateSlice";

export default function CardOptions({ category }: { category: categoryTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();

  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) { 
               setShowOptions(false)
      }
    };
    if (showOptions) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showOptions]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(true)}
        title="Click to see options"
        className="icon"
      >
        <BsThreeDotsVertical />
      </button>
      {showOptions && (
        <div
          ref={modelRef}
          className="absolute w-52 right-0 flex flex-col top-0 h-32 pt-8 rounded-lg shadow-gray-400 shadow-lg bg-white"
        >
          <button
            onClick={() => setShowOptions(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-xl text-red-500 hover:bg-red-200 "
          >
            <IoClose />
          </button>
          <button onClick={() => dispatch(categoryEditNameReducer())} className="mt-2 h-8 w-32 mx-auto hover:shadow-md rounded-lg text-yellow-400 font-bold hover:text-yellow-600">
            Edit
          </button>{" "}
          <CategoryDelete category={category} />
        </div>
      )}
    </div>
  );
}