import React, { useEffect } from "react";
import { itemTypes } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Item from "../item/item";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { allItemsReducer, userReducer } from "@/src/redux/appStateSlice";
import _ from "lodash";
export default function Items({ params }: { params: { catagory: string } }) {
  const { items } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { itemsData } = getAppDataHandler();
    const filteredItemsData = itemsData.filter(
      (item: itemTypes) =>
        item.catagory.toUpperCase() === params.catagory.toUpperCase()
    );
    if (items.length === 0) dispatch(allItemsReducer(filteredItemsData));
  }, [params, items, dispatch]);
  return (
    <div className=" flex justify-around gap-4">
      {_.isEmpty(items) ? (
        <div>Nothing is here</div>
      ) : (
        items.map((item: itemTypes) => (
          <div key={item.id}>
            <Item item={item} />{" "}
          </div>
        ))
      )}
    </div>
  );
}
