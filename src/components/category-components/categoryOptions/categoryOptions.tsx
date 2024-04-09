import React from "react";
import CategoryInfo from "./categoryInfo/categoryInfo";

export default function CategoryOptions({ category }: { category: string }) {
  return (
    <div className="w-full mt-8">
      <div className="flex flex-wrap justify-center bg-red-200"></div>
      <CategoryInfo category={category} />
    </div>
  );
}