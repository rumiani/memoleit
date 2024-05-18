import React, { useEffect, useState } from "react";
import { CategoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import CategoryCard from "./categoryCard/categoryCard";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import LoadingPulses from "../loading-comps/loadingPulses/loadingPulses";
import { getCategoriesHandler } from "@/src/handlers/newHandlers/getCategoriesHandler";

export default function CategoriesPage() {
  const { categories } = useAppSelector((state) => state.categoryState);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getCategoriesHandler()
      .then((newCategories) => {
        if (!isEmpty(newCategories)) {
          dispatch(categoriesReducer(newCategories!));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => console.log("error"));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingPulses />;
  }
  return (
    <div>
      {isEmpty(categories) ? (
        <div className="card_message text-red-500">
          You have not created a category yet.
          <br />
          <Link
            href={"/dashboard/new"}
            className="text-blue-500 font-normal hover:underline"
          >
            Create a new Item with category
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 mb-28 sm:my-8">
          {categories.map((category: CategoryTypes, i) => {
            return <CategoryCard key={i} category={category} />;
          })}
        </div>
      )}
    </div>
  );
}
