import React from "react";
import categoryExistHandler from "@/src/handlers/categoryExistHandler";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!categoryExistHandler(params.category)) {
    return (
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
    );
  }
  return (
    <div>
      <h3>{params.category}</h3>
      <CategoryOptions category={params.category} />
      <CategoryItems category={params.category} />
    </div>
  );
}
