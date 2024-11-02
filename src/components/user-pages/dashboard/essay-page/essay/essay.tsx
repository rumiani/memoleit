import React from "react";
import { EssayInfo } from "./essayInfo/essayInfo";
import { essayFormDataReducer } from "@/src/redux/slices/essayStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { EssayObjectTypes } from "@/src/types/interface";
import Link from "next/link";

export default function Essay({ essay }: { essay: EssayObjectTypes }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        <strong className="text-center block">Your Essay analisis</strong>
        <EssayInfo essay={essay} />
      </div>
      <div className="px-8">
        <ul></ul>
        {essay.properties.map((property, i) => {
          return (
            <li key={i} className="flex flex-col">
              <strong>{property.title}:</strong>
              <p className="px-2">{property.value}</p>
            </li>
          );
        })}
        <div className="py-2 border-t border-gray-200">
          <span
            className={`${+essay.score > 5 ? "bg-green-500" : "bg-red-500"} w-28 p-2 block`}
          >
            <strong className="">Score: {essay.score}</strong>
          </span>
          <div className="flex flex-col">
            <strong>Suggestions:</strong>{" "}
            <p className="px-2">{essay.suggestions}</p>
          </div>{" "}
        </div>
      </div>
      <Link href="/user/essay/essay-form">
        <button
          onClick={() => {
            dispatch(essayFormDataReducer({ topic: "", body: "" }));
          }}
          className="primaryBtn sm:mb-2 mb-20 !w-fit m-4 mx-auto"
        >
          Write a new essay
        </button>
      </Link>
    </div>
  );
}
