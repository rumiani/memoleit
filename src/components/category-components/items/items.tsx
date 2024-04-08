import React, { useEffect, useState } from "react";
import { itemTypes } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Item from "../../item/item";
import { allItemsReducer } from "@/src/redux/appStateSlice";
import { isEmpty } from "lodash";
import { categoryFilterHandler } from "@/src/handlers/categoryFilterHandler";
import CategoryOptions from "../categoryOptions/categoryOptions";
import categoryExistHandler from "@/src/handlers/categoryExistHandler";
import { notFound } from "next/navigation";
import NotFound from "@/src/app/not-found";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Items({ params }: { params: { category: string } }) {


  const { items } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredItemsData = categoryFilterHandler(params.category);
    if (isEmpty(items) && !isEmpty(filteredItemsData))
      dispatch(allItemsReducer(filteredItemsData));
  }, [params, items, dispatch]);
  if (params.category) {
    
  }
  if(!categoryExistHandler(params.category)) {
    toast.error('There is no such a catagory. ')
     return (
     <div className="text-center font-bold my-16">
      There&apos;s no catagory with this name.
      <br />
      <Link href={'/categories'} className="text-blue-500 font-normal hover:underline">
        Choose another category
      </Link>
     </div>
     )
  }
  return (
    <div className="">
      {isEmpty(items) ? (
        <div>Nothing is here</div>
      ) : (
        <div>
          <CategoryOptions category={params.category}/>
          <div className="flex flex-wrap justify-around gap-4 mb-16">
            {items.map((item: itemTypes) => (
              <div key={item.id}>
                <Item item={item} />{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
