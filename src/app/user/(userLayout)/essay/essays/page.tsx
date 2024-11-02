"use client";
import LoadingPulses from "@/src/components/general/loading-comps/loadingPulses/loadingPulses";
import { timeToNowHandler } from "@/src/handlers/general/timeToNowHandler";
import { db } from "@/src/services/db";
import { EssayObjectTypes } from "@/src/types/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  return (
    <div className="flex flex-wrap justify-around gap-2">
      {essaysArray.map((essay, i) => {
        const {hours, days} = timeToNowHandler(essay.createdAt)
        const dateOfCreation = days > 0? days+" days ago":hours+" hours ago"
        return (
          <Link href={"/user/essay/essays/" + essay.id} key={i}>
            <div className="relative w-60 h-40 shadow-md rounded-md p-2">
              <div className="flex flex-row justify-between bottom-2 left-2">
                <strong>Score: {essay.score}</strong>
                <p>{dateOfCreation}</p>
              </div>
              <p className="p-2"><strong>Topic:</strong> {essay.topic}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}