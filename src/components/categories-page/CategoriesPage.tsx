import React from "react";
import { categoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useAppSelector } from "@/src/app/hooks";
import CategoryCard from "./categoryCard/categoryCard";

export default function CategoriesPage() {
  const { categories } = useAppSelector((state) => state.categoryState);
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
