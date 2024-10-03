"use client";
import ReviewItemCard from "./reviewItem/reviewItemCard";
import { useAppSelector } from "@/src/app/hooks";

export default function Review() {
  const { items } = useAppSelector((state) => state.itemState);
  return (
    <div className="flex flex-col justify-center mx-auto">
      {items.length === 0 ? (
        <p className="my-16 text-gray-800">Please select a category.</p>
      ) : (
        <ReviewItemCard />
      )}
    </div>
  );
}
