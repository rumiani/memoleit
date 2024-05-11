import React from "react";
import Link from "next/link";
import { getCategoriesHandler } from "@/src/handlers/newHandlers/getCategoriesHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { resetStateReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";

const CreatedMessage = ({
  createdMsgHandler,
}: {
  createdMsgHandler: Function;
}) => {
  const dispatch = useDispatch();
  const resetHandler = () => {
    dispatch(resetStateReducer());
  };
  const newItemHandler = () => {
    getCategoriesHandler()
      .then((existedCategories) => {
        if (!isEmpty(existedCategories))
          dispatch(categoriesReducer(existedCategories));
      })
      .catch(() => console.log("error"));
    createdMsgHandler();
  };
  return (
    <div className="text-center flex flex-col gap-10 items-center w-full p-4">
      <div className="flex flex-row gap-4 max-w-xs">
        <Link
          href="/dashboard/review"
          className="text-blue-500 hover:underline"
        >
          <button className="primaryBtn" onClick={resetHandler}>
            Dashboard
          </button>
        </Link>
        <Link href="/dashboard/new">
          <button className="primaryBtn" onClick={() => newItemHandler()}>
            New item
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreatedMessage;
