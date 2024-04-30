import React from "react";
import CategoryInfo from "./categoryInfo/categoryInfo";

export default function CategoryOptions({ categoryName }: { categoryName: string }) {
  return (
    <div className="w-full mt-8">
      <div className="flex flex-wrap justify-center bg-red-200"></div>
      <CategoryInfo categoryName={categoryName} />
    </div>
  );
}
