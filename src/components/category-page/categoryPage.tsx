import React, { useEffect, useState } from "react";
import categoryExistHandler from "@/src/handlers/categoryExistHandler";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { capitalize } from "lodash";
import { findCategoryByName } from "@/src/handlers/newHandlers/findCategoryByName";

export default function CategoryPage({
  categoryName,
}: {
  categoryName: string;
}) {
  const [isCategory, setIsCategory] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    findCategoryByName(categoryName)
      .then((category) => {
        category ? setIsCategory(true) : setIsCategory(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [categoryName]);
  if (isLoading) {
    return <LoadingPulse />;
  }
  return (
    <div>
      {!isCategory ? (
        <div className="card_message">
          There&apos;s no catagory with this name.
          <br />
          <Link
            href={"/box/categories"}
            className="text-blue-500 font-normal hover:underline"
          >
            Choose another category
          </Link>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{capitalize(categoryName)}</h3>
          <CategoryOptions categoryName={categoryName} />
          <CategoryItems categoryName={categoryName} />
        </div>
      )}
    </div>
  );
}
