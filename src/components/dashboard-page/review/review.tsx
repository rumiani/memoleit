"use client";
import React from "react";
import { useAppSelector } from "@/src/app/hooks";
import ReviewItemCard from "./reviewItem/reviewItemCard";
import { IoIosCloudDone } from "react-icons/io";

export default function Review() {
  const { items } = useAppSelector((state) => state.itemState);

  return (
    <div className="my-4">
      {items.length === 0 ? (
        <div className="my-16">
          <IoIosCloudDone className="text-green-600 text-5xl w-36 h-36 mx-auto" />
          <span className="text-green-600">
            You have reviewed all the items.
          </span>
        </div>
      ) : (
        <ReviewItemCard />
      )}
    </div>
  );
}
