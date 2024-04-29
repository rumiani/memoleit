import React, { useEffect, useState } from "react";
import categoryExistHandler from "@/src/handlers/categoryExistHandler";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [isCategory, setIsCategory] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {    
    setIsCategory(categoryExistHandler(params.category));
    setIsLoading(false)
  }, [params]);
  if(isLoading){
    return <LoadingPulse/>
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
          <h3>{params.category}</h3>
          <CategoryOptions category={params.category} />
          <CategoryItems category={params.category} />
        </div>
      )}
    </div>
  );
}
