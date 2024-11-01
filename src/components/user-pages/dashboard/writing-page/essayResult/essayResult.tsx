import React from "react";
import { EssayInfo } from "./essayInfo/essayInfo";
import {
  essayFormDataReducer,
  essayResultReducer,
} from "@/src/redux/slices/essayStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

export default function EssayResult() {
  const { essayResult } = useAppSelector((state) => state.essayState);

  const dispatch = useAppDispatch();
  console.log(essayResult);

  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        <strong className="text-center block">Your Essay analisis</strong>
        <EssayInfo />
      </div>
      <div>
        <ul></ul>
        {essayResult.properties.map((property, i) => {
          return (
            <li key={i}>
              <strong>{property.title}:</strong>
              {property.value}
            </li>
          );
        })}
        <div>
          <strong>Score: {essayResult.score}</strong>
          <br />
          <strong>Suggestions:</strong> {essayResult.suggestions}
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(essayFormDataReducer({ topic: "", body: "" }));
          dispatch(
            essayResultReducer({ ...essayResult, isRelatedToTopic: false }),
          );
        }}
        className="primaryBtn !w-fit m-4 mx-auto"
      >
        Write a new essay
      </button>
    </div>
  );
}
