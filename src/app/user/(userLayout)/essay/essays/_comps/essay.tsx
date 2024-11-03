import { timeToNowHandler } from "@/src/handlers/general/timeToNowHandler";
import { EssayObjectTypes } from "@/src/types/interface";
import React from "react";
import EssayOptions from "./essay/essaysOption/essayOption";

export default function Essay({ essay }: { essay: EssayObjectTypes }) {
  const { hours, days } = timeToNowHandler(essay.createdAt);
  const dateOfCreation = days > 0 ? days + " days ago" : hours + " hours ago";
  return (
    <div>
      <div className="relative hover:bg-gray-100 w-60 h-48 shadow-md rounded-md p-2">
        <div className="flex flex-row justify-between items-center">
          <p>{dateOfCreation}</p>
          <EssayOptions essay={essay} />
        </div>
        <div className="flex flex-row justify-between bottom-2 left-2">
          <strong>Score: {essay.score}</strong>
        </div>
        <p className="p-2 ">
          <strong>Topic:</strong>{" "}
          <span className="h-20 overflow-y-hidden">{essay.topic}</span>...
        </p>
      </div>
    </div>
  );
}
