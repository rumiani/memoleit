"use client";
import LoadingPulses from "@/src/components/general/loading-comps/loadingPulses/loadingPulses";
import { db } from "@/src/services/db";
import React, { useEffect, useState } from "react";
import Essay from "./_comps/essay";
import SortSelection from "./_comps/sortSelection";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allEssaysReducer } from "@/src/redux/slices/essayStateSlice";

export default function Essays() {
  const { allEssays } = useAppSelector((state) => state.essayState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchEssays = async () => {
      try {
        const essays = await db.essays.toArray();
        dispatch(allEssaysReducer(essays));
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
    <div className="">
      <SortSelection />
      <div className="flex flex-wrap justify-around gap-2">
        {allEssays.map((essay, i) => (
          <Essay essay={essay} key={i} />
        ))}
      </div>
    </div>
  );
}
