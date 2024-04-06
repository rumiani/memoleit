import React, { useEffect, useState } from "react";
import { itemTypes } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Item from "../item/item";
import { allItemsReducer } from "@/src/redux/appStateSlice";
import { isEmpty } from "lodash";
import { catagoryFilterHandler } from "@/src/handlers/catagoryFilterHandler";
import CatagoryOptions from "./catagoryOptions/catagoryOptions";

export default function Items({ params }: { params: { catagory: string } }) {


  const { items } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredItemsData = catagoryFilterHandler(params.catagory);
    if (isEmpty(items) && !isEmpty(filteredItemsData))
      dispatch(allItemsReducer(filteredItemsData));
  }, [params, items, dispatch]);

  return (
    <div className="">
      {isEmpty(items) ? (
        <div>Nothing is here</div>
      ) : (
        <div>
          <CatagoryOptions catagory={params.catagory}/>
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
