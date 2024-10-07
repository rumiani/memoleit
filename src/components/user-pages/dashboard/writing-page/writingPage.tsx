"use client";
import limits from "@/src/handlers/general/limits/limits";
import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import EssayResult from "./essayResult/essayResult";
import WritingInfo from "./essayForm/writingInfo/writingInfo";
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
          <EssayForm />
        ) : (
          <EssayResult result={essayResult} />
        )}
      </div>
    </div>
  );
}
