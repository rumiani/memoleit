"use client";
import React from "react";
import EssayResult from "./essayResult/essayResult";
import EssayForm from "./essayForm/essayForm";
import { useAppSelector } from "@/src/app/hooks";

export default function WritingPage() {
  const { essayResult } = useAppSelector((state) => state.essayState);

  return (
    <div className="mb-16 sm:mb-2">
      <div className="relative w-full my-4">
        {essayResult.isRelatedToTopic ? <EssayResult /> : <EssayForm />}
      </div>
    </div>
  );
}
