import { categoryTypes } from "@/src/types/interface";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import CategoryDelete from "./categoryDelete/categoryDelete";
import CategoryInput from "../categoryName/CategoryInput/CategoryInput";

export default function CardOptions({ category }: { category: categoryTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const categoryModel = useRef<HTMLDivElement>(null);
  //   const removeBtnFunction = () => {
  //     setShowOptions(false);
  //     removeHandler(item.id);
  //     if (path.startsWith("/categories")) {
  //       const filteredItemsData = categoryFilterHandler(params.category);
  //       dispatch(allItemsReducer(filteredItemsData));
  //     } else {
  //       const randomItem = randomItemHandler();
  //       if (randomItem) {
  //         dispatch(itemReducer(randomItem));
  //       }
  //     }
  //   };
  //   const editBtnFunction = () => {
  //     setShowOptions(false);
  //     editHandler(item.id);
  //   };
  useEffect(() =>{
    document.onclick = (event: MouseEvent | TouchEvent) =>{
      if(categoryModel.current && !categoryModel.current.contains(event.target as Node)){
        setShowOptions(false)
        console.log('inside');
        
      }{
        console.log('outside');
        
      }
      // categoryModel.current

    }
  })
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
          ref={categoryModel}
          className="absolute w-52 right-0 flex flex-col top-0 h-32 pt-8 rounded-lg shadow-gray-400 shadow-lg bg-white"
        >
          <button
            onClick={() => setShowOptions(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-xl text-red-500 hover:bg-red-200 "
          >
            <IoClose />
          </button>
          <button className="mt-2 h-8 w-32 mx-auto hover:shadow-md rounded-lg text-yellow-400 font-bold hover:text-yellow-600">
            Edit
          </button>{" "}
          <CategoryDelete category={category} />
        </div>
      )}
    </div>
  );
}
