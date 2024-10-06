"use client";
import limits from "@/src/handlers/general/limits/limits";
import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import EssayResult from "./essayResult/essayResult";
import WritingInfo from "./writingInfo/writingInfo";
import EssayForm from "./essayForm/essayForm";
import { useAppSelector } from "@/src/app/hooks";

export default function WritingPage() {
  const { essayResult } = useAppSelector((state) => state.essayState);
  return (
    <div>
      <div className="relative w-full my-4">
        <div className="flex flex-row gap-2 justify-center items-center">
          <WritingInfo />
          <h2 className="text-center font-bold my-4">
            Write an essay and analyze it with AI
          </h2>
        </div>
        <EssayForm />
      </div>
      <EssayResult result={essayResult} />
    </div>
  );
}
