"use client";
import limits from "@/src/handlers/general/limits/limits";
import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import EssayResult from "./essayResult/essayResult";
import WritingInfo from "./writingInfo/writingInfo";
import EssayForm from "./essayForm/essayForm";
import { useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";
import Dialog from "@/src/components/general/dialog/dialog";

export default function WritingPage() {
  const { essayResult, essay } = useAppSelector((state) => state.essayState);
  return (
    <div>
      <div className="relative w-full my-4">
        {isEmpty(essayResult) ? (
          <div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <WritingInfo />
              <h2 className="text-center font-bold my-4">
                Write a General Training essay and analyze it with AI
              </h2>
            </div>
            <EssayForm />
          </div>
        ) : (
          <EssayResult result={essayResult} />
        )}
      </div>
    </div>
  );
}
