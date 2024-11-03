import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allEssaysReducer } from "@/src/redux/slices/essayStateSlice";
import { EssayObjectTypes } from "@/src/types/interface";
import React from "react";

export default function SortSelection() {
  const { allEssays } = useAppSelector((state) => state.essayState);
  const dispatch = useAppDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = event.target.value.split("_") as [
      "score" | "createdAt",
      "asc" | "desc",
    ];
    const sortedEssays = [...allEssays].sort((a, b) => {
      if (sortBy === "score") {
        return order === "asc" ? +a.score - +b.score : +b.score - +a.score;
      } else {
        return order === "asc"
          ? a.createdAt - b.createdAt
          : b.createdAt - a.createdAt;
      }
    });
    dispatch(allEssaysReducer(sortedEssays));
  };
  return (
    <div>
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
    </div>
  );
}
