import { item } from "@/types/interface";
import React from "react";

export default function Item({
  item,
  days,
  goToNextItem,
}: {
  item: item | undefined;
  days: number;
  goToNextItem: any;
}) {
  return (
    <div>
      <div>
        <h3 id="days" title={`Created ${days} days ago`} className="text-sm">
          {days} Days
        </h3>
        <h2 id="title" className="text-2xl font-bold text-center">
          {item?.title}
        </h2>
        <p className="text-gray-600">{item?.description}</p>
      </div>
      <div className="buttons flex justify-between w-full mt-4">
        <button
          onClick={() => goToNextItem(item, false)}
          id="notLearned"
          className="bg-red-500 px-4 py-2 rounded text-white text-sm"
        >
          I don&apos;t know
        </button>
        <button
          onClick={() => goToNextItem(item, true)}
          id="learned"
          className="bg-green-500 px-4 py-2 rounded text-white text-sm"
        >
          I know
        </button>
      </div>
    </div>
  );
}
