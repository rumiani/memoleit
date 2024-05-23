"use client";
import { useAppSelector } from "@/src/app/hooks";
import { CategoryTypes } from "@/src/types/interface";
import React, { useEffect, useRef, useState } from "react";
type DialogElement = HTMLDialogElement | null;

export default function CategoryDelete({category, deleteHandler}: {category:CategoryTypes ,deleteHandler: Function;}) {
  const [inputValue, setInputValue] = useState<string>("");
  const dialogElement = useRef(null);

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close();
      }
    };
  }, []);

  const showDeleteBox = () => {
    (dialogElement.current as DialogElement)?.showModal();
  };

  const confirmDeleteCategory = () => {
    (dialogElement.current as DialogElement)?.close();
    deleteHandler();
  };
  return (
    <>
      <button
        onClick={showDeleteBox}
        className="mt-2 h-8 w-32 mx-auto hover:shadow-md rounded-lg font-bold text-red-400 hover:text-red-600"
      >
        Delete
      </button>
      <dialog
        ref={dialogElement}
        className="bg-gray-300  shadow-lg shadow-red-500 border border-red-500 cursor-default rounded-md w-full sm:w-96"
      >
        <div className="bg-gray-200 p-4 w-full h-full">
          Please write down <strong>{category.name}</strong> then click on the
          delete button.
          <input
            id="inputTitle"
            className="w-full m-2 p-1 focus:bg-gray-100 text-xl outline outline-0 transition-all border-none   focus:outline-0 "
            placeholder="..."
            autoComplete="off"
            type="text"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={inputValue !== category.name}
            onClick={() => confirmDeleteCategory()}
            className="disabled:cursor-not-allowed hover:bg-red-500 icon !mx-auto !px-4 disabled:bg-red-200 bg-red-400 !w-fit"
          >
            Delete
          </button>
          <p className="text-red-500 my-2 text-sm">
            * All the items within this category will be removed too.
          </p>
        </div>
      </dialog>
    </>
  );
}
