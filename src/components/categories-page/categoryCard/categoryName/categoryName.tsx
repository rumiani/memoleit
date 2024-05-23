import React from "react";
import { CategoryTypes } from "@/src/types/interface";
import Link from "next/link";
import CategoryInput from "./CategoryInput/CategoryInput";
import { useAppSelector } from "@/src/app/hooks";
import { capitalize } from "lodash";

export default function CategoryName({categoryOnEdit}:{categoryOnEdit:CategoryTypes}) {
  const { category } = useAppSelector((state) => state.categoryState);

  return (
    <div className="my-8">
      {category.name === categoryOnEdit.name ? (
        <div>
          <CategoryInput category={categoryOnEdit} />
        </div>
      ) : (
        <Link
          href={`/box/categories/${categoryOnEdit.id}/${categoryOnEdit.name}`}
          title="Open for more details"
          className="text-blue-500 my-4 text-xl hover:underline"
        >
          <h3 className="w-fit mx-auto text-center">
            {capitalize(categoryOnEdit.name)}
          </h3>
        </Link>
      )}
    </div>
  );
}
