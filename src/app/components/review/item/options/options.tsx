import { editHandler } from "@/src/handlers/editHandler";
import { removeHandler } from "@/src/handlers/removeHandler";
import { item } from "@/src/types/interface";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
export default function Options({item}:{item:item}) {
  const [showOptions, setShowOptions] = useState(false);
  const removeBtnFunction = () =>{
    setShowOptions(false)
    removeHandler(item.id)
  }
  const editBtnFunction = () =>{
    setShowOptions(false)
    editHandler(item.id)
  }
  return (
    <div className="">
      <button onClick={() => setShowOptions(true)} className="hover:bg-gray-200 rounded-full p-1 ">
        <BsThreeDotsVertical />
      </button>
      {showOptions && (
        <div className="absolute left-0 flex flex-col top-0 w-full h-32 rounded-lg shadow-gray-400 shadow-lg bg-white">
          <button
            onClick={() => setShowOptions(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-xl text-red-500 hover:bg-red-200 "
          >
            <IoClose />
          </button>
            <button onClick={() => editBtnFunction(item)} className="mt-8 h-8 w-32 mx-auto hover:shadow-md rounded-lg text-yellow-500 hover:text-yellow-700">
              Edit
            </button>
            <button onClick={() => removeBtnFunction(item.id)} className="mt-2 h-8 w-32 mx-auto hover:shadow-md rounded-lg text-red-400 hover:text-red-600">
              Remove
            </button>
        </div>
      )}
    </div>
  );
}
