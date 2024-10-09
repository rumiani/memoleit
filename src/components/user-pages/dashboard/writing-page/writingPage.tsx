"use client";
import React from "react";
import EssayResult from "./essayResult/essayResult";
import EssayForm from "./essayForm/essayForm";
import { useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";

export default function WritingPage() {
  const { essayResult } = useAppSelector((state) => state.essayState);
  return (
    <div>
      <div className="relative w-full my-4">
        {isEmpty(essayResult) ? (
          <EssayForm />
        ) : (
          <EssayResult result={essayResult} />
        )}
      </div>
    </div>
  );
}
