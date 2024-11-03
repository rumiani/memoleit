"use client";
import LoadingPulses from "@/src/components/general/loading-comps/loadingPulses/loadingPulses";
import { timeToNowHandler } from "@/src/handlers/general/timeToNowHandler";
import { db } from "@/src/services/db";
import { EssayObjectTypes } from "@/src/types/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineSortAscending } from "react-icons/hi";

export default function Essays() {
  const [essaysArray, setEssaysArray] = useState<EssayObjectTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchEssays = async () => {
      try {
        const essays = await db.essays.toArray();
        setEssaysArray(essays);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchEssays();
  }, []);
  if (isLoading) {
    return <LoadingPulses />;
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = event.target.value.split("_") as [
      "score" | "createdAt",
      "asc" | "desc",
    ];
    const sortedEssays = [...essaysArray].sort((a, b) => {
      if (sortBy === "score") {
        return order === "asc" ? +a.score - +b.score : +b.score - +a.score;
      } else {
        return order === "asc"
          ? a.createdAt - b.createdAt
          : b.createdAt - a.createdAt;
      }
    });
    setEssaysArray(sortedEssays);
  };
  return (
    <div className="">
      <select
        className="mb-8 w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={handleSortChange}
      >
        <option value="">Sorting</option>
        <option value="score_desc">Score &nbsp; ↑</option>
        <option value="score_asc">Score &nbsp; ↓</option>
        <option value="createdAt_desc">Time &nbsp;&nbsp; ↑</option>
        <option value="createdAt_asc">Time &nbsp;&nbsp; ↓</option>
      </select>
      <div className="flex flex-wrap justify-around gap-2">
        {essaysArray.map((essay, i) => {
          const { hours, days } = timeToNowHandler(essay.createdAt);
          const dateOfCreation =
            days > 0 ? days + " days ago" : hours + " hours ago";
          return (
            <Link href={"/user/essay/essays/" + essay.id} key={i}>
              <div className="relative hover:bg-gray-100 w-60 h-40 shadow-md rounded-md p-2">
                <div className="flex flex-row justify-between bottom-2 left-2">
                  <strong>Score: {essay.score}</strong>
                  <p>{dateOfCreation}</p>
                </div>
                <p className="p-2">
                  <strong>Topic:</strong> {essay.topic}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
