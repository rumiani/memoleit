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
    <div className="flex flex-row justify-center items-center gap-2 mx-auto my-12">
      <Link href="/box/categories" className="text-blue-500 hover:underline">
        <button className="primaryBtn !w-40">Categories</button>
      </Link>
      <button className="primaryBtn !w-40" onClick={() => newItemHandler()}>
        New item
      </button>
    </div>
  );
};

export default CreatedMessage;
