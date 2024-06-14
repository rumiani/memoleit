import React from "react";
import Link from "next/link";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { useDispatch } from "react-redux";

const CreatedMessage = ({
  createdMsgHandler,
}: {
  createdMsgHandler: Function;
}) => {
  const dispatch = useDispatch();
  const newItemHandler = () => {
    getCategoriesHandler()
      .then((existedCategories) => {
        if (existedCategories) dispatch(categoriesReducer(existedCategories));
      })
      .catch(() => console.log("error"));
    createdMsgHandler();
  };
  return (
    <div className="text-center flex flex-col gap-10 items-center w-full p-4">
      <div className="flex flex-row gap-4 max-w-xs">
        <Link href="/box/categories" className="text-blue-500 hover:underline">
          <button className="primaryBtn">Categories</button>
        </Link>
        <button className="primaryBtn" onClick={() => newItemHandler()}>
          New item
        </button>
      </div>
    </div>
  );
};

export default CreatedMessage;
