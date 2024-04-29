import { useAppSelector } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { resetStateReducer } from "@/src/redux/appStateSlice";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";
import { isEmpty } from "lodash";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const CreatedMessage = ({
  createdMsgHandler,
}: {
  createdMsgHandler: Function;
}) => {
  const { categories } = useAppSelector((state) => state.categoryState);
  const dispatch = useDispatch();
  const resetHandler = () => {
    dispatch(resetStateReducer());
  };
  const newItemHandler = () => {
    const existedCategories = getAppDataHandler().categories;
    if (!isEmpty(existedCategories))
      dispatch(categoriesReducer(existedCategories));
    createdMsgHandler();
  };
  return (
    <div className="text-center flex flex-col gap-10 items-center w-full p-4">
      <div className="flex flex-row gap-4 max-w-xs">
        <Link href="/dashboard/review" className="text-blue-500 hover:underline">
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
