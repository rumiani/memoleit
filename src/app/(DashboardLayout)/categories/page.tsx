"use client";
import React, { useEffect } from "react";

import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { getCategoriesDataHandler } from "@/src/handlers/getCategoriesDataHandler";
import { categoriesReducer } from "@/src/redux/appStateSlice";
import { categoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import Link from "next/link";
import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

export default function Categories() {
  const { categories } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const appData = getAppDataHandler();
    const storageCategories = appData.categories;
    const storageItemsData = appData.categories;
    const categoriesData = getCategoriesDataHandler(
      storageItemsData,
      storageCategories
    );
    if (isEmpty(categories)) dispatch(categoriesReducer(storageCategories));
  });

  return (
    <div>
      <h2 className="border-b border-gray-300">Categories</h2>
      {isEmpty(categories) ? (
        <div className="text-red-500">There is no categories here.</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-8">
          {categories.map((category: categoryTypes, i) => {
            const { daysHoursAgo, startedDate } = timeToNowHandler(
              category.createdAt
            );
            const categoryData = topicItemsCountHandler(category.name);
            return (
              <div
                key={i}
                className="w-full max-w-72 p-4 rounded-lg border border-gray-300 shadow-sm shadow-gray-200"
              >
                <div className=" flex flex-row justify-between mb-4">
                  <Link
                    href={"/categories/" + category.name}
                    title="Open for more details"
                    className="text-blue-500 text-xl hover:underline"
                  >
                    <h3 className="w-fit mx-auto text-center">
                      {category.name}
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
                    All: {categoryData.all}
                  </span>
                  <span
                    title="Number of items have been learned"
                    className=" text-green-500 px-1 cursor-default"
                  >
                    Done: {categoryData.learned}
                  </span>
                  <span
                    title="Number of items left to learn"
                    className="text-yellow-500 px-1 cursor-default"
                  >
                    Left: {categoryData.unLearned}
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
