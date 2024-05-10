import React from "react";
import CategoryInfo from "./categoryInfo/categoryInfo";

export default function CategoryOptions({ categoryId }: { categoryId: string }) {
  return (
    <div className="w-full mt-8">
      <div className="flex flex-wrap justify-center bg-red-200"></div>
      <CategoryInfo categoryId={categoryId} />
    </div>
  );
}
