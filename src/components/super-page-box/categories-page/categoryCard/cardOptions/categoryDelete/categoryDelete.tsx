"use client";
import Dialog from "@/src/components/general/dialog/dialog";
import { CategoryTypes } from "@/src/types/interface";
import React, { useState } from "react";
export default function CategoryDelete({
  category,
  deleteHandler,
}: {
  category: CategoryTypes;
  deleteHandler: Function;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-2 h-8 w-32 mx-auto hover:shadow-md rounded-lg font-bold text-red-400 hover:text-red-600"
      >
        Delete
      </button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className=" w-full h-full">
          Please write down <strong>{category.name}</strong> then click on the
          delete button.
          <input
            id="inputTitle"
            className="w-full m-2 p-1 px-4 bg-gray-100 focus:bg-gray-200 text-xl outline outline-0 transition-all border-none   focus:outline-0 "
            placeholder="Category name"
            autoComplete="off"
            type="text"
            required
            value={inputValue.toLowerCase()}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={inputValue !== category.name}
            onClick={() => {
              deleteHandler();
              setIsOpen(false);
            }}
            className="disabled:cursor-not-allowed hover:bg-red-500 icon !mx-auto !px-4 disabled:bg-red-200 bg-red-400 !w-fit"
          >
            Delete
          </button>
          <p className="text-red-500 font-bold my-2 text-sm">
            * All the items within this category will be removed.
          </p>
        </div>
      </Dialog>
    </>
  );
}
