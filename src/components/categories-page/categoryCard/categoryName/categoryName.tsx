import React from "react";
import { CategoryTypes } from "@/src/types/interface";
import Link from "next/link";
import CategoryInput from "./CategoryInput/CategoryInput";
import { useAppSelector } from "@/src/app/hooks";
import { capitalize } from "lodash";

export default function CategoryName({category}:{category:CategoryTypes}) {
  const { categoryOnEdit } = useAppSelector((state) => state.categoryState);

  return (
    <div className="my-8">
      {categoryOnEdit === category.id ? (
        <div>
          <CategoryInput category={category} />
        </div>
      ) : (
        <Link
          href={`/box/category/${category.id}/${category.name}`}
          title="Open for more details"
          className="text-blue-500 my-4 text-xl hover:underline"
        >
          <h3 className="w-fit mx-auto text-center">
            {capitalize(category.name)}
          </h3>
        </Link>
      )}
    </div>
  );
}
