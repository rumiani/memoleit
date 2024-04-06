import React, { useEffect, useState } from "react";
import { itemTypes } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Item from "../item/item";
import { allItemsReducer } from "@/src/redux/appStateSlice";
import { isEmpty } from "lodash";
import { categoryFilterHandler } from "@/src/handlers/categoryFilterHandler";
import CategoryOptions from "./categoryOptions/categoryOptions";

export default function Items({ params }: { params: { category: string } }) {


  const { items } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredItemsData = categoryFilterHandler(params.category);
    if (isEmpty(items) && !isEmpty(filteredItemsData))
      dispatch(allItemsReducer(filteredItemsData));
  }, [params, items, dispatch]);

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
