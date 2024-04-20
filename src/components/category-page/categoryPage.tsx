import React, { useEffect, useState } from "react";
import categoryExistHandler from "@/src/handlers/categoryExistHandler";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const[isCategory,setIsCategory] = useState<boolean | undefined>(false)
  useEffect(()=>{
setIsCategory(categoryExistHandler(params.category))
  },[params])
  return (
    <div>
      {!isCategory ? (
        <div className="card_message">
          There&apos;s no catagory with this name.
          <br />
          <Link
            href={"/categories"}
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
