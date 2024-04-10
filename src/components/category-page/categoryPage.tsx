import React, { useEffect } from "react";
import { itemTypes } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allItemsReducer } from "@/src/redux/appStateSlice";
import { isEmpty } from "lodash";
import { categoryFilterHandler } from "@/src/handlers/categoryFilterHandler";
import categoryExistHandler from "@/src/handlers/categoryExistHandler";
import { toast } from "react-toastify";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import { useParams } from "next/navigation";
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
