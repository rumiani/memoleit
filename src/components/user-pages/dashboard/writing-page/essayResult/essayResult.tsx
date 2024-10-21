import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EssayInfo } from "./essayInfo/essayInfo";
import {
  essayFormDataReducer,
  essayResultReducer,
} from "@/src/redux/slices/essayStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { useAppSelector } from "@/src/app/hooks";

export default function EssayResult() {
  const { essayResult } = useAppSelector((state) => state.essayState);

  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        <strong className="text-center block">Your Essay analisis</strong>
        <EssayInfo />
      </div>
      <div></div>
      <button
        onClick={() => {
          dispatch(essayFormDataReducer({ topic: "", body: "" }));
        }}
        className="primaryBtn !w-fit m-4 mx-auto"
      >
        Write a new essay
      </button>
    </div>
  );
}
