import { categoryTypes } from "@/src/types/interface";
import Link from "next/link";
import React, { useEffect } from "react";
import CategoryInput from "./CategoryInput/CategoryInput";
import { useAppSelector } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";

export default function CategoryName({
  category,
}: {
  category: categoryTypes;
}) {
  const { categoryNameEditable } = useAppSelector(
    (state) => state.categoryState
  );
  const categoryUrl = makeUrlFriendly(category.name);

  return (
    <div className="my-8">
      {categoryNameEditable === category.name? (
        <div>
          <CategoryInput category={category} />
        </div>
      ) : (
        <Link
          href={"/categories/" + categoryUrl}
          title="Open for more details"
          className="text-blue-500 my-4 text-xl hover:underline"
        >
          <h3 className="w-fit mx-auto text-center">{category.name}</h3>
        </Link>
      )}
    </div>
  );
}
