import React, { useEffect, useState } from "react";
import { CategoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import CategoryCard from "./categoryCard/categoryCard";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import LoadingPulses from "../loading-comps/loadingPulses/loadingPulses";

export default function CategoriesPage() {
  const { categories } = useAppSelector((state) => state.categoryState);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsLoading(true);

    appDataInitialiser();
    const newCategories = getAppDataHandler().categories;
    if (isEmpty(categories) && !isEmpty(newCategories)) {
      dispatch(categoriesReducer(newCategories));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [categories, dispatch]);

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
        <div className="flex flex-wrap justify-center gap-2 my-8">
          {categories.map((category: CategoryTypes, i) => {
            return <CategoryCard key={i} category={category} />;
          })}
        </div>
      )}
    </div>
  );
}
