import React, { useEffect } from "react";
import { categoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import CategoryCard from "./categoryCard/categoryCard";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";

export default function CategoriesPage() {
  const { categories } = useAppSelector((state) => state.categoryState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    appDataInitialiser();
    const { categories } = getAppDataHandler();
    if (isEmpty(categories)) {
      dispatch(categoriesReducer(categories));
    }
  }, [categories, dispatch]);
  return (
    <div>
      <h2 className="font-bold">Categories</h2>
      {isEmpty(categories) ? (
        <div className="card_message text-red-500">
          You have not created a category yet.
          <br />
          <Link
            href={"/new"}
            className="text-blue-500 font-normal hover:underline"
          >
            Create a new Item with category
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-8">
          {categories.map((category: categoryTypes, i) => {
            return <CategoryCard key={i} category={category} />;
          })}
        </div>
      )}
    </div>
  );
}
