import React, { useEffect } from "react";
import { itemTypes } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Item from "../item/item";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { allItemsReducer, userReducer } from "@/src/redux/appStateSlice";
import _ from "lodash";
import { catagoryFilterHandler } from "@/src/handlers/catagoryFilterHandler";
export default function Items({ params }: { params: { catagory: string } }) {
  const { items } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredItemsData = catagoryFilterHandler(params.catagory)
    if (items.length === 0) dispatch(allItemsReducer(filteredItemsData));
  }, [params, items, dispatch]);
  return (
    <div className="flex flex-wrap justify-around gap-4">
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
