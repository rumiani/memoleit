import React, { useEffect, useState } from "react";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { capitalize } from "lodash";
import { findCategoryById } from "@/src/handlers/findCategoryById";
import { usePathname } from "next/navigation";

export default function CategoryPage({ categoryId }: { categoryId: string }) {
  const [isCategory, setIsCategory] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathName = usePathname()

  useEffect(() => {        
    findCategoryById(categoryId)
      .then((category) => {        
        console.log(category);
        
        category ? setIsCategory(true) : setIsCategory(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [categoryId]);
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
          <h3 className="font-bold">{capitalize(pathName.split('/').pop())}</h3>
          <CategoryOptions categoryId={categoryId} />
          <CategoryItems categoryId={categoryId} />
        </div>
      )}
    </div>
  );
}
