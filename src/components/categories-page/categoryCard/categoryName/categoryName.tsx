import { categoryTypes } from "@/src/types/interface";
import Link from "next/link";
import React, { useEffect } from "react";
import CategoryInput from "./CategoryInput/CategoryInput";
import { FaSave } from "react-icons/fa";
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
  category.name = makeUrlFriendly(category.name)
  
  useEffect(() => {
    console.log(categoryNameEditable);
  }, [categoryNameEditable]);
  return (
    <div className="my-8">
      {!categoryNameEditable ? (
        <Link
          href={"/categories/" + category.name}
          title="Open for more details"
          className="text-blue-500 my-4 text-xl hover:underline"
        >
          <h3 className="w-fit mx-auto text-center">{category.name}</h3>
        </Link>
      ) : (
        <div>
          <CategoryInput category={category} />
          <button
            // onClick={saveCategoryHandler}
            className="icon !p-2 text-xl !w-fit"
            title="Filter categories"
          >
            <FaSave className="text-3xl text-green-600" />
          </button>
        </div>
      )}
    </div>
  );
}
