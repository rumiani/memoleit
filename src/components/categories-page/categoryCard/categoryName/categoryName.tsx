import React from "react";
import { CategoryTypes } from "@/src/types/interface";
import Link from "next/link";
import CategoryInput from "./CategoryInput/CategoryInput";
import { useAppSelector } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import { capitalize } from "lodash";
import { getCategoryUrl } from "@/src/handlers/getCategoryUrl";

export default function CategoryName({
  category,
}: {
  category: CategoryTypes;
}) {
  const { categoryNameEditable } = useAppSelector(
    (state) => state.categoryState
  );

  return (
    <div className="my-8">
      {categoryNameEditable === category.name ? (
        <div>
          <CategoryInput category={category} />
        </div>
      ) : (
        <Link
          href={getCategoryUrl(category.name)}
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
