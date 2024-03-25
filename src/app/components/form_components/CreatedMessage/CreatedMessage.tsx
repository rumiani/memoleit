import { resetStateReducer } from "@/src/redux/appStateSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const CreatedMessage = ({ newItemHandler }: { newItemHandler: Function }) => {
  const dispatch = useDispatch();
  const resetHandler = () => {
    dispatch(resetStateReducer());
  };

  return (
    <div className="text-center flex flex-col gap-10 items-center w-full p-4">
      <div className="flex flex-row gap-4 max-w-xs">
        <Link href="/" className="text-blue-500 hover:underline">
          <button className="primaryBtn" onClick={resetHandler}>
            Home
          </button>
        </Link>
        <button className="primaryBtn" onClick={() => newItemHandler()}>
          Add a new item
        </button>
      </div>
    </div>
  );
};

export default CreatedMessage;
