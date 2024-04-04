"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { getCatagoriesDataHandler } from "@/src/handlers/getCatagoriesDataHandler";
import { catagoriesReducer } from "@/src/redux/appStateSlice";
import { catagoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import Link from "next/link";
import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";

export default function Catagories() {
  const { catagories } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const appData = getAppDataHandler();
    const storageCatagories = appData.catagories;
    const storageItemsData = appData.catagories;
    const catagoriesData = getCatagoriesDataHandler(
      storageItemsData,
      storageCatagories
    );
    if (isEmpty(catagories)) dispatch(catagoriesReducer(storageCatagories));
  });

  return (
    <div>
      <h2 className="border-b border-gray-300">Catagories</h2>
      {isEmpty(catagories) ? (
        <div className="text-red-500">There is no catagories here.</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-8">
          {catagories.map((catagory: catagoryTypes, i) => {
            console.log(catagory);
            const { daysHoursAgo, startedDate } = timeToNowHandler(
              catagory.createdAt
            );
            const catagoryData = topicItemsCountHandler(catagory.name);
            console.log(catagoryData);
            //
            //
            return (
              <div
                key={i}
                className="w-full max-w-72 p-4 rounded-lg border border-gray-300 shadow-sm shadow-gray-200"
              >
                <div className=" flex flex-row justify-between mb-4">
                  <Link
                    href={"/catagory/" + catagory.name}
                    title="Open for more details"
                    className="text-blue-500 text-xl hover:underline"
                  >
                    <h3 className="w-fit mx-auto text-center">
                      {catagory.name}
                    </h3>
                  </Link>
                  <span
                    title={"Created At: " + startedDate}
                    className="text-bold cursor-default" 
                  >
                    {daysHoursAgo}
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between font-bold">
                  <span className="Number of Items text-gray-500 px-1 cursor-default">
                    All: {catagoryData.all}
                  </span>
                  <span title="Number of items have been learned" className=" text-green-500 px-1 cursor-default">
                    Done: {catagoryData.learned}
                  </span>
                  <span title="Number of items left to learn" className="text-yellow-500 px-1 cursor-default">
                    Left: {catagoryData.unLearned}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
// progress
// delete item,
// activeate item,
// edit name,
